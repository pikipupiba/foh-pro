import type { Meta, StoryObj } from '@storybook/react';
import { useEffect } from 'react';
import AuthStatus from '@/components/auth/AuthStatus';
import useStore from '@/store'; // Import the Zustand store

// Mock the Next.js Link component for Storybook
const MockLink = ({ href, children, ...props }: { href: string; children: React.ReactNode; [key: string]: any }) => (
  <a href={href} {...props} onClick={(e) => e.preventDefault()}>
    {children}
  </a>
);

// If 'next/link' mocking is needed beyond the simple MockLink component,
// consider using Storybook addons or webpack aliases.

// Mock firebase/auth signOut
// Removed firebase mocks. The component might error if actions like
// signOut are triggered within the story, but rendering states should work.
// If needed, provide manual mocks or use Storybook addons for Firebase.


const meta: Meta<typeof AuthStatus> = {
  title: 'Auth/AuthStatus',
  component: AuthStatus,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  // Define argTypes for the custom args used by the decorator
  argTypes: {
    mockUser: { control: { type: null } }, // Not a real prop, hide from controls
    mockLoading: { control: { type: null } }, // Not a real prop, hide from controls
  },
  decorators: [
    (Story, context) => {
      // Reset store state before each story renders
      useEffect(() => {
        // Type assertion for context.args to include our custom controls
        const args = context.args as { mockUser?: any; mockLoading?: boolean };
        useStore.setState({ user: null, isLoading: false, error: null }); // Reset to default
        // Apply story-specific state
        if (args.mockUser) {
          useStore.setState({ user: args.mockUser, isLoading: false });
        }
        if (args.mockLoading) {
            useStore.setState({ isLoading: true, user: null });
        }
      }, [context.args]); // Re-run effect if args change

      return <Story />;
    },
  ],
};

export default meta;
// Define the type for Story including the custom args
type Story = StoryObj<typeof meta & { args: { mockUser?: any; mockLoading?: boolean } }>;

// Story for the default state (Logged Out)
export const LoggedOut: Story = {
  args: {
    // No specific args needed, the decorator resets to logged out by default
    mockUser: null,
    mockLoading: false,
  },
};

// Story for the Loading state
export const Loading: Story = {
    args: {
        mockUser: null, // Ensure user is null when loading
        mockLoading: true,
    },
};

// Story for the Logged In state
export const LoggedIn: Story = {
    args: {
        mockUser: { uid: '123', email: 'test@example.com' }, // Example user object
        mockLoading: false,
    }
};