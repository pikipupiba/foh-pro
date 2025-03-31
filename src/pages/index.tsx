import React from 'react';
// No longer need MainLayout import here

const HomePage: React.FC = () => {
  return (
    <> {/* Use a fragment or a simple div if needed */}
      <div className="text-center">
        <h1 className="text-4xl font-owners-bold text-dark-gray mb-4">
          Welcome to foh-pro!
        </h1>
        <p className="text-lg font-inter text-gray-700 mb-8">
          Streamlining Event Production Rentals & Operations.
        </p>
        {/* Add more homepage content here */}
        <button className="bg-lime-green text-black font-inter-bold px-6 py-2 rounded hover:bg-opacity-80 transition-colors">
          Get Started
        </button>
      </div>
    </>
  );
};

export default HomePage;
