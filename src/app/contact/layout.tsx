import { generateMetadata } from '../metadata';

export const metadata = generateMetadata(
  'Contact Us',
  'Get in touch with the FOH Pro team'
);

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
