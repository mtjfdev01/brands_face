import { dbQuery } from "@/lib/postgres";

let ensured = false;

export async function ensureQuoteSchema() {
  if (ensured) return;

  await dbQuery(`
    CREATE TABLE IF NOT EXISTS quote_requests (
      id BIGSERIAL PRIMARY KEY,
      full_name TEXT NOT NULL DEFAULT 'Quote Lead',
      email TEXT NOT NULL DEFAULT '',
      phone TEXT,
      company TEXT,
      width NUMERIC(10, 2) NOT NULL DEFAULT 0,
      height NUMERIC(10, 2) NOT NULL DEFAULT 0,
      depth NUMERIC(10, 2) NOT NULL DEFAULT 0,
      material TEXT,
      thickness TEXT,
      addons TEXT[] NOT NULL DEFAULT '{}',
      finish TEXT,
      extra_finishes TEXT[] NOT NULL DEFAULT '{}',
      unboxing TEXT,
      quantity INTEGER NOT NULL DEFAULT 1 CHECK (quantity > 0),
      requirement TEXT,
      attachment_paths TEXT[] NOT NULL DEFAULT '{}',
      status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'in_review', 'quoted', 'approved', 'rejected', 'closed')),
      counter_offer NUMERIC(12, 2),
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );
  `);

  await dbQuery(`CREATE INDEX IF NOT EXISTS quote_requests_status_idx ON quote_requests (status);`);
  await dbQuery(`CREATE INDEX IF NOT EXISTS quote_requests_created_at_idx ON quote_requests (created_at DESC);`);

  await dbQuery(`ALTER TABLE quote_requests ADD COLUMN IF NOT EXISTS customer_id BIGINT;`);
  await dbQuery(`ALTER TABLE quote_requests ADD COLUMN IF NOT EXISTS requirement TEXT;`);
  await dbQuery(
    `ALTER TABLE quote_requests ADD COLUMN IF NOT EXISTS attachment_paths TEXT[] NOT NULL DEFAULT '{}';`,
  );

  // Legacy columns: allow simple phone + requirement quotes without full configurator data.
  await dbQuery(`ALTER TABLE quote_requests ALTER COLUMN full_name SET DEFAULT 'Quote Lead';`);
  await dbQuery(`ALTER TABLE quote_requests ALTER COLUMN email SET DEFAULT '';`);
  await dbQuery(`ALTER TABLE quote_requests ALTER COLUMN width SET DEFAULT 0;`);
  await dbQuery(`ALTER TABLE quote_requests ALTER COLUMN height SET DEFAULT 0;`);
  await dbQuery(`ALTER TABLE quote_requests ALTER COLUMN depth SET DEFAULT 0;`);
  await dbQuery(`ALTER TABLE quote_requests ALTER COLUMN quantity SET DEFAULT 1;`);

  ensured = true;
}
