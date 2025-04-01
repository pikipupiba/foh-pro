import type { Meta, StoryObj } from '@storybook/react';
import { userEvent, within } from '@storybook/test'; // Use @storybook/test for interactions
import LoginForm from '@/components/auth/LoginForm';

// Mock next/router using Storybook parameters or decorators if needed.
// For basic rendering, it might not be necessary.
// If interaction requires router.push, mock it via args or a decorator.
import { useRouter } from 'next/router';

// Mock firebase/auth functions as needed within stories or using addons.
import { signInWithEmailAndPassword } from 'firebase/auth';

// Mock the firebase config if necessary, potentially via parameters/decorators
// or by mocking the import if using a test runner environment alongside Storybook.

// Mock the OAuthSignInButtons component using Storybook's features
import OAuthSignInButtons from '@/components/auth/OAuthSignInButtons';


const meta: Meta<typeof LoginForm> = {
  title: 'Auth/LoginForm',
  component: LoginForm,
  parameters: {
    layout: 'centered',
    // Provide mocks for dependencies if needed globally
    moduleMock: { // Example using a hypothetical module mock addon/feature
      'next/router': {
        useRouter: () => ({
          push: (path: string) => console.log(`Mock push to: ${path}`),
        }),
      },
      '@/components/auth/OAuthSignInButtons': () => <div data-testid="mock-oauth-buttons">[Mock OAuth Buttons]</div>,
      // Mock firebase config if needed globally
      '@/lib/firebase/firebaseConfig': { auth: {}, db: {}, storage: {} },
    },
  },
  // Provide mocks for functions via args if they need to vary per story
  args: {
      // Example: provide mock implementations via args
      onSignIn: (email: string, pass: string) => { console.log('Mock Sign In Attempt:', email); return Promise.resolve(); },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Default story - initial state
export const Default: Story = {};

// Story simulating the loading state after submission attempt
export const Loading: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    // Simulate user typing
    await userEvent.type(canvas.getByLabelText(/Email Address/i), 'test@example.com');
    await userEvent.type(canvas.getByLabelText(/Password/i), 'password123');
    // Mock the login function directly for this story's interaction
    // This requires adapting the component or using more advanced mocking (e.g., MSW addon)
    // For now, we'll assume the button click triggers internal state change visually
    // without actually calling the mocked firebase function in this simplified setup.
    // If direct mocking is needed:
    // const mockSignIn = args.onSignIn as jest.Mock; // Assuming onSignIn is passed via args
    // mockSignIn.mockImplementation(() => new Promise(resolve => setTimeout(resolve, 2000)));
    // Simulate click
    await userEvent.click(canvas.getByRole('button', { name: /Login/i }));
    // At this point, the button text should change to 'Logging In...'
  },
};

// Story simulating an error state after submission attempt
export const Error: Story = {
    play: async ({ canvasElement }) => {
      const canvas = within(canvasElement);
      // Simulate user typing invalid data or trigger error condition
      await userEvent.type(canvas.getByLabelText(/Email Address/i), 'invalid-email');
      await userEvent.type(canvas.getByLabelText(/Password/i), 'wrong');
      // Mock the login function to reject with an error for this story
      // Similar to Loading story, direct mocking needs component adaptation or advanced tools.
      // const mockSignIn = args.onSignIn as jest.Mock;
      // mockSignIn.mockImplementation(() => Promise.reject({ code: 'auth/invalid-credential' }));
      // Simulate click
      await userEvent.click(canvas.getByRole('button', { name: /Login/i }));
      // At this point, an error message should be visible
    },
  };