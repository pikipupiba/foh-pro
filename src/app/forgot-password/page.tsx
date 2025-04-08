import React from 'react';
import Link from 'next/link';
import ForgotPasswordForm from '@/components/auth/ForgotPasswordForm';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { generateMetadata } from '../metadata';

export const metadata = generateMetadata(
  'Forgot Password',
  'Reset your FOH Pro account password'
);

export default function ForgotPasswordPage() {
  return (
    <div className="container mx-auto px-4 py-8 flex min-h-screen items-center justify-center">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">Reset Password</CardTitle>
          <CardDescription className="text-center">
            Enter your email address and we&apos;ll send you a link to reset your password.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ForgotPasswordForm />
          <div className="text-center mt-4">
            <p className="text-sm text-muted-foreground">
              Remember your password?{' '}
              <Link href="/login" className="text-primary hover:underline font-medium">
                Back to Login
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
