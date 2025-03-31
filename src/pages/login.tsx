import React from 'react';
import Link from 'next/link'; // Import Link
import LoginForm from '@/components/auth/LoginForm'; // Import the LoginForm component

const LoginPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Login</h1>
      <div className="max-w-md mx-auto bg-white p-6 rounded shadow-md">
        <LoginForm />
      </div>
      {/* Optionally add links for signup or password reset */}
      <div className="text-center mt-4">
        <p className="text-sm text-gray-600">
          Don't have an account?{' '}
          <Link href="/signup" className="text-lime-green hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;