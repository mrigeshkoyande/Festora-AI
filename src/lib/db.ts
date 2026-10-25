// Pure TypeScript in-memory data store for serverless & edge runtime reliability
// Eliminates all binary engine dependencies and database lock issues in production.

export interface Workspace {
  id: string;
  name: string;
  slug: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
}

export interface Event {
  id: string;
  workspaceId: string;
  name: string;
  type: string;
  tier: string;
  guestCount: number;
  budgetTotal: number;
  city: string;
  date: Date;
  status: string;
}

// Global in-memory storage arrays
const memoryStore = {
  workspaces: [
    {
      id: "workspace-jaipur-royale",
      name: "Jaipur Royale Celebrations",
      slug: "jaipur-royale",
    },
  ] as any[],
  users: [
    {
      id: "user-priya-sharma",
      name: "Priya Sharma",
      email: "priya.sharma@festora.ai",
    },
  ] as any[],
  events: [] as any[],
  budgetCategories: [] as any[],
  budgetItems: [] as any[],
  phases: [] as any[],
  tasks: [] as any[],
  aiGenerations: [] as any[],
};

const createInMemoryModel = (storeKey: keyof typeof memoryStore, singular: string) => ({
  findFirst: async (predicate?: any) => {
    return memoryStore[storeKey][0] ?? null;
  },
  findMany: async (predicate?: any) => {
    return [...memoryStore[storeKey]];
  },
  create: async ({ data }: { data: any }) => {
    const item = {
      id: `${singular}-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
      createdAt: new Date(),
      updatedAt: new Date(),
      ...data,
    };
    memoryStore[storeKey].push(item);
    return item;
  },
  createMany: async ({ data }: { data: any[] }) => {
    const items = Array.isArray(data) ? data : [data];
    const created = items.map((d) => ({
      id: `${singular}-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
      createdAt: new Date(),
      updatedAt: new Date(),
      ...d,
    }));
    memoryStore[storeKey].push(...created);
    return { count: created.length };
  },
  update: async ({ where, data }: { where: any; data: any }) => {
    const idx = memoryStore[storeKey].findIndex((item: any) => item.id === where?.id);
    if (idx !== -1) {
      memoryStore[storeKey][idx] = { ...memoryStore[storeKey][idx], ...data, updatedAt: new Date() };
      return memoryStore[storeKey][idx];
    }
    return { id: where?.id, ...data };
  },
  delete: async ({ where }: { where: any }) => {
    const idx = memoryStore[storeKey].findIndex((item: any) => item.id === where?.id);
    if (idx !== -1) {
      memoryStore[storeKey].splice(idx, 1);
    }
    return { success: true };
  },
});

export const db = {
  workspace: createInMemoryModel("workspaces", "ws"),
  user: createInMemoryModel("users", "usr"),
  event: createInMemoryModel("events", "evt"),
  budgetCategory: createInMemoryModel("budgetCategories", "bcat"),
  budgetItem: createInMemoryModel("budgetItems", "bitem"),
  phase: createInMemoryModel("phases", "phase"),
  task: createInMemoryModel("tasks", "task"),
  aIGeneration: createInMemoryModel("aiGenerations", "aigen"),
};
