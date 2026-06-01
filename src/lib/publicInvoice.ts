import { dbQuery } from "@/lib/postgres";
import { ensureCustomerSchema } from "@/lib/customerSchema";
import { isInvoiceDueDateExpired } from "@/lib/invoiceDueDate";
import { fetchOrderLineItems, resolvePayableTotal } from "@/lib/orderLineItems";
import { ensureProductOrderSchema } from "@/lib/productOrderSchema";
import { SITE_CONTACT_EMAIL } from "@/data/siteContact";
import { getOrderCategory } from "@/lib/orderCategories";
import { INVOICE_CURRENCY_CODE } from "@/lib/invoiceCurrency";

export const INVOICE_EXPIRED_MESSAGE =
  "This invoice link has expired because the due date has passed. Please contact our support team to request a new invoice.";

export type PublicInvoiceExpiredResponse = {
  expired: true;
  due_date: string;
  support_email: string;
  message: string;
};

export type PublicInvoiceResult =
  | { status: "ok"; data: PublicInvoiceResponse }
  | { status: "not_found" }
  | { status: "expired"; expired: PublicInvoiceExpiredResponse };

export type PublicInvoiceLineItem = {
  product_title: string;
  category: string | null;
  category_label: string | null;
  category_image: string | null;
  size_label: string | null;
  size_dimensions: string | null;
  quantity: number;
  price_per_piece: string;
  line_total: string;
  discounted_line_total: string | null;
};

export type PublicInvoiceResponse = {
  order: {
    id: number;
    request_type: string;
    created_at: string;
    due_date: string | null;
    customer_notes: string | null;
    grand_total: string | null;
    discounted_grand_total: string | null;
    payable_total: string;
    /** @deprecated First-line legacy fields when needed */
    product_title?: string;
    product_slug?: string;
    quantity?: number;
    size_label?: string | null;
    size_dimensions?: string | null;
    price_per_piece?: string | null;
    line_total?: string | null;
  };
  line_items: PublicInvoiceLineItem[];
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
export async function resolvePublicInvoice(
  orderId: number,
  invoiceKey: string,
): Promise<PublicInvoiceResult> {
  const key = invoiceKey.trim();
  if (!key) return { status: "not_found" };

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
    grand_total: string | null;
    discounted_grand_total: string | null;
    due_date: string | null;
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
      o.grand_total::text,
      o.discounted_grand_total::text,
      o.due_date::text,
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
  if (!o) return { status: "not_found" };

  if (
    o.due_date &&
    isInvoiceDueDateExpired(o.due_date) &&
    o.payment_status !== "paid"
  ) {
    return {
      status: "expired",
      expired: {
        expired: true,
        due_date: o.due_date.slice(0, 10),
        support_email: SITE_CONTACT_EMAIL,
        message: INVOICE_EXPIRED_MESSAGE,
      },
    };
  }

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

  const items = await fetchOrderLineItems(orderId);
  const line_items: PublicInvoiceLineItem[] =
    items.length > 0
      ? items.map((li) => {
          const cat = getOrderCategory(li.category);
          return {
            product_title: li.product_title,
            category: li.category,
            category_label: cat?.title ?? null,
            category_image: cat?.image ?? null,
            size_label: li.size_label,
            size_dimensions: li.size_dimensions,
            quantity: li.quantity,
            price_per_piece: li.price_per_piece,
            line_total: li.line_total,
            discounted_line_total: li.discounted_line_total,
          };
        })
      : [
          {
            product_title: o.product_title,
            category: null,
            category_label: getOrderCategory(o.product_slug)?.title ?? null,
            category_image: getOrderCategory(o.product_slug)?.image ?? null,
            size_label: o.size_label,
            size_dimensions: o.size_dimensions,
            quantity: o.quantity,
            price_per_piece: o.price_per_piece ?? "0",
            line_total: o.line_total ?? "0",
            discounted_line_total: null,
          },
        ];

  const payable = resolvePayableTotal({
    discounted_grand_total: o.discounted_grand_total,
    grand_total: o.grand_total,
    line_total: o.line_total,
  });

  const currency = INVOICE_CURRENCY_CODE;

  return {
    status: "ok",
    data: {
    order: {
      id: o.id,
      request_type: o.request_type,
      created_at: o.created_at,
      due_date: o.due_date,
      customer_notes: o.customer_notes,
      grand_total: o.grand_total,
      discounted_grand_total: o.discounted_grand_total,
      payable_total: String(payable),
      product_title: o.product_title,
      product_slug: o.product_slug,
      quantity: o.quantity,
      size_label: o.size_label,
      size_dimensions: o.size_dimensions,
      price_per_piece: o.price_per_piece,
      line_total: o.line_total,
    },
    line_items,
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
    },
  };
}

/** @deprecated Use resolvePublicInvoice — returns payload only when ok. */
export async function getPublicInvoicePayload(
  orderId: number,
  invoiceKey: string,
): Promise<PublicInvoiceResponse | null> {
  const result = await resolvePublicInvoice(orderId, invoiceKey);
  return result.status === "ok" ? result.data : null;
}
