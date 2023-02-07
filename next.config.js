/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['i.ibb.co', 'images.unsplash.com'],
  },
  env: {
    VERCEL_URL: process.env.VERCEL_URL,
  },
}

module.exports = nextConfig
