/** Display currency for public invoices (USD per business requirement). */
export const INVOICE_CURRENCY_CODE =
  process.env.NEXT_PUBLIC_INVOICE_CURRENCY?.trim() ||
  process.env.INVOICE_CURRENCY?.trim() ||
  "USD";
