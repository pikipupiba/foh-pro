import React from 'react';
import Link from 'next/link';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-dark-gray text-white mt-auto py-6">
      <div className="container mx-auto px-4 text-center font-inter">
        {/* Footer Links Placeholder */}
        <div className="space-x-4 mb-2">
          <Link href="/privacy-policy" className="text-sm hover:text-lime-green transition-colors">
            Privacy Policy
          </Link>
          <Link href="/terms-of-service" className="text-sm hover:text-lime-green transition-colors">
            Terms of Service
          </Link>
          {/* Add more links as needed */}
        </div>

        {/* Copyright */}
        <p className="text-xs text-gray-400">
          &copy; {currentYear} Front of House Productions. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
