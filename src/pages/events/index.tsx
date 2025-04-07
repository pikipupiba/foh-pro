import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { collection, query, where, orderBy, getDocs } from 'firebase/firestore';
import { db, auth } from '@/lib/firebase/firebaseConfig';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import RoleGuard from '@/components/auth/RoleGuard';
import { UserRole } from '@/lib/auth/roles';
import useStore from '@/store';

interface Event {
  id: string;
  eventName: string;
  eventType: string;
  eventDate: string;
  location: string;
  status: 'pending' | 'approved' | 'rejected' | 'completed';
  createdAt: any;
}

const EventsPage: React.FC = () => {
  const router = useRouter();
  const { user, isLoading: authLoading } = useStore();
  const [events, setEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEvents = async () => {
      if (!auth.currentUser) return;

      try {
        const eventsRef = collection(db, 'events');
        const q = query(
          eventsRef,
          where('userId', '==', auth.currentUser.uid),
          orderBy('createdAt', 'desc')
        );
        
        const querySnapshot = await getDocs(q);
        const eventsList: Event[] = [];
        
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          eventsList.push({
            id: doc.id,
            eventName: data.eventName,
            eventType: data.eventType,
            eventDate: data.eventDate,
            location: data.location,
            status: data.status,
            createdAt: data.createdAt
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20';
      case 'approved':
        return 'bg-green-500/10 text-green-500 border-green-500/20';
      case 'rejected':
        return 'bg-red-500/10 text-red-500 border-red-500/20';
      case 'completed':
        return 'bg-blue-500/10 text-blue-500 border-blue-500/20';
      default:
        return 'bg-gray-500/10 text-gray-500 border-gray-500/20';
    }
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <>
      <Head>
        <title>My Events | FOH Pro</title>
        <meta name="description" content="View and manage your events with FOH Pro" />
      </Head>

      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold">My Events</h1>
            <p className="text-muted-foreground mt-1">
              View and manage your event requests
            </p>
          </div>
          <RoleGuard requiredRole={UserRole.CUSTOMER}>
            <Button onClick={() => router.push('/events/new')}>
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
                <path d="M12 5v14M5 12h14" />
              </svg>
              New Event
            </Button>
          </RoleGuard>
        </div>

        <RoleGuard requiredRole={UserRole.CUSTOMER}>
          {isLoading ? (
            <div className="flex justify-center items-center min-h-[60vh]">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
          ) : error ? (
            <div className="bg-red-50 text-red-800 p-4 rounded-md border border-red-200">
              {error}
            </div>
          ) : events.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="48"
                  height="48"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-muted-foreground mb-4"
                >
                  <rect width="18" height="18" x="3" y="4" rx="2" ry="2"></rect>
                  <line x1="16" x2="16" y1="2" y2="6"></line>
                  <line x1="8" x2="8" y1="2" y2="6"></line>
                  <line x1="3" x2="21" y1="10" y2="10"></line>
                </svg>
                <h2 className="text-xl font-semibold mb-2">No events found</h2>
                <p className="text-muted-foreground text-center mb-6">
                  You haven't created any event requests yet. Create your first event to get started.
                </p>
                <Button onClick={() => router.push('/events/new')}>
                  Create Your First Event
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {events.map((event) => (
                <Card key={event.id} className="overflow-hidden">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-xl">{event.eventName}</CardTitle>
                      <Badge className={getStatusColor(event.status)}>
                        {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
                      </Badge>
                    </div>
                    <CardDescription>{event.eventType}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex items-center">
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
                          className="mr-2 text-muted-foreground"
                        >
                          <rect width="18" height="18" x="3" y="4" rx="2" ry="2"></rect>
                          <line x1="16" x2="16" y1="2" y2="6"></line>
                          <line x1="8" x2="8" y1="2" y2="6"></line>
                          <line x1="3" x2="21" y1="10" y2="10"></line>
                        </svg>
                        <span>{formatDate(event.eventDate)}</span>
                      </div>
                      <div className="flex items-center">
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
                          className="mr-2 text-muted-foreground"
                        >
                          <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
                          <circle cx="12" cy="10" r="3"></circle>
                        </svg>
                        <span className="truncate">{event.location}</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={() => router.push(`/events/${event.id}`)}
                    >
                      View Details
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </RoleGuard>
      </div>
    </>
  );
};

export default EventsPage;
