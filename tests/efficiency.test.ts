import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { performance } from "node:perf_hooks";
import { POST } from "../src/app/api/ai/generate-plan/route";

describe("Generation-path efficiency smoke test", () => {
  it("measures the deterministic API path without requiring a network call", async () => {
    const payload = {
      eventType: "Wedding",
      title: "Efficiency Smoke Test",
      targetDate: "2027-01-20",
      city: "Jaipur",
      guestCount: 50,
      totalBudget: 1000000,
      currency: "INR",
      styleVibe: "Classic",
      specialNeeds: "None",
    };
    const started = performance.now();
    for (let index = 0; index < 5; index += 1) {
      const response = await POST(
        new Request("http://localhost/api/ai/generate-plan", {
          method: "POST",
          headers: { "content-type": "application/json", "x-forwarded-for": `efficiency-${index}` },
          body: JSON.stringify(payload),
        }),
      );
      assert.equal(response.status, 200);
    }
    const elapsedMs = performance.now() - started;
    console.log(`deterministic generation smoke: ${elapsedMs.toFixed(2)} ms for 5 requests`);
    assert.ok(elapsedMs < 5000, "deterministic generation path exceeded the smoke-test budget");
  });
});
