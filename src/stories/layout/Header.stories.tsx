import React from 'react';
import type { Meta, StoryObj } from '@storybook/react'; // Added comma
import Header from '../../../src/components/layout/Header'; // Adjust path as needed
import { MemoryRouterProvider } from 'next-router-mock/MemoryRouterProvider'; // Needed for Next.js Link component

// Mock next/link behavior in Storybook
const meta: Meta<typeof Header> = {
  title: 'Layout/Header',
  component: Header,
  decorators: [
    (Story) => (
      <MemoryRouterProvider>
        <Story />
      </MemoryRouterProvider>
    ),
  ],
  parameters: {
    layout: 'fullscreen', // Use fullscreen layout as header spans width
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Header>;

export const Default: Story = {
  args: {
    // No props needed for this basic header yet
  },
};
