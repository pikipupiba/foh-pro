import React from 'react';
// No longer need MainLayout import here

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
    <> {/* Use a fragment */}
      <div>
        {/* Remove redundant text color classes, font-owners-bold is not defined, use default font-sans */}
        <h1 className="text-3xl font-bold mb-6">
          Contact Us
        </h1>
        {/* Remove redundant text color classes and font-inter */}
        <p className="mb-6">
          Have questions or need assistance? Fill out the form below, and we'll get back to you shortly.
        </p>

        {/* Remove font-inter */}
        <form onSubmit={handleSubmit} className="space-y-4 max-w-lg">
          <div>
            {/* Remove redundant text color classes */}
            <label htmlFor="name" className="block text-sm font-medium">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-600 bg-gray-700 text-white placeholder-gray-400 rounded-md shadow-sm focus:outline-none focus:ring-foh-lime focus:border-foh-lime sm:text-sm"
            />
          </div>
          <div>
            {/* Remove redundant text color classes */}
            <label htmlFor="email" className="block text-sm font-medium">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-600 bg-gray-700 text-white placeholder-gray-400 rounded-md shadow-sm focus:outline-none focus:ring-foh-lime focus:border-foh-lime sm:text-sm"
            />
          </div>
          <div>
            {/* Remove redundant text color classes */}
            <label htmlFor="message" className="block text-sm font-medium">Message</label>
            <textarea
              id="message"
              name="message"
              rows={4}
              value={formData.message}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-600 bg-gray-700 text-white placeholder-gray-400 rounded-md shadow-sm focus:outline-none focus:ring-foh-lime focus:border-foh-lime sm:text-sm"
            />
          </div>
          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-bold text-black bg-foh-lime hover:bg-opacity-80 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-foh-lime transition-colors"
            >
              Send Message
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default ContactPage;
