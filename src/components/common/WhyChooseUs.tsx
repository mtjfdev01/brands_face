"use client";

import * as React from "react";
import type { SVGProps } from "react";
import AnimateOnScroll from "@/components/ui/AnimateOnScroll";

/* ── Types ── */
export type WhyChooseIcon =
  | "audit"
  | "strategy"
  | "design"
  | "unboxing"
  | "execution"
  | "modern";

export type FeatureCard = {
  id: string;
  title: string;
  description: string;
  /** Line icon key — matches template-style pictograms above each title */
  icon: WhyChooseIcon;
};

type Props = {
  heading: string;
  subheading: string;
  features: FeatureCard[];
};

type IconProps = SVGProps<SVGSVGElement> & { className?: string };

function IconAudit(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} aria-hidden {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h4M9 8h2" />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M7 3h10a2 2 0 012 2v16l-4-2-4 2-4-2-4 2V5a2 2 0 012-2z"
      />
    </svg>
  );
}

function IconStrategy(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} aria-hidden {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 19V5" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 15l4-4 4 3 5-6 5 4" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M17 8h3v3" />
    </svg>
  );
}

function IconDesign(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} aria-hidden {...props}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 2l1.09 3.26L16 6.5l-2.91 1.24L12 11l-1.09-3.26L8 6.5l2.91-1.24L12 2z"
      />
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 14l-1 5 5-1 11-11-4-4L5 14z" />
    </svg>
  );
}

function IconUnboxing(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} aria-hidden {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v18M3 9l9-4 9 4-9 4-9-4z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 9v10l9 4 9-4V9" />
    </svg>
  );
}

function IconExecution(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} aria-hidden {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 7h16M4 12h10M4 17h14" />
      <circle cx={18} cy={7} r={1.75} />
      <circle cx={14} cy={12} r={1.75} />
      <circle cx={18} cy={17} r={1.75} />
    </svg>
  );
}

function IconModern(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} aria-hidden {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4" />
      <circle cx={12} cy={12} r={4} />
    </svg>
  );
}

const ICONS: Record<WhyChooseIcon, (p: IconProps) => React.ReactElement> = {
  audit: IconAudit,
  strategy: IconStrategy,
  design: IconDesign,
  unboxing: IconUnboxing,
  execution: IconExecution,
  modern: IconModern,
};

function FeatureIcon({ name, className }: { name: WhyChooseIcon; className?: string }) {
  const Cmp = ICONS[name];
  return <Cmp className={className} />;
}

/** Forest brand (#103a2a) — matches catalog, PDP, quote flows */
const CARD_ACTIVE = "hover:bg-[#103a2a] focus-within:bg-[#103a2a]";
const CARD_SHADOW =
  "shadow-[0_6px_24px_rgba(16,58,42,0.1)] hover:shadow-[0_14px_36px_rgba(16,58,42,0.28)] focus-within:shadow-[0_14px_36px_rgba(16,58,42,0.28)]";
const CARD_RING =
  "hover:ring-2 hover:ring-inset hover:ring-white/90 focus-within:ring-2 focus-within:ring-inset focus-within:ring-white/90";

function Card({ feature }: { feature: FeatureCard }) {
  return (
    <article
      tabIndex={0}
      className={`group relative aspect-square cursor-default overflow-hidden rounded-2xl bg-white transition-all duration-300 ease-out ${CARD_ACTIVE} ${CARD_SHADOW} ${CARD_RING} focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1dd1a1] focus-visible:ring-offset-2 focus-visible:ring-offset-[#f5f0ea]`}
    >
      {/* Default: icon + title (template-style) */}
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 p-4 transition-opacity duration-300 group-hover:opacity-0 group-focus-within:opacity-0">
        <span
          className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#103a2a]/[0.08] text-[#103a2a] md:h-16 md:w-16"
          aria-hidden
        >
          <FeatureIcon name={feature.icon} className="h-7 w-7 md:h-8 md:w-8" />
        </span>
        <h3 className="text-center text-base font-bold leading-snug text-[#103a2a] md:text-lg">{feature.title}</h3>
      </div>

      {/* Hover / focus: description only (icon + title stay on the hidden default layer) */}
      <div className="absolute inset-0 flex items-center justify-center p-5 text-center opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-within:opacity-100">
        <p className="text-sm font-normal leading-relaxed text-white/95 md:text-[15px]">{feature.description}</p>
      </div>
    </article>
  );
}

/* ── Main section ── */
export default function WhyChooseUs({ heading, subheading, features }: Props) {
  return (
    <section className="w-full bg-[#f5f0ea] py-14 md:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <AnimateOnScroll animation="blur-in">
          <h2 className="text-center text-3xl font-bold tracking-tight text-[#103a2a] md:text-4xl lg:text-5xl">
            {heading}
          </h2>
        </AnimateOnScroll>

        <AnimateOnScroll animation="fade-up" delay={100}>
          <p className="mx-auto mt-4 max-w-3xl text-center text-base leading-relaxed text-[#103a2a]/75 md:text-lg">
            {subheading}
          </p>
        </AnimateOnScroll>

        <AnimateOnScroll
          animation="fade-up"
          stagger
          delay={200}
          className="mt-10 grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-6"
        >
          {features.map((feature) => (
            <Card key={feature.id} feature={feature} />
          ))}
        </AnimateOnScroll>
      </div>
    </section>
  );
}
