import React, { useState, FormEvent } from 'react';
import { useRouter } from 'next/router';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/lib/firebase/firebaseConfig';
import OAuthSignInButtons from './OAuthSignInButtons'; // Import the OAuth buttons
import { Button } from "@/components/ui/button"; // Import shadcn Button
import { Input } from "@/components/ui/input";   // Import shadcn Input
import { Label } from "@/components/ui/label";   // Import shadcn Label
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
        <Label htmlFor="email">Email Address</Label>
        <Input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          disabled={isLoading}
          placeholder="name@example.com" // Add placeholder
        />
      </div>
      <div>
        <Label htmlFor="password">Password (min. 6 characters)</Label>
        <Input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          disabled={isLoading}
        />
      </div>
      {/* Optional: Confirm Password Field */}
      {/* <div>
        <label htmlFor="confirmPassword" >Confirm Password</label>
        <input type="password" id="confirmPassword" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required disabled={isLoading} />
      </div> */}
      {/* Use default Button styling which inherits from the new theme's --primary */}
      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? 'Creating Account...' : 'Create Account'}
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

export default SignupForm;