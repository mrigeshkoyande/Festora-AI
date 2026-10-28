import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { generateEventPlan, PlanGenerationInput } from "../src/lib/ai/provider";

describe("AI Dual-Engine Provider & Deterministic Fallback", () => {
  it("generates complete, schema-compliant event plan via deterministic fallback when offline", async () => {
    // Calling with deterministic engine execution
    const input: PlanGenerationInput = {
      eventType: "Wedding",
      title: "Aarav & Meera Royal Celebration",
      targetDate: "2026-11-20",
      city: "Udaipur",
      guestCount: 250,
      totalBudget: 5000000,
      currency: "INR",
      styleVibe: "Royal Heritage Courtyard",
      specialNeeds: "Marwari Royal with Pheras & Pure Jain counters",
    };

    const plan = await generateEventPlan(input);

    assert.ok(plan);
    assert.equal(plan.title, input.title);
    assert.ok(plan.summary.length > 10);
    assert.ok(plan.planHealth >= 80);

    // Verify budget allocations
    assert.ok(plan.budgetCategories.length > 0);
    const sumAllocated = plan.budgetCategories.reduce((acc, cat) => acc + cat.allocated, 0);
    const sumPercentage = plan.budgetCategories.reduce((acc, cat) => acc + cat.percentage, 0);

    // Invariant: sum of allocated equals total budget
    assert.equal(sumAllocated, input.totalBudget);
    // Invariant: sum of percentages equals 100%
    assert.equal(Math.round(sumPercentage * 100) / 100, 100);

    // Verify phases and tasks
    assert.ok(plan.phases.length >= 3);
    for (const phase of plan.phases) {
      assert.ok(phase.title);
      assert.ok(phase.tasks.length > 0);
    }

    // Verify recommended vendors
    assert.ok(plan.recommendedVendors.length >= 3);

    // Verify theme moodboard
    assert.ok(plan.themeMoodboard.paletteNames.length > 0);
    assert.ok(plan.themeMoodboard.decorConcept.length > 0);

    // Verify risk matrix
    assert.ok(plan.riskMatrix.length > 0);
  });

  it("falls back after a Gemini failure and uses the configured model endpoint", async () => {
    const previousKey = process.env.GEMINI_API_KEY;
    const previousModel = process.env.GEMINI_MODEL;
    const previousFetch = globalThis.fetch;
    let requestedUrl = "";
    process.env.GEMINI_API_KEY = "test-key";
    process.env.GEMINI_MODEL = "gemini-test-model";
    globalThis.fetch = async (request) => {
      requestedUrl = String(request);
      throw new Error("simulated upstream failure");
    };

    try {
      const plan = await generateEventPlan({
        eventType: "Wedding",
        title: "Fallback Test",
        targetDate: "2026-12-20",
        city: "Jaipur",
        guestCount: 20,
        totalBudget: 100000,
        currency: "INR",
        styleVibe: "Classic",
        specialNeeds: "None",
      });
      assert.match(requestedUrl, /models\/gemini-test-model:generateContent/);
      assert.equal(plan.title, "Fallback Test");
      assert.ok(plan.budgetCategories.length > 0);
    } finally {
      globalThis.fetch = previousFetch;
      if (previousKey === undefined) delete process.env.GEMINI_API_KEY;
      else process.env.GEMINI_API_KEY = previousKey;
      if (previousModel === undefined) delete process.env.GEMINI_MODEL;
      else process.env.GEMINI_MODEL = previousModel;
    }
  });
});
