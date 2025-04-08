import { generateMetadata } from '../../metadata';

export const metadata = generateMetadata(
  'New Event Request',
  'Create a new event request with FOH Pro'
);

export default function NewEventLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
