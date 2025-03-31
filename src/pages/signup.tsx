import React from 'react';
import Link from 'next/link';
import SignupForm from '@/components/auth/SignupForm'; // Import the SignupForm component

const SignupPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Create Account</h1>
      <div className="max-w-md mx-auto bg-white p-6 rounded shadow-md">
        <SignupForm />
      </div>
      <div className="text-center mt-4">
        <p className="text-sm text-gray-600">
          Already have an account?{' '}
          <Link href="/login" className="text-lime-green hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignupPage;