import Link from "next/link";
import Footer from "@/components/home/Footer";
import HomeHeroNavbar from "@/components/nav/HomeHeroNavbar";

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
    <main className="min-h-screen bg-[#f5f0ea]">
      <section className="relative overflow-hidden bg-[#103a2a] px-4 pb-20 sm:px-6 lg:px-8">
        <HomeHeroNavbar />
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/4 top-0 h-72 w-72 rounded-full bg-emerald-800/25 blur-[120px]" />
          <div className="absolute bottom-0 right-1/4 h-80 w-80 rounded-full bg-cyan-800/20 blur-[120px]" />
        </div>

        <div className="relative mx-auto max-w-[1240px] pt-28 sm:pt-32">
          <div className="max-w-4xl">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-emerald-300">About Brands Face</p>
            <h1 className="mt-4 text-4xl font-black leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
              We Build Packaging That
              <span className="block text-emerald-300">Improves Brand Performance</span>
            </h1>
            <p className="mt-6 max-w-3xl text-sm leading-relaxed text-emerald-50/85 sm:text-base">
              Brands Face is a strategy-led packaging company helping modern brands transform ordinary packaging into
              high-impact customer experiences. We combine audit insights, structural planning, and premium design to
              make packaging a real growth channel.
            </p>
          </div>
        </div>
      </section>

      <section className="px-4 py-14 sm:px-6 sm:py-16 lg:px-8">
        <div className="mx-auto grid max-w-[1240px] gap-5 md:grid-cols-3">
          {VALUES.map((item) => (
            <article key={item.title} className="rounded-2xl border border-[#103a2a]/10 bg-white p-6 shadow-sm">
              <h2 className="text-xl font-black text-[#103a2a]">{item.title}</h2>
              <p className="mt-3 text-sm leading-relaxed text-[#103a2a]/75">{item.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="px-4 pb-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-[1240px] rounded-3xl border border-[#103a2a]/10 bg-white p-6 shadow-[0_18px_60px_rgba(16,58,42,0.10)] sm:p-8 lg:p-10">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#103a2a]/70">How We Work</p>
            <h3 className="mt-3 text-3xl font-black leading-tight tracking-tight text-[#103a2a] sm:text-4xl">
              A Proven Packaging Procedure
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-[#103a2a]/75 sm:text-base">
              Our process is built to reduce guesswork and turn packaging decisions into measurable business outcomes.
            </p>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {JOURNEY.map((item) => (
              <article key={item.step} className="rounded-2xl border border-[#103a2a]/10 bg-[#f7faf8] p-5">
                <p className="text-xs font-black uppercase tracking-[0.2em] text-[#103a2a]/55">{item.step}</p>
                <h4 className="mt-2 text-xl font-black text-[#103a2a]">{item.title}</h4>
                <p className="mt-2 text-sm leading-relaxed text-[#103a2a]/75">{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 pb-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-[1240px] rounded-3xl bg-[#103a2a] px-6 py-10 text-center sm:px-10">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-emerald-300">Start With Insight</p>
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
              className="rounded-full bg-[#1dd1a1] px-6 py-3 text-sm font-bold text-[#0f2f22] transition hover:bg-[#37dfb2]"
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
