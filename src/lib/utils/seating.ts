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
 * Validates that no table exceeds its physical seating capacity.
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
 * Automatically groups unassigned guests into tables prioritizing:
 * 1. Family side harmony (Bride / Groom / VIP)
 * 2. Strict dietary alignment (e.g. Pure Jain banquet clusters)
 * 3. Strict capacity limits per table
 */
export function autoArrangeSeating(
  guests: GuestItem[],
  tables: SeatingTable[]
): {
  arrangedTables: SeatingTable[];
  unassignedGuestsCount: number;
} {
  // Deep clone tables
  const tableCopies: SeatingTable[] = tables.map((t) => ({
    ...t,
    assignedGuestIds: [...t.assignedGuestIds],
  }));

  // Find all guests already assigned
  const alreadyAssigned = new Set<string>();
  tableCopies.forEach((t) => t.assignedGuestIds.forEach((id) => alreadyAssigned.add(id)));

  const unassigned = guests.filter((g) => !alreadyAssigned.has(g.id));

  // Sort unassigned guests: VIPs first, then grouped by side and dietary
  unassigned.sort((a, b) => {
    if (a.isVIP && !b.isVIP) return -1;
    if (!a.isVIP && b.isVIP) return 1;
    if (a.side !== b.side) return a.side.localeCompare(b.side);
    return a.dietary.localeCompare(b.dietary);
  });

  // Assign guests to matching tables that have available capacity
  for (const guest of unassigned) {
    // 1. Try to find table with matching family side and dietary profile with space
    let targetTable = tableCopies.find((t) => {
      if (t.assignedGuestIds.length >= t.capacity) return false;
      const currentGuests = t.assignedGuestIds.map((id) => guests.find((g) => g.id === id)).filter(Boolean);
      return currentGuests.some((cg) => cg?.side === guest.side || cg?.dietary === guest.dietary);
    });

    // 2. If no matched table found, find any table with remaining capacity
    if (!targetTable) {
      targetTable = tableCopies.find((t) => t.assignedGuestIds.length < t.capacity);
    }

    if (targetTable) {
      targetTable.assignedGuestIds.push(guest.id);
      alreadyAssigned.add(guest.id);
    }
  }

  const remainingUnassigned = guests.length - alreadyAssigned.size;

  return {
    arrangedTables: tableCopies,
    unassignedGuestsCount: remainingUnassigned,
  };
}
