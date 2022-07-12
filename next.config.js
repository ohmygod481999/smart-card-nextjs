/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  async redirects() {
    return [
      {
        source: '/user/:id',
        destination: '/user/:id/home',
        permanent: true,
      },
    ]
  }
}

module.exports = nextConfig
