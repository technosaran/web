import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === 'production';

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  basePath: isProd ? '/web' : '',
  assetPrefix: isProd ? '/web/' : '',
  images: {
    unoptimized: true,
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  // Performance optimizations
  experimental: {
    optimizePackageImports: ['lucide-react'],
  },
  // Note: Security headers don't work with static export
  // They should be configured at the server/hosting level
  // Compression and optimization
  compress: true,
  poweredByHeader: false,
  generateEtags: false,
};

export default nextConfig;
