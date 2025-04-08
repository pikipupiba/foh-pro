import { Metadata } from 'next';

// Base metadata for the entire site
export const baseMetadata: Metadata = {
  title: {
    default: 'FOH Pro',
    template: '%s | FOH Pro',
  },
  description: 'Front of House Productions - Event production rental company',
  keywords: ['event production', 'rental', 'equipment', 'audio', 'lighting', 'staging'],
  authors: [{ name: 'FOH Pro Team' }],
  creator: 'FOH Pro',
  publisher: 'FOH Pro',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
};

// Helper function to generate metadata for specific pages
export function generateMetadata(
  title: string,
  description?: string,
  additionalMetadata: Partial<Metadata> = {}
): Metadata {
  return {
    ...baseMetadata,
    title,
    description: description || baseMetadata.description,
    ...additionalMetadata,
  };
}
