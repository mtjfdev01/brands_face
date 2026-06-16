/** Invoice / checkout payment state on `product_orders.payment_status`. */
export const PRODUCT_ORDER_PAYMENT_STATUSES = [
  "unpaid",
  "pending_checkout",
  "paid",
  "failed",
  "refunded",
] as const;

export type ProductOrderPaymentStatus = (typeof PRODUCT_ORDER_PAYMENT_STATUSES)[number];

export const PRODUCT_ORDER_PAYMENT_STATUS_LABELS: Record<ProductOrderPaymentStatus, string> = {
  unpaid: "Unpaid",
  pending_checkout: "Pending checkout",
  paid: "Paid",
  failed: "Failed",
  refunded: "Refunded",
};

export function isProductOrderPaymentStatus(v: string): v is ProductOrderPaymentStatus {
  return (PRODUCT_ORDER_PAYMENT_STATUSES as readonly string[]).includes(v);
}

/** When false, PayFast IPN does not change payment_status (admin updates manually). */
export const PAYFAST_IPN_AUTO_UPDATE_PAYMENT_STATUS = false;
