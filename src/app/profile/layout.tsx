import { generateMetadata } from '../metadata';

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
