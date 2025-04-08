'use client';

import { StateCreator } from 'zustand';
import { User, onAuthStateChanged, onIdTokenChanged, Unsubscribe } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '@/lib/firebase/firebaseConfig';
import { configureAuthPersistence } from '@/lib/firebase/authConfig';
import { UserRole } from '@/lib/auth/roles';

// Define the shape of the Auth state
export interface AuthState {
  user: User | null; // Current authenticated user or null
  userRole: UserRole | null; // User's role (customer, employee, admin)
  lastKnownRole: UserRole | null; // Last known role, persists even when user is null
  isLoading: boolean; // Loading state for auth operations
  error: string | null; // Potential auth errors
  isInitialized: boolean; // Tracks if the auth state listener has been set up
  unsubscribeAuth: Unsubscribe | null; // To store the unsubscribe function
  unsubscribeToken: Unsubscribe | null; // To store the token change unsubscribe function
}

// Define the actions available on the Auth slice
export interface AuthActions {
  setUser: (user: User | null) => void;
  setUserRole: (role: UserRole | null) => void;
  setLastKnownRole: (role: UserRole | null) => void;
  getEffectiveRole: () => UserRole | null; // Returns userRole or lastKnownRole
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  initializeAuthListener: () => Unsubscribe; // Returns the unsubscribe function
  cleanupAuthListener: () => void;
  fetchUserRole: (userId: string) => Promise<UserRole | null>;
}

// Combine state and actions into a single type for the slice
export type AuthSlice = AuthState & AuthActions;

// Create the Zustand slice for authentication
export const createAuthSlice: StateCreator<AuthSlice, [], [], AuthSlice> = (set, get) => ({
  // Initial State
  user: null,
  userRole: null,
  lastKnownRole: null,
  isLoading: true, // Start loading until the listener confirms the state
  error: null,
  isInitialized: false,
  unsubscribeAuth: null,
  unsubscribeToken: null,

  // Actions
  setUser: (user) => set({ user, isLoading: false, error: null }),

  setUserRole: (role) => {
    // When setting a role, also update lastKnownRole if the role is valid
    if (role) {
      set({ userRole: role, lastKnownRole: role });

      // Also save to sessionStorage for cross-page persistence
      if (typeof window !== 'undefined') {
        sessionStorage.setItem('lastUserRole', role);
      }
    } else {
      set({ userRole: role }); // Only update userRole, preserve lastKnownRole
    }
  },

  setLastKnownRole: (role) => set({ lastKnownRole: role }),

  getEffectiveRole: () => {
    // First try the current userRole
    const { userRole, lastKnownRole } = get();
    if (userRole) return userRole;

    // Then try lastKnownRole from state
    if (lastKnownRole) return lastKnownRole;

    // Then try sessionStorage
    if (typeof window !== 'undefined') {
      const savedRole = sessionStorage.getItem('lastUserRole') as UserRole | null;
      if (savedRole && Object.values(UserRole).includes(savedRole as UserRole)) {
        return savedRole as UserRole;
      }
    }

    // Default to null if no role is found
    return null;
  },

  setLoading: (loading) => set({ isLoading: loading }),
  setError: (error) => set({ error, isLoading: false }),

  // Fetch user role from Firestore
  fetchUserRole: async (userId: string) => {
    try {
      if (!db) return null;

      // Get user document from Firestore
      const userDoc = await getDoc(doc(db, 'users', userId));

      if (userDoc.exists()) {
        const userData = userDoc.data();
        const role = userData.role as UserRole;

        // Update role in state
        set({ userRole: role });
        return role;
      }

      // If no user document exists, default to customer role
      const defaultRole = UserRole.CUSTOMER;
      set({ userRole: defaultRole });
      return defaultRole;
    } catch (error) {
      console.error('Error fetching user role:', error);
      return null;
    }
  },

  initializeAuthListener: () => {
    if (get().isInitialized || !auth) {
      // Already initialized or auth service not available
      return get().unsubscribeAuth ?? (() => {}); // Return existing or no-op
    }

    set({ isLoading: true, isInitialized: true });

    // Configure auth persistence for better reliability during navigation
    configureAuthPersistence().catch(error => {
      console.error('Failed to configure auth persistence:', error);
    });

    // Try to restore role from sessionStorage on initialization
    if (typeof window !== 'undefined') {
      const savedRole = sessionStorage.getItem('lastUserRole') as UserRole | null;
      if (savedRole && Object.values(UserRole).includes(savedRole as UserRole)) {
        set({ lastKnownRole: savedRole as UserRole });
      }
    }

    // Set up the main auth state listener
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      console.log('Auth state changed:', user?.uid ?? 'No user');

      if (user) {
        // Set user immediately to update UI
        set({ user, isLoading: true });

        // Fetch user role
        try {
          await get().fetchUserRole(user.uid);
        } catch (error) {
          console.error('Error fetching user role:', error);
        }

        // Update loading state
        set({ isLoading: false, error: null });
      } else {
        // No user, but preserve the lastKnownRole
        const { lastKnownRole } = get();

        set({
          user: null,
          userRole: null, // Clear current role
          // Note: We're not resetting lastKnownRole here to preserve it during navigation
          isLoading: false,
          error: null
        });

        // Log the state for debugging
        console.log('Auth state reset, lastKnownRole:', lastKnownRole);
      }
    }, (error) => {
      console.error('Auth state listener error:', error);
      set({
        user: null,
        userRole: null,
        isLoading: false,
        error: error.message
        // Note: We're not resetting lastKnownRole here
      });
    });

    // Set up a token change listener as a backup
    // This can sometimes catch auth changes that the main listener misses
    const tokenUnsubscribe = onIdTokenChanged(auth, (user) => {
      console.log('ID token changed:', user?.uid ?? 'No user');
      // We don't need to do anything here, just having the listener helps
    });

    set({
      unsubscribeAuth: unsubscribe,
      unsubscribeToken: tokenUnsubscribe
    });

    return unsubscribe; // Return the main unsubscribe function
  },

  cleanupAuthListener: () => {
    const unsubscribe = get().unsubscribeAuth;
    const tokenUnsubscribe = get().unsubscribeToken;

    if (unsubscribe) {
      console.log('Cleaning up auth state listener');
      unsubscribe();
    }

    if (tokenUnsubscribe) {
      console.log('Cleaning up token change listener');
      tokenUnsubscribe();
    }

    set({
      unsubscribeAuth: null,
      unsubscribeToken: null,
      isInitialized: false
    });
  },
});