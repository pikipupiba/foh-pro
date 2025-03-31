import React from 'react';
// No longer need MainLayout import here

const AboutPage: React.FC = () => {
  return (
    <> {/* Use a fragment */}
      <div>
        {/* Remove redundant text color classes, font-owners-bold is not defined, use default font-sans */}
        <h1 className="text-3xl font-bold mb-4">
          About Front of House Productions
        </h1>
        {/* Remove redundant text color classes and font-inter */}
        <p className="mb-4">
          Front of House Productions is dedicated to providing top-tier event production rentals and operational support. Our mission is to ensure seamless and successful events for all our clients through cutting-edge technology and expert service.
        </p>
        {/* Remove redundant text color classes and font-inter */}
        <p>
          This platform, foh-pro, is designed to streamline every aspect of the rental and event management process, from initial booking to final execution.
        </p>
        {/* Add more about page content here */}
      </div>
    </>
  );
};

export default AboutPage;
