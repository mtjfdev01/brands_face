import Link from "next/link";
import Footer from "@/components/home/Footer";
import PageHero from "@/components/hero/PageHero";

const HERO_IMAGE = "/assets/images/pages/about/about_hero.png";

const VALUES = [
  {
    title: "Audit-First Thinking",
    description:
      "Before design, we evaluate what your packaging is currently communicating and where it is silently costing you conversions.",
  },
  {
    title: "Strategy + Execution",
    description:
      "We bridge brand positioning, structure, and production so every packaging decision supports both growth and practical operations.",
  },
  {
    title: "Global Market Standards",
    description:
      "Our approach is built for performance-driven brands targeting modern retail and e-commerce audiences in the US and Europe.",
  },
];

const JOURNEY = [
  {
    step: "01",
    title: "Discover",
    text: "We study your product category, competitors, and current packaging strengths and blind spots.",
  },
  {
    step: "02",
    title: "Diagnose",
    text: "You receive actionable packaging audit insights with clear priorities for perception and conversion gains.",
  },
  {
    step: "03",
    title: "Design",
    text: "Our team translates strategy into premium packaging concepts, structure, and brand-consistent detail.",
  },
  {
    step: "04",
    title: "Deliver",
    text: "From prototype to production, we ensure packaging quality and launch-readiness at scale.",
  },
];

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[var(--primary-cream)]">
      <PageHero
        eyebrow="About Brands Face"
        title="We Re-Engineer Packaging Into a"
        titleHighlight="Brand Growth Asset"
        description="Brands Face is a strategy-led packaging company helping modern brands transform ordinary packaging into high-impact customer experiences. We combine audit insights, structural planning, and premium design to make packaging a real growth channel."
        feature="Trusted by growing brands that treat packaging as a strategic brand asset—not just a box."
        primaryCta={{ label: "Get a Free Packaging Audit", href: "/audit" }}
        secondaryCta={{ label: "View Our Work", href: "/case-studies" }}
        image={{ src: HERO_IMAGE, alt: "Premium skincare packaging on stone", priority: true }}
      />

      <section className="px-4 py-14 sm:px-6 sm:py-16 lg:px-8">
        <div className="mx-auto grid max-w-[1240px] gap-5 md:grid-cols-3">
          {VALUES.map((item) => (
            <article
              key={item.title}
              className="rounded-2xl border border-[var(--dark-primary-green)]/10 bg-white p-6 shadow-sm"
            >
              <h2 className="text-xl font-black text-[var(--dark-primary-green)]">{item.title}</h2>
              <p className="mt-3 text-sm leading-relaxed text-[var(--dark-primary-green)]/75">{item.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="px-4 pb-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-[1240px] rounded-3xl border border-[var(--dark-primary-green)]/10 bg-white p-6 shadow-[0_18px_60px_rgba(19,47,43,0.10)] sm:p-8 lg:p-10">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--dark-primary-green)]/70">
              How We Work
            </p>
            <h3 className="mt-3 text-3xl font-black leading-tight tracking-tight text-[var(--dark-primary-green)] sm:text-4xl">
              A Proven Packaging Procedure
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-[var(--dark-primary-green)]/75 sm:text-base">
              Our process is built to reduce guesswork and turn packaging decisions into measurable business outcomes.
            </p>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {JOURNEY.map((item) => (
              <article
                key={item.step}
                className="rounded-2xl border border-[var(--dark-primary-green)]/10 bg-[var(--primary-cream)] p-5"
              >
                <p className="text-xs font-black uppercase tracking-[0.2em] text-[var(--dark-primary-green)]/55">
                  {item.step}
                </p>
                <h4 className="mt-2 text-xl font-black text-[var(--dark-primary-green)]">{item.title}</h4>
                <p className="mt-2 text-sm leading-relaxed text-[var(--dark-primary-green)]/75">{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 pb-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-[1240px] rounded-3xl bg-[var(--dark-primary-green)] px-6 py-10 text-center sm:px-10">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--light-green)]">Start With Insight</p>
          <h5 className="mx-auto mt-4 max-w-3xl text-3xl font-black leading-tight tracking-tight text-white sm:text-4xl">
            Get a Free Packaging Audit Before You Invest in the Wrong Direction
          </h5>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-emerald-50/85 sm:text-base">
            We assess your current packaging and give you practical recommendations to improve trust, perceived value,
            and conversion outcomes.
          </p>
          <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/quote"
              className="rounded-full bg-[var(--light-green)] px-6 py-3 text-sm font-bold text-[var(--primary-btn-text)] transition hover:brightness-110"
            >
              Request Free Audit
            </Link>
            <Link
              href="/case-studies"
              className="rounded-full border border-white/25 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              View Case Studies
            </Link>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
