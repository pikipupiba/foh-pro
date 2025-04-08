'use client';

import { createUserWithEmailAndPassword, signOut } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from './firebaseConfig';
import { UserRole } from '@/lib/auth/roles';

// Test account credentials
const TEST_ACCOUNTS = [
  {
    email: 'manager@google.com',
    password: 'password123',
    role: UserRole.ADMIN,
    label: 'Manager',
  },
  {
    email: 'employee@google.com',
    password: 'password123',
    role: UserRole.EMPLOYEE,
    label: 'Employee',
  },
  {
    email: 'customer@google.com',
    password: 'password123',
    role: UserRole.CUSTOMER,
    label: 'Customer',
  },
];

/**
 * Initialize test accounts in the Firebase Auth emulator
 * This should only be called in development mode when using emulators
 */
export const initializeTestAccounts = async (): Promise<void> => {
  if (process.env.NODE_ENV === 'production') {
    console.warn('Test accounts should not be initialized in production');
    return;
  }

  if (!auth || !db) {
    console.error('Firebase auth or Firestore is not initialized');
    return;
  }

  console.log('🔧 Initializing test accounts in Firebase emulators...');

  try {
    for (const account of TEST_ACCOUNTS) {
      try {
        // Create user in Auth
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          account.email,
          account.password
        );
        
        console.log(`✅ Created test account: ${account.label} (${account.email})`);
        
        // Store user role in Firestore
        await setDoc(doc(db, 'users', userCredential.user.uid), {
          email: account.email,
          role: account.role,
          displayName: account.label,
          createdAt: new Date(),
        });
        
        console.log(`✅ Stored role for ${account.label}: ${account.role}`);
        
        // Sign out after creating each user
        await signOut(auth);
      } catch (error: any) {
        // Skip if user already exists (auth/email-already-in-use)
        if (error.code === 'auth/email-already-in-use') {
          console.log(`ℹ️ Test account already exists: ${account.label} (${account.email})`);
        } else {
          console.error(`❌ Error creating test account ${account.email}:`, error);
        }
      }
    }
    
    console.log('🎉 Test accounts initialization complete!');
  } catch (error) {
    console.error('❌ Error initializing test accounts:', error);
  }
};

export default initializeTestAccounts;
