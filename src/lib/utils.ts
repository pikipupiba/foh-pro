import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Example function to add to src/lib/utils.ts
export function formatPrice(priceInCents: number, currency: string = 'USD'): string {
  if (typeof priceInCents !== 'number' || !Number.isInteger(priceInCents)) {
    // Or throw an error, depending on desired behavior
    return 'Invalid input';
  }
  const amount = priceInCents / 100;
  return new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(amount);
}
