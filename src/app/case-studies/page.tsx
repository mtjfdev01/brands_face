 "use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Footer from "@/components/home/Footer";

const CASE_STUDIES = [
  {
    title: "Skincare D2C Brand Reposition",
    category: "Cosmetics Packaging",
    challenge:
      "Premium product quality was not reflected in packaging, resulting in weak shelf trust and low repeat purchase intent.",
    solution:
      "Introduced rigid mono-carton system with cleaner hierarchy, premium finishes, and stronger visual brand architecture.",
    impact: ["+31% repeat orders", "-14% shipping damage", "+22% conversion uplift"],
    image: "/assets/images/categories/rigid_box.jpeg",
  },
  {
    title: "Food Startup Shipping Optimization",
    category: "Corrugated Packaging",
    challenge:
      "High shipping costs and inconsistent unboxing quality were reducing perceived product value at delivery.",
    solution:
      "Redesigned corrugated dieline for volume efficiency, structural integrity, and branded opening flow.",
    impact: ["-18% logistics cost", "+27% unboxing satisfaction", "+19% referral share rate"],
    image: "/assets/images/categories/coregerated_box.jpeg",
  },
  {
    title: "Snack Line Retail Refresh",
    category: "Custom Pouches",
    challenge:
      "Crowded category competition and low product discoverability were limiting retail traction.",
    solution:
      "Launched new pouch visual system with stronger contrast, category-coded color strategy, and better front-of-pack messaging.",
    impact: ["+24% shelf pickup", "+29% visual recall", "+17% first-time trial"],
    image: "/assets/images/categories/pouch.jpeg",
  },
];

const STATS = [
  { value: "120+", label: "Packaging Audits Delivered" },
  { value: "38%", label: "Avg. Perceived Value Uplift" },
  { value: "21%", label: "Avg. Conversion Improvement" },
  { value: "7", label: "Core Packaging Categories" },
];

