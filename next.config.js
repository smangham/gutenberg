/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  trailingSlash: false,
  webpack: (config) => {
    config.resolve.fallback = { fs: false };

    return config;
  },
  basePath: process.env.NEXT_PUBLIC_BASEPATH,
}

module.exports = nextConfig
