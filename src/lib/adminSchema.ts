import { dbQuery } from "@/lib/postgres";

let ensured = false;

export async function ensureAdminSchema() {
  if (ensured) return;

  await dbQuery(`
    CREATE TABLE IF NOT EXISTS admins (
      id BIGSERIAL PRIMARY KEY,
      email TEXT NOT NULL UNIQUE,
      name TEXT,
      password_hash TEXT NOT NULL,
      is_active BOOLEAN NOT NULL DEFAULT TRUE,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );
  `);
  await dbQuery(`CREATE INDEX IF NOT EXISTS admins_email_idx ON admins (email);`);

  ensured = true;
}
