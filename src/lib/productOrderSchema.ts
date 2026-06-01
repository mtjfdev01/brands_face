import { dbQuery } from "@/lib/postgres";
import { PRODUCT_ORDER_STATUSES } from "@/lib/productOrderStatus";

let ensured = false;

const STATUS_SQL_LIST = PRODUCT_ORDER_STATUSES.map((s) => `'${s}'`).join(", ");

/** Re-apply CHECK constraint so older DBs pick up new status values (e.g. `responded`). */
async function migrateProductOrderPaymentColumns() {
  await dbQuery(`ALTER TABLE product_orders ADD COLUMN IF NOT EXISTS customer_id BIGINT;`);
  await dbQuery(
    `ALTER TABLE product_orders ADD COLUMN IF NOT EXISTS payment_status TEXT NOT NULL DEFAULT 'unpaid';`,
  );
  await dbQuery(`ALTER TABLE product_orders ADD COLUMN IF NOT EXISTS gateway_error TEXT;`);
  await dbQuery(
    `ALTER TABLE product_orders DROP CONSTRAINT IF EXISTS product_orders_payment_status_check;`,
  );
  await dbQuery(`
    ALTER TABLE product_orders
    ADD CONSTRAINT product_orders_payment_status_check
    CHECK (payment_status IN ('unpaid', 'pending_checkout', 'paid', 'failed', 'refunded'));
  `);
}

async function migrateProductOrderCtaAndInvoice() {
  await dbQuery(`ALTER TABLE product_orders ADD COLUMN IF NOT EXISTS invoice_public_key TEXT;`);
  await dbQuery(
    `CREATE UNIQUE INDEX IF NOT EXISTS product_orders_invoice_public_key_uidx ON product_orders (invoice_public_key) WHERE invoice_public_key IS NOT NULL;`,
  );
  await dbQuery(`ALTER TABLE product_orders DROP CONSTRAINT IF EXISTS product_orders_cta_source_check;`);
  await dbQuery(`
    ALTER TABLE product_orders
    ADD CONSTRAINT product_orders_cta_source_check
    CHECK (cta_source IN ('place_order', 'add_to_cart', 'custom_quote', 'admin'));
  `);
}

async function migrateProductOrderTotalsAndDueDate() {
  await dbQuery(`ALTER TABLE product_orders ADD COLUMN IF NOT EXISTS grand_total NUMERIC(12, 2);`);
  await dbQuery(`ALTER TABLE product_orders ADD COLUMN IF NOT EXISTS discounted_grand_total NUMERIC(12, 2);`);
  await dbQuery(`ALTER TABLE product_orders ADD COLUMN IF NOT EXISTS due_date DATE;`);
}

async function migrateOrderLineItemsTable() {
  await dbQuery(`
    CREATE TABLE IF NOT EXISTS order_line_items (
      id BIGSERIAL PRIMARY KEY,
      order_id BIGINT NOT NULL REFERENCES product_orders(id) ON DELETE CASCADE,
      sort_order INTEGER NOT NULL DEFAULT 0,
      product_title TEXT NOT NULL,
      product_slug TEXT,
      size_label TEXT,
      size_dimensions TEXT,
      quantity INTEGER NOT NULL CHECK (quantity > 0),
      price_per_piece NUMERIC(12, 4) NOT NULL,
      line_total NUMERIC(12, 2) NOT NULL,
      discounted_line_total NUMERIC(12, 2),
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );
  `);
  await dbQuery(
    `CREATE INDEX IF NOT EXISTS order_line_items_order_id_idx ON order_line_items (order_id, sort_order);`,
  );
  await dbQuery(`ALTER TABLE order_line_items ADD COLUMN IF NOT EXISTS category TEXT;`);

  await dbQuery(`
    INSERT INTO order_line_items (
      order_id, sort_order, product_title, product_slug, size_label, size_dimensions,
      quantity, price_per_piece, line_total
    )
    SELECT
      po.id, 0, po.product_title, po.product_slug, po.size_label, po.size_dimensions,
      po.quantity, COALESCE(po.price_per_piece, 0), COALESCE(po.line_total, 0)
    FROM product_orders po
    WHERE po.product_title IS NOT NULL AND po.product_title <> ''
      AND NOT EXISTS (SELECT 1 FROM order_line_items oli WHERE oli.order_id = po.id)
  `);

  await dbQuery(`
    UPDATE product_orders po
    SET grand_total = COALESCE(po.grand_total, po.line_total)
    WHERE po.grand_total IS NULL AND po.line_total IS NOT NULL
  `);
}

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
      cta_source TEXT NOT NULL DEFAULT 'place_order' CHECK (cta_source IN ('place_order', 'add_to_cart', 'custom_quote', 'admin')),
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
  await migrateProductOrderPaymentColumns();
  await migrateProductOrderCtaAndInvoice();
  await migrateProductOrderTotalsAndDueDate();
  await migrateOrderLineItemsTable();

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
