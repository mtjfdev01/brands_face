export type PayfastCheckoutLead = {
  customerPhone: string;
  customerEmail: string;
};

export type PayfastCheckoutBranding = {
  merchantName: string;
  txndesc: string;
  successUrl: string;
  failureUrl: string;
  /** IPN / server notify URL (CHECKOUT_URL in gateway docs) */
  checkoutUrl: string;
  currencyCode: string;
};
