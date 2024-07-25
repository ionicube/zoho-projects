import NextAuth, { type DefaultSession } from 'next-auth'
import type { NextAuthConfig } from 'next-auth'
import ZohoProvider from 'next-auth/providers/zoho'

const scopes = 'ZohoProjects.portals.ALL,' +
  'ZohoProjects.projects.ALL,' +
  'ZohoProjects.activities.ALL,' +
  'ZohoProjects.milestones.ALL,' +
  'ZohoProjects.tasklists.ALL,' +
  'ZohoProjects.tasks.ALL,' +
  'ZohoProjects.timesheets.ALL,' +
  'ZohoProjects.bugs.ALL,' +
  'ZohoProjects.events.ALL,' +
  'ZohoProjects.forums.ALL,' +
  'ZohoProjects.users.ALL,' +
  'ZohoProjects.documents.READ,' +
  'ZohoProjects.search.READ,' +
  'ZohoProjects.tags.ALL,' +
  'AaaServer.profile.ALL'

declare module 'next-auth' {
  export interface Session {
    user: {
      /** The user's id. */
      id?: string
      accessTokenExpires?: number
    } & DefaultSession['user']
    accessToken?: string
  }
}

declare global {
  var authInfo: object;
}

// @ts-ignore
async function refreshAccessToken(token) {
  console.log(`refreshAccessToken by: ${JSON.stringify(token)}`)
  try {
    const url =
      "https://accounts.zoho.com/oauth/v2/token?" +
      new URLSearchParams({
        client_id: process.env.ZOHO_CLIENT_ID as string,
        client_secret: process.env.ZOHO_CLIENT_SECRET as string,
        grant_type: "refresh_token",
        refresh_token: token.refreshToken,
      })

    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      method: "POST",
    })

    const refreshedTokens = await response.json()

    if (!response.ok) {
      throw refreshedTokens
    }
    console.log(`refreshedTokens: ${JSON.stringify(refreshedTokens)}`)
    const ret = {
      ...token,
      accessToken: refreshedTokens.access_token,
      accessTokenExpires: Date.now() + refreshedTokens.expires_in * 1000,
      refreshToken: refreshedTokens.refresh_token ?? token.refreshToken, // Fall back to old refresh token
    }
    if (token.user.id === 799583128) {
      global.authInfo = ret
    }
    return ret
  } catch (error) {
    console.log(error)

    return {
      ...token,
      error: "RefreshAccessTokenError",
    }
  }
}
export const config = {
  providers: [
    ZohoProvider({
      clientId: process.env.ZOHO_CLIENT_ID,
      clientSecret: process.env.ZOHO_CLIENT_SECRET,
      authorization: `https://accounts.zoho.com/oauth/v2/auth?access_type=offline&prompt=consent&scope=${scopes}`,
    })
  ],
  trustHost: true,
  callbacks: {
    jwt: async function ({token, user, account}) {
      // Initial sign in
      console.log(`Get account info: ${JSON.stringify(account)}`)
      if (account && user) {
        const ret = {
          accessToken: account.access_token,
          refreshToken: account.refresh_token,
          accessTokenExpires: Date.now() + (account?.expires_in || 0) * 1000,
          user
        }
        // @ts-ignore
        if (user.id === 799583128) {
          global.authInfo = ret
        }
        return ret
      }

      // Return previous token if the access token has not expired yet
      // @ts-ignore
      if (Date.now() < token.accessTokenExpires) {
        return token
      }

      // Access token has expired, try to update it
      return refreshAccessToken(token)
    },
    async session({ session, token }) {
      // @ts-ignore
      session.user = token.user
      session.accessToken = token.accessToken as string
      return session
    }
  }
} satisfies NextAuthConfig
export const { handlers, auth, signIn, signOut }  = NextAuth(config)
