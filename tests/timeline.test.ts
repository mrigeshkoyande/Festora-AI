import { describe, it } from "node:test";
import assert from "node:assert/strict";
import {
  calculateEventCountdown,
  shiftTaskSchedule,
  TaskItem,
} from "../src/lib/utils/timeline.ts";

describe("Timeline, Countdown & Dependency Propagation", () => {
  it("calculates positive countdown for future dates", () => {
    const futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + 30);
    const dateStr = futureDate.toISOString().split("T")[0];

    const countdown = calculateEventCountdown(dateStr);
    assert.equal(countdown.isPast, false);
    assert.ok(countdown.days >= 28 && countdown.days <= 31);
    assert.match(countdown.formatted, /\d+ days to go/);
  });

  it("handles past dates gracefully with isPast flag", () => {
    const pastDate = new Date();
    pastDate.setDate(pastDate.getDate() - 10);
    const dateStr = pastDate.toISOString().split("T")[0];

    const countdown = calculateEventCountdown(dateStr);
    assert.equal(countdown.isPast, true);
    assert.equal(countdown.days, 0);
  });

  it("shifts dependent task chain linearly without mutating independent tasks", () => {
    const tasks: TaskItem[] = [
      {
        id: "task-1",
        title: "Select Venue",
        priority: "high",
        dueDate: "2026-11-01T00:00:00.000Z",
        status: "todo",
        daysBeforeEvent: 45,
      },
      {
        id: "task-2",
        title: "Sign Contract",
        priority: "high",
        dueDate: "2026-11-05T00:00:00.000Z",
        status: "todo",
        daysBeforeEvent: 41,
        dependsOnTaskId: "task-1",
      },
      {
        id: "task-3",
        title: "Pay Venue Deposit",
        priority: "high",
        dueDate: "2026-11-10T00:00:00.000Z",
        status: "todo",
        daysBeforeEvent: 36,
        dependsOnTaskId: "task-2",
      },
      {
        id: "task-4",
        title: "Book DJ",
        priority: "medium",
        dueDate: "2026-11-05T00:00:00.000Z",
        status: "todo",
        daysBeforeEvent: 41,
      }, // independent
    ];

    // Delay task-1 by 3 days
    const shifted = shiftTaskSchedule(tasks, "task-1", 3);

    const task1 = shifted.find((t) => t.id === "task-1");
    const task2 = shifted.find((t) => t.id === "task-2");
    const task3 = shifted.find((t) => t.id === "task-3");
    const task4 = shifted.find((t) => t.id === "task-4");

    assert.equal(task1?.dueDate, "2026-11-04T00:00:00.000Z");
    assert.equal(task2?.dueDate, "2026-11-08T00:00:00.000Z");
    assert.equal(task3?.dueDate, "2026-11-13T00:00:00.000Z");
    // Independent task-4 should NOT be modified
    assert.equal(task4?.dueDate, "2026-11-05T00:00:00.000Z");
  });
});
