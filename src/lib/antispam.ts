import "server-only";

/**
 * Lightweight abuse protection for public POST endpoints (contact, lead, intake).
 * No external dependencies — a honeypot field plus a best-effort in-memory limiter.
 */

/** Honeypot: a hidden form field real users never fill, but bots do. */
export function isHoneypotTripped(value: unknown): boolean {
  return typeof value === "string" && value.trim().length > 0;
}

type Bucket = { count: number; resetAt: number };
const buckets = new Map<string, Bucket>();

/**
 * Best-effort fixed-window rate limit. Returns true when the request is allowed.
 *
 * NOTE: on serverless each instance has its own memory, so this throttles bursts
 * against a warm instance rather than enforcing a global limit. For hard limits
 * across instances, back this with a shared store (e.g. Upstash Redis).
 */
export function rateLimit(key: string, limit = 5, windowMs = 60_000): boolean {
  const now = Date.now();
  const bucket = buckets.get(key);
  if (!bucket || now > bucket.resetAt) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return true;
  }
  if (bucket.count >= limit) return false;
  bucket.count += 1;
  return true;
}

/** Derives a rate-limit key from the caller's IP (via proxy headers) + a scope. */
export function clientKey(request: Request, scope: string): string {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown";
  return `${scope}:${ip}`;
}
