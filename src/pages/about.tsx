import React from 'react';
import MainLayout from '../components/layout/MainLayout'; // Adjust path if needed

const AboutPage: React.FC = () => {
  return (
    <MainLayout>
      <div>
        <h1 className="text-3xl font-owners-bold text-dark-gray mb-4">
          About Front of House Productions
        </h1>
        <p className="font-inter text-gray-700 mb-4">
          Front of House Productions is dedicated to providing top-tier event production rentals and operational support. Our mission is to ensure seamless and successful events for all our clients through cutting-edge technology and expert service.
        </p>
        <p className="font-inter text-gray-700">
          This platform, foh-pro, is designed to streamline every aspect of the rental and event management process, from initial booking to final execution.
        </p>
        {/* Add more about page content here */}
      </div>
    </MainLayout>
  );
};

export default AboutPage;
