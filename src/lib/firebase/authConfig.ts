import { setPersistence, browserLocalPersistence, browserSessionPersistence, inMemoryPersistence } from 'firebase/auth';
import { auth } from './firebaseConfig';

/**
 * Configure Firebase Auth persistence to ensure auth state is maintained during navigation
 * 
 * LOCAL: Persists auth state across browser sessions (most persistent)
 * SESSION: Persists auth state only for the current browser session
 * NONE: Does not persist auth state (least persistent)
 */
export const configureAuthPersistence = async () => {
  if (!auth) {
    console.warn('Auth service not available, cannot configure persistence');
    return;
  }

  try {
    // Use browserLocalPersistence for maximum persistence
    // This ensures auth state is maintained even when the page is refreshed or navigated
    await setPersistence(auth, browserLocalPersistence);
    console.log('Firebase Auth persistence configured to LOCAL');
  } catch (error) {
    console.error('Error configuring auth persistence:', error);
  }
};

/**
 * Get the current auth persistence type as a string
 * Useful for debugging
 */
export const getAuthPersistenceType = (): string => {
  if (!auth) return 'AUTH_NOT_AVAILABLE';
  
  // Firebase doesn't expose the current persistence type directly
  // This is a best-effort attempt to determine it
  try {
    const persistenceKey = `firebase:authUser:${auth.app.options.apiKey}:${auth.app.name}`;
    
    if (localStorage.getItem(persistenceKey)) {
      return 'LOCAL';
    } else if (sessionStorage.getItem(persistenceKey)) {
      return 'SESSION';
    } else {
      return 'NONE';
    }
  } catch (error) {
    return 'UNKNOWN';
  }
};
