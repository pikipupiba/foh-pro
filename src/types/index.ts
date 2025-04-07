// User types
export type UserRole = 'customer' | 'employee' | 'admin';

export interface User {
  id: string;
  email: string;
  role: UserRole;
  displayName: string;
  createdAt: Date;
  lastLogin: Date;
  metadata: Record<string, unknown>;
}

// Rental types
export interface RentalItem {
  id: string;
  name: string;
  category: string;
  quantity: number;
  dailyRate: number;
  available: boolean;
  metadata: Record<string, unknown>;
}

export interface RentalRequest {
  id: string;
  userId: string;
  status: 'pending' | 'approved' | 'rejected' | 'completed';
  items: Array<{
    itemId: string;
    quantity: number;
    dailyRate: number;
  }>;
  startDate: Date;
  endDate: Date;
  totalAmount: number;
  createdAt: Date;
  updatedAt: Date;
}

// Store types
export interface AuthState {
  user: User | null;
  loading: boolean;
  error: Error | null;
}

export interface RentalState {
  requests: RentalRequest[];
  loading: boolean;
  error: Error | null;
}