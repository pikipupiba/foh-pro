import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware'; // Optional: for debugging and persistence
import { AuthSlice, createAuthSlice } from './authSlice';

// Define the shape of the combined store
// Add other slices here as needed, e.g., CartSlice, SettingsSlice
type StoreState = AuthSlice; // & CartSlice & SettingsSlice;

// Create the main Zustand store
export const useStore = create<StoreState>()(
  // Optional: Enable Redux DevTools integration
  devtools(
    // Optional: Enable state persistence (e.g., to localStorage)
    // persist(
      (...a) => ({
        // Combine all slices into the store
        ...createAuthSlice(...a),
        // ...createCartSlice(...a),
        // ...createSettingsSlice(...a),
      }),
      {
        name: 'foh-pro-store', // Name for DevTools and persistence key
        // Optional: Specify which parts of the state to persist
        // partialize: (state) => ({ user: state.user }),
      }
    // ) // End persist middleware
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