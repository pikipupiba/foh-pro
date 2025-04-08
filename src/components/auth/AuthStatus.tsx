'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import useStore from '@/store';
import { auth } from '@/lib/firebase/firebaseConfig';
import { signOut } from 'firebase/auth';
import { LogOut, User, Settings, LayoutDashboard } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { UserRole, roleDisplayNames } from '@/lib/auth/roles';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"; // Import DropdownMenu

const AuthStatus: React.FC = () => {
  const { user, userRole, isLoading, getEffectiveRole } = useStore();
  const effectiveRole = getEffectiveRole();
  console.log('AuthStatus - userRole:', userRole);
  console.log('AuthStatus - effectiveRole:', effectiveRole);
  const router = useRouter();

  const { setUser, setUserRole, setLastKnownRole } = useStore();

  const handleLogout = async () => {
    // If we have a mock user (no real Firebase user), just clear the state
    if (!user && mockUser) {
      // Clear the role and user state
      setUser(null);
      setUserRole(null);
      setLastKnownRole(null);

      // Clear sessionStorage
      if (typeof window !== 'undefined') {
        sessionStorage.removeItem('lastUserRole');
      }

      console.log('Mock user logged out');
      router.replace('/');
      return;
    }

    // Handle real Firebase user logout
    if (!auth) {
      console.error("Auth service not available for logout.");
      return;
    }

    try {
      await signOut(auth);

      // Also clear the lastKnownRole and sessionStorage
      setLastKnownRole(null);
      if (typeof window !== 'undefined') {
        sessionStorage.removeItem('lastUserRole');
      }

      // Zustand listener in authSlice will automatically update the user state to null
      console.log('User logged out successfully');

      // Redirect to home page after logout
      router.replace('/');
    } catch (error) {
      console.error('Error logging out:', error);
      // Optionally update the store with the error
      // useStore.getState().setError(error.message);
    }
  };

  if (isLoading) {
    return <div className="text-sm text-muted-foreground">Loading...</div>;
  }

  // Create a mock user for development when we have a role but no user
  const mockUser = !user && effectiveRole && process.env.NODE_ENV === 'development' ? {
    displayName: effectiveRole === UserRole.ADMIN ? 'Manager' :
                effectiveRole === UserRole.EMPLOYEE ? 'Employee' : 'Customer',
    email: effectiveRole === UserRole.ADMIN ? 'manager@google.com' :
           effectiveRole === UserRole.EMPLOYEE ? 'employee@google.com' : 'customer@google.com',
    photoURL: null
  } : null;

  // Use either the real user or the mock user
  const displayUser = user || mockUser;

  return (
    <div className="flex items-center space-x-4">
      {displayUser ? (
        <>
          <div className="hidden md:block">
            <span className="text-sm font-medium">
              {effectiveRole === UserRole.ADMIN ? 'Admin' :
               effectiveRole === UserRole.EMPLOYEE ? 'Employee' :
               'Customer'}
            </span>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <Avatar className="h-8 w-8">
                  {displayUser.photoURL && (
                    <AvatarImage src={displayUser.photoURL} alt={displayUser.displayName || displayUser.email || "User"} />
                  )}
                  <AvatarFallback>
                    {displayUser.displayName
                      ? displayUser.displayName.substring(0, 2).toUpperCase()
                      : displayUser.email
                        ? displayUser.email.substring(0, 2).toUpperCase()
                        : 'U'}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">
                    {displayUser.displayName || 'Account'}
                  </p>
                  <p className="text-xs leading-none text-muted-foreground">
                    {displayUser.email}
                  </p>
                  {effectiveRole && (
                    <p className="text-xs font-medium text-primary mt-1">
                      {roleDisplayNames[effectiveRole]}
                    </p>
                  )}
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />

              <DropdownMenuItem onClick={() => router.push('/dashboard')}>
                <LayoutDashboard className="mr-2 h-4 w-4" />
                <span>Dashboard</span>
              </DropdownMenuItem>

              <DropdownMenuItem onClick={() => router.push('/profile')}>
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>

              {effectiveRole === UserRole.ADMIN && (
                <DropdownMenuItem onClick={() => router.push('/admin/settings')}>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Admin Settings</span>
                </DropdownMenuItem>
              )}

              <DropdownMenuSeparator />

              <DropdownMenuItem onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </>
      ) : (
        <div className="flex space-x-2">
          <Button asChild variant="ghost" size="sm">
            <Link href="/signup">Sign Up</Link>
          </Button>
          <Button asChild size="sm">
            <Link href="/login">Login</Link>
          </Button>
        </div>
      )}
    </div>
  );
};

export default AuthStatus;