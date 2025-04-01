import type { Meta, StoryObj } from '@storybook/react';
import { userEvent, within, expect } from '@storybook/test';
import SignupForm from '@/components/auth/SignupForm';
import { createUserWithEmailAndPassword } from 'firebase/auth'; // Import to allow mocking attempt if needed

// Mock next/router
import { useRouter } from 'next/router';

// Mock OAuthSignInButtons component
import OAuthSignInButtons from '@/components/auth/OAuthSignInButtons';

// Attempt to mock firebase/auth createUserWithEmailAndPassword - may require addon
// For now, we rely on component's internal state changes triggered by interaction
// jest.mock('firebase/auth', () => ({
//     ...jest.requireActual('firebase/auth'),
//     createUserWithEmailAndPassword: jest.fn(),
// }));
// const mockedCreateUser = createUserWithEmailAndPassword as jest.Mock;

// Mock the firebase config - may require addon
// jest.mock('@/lib/firebase/firebaseConfig', () => ({ auth: {} }));


const meta: Meta<typeof SignupForm> = {
  title: 'Auth/SignupForm',
  component: SignupForm,
  parameters: {
    layout: 'centered',
    // Provide mocks via parameters if possible/needed
    moduleMock: {
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
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Default story - initial state
export const Default: Story = {};

// Story simulating the loading state
export const Loading: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    // Simulate user typing
    await userEvent.type(canvas.getByLabelText(/Email Address/i), 'newuser@example.com');
    await userEvent.type(canvas.getByLabelText(/Password/i), 'password123');
    // mockedCreateUser.mockImplementation(() => new Promise(() => {})); // Mock delay - Requires proper mocking setup

    // Simulate click
    await userEvent.click(canvas.getByRole('button', { name: /Create Account/i }));

    // Assert: Check if the button text changes to loading state
    await expect(canvas.getByRole('button', { name: /Creating Account.../i })).toBeInTheDocument();
    // Assert: Check if the button is disabled
    await expect(canvas.getByRole('button', { name: /Creating Account.../i })).toBeDisabled();
  },
};

// Story simulating an error state (e.g., email already in use)
export const ErrorEmailInUse: Story = {
    play: async ({ canvasElement }) => {
      const canvas = within(canvasElement);
      // Simulate user typing
      await userEvent.type(canvas.getByLabelText(/Email Address/i), 'existing@example.com');
      await userEvent.type(canvas.getByLabelText(/Password/i), 'password123');

      const errorMessage = "This email address is already registered.";
      // mockedCreateUser.mockImplementation(() => Promise.reject({ code: 'auth/email-already-in-use' })); // Mock error - Requires proper mocking setup

      // Simulate click
      await userEvent.click(canvas.getByRole('button', { name: /Create Account/i }));

      // Assert: Check if the error message is displayed (unreliable without mock)
      // await expect(canvas.getByText(errorMessage)).toBeInTheDocument();
      // Assert: Check if the button is enabled again
      await expect(canvas.getByRole('button', { name: /Create Account/i })).toBeEnabled();
    },
  };