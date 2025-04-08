import { generateMetadata } from '../metadata';

// Force dynamic rendering for the employee section
export const dynamic = 'force-dynamic';

export const metadata = generateMetadata(
  'Employee Portal',
  'FOH Pro employee portal for managing events and operations'
);

export default function EmployeeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
