import React from 'react';
import Link from 'next/link';
import { generateMetadata } from '../metadata';

// Generate metadata for SEO
export const metadata = generateMetadata(
  'About Us',
  'Learn about Front of House Productions, our mission, services, and story'
);

// Mark this page as statically rendered
export const dynamic = 'force-static';

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-5xl">
      <h1 className="text-4xl font-bold mb-8 text-center">
        About Front of House Productions
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16 items-center">
        <div>
          <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
          <p className="mb-4">
            At Front of House Productions, we&apos;re dedicated to providing exceptional event production services
            that bring your vision to life. With years of experience in the industry, our team of professionals
            is committed to delivering high-quality equipment, expert technical support, and seamless execution
            for events of all sizes.
          </p>
          <p>
            Whether you're planning a corporate conference, a music festival, a wedding, or a community gathering,
            we have the expertise and resources to make your event shine. Our mission is to exceed your expectations
            and create memorable experiences through innovative solutions and attention to detail.
          </p>
        </div>
        <div className="relative h-80 w-full rounded-lg overflow-hidden shadow-lg">
          {/* Placeholder for an image - replace with your actual image */}
          <div className="absolute inset-0 bg-gradient-to-r from-lime-500 to-emerald-600 flex items-center justify-center">
            <span className="text-white text-xl font-bold">FOH Pro Team</span>
          </div>
        </div>
      </div>

      <div className="mb-16">
        <h2 className="text-2xl font-semibold mb-6 text-center">Our Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-3 text-lime-600 dark:text-lime-400">Audio Equipment</h3>
            <p>
              Professional sound systems for venues of all sizes, from intimate gatherings to large outdoor events.
              Our inventory includes top-of-the-line speakers, mixers, microphones, and more.
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-3 text-lime-600 dark:text-lime-400">Lighting Solutions</h3>
            <p>
              Create the perfect atmosphere with our comprehensive lighting options. From stage lighting to ambient
              effects, we have everything you need to set the mood for your event.
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-3 text-lime-600 dark:text-lime-400">Technical Support</h3>
            <p>
              Our experienced technicians provide setup, operation, and troubleshooting throughout your event,
              ensuring everything runs smoothly from start to finish.
            </p>
          </div>
        </div>
      </div>

      <div className="mb-16">
        <h2 className="text-2xl font-semibold mb-6">Our Story</h2>
        <p className="mb-4">
          Founded in 2010, FOH Pro began as a small operation serving local community events. Over the years,
          we've grown into a full-service production company with a reputation for excellence and reliability.
          Our founder, with over 20 years of experience in the industry, assembled a team of passionate professionals
          who share a commitment to quality and customer satisfaction.
        </p>
        <p className="mb-4">
          Today, we serve clients throughout the region, providing comprehensive event production services for
          a diverse range of events. Our growth is a testament to our dedication to our clients and our craft.
        </p>
        <p>
          We continue to invest in the latest technology and equipment, ensuring that we can offer innovative
          solutions that meet the evolving needs of our clients. Our team regularly undergoes training to stay
          at the forefront of industry developments and best practices.
        </p>
      </div>

      <div className="text-center">
        <h2 className="text-2xl font-semibold mb-6">Ready to Work With Us?</h2>
        <p className="mb-8">
          Let's create an unforgettable event together. Contact us today to discuss your needs and how we can help.
        </p>
        <Link
          href="/contact"
          className="inline-block bg-lime-600 hover:bg-lime-700 text-white font-bold py-3 px-6 rounded-lg transition-colors"
        >
          Get in Touch
        </Link>
      </div>
    </div>
  );
}
