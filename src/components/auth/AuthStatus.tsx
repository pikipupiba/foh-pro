import React from 'react';
import Link from 'next/link'; // Import Link
import useStore from '@/store'; // Import the Zustand store hook
import { auth } from '@/lib/firebase/firebaseConfig'; // Import auth for sign out
import { signOut } from 'firebase/auth';
import { LogOut } from 'lucide-react'; // Import icon
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"; // Import Avatar
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"; // Import DropdownMenu

const AuthStatus: React.FC = () => {
  const user = useStore((state) => state.user);
  const isLoading = useStore((state) => state.isLoading);

  const handleLogout = async () => {
    if (!auth) {
      console.error("Auth service not available for logout.");
      return;
    }
    try {
      await signOut(auth);
      // Zustand listener in authSlice will automatically update the user state to null
      console.log('User logged out successfully');
    } catch (error) {
      console.error('Error logging out:', error);
      // Optionally update the store with the error
      // useStore.getState().setError(error.message);
    }
  };

  if (isLoading) {
    return <div className="text-sm text-gray-500">Loading...</div>;
  }

  return (
    <div className="flex items-center space-x-2">
      {user ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-8 w-8 rounded-full">
              <Avatar className="h-8 w-8">
                {/* Assuming user object might have photoURL later */}
                {/* <AvatarImage src={user.photoURL || ""} alt={user.email || "User"} /> */}
                <AvatarFallback>
                  {/* Simple fallback using email initials */}
                  {user.email ? user.email.substring(0, 2).toUpperCase() : 'U'}
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end" forceMount>
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">Account</p>
                <p className="text-xs leading-none text-muted-foreground">
                  {user.email}
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        // Use Button component with Link via asChild prop
        <Button asChild size="sm">
          <Link href="/login">Login</Link>
        </Button>
      )}
    </div>
  );
};

export default AuthStatus;