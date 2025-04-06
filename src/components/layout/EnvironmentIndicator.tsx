import React from 'react';
import Link from 'next/link';

const EnvironmentIndicator: React.FC = () => {
  // Only show in development mode
  if (process.env.NODE_ENV === 'production') {
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-yellow-500 text-black text-xs text-center py-1 px-2">
      <span className="font-medium">Development Environment</span>
      <span className="mx-2">|</span>
      <span>
        Test accounts available: 
        <Link href="/login" className="underline ml-1 font-medium">
          Login Page
        </Link>
      </span>
    </div>
  );
};

export default EnvironmentIndicator;
