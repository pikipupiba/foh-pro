import React from 'react';
import Link from 'next/link'; // Import Link
import useStore from '@/store'; // Import the Zustand store hook
import { auth } from '@/lib/firebase/firebaseConfig'; // Import auth for sign out
import { signOut } from 'firebase/auth';

const AuthStatus: React.FC = () => {
  const user = useStore((state) => state.user);
  const isLoading = useStore((state) => state.isLoading);

  const handleLogout = async () => {
    if (!auth) {
      console.error("Auth service not available for logout.");
      return;
    }
    try {
      await signOut(auth);
      // Zustand listener in authSlice will automatically update the user state to null
      console.log('User logged out successfully');
    } catch (error) {
      console.error('Error logging out:', error);
      // Optionally update the store with the error
      // useStore.getState().setError(error.message);
    }
  };

  if (isLoading) {
    return <div className="text-sm text-gray-500">Loading...</div>;
  }

  return (
    <div className="flex items-center space-x-2">
      {user ? (
        <>
          <span className="text-sm text-gray-700 hidden sm:inline">Welcome, {user.email}</span>
          <button
            onClick={handleLogout}
            className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
          >
            Logout
          </button>
        </>
      ) : (
        <Link
          href="/login"
          className="px-3 py-1 text-sm bg-lime-green text-black font-inter-bold rounded hover:bg-opacity-80 transition-colors"
        >
          Login
        </Link>
      )}
    </div>
  );
};

export default AuthStatus;