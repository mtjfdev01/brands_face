"use client";

import type { ComponentType, ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { defaultCategoryHubPath } from "@/lib/routes";
import {
  SITE_ADDRESS_LINES,
  SITE_CONTACT_EMAIL,
  SITE_FOOTER_TAGLINE,
  SITE_NTN,
} from "@/data/siteContact";

/** Replace with `/assets/images/footer-cta-box.png` (or your asset path) when the hero box render is ready. */
const FOOTER_CTA_BOX_SRC = "/assets/images/cta_box.png"; 

const FOREST = "#062118";
const SAGE = "#6B8E6B";
const CREAM = "#FAF9F6";

/** Mobile bottom bar (minimal strip — matches light cream + muted green icons) */
const FOOTER_MOBILE_BAR_BG = "#FDFCF8";
const FOOTER_MOBILE_BAR_ICON = "#4A5D4E";
const FOOTER_MOBILE_BAR_TEXT = "#4B4B4B";
const FOOTER_MOBILE_BAR_RULE = "#D1D1D1";

const COMPANY = [
  { label: "About us", href: "/about" },
  { label: "Services", href: defaultCategoryHubPath() },
  { label: "Case studies", href: "/case-studies" },
  { label: "Our process", href: "/#how-it-works" },
  { label: "Get Quote", href: "/quote" },
];

const LEGAL_AND_SUPPORT = [
  { label: "Support", href: "/support" },
  { label: "Privacy policy", href: "/privacy-policy" },
  { label: "Terms & conditions", href: "/terms-and-conditions" },
  { label: "Refund policy", href: "/refund-policy" },
  { label: "Shipping policy", href: "/shipping-policy" },
  { label: "Whistleblowing policy", href: "/whistleblowing-policy" },
];

const phones = ["+92 300 0337680", "+1 (603) 825-0565"] as const;

function telHref(raw: string) {
  return `tel:+${raw.replace(/\D/g, "")}`;
}

function LeafIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M12 3c-4 4-6 8.5-5.5 12 .5 4 3.5 6.5 5.5 7 2-.5 5-3 5.5-7 .5-3.5-1.5-8-5.5-12Z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
      <path d="M12 22V12" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

function LeafDecoration({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 200 200" fill="none" aria-hidden>
      <path
        d="M160 40c-28 18-48 48-52 82-4 28 6 54 22 68M120 28c-18 32-22 70-12 102M90 20c-8 38 2 78 24 104M45 35c-6 42 8 80 32 98"
        stroke="currentColor"
        strokeWidth="0.8"
        strokeLinecap="round"
        opacity="0.35"
      />
    </svg>
  );
}

function ChevronRight({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ChevronDown({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function PhoneIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.12.86.3 1.7.54 2.5a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.8.24 1.64.42 2.5.54A2 2 0 0 1 22 16.92z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function MailIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M4 6h16v12H4V6Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path d="m4 7 8 6 8-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function MapPinIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M12 21s7-4.35 7-10a7 7 0 1 0-14 0c0 5.65 7 10 7 10Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="11" r="2.5" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

function DocumentIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path d="M14 2v6h6M8 13h8M8 17h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" />
    </svg>
  );
}

function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64v-3.5a6.34 6.34 0 0 0-1-.09A6.34 6.34 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1Z" />
    </svg>
  );
}

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.95v5.66H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29ZM5.34 7.43a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14ZM7.12 20.45H3.56V9h3.56v11.45Z" />
    </svg>
  );
}

const SOCIAL: { label: string; href: string; icon: ComponentType<{ className?: string }> }[] = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/brands.face?igsh=OWRuZnpxdmt0YmJn",
    icon: InstagramIcon,
  },
  {
    label: "TikTok",
    href: "https://www.tiktok.com/@brandsface?_r=1&_t=ZS-94Z4BX3eAku",
    icon: TikTokIcon,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/brands-face/",
    icon: LinkedInIcon,
  },
];

