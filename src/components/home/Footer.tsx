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
const FOOTER_CTA_BOX_SRC = "/assets/images/cta_box.webp"; 

const FOREST = "#062118";
const SAGE = "#6B8E6B";
const CREAM = "#FAF9F6";

const COMPANY = [
  { label: "About us", href: "/about" },
  { label: "Services", href: defaultCategoryHubPath() },
  { label: "Case studies", href: "/case-studies" },
  { label: "Our process", href: "/#how-it-works" },
  { label: "Contact us", href: "/quote" },
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
    <div className="mb-5">
      <div className="flex items-center gap-2" style={{ color: FOREST }}>
        <LeafIcon className="h-4 w-4 shrink-0 opacity-80" />
        <h3 className="text-[11px] font-bold uppercase tracking-[0.16em] sm:text-xs">{children}</h3>
      </div>
      <div className="mt-2.5 h-px w-11 sm:w-12" style={{ backgroundColor: SAGE }} />
    </div>
  );
}

export default function Footer() {
  const year = new Date().getFullYear();
  const addressSingleLine = SITE_ADDRESS_LINES.join(", ");

  return (
    <footer className="relative w-full overflow-hidden">
      {/* ── CTA: separate banner strip (not same surface as footer) ── */}
      <div className="relative z-10 w-full border-b border-[#062118]/10  px-4 py-10 sm:px-6 sm:py-12 lg:px-10 lg:py-14">
        <div className="mx-auto max-w-[1240px]">
          <div
            className="relative overflow-hidden rounded-[22px] border border-white/80 bg-white px-4 py-5 shadow-[0_8px_40px_rgba(6,33,24,0.12),0_2px_8px_rgba(6,33,24,0.06)] ring-1 ring-[#062118]/[0.07] sm:px-6 sm:py-6 lg:px-8 lg:py-7"
          >
          <div
            className="pointer-events-none absolute -right-4 top-0 h-full w-[45%] max-w-[220px] text-[#6B8E6B]/25 sm:right-0 sm:max-w-[280px]"
            aria-hidden
          >
            <LeafDecoration className="h-full w-full" />
          </div>

          <div className="relative z-[1] grid grid-cols-1 items-center gap-6 lg:grid-cols-12 lg:gap-6 lg:items-center">
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
                className="font-serif text-xl font-bold leading-snug tracking-tight sm:text-2xl lg:text-[1.65rem] lg:leading-snug"
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
                className="mt-2.5 max-w-xl text-sm leading-relaxed sm:text-[0.9375rem] lg:mx-0 lg:max-w-none"
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
        <div className="mx-auto max-w-[1280px] px-4 pb-12 pt-12 sm:px-6 lg:px-10 lg:pt-14">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-0 lg:divide-x lg:divide-[#062118]/12">
          {/* Brand */}
          <div className="lg:col-span-3 lg:pr-8 xl:pr-10">
            <div className="flex flex-col items-center text-center sm:flex-row sm:items-start sm:text-left">
              <div className="relative mb-4 h-[88px] w-[88px] shrink-0 sm:mb-0 sm:mr-4">
                <Image
                  src="/assets/images/sustainable.png"
                  alt="Brands Face"
                  fill
                  className="object-contain"
                  sizes="88px"
                />
              </div>
              <div className="min-w-0 flex-1">
                <div className="relative mx-auto h-10 w-[min(100%,176px)] overflow-hidden rounded-xl border border-white/15 bg-[rgb(18_59_43)] shadow-sm sm:mx-0 sm:h-11 sm:w-[186px]">
                  <Image
                    src="/assets/images/logos/logo.png"
                    alt="Brands Face"
                    fill
                    className="object-contain object-center p-1.5 sm:object-left sm:pl-2"
                    sizes="(max-width: 640px) 176px, 186px"
                  />
                </div>
                <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.14em]" style={{ color: SAGE }}>
                  Sustainable packaging solutions
                </p>
              </div>
            </div>
            <p className="mt-5 text-sm leading-relaxed" style={{ color: `${FOREST}99` }}>
              We design and manufacture custom packaging that elevates perception, strengthens shelf presence, and
              reflects your commitment to a healthier planet.
            </p>
            <ul className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-x-6 sm:gap-y-3">
              <li className="flex items-center gap-2 text-xs font-medium sm:text-sm" style={{ color: FOREST }}>
                <LeafIcon className="h-4 w-4 shrink-0 text-[#6B8E6B] opacity-80" />
                Sustainable materials
              </li>
              <li className="flex items-center gap-2 text-xs font-medium sm:text-sm" style={{ color: FOREST }}>
                <svg className="h-4 w-4 shrink-0 text-[#6B8E6B]" viewBox="0 0 24 24" fill="none" aria-hidden>
                  <path
                    d="M12 2l2.4 7.4H22l-6 4.6 2.3 7L12 16.9 5.7 21l2.3-7-6-4.6h7.6L12 2Z"
                    stroke="currentColor"
                    strokeWidth="1.3"
                    strokeLinejoin="round"
                  />
                </svg>
                Custom solutions
              </li>
              <li className="flex items-center gap-2 text-xs font-medium sm:text-sm" style={{ color: FOREST }}>
                <svg className="h-4 w-4 shrink-0 text-[#6B8E6B]" viewBox="0 0 24 24" fill="none" aria-hidden>
                  <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.3" />
                  <path d="M3 12h18M12 3a15 15 0 0 1 0 18" stroke="currentColor" strokeWidth="1.3" />
                </svg>
                Better for the planet
              </li>
            </ul>
          </div>

          {/* Company */}
          <div className="lg:col-span-3 lg:px-8 xl:px-10">
            <ColumnTitle>Company</ColumnTitle>
            <ul className="space-y-0.5">
              {COMPANY.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="group flex items-center justify-between gap-3 border-b border-[#062118]/08 py-2.5 text-sm transition-colors hover:text-[#062118]"
                    style={{ color: `${FOREST}cc` }}
                  >
                    <span>{l.label}</span>
                    <ChevronRight className="h-4 w-4 shrink-0 opacity-40 transition group-hover:translate-x-0.5 group-hover:opacity-70" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div className="lg:col-span-3 lg:px-8 xl:px-10">
            <ColumnTitle>Legal &amp; support</ColumnTitle>
            <ul className="space-y-0.5">
              {LEGAL_AND_SUPPORT.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="group flex items-center justify-between gap-3 border-b border-[#062118]/08 py-2.5 text-sm transition-colors hover:text-[#062118]"
                    style={{ color: `${FOREST}cc` }}
                  >
                    <span>{l.label}</span>
                    <ChevronRight className="h-4 w-4 shrink-0 opacity-40 transition group-hover:translate-x-0.5 group-hover:opacity-70" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social & contact */}
          <div className="lg:col-span-3 lg:pl-8 xl:pl-10">
            <ColumnTitle>Social &amp; contact</ColumnTitle>
            <ul className="space-y-2">
              {SOCIAL.map(({ label, href, icon: Icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-sm transition-colors hover:opacity-80"
                    style={{ color: FOREST }}
                  >
                    <Icon className="h-5 w-5 shrink-0 text-[#6B8E6B] opacity-80" />
                    {label}
                  </a>
                </li>
              ))}
            </ul>

            <ul className="mt-6 space-y-3">
              {phones.map((p) => (
                <li key={p}>
                  <a
                    href={telHref(p)}
                    className="flex items-center gap-3 text-sm transition-opacity hover:opacity-80"
                    style={{ color: FOREST }}
                  >
                    <PhoneIcon className="h-5 w-5 shrink-0 text-[#6B8E6B]" />
                    {p}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href={`mailto:${SITE_CONTACT_EMAIL}`}
                  className="flex items-center gap-3 text-sm transition-opacity hover:opacity-80"
                  style={{ color: FOREST }}
                >
                  <MailIcon className="h-5 w-5 shrink-0 text-[#6B8E6B]" />
                  {SITE_CONTACT_EMAIL}
                </a>
              </li>
            </ul>

            <div
              className="relative mt-6 overflow-hidden rounded-2xl border p-4 sm:p-5"
              style={{
                backgroundColor: CREAM,
                borderColor: `${FOREST}18`,
              }}
            >
              <div
                className="pointer-events-none absolute -right-6 -top-6 h-24 w-24 text-[#6B8E6B]/15"
                aria-hidden
              >
                <LeafIcon className="h-full w-full" />
              </div>
              <div className="relative flex gap-3">
                <MapPinIcon className="mt-0.5 h-5 w-5 shrink-0 text-[#6B8E6B]" />
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-[0.12em]" style={{ color: `${FOREST}88` }}>
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

        {/* ── Bottom bar ── */}
        <div
          className="mt-14 flex flex-col items-center gap-4 border-t pt-8 text-center text-xs sm:flex-row sm:justify-between sm:gap-6 sm:text-left"
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
