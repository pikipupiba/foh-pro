'use client';

import React, { useEffect, useRef } from 'react';
import useStore from '@/store';
import { UserRole } from '@/lib/auth/roles';

const RoleDebug: React.FC = () => {
  const { userRole, setUserRole, user, isLoading } = useStore();
  const initialRender = useRef(true);
  const lastKnownRole = useRef<UserRole | null>(null);

  // Log role changes
  useEffect(() => {
    console.log('Current role:', userRole);

    // Update our ref with the current role if it's valid
    if (userRole) {
      lastKnownRole.current = userRole;
    }
  }, [userRole]);

  // Handle role persistence in sessionStorage
  useEffect(() => {
    // Save the current role to sessionStorage
    if (userRole) {
      sessionStorage.setItem('lastUserRole', userRole);
      console.log('Saved role to sessionStorage:', userRole);
    }
  }, [userRole]);

  // Handle browser navigation events
  useEffect(() => {
    // Handle popstate (back/forward navigation)
    const handlePopState = () => {
      const savedRole = sessionStorage.getItem('lastUserRole') as UserRole | null;
      if (savedRole && savedRole !== userRole) {
        console.log('Restoring role from sessionStorage after navigation:', savedRole);
        setUserRole(savedRole as UserRole);
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [userRole, setUserRole]);

  // Handle auth state changes
  useEffect(() => {
    // Skip on initial render
    if (initialRender.current) {
      initialRender.current = false;
      return;
    }

    // If auth state changes and we lose the user, but we have a saved role
    if (!isLoading && !user && !userRole) {
      const savedRole = sessionStorage.getItem('lastUserRole') as UserRole | null;
      if (savedRole || lastKnownRole.current) {
        const roleToRestore = savedRole || lastKnownRole.current;
        console.log('Auth state changed, restoring role:', roleToRestore);
        setUserRole(roleToRestore as UserRole);
      }
    }
  }, [user, isLoading, userRole, setUserRole]);

  // This component doesn't render anything
  return null;
};

export default RoleDebug;
