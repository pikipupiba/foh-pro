import React, { useState, FormEvent } from 'react';
import { useRouter } from 'next/router'; // For redirection after login
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/lib/firebase/firebaseConfig'; // Firebase auth instance
import OAuthSignInButtons from './OAuthSignInButtons'; // Import the OAuth buttons
import { Button } from "@/components/ui/button"; // Import shadcn Button
import { Input } from "@/components/ui/input";   // Import shadcn Input
import { Label } from "@/components/ui/label";   // Import shadcn Label
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
        <Label htmlFor="email">Email Address</Label>
        <Input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          disabled={isLoading}
          placeholder="name@example.com" // Add placeholder for better UX
        />
      </div>
      <div>
        <Label htmlFor="password">Password</Label>
        <Input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          disabled={isLoading}
        />
      </div>
      {/* Use default Button styling which inherits from the new theme's --primary */}
      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? 'Logging In...' : 'Login'}
      </Button>

      {/* Divider */}
      <div className="relative my-4">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-border"></div> {/* Use theme border color */}
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-card text-muted-foreground">OR</span> {/* Use card background */}
        </div>
      </div>

      {/* OAuth Buttons */}
      <OAuthSignInButtons />
    </form>
  );
};

export default LoginForm;