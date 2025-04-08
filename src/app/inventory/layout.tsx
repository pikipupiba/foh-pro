import { generateMetadata } from '../metadata';

export const metadata = generateMetadata(
  'Inventory Management',
  'Manage inventory and supplies with FOH Pro'
);

export default function InventoryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
