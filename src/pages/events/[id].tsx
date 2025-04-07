import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { doc, getDoc } from 'firebase/firestore';
import { db, auth } from '@/lib/firebase/firebaseConfig';
import { Button } from '@/components/ui/button';
import RoleGuard from '@/components/auth/RoleGuard';
import { UserRole } from '@/lib/auth/roles';
import useStore from '@/store';
import EventDetail from '@/components/events/EventDetail';

interface EventDetail {
  id: string;
  userId: string;
  eventName: string;
  eventType: string;
  eventDate: string;
  eventTime: string;
  location: string;
  estimatedAttendees: number;
  budget: number;
  contactName: string;
  contactPhone: string;
  contactEmail: string;
  additionalDetails: string;
  status: 'pending' | 'approved' | 'rejected' | 'completed';
  createdAt: any;
  updatedAt: any;
}

const EventDetailPage: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const { user, isLoading: authLoading } = useStore();
  const [event, setEvent] = useState<EventDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEventDetail = async () => {
      if (!id || !auth.currentUser) return;

      try {
        const eventRef = doc(db, 'events', id as string);
        const eventDoc = await getDoc(eventRef);

        if (eventDoc.exists()) {
          const eventData = eventDoc.data();

          // Check if the current user is the owner of this event
          if (eventData.userId !== auth.currentUser.uid) {
            setError('You do not have permission to view this event.');
            setIsLoading(false);
            return;
          }

          // Create a properly formatted event object
          const formattedEvent: EventDetail = {
            id: id as string,
            userId: eventData.userId,
            eventName: eventData.eventName || '',
            eventType: eventData.eventType || '',
            eventDate: eventData.eventDate || '',
            eventTime: eventData.eventTime || '',
            location: eventData.location || '',
            estimatedAttendees: eventData.estimatedAttendees || 0,
            budget: eventData.budget || 0,
            contactName: eventData.contactName || '',
            contactPhone: eventData.contactPhone || '',
            contactEmail: eventData.contactEmail || '',
            additionalDetails: eventData.additionalDetails || '',
            status: eventData.status || 'pending',
            createdAt: eventData.createdAt,
            updatedAt: eventData.updatedAt
          };

          console.log('Formatted event:', formattedEvent);
          setEvent(formattedEvent);
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

    if (!authLoading && user && id) {
      fetchEventDetail();
    }
  }, [id, user, authLoading]);



  return (
    <>
      <Head>
        <title>{event ? `${event.eventName} | FOH Pro` : 'Event Details | FOH Pro'}</title>
        <meta name="description" content="View event details with FOH Pro" />
      </Head>

      <div className="container mx-auto px-4 py-8">
        <Button
          variant="outline"
          onClick={() => router.push('/events')}
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

        <RoleGuard requiredRole={UserRole.CUSTOMER}>
          {isLoading ? (
            <div className="flex justify-center items-center min-h-[60vh]">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
          ) : error ? (
            <div className="bg-red-50 text-red-800 p-4 rounded-md border border-red-200">
              {error}
            </div>
          ) : event ? (
            <EventDetail event={event} />
          ) : null}
        </RoleGuard>
      </div>
    </>
  );
};

export default EventDetailPage;
