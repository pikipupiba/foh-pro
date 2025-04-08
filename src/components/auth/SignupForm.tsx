'use client';

import React, { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '@/lib/firebase/firebaseConfig';
import { UserRole } from '@/lib/auth/roles';
import OAuthSignInButtons from './OAuthSignInButtons';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const SignupForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [role, setRole] = useState<UserRole>(UserRole.CUSTOMER);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    // Validate form inputs
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      setIsLoading(false);
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      setIsLoading(false);
      return;
    }

    if (!auth || !db) {
      setError("Authentication service is not available.");
      setIsLoading(false);
      return;
    }

    try {
      // Create the user account
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log('Signup successful:', user.uid);

      // Update the user's display name
      if (displayName) {
        await updateProfile(user, { displayName });
      }

      // Create a user document in Firestore
      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        email: user.email,
        displayName: displayName || null,
        role: role,
        createdAt: new Date(),
      });
      console.log('User document created in Firestore');

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
        <Label htmlFor="displayName">Full Name</Label>
        <Input
          type="text"
          id="displayName"
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
          required
          disabled={isLoading}
          placeholder="John Doe"
        />
      </div>
      <div>
        <Label htmlFor="email">Email Address</Label>
        <Input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          disabled={isLoading}
          placeholder="name@example.com"
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
          minLength={6}
        />
      </div>
      <div>
        <Label htmlFor="confirmPassword">Confirm Password</Label>
        <Input
          type="password"
          id="confirmPassword"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          disabled={isLoading}
        />
      </div>
      <div>
        <Label htmlFor="role">Account Type</Label>
        <Select
          value={role}
          onValueChange={(value) => setRole(value as UserRole)}
          disabled={isLoading}
        >
          <SelectTrigger id="role">
            <SelectValue placeholder="Select account type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={UserRole.CUSTOMER}>Customer</SelectItem>
            <SelectItem value={UserRole.EMPLOYEE}>Employee</SelectItem>
          </SelectContent>
        </Select>
        <p className="text-xs text-muted-foreground mt-1">
          {role === UserRole.CUSTOMER ?
            "For booking events and services" :
            "For staff members (requires approval)"}
        </p>
      </div>
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