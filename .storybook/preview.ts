import type { Preview } from '@storybook/react';
import '../src/styles/globals.css'; // Import global styles to apply Tailwind

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    // Add other global parameters or decorators here if needed
  },
};

export default preview;
