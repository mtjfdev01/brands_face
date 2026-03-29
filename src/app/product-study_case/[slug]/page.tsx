import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Footer from "@/components/home/Footer";
import HomeHeroNavbar from "@/components/nav/HomeHeroNavbar";
import { defaultCategoryHubPath } from "@/lib/routes";

type Study = {
  slug: string;
  title: string;
  brand: string;
  sector: string;
  engagement: string;
  heroSummary: string;
  beforeImage: string;
  afterImage: string;
  trustStats: Array<{ label: string; value: string }>;
  auditFindings: string[];
  interventions: string[];
  outcomes: string[];
  quote: string;
  quoteAuthor: string;
};

const STUDIES: Study[] = [
  {
    slug: "strategy-before-execution",
    title: "Strategy Before Execution",
    brand: "A Fast-Growing Beauty Brand",
    sector: "Premium skincare",
    engagement: "8-week audit-led transformation",
    heroSummary:
      "The brand had a good product but weak shelf authority. We rebuilt perception from strategy to structural execution so the packaging could justify premium pricing.",
    beforeImage: "/assets/images/compare.png",
    afterImage: "/assets/images/4.png",
    trustStats: [
      { label: "Perceived premium uplift", value: "+34%" },
      { label: "Retail buyer acceptance", value: "+22%" },
      { label: "Repeat purchase growth", value: "+27%" },
    ],
    auditFindings: [
      "Visual hierarchy buried core claims and trust markers.",
      "Unboxing lacked sequence, reducing premium feel.",
      "Surface finish failed to communicate product quality.",
    ],
    interventions: [
      "Built a packaging strategy map before design execution.",
      "Introduced a high-contrast hierarchy for instant shelf readability.",
      "Applied tactile finishing plan aligned with pricing expectations.",
    ],
    outcomes: [
      "Stronger first impression in offline retail and D2C listing images.",
      "Higher confidence among distributors during onboarding.",
      "Packaging now supports a premium narrative without extra ad spend.",
    ],
    quote:
      "For the first time, our packaging felt as credible as our formula. Buyer conversations changed immediately.",
    quoteAuthor: "Founder, Beauty D2C Brand",
  },
  {
    slug: "conversion-focused-content",
    title: "Conversion-Focused Content",
    brand: "Emerging Wellness Label",
    sector: "Nutraceuticals",
    engagement: "6-week conversion improvement sprint",
    heroSummary:
      "The pack looked clean but did not convert. We rebuilt front-panel messaging and proof architecture to guide buyer decisions in seconds.",
    beforeImage: "/assets/images/compare_2.png",
    afterImage: "/assets/images/compare_2.png",
    trustStats: [
      { label: "PDP conversion uplift", value: "+19%" },
      { label: "Message clarity score", value: "+41%" },
      { label: "Refund queries reduction", value: "-16%" },
    ],
    auditFindings: [
      "Benefits and proof points were not prioritized for buyer psychology.",
      "Too many competing claims reduced trust.",
      "Missing visual anchors for efficacy and compliance confidence.",
    ],
    interventions: [
      "Created a conversion-led content stack by decision priority.",
      "Reduced cognitive load using claim hierarchy and spacing discipline.",
      "Integrated trust badges and proof language in high-attention zones.",
    ],
    outcomes: [
      "Shoppers understood value proposition faster on shelf and online.",
      "Lower pre-purchase confusion from clearer information architecture.",
      "Improved performance without changing product formula.",
    ],
    quote:
      "We stopped guessing what to say on-pack. The messaging now sells for us before our sales team does.",
    quoteAuthor: "CMO, Wellness Brand",
  },
  {
    slug: "roi-tracking-reporting",
    title: "ROI Tracking & Reporting",
    brand: "Multi-SKU Food Startup",
    sector: "Packaged foods",
    engagement: "10-week redesign with ROI instrumentation",
    heroSummary:
      "The team invested in packaging but could not prove business impact. We designed the pack and the tracking layer together to connect decisions with outcomes.",
    beforeImage: "/assets/images/16.png",
    afterImage: "/assets/images/13.png",
    trustStats: [
      { label: "Measured campaign ROI", value: "+2.8x" },
      { label: "Retail pickup increase", value: "+24%" },
      { label: "Damage complaints", value: "-21%" },
    ],
    auditFindings: [
      "No baseline metrics tied to structural and visual changes.",
      "Inconsistent SKU architecture made testing unreliable.",
      "Post-launch reporting was anecdotal, not decision-grade.",
    ],
    interventions: [
      "Set pre/post KPI framework with pack-level attribution tags.",
      "Standardized SKU system to enable clean A/B comparisons.",
      "Delivered monthly board-ready reporting templates and dashboards.",
    ],
    outcomes: [
      "Leadership gained confidence to scale packaging investment.",
      "Team could prioritize high-impact improvements with evidence.",
      "Packaging moved from cost center perception to growth lever.",
    ],
    quote:
      "This was the first packaging project we could defend with numbers, not opinions.",
    quoteAuthor: "Head of Growth, Food Brand",
  },
  {
    slug: "testing-optimization",
    title: "Real Testing & Optimization",
    brand: "Direct-to-Consumer Supplements",
    sector: "Health and wellness",
    engagement: "12-week iterative optimization program",
    heroSummary:
      "The client needed more than a one-time redesign. We created a live optimization loop using customer behavior, shipping performance, and channel feedback.",
    beforeImage: "/assets/images/17.jpg",
    afterImage: "/assets/images/8.png",
    trustStats: [
      { label: "Checkout conversion", value: "+17%" },
      { label: "Shipping incident rate", value: "-29%" },
      { label: "Retention after 60 days", value: "+18%" },
    ],
    auditFindings: [
      "Design assumptions were never validated against customer behavior.",
      "Structural weaknesses affected delivery quality and confidence.",
      "No repeatable test loop across channels and formats.",
    ],
    interventions: [
      "Ran controlled packaging tests across creative and structure.",
      "Improved insert flow, opening sequence, and protection layers.",
      "Built a repeatable optimization cadence with team ownership.",
    ],
    outcomes: [
      "Client now makes packaging decisions with data confidence.",
      "Reduced avoidable support tickets tied to damaged deliveries.",
      "Sustained month-over-month performance improvements.",
    ],
    quote:
      "Brands Face didn’t hand over files and disappear. They built a system that keeps improving.",
    quoteAuthor: "Operations Lead, D2C Supplement Brand",
  },
  {
    slug: "transparent-reporting",
    title: "Transparent Reporting",
    brand: "Founder-Led Personal Care Brand",
    sector: "Personal care",
    engagement: "7-week redesign with investor-ready reporting",
    heroSummary:
      "The founder needed clarity and accountability, not design jargon. We made progress visible week by week with transparent reporting and practical next actions.",
    beforeImage: "/assets/images/12.png",
    afterImage: "/assets/images/5.png",
    trustStats: [
      { label: "Founder confidence score", value: "+46%" },
      { label: "Time to approval", value: "-35%" },
      { label: "Launch readiness index", value: "+31%" },
    ],
    auditFindings: [
      "Prior agency updates were visual-heavy but insight-light.",
      "Decision timelines slipped due to unclear milestones.",
      "Key risks were not surfaced early enough to act on.",
    ],
    interventions: [
      "Established transparent weekly reporting with risk flags.",
      "Mapped each design decision to customer and business outcomes.",
      "Created approval gates with clear evidence and trade-offs.",
    ],
    outcomes: [
      "Stakeholders aligned faster and approved with higher certainty.",
      "Founder could communicate progress confidently to investors.",
      "Project finished with fewer revisions and better market fit.",
    ],
    quote:
      "The reporting quality built trust as much as the design quality did.",
    quoteAuthor: "Founder, Personal Care Startup",
  },
];

