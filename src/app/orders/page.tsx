'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { UserRole } from '@/lib/auth/roles';
import useStore from '@/store';

export default function OrdersPage() {
  const router = useRouter();
  const { userRole } = useStore();
  const isCustomer = userRole === UserRole.CUSTOMER;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Order History</h1>
          <p className="text-muted-foreground mt-1">
            View your past orders and rentals
          </p>
        </div>
        <Button onClick={() => router.push('/dashboard')} variant="outline">
          Back to Dashboard
        </Button>
      </div>

      {isCustomer ? (
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
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
              <path d="M14 2v6h6"></path>
              <path d="M16 13H8"></path>
              <path d="M16 17H8"></path>
              <path d="M10 9H8"></path>
            </svg>
            <h2 className="text-xl font-semibold mb-2">No orders found</h2>
            <p className="text-muted-foreground text-center mb-6">
              You haven't placed any orders yet. Create an event to get started.
            </p>
            <Button onClick={() => router.push('/events/new')}>
              Create Your First Event
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="bg-yellow-50 text-yellow-800 p-4 rounded-md border border-yellow-200">
          You need to be a customer to view orders. Please contact support if you believe this is an error.
        </div>
      )}
    </div>
  );
}
