'use client';

import React, { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import FormAutoFill from '@/components/debug/FormAutoFill';
import { UserRole } from '@/lib/auth/roles';
import useStore from '@/store';
import { signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth, db } from '@/lib/firebase/firebaseConfig';
import { initializeTestAccounts } from '@/lib/firebase/initTestAccounts';

// Test account credentials
const TEST_ACCOUNTS = [
  {
    email: 'manager@google.com',
    password: 'password123',
    role: UserRole.ADMIN,
    label: 'Manager',
    color: 'bg-rose-500',
  },
  {
    email: 'employee@google.com',
    password: 'password123',
    role: UserRole.EMPLOYEE,
    label: 'Employee',
    color: 'bg-blue-500',
  },
  {
    email: 'customer@google.com',
    password: 'password123',
    role: UserRole.CUSTOMER,
    label: 'Customer',
    color: 'bg-emerald-500',
  },
];

const EnvironmentIndicator: React.FC = () => {
  const router = useRouter();
  const { user, setUserRole, setLastKnownRole, setUser, setLoading } = useStore();
  const [isLoading, setIsLoading] = useState<string | null>(null);
  const [accountsInitialized, setAccountsInitialized] = useState<boolean>(false);

  // Initialize test accounts when in development mode and using emulators
  const initAccounts = useCallback(async () => {
    if (process.env.NODE_ENV !== 'production' &&
        process.env.NEXT_PUBLIC_USE_FIREBASE_EMULATORS === 'true' &&
        !accountsInitialized) {
      try {
        await initializeTestAccounts();
        setAccountsInitialized(true);
      } catch (error) {
        console.error('Failed to initialize test accounts:', error);
      }
    }
  }, [accountsInitialized]);

  // Call initAccounts when the component mounts
  useEffect(() => {
    initAccounts();
  }, [initAccounts]);

  // Only show in development mode
  if (process.env.NODE_ENV === 'production') {
    return null;
  }

  // Login function that uses Firebase authentication with test accounts
  const handleDirectLogin = async (role: UserRole, label: string, email: string, password: string) => {
    setIsLoading(label);
    console.log(`Attempting to log in as ${label} with role: ${role}`);

    try {
      if (!auth) {
        console.error('Firebase auth is not initialized');
        return;
      }

      // Check if emulators are running
      const emulatorsRunning = process.env.NEXT_PUBLIC_USE_FIREBASE_EMULATORS === 'true' &&
                              process.env.NODE_ENV !== 'production';
      console.log(`Emulators running: ${emulatorsRunning}`);

      // First, explicitly set the role in sessionStorage
      if (typeof window !== 'undefined') {
        console.log(`Setting role in sessionStorage: ${role}`);
        sessionStorage.setItem('lastUserRole', role);
      }

      // Set the role in the store
      console.log(`Setting role in store: ${role}`);
      setUserRole(role);
      setLastKnownRole(role);

      // Sign in with Firebase authentication
      console.log(`Signing in with email: ${email}`);
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log(`Successfully logged in as ${label}`, userCredential.user);

      // Force update the store state directly to ensure all properties are set correctly
      useStore.setState(state => ({
        ...state,
        user: userCredential.user,
        userRole: role,
        lastKnownRole: role,
        isLoading: false
      }));

      // Double-check that the role is set correctly
      console.log(`Role after login: ${useStore.getState().userRole}`);
      console.log(`Last known role after login: ${useStore.getState().lastKnownRole}`);

      // Navigate to the dashboard
      router.push('/dashboard');
    } catch (err: any) {
      console.error(`Login failed for ${label}:`, err);

      // Handle different error types
      if (err.code === 'auth/network-request-failed') {
        alert(`Failed to login as ${label}. Error: Network request failed. Make sure Firebase emulators are running.`);
      } else if (err.code === 'auth/user-not-found') {
        // If user not found, try to initialize test accounts and try again
        alert(`Test account ${email} not found. Attempting to create test accounts...`);
        try {
          await initializeTestAccounts();
          setAccountsInitialized(true);
          alert(`Test accounts created. Please try logging in again.`);
        } catch (initError) {
          console.error('Failed to initialize test accounts:', initError);
          alert(`Failed to create test accounts. Please check the console for details.`);
        }
      } else {
        alert(`Failed to login as ${label}. Error: ${err.message}`);
      }

      // Reset the role in the store
      setUserRole(null);
    } finally {
      setIsLoading(null);
    }
  };

  // Check if a user is currently active and which one
  const getCurrentUserEmail = () => {
    return user?.email || null;
  };

  const currentUserEmail = getCurrentUserEmail();

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-yellow-500 text-black text-xs py-1 px-2 flex items-center justify-between">
      <div className="flex items-center">
        <span className="font-medium">Dev Mode</span>
        <span className="mx-2">|</span>
        <FormAutoFill />
      </div>

      <div className="flex items-center space-x-1">
        {TEST_ACCOUNTS.map((account) => {
          const isActive = currentUserEmail === account.email;
          return (
            <Button
              key={account.email}
              size="sm"
              variant={isActive ? "default" : "outline"}
              className={`text-xs px-2 py-0 h-6 ${isActive ? `${account.color} text-white shadow-inner` : 'bg-transparent'}`}
              disabled={isLoading !== null}
              onClick={() => handleDirectLogin(account.role, account.label, account.email, account.password)}
            >
              {isLoading === account.label ? (
                <span className="h-3 w-3 animate-spin rounded-full border-2 border-white border-t-transparent"></span>
              ) : (
                account.label
              )}
            </Button>
          );
        })}
      </div>
    </div>
  );
};

export default EnvironmentIndicator;
