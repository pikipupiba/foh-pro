import React, { useState, useEffect, FormEvent } from 'react';
import {
  updateProfile,
  updateEmail,
  updatePassword,
  EmailAuthProvider,
  reauthenticateWithCredential,
  User
} from 'firebase/auth';
import { auth } from '@/lib/firebase/firebaseConfig';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { useStore } from '@/store';

const ProfileForm: React.FC = () => {
  const user = useStore(state => state.user);

  // Profile info state
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');

  // Password change state
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // UI state
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Initialize form with user data
  useEffect(() => {
    if (user) {
      setDisplayName(user.displayName || '');
      setEmail(user.email || '');
    }
  }, [user]);

  // Handle profile update
  const handleProfileUpdate = async (e: FormEvent) => {
    e.preventDefault();

    if (!auth?.currentUser) {
      setError('You must be logged in to update your profile.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setSuccess(null);

    try {
      // Update display name
      if (displayName !== user?.displayName) {
        await updateProfile(auth.currentUser, { displayName });
      }

      // Update email if changed
      if (email !== user?.email && currentPassword) {
        // Re-authenticate user before changing email
        const credential = EmailAuthProvider.credential(
          user?.email || '',
          currentPassword
        );
        await reauthenticateWithCredential(auth.currentUser, credential);
        await updateEmail(auth.currentUser, email);
        setCurrentPassword(''); // Clear password field
      }

      setSuccess('Profile updated successfully!');
    } catch (err: any) {
      console.error('Profile update error:', err);

      let errorMessage = "Failed to update profile. Please try again.";
      if (err.code === 'auth/requires-recent-login') {
        errorMessage = "Please log out and log back in to update your email.";
      } else if (err.code === 'auth/invalid-email') {
        errorMessage = "Please enter a valid email address.";
      } else if (err.code === 'auth/email-already-in-use') {
        errorMessage = "This email is already in use by another account.";
      } else if (err.code === 'auth/wrong-password') {
        errorMessage = "Incorrect current password.";
      }

      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle password change
  const handlePasswordChange = async (e: FormEvent) => {
    e.preventDefault();

    if (!auth?.currentUser) {
      setError('You must be logged in to change your password.');
      return;
    }

    if (newPassword !== confirmPassword) {
      setError('New passwords do not match.');
      return;
    }

    if (newPassword.length < 6) {
      setError('New password must be at least 6 characters long.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setSuccess(null);

    try {
      // Re-authenticate user before changing password
      const credential = EmailAuthProvider.credential(
        user?.email || '',
        currentPassword
      );
      await reauthenticateWithCredential(auth.currentUser, credential);

      // Update password
      await updatePassword(auth.currentUser, newPassword);

      // Clear password fields
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');

      setSuccess('Password changed successfully!');
    } catch (err: any) {
      console.error('Password change error:', err);

      let errorMessage = "Failed to change password. Please try again.";
      if (err.code === 'auth/requires-recent-login') {
        errorMessage = "Please log out and log back in to change your password.";
      } else if (err.code === 'auth/wrong-password') {
        errorMessage = "Incorrect current password.";
      }

      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  if (!user) {
    return (
      <Alert>
        <AlertDescription>You must be logged in to view your profile.</AlertDescription>
      </Alert>
    );
  }

  return (
    <Tabs defaultValue="profile" className="w-full">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="profile">Profile Information</TabsTrigger>
        <TabsTrigger value="password">Change Password</TabsTrigger>
      </TabsList>

      <TabsContent value="profile">
        <Card>
          <CardHeader>
            <CardTitle>Profile Information</CardTitle>
            <CardDescription>
              Update your account details here.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form id="profile-form" onSubmit={handleProfileUpdate} className="space-y-4">
              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              {success && (
                <Alert className="bg-green-50 text-green-800 border-green-200">
                  <AlertDescription>{success}</AlertDescription>
                </Alert>
              )}

              <div className="space-y-2">
                <Label htmlFor="displayName">Display Name</Label>
                <Input
                  id="displayName"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  disabled={isLoading}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isLoading}
                />
              </div>

              {email !== user.email && (
                <div className="space-y-2">
                  <Label htmlFor="currentPassword">Current Password (required to change email)</Label>
                  <Input
                    id="currentPassword"
                    type="password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    disabled={isLoading}
                    required={email !== user.email}
                  />
                </div>
              )}
            </form>
          </CardContent>
          <CardFooter>
            <Button
              type="submit"
              form="profile-form"
              disabled={isLoading || (!displayName && email === user.email)}
            >
              {isLoading ? 'Saving...' : 'Save Changes'}
            </Button>
          </CardFooter>
        </Card>
      </TabsContent>

      <TabsContent value="password">
        <Card>
          <CardHeader>
            <CardTitle>Change Password</CardTitle>
            <CardDescription>
              Update your password here. After saving, you&apos;ll be logged out.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form id="password-form" onSubmit={handlePasswordChange} className="space-y-4">
              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              {success && (
                <Alert className="bg-green-50 text-green-800 border-green-200">
                  <AlertDescription>{success}</AlertDescription>
                </Alert>
              )}

              <div className="space-y-2">
                <Label htmlFor="currentPasswordForChange">Current Password</Label>
                <Input
                  id="currentPasswordForChange"
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  disabled={isLoading}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="newPassword">New Password</Label>
                <Input
                  id="newPassword"
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  disabled={isLoading}
                  required
                  minLength={6}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm New Password</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  disabled={isLoading}
                  required
                />
              </div>
            </form>
          </CardContent>
          <CardFooter>
            <Button
              type="submit"
              form="password-form"
              disabled={isLoading || !currentPassword || !newPassword || !confirmPassword}
            >
              {isLoading ? 'Changing...' : 'Change Password'}
            </Button>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  );
};

export default ProfileForm;
