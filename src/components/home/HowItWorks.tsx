"use client";

import type { CSSProperties, ReactNode } from "react";

type Step = {
  n: number;
  title: string;
  description: string;
  icon: ReactNode;
};

function StepConnector() {
  return (
    <div
      className="hidden shrink-0 items-center justify-center self-start pt-[2.75rem] md:flex md:w-12 lg:w-16"
      aria-hidden
    >
      <div className="relative flex h-px w-full items-center">
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#57d7aa]/80 to-[#57d7aa]/80" />
        <div className="mx-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-[#57d7aa]/70 bg-[#0f2118] text-xs font-semibold text-[#57d7aa] shadow-[0_0_16px_rgba(87,215,170,0.25)]">
          &gt;
        </div>
        <div className="h-px flex-1 bg-gradient-to-l from-transparent via-[#57d7aa]/80 to-[#57d7aa]/80" />
      </div>
    </div>
  );
}

function IconRing({ children, compact }: { children: ReactNode; compact?: boolean }) {
  const size = compact
    ? "h-[4.25rem] w-[4.25rem] [&_svg]:h-7 [&_svg]:w-7 sm:h-[4.75rem] sm:w-[4.75rem] sm:[&_svg]:h-8 sm:[&_svg]:w-8"
    : "h-[5.25rem] w-[5.25rem] sm:h-[5.75rem] sm:w-[5.75rem] [&_svg]:h-9 [&_svg]:w-9 sm:[&_svg]:h-10 sm:[&_svg]:w-10";

  return (
    <div
      className={`relative z-[1] mx-auto flex items-center justify-center rounded-full border-2 border-[#57d7aa]/90 bg-gradient-to-b from-[#1f3d2e] to-[#0f2118] shadow-[0_0_28px_rgba(87,215,170,0.22)] ${size}`}
      style={{
        boxShadow:
          "0 0 28px rgba(87, 215, 170, 0.35), inset 0 1px 0 rgba(255,255,255,0.06)",
      }}
    >
      <div className="text-[#57d7aa]">{children}</div>
    </div>
  );
}

function StepBlock({ step, showConnector }: { step: Step; showConnector: boolean }) {
  return (
    <>
      <div className="relative flex min-w-0 flex-1 flex-col text-center">
        <div className="relative mx-auto mb-5 w-[5.75rem] sm:w-[6.25rem]">
          <span
            className="pointer-events-none absolute -left-1 -top-6 select-none text-[4.5rem] font-black leading-none tracking-tight text-transparent sm:-left-2 sm:-top-8 sm:text-[5.5rem]"
            style={{
              WebkitTextStroke: "1px rgba(255,255,255,0.12)",
            }}
            aria-hidden
          >
            {step.n}
          </span>
          <IconRing>{step.icon}</IconRing>
        </div>
        <h3 className="text-base font-bold text-white sm:text-lg">{step.title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-white/75 sm:text-[0.9375rem]">{step.description}</p>
      </div>
      {showConnector ? <StepConnector /> : null}
    </>
  );
}

const STEPS: Step[] = [
  {
    n: 1,
    title: "Submit Quote Request",
    description: "Share your requirements, box style, dimensions, and quantity.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
        <path d="M7 3h8l4 4v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Z" />
        <path d="M14 3v4h4" />
        <path d="M8 12h8M8 16h5" strokeLinecap="round" />
        <path d="m15.5 10.5 2 2-4 4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    n: 2,
    title: "We Reach Out & Finalize Pricing",
    description: "Our team connects with you, understands your needs, and finalizes the best pricing.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
        <path d="M4 14v3a2 2 0 0 0 2 2h2" strokeLinecap="round" />
        <path d="M20 14v3a2 2 0 0 1-2 2h-2" strokeLinecap="round" />
        <path d="M6.5 9a7.5 7.5 0 0 1 11 0" strokeLinecap="round" />
        <path d="M9 14h6v5a2 2 0 0 1-2 2h-2a2 2 0 0 1-2-2v-5Z" />
      </svg>
    ),
  },
  {
    n: 3,
    title: "Box Mockup is Prepared",
    description: "We create a digital or physical mockup for your approval.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
        <path d="M4 8 12 4l8 4v8l-8 4-8-4V8Z" />
        <path d="m4 8 8 4 8-4" />
        <path d="M12 12v8" />
      </svg>
    ),
  },
  {
    n: 4,
    title: "Order Preparation",
    description: "Once approved, we begin production with premium materials and precision.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
        <path d="M3 10h18v2H3z" strokeLinecap="round" />
        <path d="M5 12v6h14v-6" />
        <rect x="6" y="14" width="3" height="2.5" rx="0.5" />
        <rect x="11" y="14" width="3" height="2.5" rx="0.5" />
        <rect x="16" y="14" width="2" height="2.5" rx="0.5" />
        <path d="M2 8h20" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    n: 5,
    title: "Quality Check",
    description: "Every box goes through a strict quality check to ensure it meets our high standards.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
        <path d="M12 3 4 6v6c0 5 4 8 8 9 4-1 8-4 8-9V6l-8-3Z" />
        <path d="m9 12 2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    n: 6,
    title: "Delivered to Client",
    description: "Your custom packaging is safely packed and delivered on time, every time.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
        <path d="M3 16h13v-9H3v9Z" />
        <path d="M16 10h3l2 3v3h-5" />
        <circle cx="7.5" cy="17.5" r="1.5" fill="currentColor" />
        <circle cx="17.5" cy="17.5" r="1.5" fill="currentColor" />
        <path d="M19 13h2" strokeLinecap="round" />
        <path d="m14 7 1.5 2H16" strokeLinecap="round" />
      </svg>
    ),
  },
];

