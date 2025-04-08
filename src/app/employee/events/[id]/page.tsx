'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase/firebaseConfig';
import { Button } from '@/components/ui/button';
import { UserRole } from '@/lib/auth/roles';
import useStore from '@/store';
import EventDetail from '@/components/events/EventDetail';
import EventManagement from '@/components/events/EventManagement';

export default function EmployeeEventDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const id = params.id;
  const { user, userRole, isLoading: authLoading } = useStore();
  const [event, setEvent] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const isEmployee = userRole === UserRole.EMPLOYEE || userRole === UserRole.ADMIN;

  const fetchEventDetail = async () => {
    if (!id) return;

    try {
      setIsLoading(true);
      const eventRef = doc(db, 'events', id as string);
      const eventDoc = await getDoc(eventRef);
      
      if (eventDoc.exists()) {
        const eventData = eventDoc.data();
        setEvent({ id: eventDoc.id, ...eventData });
      } else {
        setError('Event not found.');
      }
    } catch (err) {
      console.error('Error fetching event details:', err);
      setError('Failed to load event details. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!authLoading && user && id) {
      fetchEventDetail();
    }
  }, [id, user, authLoading]);

  const handleEventUpdated = () => {
    fetchEventDetail();
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Button
        variant="outline"
        onClick={() => router.push('/employee/events')}
        className="mb-6"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="mr-2"
        >
          <path d="m15 18-6-6 6-6" />
        </svg>
        Back to Events
      </Button>

      {isEmployee ? (
        isLoading ? (
          <div className="flex justify-center items-center min-h-[60vh]">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          </div>
        ) : error ? (
          <div className="bg-red-50 text-red-800 p-4 rounded-md border border-red-200">
            {error}
          </div>
        ) : event ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <EventDetail event={event} />
            </div>
            <div>
              <EventManagement event={event} onEventUpdated={handleEventUpdated} />
            </div>
          </div>
        ) : null
      ) : (
        <div className="bg-yellow-50 text-yellow-800 p-4 rounded-md border border-yellow-200">
          You need to be an employee to access this page. Please contact support if you believe this is an error.
        </div>
      )}
    </div>
  );
}
