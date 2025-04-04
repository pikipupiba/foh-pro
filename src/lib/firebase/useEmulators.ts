import { getAuth, connectAuthEmulator } from 'firebase/auth';
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore';
import { getStorage, connectStorageEmulator } from 'firebase/storage';
import { getFunctions, connectFunctionsEmulator } from 'firebase/functions';

/**
 * Connect Firebase services to local emulators when in development mode
 * This should be called after Firebase is initialized but before any Firebase services are used
 */
export const connectToEmulators = (app: any) => {
  // Only connect to emulators in development and when not in a production environment
  if (process.env.NODE_ENV !== 'production') {
    try {
      // Check if we're running in a browser environment
      if (typeof window !== 'undefined') {
        console.log('🔥 Connecting to Firebase emulators...');
        
        // Connect Auth emulator
        const auth = getAuth(app);
        connectAuthEmulator(auth, 'http://localhost:9099', { disableWarnings: true });
        console.log('✅ Connected to Auth emulator');
        
        // Connect Firestore emulator
        const firestore = getFirestore(app);
        connectFirestoreEmulator(firestore, 'localhost', 8080);
        console.log('✅ Connected to Firestore emulator');
        
        // Connect Storage emulator
        const storage = getStorage(app);
        connectStorageEmulator(storage, 'localhost', 9199);
        console.log('✅ Connected to Storage emulator');
        
        // Connect Functions emulator
        try {
          const functions = getFunctions(app);
          connectFunctionsEmulator(functions, 'localhost', 5001);
          console.log('✅ Connected to Functions emulator');
        } catch (error) {
          console.warn('⚠️ Failed to connect to Functions emulator:', error);
        }
        
        console.log('🎉 All available emulators connected!');
      }
    } catch (error) {
      console.error('❌ Error connecting to emulators:', error);
    }
  }
};