type PageProps = {
  params: Promise<{ slug: string }>;
};

function getStudy(slug: string): Study | undefined {
  return STUDIES.find((study) => study.slug === slug);
}

export function generateStaticParams() {
  return STUDIES.map((study) => ({ slug: study.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const study = getStudy(slug);

  if (!study) {
    return {
      title: "Case Study | Brands Face",
      description: "Audit-led packaging case study from Brands Face.",
    };
  }

  return {
    title: `${study.title} | Brands Face Case Study`,
    description: study.heroSummary,
  };
}

export default async function ProductStudyCasePage({ params }: PageProps) {
  const { slug } = await params;
  const study = getStudy(slug);
  if (!study) notFound();

  return (
    <main className="min-h-screen bg-[#f4efe7]">
      <section className="relative overflow-hidden bg-[#103a2a] pb-14 sm:pb-20">
        <HomeHeroNavbar />
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -left-24 top-4 h-72 w-72 rounded-full bg-emerald-700/20 blur-[110px]" />
          <div className="absolute -right-12 bottom-0 h-80 w-80 rounded-full bg-emerald-500/20 blur-[130px]" />
        </div>

        <div className="relative mx-auto max-w-[1260px] px-4 sm:px-6 lg:px-8 pt-28 sm:pt-32">
          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-emerald-300">
                Client Trust Case Study
              </p>
              <h1 className="mt-3 text-3xl font-black leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
                {study.title}
              </h1>
              <p className="mt-4 max-w-3xl text-sm leading-relaxed text-emerald-50/90 sm:text-base">
                {study.heroSummary}
              </p>

              <div className="mt-6 flex flex-wrap gap-2">
                <span className="rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wide text-white">
                  {study.brand}
                </span>
                <span className="rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wide text-white">
                  {study.sector}
                </span>
                <span className="rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wide text-white">
                  {study.engagement}
                </span>
              </div>
            </div>

            <div className="rounded-2xl border border-emerald-200/20 bg-[#0d2f22]/70 p-5 sm:p-6">
              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-emerald-300">
                Trust Snapshot
              </p>
              <div className="mt-5 grid gap-3 sm:grid-cols-3">
                {study.trustStats.map((item) => (
                  <div key={item.label} className="rounded-xl border border-white/10 bg-white/[0.04] p-3">
                    <p className="text-xl font-black text-white">{item.value}</p>
                    <p className="mt-1 text-[11px] font-medium leading-snug text-emerald-50/80">{item.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1260px] px-4 py-12 sm:px-6 sm:py-14 lg:px-8">
        <div className="grid gap-5 lg:grid-cols-2">
          <article className="overflow-hidden rounded-3xl border border-[#0f3325]/10 bg-white shadow-[0_16px_45px_rgba(16,58,42,0.08)]">
            <div className="relative min-h-[300px] sm:min-h-[360px]">
              <Image src={study.beforeImage} alt={`Before: ${study.title}`} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 600px" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
              <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-[#103a2a]">
                Before
              </span>
            </div>
          </article>
          <article className="overflow-hidden rounded-3xl border border-[#0f3325]/10 bg-white shadow-[0_16px_45px_rgba(16,58,42,0.08)]">
            <div className="relative min-h-[300px] sm:min-h-[360px]">
              <Image src={study.afterImage} alt={`After: ${study.title}`} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 600px" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
              <span className="absolute left-4 top-4 rounded-full bg-[#1dd1a1] px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-[#0f2f22]">
                After
              </span>
            </div>
          </article>
        </div>
      </section>

      <section className="mx-auto max-w-[1260px] px-4 pb-10 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-[#0f3325]/10 bg-white p-6 shadow-[0_16px_50px_rgba(16,58,42,0.08)] sm:p-8">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#103a2a]/70">Our Journey With This Brand</p>
          <div className="mt-6 grid gap-5 lg:grid-cols-3">
            <article className="rounded-2xl border border-[#103a2a]/10 bg-[#f7f3ed] p-5">
              <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#8a4b3c]">1. Audit</p>
              <h2 className="mt-2 text-xl font-black tracking-tight text-[#103a2a]">What We Found</h2>
              <ul className="mt-4 space-y-2">
                {study.auditFindings.map((item) => (
                  <li key={item} className="text-sm leading-relaxed text-[#103a2a]/88">
                    - {item}
                  </li>
                ))}
              </ul>
            </article>

            <article className="rounded-2xl border border-[#103a2a]/10 bg-[#f7f3ed] p-5">
              <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#106a4f]">2. Improvement</p>
              <h2 className="mt-2 text-xl font-black tracking-tight text-[#103a2a]">What We Changed</h2>
              <ul className="mt-4 space-y-2">
                {study.interventions.map((item) => (
                  <li key={item} className="text-sm leading-relaxed text-[#103a2a]/88">
                    - {item}
                  </li>
                ))}
              </ul>
            </article>

            <article className="rounded-2xl border border-[#103a2a]/10 bg-[#f7f3ed] p-5">
              <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#14533f]">3. Success</p>
              <h2 className="mt-2 text-xl font-black tracking-tight text-[#103a2a]">What It Delivered</h2>
              <ul className="mt-4 space-y-2">
                {study.outcomes.map((item) => (
                  <li key={item} className="text-sm leading-relaxed text-[#103a2a]/88">
                    - {item}
                  </li>
                ))}
              </ul>
            </article>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1260px] px-4 pb-16 sm:px-6 sm:pb-20 lg:px-8">
        <div className="grid gap-5 lg:grid-cols-[1.15fr_0.85fr]">
          <article className="rounded-3xl border border-[#0f3325]/10 bg-white p-6 shadow-[0_16px_50px_rgba(16,58,42,0.08)] sm:p-8">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#103a2a]/70">Client Voice</p>
            <blockquote className="mt-4 text-lg leading-relaxed text-[#103a2a] sm:text-xl">
              "{study.quote}"
            </blockquote>
            <p className="mt-4 text-sm font-semibold text-[#103a2a]/80">- {study.quoteAuthor}</p>
          </article>

          <article className="rounded-3xl bg-[#103a2a] p-6 text-white shadow-[0_20px_55px_rgba(16,58,42,0.28)] sm:p-8">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-300">Build Trust In Your Category</p>
            <h3 className="mt-3 text-2xl font-black leading-tight tracking-tight">
              Get Your Packaging Audit and See What Is Holding Your Brand Back.
            </h3>
            <p className="mt-4 text-sm leading-relaxed text-emerald-50/85">
              We will review your current packaging, show where perception leaks are happening, and give you a
              practical roadmap to improve conversion and confidence.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/quote"
                className="rounded-full bg-[#1dd1a1] px-5 py-2.5 text-sm font-bold text-[#0f2f22] transition hover:bg-[#37dfb2]"
              >
                Request Free Audit
              </Link>
              <Link
                href={defaultCategoryHubPath()}
                className="rounded-full border border-white/25 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                Explore Services
              </Link>
            </div>
          </article>
        </div>
      </section>

      <Footer />
    </main>
  );
}
