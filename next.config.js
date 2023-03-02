/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['i.ibb.co', 'upload.wikimedia.org', 'lh3.googleusercontent.com', 'platform-lookaside.fbsbx.com'],
  },
  env: {
    VERCEL_ENV: process.env.VERCEL_ENV,
    VERCEL_URL: process.env.VERCEL_URL,
  },
}

module.exports = nextConfig
