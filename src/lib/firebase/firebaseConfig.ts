// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAnalytics, isSupported } from 'firebase/analytics';

// Read Firebase configuration from environment variables
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID // Optional
};

// Basic validation to ensure environment variables are set
if (!firebaseConfig.apiKey || !firebaseConfig.projectId) {
  console.error("Firebase configuration environment variables are missing!");
  // Optionally throw an error or handle this case appropriately
  // throw new Error("Firebase configuration environment variables are missing!");
}

// Initialize Firebase for SSR and SSG, prevent re-initialization on client-side
// Check if all required config values are present before initializing
const canInitialize = firebaseConfig.apiKey && firebaseConfig.authDomain && firebaseConfig.projectId;
const app = canInitialize && !getApps().length ? initializeApp(firebaseConfig) : (canInitialize ? getApp() : null);

// Ensure app is initialized before getting other services
const auth = app ? getAuth(app) : null;
const db = app ? getFirestore(app) : null;
const storage = app ? getStorage(app) : null;

// Initialize Analytics only if supported (runs client-side) and app is initialized
let analytics = null;
if (app && typeof window !== 'undefined') {
  isSupported().then((supported) => {
    if (supported) {
      analytics = getAnalytics(app);
    }
  });
}

// Export potentially null services - consuming code should check for null
export { app, auth, db, storage, analytics };
// Exporting the config read from env vars might expose undefined values if not set
// export default firebaseConfig;