function ColumnTitle({ children }: { children: ReactNode }) {
  return (
    <div className="mb-3">
      <div className="flex items-center gap-2" style={{ color: FOREST }}>
        <LeafIcon className="h-4 w-4 shrink-0 opacity-80" />
        <h3 className="text-[11px] font-bold uppercase tracking-[0.16em] sm:text-xs">{children}</h3>
      </div>
      <div className="mt-2.5 hidden h-px w-11 sm:block sm:w-12" style={{ backgroundColor: SAGE }} />
    </div>
  );
}

function FooterLinkList({ items }: { items: { label: string; href: string }[] }) {
  return (
    <ul className="space-y-0.5">
      {items.map((l) => (
        <li key={l.href} className="min-w-0">
          <Link
            href={l.href}
            className="group flex min-w-0 items-center justify-between gap-3 border-b border-[#062118]/08 py-2.5 text-sm transition-colors hover:text-[#062118]"
            style={{ color: `${FOREST}cc` }}
          >
            <span className="min-w-0 break-words">{l.label}</span>
            <ChevronRight className="h-4 w-4 shrink-0 opacity-40 transition group-hover:translate-x-0.5 group-hover:opacity-70" />
          </Link>
        </li>
      ))}
    </ul>
  );
}

/** Three columns — mobile only (Company 3+2; Legal & support inside mobile accordion). */
function FooterLinkGridCols3({ items }: { items: { label: string; href: string }[] }) {
  return (
    <ul className="grid grid-cols-3 gap-x-2 gap-y-0.5 sm:gap-x-3">
      {items.map((l) => (
        <li key={l.href} className="min-w-0">
          <Link
            href={l.href}
            className="group flex min-h-[2.625rem] items-center justify-between gap-1 border-b border-[#062118]/08 py-2 text-left text-xs leading-snug transition-colors hover:text-[#062118] sm:min-h-0 sm:py-2.5 sm:text-sm"
            style={{ color: `${FOREST}cc` }}
          >
            <span className="min-w-0 break-words">{l.label}</span>
            <ChevronRight className="h-3 w-3 shrink-0 opacity-40 transition group-hover:translate-x-0.5 group-hover:opacity-70 sm:h-4 sm:w-4" />
          </Link>
        </li>
      ))}
    </ul>
  );
}

