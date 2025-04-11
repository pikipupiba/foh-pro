import { Metadata } from 'next';

// Generate metadata for the employee event details page
export async function generateMetadata(
  { params }: { params: { id: string } }
): Promise<Metadata> {
  return {
    title: `Event ${params.id} Management | FOH Pro`,
    description: 'Manage event details with FOH Pro',
  };
}

// Layout component for the employee event details page
export default function EmployeeEventDetailLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
