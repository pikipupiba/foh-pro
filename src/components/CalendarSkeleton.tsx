import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';

const CalendarSkeleton = () => {
  return (
    <div className="space-y-4">
      <Skeleton className="h-8 w-full" />
      <div className="grid grid-cols-7 gap-2">
        {Array(7).fill(0).map((_, i) => (
          <Skeleton key={`header-${i}`} className="h-6 w-full" />
        ))}
      </div>
      <div className="grid grid-cols-7 gap-2">
        {Array(35).fill(0).map((_, i) => (
          <Skeleton key={`day-${i}`} className="h-16 w-full" />
        ))}
      </div>
    </div>
  );
};

export default CalendarSkeleton;
