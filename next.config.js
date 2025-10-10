/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['mir-s3-cdn-cf.behance.net', 'behance.net', 'localhost'],
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.glsl$/,
      use: 'raw-loader',
    });
    return config;
  },
  experimental: {
    optimizeCss: true,
  },
}

module.exports = nextConfig
