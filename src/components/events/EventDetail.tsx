import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface EventDetailProps {
  event: {
    id: string;
    eventName: string;
    eventType: string;
    eventDate: string;
    eventTime?: string;
    location: string;
    estimatedAttendees: number;
    budget: number;
    contactName: string;
    contactPhone: string;
    contactEmail: string;
    additionalDetails?: string;
    status: 'pending' | 'approved' | 'rejected' | 'completed';
    createdAt: any;
    updatedAt?: any;
  };
}

const EventDetail: React.FC<EventDetailProps> = ({ event }) => {
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

  const formatDate = (dateString: string) => {
    if (!dateString) return 'N/A';
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch (error) {
      console.error('Error formatting date:', error);
      return 'Invalid date';
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">{event.eventName}</h1>
          <p className="text-muted-foreground">{event.eventType}</p>
        </div>
        <Badge className={`${getStatusColor(event.status)} text-sm px-3 py-1`}>
          {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
        </Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Event Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Date</p>
                <p className="font-medium">{formatDate(event.eventDate)}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Time</p>
                <p className="font-medium">{event.eventTime || 'N/A'}</p>
              </div>
              <div className="col-span-2">
                <p className="text-sm text-muted-foreground">Location</p>
                <p className="font-medium">{event.location}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Estimated Attendees</p>
                <p className="font-medium">{event.estimatedAttendees.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Budget</p>
                <p className="font-medium">{formatCurrency(event.budget)}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Contact Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm text-muted-foreground">Contact Name</p>
              <p className="font-medium">{event.contactName}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Contact Phone</p>
              <p className="font-medium">{event.contactPhone}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Contact Email</p>
              <p className="font-medium">{event.contactEmail}</p>
            </div>
          </CardContent>
        </Card>

        {event.additionalDetails && (
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Additional Details</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="whitespace-pre-line">{event.additionalDetails}</p>
            </CardContent>
          </Card>
        )}

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Status Timeline</CardTitle>
            <CardDescription>Track the progress of your event request</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="relative">
              <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-border"></div>
              <div className="space-y-6 relative">
                <div className="flex items-start">
                  <div className="absolute left-0 w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </div>
                  <div className="ml-12">
                    <h3 className="font-medium">Request Submitted</h3>
                    <p className="text-sm text-muted-foreground">
                      {event.createdAt && typeof event.createdAt.toDate === 'function'
                        ? event.createdAt.toDate().toLocaleString()
                        : event.createdAt instanceof Date
                        ? event.createdAt.toLocaleString()
                        : 'Date not available'}
                    </p>
                    <p className="mt-1">Your event request has been submitted successfully.</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className={`absolute left-0 w-8 h-8 rounded-full flex items-center justify-center ${
                    event.status !== 'pending' ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
                  }`}>
                    {event.status !== 'pending' ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                    ) : (
                      <span>2</span>
                    )}
                  </div>
                  <div className="ml-12">
                    <h3 className="font-medium">Review & Quote</h3>
                    <p className="text-sm text-muted-foreground">
                      {event.status !== 'pending' && event.updatedAt
                        ? (typeof event.updatedAt.toDate === 'function'
                          ? event.updatedAt.toDate().toLocaleString()
                          : event.updatedAt instanceof Date
                            ? event.updatedAt.toLocaleString()
                            : 'Date not available')
                        : 'Pending'}
                    </p>
                    <p className="mt-1">
                      {event.status === 'pending'
                        ? 'Our team is reviewing your request and preparing a quote.'
                        : event.status === 'rejected'
                        ? 'Unfortunately, we are unable to accommodate this event.'
                        : 'Our team has reviewed your request and prepared a quote.'}
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className={`absolute left-0 w-8 h-8 rounded-full flex items-center justify-center ${
                    event.status === 'approved' || event.status === 'completed' ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
                  }`}>
                    {event.status === 'approved' || event.status === 'completed' ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                    ) : (
                      <span>3</span>
                    )}
                  </div>
                  <div className="ml-12">
                    <h3 className="font-medium">Confirmation</h3>
                    <p className="text-sm text-muted-foreground">
                      {event.status === 'approved' || event.status === 'completed'
                        ? 'Approved'
                        : 'Pending'}
                    </p>
                    <p className="mt-1">
                      {event.status === 'approved' || event.status === 'completed'
                        ? 'Your event has been confirmed. Our team will be in touch with next steps.'
                        : 'Waiting for event confirmation.'}
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className={`absolute left-0 w-8 h-8 rounded-full flex items-center justify-center ${
                    event.status === 'completed' ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
                  }`}>
                    {event.status === 'completed' ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                    ) : (
                      <span>4</span>
                    )}
                  </div>
                  <div className="ml-12">
                    <h3 className="font-medium">Event Completed</h3>
                    <p className="text-sm text-muted-foreground">
                      {event.status === 'completed' ? 'Completed' : 'Pending'}
                    </p>
                    <p className="mt-1">
                      {event.status === 'completed'
                        ? 'Your event has been successfully completed. Thank you for choosing FOH Pro!'
                        : 'This status will be updated after your event is completed.'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EventDetail;
