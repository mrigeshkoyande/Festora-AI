import { describe, it } from "node:test";
import assert from "node:assert/strict";
import {
  checkRateLimit,
  sanitizeInput,
  getSafeServerConfig,
} from "../src/lib/utils/security";

describe("Security Controls & Input Protection", () => {
  it("allows requests under the rate limit threshold", () => {
    const ip = "192.168.1.10";
    const result1 = checkRateLimit(ip, 5, 10000);
    assert.equal(result1.allowed, true);
    assert.equal(result1.remaining, 4);
  });

  it("blocks requests that exceed rate limit threshold", () => {
    const ip = "192.168.1.20";
    // Send 3 requests with limit of 2
    checkRateLimit(ip, 2, 10000);
    checkRateLimit(ip, 2, 10000);
    const result3 = checkRateLimit(ip, 2, 10000);

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
    assert.equal((config as any).geminiKey, undefined);
    assert.equal((config as any).apiKey, undefined);
  });
});
