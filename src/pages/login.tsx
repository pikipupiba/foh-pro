import React from 'react';
import Link from 'next/link';
import LoginForm from '@/components/auth/LoginForm';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"; // Import Card components

const LoginPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8 flex min-h-screen items-center justify-center">
      {/* Use Card component */}
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center">Login</CardTitle>
        </CardHeader>
        <CardContent>
          <LoginForm />
          {/* Move link inside CardContent */}
          <div className="text-center mt-4">
            <p className="text-sm text-muted-foreground">
              Don&apos;t have an account?{' '}
              <Link href="/signup" className="text-primary hover:underline font-medium"> {/* Added font-medium */}
                Sign Up
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginPage;