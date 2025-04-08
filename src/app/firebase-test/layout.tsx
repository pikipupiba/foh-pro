import { generateMetadata } from '../metadata';

export const metadata = generateMetadata(
  'Firebase Test',
  'Test Firebase functionality including Firestore, Authentication, and Storage'
);

export default function FirebaseTestLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
