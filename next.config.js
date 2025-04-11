/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configure Next.js for development
  reactStrictMode: true,

  // Skip type checking during build
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },

  // Skip ESLint during build
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },

  // Add experimental features here if needed
  experimental: {},

  // Configure image domains
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'firebasestorage.googleapis.com',
        port: '',
        pathname: '/**',
      },
    ],
  },

  // Ensure Next.js knows it's being deployed to Firebase
  // Using the default .next directory for Firebase Hosting with Cloud Functions
  distDir: '.next',
};

module.exports = nextConfig;
