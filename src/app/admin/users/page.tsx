'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { collection, query, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase/firebaseConfig';
import { Button } from '@/components/ui/button';
import { UserRole } from '@/lib/auth/roles';
import useStore from '@/store';

interface User {
  id: string;
  email: string;
  displayName: string;
  role: string;
  createdAt: any;
}

export default function AdminUsersPage() {
  const router = useRouter();
  const { userRole, isLoading: authLoading } = useStore();
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const isAdmin = userRole === UserRole.ADMIN;

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersRef = collection(db, 'users');
        const q = query(usersRef);
        
        const querySnapshot = await getDocs(q);
        const usersList: User[] = [];
        
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          usersList.push({
            id: doc.id,
            email: data.email || '',
            displayName: data.displayName || '',
            role: data.role || 'customer',
            createdAt: data.createdAt,
          });
        });
        
        setUsers(usersList);
      } catch (err) {
        console.error('Error fetching users:', err);
        setError('Failed to load users. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };

    if (!authLoading && isAdmin) {
      fetchUsers();
    } else if (!authLoading && !isAdmin) {
      setIsLoading(false);
    }
  }, [authLoading, isAdmin]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">User Management</h1>
          <p className="text-muted-foreground mt-1">
            View and manage user accounts
          </p>
        </div>
        <Button onClick={() => router.push('/dashboard')} variant="outline">
          Back to Dashboard
        </Button>
      </div>

      {isAdmin ? (
        isLoading ? (
          <div className="flex justify-center items-center min-h-[60vh]">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          </div>
        ) : error ? (
          <div className="bg-red-50 text-red-800 p-4 rounded-md border border-red-200">
            {error}
          </div>
        ) : users.length === 0 ? (
          <div className="bg-gray-50 text-gray-800 p-4 rounded-md border border-gray-200">
            No users found.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-muted">
                  <th className="px-4 py-2 text-left">Name</th>
                  <th className="px-4 py-2 text-left">Email</th>
                  <th className="px-4 py-2 text-left">Role</th>
                  <th className="px-4 py-2 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id} className="border-b border-gray-200 hover:bg-muted/50">
                    <td className="px-4 py-2">{user.displayName || 'N/A'}</td>
                    <td className="px-4 py-2">{user.email}</td>
                    <td className="px-4 py-2 capitalize">{user.role}</td>
                    <td className="px-4 py-2">
                      <Button variant="outline" size="sm" onClick={() => router.push(`/admin/users/${user.id}`)}>
                        Edit
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )
      ) : (
        <div className="bg-yellow-50 text-yellow-800 p-4 rounded-md border border-yellow-200">
          You need to be an administrator to access this page. Please contact support if you believe this is an error.
        </div>
      )}
    </div>
  );
}
