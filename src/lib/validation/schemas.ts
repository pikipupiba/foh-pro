import { z } from 'zod';

export const rentalRequestSchema = z.object({
  startDate: z.string().datetime(),
  endDate: z.string().datetime(),
  items: z.array(z.object({
    id: z.string().uuid(),
    quantity: z.number().int().positive(),
  })),
  deliveryAddress: z.string().min(1).max(500),
  specialInstructions: z.string().max(1000).optional(),
});

export type RentalRequest = z.infer<typeof rentalRequestSchema>;