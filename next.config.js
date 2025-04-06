/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configure Next.js for development
  reactStrictMode: true,

  // For production builds with Firebase Hosting
  // We're using a Firebase Function to serve the Next.js app, so we don't need 'export'
  // output: 'export',
  // images: {
  //   unoptimized: true, // Required for static export if using next/image
  // },

  // Add revalidate time for Incremental Static Regeneration (ISR)
  // This allows static pages to be regenerated after a certain time
  // when requested, keeping content fresh without rebuilding the entire site
  experimental: {
    // Add experimental features here
  },

  // Ensure Next.js knows it's being deployed to Firebase
  distDir: '.next',
};

module.exports = nextConfig;