/** Mobile-only: render links in a single horizontal row separated by pipes. */
function FooterLinkRowWithPipes({ items }: { items: { label: string; href: string }[] }) {
  return (
    <div className="flex min-w-0 items-center justify-center py-1">
      <ul className="flex min-w-0 flex-wrap items-center justify-center">
        {items.map((l, idx) => (
          <li key={l.href} className="flex items-center">
            {idx > 0 ? (
              <span className="px-1.5 opacity-40" style={{ color: FOREST }} aria-hidden>
                |
              </span>
            ) : null}
            <Link
              href={l.href}
              className="whitespace-nowrap py-1.5 text-[10px] font-medium leading-none transition-colors hover:text-[#062118] sm:py-2 sm:text-xs"
              style={{ color: `${FOREST}cc` }}
            >
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

/**
 * Mobile-only: 2 rows × 3 columns with pipe separators.
 * Column ratio: 30% / 30% / 40% (approx via 3fr/3fr/4fr).
 */
function FooterLinkTwoRowsPipes303040({ items }: { items: { label: string; href: string }[] }) {
  const row1 = items.slice(0, 3);
  const row2 = items.slice(3, 6);

  const Row = ({ row }: { row: { label: string; href: string }[] }) => (
    <div className="grid min-w-0 grid-cols-[3fr_auto_3fr_auto_4fr] items-center">
      {row.map((l, idx) => (
        <div key={l.href} className="contents">
          {idx > 0 ? (
            <span className="px-2 text-center opacity-40" style={{ color: FOREST }} aria-hidden>
              |
            </span>
          ) : null}
          <Link
            href={l.href}
            className="block min-w-0 truncate py-2 text-center text-[11px] font-medium leading-none transition-colors hover:text-[#062118]"
            style={{ color: `${FOREST}cc` }}
            title={l.label}
          >
            {l.label}
          </Link>
        </div>
      ))}
    </div>
  );

  return (
    <div className="space-y-1">
      <Row row={row1} />
      <Row row={row2} />
    </div>
  );
}

/** Mobile-only collapsible block (e.g. Legal & support). Desktop uses static columns. */
function FooterMobileAccordion({ title, children }: { title: string; children: ReactNode }) {
  return (
    <details className="group min-w-0 border-b border-[#062118]/10">
      <summary className="flex cursor-pointer list-none items-start justify-between gap-3 py-3 transition-opacity duration-200 hover:opacity-90 [&::-webkit-details-marker]:hidden">
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2" style={{ color: FOREST }}>
            <LeafIcon className="h-4 w-4 shrink-0 opacity-80" />
            <h3 className="text-[11px] font-bold uppercase tracking-[0.16em] sm:text-xs">{title}</h3>
          </div>
          {/* <div className="mt-2.5 h-px w-11 sm:w-12" style={{ backgroundColor: SAGE }} /> */}
        </div>
        <span
          className="mt-0.5 shrink-0 opacity-50 transition-transform duration-300 ease-out motion-reduce:transition-none group-open:rotate-180"
          style={{ color: FOREST }}
        >
          <ChevronDown className="h-5 w-5" />
        </span>
      </summary>
      <div className="grid grid-rows-[0fr] transition-[grid-template-rows] duration-300 ease-out motion-reduce:transition-none group-open:grid-rows-[1fr]">
        <div className="min-h-0 overflow-hidden">
          <div className="border-t border-[#062118]/08 pb-3 pt-2">{children}</div>
        </div>
      </div>
    </details>
  );
}

export default function Footer() {
  const year = new Date().getFullYear();
  const addressSingleLine = SITE_ADDRESS_LINES.join(", ");

  return (
    <footer className="relative w-full overflow-hidden">
      {/* ── CTA banner (same surface color as main footer) ── */}
      <div
        className="relative z-10 w-full border-b border-[#062118]/10 px-4 py-8 sm:px-6 sm:py-10 lg:px-10 lg:py-8"
        style={{ backgroundColor: CREAM }}
      >
        <div className="mx-auto max-w-[1240px]">
          <div
            className="relative overflow-hidden rounded-[22px] border border-white/80 bg-white shadow-[0_8px_40px_rgba(6,33,24,0.12),0_2px_8px_rgba(6,33,24,0.06)] ring-1 ring-[#062118]/[0.07] "
          >
          <div
            className="pointer-events-none absolute -right-4 top-0 h-full w-[45%] max-w-[220px] text-[#6B8E6B]/25 sm:right-0 sm:max-w-[280px]"
            aria-hidden
          >
            <LeafDecoration className="h-full w-full" />
          </div>

          <div
            className="relative z-[1] grid grid-cols-1 items-center gap-6 rounded-[18px] px-2 py-3 sm:gap-6 sm:px-5 sm:py-6 lg:grid-cols-12 lg:gap-6 lg:items-center lg:px-5 lg:py-3"
            style={{ backgroundColor: CREAM }}
          >
            <div className="flex justify-center lg:col-span-3 lg:justify-start">
              <div className="relative aspect-square w-full max-w-[160px] sm:max-w-[190px] lg:max-w-[200px]">
                <Image
                  src={FOOTER_CTA_BOX_SRC}
                  alt="Sustainable packaging box"
                  fill
                  className="object-contain object-bottom drop-shadow-[0_12px_28px_rgba(6,33,24,0.1)]"
                  sizes="200px"
                  priority={false}
                />
              </div>
            </div>

            <div className="text-center lg:col-span-6 lg:text-left">
              <h2
                className="-mt-4 font-serif text-xl font-bold leading-snug tracking-tight sm:mt-0 sm:text-2xl lg:text-[1.65rem] lg:leading-snug"
                style={{ color: FOREST }}
              >
                Ready to build packaging that{" "}
                <span className="relative inline-block" style={{ color: SAGE }}>
                  gr
                  <span className="relative inline-block">
                    o
                    <LeafIcon className="absolute -top-3 left-1/2 h-3.5 w-3.5 -translate-x-1/2 text-[#6B8E6B]" />
                  </span>
                  ws
                </span>{" "}
                your brand?
              </h2>
              <p
                className="mt-2.5 hidden max-w-xl text-sm leading-relaxed sm:block sm:text-[0.9375rem] lg:mx-0 lg:max-w-none"
                style={{ color: `${FOREST}99` }}
              >
                Sustainable. Custom. Impactful. Let&apos;s create packaging that speaks for your brand and cares for the
                planet.
              </p>
            </div>

            <div className="flex justify-center lg:col-span-3 lg:justify-end">
              <Link
                href="/quote"
                className="inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold text-white shadow-lg transition-transform hover:scale-[1.02] active:scale-[0.98]"
                style={{ backgroundColor: FOREST, boxShadow: "0 12px 32px rgba(6,33,24,0.25)" }}
              >
                Get a Quote
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" aria-hidden>
                  <path
                    d="M5 12h14M13 6l6 6-6 6"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Link>
            </div>
          </div>
        </div>
        </div>
      </div>

      {/* ── Main footer columns ── */}
      <div className="relative z-10 w-full" style={{ backgroundColor: CREAM }}>
        <div className="mx-auto max-w-[1280px] px-2 pb-2 sm:px-6 lg:px-4 lg:pt-8 sm:pb-0">
        <div className="grid min-w-0 grid-cols-1 gap-4 lg:grid-cols-12 lg:gap-0 lg:divide-x lg:divide-[#062118]/12">
          {/* Brand */}
          <div className="lg:col-span-3 lg:pr-5 xl:pr-7">
            <div className="flex w-full flex-col items-center gap-0 sm:gap-4">
              <div className="relative mx-auto mb-2 h-[128px] w-[128px] shrink-0 sm:h-[140px] sm:w-[140px]">
                <Image
                  src="/assets/images/sustainable.png"
                  alt="Brands Face"
                  fill
                  className="object-contain object-center"
                  sizes="140px"
                />
              </div>
              <div className="relative h-11 w-[min(100%,200px)] shrink-0 overflow-hidden rounded-xl border border-white/15 bg-[rgb(18_59_43)] shadow-sm sm:h-12 sm:w-[220px] lg:w-[228px]">
                <Image
                  src="/assets/images/logos/logo.png"
                  alt="Brands Face"
                  fill
                  className="object-contain object-center px-2 py-1"
                  sizes="(max-width: 640px) 200px, (max-width: 1024px) 220px, 228px"
                />
              </div>
            </div>
            {/* <p
              className="mt-5 text-center text-sm leading-relaxed lg:text-left"
              style={{ color: `${FOREST}99` }}
            >
              We design and manufacture custom packaging that elevates perception, strengthens shelf presence, and
              reflects your commitment to a healthier planet.
            </p> */}
            <ul className="mt-6 flex w-full flex-row items-center justify-between gap-2 sm:gap-3">
              <li
                className="flex min-w-0 flex-[2_1_0%] items-center  sm:flex-1 sm:basis-0"
                style={{ color: FOREST }}
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#6B8E6B]/22 text-[#2d5a3d]">
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden>
                    <path d="M12 2 4 6v12l8 4 8-4V6l-8-4Z" strokeLinejoin="round" />
                    <path d="m4 6 8 4 8-4M12 10v12" strokeLinecap="round" />
                  </svg>
                </span>
                <span className="flex min-w-0 flex-col text-[11px] font-semibold leading-tight sm:text-xs">
                  <span>Custom Solutions</span>
                </span>
              </li>
              <li
                className="flex min-w-0 flex-[3_1_0%] items-center sm:flex-1 sm:basis-0"
                style={{ color: FOREST }}
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#6B8E6B]/22 text-[#2d5a3d]">
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden>
                    <circle cx="12" cy="12" r="9" />
                    <path d="M3 12h18M12 3a15 15 0 0 1 0 18" strokeLinecap="round" />
                  </svg>
                </span>
                <span className="flex min-w-0 flex-col text-[11px] font-semibold leading-tight sm:text-xs">
                  <span>Better for
                  The Planet</span>
                </span>
              </li>
            </ul>
          </div>

          {/* Company — 3-col grid on mobile; list on desktop */}
          <div className="lg:col-span-2 lg:px-5 xl:px-7">
            <div className="lg:hidden">
              <FooterLinkRowWithPipes items={COMPANY} />
            </div>
            <div className="hidden lg:block">
              <ColumnTitle>Company</ColumnTitle>
              <FooterLinkList items={COMPANY} />
            </div>
          </div>

          {/* Legal & support — mobile: one accordion; desktop: static column */}
          <div className="lg:col-span-3 lg:px-8 xl:px-10">
            <div className="lg:hidden">
              <FooterMobileAccordion title="Legal &amp; support">
                <FooterLinkTwoRowsPipes303040 items={LEGAL_AND_SUPPORT} />
              </FooterMobileAccordion>
            </div>
            <div className="hidden lg:block">
              <ColumnTitle>Legal &amp; support</ColumnTitle>
              <FooterLinkList items={LEGAL_AND_SUPPORT} />
            </div>
          </div>

          {/* Social & contact — two columns + address card */}
          <div className="min-w-0 lg:col-span-4 lg:pl-6 xl:pl-8">
            <div className="mb-3 hidden min-w-0 max-w-full flex-col lg:inline-flex">
              <div className="flex items-center gap-2" style={{ color: FOREST }}>
                <h3 className="text-[11px] font-bold uppercase tracking-[0.16em] sm:text-xs">
                  Social &amp; contact
                </h3>
                <LeafIcon className="h-4 w-4 shrink-0 opacity-80 text-[#6B8E6B]" aria-hidden />
              </div>
              <div className="mt-2.5 h-px w-full" style={{ backgroundColor: SAGE }} />
            </div>

            <div className="grid min-w-0 grid-cols-[minmax(0,4fr)_minmax(0,6fr)] divide-x divide-[#062118]/12 md:grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)] md:items-start">
              <ul className="min-w-0 space-y-4 pr-3 sm:space-y-4 sm:pr-4 md:pr-3 lg:pr-4 [box-shadow:1px_0_0_rgba(6,33,24,0.14)]">
                {SOCIAL.map(({ label, href, icon: Icon }) => (
                  <li key={label} className="min-w-0">
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex min-w-0 items-center gap-2.5 text-sm font-medium transition-colors hover:opacity-80 sm:gap-3"
                      style={{ color: FOREST }}
                    >
                      <Icon className="h-5 w-5 shrink-0 text-[#6B8E6B]" />
                      <span className="min-w-0 break-words leading-snug">{label}</span>
                    </a>
                  </li>
                ))}
              </ul>

              <ul className="min-w-0 space-y-4 pl-3 sm:space-y-4 sm:pl-4 md:pl-4 lg:pl-5">
                {phones.map((p) => (
                  <li key={p} className="min-w-0">
                    <a
                      href={telHref(p)}
                      className="flex min-w-0 items-center gap-2.5 text-sm font-medium transition-opacity hover:opacity-80 sm:gap-3"
                      style={{ color: FOREST }}
                    >
                      <PhoneIcon className="h-5 w-5 shrink-0 text-[#6B8E6B]" />
                      <span className="min-w-0 break-words leading-snug [overflow-wrap:anywhere]">{p}</span>
                    </a>
                  </li>
                ))}
                <li className="min-w-0">
                  <a
                    href={`mailto:${SITE_CONTACT_EMAIL}`}
                    className="flex min-w-0 items-center gap-2.5 text-sm font-medium transition-opacity hover:opacity-80 sm:gap-3"
                    style={{ color: FOREST }}
                  >
                    <MailIcon className="h-5 w-5 shrink-0 text-[#6B8E6B]" />
                    <span className="min-w-0 break-all leading-snug sm:break-words sm:[overflow-wrap:anywhere]">
                      {SITE_CONTACT_EMAIL}
                    </span>
                  </a>
                </li>
              </ul>
            </div>

            <div
              className="relative mt-6 overflow-hidden rounded-2xl border p-4 sm:p-5"
              style={{
                backgroundColor: "#ede8df",
                borderColor: `${FOREST}14`,
              }}
            >
              <div
                className="pointer-events-none absolute -bottom-4 -right-2 h-28 w-28 text-[#6B8E6B]/20 sm:h-32 sm:w-32"
                aria-hidden
              >
                <LeafDecoration className="h-full w-full" />
              </div>
              <div className="relative flex items-center gap-3 sm:items-start">
                <MapPinIcon className="h-5 w-5 shrink-0 text-[#6B8E6B] sm:mt-0.5" />
                <div className="min-w-0 flex-1 sm:pr-20">
                  {/* Mobile: label + address on one line; scroll if needed */}
                  <p className="flex w-full min-w-0 items-baseline gap-2 text-sm leading-snug sm:hidden">
                    <span className="shrink-0 font-bold" style={{ color: FOREST }}>
                      Address
                    </span>
                    <span
                      className="w-full min-w-0 flex-1 basis-0 overflow-x-auto overflow-y-hidden whitespace-nowrap [scrollbar-width:thin]"
                      style={{ color: `${FOREST}cc` }}
                    >
                      {addressSingleLine}
                    </span>
                  </p>
                  <div className="hidden sm:block">
                    <p className="text-sm font-bold" style={{ color: FOREST }}>
                      Address
                    </p>
                    <p className="mt-1 text-sm leading-snug" style={{ color: `${FOREST}cc` }}>
                      {addressSingleLine}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Bottom bar ── */}
        {/* Mobile: single light strip — copyright | rule | NTN (tagline stays desktop-only) */}
        <div
          className="mt-4 -mx-2 flex flex-nowrap items-center justify-center gap-x-2 overflow-x-auto px-3 py-3 text-center text-[10px] leading-snug sm:hidden"
          style={{
            backgroundColor: FOOTER_MOBILE_BAR_BG,
            borderTop: `1px solid ${FOOTER_MOBILE_BAR_RULE}`,
            color: FOOTER_MOBILE_BAR_TEXT,
          }}
        >
          <span className="inline-flex min-w-0 max-w-full shrink items-center justify-center gap-1.5">
            <span className="shrink-0" style={{ color: FOOTER_MOBILE_BAR_ICON }}>
              <LeafIcon className="h-3.5 w-3.5" />
            </span>
            <span className="min-w-0 whitespace-nowrap">
              &copy; {year} Brands Face. All rights reserved.
            </span>
          </span>
          <span
            className="inline-block h-3 w-px shrink-0 self-center"
            style={{ backgroundColor: FOOTER_MOBILE_BAR_RULE }}
            aria-hidden
          />
          <span className="inline-flex shrink-0 items-center justify-center gap-1.5 whitespace-nowrap">
            <span className="shrink-0" style={{ color: FOOTER_MOBILE_BAR_ICON }}>
              <DocumentIcon className="h-3.5 w-3.5" />
            </span>
            <span>
              {SITE_NTN.label}:{" "}
              <span className="font-semibold tabular-nums" style={{ color: FOOTER_MOBILE_BAR_TEXT }}>
                {SITE_NTN.value}
              </span>
            </span>
          </span>
        </div>

        <div
          className="mt-8 hidden flex-col items-center gap-4 border-t pt-4 text-center text-xs sm:flex sm:flex-row sm:justify-between sm:gap-6 sm:text-left md:pb-2"
          style={{ borderColor: `${FOREST}18`, color: `${FOREST}99` }}
        >
          <span className="inline-flex items-center justify-center gap-2 sm:justify-start">
            <LeafIcon className="h-4 w-4 shrink-0 text-[#6B8E6B] opacity-70" />
            &copy; {year} Brands Face. All rights reserved.
          </span>
          <span className="inline-flex items-center justify-center gap-2">
            <DocumentIcon className="h-4 w-4 shrink-0 text-[#6B8E6B] opacity-70" />
            {SITE_NTN.label}: <span className="font-semibold" style={{ color: FOREST }}>{SITE_NTN.value}</span>
          </span>
          <span className="inline-flex items-center justify-center gap-2 sm:text-right">
            <LeafIcon className="h-4 w-4 shrink-0 text-[#6B8E6B] opacity-70" />
            {SITE_FOOTER_TAGLINE}
          </span>
        </div>
        </div>
      </div>
    </footer>
  );
}
