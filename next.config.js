/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configure Next.js to output a static export.
  // This is required for compatibility with Firebase Hosting's default configuration
  // which serves files from the 'out' directory.

  // Optional: Add other Next.js configurations here if needed in the future.
  // reactStrictMode: true,
  // swcMinify: true,
  // images: {
  //   unoptimized: true, // Required for static export if using next/image
  // },
};

module.exports = nextConfig;