export default function HowItWorks() {
  const row1 = STEPS.slice(0, 3);
  const row2 = STEPS.slice(3, 6);

  return (
    <section
      id="how-it-works"
      className="relative mt-10 w-full overflow-hidden bg-gradient-to-br from-[#173626] via-[#132d20] to-[#0f2118] py-16 sm:mt-14 sm:py-20 lg:mt-16 lg:py-28"
      aria-labelledby="how-it-works-heading"
    >
      <div
        className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_0%,rgba(87,215,170,0.08),transparent_55%)]"
        aria-hidden
      />
      <div className="relative z-10 mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
        <header className="mx-auto max-w-3xl text-center">
          <div className="mb-6 flex items-center justify-center gap-3 sm:gap-4">
            <div className="h-px flex-1 max-w-[120px] bg-gradient-to-r from-transparent to-[#57d7aa]/70 sm:max-w-[160px]" />
            <p className="shrink-0 text-[0.7rem] font-semibold tracking-[0.2em] text-[#57d7aa] sm:text-xs">
              HOW IT WORKS
            </p>
            <div className="h-px flex-1 max-w-[120px] bg-gradient-to-l from-transparent to-[#57d7aa]/70 sm:max-w-[160px]" />
          </div>
          <h2
            id="how-it-works-heading"
            className="text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-[2.75rem] lg:leading-tight"
          >
            Simple Process.{" "}
            <span className="bg-gradient-to-r from-[#8ef0d8] via-[#57d7aa] to-[#3a9f80] bg-clip-text text-transparent">
              Premium Results.
            </span>
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-white/80 sm:text-base">
            We make the custom packaging journey seamless, transparent, and tailored to your brand.
          </p>
        </header>

        {/* Mobile: 2 columns, no visible descriptions, staggered entrance */}
        <div className="mt-10 grid grid-cols-2 gap-x-3 gap-y-8 sm:mt-12 sm:gap-x-4 sm:gap-y-10 md:hidden">
          {STEPS.map((step, i) => (
            <div
              key={step.n}
              className="motion-safe:animate-hiw-step-in motion-reduce:animate-none motion-reduce:opacity-100 relative flex min-w-0 flex-col text-center"
              style={{ animationDelay: `${i * 70}ms` } satisfies CSSProperties}
            >
              <div
                className="motion-safe:animate-hiw-icon-pop motion-reduce:animate-none relative mx-auto mb-3 w-[4.5rem] sm:mb-4 sm:w-[5rem]"
                style={{ animationDelay: `${i * 70 + 40}ms` } satisfies CSSProperties}
              >
                <span
                  className="pointer-events-none absolute -left-1 -top-1 z-[3] select-none text-[1.25rem] font-black leading-none tracking-tight text-[#8ef0d8] drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)] sm:-left-1.5 sm:-top-1.5 sm:text-[1.5rem]"
                  aria-hidden
                >
                  {step.n}
                </span>
                <IconRing compact>{step.icon}</IconRing>
              </div>
              <h3 className="text-[0.8125rem] font-bold leading-snug text-white sm:text-sm">{step.title}</h3>
              <p className="sr-only">{step.description}</p>
            </div>
          ))}
        </div>

        {/* Desktop: two rows with connectors */}
        <div className="mt-16 hidden flex-col gap-20 md:flex">
          <div className="flex flex-row items-start justify-center gap-0 lg:gap-1">
            {row1.map((step, i) => (
              <StepBlock key={step.n} step={step} showConnector={i < row1.length - 1} />
            ))}
          </div>
          <div className="flex flex-row items-start justify-center gap-0 lg:gap-1">
            {row2.map((step, i) => (
              <StepBlock key={step.n} step={step} showConnector={i < row2.length - 1} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
