import React from 'react';
import Link from 'next/link';
import AuthStatus from '@/components/auth/AuthStatus'; // Import the AuthStatus component

const Header: React.FC = () => {
  return (
    <header className="bg-dark-gray text-white shadow-md">
      <nav className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo Placeholder */}
        <Link href="/" className="text-lime-green font-owners-bold text-2xl">
          foh-pro
        </Link>

        {/* Navigation Links Placeholder */}
        <div className="space-x-4 font-inter">
          <Link href="/" className="hover:text-lime-green transition-colors">
            Home
          </Link>
          <Link href="/about" className="hover:text-lime-green transition-colors">
            About
          </Link>
          <Link href="/contact" className="hover:text-lime-green transition-colors">
            Contact
          </Link>
          {/* Add more links as needed */}
        </div>

        {/* Authentication Status */}
        <AuthStatus />
      </nav>
    </header>
  );
};

export default Header;
