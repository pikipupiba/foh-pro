import React from 'react';
import MainLayout from '../components/layout/MainLayout'; // Adjust path if needed

const ContactPage: React.FC = () => {
  // Basic form state handling (example)
  const [formData, setFormData] = React.useState({ name: '', email: '', message: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement actual form submission logic (e.g., send to an API endpoint or Firebase function)
    console.log('Form submitted:', formData);
    alert('Thank you for your message! (Submission logic not yet implemented)');
    setFormData({ name: '', email: '', message: '' }); // Reset form
  };

  return (
    <MainLayout>
      <div>
        <h1 className="text-3xl font-owners-bold text-dark-gray mb-6">
          Contact Us
        </h1>
        <p className="font-inter text-gray-700 mb-6">
          Have questions or need assistance? Fill out the form below, and we'll get back to you shortly.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4 max-w-lg font-inter">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-lime-green focus:border-lime-green sm:text-sm"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-lime-green focus:border-lime-green sm:text-sm"
            />
          </div>
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message</label>
            <textarea
              id="message"
              name="message"
              rows={4}
              value={formData.message}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-lime-green focus:border-lime-green sm:text-sm"
            />
          </div>
          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-inter-bold text-black bg-lime-green hover:bg-opacity-80 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-lime-green transition-colors"
            >
              Send Message
            </button>
          </div>
        </form>
      </div>
    </MainLayout>
  );
};

export default ContactPage;
