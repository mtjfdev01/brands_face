import { dbQuery } from "@/lib/postgres";
import { ensureCustomerSchema } from "@/lib/customerSchema";
import { ensureProductOrderSchema } from "@/lib/productOrderSchema";

export type PublicInvoiceResponse = {
  order: {
    id: number;
    request_type: string;
    product_title: string;
    product_slug: string;
    quantity: number;
    size_label: string | null;
    size_dimensions: string | null;
    price_per_piece: string | null;
    line_total: string | null;
    customer_notes: string | null;
    created_at: string;
  };
  customer: {
    id: number | null;
    full_name: string;
    email: string;
    phone: string | null;
    company: string | null;
  };
  payment: {
    payment_status: string;
    gateway_error: string | null;
    currency_code: string;
  };
};

/** Public invoice: order id + secret key (query). No admin fields. */
export async function getPublicInvoicePayload(
  orderId: number,
  invoiceKey: string,
): Promise<PublicInvoiceResponse | null> {
  const key = invoiceKey.trim();
  if (!key) return null;

  await ensureProductOrderSchema();
  await ensureCustomerSchema();

  const row = await dbQuery<{
    id: number;
    request_type: string;
    product_title: string;
    product_slug: string;
    quantity: number;
    size_label: string | null;
    size_dimensions: string | null;
    price_per_piece: string | null;
    line_total: string | null;
    full_name: string;
    email: string;
    phone: string | null;
    company: string | null;
    customer_notes: string | null;
    created_at: string;
    payment_status: string;
    gateway_error: string | null;
    invoice_public_key: string | null;
    customer_id: string | null;
  }>(
    `SELECT
      o.id,
      o.request_type,
      o.product_title,
      o.product_slug,
      o.quantity,
      o.size_label,
      o.size_dimensions,
      o.price_per_piece::text,
      o.line_total::text,
      o.full_name,
      o.email,
      o.phone,
      o.company,
      o.customer_notes,
      o.created_at,
      o.payment_status,
      o.gateway_error,
      o.invoice_public_key,
      o.customer_id::text
    FROM product_orders o
    WHERE o.id = $1 AND o.invoice_public_key = $2`,
    [orderId, key],
  );

  const o = row.rows[0];
  if (!o) return null;

  let customerId: number | null = o.customer_id ? Number(o.customer_id) : null;
  let cRow: { id: number; full_name: string; email: string; phone: string | null; company: string | null } | null =
    null;
  if (customerId && Number.isInteger(customerId)) {
    const cr = await dbQuery<{
      id: number;
      full_name: string;
      email: string;
      phone: string | null;
      company: string | null;
    }>(`SELECT id, full_name, email, phone, company FROM customers WHERE id = $1`, [customerId]);
    cRow = cr.rows[0] ?? null;
  }

  const currency = process.env.PAYFAST_CURRENCY_CODE?.trim() || "PKR";

  return {
    order: {
      id: o.id,
      request_type: o.request_type,
      product_title: o.product_title,
      product_slug: o.product_slug,
      quantity: o.quantity,
      size_label: o.size_label,
      size_dimensions: o.size_dimensions,
      price_per_piece: o.price_per_piece,
      line_total: o.line_total,
      customer_notes: o.customer_notes,
      created_at: o.created_at,
    },
    customer: {
      id: cRow?.id ?? null,
      full_name: cRow?.full_name ?? o.full_name,
      email: cRow?.email ?? o.email,
      phone: cRow?.phone ?? o.phone,
      company: cRow?.company ?? o.company,
    },
    payment: {
      payment_status: o.payment_status,
      gateway_error: o.gateway_error,
      currency_code: currency,
    },
  };
}
