import { Metadata } from 'next';

// Generate dynamic metadata for the admin event details page
export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  return {
    title: 'Event Management | FOH Pro',
    description: 'Manage event details with FOH Pro',
  };
}

export default function AdminEventDetailLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
