'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import EventForm from '@/components/events/EventForm';
import { Button } from '@/components/ui/button';
import { UserRole } from '@/lib/auth/roles';
import useStore from '@/store';

export default function NewEventPage() {
  const router = useRouter();
  const { userRole } = useStore();
  const isCustomer = userRole === UserRole.CUSTOMER;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Button
          variant="outline"
          onClick={() => router.back()}
          className="mb-4"
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
          Back
        </Button>
        <h1 className="text-3xl font-bold">New Event Request</h1>
        <p className="text-muted-foreground mt-1">
          Tell us about your event and we'll help you make it happen.
        </p>
      </div>

      {isCustomer ? (
        <EventForm />
      ) : (
        <div className="bg-yellow-50 text-yellow-800 p-4 rounded-md border border-yellow-200">
          You need to be a customer to create event requests. Please contact support if you believe this is an error.
        </div>
      )}
    </div>
  );
}
