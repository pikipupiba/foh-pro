import { StateCreator } from 'zustand';
import { User, onAuthStateChanged, Unsubscribe } from 'firebase/auth';
import { auth } from '@/lib/firebase/firebaseConfig'; // Adjust path if needed

// Define the shape of the Auth state
export interface AuthState {
  user: User | null; // Current authenticated user or null
  isLoading: boolean; // Loading state for auth operations
  error: string | null; // Potential auth errors
  isInitialized: boolean; // Tracks if the auth state listener has been set up
  unsubscribeAuth: Unsubscribe | null; // To store the unsubscribe function
}

// Define the actions available on the Auth slice
export interface AuthActions {
  setUser: (user: User | null) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  initializeAuthListener: () => Unsubscribe; // Returns the unsubscribe function
  cleanupAuthListener: () => void;
}

// Combine state and actions into a single type for the slice
export type AuthSlice = AuthState & AuthActions;

// Create the Zustand slice for authentication
export const createAuthSlice: StateCreator<AuthSlice, [], [], AuthSlice> = (set, get) => ({
  // Initial State
  user: null,
  isLoading: true, // Start loading until the listener confirms the state
  error: null,
  isInitialized: false,
  unsubscribeAuth: null,

  // Actions
  setUser: (user) => set({ user, isLoading: false, error: null }),
  setLoading: (loading) => set({ isLoading: loading }),
  setError: (error) => set({ error, isLoading: false }),

  initializeAuthListener: () => {
    if (get().isInitialized || !auth) {
      // Already initialized or auth service not available
      return get().unsubscribeAuth ?? (() => {}); // Return existing or no-op
    }

    set({ isLoading: true, isInitialized: true });

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log('Auth state changed:', user?.uid ?? 'No user');
      set({ user, isLoading: false, error: null });
    }, (error) => {
      console.error('Auth state listener error:', error);
      set({ user: null, isLoading: false, error: error.message });
    });

    set({ unsubscribeAuth: unsubscribe });
    return unsubscribe; // Return the unsubscribe function
  },

  cleanupAuthListener: () => {
    const unsubscribe = get().unsubscribeAuth;
    if (unsubscribe) {
      console.log('Cleaning up auth listener');
      unsubscribe();
      set({ unsubscribeAuth: null, isInitialized: false });
    }
  },
});