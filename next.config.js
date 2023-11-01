/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [{
      source: '/api/:path*',
      destination: 'http://mock.apifox.cn/m1/2398938-0-default/api/:path*'
    }]
  }
}

module.exports = nextConfig
