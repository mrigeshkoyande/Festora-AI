/**
 * Festora AI — Security & Input Protection Utilities
 */

interface RateLimitRecord {
  count: number;
  resetTime: number;
}

// In-memory sliding window cache for rate limiting
const rateLimitStore = new Map<string, RateLimitRecord>();

/**
 * Checks if a given request key (e.g. client IP or identifier) is within rate limits.
 * Default: 15 requests per 60 seconds for expensive generative endpoints.
 */
export function checkRateLimit(
  key: string,
  limit: number = 15,
  windowSeconds: number = 60
): {
  allowed: boolean;
  remaining: number;
  resetSeconds: number;
} {
  const now = Date.now();
  const windowMs = windowSeconds * 1000;
  const record = rateLimitStore.get(key);

  if (!record || now > record.resetTime) {
    rateLimitStore.set(key, {
      count: 1,
      resetTime: now + windowMs,
    });
    return {
      allowed: true,
      remaining: limit - 1,
      resetSeconds: windowSeconds,
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
 * Sanitizes user text input:
 * - Trims whitespace
 * - Strips `<script>`, `<iframe>`, `javascript:`, HTML tags to prevent XSS
 * - Caps maximum string length
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
