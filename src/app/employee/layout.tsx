import { generateMetadata } from '../metadata';

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
