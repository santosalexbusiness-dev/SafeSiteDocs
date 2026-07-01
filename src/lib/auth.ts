/**
 * Auth wiring (architecture-ready, dependency-free).
 *
 * Recommended: NextAuth.js (Auth.js) with the Prisma adapter.
 *   1) npm i next-auth @auth/prisma-adapter
 *   2) Set NEXTAUTH_SECRET + provider creds in .env.local
 *   3) Create src/app/api/auth/[...nextauth]/route.ts using the config below
 *   4) Protect routes in middleware.ts (see commented example)
 */

export type Role = "customer" | "admin";

/** Routes that require an authenticated session. */
export const protectedRoutes = ["/dashboard"];
/** Routes that require an admin role. */
export const adminRoutes = ["/admin"];

/*
// ---------------------------------------------------------------------------
// src/app/api/auth/[...nextauth]/route.ts
//
// import NextAuth from "next-auth";
// import GoogleProvider from "next-auth/providers/google";
// import CredentialsProvider from "next-auth/providers/credentials";
// import { PrismaAdapter } from "@auth/prisma-adapter";
// import { prisma } from "@/lib/db";
//
// export const authOptions = {
//   adapter: PrismaAdapter(prisma),
//   session: { strategy: "jwt" },
//   secret: process.env.NEXTAUTH_SECRET,
//   pages: { signIn: "/login" },
//   providers: [
//     GoogleProvider({
//       clientId: process.env.GOOGLE_CLIENT_ID!,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
//     }),
//     CredentialsProvider({
//       name: "Email",
//       credentials: { email: {}, password: {} },
//       async authorize(creds) {
//         // 1) look up user, 2) verify hashed password (bcrypt), 3) return user or null
//       },
//     }),
//   ],
//   callbacks: {
//     async session({ session, token }) {
//       if (session.user) session.user.role = token.role as Role;
//       return session;
//     },
//     async jwt({ token, user }) {
//       if (user) token.role = (user as any).role ?? "customer";
//       return token;
//     },
//   },
// };
//
// const handler = NextAuth(authOptions);
// export { handler as GET, handler as POST };
// ---------------------------------------------------------------------------
//
// middleware.ts (protect dashboard/admin):
//
// export { default } from "next-auth/middleware";
// export const config = { matcher: ["/dashboard/:path*", "/admin/:path*"] };
// ---------------------------------------------------------------------------
*/
