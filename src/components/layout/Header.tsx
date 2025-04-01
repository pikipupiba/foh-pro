import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import AuthStatus from '@/components/auth/AuthStatus';
import { ThemeToggle } from './ThemeToggle';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle, // Import if needed for trigger-like styling
} from "@/components/ui/navigation-menu"; // Import NavigationMenu components

const Header: React.FC = () => {
  return (
    <header className="bg-background shadow-md">
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

        {/* Use NavigationMenu */}
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <Link href="/" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  Home
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/about" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  About
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/contact" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  Contact
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            {/* Add more items as needed */}
          </NavigationMenuList>
        </NavigationMenu>

        {/* Right side controls: Auth Status and Theme Toggle */}
        <div className="flex items-center space-x-2">
          <AuthStatus />
          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
};

export default Header;
