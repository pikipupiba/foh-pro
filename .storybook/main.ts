import type { StorybookConfig } from '@storybook/react-webpack5';

const config: StorybookConfig = {
  stories: ['../src/stories/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials', // Keep essentials for PostCSS etc.
    '@storybook/addon-interactions', // For interaction testing
  ],
  framework: {
    name: '@storybook/react-webpack5',
    options: {},
  },
  docs: {
    autodocs: 'tag', // Enable automatic documentation generation
  },
  staticDirs: ['../public'], // Make files in ../public available
  // Removed custom webpackFinal configuration to rely on framework defaults
};
export default config;
