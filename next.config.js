/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true, // Recommended for the `pages` directory, default in `app`.
  experimental: {
  },
  eslint: {
    ignoreDuringBuilds: true
  }
};

module.exports = nextConfig;
