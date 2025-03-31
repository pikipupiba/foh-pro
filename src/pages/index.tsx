import React from 'react';
import Image from 'next/image'; // Import the Image component
// No longer need MainLayout import here

const HomePage: React.FC = () => {
  return (
    <> {/* Use a fragment or a simple div if needed */}
      <div className="text-center">
        {/* Add the logo */}
        <Image
          src="/logos/big-logo-color-text-white.png"
          alt="FOH-Pro Logo"
          width={400} // Adjust width as needed
          height={100} // Adjust height as needed
          className="mx-auto mb-8" // Center horizontally and add bottom margin
        />
        {/* Remove redundant text color classes, font-owners-bold is not defined, use default font-sans */}
        <h1 className="text-4xl font-bold mb-4">
          Welcome to foh-pro!
        </h1>
        {/* Remove redundant text color classes and font-inter */}
        <p className="text-lg mb-8">
          Streamlining Event Production Rentals & Operations.
        </p>
        {/* Add more homepage content here */}
        {/* Use theme variable for background, remove font-inter-bold */}
        <button className="bg-foh-lime text-black px-6 py-2 rounded hover:bg-opacity-80 transition-colors">
          Get Started
        </button>
      </div>
    </>
  );
};

export default HomePage;
