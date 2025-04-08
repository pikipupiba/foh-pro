import { generateMetadata } from '../metadata';

export const metadata = generateMetadata(
  'Dashboard',
  'Your FOH Pro dashboard'
);

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
