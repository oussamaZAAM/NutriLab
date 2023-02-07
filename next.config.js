/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['i.ibb.co', 'images.unsplash.com'],
  },
  env: {
    SERVER: process.env.SERVER,
  },
}

module.exports = nextConfig
