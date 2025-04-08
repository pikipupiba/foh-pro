import { generateMetadata } from '../../metadata';

export const metadata = generateMetadata(
  'User Management',
  'Manage user accounts in FOH Pro'
);

export default function AdminUsersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
