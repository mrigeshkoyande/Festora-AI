import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { reconcileBudgetAllocations } from "../src/lib/utils/budget";
import { formatCurrency, toPaise, toRupees } from "../src/lib/utils/currency";
import { calculateEventCountdown } from "../src/lib/utils/timeline";
import { PlanGenerationRequestSchema } from "../src/lib/utils/validation";
import { cn } from "../src/lib/utils";

describe("Boundary and numeric edge cases", () => {
  it("normalizes NaN and negative budgets without producing NaN allocations", () => {
    const categories = [{ name: "Venue", percentage: 100 }];
    for (const value of [Number.NaN, Number.NEGATIVE_INFINITY, -1]) {
      const result = reconcileBudgetAllocations(value, categories);
      assert.equal(result[0]?.allocated, 0);
      assert.equal(Number.isNaN(result[0]?.allocated ?? 0), false);
    }
  });

  it("keeps huge finite budgets mathematically reconciled", () => {
    const result = reconcileBudgetAllocations(Number.MAX_SAFE_INTEGER, [
      { name: "Venue", percentage: 60 },
      { name: "Food", percentage: 40 },
    ]);
    assert.equal(
      result.reduce((sum, category) => sum + category.allocated, 0),
      Number.MAX_SAFE_INTEGER,
    );
  });

  it("converts non-finite currency values to safe zero values", () => {
    assert.equal(toPaise(Number.NaN), 0);
    assert.equal(toPaise(Number.POSITIVE_INFINITY), 0);
    assert.equal(toRupees(Number.NaN), 0);
    assert.match(formatCurrency(Number.NaN), /0/);
  });

  it("handles invalid and past dates safely", () => {
    assert.equal(calculateEventCountdown("not-a-date").formatted, "Date TBD");
    assert.equal(calculateEventCountdown("2020-01-01", new Date("2021-01-01")).isPast, true);
  });

  it("rejects NaN, negative, and oversized request numbers at the schema boundary", () => {
    const base = {
      eventType: "Wedding",
      title: "A valid event",
      targetDate: "2026-11-20",
      city: "Jaipur",
      currency: "INR",
      styleVibe: "Heritage",
    };
    assert.equal(
      PlanGenerationRequestSchema.safeParse({ ...base, guestCount: Number.NaN, totalBudget: 1000 })
        .success,
      false,
    );
    assert.equal(
      PlanGenerationRequestSchema.safeParse({ ...base, guestCount: -1, totalBudget: 1000 }).success,
      false,
    );
    assert.equal(
      PlanGenerationRequestSchema.safeParse({
        ...base,
        guestCount: 1,
        totalBudget: Number.MAX_SAFE_INTEGER,
      }).success,
      false,
    );
  });

  it("merges conditional Tailwind classes deterministically", () => {
    assert.equal(cn("p-2", false, "p-4", "text-navy"), "p-4 text-navy");
  });
});
