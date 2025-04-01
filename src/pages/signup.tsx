import React from 'react';
import Link from 'next/link';
import SignupForm from '@/components/auth/SignupForm';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"; // Import Card components

const SignupPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8 flex min-h-screen items-center justify-center">
      {/* Use Card component */}
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center">Create Account</CardTitle>
        </CardHeader>
        <CardContent>
          <SignupForm />
          {/* Move link inside CardContent and adjust styles */}
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
};

export default SignupPage;