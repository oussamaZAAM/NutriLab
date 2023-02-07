/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['i.ibb.co', 'images.unsplash.com'],
  },
  env: {
    VERCEL_ENV: process.env.VERCEL_ENV,
    SERVER: process.env.SERVER,
  },
}

module.exports = nextConfig
