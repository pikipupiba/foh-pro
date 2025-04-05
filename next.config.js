/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configure Next.js for development
  reactStrictMode: true,
  swcMinify: true,

  // For production builds with Firebase Hosting, uncomment the following:
  // output: 'export',
  // images: {
  //   unoptimized: true, // Required for static export if using next/image
  // },

  // Add revalidate time for Incremental Static Regeneration (ISR)
  // This allows static pages to be regenerated after a certain time
  // when requested, keeping content fresh without rebuilding the entire site
  experimental: {
    // This enables ISR-like behavior in development
    isrMemoryCacheSize: 0,
  },
};

module.exports = nextConfig;
