import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import EventManagement from '@/components/events/EventManagement';

// Mock Firebase
jest.mock('@/lib/firebase/firebaseConfig', () => ({
  db: {
    collection: jest.fn(),
  },
}));

// Mock Firebase Firestore functions
jest.mock('firebase/firestore', () => ({
  doc: jest.fn(),
  updateDoc: jest.fn(() => Promise.resolve()),
  Timestamp: {
    now: jest.fn(() => ({ toDate: () => new Date() })),
  },
}));

describe('EventManagement Component', () => {
  const mockEvent = {
    id: 'test-event-id',
    eventName: 'Test Event',
    eventType: 'Corporate Event',
    status: 'pending',
    employeeNotes: 'Initial notes',
  };

  const mockOnEventUpdated = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the component correctly', () => {
    render(<EventManagement event={mockEvent} onEventUpdated={mockOnEventUpdated} />);

    // Check for component title
    expect(screen.getByText('Event Management')).toBeInTheDocument();

    // Check for status badge
    expect(screen.getAllByText('Pending')[0]).toBeInTheDocument();

    // Check for form fields
    expect(screen.getByLabelText('Update Status')).toBeInTheDocument();
    expect(screen.getByLabelText('Employee Notes (not visible to customer)')).toBeInTheDocument();

    // Check for update button
    expect(screen.getByRole('button', { name: 'Update Event' })).toBeInTheDocument();
  });

  it('displays the current event status and notes', () => {
    render(<EventManagement event={mockEvent} onEventUpdated={mockOnEventUpdated} />);

    // Check that the status is set correctly
    expect(screen.getAllByText('Pending')[0]).toBeInTheDocument();

    // Check that the notes are set correctly
    const notesTextarea = screen.getByLabelText('Employee Notes (not visible to customer)');
    expect(notesTextarea.value).toBe('Initial notes');
  });

  // Add more tests as needed
});
