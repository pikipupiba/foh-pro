import { generateMetadata } from '../metadata';

export const metadata = generateMetadata(
  'Events',
  'Manage your events with FOH Pro'
);

export default function EventsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
