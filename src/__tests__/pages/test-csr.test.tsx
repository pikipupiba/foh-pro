import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import CSRPage from '../../pages/test-csr';

// Mock the console.log to avoid noise in test output
jest.spyOn(console, 'log').mockImplementation(() => {});

// Mock the Date.toISOString for consistent testing
const mockISOString = '2025-04-01T12:00:00.000Z';
const originalToISOString = Date.prototype.toISOString;
beforeAll(() => {
  Date.prototype.toISOString = jest.fn(() => mockISOString);
});
afterAll(() => {
  Date.prototype.toISOString = originalToISOString;
});

describe('CSR Page', () => {
  it('renders the loading state initially', () => {
    // Render the component
    render(<CSRPage />);

    // Check that the page title is rendered
    expect(screen.getByText('Test CSR Page')).toBeInTheDocument();

    // Check that the loading state is displayed
    const loadingElement = screen.getAllByText(/Loading/)[0];
    expect(loadingElement).toBeInTheDocument();

    // Check that the explanation text is present
    expect(screen.getByText('This page uses Client-Side Rendering (CSR)', { exact: false })).toBeInTheDocument();
  });

  it('renders the timestamp after loading', async () => {
    // Render the component
    render(<CSRPage />);

    // Wait for the timestamp to appear
    await waitFor(() => {
      expect(screen.getByText(mockISOString, { exact: false })).toBeInTheDocument();
    }, { timeout: 1000 }); // Increase timeout to account for the 500ms delay in the component

    // Check that the timestamp is now displayed
    expect(screen.getByText(mockISOString, { exact: false })).toBeInTheDocument();
  });
});
