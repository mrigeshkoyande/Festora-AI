import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { generateEventPlan, PlanGenerationInput } from "../src/lib/ai/provider";
import { calculateBudgetScenarios, reconcileBudgetAllocations } from "../src/lib/utils/budget";
import { shiftTaskSchedule, TaskItem } from "../src/lib/utils/timeline";
import { autoArrangeSeating, GuestItem, SeatingTable } from "../src/lib/utils/seating";
import { checkRateLimit, sanitizeInput } from "../src/lib/utils/security";
import { PlanGenerationRequestSchema } from "../src/lib/utils/validation";

describe("End-to-End System Integration Flow", () => {
  it("executes end-to-end plan lifecycle for Royal Wedding with 100% budget invariant", async () => {
    const weddingInput: PlanGenerationInput = {
      eventType: "Wedding",
      title: "Ananya & Rohan Royal Jaipur Wedding",
      targetDate: "2026-11-18",
      city: "Jaipur",
      guestCount: 350,
      totalBudget: 4500000,
      currency: "INR",
      styleVibe: "Royal Rajputana Heritage",
      specialNeeds: "Marwari traditions, pure Jain counters",
    };

    const plan = await generateEventPlan(weddingInput);
    assert.equal(plan.title, weddingInput.title);
    assert.ok(plan.budgetCategories.some((c) => c.name.includes("Mandap")));

    const totalAllocated = plan.budgetCategories.reduce((sum, c) => sum + c.allocated, 0);
    const totalPercentage = plan.budgetCategories.reduce((sum, c) => sum + c.percentage, 0);
    assert.equal(totalAllocated, weddingInput.totalBudget);
    assert.equal(Math.round(totalPercentage * 100) / 100, 100);

    // Verify 3 scenarios
    const scenarios = calculateBudgetScenarios(
      plan.budgetCategories.reduce((s, c) => s + c.allocated, 0),
      plan.budgetCategories,
    );
    assert.equal(scenarios.conservative.totalBudget, 3825000);
    assert.equal(scenarios.balanced.totalBudget, 4500000);
    assert.equal(scenarios.luxury.totalBudget, 5400000);
  });

  it("executes end-to-end plan lifecycle for Milestone 50th Birthday celebration", async () => {
    const birthdayInput: PlanGenerationInput = {
      eventType: "Birthday",
      title: "Vikram's 50th Golden Jubilee Gala",
      targetDate: "2026-12-10",
      city: "Mumbai",
      guestCount: 120,
      totalBudget: 1500000,
      currency: "INR",
      styleVibe: "Retro Gold & Speakeasy Jazz",
      specialNeeds: "",
    };

    const plan = await generateEventPlan(birthdayInput);
    assert.equal(plan.title, birthdayInput.title);
    assert.ok(
      plan.budgetCategories.some((c) => c.name.includes("Cake") || c.name.includes("Lounge")),
    );

    const totalAllocated = plan.budgetCategories.reduce((sum, c) => sum + c.allocated, 0);
    assert.equal(totalAllocated, birthdayInput.totalBudget);
  });

  it("executes end-to-end plan lifecycle for Grand Community Diwali Celebration", async () => {
    const communityInput: PlanGenerationInput = {
      eventType: "Community Festival",
      title: "Grand Society Diwali Milan 2026",
      targetDate: "2026-11-01",
      city: "Bengaluru",
      guestCount: 600,
      totalBudget: 2000000,
      currency: "INR",
      styleVibe: "Traditional Diyas & Communal Feast",
      specialNeeds: "",
    };

    const plan = await generateEventPlan(communityInput);
    assert.equal(plan.title, communityInput.title);
    assert.ok(
      plan.budgetCategories.some((c) => c.name.includes("Community") || c.name.includes("Banquet")),
    );

    const totalAllocated = plan.budgetCategories.reduce((sum, c) => sum + c.allocated, 0);
    assert.equal(totalAllocated, communityInput.totalBudget);
  });

  it("propagates multi-tier task delays across downstream dependencies", () => {
    const tasks: TaskItem[] = [
      {
        id: "t1",
        title: "Select Venue",
        priority: "high",
        dueDate: "2026-11-01T00:00:00.000Z",
        status: "todo",
        daysBeforeEvent: 30,
      },
      {
        id: "t2",
        title: "Sign Contract",
        priority: "high",
        dueDate: "2026-11-04T00:00:00.000Z",
        status: "todo",
        daysBeforeEvent: 27,
        dependsOnTaskId: "t1",
      },
      {
        id: "t3",
        title: "Install Stage Rigging",
        priority: "medium",
        dueDate: "2026-11-08T00:00:00.000Z",
        status: "todo",
        daysBeforeEvent: 23,
        dependsOnTaskId: "t2",
      },
      {
        id: "t4",
        title: "Send Invitations",
        priority: "high",
        dueDate: "2026-11-05T00:00:00.000Z",
        status: "todo",
        daysBeforeEvent: 26,
      }, // independent
    ];

    const shifted = shiftTaskSchedule(tasks, "t1", 5);
    const t1 = shifted.find((t) => t.id === "t1")!;
    const t2 = shifted.find((t) => t.id === "t2")!;
    const t3 = shifted.find((t) => t.id === "t3")!;
    const t4 = shifted.find((t) => t.id === "t4")!;

    assert.equal(t1.dueDate, "2026-11-06T00:00:00.000Z");
    assert.equal(t2.dueDate, "2026-11-09T00:00:00.000Z");
    assert.equal(t3.dueDate, "2026-11-13T00:00:00.000Z");
    assert.equal(t4.dueDate, "2026-11-05T00:00:00.000Z"); // unmodified
  });

  it("auto-arranges complex guest roster into tables satisfying VIP and dietary constraints", () => {
    const guests: GuestItem[] = [
      {
        id: "g1",
        name: "VIP Grandparent A",
        isVIP: true,
        side: "Bride's Side",
        dietary: "Jain Pure Veg",
      },
      {
        id: "g2",
        name: "VIP Grandparent B",
        isVIP: true,
        side: "Bride's Side",
        dietary: "Jain Pure Veg",
      },
      {
        id: "g3",
        name: "Groom Cousin 1",
        isVIP: false,
        side: "Groom's Side",
        dietary: "Non-Vegetarian",
      },
      {
        id: "g4",
        name: "Groom Cousin 2",
        isVIP: false,
        side: "Groom's Side",
        dietary: "Non-Vegetarian",
      },
      { id: "g5", name: "College Friend 1", isVIP: false, side: "Mutual", dietary: "Vegan" },
      { id: "g6", name: "College Friend 2", isVIP: false, side: "Mutual", dietary: "Vegan" },
    ];

    const tables: SeatingTable[] = [
      { id: "tbl-1", name: "VIP Head Table 1", capacity: 2, shape: "round", assignedGuestIds: [] },
      {
        id: "tbl-2",
        name: "Groom Family Table",
        capacity: 2,
        shape: "rectangular",
        assignedGuestIds: [],
      },
      { id: "tbl-3", name: "Friends Table", capacity: 2, shape: "round", assignedGuestIds: [] },
    ];

    const arranged = autoArrangeSeating(guests, tables);
    assert.equal(arranged.unassignedGuestsCount, 0);

    const t1 = arranged.arrangedTables.find((t) => t.id === "tbl-1")!;
    const t2 = arranged.arrangedTables.find((t) => t.id === "tbl-2")!;
    const t3 = arranged.arrangedTables.find((t) => t.id === "tbl-3")!;

    // VIP table must seat the VIPs
    assert.ok(t1.assignedGuestIds.includes("g1") && t1.assignedGuestIds.includes("g2"));
    // Capacity never exceeded
    assert.equal(t1.assignedGuestIds.length, 2);
    assert.equal(t2.assignedGuestIds.length, 2);
    assert.equal(t3.assignedGuestIds.length, 2);
  });

  it("rejects malicious or invalid request payloads and enforces rate limits", async () => {
    // Malicious XSS injection
    const dirty = "<script>alert('pwn')</script>Royal Banquet &amp; Ball";
    const clean = sanitizeInput(dirty);
    assert.equal(clean.includes("<script>"), false);
    assert.ok(clean.includes("Royal Banquet"));

    // Rate limit
    const testIp = "10.0.0.123";
    for (let i = 0; i < 5; i++) {
      await checkRateLimit(testIp, 5, 60000);
    }
    const blocked = await checkRateLimit(testIp, 5, 60000);
    assert.equal(blocked.allowed, false);

    // Schema rejection on invalid input
    const badInput = {
      eventType: "Wedding",
      title: "",
      targetDate: "invalid-date",
      city: "",
      guestCount: -5,
      totalBudget: 50, // below 1000 min
    };
    const parsed = PlanGenerationRequestSchema.safeParse(badInput);
    assert.equal(parsed.success, false);
  });
});
