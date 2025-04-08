'use client';

import { useEffect } from 'react';
import useStore from '@/store';

interface AuthProviderProps {
  children: React.ReactNode;
}

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  // Get actions from the Zustand store
  const initializeAuthListener = useStore((state) => state.initializeAuthListener);
  const cleanupAuthListener = useStore((state) => state.cleanupAuthListener);

  // Initialize the auth listener on component mount
  useEffect(() => {
    const unsubscribe = initializeAuthListener();
    // Clean up the listener when the app unmounts
    return () => {
      cleanupAuthListener();
    };
    // Run only once on mount
  }, [initializeAuthListener, cleanupAuthListener]);

  return <>{children}</>;
};

export default AuthProvider;
