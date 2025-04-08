'use client';

import React, { useState } from 'react';
import { doc, updateDoc, Timestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase/firebaseConfig';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface EventManagementProps {
  event: any;
  onEventUpdated: () => void;
}

const EventManagement: React.FC<EventManagementProps> = ({ event, onEventUpdated }) => {
  const [status, setStatus] = useState<string>(event.status);
  const [notes, setNotes] = useState<string>(event.employeeNotes || '');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20';
      case 'approved':
        return 'bg-green-500/10 text-green-500 border-green-500/20';
      case 'rejected':
        return 'bg-red-500/10 text-red-500 border-red-500/20';
      case 'completed':
        return 'bg-blue-500/10 text-blue-500 border-blue-500/20';
      default:
        return 'bg-gray-500/10 text-gray-500 border-gray-500/20';
    }
  };

  const handleUpdateEvent = async () => {
    setIsLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const eventRef = doc(db, 'events', event.id);

      await updateDoc(eventRef, {
        status,
        employeeNotes: notes,
        updatedAt: Timestamp.now()
      });

      setSuccess('Event updated successfully!');
      onEventUpdated();
    } catch (err) {
      console.error('Error updating event:', err);
      setError('Failed to update event. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <span>Event Management</span>
          <Badge className={getStatusColor(status)}>
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
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
          <Label htmlFor="status">Update Status</Label>
          <Select
            value={status}
            onValueChange={setStatus}
            disabled={isLoading}
          >
            <SelectTrigger id="status">
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="approved">Approved</SelectItem>
              <SelectItem value="rejected">Rejected</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="notes">Employee Notes (not visible to customer)</Label>
          <Textarea
            id="notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            disabled={isLoading}
            placeholder="Add internal notes about this event..."
            rows={4}
          />
        </div>
      </CardContent>
      <CardFooter>
        <Button
          onClick={handleUpdateEvent}
          disabled={isLoading}
          className="w-full"
        >
          {isLoading ? 'Updating...' : 'Update Event'}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default EventManagement;
