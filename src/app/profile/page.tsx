'use client';

// Force client-side rendering
export const dynamic = 'force-dynamic';

import React from 'react';
import ProfileForm from '@/components/profile/ProfileForm';
import { useStore } from '@/store';

export default function ProfilePage() {
  const { user, isLoading } = useStore();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Your Profile</h1>

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      ) : (
        <div className="max-w-2xl mx-auto">
          <ProfileForm />
        </div>
      )}
    </div>
  );
}
