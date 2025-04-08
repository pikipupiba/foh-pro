'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import FormAutoFill from '@/components/debug/FormAutoFill';
import { UserRole } from '@/lib/auth/roles';
import useStore from '@/store';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/lib/firebase/firebaseConfig';

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

  // Only show in development mode
  if (process.env.NODE_ENV === 'production') {
    return null;
  }

  // Login function that uses Firebase authentication with test accounts
  const handleDirectLogin = async (role: UserRole, label: string, email: string, password: string) => {
    setIsLoading(label);

    try {
      if (!auth) {
        console.error('Firebase auth is not initialized');
        return;
      }

      // Sign in with Firebase authentication
      await signInWithEmailAndPassword(auth, email, password);
      console.log(`Successfully logged in as ${label}`);

      // The auth state listener in the store will handle updating the user and role
      // We just need to make sure the role is set correctly
      setUserRole(role);
      setLastKnownRole(role);

      // Navigate to the dashboard
      router.push('/dashboard');
    } catch (err: any) {
      console.error(`Login failed for ${label}:`, err);
      alert(`Failed to login as ${label}. Error: ${err.message}`);
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
