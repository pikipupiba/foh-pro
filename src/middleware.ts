import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Define protected routes that require authentication
const protectedRoutes = [
  '/dashboard',
  '/profile',
  '/events',
  '/admin',
];

// Define routes that should be accessible only when NOT logged in
const authRoutes = [
  '/login',
  '/signup',
  '/forgot-password',
];

export function middleware(request: NextRequest) {
  // Temporarily disabled for test account login
  return NextResponse.next();

  /* Original middleware code
  const { pathname } = request.nextUrl;

  // Get the Firebase auth session cookie
  const session = request.cookies.get('__session')?.value;

  // Check if the user is authenticated based on the session cookie
  const isAuthenticated = !!session;

  // Check if the requested path is a protected route
  const isProtectedRoute = protectedRoutes.some(route =>
    pathname === route || pathname.startsWith(`${route}/`)
  );

  // Check if the requested path is an auth route (login, signup, etc.)
  const isAuthRoute = authRoutes.some(route =>
    pathname === route || pathname.startsWith(`${route}/`)
  );

  // If the route is protected and the user is not authenticated, redirect to login
  if (isProtectedRoute && !isAuthenticated) {
    const url = new URL('/login', request.url);
    // Add the original URL as a query parameter to redirect after login
    url.searchParams.set('from', pathname);
    return NextResponse.redirect(url);
  }

  // If the route is an auth route and the user is authenticated, redirect to dashboard
  if (isAuthRoute && isAuthenticated) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  // For all other routes, continue with the request
  return NextResponse.next();
  */
}

// Configure the middleware to run only on specific paths
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public (public files)
     * - api (API routes that handle their own auth)
     */
    '/((?!_next/static|_next/image|favicon.ico|public|api).*)',
  ],
};
