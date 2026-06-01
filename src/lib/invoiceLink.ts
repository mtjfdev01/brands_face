import { randomUUID } from "node:crypto";
import { dbQuery } from "@/lib/postgres";
import { ensureProductOrderSchema } from "@/lib/productOrderSchema";

export async function ensureInvoicePublicKey(
  orderId: number,
  options?: { regenerate?: boolean },
): Promise<string> {
  await ensureProductOrderSchema();
  const existing = await dbQuery<{ invoice_public_key: string | null }>(
    `SELECT invoice_public_key FROM product_orders WHERE id = $1`,
    [orderId],
  );
  const row = existing.rows[0];
  if (!row) {
    throw new Error("Order not found.");
  }

  let key = row.invoice_public_key?.trim() || null;
  if (!key || options?.regenerate) {
    key = randomUUID();
    await dbQuery(`UPDATE product_orders SET invoice_public_key = $1, updated_at = NOW() WHERE id = $2`, [
      key,
      orderId,
    ]);
  }
  return key;
}

export function buildPublicInvoiceUrl(orderId: number, invoiceKey: string, origin: string): string {
  const base = origin.replace(/\/$/, "");
  return `${base}/invoice/${orderId}?key=${encodeURIComponent(invoiceKey)}`;
}
