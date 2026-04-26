import { dbQuery } from "@/lib/postgres";

let ensured = false;

export async function ensureCustomerSchema() {
  if (ensured) return;

  await dbQuery(`
    CREATE TABLE IF NOT EXISTS customers (
      id BIGSERIAL PRIMARY KEY,
      email TEXT NOT NULL UNIQUE,
      full_name TEXT NOT NULL,
      phone TEXT,
      company TEXT,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );
  `);

  await dbQuery(`CREATE INDEX IF NOT EXISTS customers_email_idx ON customers (email);`);

  ensured = true;
}

export type UpsertCustomerInput = {
  email: string;
  fullName: string;
  phone?: string | null;
  company?: string | null;
};

/** Upsert by email (must already be normalized lower-case). */
export async function upsertCustomerFromLead(input: UpsertCustomerInput): Promise<number> {
  await ensureCustomerSchema();
  const email = input.email.trim().toLowerCase();
  const fullName = input.fullName.trim();
  const phone = input.phone?.trim() || null;
  const company = input.company?.trim() || null;

  const row = await dbQuery<{ id: number }>(
    `INSERT INTO customers (email, full_name, phone, company)
     VALUES ($1, $2, $3, $4)
     ON CONFLICT (email)
     DO UPDATE SET
       full_name = EXCLUDED.full_name,
       phone = COALESCE(EXCLUDED.phone, customers.phone),
       company = COALESCE(EXCLUDED.company, customers.company),
       updated_at = NOW()
     RETURNING id`,
    [email, fullName, phone, company],
  );

  const id = row.rows[0]?.id;
  if (!id) throw new Error("Customer upsert failed");
  return id;
}
