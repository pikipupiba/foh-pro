import React from 'react';
import Link from 'next/link';
import Image from 'next/image'; // Import the Image component

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-background mt-auto py-6">
      <div className="container mx-auto px-4 flex items-center justify-center">
        {/* Icon on the left */}
        <Image
          src="/logos/icon-color.png"
          alt="FOH-Pro Icon"
          width={30}
          height={30}
          className="mr-4"
        />
        {/* Group links and copyright */}
        <div>
          {/* Footer Links Placeholder */}
          <div className="space-x-4 mb-2">
          <Link href="/privacy-policy" className="text-sm hover:text-primary transition-colors">
            Privacy Policy
          </Link>
          <Link href="/terms-of-service" className="text-sm hover:text-primary transition-colors">
            Terms of Service
          </Link>
          {/* Add more links as needed */}
        </div>

        {/* Copyright */}
        <p className="text-xs text-muted-foreground">
          &copy; {currentYear} Front of House Productions. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
