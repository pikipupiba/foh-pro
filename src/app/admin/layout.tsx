import { generateMetadata } from '../metadata';

// Force dynamic rendering for the admin section
export const dynamic = 'force-dynamic';

export const metadata = generateMetadata(
  'Admin Portal',
  'FOH Pro admin portal for managing the application'
);

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
