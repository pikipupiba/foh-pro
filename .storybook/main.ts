import type { StorybookConfig } from '@storybook/react-webpack5';
import path from 'path'; // Re-add path import if needed by other parts, though not strictly by this webpackFinal

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
  webpackFinal: async (config) => {
    // Ensure .ts and .tsx files are processed by babel-loader, which should pick up .babelrc
    config.module = config.module || {};
    config.module.rules = config.module.rules || [];

    // Add a specific rule for TS/TSX files using babel-loader
    // We don't specify options here, letting babel-loader find .babelrc
    config.module.rules.push({
      test: /\.(ts|tsx)$/,
      loader: require.resolve('babel-loader'),
      exclude: /node_modules/, // Standard exclusion
    });

    // We are intentionally NOT adding back the PostCSS configuration here,
    // relying on @storybook/addon-essentials for that.

    return config;
  },
};
export default config;
