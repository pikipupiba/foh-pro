import { generateMetadata } from '../../metadata';

export const metadata = generateMetadata(
  'Analytics Dashboard',
  'View business performance metrics for FOH Pro'
);

export default function AdminAnalyticsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
