import { Metadata } from 'next';

// Generate dynamic metadata for the event details page
export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  return {
    title: 'Event Details | FOH Pro',
    description: 'View event details with FOH Pro',
  };
}

export default function EventDetailLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
