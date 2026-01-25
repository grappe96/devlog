/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production'

const nextConfig = {
  // 개발 모드에서는 output: 'export'를 비활성화
  // 빌드 시에만 정적 export 활성화
  ...(isProd && { output: 'export' }),
  basePath: '/devlog',
  assetPrefix: '/devlog',
  images: {
    unoptimized: true,
  },
  trailingSlash: false,
};

module.exports = nextConfig;
