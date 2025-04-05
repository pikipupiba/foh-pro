import React from 'react';
import { render, screen } from '@testing-library/react';
import SSGPage, { getStaticProps } from '../../pages/test-ssg';

// Mock the Date.now() for consistent testing
jest.spyOn(Date, 'now').mockImplementation(() => 1617278400000); // 2021-04-01T12:00:00.000Z

// Mock the console.log to avoid noise in test output
jest.spyOn(console, 'log').mockImplementation(() => {});

describe('SSG Page', () => {
  it('renders the SSG page with the provided timestamp', () => {
    // Mock timestamp for consistent testing
    const mockTimestamp = '2025-04-01T12:00:00.000Z';

    // Render the component with our mock props
    render(<SSGPage buildTimestamp={mockTimestamp} />);

    // Check that the page title is rendered
    expect(screen.getByText('Test SSG Page with ISR')).toBeInTheDocument();

    // Check that our timestamp is displayed
    expect(screen.getByText(mockTimestamp, { exact: false })).toBeInTheDocument();

    // Check that the explanation text is present
    const textElement = screen.getByText((content, element) => {
      return element.tagName.toLowerCase() === 'p' && content.includes('This page uses');
    });
    expect(textElement).toBeInTheDocument();
    expect(screen.getByText('Static Site Generation (SSG)')).toBeInTheDocument();
  });

  it('getStaticProps returns the expected props with revalidate', async () => {
    // Call the getStaticProps function
    const result = await getStaticProps({} as any);

    // Check the structure of the returned object
    expect(result).toHaveProperty('props');
    expect(result).toHaveProperty('revalidate', 30);

    // Check that props contains a buildTimestamp
    expect(result.props).toHaveProperty('buildTimestamp');

    // Verify the timestamp is a valid ISO string
    const { buildTimestamp } = result.props as { buildTimestamp: string };
    expect(() => new Date(buildTimestamp)).not.toThrow();
  });
});
