import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { reconcileBudgetAllocations, calculateBudgetScenarios } from "../src/lib/utils/budget";

describe("Budget Allocation & Invariant Reconciliation", () => {
  it("enforces exact 100% sum invariant on budget categories", () => {
    const rawCategories = [
      { name: "Venue & Staging", percentage: 33.33 },
      { name: "Catering & Banquet", percentage: 33.33 },
      { name: "Photography & Cinema", percentage: 33.33 },
    ];
    const totalBudget = 4500000;

    const reconciled = reconcileBudgetAllocations(totalBudget, rawCategories);

    const sumPercentage = reconciled.reduce((acc, cat) => acc + cat.percentage, 0);
    const sumAllocated = reconciled.reduce((acc, cat) => acc + cat.allocated, 0);

    // Sum of percentages must equal 100% exactly
    assert.equal(Math.round(sumPercentage * 100) / 100, 100);
    // Sum of allocated amounts must equal totalBudget exactly
    assert.equal(sumAllocated, totalBudget);
  });

  it("handles empty categories safely by returning empty array", () => {
    const reconciled = reconcileBudgetAllocations(1000000, []);
    assert.equal(reconciled.length, 0);
  });

  it("calculates 3 budget scenarios accurately with correct mathematical scaling", () => {
    const baseBudget = 5000000;
    const categories = [
      { name: "Venue & Staging", percentage: 40 },
      { name: "Catering & Hospitality", percentage: 35 },
      { name: "Decor & Production", percentage: 25 },
    ];
    const scenarios = calculateBudgetScenarios(baseBudget, categories);

    // Conservative: -15%
    assert.equal(scenarios.conservative.totalBudget, 4250000);
    assert.equal(scenarios.conservative.deltaPercentage, -15);

    // Balanced: 100%
    assert.equal(scenarios.balanced.totalBudget, 5000000);
    assert.equal(scenarios.balanced.deltaPercentage, 0);

    // VIP Luxury: +20%
    assert.equal(scenarios.luxury.totalBudget, 6000000);
    assert.equal(scenarios.luxury.deltaPercentage, 20);

    // Each scenario's categories must sum to 100%
    for (const scenarioKey of ["conservative", "balanced", "luxury"] as const) {
      const scenario = scenarios[scenarioKey];
      const sumPct = scenario.categories.reduce((acc, c) => acc + c.percentage, 0);
      assert.equal(Math.round(sumPct * 100) / 100, 100);
      const sumAllocated = scenario.categories.reduce((acc, c) => acc + c.allocated, 0);
      assert.equal(sumAllocated, scenario.totalBudget);
    }
  });

  it("handles zero, negative, and non-finite budgets without invalid allocations", () => {
    const categories = [{ name: "Venue", percentage: 100 }];
    for (const value of [0, -500, Number.NaN]) {
      const result = reconcileBudgetAllocations(value, categories);
      assert.equal(result[0]?.allocated, 0);
      assert.equal(result[0]?.percentage, 100);
    }
  });

  it("normalizes zero-percentage categories and reconciles item remainders", () => {
    const result = reconcileBudgetAllocations(101, [
      { name: "Venue", percentage: 0, items: [{ name: "Hire", estimated: 0, status: "Pending" }] },
      {
        name: "Food",
        percentage: 0,
        items: [{ name: "Catering", estimated: 0, status: "Pending" }],
      },
    ]);
    assert.equal(
      result.reduce((sum, category) => sum + category.allocated, 0),
      101,
    );
    assert.equal(
      result.reduce((sum, category) => sum + category.percentage, 0),
      100,
    );
    assert.equal(result[0]?.items[0]?.status, "Pending");
  });

  it("returns safe zero scenarios for non-finite budgets", () => {
    const scenarios = calculateBudgetScenarios(Number.NaN, []);
    assert.equal(scenarios.conservative.totalBudget, 0);
    assert.equal(scenarios.balanced.totalBudget, 0);
    assert.equal(scenarios.luxury.totalBudget, 0);
  });
});
