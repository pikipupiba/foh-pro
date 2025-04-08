import { generateMetadata } from '../metadata';

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
