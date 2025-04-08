'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { UserRole } from '@/lib/auth/roles';
import useStore from '@/store';

// Test account credentials
const TEST_ACCOUNTS = [
  {
    email: 'manager@google.com',
    password: 'password123',
    role: UserRole.ADMIN,
    label: 'Manager',
    color: 'bg-rose-500 hover:bg-rose-600',
  },
  {
    email: 'employee@google.com',
    password: 'password123',
    role: UserRole.EMPLOYEE,
    label: 'Employee',
    color: 'bg-blue-500 hover:bg-blue-600',
  },
  {
    email: 'customer@google.com',
    password: 'password123',
    role: UserRole.CUSTOMER,
    label: 'Customer',
    color: 'bg-emerald-500 hover:bg-emerald-600',
  },
];

// No Firebase initialization needed for direct login

const TestAccountButtons: React.FC = () => {
  const [isLoading, setIsLoading] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const { setUserRole, setLastKnownRole, setUser, setLoading } = useStore();

  // No useEffect needed for direct login

  // Direct login function that bypasses Firebase authentication
  const handleDirectLogin = (role: UserRole, label: string, email: string) => {
    console.log(`Direct login as ${label} with role: ${role}`);
    console.log('Role type:', typeof role);
    console.log('Role value:', role);
    setIsLoading(label);
    setError(null);

    try {
      // Create a mock user object
      const mockUser = {
        uid: `mock-${role}-${Date.now()}`,
        email: email,
        displayName: label,
        emailVerified: true,
        isAnonymous: false,
        metadata: {
          creationTime: new Date().toISOString(),
          lastSignInTime: new Date().toISOString(),
        },
        providerData: [],
        refreshToken: '',
        tenantId: null,
        delete: () => Promise.resolve(),
        getIdToken: () => Promise.resolve('mock-token'),
        getIdTokenResult: () => Promise.resolve({ token: 'mock-token', claims: {}, expirationTime: '', authTime: '', issuedAtTime: '', signInProvider: null, signInSecondFactor: null }),
        reload: () => Promise.resolve(),
        toJSON: () => ({}),
        phoneNumber: null,
        photoURL: null,
        providerId: 'password',
      };

      // Set the user and role in the store
      setUser(mockUser as any);

      // Force update the store state directly
      useStore.setState({
        user: mockUser as any,
        userRole: role,
        lastKnownRole: role,
        isLoading: false
      });

      // Explicitly save to sessionStorage for cross-page persistence
      if (typeof window !== 'undefined') {
        console.log(`Saving role to sessionStorage: ${role}`);
        sessionStorage.setItem('lastUserRole', role);
      }

      console.log('Test account login successful:', {
        role,
        email,
        uid: mockUser.uid
      });

      // Navigate to the dashboard
      console.log('Navigating to dashboard...');
      router.push('/dashboard');
    } catch (err: any) {
      console.error(`Direct login failed for ${label}:`, err);
      setError(`Failed to login as ${label}. ${err.message}`);
    } finally {
      setIsLoading(null);
    }
  };

  // No Firebase authentication needed

  return (
    <div className="space-y-3">
      {error && (
        <div className="p-3 bg-red-100 text-red-700 border border-red-300 rounded text-sm">
          {error}
        </div>
      )}

      <div className="grid grid-cols-3 gap-2">
        {TEST_ACCOUNTS.map((account) => (
          <Button
            key={account.email}
            type="button"
            variant="outline"
            className={`relative overflow-hidden ${isLoading === account.label ? 'opacity-80' : ''}`}
            disabled={isLoading !== null}
            onClick={() => handleDirectLogin(account.role, account.label, account.email)}
          >
            <div className={`absolute inset-0 opacity-15 ${account.color}`}></div>
            <div className="relative z-10 flex flex-col items-center justify-center">
              {isLoading === account.label ? (
                <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : (
                <span className="font-medium">{account.label}</span>
              )}
            </div>
          </Button>
        ))}
      </div>

      <div className="text-center">
        <p className="text-xs text-muted-foreground">
          All test accounts use password: <code className="bg-muted px-1 py-0.5 rounded">password123</code>
        </p>
        {error && (
          <div className="mt-2">
            <p className="text-xs text-muted-foreground">
              If login fails, you can try direct navigation to:
            </p>
            <div className="flex justify-center gap-2 mt-1">
              <button
                onClick={() => router.push('/dashboard')}
                className="text-xs text-primary hover:underline"
              >
                Dashboard
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TestAccountButtons;
