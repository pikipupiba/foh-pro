import { generateMetadata } from '../metadata';

export const metadata = generateMetadata(
  'About Us',
  'Learn about Front of House Productions and our mission'
);

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">
        About Front of House Productions
      </h1>
      <p className="mb-4">
        Front of House Productions is dedicated to providing top-tier event production rentals and operational support. Our mission is to ensure seamless and successful events for all our clients through cutting-edge technology and expert service.
      </p>
      <p>
        This platform, foh-pro, is designed to streamline every aspect of the rental and event management process, from initial booking to final execution.
      </p>
      {/* Add more about page content here */}
    </div>
  );
}
