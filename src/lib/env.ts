import { z } from "zod";

/** Runtime-validated server configuration. */
export const EnvironmentSchema = z.object({
  GEMINI_API_KEY: z.string().trim().optional(),
  GEMINI_MODEL: z.string().trim().min(1).default("gemini-3.8-flash"),
  NEXT_PUBLIC_APP_URL: z.string().url().default("http://localhost:3000"),
  PORT: z.coerce.number().int().min(1).max(65535).default(3000),
  HOSTNAME: z.string().trim().min(1).default("0.0.0.0"),
  UPSTASH_REDIS_REST_URL: z.preprocess(
    (value) => (value === "" ? undefined : value),
    z.string().url().optional(),
  ),
  UPSTASH_REDIS_REST_TOKEN: z.preprocess(
    (value) => (value === "" ? undefined : value),
    z.string().trim().optional(),
  ),
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
});

export type Environment = z.infer<typeof EnvironmentSchema>;

/** Parse and validate the environment at a server trust boundary. */
export function getServerEnv(): Environment {
  const parsed = EnvironmentSchema.safeParse(process.env);
  if (!parsed.success) {
    throw new Error("Invalid server environment configuration");
  }
  return parsed.data;
}
