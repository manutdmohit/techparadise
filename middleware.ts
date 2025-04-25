import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Get the pathname of the request
  const path = request.nextUrl.pathname;

  // If the path starts with /admin but is not /admin/login, redirect to /admin
  if (path.startsWith('/admin') && path !== '/admin/login') {
    // This is just a placeholder - in a real app, you would check for authentication
    // For now, we'll just let the client-side auth check handle it
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
