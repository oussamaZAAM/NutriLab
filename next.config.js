/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['i.ibb.co', 'images.unsplash.com'],
  },
  env: {
    SERVER: process.env.SERVER,
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://nutrilab.vercel.app/:path*',
      },
    ]
  },
}

module.exports = nextConfig
