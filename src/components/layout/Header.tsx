import React from 'react';
import Link from 'next/link';

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

        {/* Auth/User Placeholder */}
        <div>
          {/* Example: Login Button */}
          <button className="bg-lime-green text-black font-inter-bold px-4 py-1 rounded hover:bg-opacity-80 transition-colors">
            Login
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Header;
