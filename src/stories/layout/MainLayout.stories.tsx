import React from 'react';
import type { Meta, StoryObj } from '@storybook/react'; // Added comma
import MainLayout from '../../../src/components/layout/MainLayout'; // Adjust path
import { MemoryRouterProvider } from 'next-router-mock/MemoryRouterProvider'; // Needed for Next.js Link component

const meta: Meta<typeof MainLayout> = {
  title: 'Layout/MainLayout',
  component: MainLayout,
  decorators: [
    (Story) => (
      <MemoryRouterProvider>
        <Story />
      </MemoryRouterProvider>
    ),
  ],
  parameters: {
    layout: 'fullscreen', // Use fullscreen layout
  },
  tags: ['autodocs'],
  argTypes: {
    children: { control: 'text' }, // Allow editing children content in Storybook UI
  },
};

export default meta;
type Story = StoryObj<typeof MainLayout>;

export const Default: Story = {
  args: {
    children: (
      <div className="p-4 border border-dashed border-gray-400">
        <h1 className="text-2xl font-bold mb-4">Page Content Area</h1>
        <p>This is where the main content of a page would go.</p>
        <p>The MainLayout component provides the Header and Footer around this content.</p>
      </div>
    ),
  },
};

export const WithLongContent: Story = {
    args: {
      children: (
        <div className="p-4 border border-dashed border-gray-400">
          <h1 className="text-2xl font-bold mb-4">Long Page Content</h1>
          <p>This demonstrates how the layout handles content that might push the footer down.</p>
          {Array.from({ length: 30 }).map((_, i) => (
            <p key={i}>Scrollable content line {i + 1}...</p>
          ))}
        </div>
      ),
    },
  };
