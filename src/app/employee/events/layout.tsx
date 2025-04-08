import { generateMetadata } from '../../metadata';

export const metadata = generateMetadata(
  'Event Management',
  'Manage event requests with FOH Pro'
);

export default function EmployeeEventsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
