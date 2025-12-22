/**
 * Simple in-memory rate limiter for API routes
 * For production at scale, consider using Redis or Upstash
 */

interface RateLimitEntry {
  count: number;
  resetTime: number;
}

const rateLimitMap = new Map<string, RateLimitEntry>();

// Clean up old entries every 5 minutes
setInterval(() => {
  const now = Date.now();
  for (const [key, entry] of rateLimitMap.entries()) {
    if (entry.resetTime < now) {
      rateLimitMap.delete(key);
    }
  }
}, 5 * 60 * 1000);

interface RateLimitOptions {
  /** Maximum number of requests allowed in the window */
  limit: number;
  /** Time window in seconds */
  windowInSeconds: number;
}

interface RateLimitResult {
  success: boolean;
  remaining: number;
  resetIn: number;
}

/**
 * Check if a request should be rate limited
 * @param identifier - Unique identifier for the client (IP, user ID, etc.)
 * @param options - Rate limit configuration
 * @returns Whether the request is allowed and remaining quota
 */
export function rateLimit(
  identifier: string,
  options: RateLimitOptions = { limit: 10, windowInSeconds: 60 }
): RateLimitResult {
  const now = Date.now();
  const windowMs = options.windowInSeconds * 1000;
  const key = identifier;

  const entry = rateLimitMap.get(key);

  if (!entry || entry.resetTime < now) {
    // First request or window expired - create new entry
    rateLimitMap.set(key, {
      count: 1,
      resetTime: now + windowMs,
    });
    return {
      success: true,
      remaining: options.limit - 1,
      resetIn: options.windowInSeconds,
    };
  }

  if (entry.count >= options.limit) {
    // Rate limit exceeded
    return {
      success: false,
      remaining: 0,
      resetIn: Math.ceil((entry.resetTime - now) / 1000),
    };
  }

  // Increment count
  entry.count++;
  return {
    success: true,
    remaining: options.limit - entry.count,
    resetIn: Math.ceil((entry.resetTime - now) / 1000),
  };
}

/**
 * Get client IP from request headers
 * Works with Vercel, Cloudflare, and direct connections
 */
export function getClientIP(request: Request): string {
  // Try various headers in order of preference
  const forwardedFor = request.headers.get('x-forwarded-for');
  if (forwardedFor) {
    // x-forwarded-for can contain multiple IPs, take the first one
    return forwardedFor.split(',')[0].trim();
  }

  const realIP = request.headers.get('x-real-ip');
  if (realIP) {
    return realIP;
  }

  const cfConnectingIP = request.headers.get('cf-connecting-ip');
  if (cfConnectingIP) {
    return cfConnectingIP;
  }

  // Fallback - this shouldn't happen in production
  return 'unknown';
}

/**
 * Rate limit presets for different use cases
 */
export const RATE_LIMITS = {
  // Strict: For sensitive operations like login, password reset
  strict: { limit: 5, windowInSeconds: 60 },
  
  // Standard: For general API endpoints
  standard: { limit: 30, windowInSeconds: 60 },
  
  // Relaxed: For read-heavy endpoints
  relaxed: { limit: 100, windowInSeconds: 60 },
  
  // Checkout: For payment-related endpoints
  checkout: { limit: 10, windowInSeconds: 60 },
} as const;
