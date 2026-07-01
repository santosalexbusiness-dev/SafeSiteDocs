import { PrismaClient } from "@prisma/client";

/**
 * Prisma client for Supabase Postgres.
 * Guarded: only instantiates when DATABASE_URL is set, so the app runs fine
 * before the database is connected. Uses a singleton to avoid exhausting
 * connections during dev hot-reload.
 */
export const isDbConfigured = () => Boolean(process.env.DATABASE_URL);

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

export const prisma: PrismaClient | null = isDbConfigured()
  ? globalForPrisma.prisma ?? new PrismaClient({ log: ["error", "warn"] })
  : null;

if (isDbConfigured() && prisma && process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
