import type { NextAuthOptions } from "next-auth";
import { getServerSession } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/db";

/**
 * Real credentials auth backed by the Prisma `User` table.
 * - Passwords are bcrypt-hashed (see /api/auth/signup).
 * - JWT sessions (no DB round-trip per request); user id + role ride the token.
 * - Emails listed in ADMIN_EMAILS are promoted to ADMIN on sign-in.
 */

const ADMIN_EMAILS = (process.env.ADMIN_EMAILS ?? "")
  .split(",")
  .map((e) => e.trim().toLowerCase())
  .filter(Boolean);

export const isAdminEmail = (email: string) => ADMIN_EMAILS.includes(email.toLowerCase());

export const authOptions: NextAuthOptions = {
  session: { strategy: "jwt" },
  pages: { signIn: "/login" },
  providers: [
    CredentialsProvider({
      name: "Email and password",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!prisma || !credentials?.email || !credentials.password) return null;
        const email = credentials.email.trim().toLowerCase();
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user?.passwordHash) return null;
        const valid = await bcrypt.compare(credentials.password, user.passwordHash);
        if (!valid) return null;

        // Keep the owner's role in sync with ADMIN_EMAILS.
        let role = user.role;
        if (isAdminEmail(email) && role !== "ADMIN") {
          role = "ADMIN";
          await prisma.user.update({ where: { id: user.id }, data: { role } }).catch(() => {});
        }

        return { id: user.id, email: user.email, name: user.name, role, company: user.company };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.uid = (user as { id: string }).id;
        token.role = (user as { role?: string }).role ?? "CUSTOMER";
        token.company = (user as { company?: string | null }).company ?? null;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.uid as string;
        session.user.role = (token.role as string) ?? "CUSTOMER";
        session.user.company = (token.company as string | null) ?? null;
      }
      return session;
    },
  },
};

/** The signed-in user (or null). Use in server components and route handlers. */
export async function getSessionUser() {
  const session = await getServerSession(authOptions);
  return session?.user ?? null;
}

/** What the account can see: none (no plan), starter, or pro. Admins see all. */
export type AccessTier = "none" | "starter" | "pro";

export async function getAccessTier(user: {
  id?: string;
  role?: string;
} | null): Promise<AccessTier> {
  if (!user?.id) return "none";
  if (user.role === "ADMIN") return "pro";
  if (!prisma) return "none";
  const sub = await prisma.subscription.findFirst({
    where: { userId: user.id, status: { in: ["ACTIVE", "TRIALING"] } },
    orderBy: { createdAt: "desc" },
  });
  if (!sub) return "none";
  return sub.plan === "library-pro" ? "pro" : "starter";
}

/** Gate rule for a library document. Samples are always free to read. */
export function canViewDoc(
  doc: { isSample: boolean; accessLevel: string },
  tier: AccessTier
): boolean {
  if (doc.isSample) return true;
  if (doc.accessLevel === "Starter") return tier === "starter" || tier === "pro";
  return tier === "pro"; // "Pro" and "Custom Binder" docs need the Pro plan
}
