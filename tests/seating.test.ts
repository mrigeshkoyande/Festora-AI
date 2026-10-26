import { describe, it } from "node:test";
import assert from "node:assert/strict";
import {
  validateTableCapacities,
  autoArrangeSeating,
  GuestItem,
  SeatingTable,
} from "../src/lib/utils/seating.ts";

describe("Seating Logistics & Capacity Verification", () => {
  it("detects over-capacity violations correctly", () => {
    const tables: SeatingTable[] = [
      { id: "t1", name: "Table 1", capacity: 8, shape: "round", assignedGuestIds: ["g1", "g2"] },
      { id: "t2", name: "Table 2", capacity: 4, shape: "round", assignedGuestIds: ["g3", "g4", "g5", "g6", "g7"] },
    ];

    const result = validateTableCapacities(tables);
    assert.equal(result.isValid, false);
    assert.equal(result.overfilledTables.length, 1);
    assert.equal(result.overfilledTables[0].tableId, "t2");
    assert.equal(result.overfilledTables[0].excess, 1);
  });

  it("passes validation when all tables are within capacity limits", () => {
    const tables: SeatingTable[] = [
      { id: "t1", name: "Table 1", capacity: 8, shape: "round", assignedGuestIds: ["g1", "g2"] },
      { id: "t2", name: "Table 2", capacity: 8, shape: "round", assignedGuestIds: ["g3", "g4"] },
    ];

    const result = validateTableCapacities(tables);
    assert.equal(result.isValid, true);
    assert.equal(result.overfilledTables.length, 0);
  });

  it("auto-arranges seating clustering VIPs at Table 1 and respecting capacity", () => {
    const guests: GuestItem[] = [
      { id: "g1", name: "Grandmother", isVIP: true, side: "Bride's Side", dietary: "Jain Pure Veg" },
      { id: "g2", name: "Grandfather", isVIP: true, side: "Bride's Side", dietary: "Jain Pure Veg" },
      { id: "g3", name: "Friend A", isVIP: false, side: "Groom's Side", dietary: "Non-Vegetarian" },
      { id: "g4", name: "Friend B", isVIP: false, side: "Groom's Side", dietary: "Non-Vegetarian" },
    ];

    const tables: SeatingTable[] = [
      { id: "t1", name: "Head Table (VIP)", capacity: 4, shape: "round", assignedGuestIds: [] },
      { id: "t2", name: "Friends Table", capacity: 4, shape: "round", assignedGuestIds: [] },
    ];

    const arranged = autoArrangeSeating(guests, tables);

    assert.equal(arranged.unassignedGuestsCount, 0);
    assert.equal(arranged.arrangedTables.length, 2);

    // No table exceeds capacity
    for (const table of arranged.arrangedTables) {
      assert.ok(table.assignedGuestIds.length <= table.capacity);
    }
  });
});
