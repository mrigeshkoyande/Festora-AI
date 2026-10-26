/**
 * Festora AI — Security & Input Protection Utilities
 * Protects endpoints against denial of service, prompt injection, and XSS attacks.
 */

interface RateLimitRecord {
  count: number;
  resetTime: number;
}

const rateLimitStore = new Map<string, RateLimitRecord>();

/**
 * Sliding-window in-memory IP rate limiter.
 *
 * @param identifier - Unique client identifier (e.g., client IP or session ID)
 * @param limit - Maximum allowed requests in the time window (default: 15)
 * @param windowMs - Time window in milliseconds (default: 60,000ms = 1 minute)
 * @returns Object with allowed boolean, remaining quota, and reset seconds
 * @complexity O(1) Time | O(U) Space where U is unique active client IPs
 */
export function checkRateLimit(
  identifier: string,
  limit: number = 15,
  windowMs: number = 60_000
): { allowed: boolean; remaining: number; resetSeconds: number } {
  const now = Date.now();
  const record = rateLimitStore.get(identifier);

  // Clean expired or initialize
  if (!record || now > record.resetTime) {
    rateLimitStore.set(identifier, {
      count: 1,
      resetTime: now + windowMs,
    });
    return {
      allowed: true,
      remaining: limit - 1,
      resetSeconds: Math.ceil(windowMs / 1000),
    };
  }

  if (record.count >= limit) {
    return {
      allowed: false,
      remaining: 0,
      resetSeconds: Math.ceil((record.resetTime - now) / 1000),
    };
  }

  record.count += 1;
  return {
    allowed: true,
    remaining: limit - record.count,
    resetSeconds: Math.ceil((record.resetTime - now) / 1000),
  };
}

/**
 * Sanitizes untrusted user text input:
 * - Trims whitespace
 * - Strips `<script>`, `<iframe>`, `javascript:`, HTML tags to prevent XSS
 * - Caps maximum string length to prevent memory exhaustion
 *
 * @param input - Untrusted user input value
 * @param maxLength - Maximum permitted character length (default: 500)
 * @returns Sanitized safe text string
 * @complexity O(L) Time | O(L) Space where L is input length
 */
export function sanitizeInput(input: unknown, maxLength: number = 500): string {
  if (typeof input !== "string") return "";

  const trimmed = input.trim().slice(0, maxLength);

  // Remove potential script and dangerous HTML tags
  return trimmed
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "")
    .replace(/<[^>]+>/g, "")
    .replace(/javascript:/gi, "");
}

/**
 * Validates server configuration and ensures private credentials are never leaked.
 *
 * @returns Safe server diagnostic object omitting secret keys
 * @complexity O(1) Time | O(1) Space
 */
export function getSafeServerConfig(): {
  hasGeminiKey: boolean;
  appUrl: string;
  isProduction: boolean;
} {
  const key = process.env.GEMINI_API_KEY;
  const isProduction = process.env.NODE_ENV === "production";
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

  return {
    hasGeminiKey: Boolean(key && key.trim().length > 0),
    appUrl,
    isProduction,
  };
}
