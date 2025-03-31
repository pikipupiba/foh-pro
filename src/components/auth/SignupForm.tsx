import React, { useState, FormEvent } from 'react';
import { useRouter } from 'next/router';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/lib/firebase/firebaseConfig';
import OAuthSignInButtons from './OAuthSignInButtons'; // Import the OAuth buttons
// import { doc, setDoc } from 'firebase/firestore'; // To create user doc
// import { db } from '@/lib/firebase/firebaseConfig'; // Firestore instance

const SignupForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // const [confirmPassword, setConfirmPassword] = useState(''); // Optional
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    // Optional: Add password confirmation check
    // if (password !== confirmPassword) {
    //   setError("Passwords do not match.");
    //   setIsLoading(false);
    //   return;
    // }

    if (!auth) {
      setError("Authentication service is not available.");
      setIsLoading(false);
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log('Signup successful:', user.uid);

      // Optional: Create a user document in Firestore
      // if (db && user) {
      //   try {
      //     await setDoc(doc(db, "users", user.uid), {
      //       uid: user.uid,
      //       email: user.email,
      //       role: 'customer', // Default role
      //       createdAt: new Date(),
      //     });
      //     console.log('User document created in Firestore');
      //   } catch (firestoreError) {
      //     console.error("Error creating user document:", firestoreError);
      //     // Decide how to handle this - maybe log it, but let signup proceed?
      //   }
      // }

      // Redirect to dashboard after successful signup
      router.push('/dashboard');
    } catch (err: any) {
      console.error('Signup failed:', err);
      let errorMessage = "Signup failed. Please try again.";
      if (err.code === 'auth/email-already-in-use') {
        errorMessage = "This email address is already registered.";
      } else if (err.code === 'auth/weak-password') {
        errorMessage = "Password is too weak. Please use at least 6 characters.";
      } else if (err.code === 'auth/invalid-email') {
        errorMessage = "Please enter a valid email address.";
      }
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="p-3 bg-red-100 text-red-700 border border-red-300 rounded text-sm">
          {error}
        </div>
      )}
      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Email Address
        </label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full px-3 py-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-lime-500 focus:border-lime-500"
          disabled={isLoading}
        />
      </div>
      <div>
        <label
          htmlFor="password"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Password (min. 6 characters)
        </label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full px-3 py-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-lime-500 focus:border-lime-500"
          disabled={isLoading}
        />
      </div>
      {/* Optional: Confirm Password Field */}
      {/* <div>
        <label htmlFor="confirmPassword" >Confirm Password</label>
        <input type="password" id="confirmPassword" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required disabled={isLoading} />
      </div> */}
      <button
        type="submit"
        className="w-full bg-lime-green text-black font-inter-bold py-2 px-4 rounded hover:bg-opacity-80 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={isLoading}
      >
        {isLoading ? 'Creating Account...' : 'Create Account'}
      </button>

      {/* Divider */}
      <div className="relative my-4">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-white text-gray-500">OR</span>
        </div>
      </div>

      {/* OAuth Buttons */}
      <OAuthSignInButtons />
    </form>
  );
};

export default SignupForm;