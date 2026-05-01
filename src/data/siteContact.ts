/**
 * Footer / legal surface copy. Replace with official business details when available.
 */
export const SITE_ADDRESS_LINES = [
  "Brands Face",
  "Karachi, Pakistan",
] as const;

export const SITE_CONTACT_EMAIL =
  process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "info@brandsface.com";

/** Shown on policy pages and footer “last updated” where used. */
export const LEGAL_DOCS_LAST_UPDATED = "19 April 2026";

/** National Tax Number (Pakistan) or equivalent — replace `value` when confirmed. */
export const SITE_NTN = { label: "NTN", value: "1636441" } as const;

export const SITE_PAYMENT_NOTE = "We accept all major credit cards.";

export const SITE_FOOTER_TAGLINE = "Packaging that cares. Brands that grow.";
