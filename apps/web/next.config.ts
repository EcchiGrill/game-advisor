import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [{ hostname: 'media.rawg.io' }],
  },
};

export default nextConfig;
