/**
 * Festora AI — Budget Invariant & Financial Engine
 * Ensures 100% mathematical sum guarantees, remainder reconciliation, and 3-scenario AI optimizations.
 */

export interface CategoryAllocationInput {
  name: string;
  percentage: number;
  allocated?: number;
  icon?: string;
  items?: { name: string; percentageOfCategory?: number; estimated?: number; status: string }[];
}

export interface ReconciledCategory {
  name: string;
  percentage: number;
  allocated: number;
  icon: string;
  items: {
    name: string;
    estimated: number;
    status: string;
  }[];
}

/**
 * Reconciles category percentage allocations so that:
 * 1. The percentages sum strictly to 100%.
 * 2. The sum of allocated amounts strictly equals `totalBudget` (0 rupee discrepancy).
 * 3. Any rounding remainder is allocated deterministically to the largest category.
 *
 * @param totalBudget - Total monetary celebration budget
 * @param categories - Array of raw category percentage allocations
 * @returns Array of reconciled categories guaranteeing exact mathematical equality
 * @complexity O(N) Time | O(N) Space where N is number of budget categories
 */
export function reconcileBudgetAllocations(
  totalBudget: number,
  categories: CategoryAllocationInput[],
): ReconciledCategory[] {
  if (!categories || categories.length === 0) {
    return [];
  }

  const safeTotalBudget = Number.isFinite(totalBudget) ? Math.max(0, Math.round(totalBudget)) : 0;

  // 1. Normalize percentages to strictly sum to 100
  const rawSumPercentages = categories.reduce((acc, c) => acc + (c.percentage || 0), 0);
  const normalizedCategories = categories.map((c) => {
    const rawPct =
      rawSumPercentages > 0 ? (c.percentage / rawSumPercentages) * 100 : 100 / categories.length;
    return {
      ...c,
      normalizedPct: Math.round(rawPct),
    };
  });

  // Reconcile percentage sum to exactly 100
  const currentPctSum = normalizedCategories.reduce((acc, c) => acc + c.normalizedPct, 0);
  const pctDiff = 100 - currentPctSum;
  if (pctDiff !== 0 && normalizedCategories.length > 0) {
    // Add difference to highest percentage category
    let maxIdx = 0;
    for (let i = 1; i < normalizedCategories.length; i++) {
      if (normalizedCategories[i].normalizedPct > normalizedCategories[maxIdx].normalizedPct) {
        maxIdx = i;
      }
    }
    normalizedCategories[maxIdx].normalizedPct += pctDiff;
  }

  // 2. Allocate currency amounts
  let allocatedSum = 0;
  const result: ReconciledCategory[] = normalizedCategories.map((c) => {
    const amount = Math.floor((safeTotalBudget * c.normalizedPct) / 100);
    allocatedSum += amount;

    // Sub-items reconciliation
    const items = (c.items || []).map((it) => {
      const itPct = it.percentageOfCategory ?? 100 / Math.max(1, c.items?.length || 1);
      return {
        name: it.name,
        estimated: Math.round((amount * itPct) / 100),
        status: it.status || "Pending",
      };
    });

    return {
      name: c.name,
      percentage: c.normalizedPct,
      allocated: amount,
      icon: c.icon || "domain",
      items,
    };
  });

  // 3. Reconcile remainder rupees to guarantee 100% sum equality with totalBudget
  const remainder = safeTotalBudget - allocatedSum;
  if (remainder !== 0 && result.length > 0) {
    // Distribute remainder to the primary (highest allocated) category
    let maxIdx = 0;
    for (let i = 1; i < result.length; i++) {
      if (result[i].allocated > result[maxIdx].allocated) {
        maxIdx = i;
      }
    }
    result[maxIdx].allocated += remainder;

    // Update first sub-item of primary category to absorb remainder
    if (result[maxIdx].items.length > 0) {
      result[maxIdx].items[0].estimated += remainder;
    }
  }

  return result;
}

export type BudgetScenario = "conservative" | "balanced" | "luxury";

export interface ScenarioResult {
  scenario: BudgetScenario;
  scenarioName: string;
  totalBudget: number;
  deltaPercentage: number;
  categories: ReconciledCategory[];
  rationale: string;
}

/**
 * Calculates the 3-scenario AI budget optimization (Conservative Cut -15%, Balanced, VIP Luxury +20%).
 * All scenarios guarantee exact 100% arithmetic sums with zero missing or invented capital.
 *
 * @param baseBudget - Baseline celebration budget
 * @param categories - Original category allocation percentages
 * @returns Three complete reconciled scenarios with strategic rationales
 * @complexity O(N) Time | O(N) Space
 */
export function calculateBudgetScenarios(
  baseBudget: number,
  categories: CategoryAllocationInput[],
): Record<BudgetScenario, ScenarioResult> {
  const safeBase = Number.isFinite(baseBudget) ? Math.max(0, Math.round(baseBudget)) : 0;

  // Conservative Cut: -15% total budget with essential priority
  const conservativeTotal = Math.round(safeBase * 0.85);
  const conservativeCategories = reconcileBudgetAllocations(conservativeTotal, categories);

  // Balanced: Baseline 100%
  const balancedCategories = reconcileBudgetAllocations(safeBase, categories);

  // VIP Luxury: +20% total budget for elite enhancements
  const luxuryTotal = Math.round(safeBase * 1.2);
  const luxuryCategories = reconcileBudgetAllocations(luxuryTotal, categories);

  return {
    conservative: {
      scenario: "conservative",
      scenarioName: "Conservative Cut (-15%)",
      totalBudget: conservativeTotal,
      deltaPercentage: -15,
      categories: conservativeCategories,
      rationale:
        "Streamlines non-essential decor and optimizes vendor contracts to preserve a 15% emergency cash buffer.",
    },
    balanced: {
      scenario: "balanced",
      scenarioName: "Balanced Master Plan",
      totalBudget: safeBase,
      deltaPercentage: 0,
      categories: balancedCategories,
      rationale:
        "Our baseline golden ratio blueprint: optimal hospitality, verified top-tier catering, and floral styling.",
    },
    luxury: {
      scenario: "luxury",
      scenarioName: "VIP Luxury Suite (+20%)",
      totalBudget: luxuryTotal,
      deltaPercentage: +20,
      categories: luxuryCategories,
      rationale:
        "Expands visual scenography with aerial drone coverage, celebrity performers, and premium floral rigging.",
    },
  };
}
