/**
 * Festora AI — Security and input-protection utilities.
 *
 * The default store is process-local for zero-configuration development. Configure
 * UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN in production when requests
 * can reach multiple serverless instances or containers; process-local memory does
 * not coordinate limits across those instances.
 */

import { getServerEnv } from "@/lib/env";

export interface RateLimitRecord {
  count: number;
  resetTime: number;
}

/** Pluggable storage contract for rate-limit state. */
export interface RateLimitStore {
  get(key: string): Promise<RateLimitRecord | undefined> | RateLimitRecord | undefined;
  set(key: string, value: RateLimitRecord, ttlMs: number): Promise<void> | void;
  delete?(key: string): Promise<void> | void;
}

/** Process-local fallback for local development and single-instance deployments. */
export class InMemoryRateLimitStore implements RateLimitStore {
  private readonly records = new Map<string, RateLimitRecord>();

  get(key: string): RateLimitRecord | undefined {
    return this.records.get(key);
  }

  set(key: string, value: RateLimitRecord): void {
    this.records.set(key, value);
  }

  delete(key: string): void {
    this.records.delete(key);
  }
}

/** Optional Upstash-compatible REST adapter selected by environment variables. */
export class UpstashRateLimitStore implements RateLimitStore {
  constructor(
    private readonly url: string,
    private readonly token: string,
  ) {}

  private async command<T>(command: string[]): Promise<T | undefined> {
    const response = await fetch(this.url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${this.token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(command),
    });

    if (!response.ok) return undefined;
    const body = (await response.json()) as { result?: T };
    return body.result;
  }

  async get(key: string): Promise<RateLimitRecord | undefined> {
    const serialized = await this.command<string>(["GET", key]);
    if (!serialized) return undefined;
    try {
      return JSON.parse(serialized) as RateLimitRecord;
    } catch {
      return undefined;
    }
  }

  async set(key: string, value: RateLimitRecord, ttlMs: number): Promise<void> {
    await this.command([
      "SETEX",
      key,
      String(Math.max(1, Math.ceil(ttlMs / 1000))),
      JSON.stringify(value),
    ]);
  }

  async delete(key: string): Promise<void> {
    await this.command(["DEL", key]);
  }
}

/** Select shared Upstash storage when configured, otherwise use memory. */
export function createConfiguredRateLimitStore(): RateLimitStore {
  const env = getServerEnv();
  if (env.UPSTASH_REDIS_REST_URL && env.UPSTASH_REDIS_REST_TOKEN) {
    return new UpstashRateLimitStore(env.UPSTASH_REDIS_REST_URL, env.UPSTASH_REDIS_REST_TOKEN);
  }
  return new InMemoryRateLimitStore();
}

let rateLimitStore: RateLimitStore = createConfiguredRateLimitStore();

/** Replace the default store with a shared adapter at application startup or in tests. */
export function configureRateLimitStore(store: RateLimitStore): void {
  rateLimitStore = store;
}

/** Restore process-local storage for isolated tests and local development. */
export function resetRateLimitStore(): void {
  rateLimitStore = new InMemoryRateLimitStore();
}

/** Check one fixed-window rate-limit request. */
export async function checkRateLimit(
  identifier: string,
  limit = 15,
  windowMs = 60_000,
): Promise<{ allowed: boolean; remaining: number; resetSeconds: number }> {
  const now = Date.now();
  const record = await rateLimitStore.get(identifier);

  if (!record || now >= record.resetTime) {
    await rateLimitStore.set(identifier, { count: 1, resetTime: now + windowMs }, windowMs);
    return {
      allowed: true,
      remaining: Math.max(0, limit - 1),
      resetSeconds: Math.ceil(windowMs / 1000),
    };
  }

  if (record.count >= limit) {
    return {
      allowed: false,
      remaining: 0,
      resetSeconds: Math.max(1, Math.ceil((record.resetTime - now) / 1000)),
    };
  }

  const next = { ...record, count: record.count + 1 };
  await rateLimitStore.set(identifier, next, record.resetTime - now);
  return {
    allowed: true,
    remaining: Math.max(0, limit - next.count),
    resetSeconds: Math.max(1, Math.ceil((record.resetTime - now) / 1000)),
  };
}

/** Sanitize untrusted text by trimming, removing markup/protocol payloads, and bounding length. */
export function sanitizeInput(input: unknown, maxLength = 500): string {
  if (typeof input !== "string") return "";
  return input
    .trim()
    .slice(0, maxLength)
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "")
    .replace(/<[^>]+>/g, "")
    .replace(/javascript:/gi, "");
}

/** Return only non-secret server diagnostics. */
export function getSafeServerConfig(): {
  hasGeminiKey: boolean;
  appUrl: string;
  isProduction: boolean;
  usesSharedRateLimitStore: boolean;
} {
  const env = getServerEnv();
  return {
    hasGeminiKey: Boolean(env.GEMINI_API_KEY),
    appUrl: env.NEXT_PUBLIC_APP_URL,
    isProduction: env.NODE_ENV === "production",
    usesSharedRateLimitStore: Boolean(env.UPSTASH_REDIS_REST_URL && env.UPSTASH_REDIS_REST_TOKEN),
  };
}
