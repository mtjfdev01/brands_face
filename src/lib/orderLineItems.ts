import { dbQuery } from "@/lib/postgres";
import { ensureProductOrderSchema } from "@/lib/productOrderSchema";

export type OrderLineItemRow = {
  id: number;
  order_id: number;
  sort_order: number;
  product_title: string;
  product_slug: string | null;
  category: string | null;
  size_label: string | null;
  size_dimensions: string | null;
  quantity: number;
  price_per_piece: string;
  line_total: string;
  discounted_line_total: string | null;
};

export type OrderLineItemInput = {
  productTitle: string;
  productSlug?: string | null;
  category?: string | null;
  sizeLabel?: string | null;
  sizeDimensions?: string | null;
  quantity: number;
  pricePerPiece: number;
  lineTotal?: number;
  discountedLineTotal?: number | null;
};

export function computeLineTotal(quantity: number, pricePerPiece: number): number {
  return Math.round(quantity * pricePerPiece * 100) / 100;
}

export function sumLineTotals(items: { lineTotal: number; discountedLineTotal?: number | null }[]): {
  grandTotal: number;
  discountedGrandTotal: number | null;
} {
  const grandTotal = Math.round(items.reduce((s, i) => s + i.lineTotal, 0) * 100) / 100;
  const anyDiscount = items.some((i) => i.discountedLineTotal != null && Number.isFinite(i.discountedLineTotal));
  if (!anyDiscount) {
    return { grandTotal, discountedGrandTotal: null };
  }
  const discountedGrandTotal =
    Math.round(
      items.reduce((s, i) => s + (i.discountedLineTotal ?? i.lineTotal), 0) * 100,
    ) / 100;
  return { grandTotal, discountedGrandTotal };
}

/** Payable amount for checkout (discount wins when set). */
export function resolvePayableTotal(order: {
  discounted_grand_total?: string | null;
  grand_total?: string | null;
  line_total?: string | null;
}): number {
  const discounted = order.discounted_grand_total != null ? Number(order.discounted_grand_total) : NaN;
  if (Number.isFinite(discounted) && discounted >= 0) return discounted;
  const grand = order.grand_total != null ? Number(order.grand_total) : NaN;
  if (Number.isFinite(grand) && grand > 0) return grand;
  const legacy = order.line_total != null ? Number(order.line_total) : NaN;
  return Number.isFinite(legacy) ? legacy : 0;
}

export async function insertOrderLineItems(orderId: number, items: OrderLineItemInput[]): Promise<void> {
  await ensureProductOrderSchema();
  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    const lineTotal =
      item.lineTotal != null && Number.isFinite(item.lineTotal)
        ? item.lineTotal
        : computeLineTotal(item.quantity, item.pricePerPiece);
    const discounted =
      item.discountedLineTotal != null && Number.isFinite(item.discountedLineTotal)
        ? item.discountedLineTotal
        : null;

    await dbQuery(
      `INSERT INTO order_line_items (
        order_id, sort_order, product_title, product_slug, category, size_label, size_dimensions,
        quantity, price_per_piece, line_total, discounted_line_total
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)`,
      [
        orderId,
        i,
        item.productTitle.trim(),
        item.productSlug?.trim() || null,
        item.category?.trim() || null,
        item.sizeLabel?.trim() || null,
        item.sizeDimensions?.trim() || null,
        item.quantity,
        item.pricePerPiece,
        lineTotal,
        discounted,
      ],
    );
  }
}

export async function fetchOrderLineItems(orderId: number): Promise<OrderLineItemRow[]> {
  await ensureProductOrderSchema();
  const result = await dbQuery<OrderLineItemRow>(
    `SELECT
      id, order_id, sort_order, product_title, product_slug, category, size_label, size_dimensions,
      quantity, price_per_piece::text, line_total::text, discounted_line_total::text
    FROM order_line_items
    WHERE order_id = $1
    ORDER BY sort_order ASC, id ASC`,
    [orderId],
  );
  return result.rows;
}
