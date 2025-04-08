'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { UserRole } from '@/lib/auth/roles';
import useStore from '@/store';

export default function SchedulePage() {
  const router = useRouter();
  const { userRole } = useStore();
  const isEmployee = userRole === UserRole.EMPLOYEE || userRole === UserRole.ADMIN;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Work Schedule</h1>
          <p className="text-muted-foreground mt-1">
            View your upcoming work schedule
          </p>
        </div>
        <Button onClick={() => router.push('/dashboard')} variant="outline">
          Back to Dashboard
        </Button>
      </div>

      {isEmployee ? (
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
              <circle cx="12" cy="12" r="10"></circle>
              <polyline points="12 6 12 12 16 14"></polyline>
            </svg>
            <h2 className="text-xl font-semibold mb-2">Schedule Coming Soon</h2>
            <p className="text-muted-foreground text-center mb-6">
              The scheduling system is currently under development. Check back soon!
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="bg-yellow-50 text-yellow-800 p-4 rounded-md border border-yellow-200">
          You need to be an employee to view the work schedule. Please contact support if you believe this is an error.
        </div>
      )}
    </div>
  );
}
