import { dbQuery } from "@/lib/postgres";
import { PRODUCT_ORDER_STATUSES } from "@/lib/productOrderStatus";

let ensured = false;

const STATUS_SQL_LIST = PRODUCT_ORDER_STATUSES.map((s) => `'${s}'`).join(", ");

/** Re-apply CHECK constraint so older DBs pick up new status values (e.g. `responded`). */
async function migrateProductOrderStatusConstraint() {
  await dbQuery(
    `UPDATE product_orders SET status = 'responded' WHERE status = 'contacted' OR status = 'in_review';`,
  );
  await dbQuery(`ALTER TABLE product_orders DROP CONSTRAINT IF EXISTS product_orders_status_check;`);
  await dbQuery(`
    ALTER TABLE product_orders
    ADD CONSTRAINT product_orders_status_check
    CHECK (status IN (${STATUS_SQL_LIST}));
  `);
}

export async function ensureProductOrderSchema() {
  if (ensured) return;

  await dbQuery(`
    CREATE TABLE IF NOT EXISTS product_orders (
      id BIGSERIAL PRIMARY KEY,
      request_type TEXT NOT NULL CHECK (request_type IN ('custom_quote', 'standard_order')),
      cta_source TEXT NOT NULL DEFAULT 'place_order' CHECK (cta_source IN ('place_order', 'add_to_cart', 'custom_quote')),
      status TEXT NOT NULL DEFAULT 'pending',
      product_slug TEXT NOT NULL,
      product_title TEXT NOT NULL,
      quantity INTEGER NOT NULL CHECK (quantity > 0),
      size_label TEXT,
      size_dimensions TEXT,
      price_per_piece NUMERIC(12, 4),
      line_total NUMERIC(12, 2),
      full_name TEXT NOT NULL,
      email TEXT NOT NULL,
      phone TEXT,
      company TEXT,
      customer_notes TEXT,
      admin_notes TEXT,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );
  `);

  await migrateProductOrderStatusConstraint();

  await dbQuery(
    `CREATE INDEX IF NOT EXISTS product_orders_status_idx ON product_orders (status);`,
  );
  await dbQuery(
    `CREATE INDEX IF NOT EXISTS product_orders_created_at_idx ON product_orders (created_at DESC);`,
  );
  await dbQuery(
    `CREATE INDEX IF NOT EXISTS product_orders_product_slug_idx ON product_orders (product_slug);`,
  );

  ensured = true;
}
