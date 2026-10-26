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
});
