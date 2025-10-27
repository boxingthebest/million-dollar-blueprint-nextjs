/**
 * Simple in-memory rate limiting for development and production
 * This is a fallback when Upstash Redis is not configured
 * 
 * Note: This uses in-memory storage, so rate limits reset on server restart
 * For production with multiple servers, consider using Upstash Redis
 */

interface RateLimitEntry {
  count: number;
  resetTime: number;
}

const rateLimitStore = new Map<string, RateLimitEntry>();

// Clean up old entries every 5 minutes
setInterval(() => {
  const now = Date.now();
  for (const [key, entry] of rateLimitStore.entries()) {
    if (entry.resetTime < now) {
      rateLimitStore.delete(key);
    }
  }
}, 5 * 60 * 1000);

export interface RateLimitResult {
  success: boolean;
  limit: number;
  remaining: number;
  reset: number;
}

/**
 * Simple rate limiter using in-memory storage
 * @param identifier - Unique identifier (e.g., IP address)
 * @param maxRequests - Maximum number of requests allowed
 * @param windowMs - Time window in milliseconds
 */
export function ratelimit(
  identifier: string,
  maxRequests: number,
  windowMs: number
): RateLimitResult {
  const now = Date.now();
  const entry = rateLimitStore.get(identifier);

  // If no entry or entry expired, create new one
  if (!entry || entry.resetTime < now) {
    const resetTime = now + windowMs;
    rateLimitStore.set(identifier, { count: 1, resetTime });
    return {
      success: true,
      limit: maxRequests,
      remaining: maxRequests - 1,
      reset: resetTime,
    };
  }

  // Check if limit exceeded
  if (entry.count >= maxRequests) {
    return {
      success: false,
      limit: maxRequests,
      remaining: 0,
      reset: entry.resetTime,
    };
  }

  // Increment count
  entry.count++;
  rateLimitStore.set(identifier, entry);

  return {
    success: true,
    limit: maxRequests,
    remaining: maxRequests - entry.count,
    reset: entry.resetTime,
  };
}

/**
 * Rate limiter for signup: 5 requests per minute
 */
export function signupRatelimit(identifier: string): RateLimitResult {
  return ratelimit(identifier, 5, 60 * 1000); // 5 requests per 60 seconds
}

/**
 * Rate limiter for general auth: 10 requests per 10 seconds
 */
export function authRatelimit(identifier: string): RateLimitResult {
  return ratelimit(identifier, 10, 10 * 1000); // 10 requests per 10 seconds
}

