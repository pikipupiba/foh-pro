import React from 'react';
import Link from 'next/link';
import SignupForm from '@/components/auth/SignupForm';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { generateMetadata } from '../metadata';

export const metadata = generateMetadata(
  'Sign Up',
  'Create a new account for FOH Pro'
);

export default function SignupPage() {
  return (
    <div className="container mx-auto px-4 py-8 flex min-h-screen items-center justify-center">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center">Create Account</CardTitle>
        </CardHeader>
        <CardContent>
          <SignupForm />
          <div className="text-center mt-4">
            <p className="text-sm text-muted-foreground">
              Already have an account?{' '}
              <Link href="/login" className="text-primary hover:underline font-medium">
                Login
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
