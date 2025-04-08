// Define user roles
export enum UserRole {
  CUSTOMER = 'CUSTOMER',
  EMPLOYEE = 'EMPLOYEE',
  ADMIN = 'ADMIN',
}

// Map for display names
export const roleDisplayNames = {
  [UserRole.CUSTOMER]: 'Customer',
  [UserRole.EMPLOYEE]: 'Employee',
  [UserRole.ADMIN]: 'Administrator',
}

// Define permissions for each role
export const rolePermissions = {
  [UserRole.CUSTOMER]: [
    'view:events',
    'book:events',
    'view:profile',
    'edit:profile',
  ],
  [UserRole.EMPLOYEE]: [
    'view:events',
    'book:events',
    'view:profile',
    'edit:profile',
    'view:customers',
    'view:inventory',
    'edit:inventory',
    'view:schedule',
  ],
  [UserRole.ADMIN]: [
    'view:events',
    'book:events',
    'view:profile',
    'edit:profile',
    'view:customers',
    'edit:customers',
    'view:employees',
    'edit:employees',
    'view:inventory',
    'edit:inventory',
    'view:schedule',
    'edit:schedule',
    'view:reports',
    'view:settings',
    'edit:settings',
  ],
};

// Helper function to check if a user has a specific permission
export const hasPermission = (userRole: UserRole | undefined, permission: string): boolean => {
  if (!userRole) return false;
  return rolePermissions[userRole]?.includes(permission) || false;
};

// Helper function to check if a user has a specific role
export const hasRole = (userRole: UserRole | undefined, role: UserRole): boolean => {
  if (!userRole) return false;

  // Admin has all roles
  if (userRole === UserRole.ADMIN) return true;

  // Employee has customer role
  if (userRole === UserRole.EMPLOYEE && role === UserRole.CUSTOMER) return true;

  // Direct match
  return userRole === role;
};
