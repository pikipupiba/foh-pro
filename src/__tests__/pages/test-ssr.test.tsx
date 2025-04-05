import React from 'react';
import { render, screen } from '@testing-library/react';
import SSRPage, { getServerSideProps } from '../../pages/test-ssr';

// Mock the Date.now() for consistent testing
jest.spyOn(Date, 'now').mockImplementation(() => 1617278400000); // 2021-04-01T12:00:00.000Z

// Mock the console.log to avoid noise in test output
jest.spyOn(console, 'log').mockImplementation(() => {});

describe('SSR Page', () => {
  it('renders the SSR page with the provided timestamp', () => {
    // Mock timestamp for consistent testing
    const mockTimestamp = '2025-04-01T12:00:00.000Z';

    // Render the component with our mock props
    render(<SSRPage serverTimestamp={mockTimestamp} />);

    // Check that the page title is rendered
    expect(screen.getByText('Test SSR Page')).toBeInTheDocument();

    // Check that our timestamp is displayed
    expect(screen.getByText(mockTimestamp, { exact: false })).toBeInTheDocument();

    // Check that the explanation text is present
    expect(screen.getByText('This page was generated using Server-Side Rendering (SSR).', { exact: false })).toBeInTheDocument();
  });

  it('getServerSideProps returns the expected props', async () => {
    // Create a mock context
    const mockContext = {
      req: { headers: {} },
      res: {},
      params: {},
      query: {},
    };

    // Call the getServerSideProps function
    const result = await getServerSideProps(mockContext as any);

    // Check the structure of the returned object
    expect(result).toHaveProperty('props');

    // Check that props contains a serverTimestamp
    expect(result.props).toHaveProperty('serverTimestamp');

    // Verify the timestamp is a valid ISO string
    const { serverTimestamp } = result.props as { serverTimestamp: string };
    expect(() => new Date(serverTimestamp)).not.toThrow();
  });
});
