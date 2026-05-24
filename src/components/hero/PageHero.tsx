import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";

export type PageHeroCta = {
  label: string;
  href: string;
};

export type PageHeroBreadcrumb = {
  label: string;
  href?: string;
};

export type PageHeroProps = {
  /** Small caps label above the headline (e.g. "About Brands Face"). */
  eyebrow: string;
  /** White headline line(s) — serif on desktop/mobile. */
  title: string;
  /** Accent line in light green; rendered below `title` when set. */
  titleHighlight?: string;
  description: string;
  /** Short trust line with shield icon (optional). */
  feature?: string;
  primaryCta?: PageHeroCta;
  secondaryCta?: PageHeroCta;
  /** Hero product / lifestyle image. Omit for text-only heroes (e.g. legal). */
  image?: {
    src: string;
    alt: string;
    priority?: boolean;
  };
  /** Swap image column on large screens. */
  reverse?: boolean;
  breadcrumbs?: PageHeroBreadcrumb[];
  /** Extra content below CTAs in the text column (desktop & mobile). */
  children?: ReactNode;
  className?: string;
};

function ShieldIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M12 3l7 3v5c0 4.5-2.8 7.8-7 9-4.2-1.2-7-4.5-7-9V6l7-3z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path
        d="M9 12l2 2 4-4"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function PrimaryArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden className="h-4 w-4">
      <path
        d="M7 17L17 7M10 7h7v7"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function HeroActions({
  feature,
  primaryCta,
  secondaryCta,
  className = "",
}: Pick<PageHeroProps, "feature" | "primaryCta" | "secondaryCta"> & { className?: string }) {
  const hasActions = feature || primaryCta || secondaryCta;
  if (!hasActions) return null;

  return (
    <div className={className}>
      {feature ? (
        <div className="flex items-start gap-3 text-sm leading-relaxed text-white/80 sm:text-[15px]">
          <span className="mt-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-[var(--light-green)]/25 bg-[var(--light-green)]/10 text-[var(--light-green)]">
            <ShieldIcon className="h-4 w-4" />
          </span>
          <p>{feature}</p>
        </div>
      ) : null}

      {(primaryCta || secondaryCta) && (
        <div
          className={[
            "flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center",
            feature ? "mt-5 sm:mt-6" : "",
          ].join(" ")}
        >
          {primaryCta ? (
            <Link href={primaryCta.href} className="primary_btn w-full sm:w-auto">
              {primaryCta.label}
              <span className="primary_btn__icon">
                <PrimaryArrowIcon />
              </span>
            </Link>
          ) : null}
          {secondaryCta ? (
            <Link
              href={secondaryCta.href}
              className="inline-flex w-full items-center justify-center rounded-xl border border-white/15 bg-white/[0.03] px-5 py-3.5 text-sm font-semibold text-white/90 backdrop-blur transition-colors hover:border-white/25 hover:bg-white/[0.06] active:scale-[0.99] sm:w-auto"
            >
              {secondaryCta.label}
            </Link>
          ) : null}
        </div>
      )}
    </div>
  );
}

function HeroImage({ image }: { image: NonNullable<PageHeroProps["image"]> }) {
  return (
    <div className="relative mx-auto w-full max-w-[520px] lg:max-w-none">
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-black/20 shadow-[0_28px_80px_rgba(0,0,0,0.35)] lg:aspect-[5/4]">
        <Image
          src={image.src}
          alt={image.alt}
          fill
          priority={image.priority}
          sizes="(max-width: 1024px) 90vw, 520px"
          className="object-cover"
        />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(70%_60%_at_50%_40%,rgba(87,215,170,0.12),transparent_65%)]" />
      </div>
    </div>
  );
}

/**
 * Marketing page hero — split layout on desktop, stacked on mobile (matches brand mockup).
 * Nav is provided globally via `SiteHeader`; this block is content only.
 */
export default function PageHero({
  eyebrow,
  title,
  titleHighlight,
  description,
  feature,
  primaryCta,
  secondaryCta,
  image,
  reverse = false,
  breadcrumbs,
  children,
  className = "",
}: PageHeroProps) {
  const hasImage = Boolean(image?.src);

  return (
    <section
      className={[
        "relative overflow-hidden bg-[var(--dark-primary-green)] px-4 pb-14 pt-10 sm:px-6 sm:pb-16 sm:pt-12 lg:px-8 lg:pb-20",
        className,
      ].join(" ")}
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[12%] top-[-4rem] h-72 w-72 rounded-full bg-emerald-500/15 blur-[120px]" />
        <div className="absolute bottom-[-3rem] right-[10%] h-80 w-80 rounded-full bg-cyan-500/10 blur-[120px]" />
        <div className="absolute inset-0 bg-[linear-gradient(160deg,rgba(0,0,0,0.22)_0%,transparent_45%,rgba(87,215,170,0.06)_100%)]" />
      </div>

      <div className="relative mx-auto max-w-[1240px]">
        {breadcrumbs && breadcrumbs.length > 0 ? (
          <nav className="mb-6 text-xs text-white/70" aria-label="Breadcrumb">
            {breadcrumbs.map((crumb, i) => (
              <span key={`${crumb.label}-${i}`}>
                {i > 0 ? <span className="mx-2 opacity-50">/</span> : null}
                {crumb.href ? (
                  <Link href={crumb.href} className="transition-colors hover:text-white">
                    {crumb.label}
                  </Link>
                ) : (
                  <span className="text-white/90">{crumb.label}</span>
                )}
              </span>
            ))}
          </nav>
        ) : null}

        <div
          className={hasImage ? "lg:grid lg:grid-cols-2 lg:items-center lg:gap-12 xl:gap-16" : "max-w-3xl"}
        >
          {/* Copy column */}
          <div className={["min-w-0", reverse && hasImage ? "lg:order-2" : ""].join(" ")}>
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[var(--light-green)] sm:text-xs">
              {eyebrow}
            </p>

            <h1
              className={[
                "mt-4 font-[family-name:var(--font-playfair)] text-[2rem] font-bold leading-[1.08] tracking-tight text-white",
                "sm:text-[2.35rem] lg:text-[2.75rem] xl:text-[3rem]",
              ].join(" ")}
            >
              {title}
              {titleHighlight ? (
                <span className="mt-1 block text-[var(--light-green)]">{titleHighlight}</span>
              ) : null}
            </h1>

            <p className="mt-5 max-w-xl text-sm leading-relaxed text-white/80 sm:text-base lg:mt-6">
              {description}
            </p>

            {/* Desktop (and text-only): actions under copy */}
            <div className={hasImage ? "hidden lg:block" : ""}>
              <HeroActions
                feature={feature}
                primaryCta={primaryCta}
                secondaryCta={secondaryCta}
                className="mt-8"
              />
              {children ? <div className="mt-8">{children}</div> : null}
            </div>
          </div>

          {hasImage && image ? (
            <div className={["mt-8 lg:mt-0", reverse ? "lg:order-1" : ""].join(" ")}>
              <HeroImage image={image} />
            </div>
          ) : null}

          {/* Mobile / tablet: actions after image when split layout */}
          {hasImage ? (
            <div className="lg:hidden">
              <HeroActions
                feature={feature}
                primaryCta={primaryCta}
                secondaryCta={secondaryCta}
                className="mt-8"
              />
              {children ? <div className="mt-6">{children}</div> : null}
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
