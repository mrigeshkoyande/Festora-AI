/**
 * Festora AI — Spatial Seating & Guest Logistics Engine
 */

export interface GuestItem {
  id: string;
  name: string;
  side: "Bride's Side" | "Groom's Side" | "Mutual" | "VIP" | "Corporate";
  dietary: "Jain Pure Veg" | "Rajasthani Vegetarian" | "Non-Vegetarian" | "Vegan" | "Continental";
  tableId?: string;
  isVIP?: boolean;
}

export interface SeatingTable {
  id: string;
  name: string;
  shape: "round" | "rectangular";
  capacity: number;
  assignedGuestIds: string[];
}

/**
 * Validates that no banquet table exceeds its physical seating capacity.
 *
 * @param tables - Array of current tables with assigned guest IDs
 * @returns Object indicating overall validity and array of overfilled table violations
 * @complexity O(T) Time | O(T) Space where T is number of tables
 */
export function validateTableCapacities(tables: SeatingTable[]): {
  isValid: boolean;
  overfilledTables: { tableId: string; name: string; excess: number }[];
} {
  const overfilledTables: { tableId: string; name: string; excess: number }[] = [];

  for (const table of tables) {
    if (table.assignedGuestIds.length > table.capacity) {
      overfilledTables.push({
        tableId: table.id,
        name: table.name,
        excess: table.assignedGuestIds.length - table.capacity,
      });
    }
  }

  return {
    isValid: overfilledTables.length === 0,
    overfilledTables,
  };
}

/**
 * Deterministic AI Auto-Arranger:
 * Automatically groups unassigned celebration guests into tables prioritizing:
 * 1. Family side harmony (Bride / Groom / VIP / Corporate)
 * 2. Strict dietary alignment (e.g. Pure Jain banquet clusters together)
 * 3. Strict capacity limits per table
 *
 * @param guests - Array of invited guests with cultural and dietary profiles
 * @param tables - Array of available banquet tables
 * @returns Object with updated table assignments and count of remaining unassigned guests
 * @complexity O(G * T) Time | O(G + T) Space where G is guests count and T is tables count
 */
export function autoArrangeSeating(
  guests: GuestItem[],
  tables: SeatingTable[],
): {
  arrangedTables: SeatingTable[];
  unassignedGuestsCount: number;
} {
  const tableClones: SeatingTable[] = tables.map((t) => ({
    ...t,
    assignedGuestIds: [...t.assignedGuestIds],
  }));

  const unassigned = guests.filter((g) => !g.tableId);

  // Sort guests: VIPs first, then grouped by family side, then dietary
  const sortedGuests = [...unassigned].sort((a, b) => {
    if (a.isVIP && !b.isVIP) return -1;
    if (!a.isVIP && b.isVIP) return 1;
    if (a.side !== b.side) return a.side.localeCompare(b.side);
    return a.dietary.localeCompare(b.dietary);
  });

  const guestMap = new Map(guests.map((g) => [g.id, g]));

  for (const guest of sortedGuests) {
    // 1. Find best table with capacity
    let bestTable: SeatingTable | null = null;
    let bestScore = -1;

    for (const table of tableClones) {
      const remainingCapacity = table.capacity - table.assignedGuestIds.length;
      if (remainingCapacity <= 0) continue;

      let score = 0;

      // VIP affinity: Table 1 / Head table preference for VIPs
      if (guest.isVIP && (table.name.toLowerCase().includes("vip") || table.name.includes("1"))) {
        score += 50;
      }

      // Check current occupants for alignment
      for (const assignedId of table.assignedGuestIds) {
        const occupant = guestMap.get(assignedId);
        if (!occupant) continue;

        if (occupant.side === guest.side) score += 10;
        if (occupant.dietary === guest.dietary) score += 15;
      }

      if (score > bestScore) {
        bestScore = score;
        bestTable = table;
      }
    }

    if (bestTable) {
      bestTable.assignedGuestIds.push(guest.id);
    }
  }

  const assignedCount = tableClones.reduce((sum, t) => sum + t.assignedGuestIds.length, 0);
  const unassignedGuestsCount = Math.max(0, guests.length - assignedCount);

  return {
    arrangedTables: tableClones,
    unassignedGuestsCount,
  };
}
