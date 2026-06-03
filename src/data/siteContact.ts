/**
 * Footer / legal surface copy. Replace with official business details when available.
 */
export const SITE_ADDRESS_LINES = [
  "H#L6, Murtaza Town, Wireless gate, Malir karachi.",
] as const;

export const SITE_CONTACT_EMAIL =
  process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "info@brandsface.com";

/** Shown on policy pages and footer “last updated” where used. */
export const LEGAL_DOCS_LAST_UPDATED = "19 April 2026";

/** National Tax Number (Pakistan) or equivalent — replace `value` when confirmed. */
export const SITE_NTN = { label: "NTN", value: "1636441" } as const;

/** Bank transfer details (footer, invoices, policies). */
export const SITE_BANK_DETAILS = {
  accountTitle: "BRANDS FACE (SMC-PRIVATE) LIMITED",
  accountNumber: "3516499000006659",
  iban: "PK91FAYS3516499000006659",
  swift: "FAYSPKKA",
  bankName: "FAYSAL BANK",
} as const;

export const SITE_PAYMENT_NOTE =
  "Pay online via card or bank transfer to the account below.";

export const SITE_FOOTER_TAGLINE = "Packaging that cares. Brands that grow.";
