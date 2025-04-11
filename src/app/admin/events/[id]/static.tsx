// This is a server component that exports generateStaticParams
export async function generateStaticParams() {
  // In a real app, you would fetch this data from your database
  // For now, we'll return an array with a dummy ID for static export
  return [
    { id: 'placeholder' }
  ];
}

// This is a dummy component that won't be rendered
export default function StaticComponent() {
  return null;
}
