import { describe, it } from "node:test";
import assert from "node:assert/strict";
import {
  PlanGenerationRequestSchema,
  TaskUpdateSchema,
  GuestRosterSchema,
  BudgetAdjustmentSchema,
} from "../src/lib/utils/validation.ts";

describe("Runtime Data Validation Schemas (Zod)", () => {
  it("validates well-formed event plan generation request", () => {
    const validData = {
      eventType: "wedding",
      title: "Rohan & Ananya Royal Wedding",
      targetDate: "2026-12-15",
      city: "Jaipur",
      guestCount: 350,
      totalBudget: 4500000,
      styleVibe: "Royal Rajputana Palace",
      specialNeeds: "Marwari Royal, Pure Jain counters",
    };

    const parsed = PlanGenerationRequestSchema.safeParse(validData);
    assert.equal(parsed.success, true);
  });

  it("rejects invalid plan generation request with negative budget or non-positive guest count", () => {
    const invalidData = {
      eventType: "wedding",
      title: "Negative Budget Party",
      targetDate: "2026-12-15",
      city: "Mumbai",
      guestCount: 0,
      totalBudget: -50000,
    };

    const parsed = PlanGenerationRequestSchema.safeParse(invalidData);
    assert.equal(parsed.success, false);
    if (!parsed.success) {
      const errorMap = parsed.error.flatten().fieldErrors;
      assert.ok(errorMap.guestCount !== undefined);
      assert.ok(errorMap.totalBudget !== undefined);
    }
  });

  it("validates task update with allowed status", () => {
    const valid = TaskUpdateSchema.safeParse({
      taskId: "task-101",
      status: "completed",
    });
    assert.equal(valid.success, true);

    const invalid = TaskUpdateSchema.safeParse({
      taskId: "task-101",
      status: "invalid_status",
    });
    assert.equal(invalid.success, false);
  });

  it("validates guest roster items with strict RSVP and dietary values", () => {
    const validGuest = {
      name: "Amit Sharma",
      side: "Bride's Side",
      dietary: "Jain Pure Veg",
      email: "amit.sharma@example.com",
      rsvpStatus: "confirmed",
    };

    const parsed = GuestRosterSchema.safeParse(validGuest);
    assert.equal(parsed.success, true);

    const invalidGuest = {
      name: "",
      side: "Unknown",
      dietary: "FastFood",
      email: "not-an-email",
      rsvpStatus: "maybe_not_valid",
    };

    const parsedInvalid = GuestRosterSchema.safeParse(invalidGuest);
    assert.equal(parsedInvalid.success, false);
  });

  it("validates budget category adjustment within limits", () => {
    const validAdj = {
      categoryName: "Catering & Banquet",
      percentage: 26.6,
    };

    assert.equal(BudgetAdjustmentSchema.safeParse(validAdj).success, true);

    const invalidAdj = {
      categoryName: "Catering & Banquet",
      percentage: 150, // exceeds 100%
    };

    assert.equal(BudgetAdjustmentSchema.safeParse(invalidAdj).success, false);
  });
});
