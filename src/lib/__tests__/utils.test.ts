import { formatPrice } from '../utils'; // Adjust path as necessary

describe('formatPrice', () => {
  it('should format a valid integer price in cents to USD currency string', () => {
    expect(formatPrice(12345)).toBe('$123.45');
  });

  it('should format zero cents correctly', () => {
    expect(formatPrice(0)).toBe('$0.00');
  });

  it('should handle single-digit dollar amounts correctly', () => {
    expect(formatPrice(500)).toBe('$5.00');
  });

  it('should handle amounts less than a dollar correctly', () => {
    expect(formatPrice(75)).toBe('$0.75');
  });

  it('should return "Invalid input" for non-integer numbers', () => {
    expect(formatPrice(123.45)).toBe('Invalid input');
  });

  // Jest doesn't have built-in type checking for runtime args like TS does at compile time,
  // but we can test how the function handles unexpected types if needed.
  // The typeof check handles this case.
  it('should return "Invalid input" for non-number inputs', () => {
    // Need to bypass TypeScript's compile-time check for this test
    expect(formatPrice('not a number' as any)).toBe('Invalid input');
    expect(formatPrice(null as any)).toBe('Invalid input');
    expect(formatPrice(undefined as any)).toBe('Invalid input');
    expect(formatPrice({} as any)).toBe('Invalid input');
  });

  // Optional: Test different currencies if the function is expected to handle them
  // Note: Intl.NumberFormat behavior can vary slightly across Node versions/environments
  it('should format correctly with a different currency (EUR)', () => {
     // The exact format (€123.45 vs 123,45 €) might depend on locale data in the environment
     // Using a regex to be more flexible
    expect(formatPrice(12345, 'EUR')).toMatch(/€?\s?123\.?45\s?€?/);
  });

});