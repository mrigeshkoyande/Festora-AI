import { describe, it } from "node:test";
import assert from "node:assert/strict";
import {
  checkRateLimit,
  configureRateLimitStore,
  getSafeServerConfig,
  resetRateLimitStore,
  sanitizeInput,
  UpstashRateLimitStore,
  type RateLimitStore,
} from "../src/lib/utils/security";

describe("Security Controls & Input Protection", () => {
  it("supports the optional Upstash REST adapter", async () => {
    const originalFetch = globalThis.fetch;
    const responses = [
      new Response(
        JSON.stringify({ result: JSON.stringify({ count: 2, resetTime: Date.now() + 1000 }) }),
      ),
      new Response(JSON.stringify({ result: "OK" })),
      new Response(JSON.stringify({ result: 1 })),
    ];
    globalThis.fetch = async () => responses.shift() ?? new Response(null, { status: 500 });
    const store = new UpstashRateLimitStore("https://example.upstash.io", "test-token");
    assert.equal((await store.get("key"))?.count, 2);
    await store.set("key", { count: 3, resetTime: Date.now() + 1000 }, 1000);
    await store.delete("key");
    globalThis.fetch = originalFetch;
  });

  it("supports a pluggable shared-store contract", async () => {
    const records = new Map<string, { count: number; resetTime: number }>();
    const store: RateLimitStore = {
      get: (key) => records.get(key),
      set: (key, value) => {
        records.set(key, value);
      },
    };
    configureRateLimitStore(store);
    assert.equal((await checkRateLimit("pluggable", 1, 1000)).allowed, true);
    assert.equal((await checkRateLimit("pluggable", 1, 1000)).allowed, false);
    resetRateLimitStore();
  });

  it("allows requests under the rate limit threshold", async () => {
    const ip = "192.168.1.10";
    const result1 = await checkRateLimit(ip, 5, 10000);
    assert.equal(result1.allowed, true);
    assert.equal(result1.remaining, 4);
  });

  it("blocks requests that exceed rate limit threshold", async () => {
    const ip = "192.168.1.20";
    // Send 3 requests with limit of 2
    await checkRateLimit(ip, 2, 10000);
    await checkRateLimit(ip, 2, 10000);
    const result3 = await checkRateLimit(ip, 2, 10000);

    assert.equal(result3.allowed, false);
    assert.equal(result3.remaining, 0);
  });

  it("sanitizes HTML tags and script injections from user input", () => {
    const dangerous = `<script>alert('pwned')</script>Hello <b>World</b>!`;
    const clean = sanitizeInput(dangerous);
    assert.equal(clean.includes("<script>"), false);
    assert.equal(clean.includes("<b>"), false);
    assert.ok(clean.includes("Hello"));
    assert.ok(clean.includes("World"));
  });

  it("sanitizes javascript: protocol payloads from user input", () => {
    const malicious = `javascript:stealCredentials()`;
    const clean = sanitizeInput(malicious);
    assert.equal(clean.includes("javascript:"), false);
  });

  it("safely indicates presence of server credentials without exposing key values", () => {
    const config = getSafeServerConfig();
    assert.equal(typeof config.hasGeminiKey, "boolean");
    assert.equal(typeof config.isProduction, "boolean");
    assert.equal(typeof config.appUrl, "string");
    // Ensure no secret keys exist on the config object
    assert.equal("geminiKey" in config, false);
    assert.equal("apiKey" in config, false);
  });
});
