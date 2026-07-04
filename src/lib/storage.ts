import "server-only";

/**
 * Minimal server-side Supabase Storage client (REST, no SDK dependency).
 * Uploads intake attachments to a PRIVATE bucket using the service-role key,
 * and mints short-lived signed URLs for the sales-notification email.
 *
 * Requires SUPABASE_URL + SUPABASE_SERVICE_ROLE_KEY. The service-role key is
 * server-only and must never reach the browser.
 */
const SUPA_URL = process.env.SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const BUCKET = process.env.INTAKE_UPLOADS_BUCKET || "intake-uploads";

export const isStorageConfigured = () => Boolean(SUPA_URL && SERVICE_KEY);

const slug = (s: string) =>
  s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "").slice(0, 40) || "company";
const safeFile = (s: string) => s.replace(/[^a-zA-Z0-9._-]+/g, "_").slice(0, 80) || "file";

/** Build a bucket path: <company-slug>/<timestamp>-<safe-filename>. */
export function intakePath(company: string, fileName: string): string {
  return `${slug(company)}/${Date.now()}-${safeFile(fileName)}`;
}

/** Upload one file to the private bucket. Returns true on success. */
export async function uploadIntakeFile(path: string, file: File): Promise<boolean> {
  if (!isStorageConfigured()) return false;
  try {
    const body = Buffer.from(await file.arrayBuffer());
    const res = await fetch(
      `${SUPA_URL}/storage/v1/object/${BUCKET}/${encodeURI(path)}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${SERVICE_KEY}`,
          "Content-Type": file.type || "application/octet-stream",
          "x-upsert": "true",
        },
        body,
      }
    );
    if (!res.ok) console.error("[storage] upload failed", res.status, await res.text().catch(() => ""));
    return res.ok;
  } catch (err) {
    console.error("[storage] upload error", err);
    return false;
  }
}

/** Mint a signed download URL (default 7 days) for a stored object. */
export async function createSignedUrl(
  path: string,
  expiresIn = 60 * 60 * 24 * 7
): Promise<string | null> {
  if (!isStorageConfigured()) return null;
  try {
    const res = await fetch(
      `${SUPA_URL}/storage/v1/object/sign/${BUCKET}/${encodeURI(path)}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${SERVICE_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ expiresIn }),
      }
    );
    if (!res.ok) return null;
    const json = (await res.json()) as { signedURL?: string };
    return json.signedURL ? `${SUPA_URL}/storage/v1${json.signedURL}` : null;
  } catch {
    return null;
  }
}
