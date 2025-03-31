import React, { useState } from 'react';
import { useRouter } from 'next/router';
import {
  signInWithPopup,
  GoogleAuthProvider,
  AuthError, // Keep AuthError for general typing if needed
} from 'firebase/auth';
import { auth } from '@/lib/firebase/firebaseConfig';
// Import icons (assuming you'll add an icon library like react-icons)
// import { FaGoogle, FaFacebook, FaMicrosoft } from 'react-icons/fa';

// Define provider types for clarity
// No longer needed as we only handle Google
// type ProviderType = 'google';

const OAuthSignInButtons: React.FC = () => {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false); // Simple boolean for loading state
  const router = useRouter();

  const handleGoogleSignIn = async () => {
    if (!auth) {
      setError("Authentication service is not available.");
      return;
    }

    setError(null);
    setIsLoading(true);

    let provider;
    try {
      provider = new GoogleAuthProvider();

      const result = await signInWithPopup(auth, provider);
      console.log(`Google Sign-in successful:`, result.user.uid);

      // Optional: Handle user creation/update in Firestore here if needed
      // based on result.user data (displayName, email, photoURL)

      router.push('/dashboard'); // Redirect on success

    } catch (err: any) {
      console.error(`Google Sign-in failed:`, err);
      let errorMessage = `Failed to sign in with Google. Please try again.`;
      // Handle common OAuth errors
      if (err.code === 'auth/account-exists-with-different-credential') {
        errorMessage = `An account already exists with this email using a different sign-in method. Try logging in with that method.`;
      } else if (err.code === 'auth/popup-closed-by-user') {
        errorMessage = `Sign-in cancelled. The popup was closed before completion.`;
      } else if (err.code === 'auth/cancelled-popup-request') {
        errorMessage = `Sign-in cancelled. Only one popup request is allowed at a time.`;
      }
      // Add more specific error handling if needed
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-3">
       {error && (
        <div className="p-3 bg-red-100 text-red-700 border border-red-300 rounded text-sm">
          {error}
        </div>
      )}
      <button
        type="button"
        onClick={handleGoogleSignIn}
        disabled={isLoading}
        className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
      >
        {/* <FaGoogle className="mr-2" /> */}
        {isLoading ? 'Signing in...' : 'Sign in with Google'}
      </button>
    </div>
  );
};

export default OAuthSignInButtons;