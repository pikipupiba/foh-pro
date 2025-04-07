import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { collection, query, orderBy, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase/firebaseConfig';
import { Button } from '@/components/ui/button';
import RoleGuard from '@/components/auth/RoleGuard';
import { UserRole } from '@/lib/auth/roles';
import useStore from '@/store';
import EventsList from '@/components/events/EventsList';

const EmployeeEventsPage: React.FC = () => {
  const router = useRouter();
  const { user, isLoading: authLoading } = useStore();
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const eventsRef = collection(db, 'events');
        const q = query(
          eventsRef,
          orderBy('createdAt', 'desc')
        );
        
        const querySnapshot = await getDocs(q);
        const eventsList = [];
        
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          eventsList.push({
            id: doc.id,
            ...data,
          });
        });
        
        setEvents(eventsList);
      } catch (err) {
        console.error('Error fetching events:', err);
        setError('Failed to load events. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };

    if (!authLoading && user) {
      fetchEvents();
    }
  }, [user, authLoading]);

  return (
    <>
      <Head>
        <title>Event Management | FOH Pro</title>
        <meta name="description" content="Manage event requests with FOH Pro" />
      </Head>

      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold">Event Management</h1>
            <p className="text-muted-foreground mt-1">
              View and manage all event requests
            </p>
          </div>
          <Button onClick={() => router.push('/dashboard')} variant="outline">
            Back to Dashboard
          </Button>
        </div>

        <RoleGuard requiredRole={UserRole.EMPLOYEE}>
          <EventsList 
            events={events} 
            isLoading={isLoading} 
            error={error} 
          />
        </RoleGuard>
      </div>
    </>
  );
};

export default EmployeeEventsPage;
