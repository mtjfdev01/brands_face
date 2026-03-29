/**
 * Product order / quote pipeline (stored in `product_orders`).
 * Rows are never hard-deleted; closing the loop uses status updates (e.g. cancelled).
 */
export const PRODUCT_ORDER_STATUSES = [
  "pending",
  "responded",
  "in_progress",
  "completed",
  "rejected",
  "cancelled",
] as const;

export type ProductOrderStatus = (typeof PRODUCT_ORDER_STATUSES)[number];

export const PRODUCT_ORDER_STATUS_LABELS: Record<ProductOrderStatus, string> = {
  pending: "Awaiting response",
  responded: "Responded",
  in_progress: "In progress",
  completed: "Completed",
  rejected: "Rejected",
  cancelled: "Cancelled",
};

export function isProductOrderStatus(v: string): v is ProductOrderStatus {
  return (PRODUCT_ORDER_STATUSES as readonly string[]).includes(v);
}
