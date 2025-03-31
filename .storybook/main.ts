import type { StorybookConfig } from '@storybook/react-webpack5';
// Removed path import as it's no longer needed

const config: StorybookConfig = {
  stories: ['../src/stories/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials', // Keep essentials for PostCSS etc.
    '@storybook/addon-interactions', // For interaction testing
    '@storybook/nextjs', // Add the Next.js addon
  ],
  framework: {
    name: '@storybook/react-webpack5',
    options: {},
  },
  docs: {
    autodocs: 'tag', // Enable automatic documentation generation
  },
  staticDirs: ['../public'], // Make files in ../public available
  // Removed webpackFinal section entirely to rely on @storybook/nextjs addon for SWC transpilation
};
export default config;
