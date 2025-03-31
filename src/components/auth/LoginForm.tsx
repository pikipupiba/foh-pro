import React, { useState, FormEvent } from 'react';
import { useRouter } from 'next/router'; // For redirection after login
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/lib/firebase/firebaseConfig'; // Firebase auth instance
import OAuthSignInButtons from './OAuthSignInButtons'; // Import the OAuth buttons
// import useStore from '@/store'; // Optional: To set global errors

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  // const setGlobalError = useStore((state) => state.setError); // Optional

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null); // Clear previous errors
    setIsLoading(true);

    if (!auth) {
      setError("Authentication service is not available.");
      setIsLoading(false);
      return;
    }

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log('Login successful:', userCredential.user.uid);
      // Redirect to a protected page (e.g., dashboard) after successful login
      router.push('/dashboard'); // Adjust the target route as needed
    } catch (err: any) {
      console.error('Login failed:', err);
      // Provide user-friendly error messages
      let errorMessage = "Login failed. Please check your credentials.";
      if (err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password' || err.code === 'auth/invalid-credential') {
        errorMessage = "Invalid email or password.";
      } else if (err.code === 'auth/invalid-email') {
        errorMessage = "Please enter a valid email address.";
      }
      setError(errorMessage);
      // setGlobalError(errorMessage); // Optional: Set global error state
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
          Password
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
      <button
        type="submit"
        className="w-full bg-lime-green text-black font-inter-bold py-2 px-4 rounded hover:bg-opacity-80 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={isLoading}
      >
        {isLoading ? 'Logging In...' : 'Login'}
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

export default LoginForm;