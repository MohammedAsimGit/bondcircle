import type { NextConfig } from 'next';
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  outputFileTracingRoot: resolve(__dirname, '../../'),
  images: {
    formats: ['image/avif', 'image/webp'],
  },
};

export default nextConfig;
