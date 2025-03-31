import React from 'react';
import type { Meta, StoryObj } from '@storybook/react'; // Added comma
import Footer from '../../../src/components/layout/Footer'; // Adjust path as needed
import { MemoryRouterProvider } from 'next-router-mock/MemoryRouterProvider'; // Needed for Next.js Link component

// Mock next/link behavior in Storybook
const meta: Meta<typeof Footer> = {
  title: 'Layout/Footer',
  component: Footer,
  decorators: [
    (Story) => (
      <MemoryRouterProvider>
        <Story />
      </MemoryRouterProvider>
    ),
  ],
  parameters: {
    layout: 'fullscreen', // Use fullscreen layout as footer spans width
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
