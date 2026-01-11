/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/devlog',
  assetPrefix: '/devlog',
  images: {
    unoptimized: true,
  },
  trailingSlash: false,
};

module.exports = nextConfig;
