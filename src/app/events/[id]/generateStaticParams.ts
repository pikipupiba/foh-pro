// This function is required for static rendering with dynamic routes
export default async function generateStaticParams() {
  // In a real app, you would fetch this data from your database
  // For now, we'll return an array with a dummy ID for static export
  return [
    { id: 'placeholder' }
  ];
}
