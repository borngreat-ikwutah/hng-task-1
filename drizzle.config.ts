import { defineConfig } from "drizzle-kit";
import { z } from "zod";

const envSchema = z.object({
  DATABASE_URL: z.string().min(1, "DATABASE_URL is required"),
});

const rawEnv =
  typeof Bun !== "undefined"
    ? Bun.env
    : (process.env as Record<string, string | undefined>);

const env = envSchema.parse(rawEnv);

export default defineConfig({
  schema: "./src/db/schema.ts",
  out: "./migrations",
  dialect: "postgresql",
  dbCredentials: {
    url: env.DATABASE_URL,
  },
});
