import { generateMetadata } from '../metadata';

export const metadata = generateMetadata(
  'Firebase Emulator Test',
  'Test Firebase emulators for Firestore and Authentication'
);

export default function EmulatorTestLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
