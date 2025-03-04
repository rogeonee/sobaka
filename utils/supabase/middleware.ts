import { createServerClient } from '@supabase/ssr';
import { type NextRequest, NextResponse } from 'next/server';

export const updateSession = async (request: NextRequest) => {
  // Create an unmodified response
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options),
          );
        },
      },
    },
  );

  // Refresh session and get the user
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Define protected routes
  const protectedRoutes = [
    '/dashboard',
    '/events',
    '/home',
    '/profile',
    '/settings',
  ];

  // Redirect unauthenticated users from protected routes to sign-in
  if (
    protectedRoutes.some((route) =>
      request.nextUrl.pathname.startsWith(route),
    ) &&
    !user
  ) {
    return NextResponse.redirect(new URL('/sign-in', request.url));
  }

  // Redirect authenticated users from root to dashboard
  if (request.nextUrl.pathname === '/' && user) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  // Redirect authenticated users from sign-in to dashboard
  if (request.nextUrl.pathname === '/sign-in' && user) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  // Proceed with the request if no redirects are needed
  return response;
};
