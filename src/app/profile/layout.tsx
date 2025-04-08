import { generateMetadata } from '../metadata';

// Force dynamic rendering for the profile section
export const dynamic = 'force-dynamic';

export const metadata = generateMetadata(
  'Your Profile',
  'Manage your FOH Pro account profile'
);

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
