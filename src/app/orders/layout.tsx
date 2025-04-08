import { generateMetadata } from '../metadata';

export const metadata = generateMetadata(
  'Order History',
  'View your past orders and rentals with FOH Pro'
);

export default function OrdersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
