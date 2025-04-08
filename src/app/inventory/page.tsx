'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { UserRole } from '@/lib/auth/roles';
import useStore from '@/store';

export default function InventoryPage() {
  const router = useRouter();
  const { userRole } = useStore();
  const isEmployee = userRole === UserRole.EMPLOYEE || userRole === UserRole.ADMIN;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Inventory Management</h1>
          <p className="text-muted-foreground mt-1">
            View and manage inventory and supplies
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
              <path d="M20 6v12a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2Z"></path>
              <path d="M4 10a2 2 0 0 1 2-2h2v10H6a2 2 0 0 1-2-2Z"></path>
            </svg>
            <h2 className="text-xl font-semibold mb-2">Inventory Coming Soon</h2>
            <p className="text-muted-foreground text-center mb-6">
              The inventory management system is currently under development. Check back soon!
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="bg-yellow-50 text-yellow-800 p-4 rounded-md border border-yellow-200">
          You need to be an employee to access inventory management. Please contact support if you believe this is an error.
        </div>
      )}
    </div>
  );
}
