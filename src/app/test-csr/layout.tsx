import { generateMetadata } from '../metadata';

export const metadata = generateMetadata(
  'Client-Side Rendering Test',
  'Testing Client-Side Rendering (CSR) in Next.js'
);

export default function TestCSRLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
