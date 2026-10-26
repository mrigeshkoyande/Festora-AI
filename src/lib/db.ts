// Pure TypeScript in-memory data store for serverless & edge runtime reliability
// Eliminates all binary engine dependencies and database lock issues in production.

export interface Workspace {
  id: string;
  name: string;
  slug: string;
  ownerId?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface User {
  id: string;
  name: string;
  email: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface EventRecord {
  id: string;
  workspaceId: string;
  title: string;
  type: string;
  targetDate: Date;
  city: string;
  guestCount: number;
  currency: string;
  totalBudget: number;
  spentBudget: number;
  styleVibe: string;
  planHealth: number;
  specialNeeds?: string;
  coverImage?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface BudgetCategoryRecord {
  id: string;
  eventId: string;
  name: string;
  allocated: number;
  spent: number;
  percentage: number;
  icon: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface BudgetItemRecord {
  id: string;
  categoryId: string;
  name: string;
  estimated: number;
  actual: number;
  status: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface PhaseRecord {
  id: string;
  eventId: string;
  title: string;
  order: number;
  status: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface TaskRecord {
  id: string;
  eventId: string;
  phaseId: string;
  title: string;
  priority: "high" | "medium" | "low";
  dueDate: Date;
  status: string;
  assigneeRole: string;
  order: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface AIGenerationRecord {
  id: string;
  eventId: string;
  feature: string;
  prompt: string;
  response: string;
  tokens: number;
  cost: number;
  status: string;
  createdAt?: Date;
  updatedAt?: Date;
}

// Global typed in-memory storage tables
const memoryStore = {
  workspaces: [
    {
      id: "workspace-jaipur-royale",
      name: "Jaipur Royale Celebrations",
      slug: "jaipur-royale",
      ownerId: "user-priya-sharma",
      createdAt: new Date("2026-01-01"),
      updatedAt: new Date("2026-01-01"),
    },
  ] as Workspace[],
  users: [
    {
      id: "user-priya-sharma",
      name: "Priya Sharma",
      email: "priya.sharma@festora.ai",
      createdAt: new Date("2026-01-01"),
      updatedAt: new Date("2026-01-01"),
    },
  ] as User[],
  events: [] as EventRecord[],
  budgetCategories: [] as BudgetCategoryRecord[],
  budgetItems: [] as BudgetItemRecord[],
  phases: [] as PhaseRecord[],
  tasks: [] as TaskRecord[],
  aiGenerations: [] as AIGenerationRecord[],
};

function createInMemoryModel<T extends { id: string }>(
  storeKey: keyof typeof memoryStore,
  singular: string
) {
  const store = memoryStore[storeKey] as unknown as T[];

  return {
    findFirst: async (predicate?: (item: T) => boolean): Promise<T | null> => {
      if (!predicate) return store[0] ?? null;
      return store.find(predicate) ?? null;
    },
    findMany: async (predicate?: (item: T) => boolean): Promise<T[]> => {
      if (!predicate) return [...store];
      return store.filter(predicate);
    },
    create: async ({ data }: { data: Omit<T, "id" | "createdAt" | "updatedAt"> }): Promise<T> => {
      const item = {
        id: `${singular}-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
        createdAt: new Date(),
        updatedAt: new Date(),
        ...data,
      } as unknown as T;
      store.push(item);
      return item;
    },
    createMany: async ({
      data,
    }: {
      data: Omit<T, "id" | "createdAt" | "updatedAt">[];
    }): Promise<{ count: number }> => {
      const items = Array.isArray(data) ? data : [data];
      const created = items.map(
        (d) =>
          ({
            id: `${singular}-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
            createdAt: new Date(),
            updatedAt: new Date(),
            ...d,
          } as unknown as T)
      );
      store.push(...created);
      return { count: created.length };
    },
    update: async ({
      where,
      data,
    }: {
      where: { id: string };
      data: Partial<T>;
    }): Promise<T | null> => {
      const idx = store.findIndex((item) => item.id === where.id);
      if (idx !== -1) {
        store[idx] = { ...store[idx], ...data, updatedAt: new Date() };
        return store[idx];
      }
      return null;
    },
    delete: async ({ where }: { where: { id: string } }): Promise<{ success: boolean }> => {
      const idx = store.findIndex((item) => item.id === where.id);
      if (idx !== -1) {
        store.splice(idx, 1);
      }
      return { success: true };
    },
  };
}

export const db = {
  workspace: createInMemoryModel<Workspace>("workspaces", "ws"),
  user: createInMemoryModel<User>("users", "usr"),
  event: createInMemoryModel<EventRecord>("events", "evt"),
  budgetCategory: createInMemoryModel<BudgetCategoryRecord>("budgetCategories", "bcat"),
  budgetItem: createInMemoryModel<BudgetItemRecord>("budgetItems", "bitem"),
  phase: createInMemoryModel<PhaseRecord>("phases", "phase"),
  task: createInMemoryModel<TaskRecord>("tasks", "task"),
  aIGeneration: createInMemoryModel<AIGenerationRecord>("aiGenerations", "aigen"),
};
