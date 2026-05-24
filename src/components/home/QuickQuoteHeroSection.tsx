"use client";

import {
  AE,
  AU,
  BD,
  BR,
  CN,
  DE,
  EG,
  FR,
  GB,
  IN,
  JP,
  NL,
  NP,
  PK,
  SA,
  SG,
  TR,
  US,
} from "country-flag-icons/react/3x2";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

type DialOption = {
  value: string;
  regionLabel: string;
  /** Library components use a widened SVG element type; `typeof US` matches all ISO flags in this bundle. */
  Flag: typeof US;
};

const DIAL_OPTIONS: DialOption[] = [
  { value: "+1", regionLabel: "United States", Flag: US },
  { value: "+44", regionLabel: "United Kingdom", Flag: GB },
  { value: "+49", regionLabel: "Germany", Flag: DE },
  { value: "+33", regionLabel: "France", Flag: FR },
  { value: "+31", regionLabel: "Netherlands", Flag: NL },
  { value: "+61", regionLabel: "Australia", Flag: AU },
  { value: "+65", regionLabel: "Singapore", Flag: SG },
  { value: "+81", regionLabel: "Japan", Flag: JP },
  { value: "+86", regionLabel: "China", Flag: CN },
  { value: "+55", regionLabel: "Brazil", Flag: BR },
  { value: "+966", regionLabel: "Saudi Arabia", Flag: SA },
  { value: "+90", regionLabel: "Turkey", Flag: TR },
  { value: "+20", regionLabel: "Egypt", Flag: EG },
  { value: "+880", regionLabel: "Bangladesh", Flag: BD },
  { value: "+977", regionLabel: "Nepal", Flag: NP },
  { value: "+92", regionLabel: "Pakistan", Flag: PK },
  { value: "+971", regionLabel: "United Arab Emirates", Flag: AE },
  { value: "+91", regionLabel: "India", Flag: IN },
];

const FLAG_ICON_CLASS =
  "block h-[14px] w-[21px] shrink-0 overflow-hidden rounded-[2px] shadow-sm ring-1 ring-black/[0.06]";

export type QuickQuoteHeroSectionProps = {
  className?: string;
  /** Full-area background (e.g. `/assets/...`). Omit to use a neutral placeholder until you add an asset. */
  backgroundSrc?: string;
  /** Optional smaller / cropped asset for narrow viewports. */
  backgroundSrcMobile?: string;
  /** Card horizontal placement (use `left` when the artwork has open space on the left). */
  formAlign?: "left" | "right";
  /** `hero` = tall viewport-style band; `band` = shorter strip for mid-page (e.g. category hubs). */
  layout?: "hero" | "band";
  /** Align the card to the top of the hero band (flush with the image top) with square top corners. */
  hangOnTop?: boolean;
  /** Extra classes on the inner max-width row (flex). Use for manual padding / min-height / alignment tweaks. */
  contentClassName?: string;
  /** Extra classes on the white form card. Use for manual position: e.g. `-mt-[72px] mr-[8%] translate-y-2`. */
  cardClassName?: string;
};

/**
 * Hero band: full-bleed background image + right-aligned “Get Free Quote” card.
 * Matches the reference layout (2-column fields, phone + dial code, message, blue CTA).
 * Submit is client-only success state; wire to your API or `/quote` when ready.
 */
