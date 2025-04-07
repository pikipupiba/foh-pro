import dynamic from 'next/dynamic';
import CalendarSkeleton from '@/components/CalendarSkeleton';

// Lazy load heavy components
const RentalCalendar = dynamic(() => import('@/components/RentalCalendar'), {
  loading: () => <CalendarSkeleton />,
  ssr: false // If component relies on browser APIs
});

const InventoryBrowser = dynamic(() => import('@/components/InventoryBrowser'));

const DashboardView = () => {
  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold">Customer Dashboard</h1>

      <section>
        <h2 className="text-xl font-semibold mb-4">Upcoming Rentals</h2>
        <RentalCalendar />
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-4">Browse Inventory</h2>
        <InventoryBrowser />
      </section>
    </div>
  );
};

export default DashboardView;