import { dbQuery } from "@/lib/postgres";

let ensured = false;

export async function ensureQuoteSchema() {
  if (ensured) return;

  await dbQuery(`
    CREATE TABLE IF NOT EXISTS quote_requests (
      id BIGSERIAL PRIMARY KEY,
      full_name TEXT NOT NULL,
      email TEXT NOT NULL,
      phone TEXT,
      company TEXT,
      width NUMERIC(10, 2) NOT NULL,
      height NUMERIC(10, 2) NOT NULL,
      depth NUMERIC(10, 2) NOT NULL,
      material TEXT,
      thickness TEXT,
      addons TEXT[] NOT NULL DEFAULT '{}',
      finish TEXT,
      extra_finishes TEXT[] NOT NULL DEFAULT '{}',
      unboxing TEXT,
      quantity INTEGER NOT NULL CHECK (quantity > 0),
      status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'in_review', 'quoted', 'approved', 'rejected', 'closed')),
      counter_offer NUMERIC(12, 2),
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );
  `);

  await dbQuery(`CREATE INDEX IF NOT EXISTS quote_requests_status_idx ON quote_requests (status);`);
  await dbQuery(`CREATE INDEX IF NOT EXISTS quote_requests_created_at_idx ON quote_requests (created_at DESC);`);

  ensured = true;
}
