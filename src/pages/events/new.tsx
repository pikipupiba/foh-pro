import React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import EventForm from '@/components/events/EventForm';
import RoleGuard from '@/components/auth/RoleGuard';
import { UserRole } from '@/lib/auth/roles';
import { Button } from '@/components/ui/button';

const NewEventPage: React.FC = () => {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>New Event Request | FOH Pro</title>
        <meta name="description" content="Create a new event request with FOH Pro" />
      </Head>

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

        <RoleGuard requiredRole={UserRole.CUSTOMER}>
          <EventForm />
        </RoleGuard>
      </div>
    </>
  );
};

export default NewEventPage;
