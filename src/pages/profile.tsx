import React from 'react';
import Head from 'next/head';
import ProfileForm from '@/components/profile/ProfileForm';
import { useStore } from '@/store';

const ProfilePage: React.FC = () => {
  const { user, isLoading } = useStore();

  return (
    <>
      <Head>
        <title>Your Profile | FOH Pro</title>
        <meta name="description" content="Manage your FOH Pro account profile" />
      </Head>

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
    </>
  );
};

export default ProfilePage;
