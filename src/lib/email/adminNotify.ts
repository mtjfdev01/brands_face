import { SITE_CONTACT_EMAIL } from "@/data/siteContact";
import { ensureAdminSchema } from "@/lib/adminSchema";
import { dbQuery } from "@/lib/postgres";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function parseEmailList(value: string | undefined): string[] {
  if (!value?.trim()) return [];
  return [
    ...new Set(
      value
        .split(/[,;\s]+/)
        .map((email) => email.trim().toLowerCase())
        .filter((email) => EMAIL_RE.test(email)),
    ),
  ];
}

/** Inbox(es) that should receive new quote / lead alerts. */
export async function getAdminNotifyEmails(): Promise<string[]> {
  const fromEnv = parseEmailList(process.env.ADMIN_NOTIFY_EMAIL);
  if (fromEnv.length) return fromEnv;

  try {
    await ensureAdminSchema();
    const result = await dbQuery<{ email: string }>(
      `SELECT email FROM admins WHERE is_active = TRUE`,
    );
    const fromDb = [
      ...new Set(
        result.rows
          .map((row) => row.email.trim().toLowerCase())
          .filter((email) => EMAIL_RE.test(email)),
      ),
    ];
    if (fromDb.length) return fromDb;
  } catch (error) {
    console.error("Failed to load admin emails for notifications:", error);
  }

  return parseEmailList(SITE_CONTACT_EMAIL);
}