import React from 'react';
import { useStore } from '@/store';
import { UserRole, hasRole, hasPermission } from '@/lib/auth/roles';

interface RoleGuardProps {
  children: React.ReactNode;
  requiredRole?: UserRole;
  requiredPermission?: string;
  fallback?: React.ReactNode;
}

/**
 * A component that conditionally renders its children based on the user's role or permissions.
 *
 * @param children - The content to render if the user has the required role/permission
 * @param requiredRole - The role required to view the content
 * @param requiredPermission - The permission required to view the content
 * @param fallback - Content to render if the user doesn't have the required role/permission
 */
const RoleGuard: React.FC<RoleGuardProps> = ({
  children,
  requiredRole,
  requiredPermission,
  fallback = null,
}) => {
  const { user, userRole, isLoading, getEffectiveRole } = useStore();

  // If still loading, don't render anything yet
  if (isLoading) {
    return (
      <div className="flex justify-center items-center p-4">
        <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  // In development, we'll allow access even if no user is logged in
  // In production, this would render the fallback if no user is logged in
  if (process.env.NODE_ENV === 'production' && (!user || !userRole)) {
    return <>{fallback}</>;
  }

  // Get the effective role using the store's getEffectiveRole function
  // This will check userRole, lastKnownRole, and sessionStorage
  const effectiveRole = getEffectiveRole() || (process.env.NODE_ENV === 'development' ? UserRole.CUSTOMER : null);

  // Check if the user has the required role
  if (requiredRole && !hasRole(effectiveRole, requiredRole)) {
    return <>{fallback}</>;
  }

  // Check if the user has the required permission
  if (requiredPermission && !hasPermission(effectiveRole, requiredPermission)) {
    return <>{fallback}</>;
  }

  // User has the required role/permission, render the children
  return <>{children}</>;
};

export default RoleGuard;
