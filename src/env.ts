import { z } from "zod";

const envSchema = z.object({
  DATABASE_URL: z.string().min(1, "DATABASE_URL is required"),
  NODE_ENV: z
    .enum(["development", "test", "production"])
    .default("development"),
});

type EnvInput = Record<string, string | undefined>;

const rawEnv: EnvInput =
  typeof process !== "undefined" && process.env
    ? (process.env as EnvInput)
    : typeof globalThis !== "undefined" && "env" in globalThis
      ? ((globalThis as typeof globalThis & { env?: EnvInput }).env ?? {})
      : {};

const envParsed = envSchema.safeParse(rawEnv);

if (!envParsed.success) {
  console.error("Invalid environment variables:", envParsed.error.format());
  throw new Error("Invalid environment variables");
}

export const env = envParsed.data;
export type Env = typeof env;
