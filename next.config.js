/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: [ 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.spotifycdn.com',
        port: ''
      },
      {
        protocol: 'https',
        hostname: '*.scdn.co',
        port: ''
      },
    ]
  }
};

module.exports = nextConfig;