export default function QuickQuoteHeroSection({
  className = "",
  backgroundSrc,
  backgroundSrcMobile,
  formAlign = "right",
  layout = "hero",
  hangOnTop = false,
  contentClassName = "",
  cardClassName = "",
}: QuickQuoteHeroSectionProps) {
  const [fullName, setFullName] = useState("");
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [dial, setDial] = useState<string>(DIAL_OPTIONS[0].value);
  const [phone, setPhone] = useState("");
  const [details, setDetails] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [dialOpen, setDialOpen] = useState(false);
  const dialPickerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!dialOpen) return;
    const close = () => setDialOpen(false);
    const onPointerDown = (e: PointerEvent) => {
      if (dialPickerRef.current?.contains(e.target as Node)) return;
      close();
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [dialOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!fullName.trim() || !email.trim()) {
      setError("Please enter your name and email.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setError("Please enter a valid email.");
      return;
    }
    setSubmitted(true);
  };

  const inputClass =
    "w-full rounded-full border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 outline-none transition-shadow focus:border-[#0096FF]/50 focus:ring-2 focus:ring-[#0096FF]/20";

  const dialMeta = DIAL_OPTIONS.find((o) => o.value === dial) ?? DIAL_OPTIONS[0];
  const SelectedFlag = dialMeta.Flag;

  const alignItems = hangOnTop ? "items-start" : "items-center";

  return (
    <section className={`relative w-full ${hangOnTop ? "overflow-visible" : "overflow-hidden"} ${className}`}>
      {/* Background — full-bleed under content */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {backgroundSrc ? (
          backgroundSrcMobile ? (
            <>
              <Image
                src={backgroundSrcMobile}
                alt=""
                fill
                className="object-cover md:hidden"
                sizes="100vw"
                priority={false}
              />
              <Image
                src={backgroundSrc}
                alt=""
                fill
                className="hidden object-cover md:block"
                sizes="100vw"
                priority={false}
              />
            </>
          ) : (
            <Image
              src={backgroundSrc}
              alt=""
              fill
              className="object-cover"
              sizes="100vw"
              priority={false}
            />
          )
        ) : (
          <div
            className="h-full w-full bg-gradient-to-br from-slate-800 via-slate-700 to-slate-900"
            aria-hidden
          />
        )}
        <div className="absolute inset-0 bg-black/25 md:bg-black/20" aria-hidden />
      </div>

      <div
        className={[
          "relative z-[1] mx-auto flex max-w-[1280px]",
          alignItems,
          formAlign === "left" ? "justify-start" : "justify-end",
          layout === "band"
            ? hangOnTop
              ? "min-h-[380px] px-4 pb-12 pt-0 sm:min-h-[420px] sm:px-6 sm:pb-14 lg:min-h-[460px] lg:px-8 lg:pb-16"
              : "min-h-[360px] px-4 py-10 sm:min-h-[400px] sm:px-6 lg:min-h-[440px] lg:px-8 lg:py-14"
            : "min-h-[min(100svh,920px)] px-4 py-12 sm:px-6 lg:px-8 lg:py-16",
          contentClassName,
        ]
          .filter(Boolean)
          .join(" ")}
      >
        <div
          className={[
            "w-full max-w-[440px] bg-white p-6 shadow-[0_24px_60px_-12px_rgba(0,0,0,0.35)] sm:p-8",
            hangOnTop
              ? "relative z-[2] rounded-t-none rounded-b-[28px] sm:rounded-b-[32px] sm:mr-4 md:mr-8 lg:mr-12 xl:mr-16"
              : "rounded-[28px] sm:rounded-[32px]",
            cardClassName,
          ]
            .filter(Boolean)
            .join(" ")}
        >
          <h2 className="text-xl font-bold tracking-tight text-gray-900 sm:text-2xl">Get Free Quote</h2>
          <p className="mt-2 text-sm leading-relaxed text-gray-500">
            Let&apos;s create packaging that stands out, makes a statement, and sets your brand apart from
            the rest.
          </p>

          {submitted ? (
            <div className="mt-8 rounded-2xl border border-emerald-200 bg-emerald-50/80 px-4 py-5 text-sm text-[#103a2a]">
              <p className="font-semibold">Thanks — we&apos;ve received your request.</p>
              <p className="mt-2 text-[#103a2a]/80">
                For dimensions, materials, and quantities, continue with our full quote form.
              </p>
              <Link
                href="/quote"
                className="mt-4 inline-flex w-full items-center justify-center rounded-full bg-[#0096FF] py-3 text-center text-sm font-bold text-white transition-colors hover:bg-[#0088e8]"
              >
                Complete full quote
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              {error && (
                <p className="rounded-xl bg-red-50 px-3 py-2 text-sm text-red-700" role="alert">
                  {error}
                </p>
              )}

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <label className="sm:col-span-1">
                  <span className="sr-only">Full name</span>
                  <input
                    type="text"
                    name="fullName"
                    autoComplete="name"
                    placeholder="Full name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className={inputClass}
                  />
                </label>
                <label className="sm:col-span-1">
                  <span className="sr-only">Company</span>
                  <input
                    type="text"
                    name="company"
                    autoComplete="organization"
                    placeholder="Company"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    className={inputClass}
                  />
                </label>
                <label className="sm:col-span-2">
                  <span className="sr-only">Email</span>
                  <input
                    type="email"
                    name="email"
                    autoComplete="email"
                    placeholder="Enter your Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={inputClass}
                  />
                </label>
                <div
                  className="flex min-h-[42px] rounded-full border border-gray-200 bg-white transition-shadow focus-within:border-[#0096FF]/50 focus-within:ring-2 focus-within:ring-[#0096FF]/20 sm:col-span-2"
                  role="group"
                  aria-label="Phone number"
                >
                  <input type="hidden" name="dial" value={dial} />
                  {/* Country: SVG flags via country-flag-icons; custom list keeps pill width stable */}
                  <div
                    ref={dialPickerRef}
                    className="relative flex min-w-[5.5rem] shrink-0 items-stretch rounded-l-full bg-gray-100/90"
                  >
                    <button
                      type="button"
                      className="absolute inset-0 z-[1] rounded-l-full outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#0096FF]/60"
                      aria-expanded={dialOpen}
                      aria-haspopup="listbox"
                      aria-label={`Country calling code, ${dialMeta.regionLabel}, ${dial}`}
                      onClick={() => setDialOpen((o) => !o)}
                    >
                      <span className="sr-only">Change country code</span>
                    </button>
                    <div
                      className="pointer-events-none flex items-center gap-1.5 py-2.5 pl-4 pr-2.5"
                      aria-hidden
                    >
                      <SelectedFlag className={FLAG_ICON_CLASS} aria-hidden />
                      <svg
                        className="h-3.5 w-3.5 shrink-0 text-gray-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                        aria-hidden
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                    {dialOpen ? (
                      <ul
                        className="absolute left-0 top-[calc(100%+6px)] z-[60] max-h-[min(17rem,45vh)] min-w-[11.5rem] overflow-y-auto overscroll-contain rounded-xl border border-gray-200 bg-white py-1 shadow-lg ring-1 ring-black/5"
                        role="listbox"
                        aria-label="Country calling code"
                      >
                        {DIAL_OPTIONS.map((o) => {
                          const ItemFlag = o.Flag;
                          const selected = dial === o.value;
                          return (
                            <li key={o.value} role="presentation">
                              <button
                                type="button"
                                role="option"
                                aria-selected={selected}
                                className={`flex w-full items-center gap-2.5 px-3 py-2.5 text-left text-sm transition-colors hover:bg-gray-50 ${
                                  selected ? "bg-gray-50/80" : ""
                                }`}
                                onClick={() => {
                                  setDial(o.value);
                                  setDialOpen(false);
                                }}
                              >
                                <ItemFlag className={FLAG_ICON_CLASS} aria-hidden />
                                <span className="font-medium tabular-nums text-gray-900">{o.value}</span>
                                <span className="sr-only">{o.regionLabel}</span>
                              </button>
                            </li>
                          );
                        })}
                      </ul>
                    ) : null}
                  </div>
                  {/* Number: divider + dial prefix + input in one pill */}
                  <div className="flex min-w-0 flex-1 items-center rounded-r-full bg-white pr-1">
                    <div
                      className="mx-0.5 h-5 w-px shrink-0 rounded-full bg-gray-200"
                      aria-hidden
                    />
                    <span className="shrink-0 pl-2.5 text-sm font-medium tabular-nums text-gray-900">
                      {dial}
                    </span>
                    <label className="min-w-0 flex-1">
                      <span className="sr-only">Phone number</span>
                      <input
                        type="tel"
                        name="phone"
                        autoComplete="tel"
                        placeholder="Phone number"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full min-w-0 border-0 bg-transparent py-2.5 pl-2 pr-4 text-sm text-gray-900 placeholder:text-gray-400 outline-none ring-0 focus:ring-0"
                      />
                    </label>
                  </div>
                </div>
              </div>

              <label className="block sm:col-span-2">
                <span className="sr-only">Product details</span>
                <textarea
                  name="details"
                  rows={4}
                  placeholder="Please share your product details"
                  value={details}
                  onChange={(e) => setDetails(e.target.value)}
                  className={`${inputClass} min-h-[120px] resize-y rounded-xl py-3`}
                />
              </label>

              <button
                type="submit"
                className="w-full rounded-full bg-[var(--dark-primary-green)] py-3.5 text-sm font-bold text-white shadow-md transition-colors hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--dark-primary-green)] focus-visible:ring-offset-2"
              >
                Get a Quote
              </button>

              <p className="text-center text-xs text-gray-400">
                Need full specs?{" "}
                <Link href="/quote" className="font-semibold text-[var(--dark-primary-green)] underline-offset-2 hover:underline">
                  Open detailed quote form
                </Link>
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
