'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { collection, query, getDocs, where } from 'firebase/firestore';
import { db } from '@/lib/firebase/firebaseConfig';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { UserRole } from '@/lib/auth/roles';
import useStore from '@/store';

export default function AdminAnalyticsPage() {
  const router = useRouter();
  const { userRole, isLoading: authLoading } = useStore();
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalEvents: 0,
    pendingEvents: 0,
    approvedEvents: 0,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const isAdmin = userRole === UserRole.ADMIN;

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        // Fetch users count
        const usersRef = collection(db, 'users');
        const usersSnapshot = await getDocs(usersRef);
        const totalUsers = usersSnapshot.size;

        // Fetch events count
        const eventsRef = collection(db, 'events');
        const eventsSnapshot = await getDocs(eventsRef);
        const totalEvents = eventsSnapshot.size;

        // Fetch pending events count
        const pendingEventsRef = collection(db, 'events');
        const pendingEventsQuery = query(pendingEventsRef, where('status', '==', 'pending'));
        const pendingEventsSnapshot = await getDocs(pendingEventsQuery);
        const pendingEvents = pendingEventsSnapshot.size;

        // Fetch approved events count
        const approvedEventsRef = collection(db, 'events');
        const approvedEventsQuery = query(approvedEventsRef, where('status', '==', 'approved'));
        const approvedEventsSnapshot = await getDocs(approvedEventsQuery);
        const approvedEvents = approvedEventsSnapshot.size;

        setStats({
          totalUsers,
          totalEvents,
          pendingEvents,
          approvedEvents,
        });
      } catch (err) {
        console.error('Error fetching analytics:', err);
        setError('Failed to load analytics. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };

    if (!authLoading && isAdmin) {
      fetchAnalytics();
    } else if (!authLoading && !isAdmin) {
      setIsLoading(false);
    }
  }, [authLoading, isAdmin]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Analytics Dashboard</h1>
          <p className="text-muted-foreground mt-1">
            View business performance metrics
          </p>
        </div>
        <Button onClick={() => router.push('/dashboard')} variant="outline">
          Back to Dashboard
        </Button>
      </div>

      {isAdmin ? (
        isLoading ? (
          <div className="flex justify-center items-center min-h-[60vh]">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          </div>
        ) : error ? (
          <div className="bg-red-50 text-red-800 p-4 rounded-md border border-red-200">
            {error}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium">Total Users</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{stats.totalUsers}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium">Total Events</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{stats.totalEvents}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium">Pending Events</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{stats.pendingEvents}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium">Approved Events</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{stats.approvedEvents}</div>
              </CardContent>
            </Card>
          </div>
        )
      ) : (
        <div className="bg-yellow-50 text-yellow-800 p-4 rounded-md border border-yellow-200">
          You need to be an administrator to access this page. Please contact support if you believe this is an error.
        </div>
      )}
    </div>
  );
}
