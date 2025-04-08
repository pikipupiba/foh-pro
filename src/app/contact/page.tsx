import React from 'react';
import ContactForm from '@/components/contact/ContactForm';
import { generateMetadata } from '../metadata';

// Generate metadata for SEO
export const metadata = generateMetadata(
  'Contact Us',
  'Get in touch with Front of House Productions for event production services and support'
);

// Mark this page as statically rendered
export const dynamic = 'force-static';

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-5xl">
      <h1 className="text-4xl font-bold mb-8 text-center">
        Contact Us
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
        <div>
          <h2 className="text-2xl font-semibold mb-6">Get In Touch</h2>
          <p className="mb-6">
            Have questions or need assistance? Fill out the form, and we&apos;ll get back to you shortly.
            We&apos;re here to help with all your event production needs.
          </p>

          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold text-lime-600 dark:text-lime-400">Our Office</h3>
              <p>123 Event Avenue, Suite 200<br />Nashville, TN 37203</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-lime-600 dark:text-lime-400">Phone</h3>
              <p>(615) 555-1234</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-lime-600 dark:text-lime-400">Email</h3>
              <p>info@fohpro.com</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-lime-600 dark:text-lime-400">Hours</h3>
              <p>Monday - Friday: 9:00 AM - 6:00 PM<br />Saturday: 10:00 AM - 4:00 PM<br />Sunday: Closed</p>
            </div>
          </div>
        </div>

        <div>
          <ContactForm />
        </div>
      </div>

      <div className="mb-16">
        <h2 className="text-2xl font-semibold mb-6 text-center">Frequently Asked Questions</h2>
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold">How far in advance should I book equipment?</h3>
            <p>We recommend booking at least 4-6 weeks in advance for most events, and 2-3 months for large events or during peak season.</p>
          </div>

          <div>
            <h3 className="text-lg font-semibold">Do you provide setup and teardown services?</h3>
            <p>Yes, we offer complete setup and teardown services for all our equipment. Our technicians ensure everything is properly installed and functioning before your event.</p>
          </div>

          <div>
            <h3 className="text-lg font-semibold">What happens if equipment fails during my event?</h3>
            <p>We provide 24/7 emergency support for all events. Our technicians can be on-site quickly to resolve any issues, and we always bring backup equipment for critical systems.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
