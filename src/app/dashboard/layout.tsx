import { generateMetadata } from '../metadata';

// Force dynamic rendering for the dashboard section
export const dynamic = 'force-dynamic';

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
