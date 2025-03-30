// postcss.config.js
// Using TypeScript syntax for potential future type checking
/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    '@tailwindcss/postcss': {}, // Use the Tailwind v4 PostCSS plugin
    // autoprefixer is no longer needed as Tailwind v4 handles prefixes
  },
};

module.exports = config;
