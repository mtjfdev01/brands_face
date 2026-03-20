import { dbQuery } from "@/lib/postgres";

let ensured = false;

export async function ensureAuditSchema() {
  if (ensured) return;

  await dbQuery(`
    CREATE TABLE IF NOT EXISTS audit_requests (
      id BIGSERIAL PRIMARY KEY,
      company_name TEXT NOT NULL,
      website_url TEXT,
      country TEXT NOT NULL,
      product_category TEXT NOT NULL,
      full_name TEXT NOT NULL,
      email TEXT NOT NULL,
      phone TEXT,
      brand_stage TEXT,
      monthly_order_volume TEXT,
      primary_goal TEXT,
      current_packaging_type TEXT,
      timeline TEXT,
      budget_range TEXT,
      challenges TEXT[] NOT NULL DEFAULT '{}',
      notes TEXT,
      attachment_paths TEXT[] NOT NULL DEFAULT '{}',
      status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'in_review', 'completed', 'rejected')),
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );
  `);

  await dbQuery(`CREATE INDEX IF NOT EXISTS audit_requests_status_idx ON audit_requests (status);`);
  await dbQuery(`CREATE INDEX IF NOT EXISTS audit_requests_created_at_idx ON audit_requests (created_at DESC);`);

  ensured = true;
}
