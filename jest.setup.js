// Learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

// Mock Next.js router
jest.mock('next/router', () => require('next-router-mock'));

// Mock next/image
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props) => {
    // eslint-disable-next-line jsx-a11y/alt-text
    return <img {...props} />;
  },
}));

// Mock Firebase
jest.mock('firebase/app', () => {
  return {
    initializeApp: jest.fn(() => ({})),
    getApps: jest.fn(() => []),
    getApp: jest.fn(() => ({})),
  };
});

jest.mock('firebase/auth', () => {
  return {
    getAuth: jest.fn(() => ({})),
    onAuthStateChanged: jest.fn(() => jest.fn()),
    signOut: jest.fn(() => Promise.resolve()),
  };
});

jest.mock('firebase/firestore', () => {
  return {
    getFirestore: jest.fn(() => ({})),
    collection: jest.fn(),
    getDocs: jest.fn(),
    addDoc: jest.fn(),
    serverTimestamp: jest.fn(),
  };
});

jest.mock('firebase/storage', () => {
  return {
    getStorage: jest.fn(() => ({})),
  };
});

jest.mock('firebase/analytics', () => {
  return {
    getAnalytics: jest.fn(() => ({})),
    isSupported: jest.fn(() => Promise.resolve(true)),
  };
});

jest.mock('firebase/functions', () => {
  return {
    getFunctions: jest.fn(() => ({})),
  };
});

// Mock our Firebase config
jest.mock('./src/lib/firebase/firebaseConfig', () => {
  return {
    app: {},
    auth: {
      onAuthStateChanged: jest.fn(() => {
        return jest.fn();
      }),
    },
    db: {},
    storage: {},
    functions: {},
    analytics: {},
  };
});

// Mock Zustand store
jest.mock('./src/store', () => {
  return jest.fn(() => ({
    user: null,
    isLoading: false,
    error: null,
    initializeAuthListener: jest.fn(() => jest.fn()),
    cleanupAuthListener: jest.fn(),
  }));
});

// Global console mocks to reduce noise in tests
global.console = {
  ...console,
  // Uncomment to ignore specific console methods during tests
  // log: jest.fn(),
  // debug: jest.fn(),
  // info: jest.fn(),
  // warn: jest.fn(),
  error: jest.fn(),
};
