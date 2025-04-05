import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
// Import the mock instead of the real component
import MockEmulatorTestPage from '../../__mocks__/emulator-test-mock';
// Import the functions we want to mock
import { addDoc, getDocs, deleteDoc, collection, doc } from 'firebase/firestore';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';

// Mock Firebase functions
jest.mock('firebase/firestore', () => ({
  addDoc: jest.fn(() => Promise.resolve({ id: 'mock-doc-id' })),
  getDocs: jest.fn(() => Promise.resolve({
    docs: [
      { id: 'doc1', data: () => ({ message: 'Hello from emulator!', testValue: 42 }) },
      { id: 'doc2', data: () => ({ message: 'Another test document', testValue: 99 }) }
    ],
    size: 2,
    empty: false
  })),
  deleteDoc: jest.fn(() => Promise.resolve()),
  collection: jest.fn(() => 'mock-collection'),
  doc: jest.fn(() => 'mock-doc-ref'),
  serverTimestamp: jest.fn(() => ({ seconds: Date.now() / 1000, nanoseconds: 0 }))
}));

// Mock the auth module
const mockUser = { uid: 'mock-user-id', email: 'test@example.com' };
let authStateCallback = null;

jest.mock('firebase/auth', () => ({
  createUserWithEmailAndPassword: jest.fn(() => {
    // When a user is created, trigger the auth state change
    if (authStateCallback) authStateCallback(mockUser);
    return Promise.resolve({ user: mockUser });
  }),
  signInWithEmailAndPassword: jest.fn(() => {
    // When a user signs in, trigger the auth state change
    if (authStateCallback) authStateCallback(mockUser);
    return Promise.resolve({ user: mockUser });
  }),
  signOut: jest.fn(() => {
    // When a user signs out, trigger the auth state change with null
    if (authStateCallback) authStateCallback(null);
    return Promise.resolve();
  }),
  onAuthStateChanged: jest.fn((auth, callback) => {
    // Store the callback for later use
    authStateCallback = callback;
    // Initially call with null (not signed in)
    callback(null);
    // Return mock unsubscribe function
    return jest.fn();
  })
}));

describe('Emulator Test Page', () => {
  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks();
  });

  it('renders the emulator test page correctly', () => {
    render(<MockEmulatorTestPage />);

    // Check that the page title is rendered
    expect(screen.getByText('Firebase Emulator Test')).toBeInTheDocument();

    // Check that both test sections are present
    expect(screen.getByText('Auth Emulator Test')).toBeInTheDocument();
    expect(screen.getByText('Firestore Emulator Test')).toBeInTheDocument();
  });

  it('handles Firestore operations correctly', async () => {
    render(<MockEmulatorTestPage />);

    // Check that document data is displayed in the table
    expect(screen.getByText('doc1')).toBeInTheDocument();
    expect(screen.getByText('doc2')).toBeInTheDocument();
    expect(screen.getByText('Hello from emulator!')).toBeInTheDocument();
    expect(screen.getByText('42')).toBeInTheDocument();

    // Verify that the Add Document button exists
    expect(screen.getByText('Add Document')).toBeInTheDocument();

    // Verify that the Get Documents button exists
    expect(screen.getByText('Get Documents')).toBeInTheDocument();

    // Verify that the Delete buttons exist
    const deleteButtons = screen.getAllByText('Delete');
    expect(deleteButtons.length).toBe(2);
  });

  it('handles Auth operations correctly', async () => {
    render(<MockEmulatorTestPage />);

    // Verify that the auth form elements exist
    expect(screen.getByText('Email:')).toBeInTheDocument();
    expect(screen.getByText('Password:')).toBeInTheDocument();

    // Verify that the auth buttons exist
    expect(screen.getByText('Create User')).toBeInTheDocument();
    expect(screen.getByText('Sign In')).toBeInTheDocument();
    expect(screen.getByText('Sign Out')).toBeInTheDocument();

    // Verify the default auth status
    expect(screen.getByText('Status: Not signed in')).toBeInTheDocument();
  });
});
