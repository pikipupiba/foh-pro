import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { v4 as uuidv4 } from 'uuid';
import { db } from '@/lib/firebase/firebaseConfig';
import useStore from '@/store';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

// Event types
const EVENT_TYPES = [
  'Wedding',
  'Corporate Event',
  'Concert',
  'Festival',
  'Conference',
  'Private Party',
  'Fundraiser',
  'Other'
];

const EventForm: React.FC = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Form state
  const [eventName, setEventName] = useState('');
  const [eventType, setEventType] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [eventTime, setEventTime] = useState('');
  const [location, setLocation] = useState('');
  const [estimatedAttendees, setEstimatedAttendees] = useState('');
  const [budget, setBudget] = useState('');
  const [contactName, setContactName] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [additionalDetails, setAdditionalDetails] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submission started');
    setIsLoading(true);
    setError(null);
    setSuccess(null);

    // Check if Firebase is initialized
    if (!db || !auth) {
      console.error('Firebase not initialized');
      setError('Firebase services are not available. Please try again later.');
      setIsLoading(false);
      return;
    }

    // Check if user is logged in
    if (!auth.currentUser) {
      console.error('User not logged in');
      setError('You must be logged in to submit an event request.');
      setIsLoading(false);
      return;
    }

    console.log('User authenticated:', auth.currentUser.uid);

    try {
      // Create a new event ID
      const eventId = uuidv4();
      console.log('Generated event ID:', eventId);

      // Create the event object
      const eventData = {
        id: eventId,
        userId: auth.currentUser.uid,
        eventName,
        eventType,
        eventDate,
        eventTime,
        location,
        estimatedAttendees: parseInt(estimatedAttendees) || 0,
        budget: parseFloat(budget) || 0,
        contactName,
        contactPhone,
        contactEmail,
        additionalDetails,
        status: 'pending',
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      };

      console.log('Event data prepared:', eventData);

      // Save to Firestore
      console.log('Saving to Firestore...');
      const docRef = doc(db, 'events', eventId);
      await setDoc(docRef, eventData);
      console.log('Successfully saved to Firestore');

      setSuccess('Event request submitted successfully!');
      console.log('Success state set');

      // Reset form
      setEventName('');
      setEventType('');
      setEventDate('');
      setEventTime('');
      setLocation('');
      setEstimatedAttendees('');
      setBudget('');
      setContactName('');
      setContactPhone('');
      setContactEmail('');
      setAdditionalDetails('');
      console.log('Form reset complete');

      // Redirect after a short delay
      console.log('Setting up redirect...');
      setTimeout(() => {
        console.log('Redirecting to events page');
        router.push('/events');
      }, 2000);
    } catch (err) {
      console.error('Error submitting event request:', err);
      setError('Failed to submit event request. Please try again.');
    } finally {
      setIsLoading(false);
      console.log('Form submission process completed');
    }
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>Tell Us About Your Event</CardTitle>
        <CardDescription>
          Fill out the form below to get started with your event planning. We'll use this information to provide you with a customized quote.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <Alert variant="destructive" className="mb-4 border-2 border-red-500">
              <AlertDescription className="font-medium">{error}</AlertDescription>
            </Alert>
          )}

          {success && (
            <Alert className="mb-4 bg-green-50 text-green-800 border-2 border-green-500">
              <AlertDescription className="font-medium">
                {success}
                <div className="mt-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => router.push('/events')}
                    className="mt-2"
                  >
                    View All Events
                  </Button>
                </div>
              </AlertDescription>
            </Alert>
          )}

          <div className="space-y-4">
            <h3 className="text-lg font-medium">Event Details</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="eventName">Event Name</Label>
                <Input
                  id="eventName"
                  value={eventName}
                  onChange={(e) => setEventName(e.target.value)}
                  required
                  disabled={isLoading}
                  placeholder="Annual Company Gala"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="eventType">Event Type</Label>
                <Select
                  value={eventType}
                  onValueChange={setEventType}
                  disabled={isLoading}
                  required
                >
                  <SelectTrigger id="eventType">
                    <SelectValue placeholder="Select event type" />
                  </SelectTrigger>
                  <SelectContent>
                    {EVENT_TYPES.map((type) => (
                      <SelectItem key={type} value={type}>{type}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="eventDate">Event Date</Label>
                <Input
                  id="eventDate"
                  type="date"
                  value={eventDate}
                  onChange={(e) => setEventDate(e.target.value)}
                  required
                  disabled={isLoading}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="eventTime">Event Time</Label>
                <Input
                  id="eventTime"
                  type="time"
                  value={eventTime}
                  onChange={(e) => setEventTime(e.target.value)}
                  required
                  disabled={isLoading}
                />
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="location">Event Location</Label>
                <Input
                  id="location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  required
                  disabled={isLoading}
                  placeholder="Venue name and address"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="estimatedAttendees">Estimated Attendees</Label>
                <Input
                  id="estimatedAttendees"
                  type="number"
                  value={estimatedAttendees}
                  onChange={(e) => setEstimatedAttendees(e.target.value)}
                  required
                  disabled={isLoading}
                  placeholder="100"
                  min="1"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="budget">Estimated Budget ($)</Label>
                <Input
                  id="budget"
                  type="number"
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                  required
                  disabled={isLoading}
                  placeholder="5000"
                  min="0"
                  step="100"
                />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-medium">Contact Information</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="contactName">Contact Name</Label>
                <Input
                  id="contactName"
                  value={contactName}
                  onChange={(e) => setContactName(e.target.value)}
                  required
                  disabled={isLoading}
                  placeholder="John Doe"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="contactPhone">Contact Phone</Label>
                <Input
                  id="contactPhone"
                  type="tel"
                  value={contactPhone}
                  onChange={(e) => setContactPhone(e.target.value)}
                  required
                  disabled={isLoading}
                  placeholder="(555) 123-4567"
                />
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="contactEmail">Contact Email</Label>
                <Input
                  id="contactEmail"
                  type="email"
                  value={contactEmail}
                  onChange={(e) => setContactEmail(e.target.value)}
                  required
                  disabled={isLoading}
                  placeholder="john.doe@example.com"
                />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="additionalDetails">Additional Details</Label>
            <Textarea
              id="additionalDetails"
              value={additionalDetails}
              onChange={(e) => setAdditionalDetails(e.target.value)}
              disabled={isLoading}
              placeholder="Please provide any additional details about your event that would help us prepare a quote."
              rows={4}
            />
          </div>

          <CardFooter className="px-0 pt-4">
            <Button type="submit" disabled={isLoading} className="w-full">
              {isLoading ? 'Submitting...' : 'Submit Event Request'}
            </Button>
          </CardFooter>
        </form>
      </CardContent>
    </Card>
  );
};

export default EventForm;
