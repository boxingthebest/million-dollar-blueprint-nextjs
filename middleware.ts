import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

/**
 * Simple in-memory rate limiter for Edge Runtime
 * Note: This resets on each deployment. For persistent rate limiting,
 * consider using Vercel KV or Upstash Redis.
 */
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

function rateLimit(ip: string, limit: number, windowSeconds: number): boolean {
  const now = Date.now();
  const windowMs = windowSeconds * 1000;
  const entry = rateLimitMap.get(ip);

  if (!entry || entry.resetTime < now) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + windowMs });
    return true;
  }

  if (entry.count >= limit) {
    return false;
  }

  entry.count++;
  return true;
}

function getClientIP(request: NextRequest): string {
  const forwardedFor = request.headers.get('x-forwarded-for');
  if (forwardedFor) {
    return forwardedFor.split(',')[0].trim();
  }
  return request.headers.get('x-real-ip') || 
         request.headers.get('cf-connecting-ip') || 
         'unknown';
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const ip = getClientIP(request);

  // Skip rate limiting for static assets and internal Next.js routes
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/static') ||
    pathname.includes('.') // Static files
  ) {
    return NextResponse.next();
  }

  // Rate limit configuration by route type
  let limit = 100; // Default: 100 requests per minute
  let windowSeconds = 60;

  // Stricter limits for sensitive endpoints
  if (pathname.startsWith('/api/auth')) {
    limit = 10; // Auth endpoints: 10 per minute
  } else if (pathname.startsWith('/api/checkout') || pathname.startsWith('/api/webhooks')) {
    limit = 20; // Payment endpoints: 20 per minute
  } else if (pathname.startsWith('/api/admin')) {
    limit = 50; // Admin endpoints: 50 per minute
  } else if (pathname.startsWith('/api/')) {
    limit = 60; // Other API endpoints: 60 per minute
  }

  // Apply rate limiting to API routes
  if (pathname.startsWith('/api/')) {
    const allowed = rateLimit(ip, limit, windowSeconds);
    
    if (!allowed) {
      return new NextResponse(
        JSON.stringify({ 
          error: 'Too many requests', 
          message: 'Please try again later' 
        }),
        { 
          status: 429,
          headers: {
            'Content-Type': 'application/json',
            'Retry-After': String(windowSeconds),
          }
        }
      );
    }
  }

  // Add security headers to response
  const response = NextResponse.next();
  
  // Prevent clickjacking
  response.headers.set('X-Frame-Options', 'SAMEORIGIN');
  
  // Prevent MIME type sniffing
  response.headers.set('X-Content-Type-Options', 'nosniff');
  
  // XSS Protection (legacy browsers)
  response.headers.set('X-XSS-Protection', '1; mode=block');

  return response;
}

// Configure which paths the middleware runs on
export const config = {
  matcher: [
    // Match all API routes
    '/api/:path*',
    // Match all pages except static files
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};
