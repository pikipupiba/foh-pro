import { generateMetadata } from '../metadata';

export const metadata = generateMetadata(
  'Work Schedule',
  'View your upcoming work schedule with FOH Pro'
);

export default function ScheduleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
