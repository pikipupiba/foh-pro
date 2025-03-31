import React from 'react';
import Link from 'next/link';
import Image from 'next/image'; // Import the Image component
import AuthStatus from '@/components/auth/AuthStatus'; // Import the AuthStatus component

const Header: React.FC = () => {
  return (
    <header className="bg-foh-dark-gray shadow-md"> {/* Use theme variable, remove redundant text-white */}
      <nav className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo Link */}
        <Link href="/" className="flex items-center"> {/* Use flex to align image */}
          <Image
            src="/logos/icon-color.png"
            alt="FOH-Pro Icon"
            width={40}
            height={40}
          />
        </Link>

        {/* Navigation Links Placeholder */}
        <div className="space-x-4"> {/* Remove font-inter to use default */}
          <Link href="/" className="hover:text-foh-lime transition-colors"> {/* Use theme variable */}
            Home
          </Link>
          <Link href="/about" className="hover:text-foh-lime transition-colors"> {/* Use theme variable */}
            About
          </Link>
          <Link href="/contact" className="hover:text-foh-lime transition-colors"> {/* Use theme variable */}
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
