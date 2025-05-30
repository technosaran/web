import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  basePath: '/web',
  assetPrefix: '/web/',
  images: {
    unoptimized: true
  }
};

export default nextConfig;
