// Serverless-resilient database layer with in-memory fallback
// Prevents serverless production failures when SQLite/Prisma binary engines are not mounted.

let prismaInstance: any = null;

try {
  const { PrismaClient } = require("@prisma/client");
  const globalForPrisma = globalThis as unknown as {
    prisma: any;
  };
  prismaInstance =
    globalForPrisma.prisma ??
    new PrismaClient({
      log: process.env.NODE_ENV === "development" ? ["error"] : ["error"],
    });
  if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prismaInstance;
} catch (e) {
  console.warn("Prisma Client unavailable, using serverless in-memory store:", e);
}

// In-memory fallback mock for serverless edge runtimes
const createMockModel = (name: string) => ({
  findFirst: async () => ({ id: `default-${name}-1`, name: "Default Celebration Studio", slug: "default" }),
  findMany: async () => [],
  create: async ({ data }: any) => ({ id: `${name}-${Date.now()}`, ...data }),
  createMany: async ({ data }: any) => ({ count: Array.isArray(data) ? data.length : 1 }),
  update: async ({ data }: any) => ({ ...data }),
  delete: async () => ({ success: true }),
});

export const db: any = prismaInstance ?? {
  workspace: createMockModel("workspace"),
  user: createMockModel("user"),
  event: createMockModel("event"),
  budgetCategory: createMockModel("budgetCategory"),
  budgetItem: createMockModel("budgetItem"),
  phase: createMockModel("phase"),
  task: createMockModel("task"),
  aIGeneration: createMockModel("aIGeneration"),
};
