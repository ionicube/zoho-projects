/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'standalone',
    env: {
        ZOHO_CLIENT_ID: process.env.ZOHO_CLIENT_ID,
        AUTH_SECRET: process.env.AUTH_SECRET,
    },
}

module.exports = nextConfig
