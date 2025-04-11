// Script to deploy without type checking
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Clean output directories
console.log('Cleaning output directories...');
try {
  execSync('rimraf .next', { stdio: 'inherit' });
} catch (error) {
  console.log('No .next directory to clean');
}

// Create a temporary next.config.js that skips type checking
const nextConfigPath = path.join(__dirname, 'next.config.js');
const originalNextConfig = fs.readFileSync(nextConfigPath, 'utf8');
const backupNextConfigPath = path.join(__dirname, 'next.config.backup.js');
fs.writeFileSync(backupNextConfigPath, originalNextConfig);

// Create a modified next.config.js that skips type checking
const newNextConfig = `
/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configure Next.js for development
  reactStrictMode: true,

  // Skip type checking and linting
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },

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
  distDir: '.next',
};

module.exports = nextConfig;
`;

// Write the modified next.config.js
fs.writeFileSync(nextConfigPath, newNextConfig);

// Create a temporary firebase.json that uses the .next directory
const firebaseConfigPath = path.join(__dirname, 'firebase.json');
const originalFirebaseConfig = fs.readFileSync(firebaseConfigPath, 'utf8');
const backupFirebaseConfigPath = path.join(__dirname, 'firebase.json.backup');
fs.writeFileSync(backupFirebaseConfigPath, originalFirebaseConfig);

// Parse the firebase.json file
const firebaseConfig = JSON.parse(originalFirebaseConfig);

// Update the hosting configuration
firebaseConfig.hosting = {
  ...firebaseConfig.hosting,
  public: '.next',
  rewrites: [
    {
      source: '**',
      function: 'nextApp'
    }
  ]
};

// Write the modified firebase.json
fs.writeFileSync(firebaseConfigPath, JSON.stringify(firebaseConfig, null, 2));

try {
  console.log('Building Next.js app with modified config...');
  execSync('next build', { stdio: 'inherit' });

  console.log('Building Firebase functions...');
  execSync('npm run build --prefix functions', { stdio: 'inherit' });

  console.log('Deploying to Firebase...');
  execSync('firebase deploy --only functions,hosting --debug', { stdio: 'inherit' });

  console.log('Deployment completed!');
} catch (error) {
  console.error('Deployment failed:', error);
} finally {
  // Restore the original next.config.js
  fs.writeFileSync(nextConfigPath, originalNextConfig);
  fs.unlinkSync(backupNextConfigPath);
  console.log('Restored original next.config.js');

  // Restore the original firebase.json
  fs.writeFileSync(firebaseConfigPath, originalFirebaseConfig);
  fs.unlinkSync(backupFirebaseConfigPath);
  console.log('Restored original firebase.json');
}
