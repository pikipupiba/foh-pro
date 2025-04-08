import { generateMetadata } from '../../metadata';

export const metadata = generateMetadata(
  'All Events',
  'Manage all events in FOH Pro'
);

export default function AdminEventsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