export default function CaseStudiesPage() {
  const statsRef = useRef<HTMLDivElement>(null);
  const studiesRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLElement>(null);
  const [statsInView, setStatsInView] = useState(false);
  const [studiesInView, setStudiesInView] = useState(false);
  const [ctaInView, setCtaInView] = useState(false);

  useEffect(() => {
    const statsEl = statsRef.current;
    const studiesEl = studiesRef.current;
    const ctaEl = ctaRef.current;
    if (!statsEl || !studiesEl || !ctaEl) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          if (entry.target === statsEl) setStatsInView(true);
          if (entry.target === studiesEl) setStudiesInView(true);
          if (entry.target === ctaEl) setCtaInView(true);
        });
      },
      { threshold: 0.2 },
    );

    observer.observe(statsEl);
    observer.observe(studiesEl);
    observer.observe(ctaEl);

    return () => observer.disconnect();
  }, []);

  return (
    <main className="min-h-screen bg-[#f5f0ea]">
      <section className="relative overflow-hidden bg-[#103a2a] pb-24 pt-20 sm:pt-24">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-20 left-1/4 h-[320px] w-[320px] rounded-full bg-emerald-800/25 blur-[100px]" />
          <div className="absolute -bottom-24 right-1/4 h-[360px] w-[360px] rounded-full bg-emerald-700/20 blur-[120px]" />
        </div>

        <div className="relative mx-auto max-w-[1240px] px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl border border-white/15 bg-white/[0.04] p-4 backdrop-blur-xl sm:p-5 ">
            <div className="flex items-center justify-between gap-3">
              <Link href="/" className="text-lg font-black tracking-tight text-white sm:text-xl">
                Brands Face
              </Link>
              <div className="flex items-center gap-2">
                <Link
                  href="/sale"
                  className="rounded-full border border-white/20 px-4 py-2 text-xs font-semibold text-white/90 transition hover:bg-white/10 sm:text-sm"
                >
                  Solutions
                </Link>
                <Link
                  href="/quote"
                  className="rounded-full bg-[#1dd1a1] px-4 py-2 text-xs font-bold text-[#0f2f22] transition hover:bg-[#37dfb2] sm:text-sm"
                >
                  Get Free Audit
                </Link>
              </div>
            </div>
          </div>

          <div className="mt-16 max-w-4xl">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-emerald-300">Case Studies</p>
            <h1 className="mt-4 text-4xl font-black leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
              Packaging Strategies That
              <span className="block text-emerald-300">Move Revenue, Not Just Boxes</span>
            </h1>
            <p className="mt-6 max-w-3xl text-sm leading-relaxed text-emerald-50/85 sm:text-base">
              Explore how Brands Face helps growing brands turn weak packaging into high-performing product experiences
              through audit-led strategy, structural optimization, and premium design execution.
            </p>
          </div>
        </div>
      </section>

      <section className="relative z-10 -mt-4 pb-20 sm:-mt-6">
        <div className="mx-auto max-w-[1240px] px-4 sm:px-6 lg:px-8">
          <div ref={statsRef} className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {STATS.map((stat, idx) => (
              <article
                key={stat.label}
                className="rounded-2xl border border-[#0f3325]/10 bg-white p-5 shadow-sm transition-all duration-700"
                style={{
                  opacity: statsInView ? 1 : 0,
                  transform: statsInView ? "translateY(0px)" : "translateY(24px)",
                  transitionDelay: `${idx * 90}ms`,
                }}
              >
                <p className="text-3xl font-black text-[#103a2a]">{stat.value}</p>
                <p className="mt-1 text-xs font-medium uppercase tracking-wide text-[#103a2a]/70">{stat.label}</p>
              </article>
            ))}
          </div>

          <div ref={studiesRef} className="mt-10 space-y-6">
            {CASE_STUDIES.map((study, idx) => (
              <article
                key={study.title}
                className="overflow-hidden rounded-3xl border border-[#0f3325]/10 bg-white shadow-[0_16px_50px_rgba(16,58,42,0.08)] transition-all duration-700"
                style={{
                  opacity: studiesInView ? 1 : 0,
                  transform: studiesInView ? "translateY(0px)" : "translateY(34px)",
                  transitionDelay: `${idx * 140}ms`,
                }}
              >
                <div className="grid lg:grid-cols-[360px_1fr]">
                  <div className="relative min-h-[260px]">
                    <Image src={study.image} alt={study.title} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 360px" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                    <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-[#103a2a]">
                      {study.category}
                    </span>
                  </div>

                  <div className="p-6 sm:p-8">
                    <h2 className="text-2xl font-black tracking-tight text-[#103a2a]">{study.title}</h2>

                    <div className="mt-5 grid gap-4 sm:grid-cols-2">
                      <div className="rounded-xl border border-red-100 bg-red-50/60 p-4">
                        <p className="text-xs font-bold uppercase tracking-wide text-red-700">Challenge</p>
                        <p className="mt-2 text-sm leading-relaxed text-red-900/90">{study.challenge}</p>
                      </div>
                      <div className="rounded-xl border border-emerald-100 bg-emerald-50/60 p-4">
                        <p className="text-xs font-bold uppercase tracking-wide text-emerald-700">Solution</p>
                        <p className="mt-2 text-sm leading-relaxed text-emerald-900/90">{study.solution}</p>
                      </div>
                    </div>

                    <div className="mt-5 flex flex-wrap gap-2">
                      {study.impact.map((item) => (
                        <span
                          key={item}
                          className="rounded-full border border-[#103a2a]/15 bg-[#103a2a]/5 px-3 py-1.5 text-xs font-semibold text-[#103a2a]"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <section
            ref={ctaRef}
            className="mt-12 rounded-3xl bg-[#103a2a] px-6 py-10 text-center transition-all duration-700 sm:px-10"
            style={{
              opacity: ctaInView ? 1 : 0,
              transform: ctaInView ? "translateY(0px) scale(1)" : "translateY(28px) scale(0.98)",
            }}
          >
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-emerald-300">Ready For Your Growth Story?</p>
            <h3 className="mx-auto mt-4 max-w-3xl text-3xl font-black leading-tight tracking-tight text-white sm:text-4xl">
              Get a Free Packaging Audit and Discover What Is Holding Your Brand Back
            </h3>
            <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-emerald-50/85 sm:text-base">
              We analyze your current packaging, identify conversion and perception gaps, and send a practical strategy report
              you can execute immediately.
            </p>
            <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/quote"
                className="rounded-full bg-[#1dd1a1] px-6 py-3 text-sm font-bold text-[#0f2f22] transition hover:bg-[#37dfb2]"
              >
                Request Free Audit
              </Link>
              <Link
                href="/sale"
                className="rounded-full border border-white/25 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                Explore Packaging Services
              </Link>
            </div>
          </section>
        </div>
      </section>
      <Footer />
    </main>
  );
}
