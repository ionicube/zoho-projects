import type { Session } from 'next-auth'
import {PortalInfo} from "@/components/portalInfo";
import {makeAPICall} from "@/utils/makeAPICall";

export async function Portals({ session }: { session: Session }) {
  const {
    portals: [ portal ] = []
  } = await makeAPICall('/restapi/portals/', session.accessToken as string)
  console.log(global.authInfo)
  return <PortalInfo portal={portal} session={session} />

}
