'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import useStore from '@/store';
import { UserRole, roleDisplayNames } from '@/lib/auth/roles';

export default function DashboardPage() {
  const { user, userRole, lastKnownRole, isLoading, getEffectiveRole } = useStore();
  const router = useRouter();

  // Get the effective role (userRole, lastKnownRole, or from sessionStorage)
  // First check sessionStorage directly
  let roleFromSession = null;
  if (typeof window !== 'undefined') {
    const savedRole = sessionStorage.getItem('lastUserRole') as UserRole | null;
    if (savedRole && Object.values(UserRole).includes(savedRole as UserRole)) {
      console.log('Dashboard - Found role in sessionStorage:', savedRole);
      roleFromSession = savedRole as UserRole;
    }
  }

  // Use the role from sessionStorage if available, otherwise use getEffectiveRole
  const effectiveRole = roleFromSession || getEffectiveRole();
  console.log('Dashboard - userRole:', userRole);
  console.log('Dashboard - lastKnownRole:', lastKnownRole);
  console.log('Dashboard - effectiveRole:', effectiveRole);

  useEffect(() => {
    // For development/testing, we'll allow direct access to the dashboard
    // In production, this would redirect to login if not authenticated
    if (process.env.NODE_ENV === 'production' && !isLoading && !user) {
      console.log('User not authenticated, redirecting to login...');
      router.replace('/login'); // Use replace to avoid adding dashboard to history
    }
  }, [user, isLoading, router]);

  // Show loading state while checking auth
  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  // In development, we'll render the dashboard even if not authenticated
  // In production, this would only render if authenticated
  return (
    <div className="container mx-auto px-4 py-8">
      <div className={`rounded-lg p-6 mb-6 border ${effectiveRole === UserRole.ADMIN ? 'bg-rose-500/10 border-rose-500/20' : effectiveRole === UserRole.EMPLOYEE ? 'bg-blue-500/10 border-blue-500/20' : 'bg-emerald-500/10 border-emerald-500/20'}`}>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">
              {effectiveRole === UserRole.ADMIN ? 'Admin Dashboard' :
              effectiveRole === UserRole.EMPLOYEE ? 'Employee Dashboard' :
              'Customer Dashboard'}
              {/* Role: {effectiveRole} */}
            </h1>
            <p className="text-muted-foreground mt-1">
              {effectiveRole === UserRole.ADMIN ? 'Manage your business operations' :
              effectiveRole === UserRole.EMPLOYEE ? 'Manage your tasks and schedule' :
              'Manage your events and rentals'}
            </p>
          </div>
          <div className={`p-3 rounded-full ${effectiveRole === UserRole.ADMIN ? 'bg-rose-500/10 text-rose-500' : effectiveRole === UserRole.EMPLOYEE ? 'bg-blue-500/10 text-blue-500' : 'bg-emerald-500/10 text-emerald-500'}`}>
            {effectiveRole === UserRole.ADMIN ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M22 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
            ) : effectiveRole === UserRole.EMPLOYEE ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M22 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Common widgets for all users */}
        <div className="bg-card rounded-lg shadow-sm p-6 border">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="text-lg font-medium mb-1">Your Profile</h3>
              <p className="text-muted-foreground">Manage your account settings and preferences</p>
            </div>
            <div className="bg-primary/10 text-primary p-2 rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
            </div>
          </div>
          <button
            onClick={() => router.push('/profile')}
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-2 rounded-md text-sm font-medium transition-colors"
          >
            View Profile
          </button>
        </div>

        {/* Role-specific widgets */}
        {effectiveRole === UserRole.CUSTOMER && (
          <div className="bg-emerald-500/5 border-emerald-500/10 rounded-lg shadow-sm p-6 border">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-lg font-medium mb-1">Your Events</h3>
                <p className="text-muted-foreground">View and manage your upcoming events</p>
              </div>
              <div className="bg-emerald-500/10 text-emerald-500 p-2 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"></rect><line x1="16" x2="16" y1="2" y2="6"></line><line x1="8" x2="8" y1="2" y2="6"></line><line x1="3" x2="21" y1="10" y2="10"></line><path d="M8 14h.01"></path><path d="M12 14h.01"></path><path d="M16 14h.01"></path><path d="M8 18h.01"></path><path d="M12 18h.01"></path><path d="M16 18h.01"></path></svg>
              </div>
            </div>
            <div className="flex flex-col space-y-2">
              <button
                onClick={() => router.push('/events')}
                className="w-full bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
              >
                View Events
              </button>
              <button
                onClick={() => router.push('/events/new')}
                className="w-full bg-white hover:bg-gray-50 text-emerald-500 border border-emerald-500 px-4 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Create New Event
              </button>
            </div>
          </div>
        )}

        {effectiveRole === UserRole.CUSTOMER && (
          <div className="bg-emerald-500/5 border-emerald-500/10 rounded-lg shadow-sm p-6 border">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-lg font-medium mb-1">Order History</h3>
                <p className="text-muted-foreground">View your past orders and rentals</p>
              </div>
              <div className="bg-emerald-500/10 text-emerald-500 p-2 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><path d="M14 2v6h6"></path><path d="M16 13H8"></path><path d="M16 17H8"></path><path d="M10 9H8"></path></svg>
              </div>
            </div>
            <button
              onClick={() => router.push('/orders')}
              className="w-full bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
            >
              View Orders
            </button>
          </div>
        )}

        {/* Employee widgets */}
        {effectiveRole === UserRole.EMPLOYEE && (
          <div className="bg-blue-500/5 border-blue-500/10 rounded-lg shadow-sm p-6 border">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-lg font-medium mb-1">Event Management</h3>
                <p className="text-muted-foreground">View and manage customer events</p>
              </div>
              <div className="bg-blue-500/10 text-blue-500 p-2 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"></rect><line x1="16" x2="16" y1="2" y2="6"></line><line x1="8" x2="8" y1="2" y2="6"></line><line x1="3" x2="21" y1="10" y2="10"></line><path d="M8 14h.01"></path><path d="M12 14h.01"></path><path d="M16 14h.01"></path><path d="M8 18h.01"></path><path d="M12 18h.01"></path><path d="M16 18h.01"></path></svg>
              </div>
            </div>
            <button
              onClick={() => router.push('/employee/events')}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
            >
              Manage Events
            </button>
          </div>
        )}

        {effectiveRole === UserRole.EMPLOYEE && (
          <div className="bg-blue-500/5 border-blue-500/10 rounded-lg shadow-sm p-6 border">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-lg font-medium mb-1">Inventory</h3>
                <p className="text-muted-foreground">Manage inventory and supplies</p>
              </div>
              <div className="bg-blue-500/10 text-blue-500 p-2 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6v12a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2Z"></path><path d="M4 10a2 2 0 0 1 2-2h2v10H6a2 2 0 0 1-2-2Z"></path></svg>
              </div>
            </div>
            <button
              onClick={() => router.push('/inventory')}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
            >
              View Inventory
            </button>
          </div>
        )}

        {effectiveRole === UserRole.EMPLOYEE && (
          <div className="bg-blue-500/5 border-blue-500/10 rounded-lg shadow-sm p-6 border">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-lg font-medium mb-1">Schedule</h3>
                <p className="text-muted-foreground">View your work schedule</p>
              </div>
              <div className="bg-blue-500/10 text-blue-500 p-2 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
              </div>
            </div>
            <button
              onClick={() => router.push('/schedule')}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
            >
              View Schedule
            </button>
          </div>
        )}

        {/* Admin widgets */}
        {effectiveRole === UserRole.ADMIN && (
          <div className="bg-rose-500/5 border-rose-500/10 rounded-lg shadow-sm p-6 border">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-lg font-medium mb-1">User Management</h3>
                <p className="text-muted-foreground">Manage users and permissions</p>
              </div>
              <div className="bg-rose-500/10 text-rose-500 p-2 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M22 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
              </div>
            </div>
            <button
              onClick={() => router.push('/admin/users')}
              className="w-full bg-rose-500 hover:bg-rose-600 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
            >
              Manage Users
            </button>
          </div>
        )}

        {effectiveRole === UserRole.ADMIN && (
          <div className="bg-rose-500/5 border-rose-500/10 rounded-lg shadow-sm p-6 border">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-lg font-medium mb-1">Analytics</h3>
                <p className="text-muted-foreground">View business performance metrics</p>
              </div>
              <div className="bg-rose-500/10 text-rose-500 p-2 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 3v18h18"></path><path d="m19 9-5 5-4-4-3 3"></path></svg>
              </div>
            </div>
            <button
              onClick={() => router.push('/admin/analytics')}
              className="w-full bg-rose-500 hover:bg-rose-600 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
            >
              View Analytics
            </button>
          </div>
        )}

        {/* Add an admin-specific event management widget */}
        {effectiveRole === UserRole.ADMIN && (
          <div className="bg-rose-500/5 border-rose-500/10 rounded-lg shadow-sm p-6 border">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-lg font-medium mb-1">Event Management</h3>
                <p className="text-muted-foreground">Manage all customer events</p>
              </div>
              <div className="bg-rose-500/10 text-rose-500 p-2 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"></rect><line x1="16" x2="16" y1="2" y2="6"></line><line x1="8" x2="8" y1="2" y2="6"></line><line x1="3" x2="21" y1="10" y2="10"></line></svg>
              </div>
            </div>
            <button
              onClick={() => router.push('/admin/events')}
              className="w-full bg-rose-500 hover:bg-rose-600 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
            >
              Manage All Events
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
