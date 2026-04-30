"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { defaultCategoryHubPath } from "@/lib/routes";
import { SITE_ADDRESS_LINES, SITE_CONTACT_EMAIL, SITE_NTN, SITE_PAYMENT_NOTE } from "@/data/siteContact";

const COMPANY = [
  { label: "About us", href: "/about" },
  { label: "Services", href: defaultCategoryHubPath() },
  { label: "Case studies", href: "/case-studies" },
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

const SOCIAL = [
  { label: "Instagram", href: "https://www.instagram.com/brands.face?igsh=OWRuZnpxdmt0YmJn" },
  { label: "TikTok", href: "https://www.tiktok.com/@brandsface?_r=1&_t=ZS-94Z4BX3eAku" },
  { label: "LinkedIn", href: "https://www.linkedin.com/company/brands-face/" },
];

export default function Footer() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const year = new Date().getFullYear();
  const phones = ["+92 300 0337680", "+1 (603) 825-0565"] as const;
  const telHref = (raw: string) => `tel:+${raw.replace(/\D/g, "")}`;
  const mailHref = (raw?: string) => (raw ? `mailto:${raw}` : undefined);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { threshold: 0.15 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <footer className="relative w-full overflow-hidden bg-[#f0ebe3]">
      {/* ── Top: links ── */}
      <div className="relative z-10 mx-auto max-w-[1280px] px-6 pb-10 pt-16 sm:px-10 sm:pt-20">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-12 lg:gap-8">
          {/* Left — tagline */}
          <div className="lg:col-span-3">
            <h3 className="mb-4 text-lg font-semibold leading-snug text-[#1a1a1a] sm:text-xl">
              Built for Brands.
              <br />
              Engineered for Growth.
            </h3>
            <div className="relative mt-2 aspect-square w-full max-w-[168px] sm:max-w-[188px]">
              <Image
                src="/assets/images/sustainable.webp"
                alt="Sustainable packaging"
                fill
                className="object-contain object-left"
                sizes="188px"
              />
            </div>
          </div>

          {/* Company */}
          <div className="sm:pl-0 lg:col-span-3 lg:pl-4">
            <p className="mb-4 text-xs text-[#1a1a1a]/50">Company</p>
            <ul className="space-y-2.5">
              {COMPANY.map((l) => (
                <li key={l.label}>
                  <Link
                    href={l.href}
                    className="text-sm text-[#1a1a1a] transition-colors hover:text-[#1a1a1a]/70"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal & support */}
          <div className="sm:pl-0 lg:col-span-3 lg:pl-2">
            <p className="mb-4 text-xs text-[#1a1a1a]/50">Legal & support</p>
            <ul className="space-y-2.5">
              {LEGAL_AND_SUPPORT.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-sm text-[#1a1a1a] transition-colors hover:text-[#1a1a1a]/70"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div className="sm:pl-0 lg:col-span-3 lg:pl-2">
            <p className="mb-4 text-xs text-[#1a1a1a]/50">Social</p>
            <ul className="space-y-2.5">
              {SOCIAL.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-[#1a1a1a] transition-colors hover:text-[#1a1a1a]/70"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* ── Bottom: BRANDS / FACE + logo ── */}
      <div ref={ref} className="relative z-0 w-full overflow-hidden bg-[#f0ebe3] pb-4 sm:pb-6">
        <div
          className="pointer-events-none absolute inset-0 z-0 bg-[url('/assets/images/logos/logo_ultra_hd.png')] bg-contain bg-center bg-no-repeat opacity-[0.42]"
          aria-hidden
        />
        <div className="relative z-[1] flex items-end justify-center gap-[6vw] px-2 sm:px-4">
          {/* BRANDS — slides from left */}
          <div
            className="transition-all duration-[1200ms] ease-out"
            style={{
              transform: visible ? "translateX(0)" : "translateX(-160%)",
              opacity: visible ? 1 : 0,
            }}
          >
            <p className="select-none text-[14vw] font-black leading-[0.85] tracking-tighter text-[#1a3c28] [text-shadow:0_1px_0_rgba(240,235,227,0.9)] sm:text-[12.5vw] md:text-[11vw]">
              BRANDS
            </p>
          </div>

          {/* FACE — slides from right */}
          <div
            className="transition-all duration-[1200ms] ease-out delay-150"
            style={{
              transform: visible ? "translateX(0)" : "translateX(160%)",
              opacity: visible ? 1 : 0,
            }}
          >
            <p className="inline-flex items-start justify-end gap-[0.12em] text-[14vw] font-black leading-[0.85] tracking-tighter text-[#1a3c28] [text-shadow:0_1px_0_rgba(240,235,227,0.9)] sm:text-[12.5vw] md:text-[11vw]">
              <span>FACE</span>
              <span
                className="shrink-0 translate-y-[-0.42em] text-[2.7vw] font-bold leading-none text-[#1a3c28] [text-shadow:0_1px_0_rgba(240,235,227,0.9)] motion-reduce:transform-none sm:text-[2.35vw] md:text-[2.1vw]"
                aria-hidden
              >
                &reg;
              </span>
            </p>
          </div>
        </div>
      </div>

      {/* Rights, address & payment — after BRANDS / FACE */}
      <div className="relative z-10 mx-auto max-w-[1280px] border-t border-[#1a1a1a]/10 bg-[#f0ebe3] px-6 pb-6 sm:px-10">
        <div className="grid gap-8 pt-8 sm:grid-cols-2 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <p className="mb-2 text-xs font-medium uppercase tracking-[0.14em] text-[#1a1a1a]/45">
              Address
            </p>
            <address className="not-italic">
              <ul className="space-y-0.5 text-sm leading-relaxed text-[#1a1a1a]/70">
                {SITE_ADDRESS_LINES.map((line) => (
                  <li key={line}>{line}</li>
                ))}
              </ul>
            </address>
          </div>

          <div className="lg:col-span-6 lg:text-right">
            <p className="mb-2 text-xs font-medium uppercase tracking-[0.14em] text-[#1a1a1a]/45">
              Contact
            </p>
            <ul className="space-y-1 text-sm leading-relaxed text-[#1a1a1a]/70">
              {phones.map((p) => (
                <li key={p}>
                  <a className="hover:text-[#1a1a1a]/85" href={telHref(p)}>
                    {p}
                  </a>
                </li>
              ))}
              <li>
                <a className="hover:text-[#1a1a1a]/85" href={mailHref(SITE_CONTACT_EMAIL)}>
                  {SITE_CONTACT_EMAIL}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-3 border-t border-[#1a1a1a]/8 pt-6 text-xs leading-relaxed text-[#1a1a1a]/55 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between sm:gap-x-6 sm:gap-y-2">
          <span>&copy; {year} Brands Face. All rights reserved.</span>
          <span className="text-[#1a1a1a]/60">
            {SITE_NTN.label}: <span className="font-medium text-[#1a1a1a]/75">I636441</span>
          </span>
          <span className="max-w-md sm:text-right">{SITE_PAYMENT_NOTE}</span>
        </div>
      </div>
    </footer>
  );
}
