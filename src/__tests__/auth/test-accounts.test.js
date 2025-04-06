/**
 * @jest-environment node
 */

// This test verifies that the test accounts are working correctly
// It requires the Firebase emulators to be running

const { initializeApp } = require('firebase/app');
const { 
  getAuth, 
  signInWithEmailAndPassword,
  connectAuthEmulator
} = require('firebase/auth');
const { 
  getFirestore, 
  doc, 
  getDoc,
  connectFirestoreEmulator
} = require('firebase/firestore');

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

// Test accounts
const testAccounts = [
  {
    email: 'manager@google.com',
    password: 'password123',
    expectedRole: 'admin'
  },
  {
    email: 'employee@google.com',
    password: 'password123',
    expectedRole: 'employee'
  },
  {
    email: 'customer@google.com',
    password: 'password123',
    expectedRole: 'customer'
  }
];

// Skip these tests if the emulators are not running
const describeIfEmulatorsRunning = process.env.SKIP_EMULATOR_TESTS ? describe.skip : describe;

describeIfEmulatorsRunning('Test Accounts', () => {
  let app;
  let auth;
  let db;

  beforeAll(async () => {
    try {
      // Initialize Firebase
      app = initializeApp(firebaseConfig);
      auth = getAuth(app);
      db = getFirestore(app);

      // Connect to emulators
      connectAuthEmulator(auth, 'http://localhost:9099', { disableWarnings: true });
      connectFirestoreEmulator(db, 'localhost', 8080);
    } catch (error) {
      console.error(`
        ❌ Error connecting to Firebase emulators
        These tests require the Firebase emulators to be running.
        Start them with: firebase emulators:start
      `);
      process.env.SKIP_EMULATOR_TESTS = 'true';
    }
  });

  // Test each account
  testAccounts.forEach(account => {
    describe(`${account.email} (${account.expectedRole})`, () => {
      it('should be able to sign in', async () => {
        try {
          const userCredential = await signInWithEmailAndPassword(auth, account.email, account.password);
          expect(userCredential.user).toBeTruthy();
          expect(userCredential.user.email).toBe(account.email);
        } catch (error) {
          console.error(`Error signing in with ${account.email}:`, error);
          throw error;
        }
      }, 10000);

      it('should have the correct role in Firestore', async () => {
        try {
          // Sign in to get the user
          const userCredential = await signInWithEmailAndPassword(auth, account.email, account.password);
          const user = userCredential.user;

          // Get the user document from Firestore
          const userDoc = await getDoc(doc(db, 'users', user.uid));
          
          // Verify the document exists
          expect(userDoc.exists()).toBe(true);
          
          // Verify the role
          expect(userDoc.data().role).toBe(account.expectedRole);
        } catch (error) {
          console.error(`Error checking role for ${account.email}:`, error);
          throw error;
        }
      }, 10000);
    });
  });
});
