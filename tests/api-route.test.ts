import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { POST } from "../src/app/api/ai/generate-plan/route";

const validPayload = {
  eventType: "Wedding",
  title: "API Route Test Celebration",
  targetDate: "2026-11-20",
  city: "Jaipur",
  guestCount: 120,
  totalBudget: 1_000_000,
  currency: "INR",
  styleVibe: "Heritage",
  specialNeeds: "",
};

describe("AI plan generation API boundary", () => {
  it("returns a validated deterministic plan for a valid request", async () => {
    const response = await POST(
      new Request("http://localhost/api/ai/generate-plan", {
        method: "POST",
        headers: { "content-type": "application/json", "x-forwarded-for": "api-test-valid" },
        body: JSON.stringify(validPayload),
      }),
    );
    const body = (await response.json()) as { success: boolean; plan?: { title: string } };

    assert.equal(response.status, 200);
    assert.equal(body.success, true);
    assert.equal(body.plan?.title, validPayload.title);
  });

  it("rejects malformed JSON and schema-invalid input without a stack trace", async () => {
    const malformed = await POST(
      new Request("http://localhost/api/ai/generate-plan", {
        method: "POST",
        headers: { "content-type": "application/json", "x-forwarded-for": "api-test-malformed" },
        body: "{",
      }),
    );
    assert.equal(malformed.status, 400);

    const invalid = await POST(
      new Request("http://localhost/api/ai/generate-plan", {
        method: "POST",
        headers: { "content-type": "application/json", "x-forwarded-for": "api-test-invalid" },
        body: JSON.stringify({ ...validPayload, guestCount: -1 }),
      }),
    );
    const invalidBody = (await invalid.json()) as { error?: string; stack?: string };
    assert.equal(invalid.status, 422);
    assert.equal(invalidBody.error, "Validation failed");
    assert.equal("stack" in invalidBody, false);
  });

  it("rejects oversized payloads before JSON parsing", async () => {
    const response = await POST(
      new Request("http://localhost/api/ai/generate-plan", {
        method: "POST",
        headers: {
          "content-type": "application/json",
          "content-length": "50001",
          "x-forwarded-for": "api-test-large",
        },
        body: JSON.stringify(validPayload),
      }),
    );
    assert.equal(response.status, 413);
  });
});
