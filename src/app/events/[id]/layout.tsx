import { Metadata } from 'next';

// Generate metadata for the event details page
export async function generateMetadata(
  { params }: { params: { id: string } }
): Promise<Metadata> {
  return {
    title: `Event ${params.id} Details | FOH Pro`,
    description: 'View event details with FOH Pro',
  };
}

// Layout component for the event details page
export default function EventDetailLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
