/**
 * Script to set up test accounts in Firebase
 *
 * This script creates three test accounts with different roles:
 * - admin@example.com (Admin)
 * - employee@example.com (Employee)
 * - customer@example.com (Customer)
 *
 * Run with: node scripts/setup-test-accounts.js
 */

const { initializeApp } = require('firebase/app');
const {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile
} = require('firebase/auth');
const {
  getFirestore,
  doc,
  setDoc,
  getDoc
} = require('firebase/firestore');
require('dotenv').config();

// Firebase configuration from environment variables
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// User roles
const UserRole = {
  ADMIN: 'admin',
  EMPLOYEE: 'employee',
  CUSTOMER: 'customer'
};

// Test accounts to create
const testAccounts = [
  {
    email: 'manager@google.com',
    password: 'password123',
    displayName: 'Manager User',
    role: UserRole.ADMIN
  },
  {
    email: 'employee@google.com',
    password: 'password123',
    displayName: 'Employee User',
    role: UserRole.EMPLOYEE
  },
  {
    email: 'customer@google.com',
    password: 'password123',
    displayName: 'Customer User',
    role: UserRole.CUSTOMER
  }
];

/**
 * Create a user account and set up their profile
 */
async function createUserAccount(account) {
  try {
    // Check if user already exists by trying to sign in
    try {
      await signInWithEmailAndPassword(auth, account.email, account.password);
      console.log(`User ${account.email} already exists. Updating profile...`);
    } catch (error) {
      // If user doesn't exist, create a new account
      if (error.code === 'auth/user-not-found') {
        await createUserWithEmailAndPassword(auth, account.email, account.password);
        console.log(`Created new user: ${account.email}`);
      } else {
        throw error;
      }
    }

    // Sign in to get the user object
    const userCredential = await signInWithEmailAndPassword(auth, account.email, account.password);
    const user = userCredential.user;

    // Update display name
    await updateProfile(user, { displayName: account.displayName });
    console.log(`Updated display name for ${account.email}`);

    // Check if user document exists in Firestore
    const userDocRef = doc(db, 'users', user.uid);
    const userDoc = await getDoc(userDocRef);

    if (userDoc.exists()) {
      // Update existing document
      await setDoc(userDocRef, {
        uid: user.uid,
        email: user.email,
        displayName: account.displayName,
        role: account.role,
        updatedAt: new Date()
      }, { merge: true });
      console.log(`Updated user document for ${account.email}`);
    } else {
      // Create new document
      await setDoc(userDocRef, {
        uid: user.uid,
        email: user.email,
        displayName: account.displayName,
        role: account.role,
        createdAt: new Date(),
        updatedAt: new Date()
      });
      console.log(`Created user document for ${account.email}`);
    }

    return user.uid;
  } catch (error) {
    console.error(`Error setting up account for ${account.email}:`, error);
    throw error;
  }
}

/**
 * Main function to set up all test accounts
 */
async function setupTestAccounts() {
  console.log('Setting up test accounts...');

  try {
    for (const account of testAccounts) {
      console.log(`\nProcessing account: ${account.email} (${account.role})`);
      const userId = await createUserAccount(account);
      console.log(`Successfully set up ${account.role} account: ${account.email} (${userId})`);
    }

    console.log('\nAll test accounts have been set up successfully!');
    console.log('\nTest account credentials:');
    testAccounts.forEach(account => {
      console.log(`- ${account.role.toUpperCase()}: ${account.email} / ${account.password}`);
    });
  } catch (error) {
    console.error('Error setting up test accounts:', error);
  } finally {
    // Exit the process
    process.exit(0);
  }
}

// Run the script
setupTestAccounts();

