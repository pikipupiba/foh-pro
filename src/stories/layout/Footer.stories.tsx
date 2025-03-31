import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import Footer from '../../../src/components/layout/Footer'; // Adjust path as needed
// Removed MemoryRouterProvider import

// @storybook/nextjs addon should handle routing context
const meta: Meta<typeof Footer> = {
  title: 'Layout/Footer',
  component: Footer,
  // Removed MemoryRouterProvider decorator
  parameters: {
    layout: 'fullscreen', // Use fullscreen layout as footer spans width
    nextjs: { // Add this if you need specific Next.js routing behavior mocks
      appDirectory: true, // Assuming App Router if applicable, adjust if using Pages Router
      // router: {
      //   pathname: '/some-path', // Example: Mock specific path
      // },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Footer>;

export const Default: Story = {
  args: {
    // No props needed for this basic footer yet
  },
};
