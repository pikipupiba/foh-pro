'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import useStore from '@/store';
import { UserRole } from '@/lib/auth/roles';

interface DashboardWrapperProps {
  children: React.ReactNode;
}

export default function DashboardWrapper({ children }: DashboardWrapperProps) {
  const { user, userRole, isLoading, getEffectiveRole } = useStore();
  const router = useRouter();
  
  // Get the effective role (userRole, lastKnownRole, or from sessionStorage)
  let roleFromSession = null;
  if (typeof window !== 'undefined') {
    const savedRole = sessionStorage.getItem('lastUserRole') as UserRole | null;
    if (savedRole && Object.values(UserRole).includes(savedRole as UserRole)) {
      console.log('DashboardWrapper - Found role in sessionStorage:', savedRole);
      roleFromSession = savedRole as UserRole;
    }
  }
  
  // Use the role from sessionStorage if available, otherwise use getEffectiveRole
  const effectiveRole = roleFromSession || getEffectiveRole();
  console.log('DashboardWrapper - userRole:', userRole);
  console.log('DashboardWrapper - effectiveRole:', effectiveRole);
  
  React.useEffect(() => {
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
  
  return (
    <div className="dashboard-wrapper">
      {children}
    </div>
  );
}
