import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware'; // Optional: for debugging and persistence
import type { PersistStorage } from 'zustand/middleware';
import { AuthSlice, createAuthSlice } from './authSlice';

// Define the shape of the combined store
// Add other slices here as needed, e.g., CartSlice, SettingsSlice
type StoreState = AuthSlice; // & CartSlice & SettingsSlice;

// Create a custom storage object that works in both browser and SSR
const customStorage: PersistStorage<StoreState> = {
  getItem: (name) => {
    if (typeof window === 'undefined') return null;
    const value = localStorage.getItem(name);
    // Parse the stored value to match the expected return type
    if (value) {
      try {
        return JSON.parse(value);
      } catch (e) {
        return null;
      }
    }
    return null;
  },
  setItem: (name, value) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(name, JSON.stringify(value));
    }
  },
  removeItem: (name) => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(name);
    }
  },
};

// Create the main Zustand store
export const useStore = create<StoreState>()(
  // Enable Redux DevTools integration
  devtools(
    // Enable state persistence to localStorage
    persist(
      (...a) => ({
        // Combine all slices into the store
        ...createAuthSlice(...a),
        // ...createCartSlice(...a),
        // ...createSettingsSlice(...a),
      }),
      {
        name: 'foh-pro-store', // Name for DevTools and persistence key
        // @ts-ignore - We're intentionally only persisting a subset of the state
        partialize: (state) => ({
          userRole: state.userRole,
          lastKnownRole: state.lastKnownRole,
        }),
        // Use our custom storage implementation
        storage: customStorage,
      }
    ) // End persist middleware
  ) // End devtools middleware
);

// Export the hook for components to use
export default useStore;

// --- Usage Example in a Component ---
// import useStore from '@/store';
//
// const MyComponent = () => {
//   const user = useStore((state) => state.user);
//   const isLoading = useStore((state) => state.isLoading);
//   const initializeAuth = useStore((state) => state.initializeAuthListener);
//   const cleanupAuth = useStore((state) => state.cleanupAuthListener);
//
//   React.useEffect(() => {
//     const unsubscribe = initializeAuth();
//     return () => {
//       cleanupAuth(); // Clean up listener on component unmount
//     };
//   }, [initializeAuth, cleanupAuth]);
//
//   if (isLoading) return <div>Loading auth state...</div>;
//
//   return user ? <div>Welcome, {user.email}</div> : <div>Please log in</div>;
// };