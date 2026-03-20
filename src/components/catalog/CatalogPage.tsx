"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Footer from "@/components/home/Footer";
import AnimateOnScroll from "@/components/ui/AnimateOnScroll";
import { HOME_CARDS } from "@/data/homeCards";

const CATEGORY_IMAGE_MAP: Record<string, string> = Object.fromEntries(
  HOME_CARDS.map((item) => [item.title.toLowerCase(), item.image]),
);

const CATALOG_CATEGORIES = [
  {
    id: "rigid",
    title: "Rigid Boxes",
    slug: "rigid_boxes",
    description:
      "Premium packaging for luxury products, gifts, apparel, and cosmetics. Ideal for stronger presentation and perceived value.",
    tags: ["Premium", "Luxury", "Retail"],
    image: CATEGORY_IMAGE_MAP["rigid boxes"],
    industries: ["Cosmetics", "Apparel", "Gift Brands"],
    materialFinish: ["Art Card", "Gold Foil", "Embossing", "Debossing", "Matte / Gloss"],
    purposes: ["Branding", "Premium Presentation", "Shelf Appeal"],
  },
  {
    id: "corrugated",
    title: "Corrugated Boxes",
    slug: "corrugated_boxes",
    description:
      "High-strength shipping and storage packaging designed for ecommerce logistics, transit protection, and scalable operations.",
    tags: ["Shipping", "Ecommerce", "Durable"],
    image: CATEGORY_IMAGE_MAP["corrugated boxes"],
    industries: ["Ecommerce", "Food"],
    materialFinish: ["Kraft", "Matte / Gloss"],
    purposes: ["Shipping", "Branding"],
  },
  {
    id: "pouches",
    title: "Custom Pouches",
    slug: "custom_pouches",
    description:
      "Flexible pouch solutions for food, cosmetics, and lifestyle products with strong shelf visibility and convenience features.",
    tags: ["Flexible", "Shelf Appeal", "Consumer Friendly"],
    image: CATEGORY_IMAGE_MAP["custom pouches"],
    industries: ["Food", "Cosmetics", "Ecommerce"],
    materialFinish: ["Matte / Gloss", "Gold Foil"],
    purposes: ["Shelf Appeal", "Branding"],
  },
  {
    id: "hang-tags",
    title: "Hang Tags",
    slug: "labels_tags",
    description:
      "Custom hang tags with foil, embossing, and textured stock to strengthen fashion, gift, and premium product branding.",
    tags: ["Branding", "Fashion", "Premium Finish"],
    image: CATEGORY_IMAGE_MAP["labels & tags"],
    industries: ["Apparel", "Gift Brands"],
    materialFinish: ["Art Card", "Gold Foil", "Embossing", "Debossing", "Matte / Gloss"],
    purposes: ["Branding", "Premium Presentation"],
  },
  {
    id: "labels",
    title: "Labels",
    slug: "labels_tags",
    description:
      "Product and shipping labels engineered for clarity, consistency, and stronger brand recall across every customer touchpoint.",
    tags: ["Branding", "Compliance", "Retail"],
    image: CATEGORY_IMAGE_MAP["labels & tags"],
    industries: ["Food", "Cosmetics", "Ecommerce", "Apparel"],
    materialFinish: ["Matte / Gloss", "Gold Foil"],
    purposes: ["Branding", "Shipping", "Shelf Appeal"],
  },
  {
    id: "art-card",
    title: "Art Cards",
    slug: "art_card",
    description:
      "Vibrant printed art-card packaging for high-impact presentation where color depth, finish quality, and detail matter.",
    tags: ["Print Quality", "Visual Impact", "Premium"],
    image: CATEGORY_IMAGE_MAP["art card"],
    industries: ["Cosmetics", "Apparel", "Gift Brands"],
    materialFinish: ["Art Card", "Matte / Gloss", "Embossing", "Debossing"],
    purposes: ["Branding", "Shelf Appeal", "Premium Presentation"],
  },
  {
    id: "luxury",
    title: "Luxury Packaging",
    slug: "rigid_boxes",
    description:
      "High-end packaging concepts combining refined structure and premium finishing to elevate brand perception and value.",
    tags: ["Luxury", "High Perceived Value", "Gifting"],
    image: CATEGORY_IMAGE_MAP["rigid boxes"],
    industries: ["Cosmetics", "Apparel", "Gift Brands"],
    materialFinish: ["Gold Foil", "Embossing", "Debossing", "Matte / Gloss"],
    purposes: ["Premium Presentation", "Branding", "Shelf Appeal"],
  },
  {
    id: "retail",
    title: "Retail Packaging",
    slug: "gift_boxes",
    description:
      "Retail-ready packaging designed for shelf differentiation, quick brand recognition, and conversion-focused visual hierarchy.",
    tags: ["Retail", "Shelf Appeal", "Conversion"],
    image: CATEGORY_IMAGE_MAP["gift boxes"],
    industries: ["Apparel", "Cosmetics", "Food", "Gift Brands"],
    materialFinish: ["Art Card", "Matte / Gloss", "Gold Foil"],
    purposes: ["Shelf Appeal", "Branding", "Premium Presentation"],
  },
  {
    id: "food",
    title: "Food Packaging",
    slug: "custom_pouches",
    description:
      "Food-safe packaging solutions balancing freshness protection, category fit, compliance messaging, and market-ready design.",
    tags: ["Food", "Freshness", "Compliance"],
    image: CATEGORY_IMAGE_MAP["custom pouches"],
    industries: ["Food", "Ecommerce"],
    materialFinish: ["Kraft", "Matte / Gloss"],
    purposes: ["Shipping", "Shelf Appeal", "Branding"],
  },
  {
    id: "cosmetics",
    title: "Cosmetic Packaging",
    slug: "rigid_boxes",
    description:
      "Cosmetic-focused packaging systems built for premium appearance, stronger unboxing, and clear product storytelling.",
    tags: ["Cosmetics", "Premium", "Unboxing"],
    image: CATEGORY_IMAGE_MAP["rigid boxes"],
    industries: ["Cosmetics", "Ecommerce"],
    materialFinish: ["Gold Foil", "Embossing", "Debossing", "Matte / Gloss"],
    purposes: ["Premium Presentation", "Branding", "Shelf Appeal"],
  },
];

const FILTER_GROUPS = [
  {
    key: "industry",
    title: "Browse by Industry",
    items: ["Cosmetics", "Apparel", "Food", "Ecommerce", "Gift Brands"],
  },
  {
    key: "packagingType",
    title: "Browse by Packaging Type",
    items: ["Rigid Boxes", "Corrugated Boxes", "Custom Pouches", "Labels", "Hang Tags", "Luxury Packaging"],
  },
  {
    key: "materialFinish",
    title: "Browse by Material & Finish",
    items: ["Kraft", "Art Card", "Gold Foil", "Embossing", "Debossing", "Matte / Gloss"],
  },
  {
    key: "purpose",
    title: "Browse by Purpose",
    items: ["Branding", "Shipping", "Shelf Appeal", "Premium Presentation"],
  },
] as const;

type FilterKey = (typeof FILTER_GROUPS)[number]["key"];

export default function CatalogPage() {
  const [activeFilters, setActiveFilters] = useState<Record<FilterKey, string | null>>({
    industry: null,
    packagingType: null,
    materialFinish: null,
    purpose: null,
  });

  const filteredCategories = useMemo(() => {
    return CATALOG_CATEGORIES.filter((item) => {
      if (activeFilters.industry && !item.industries.includes(activeFilters.industry)) return false;
      if (activeFilters.packagingType && item.title !== activeFilters.packagingType) return false;
      if (activeFilters.materialFinish && !item.materialFinish.includes(activeFilters.materialFinish)) return false;
      if (activeFilters.purpose && !item.purposes.includes(activeFilters.purpose)) return false;
      return true;
    });
  }, [activeFilters]);

  const hasActiveFilters = Object.values(activeFilters).some(Boolean);

  const toggleFilter = (key: FilterKey, value: string) => {
    setActiveFilters((prev) => ({
      ...prev,
      [key]: prev[key] === value ? null : value,
    }));
  };

  const clearFilters = () => {
    setActiveFilters({
      industry: null,
      packagingType: null,
      materialFinish: null,
      purpose: null,
    });
  };

  return (
    <main className="min-h-screen bg-[#f5f0ea]">
      <section className="relative overflow-hidden bg-[#103a2a] px-4 pb-20 pt-20 sm:px-6 sm:pt-24 lg:px-8">
        <div className="pointer-events-none absolute inset-0">
          <div className="catalog-glow absolute left-[14%] top-[-60px] h-72 w-72 rounded-full bg-emerald-400/20 blur-[120px]" />
          <div className="catalog-glow-delay absolute bottom-[-70px] right-[12%] h-80 w-80 rounded-full bg-cyan-400/18 blur-[120px]" />
        </div>

        <div className="relative mx-auto max-w-[1240px]">
          <div className="rounded-2xl border border-white/15 bg-white/[0.04] p-4 backdrop-blur-xl sm:p-5">
            <div className="flex items-center justify-between gap-3">
              <Link href="/" className="text-lg font-black tracking-tight text-white sm:text-xl">
                Brands Face
              </Link>
              <div className="flex items-center gap-2">
                <Link
                  href="/audit"
                  className="rounded-full border border-white/25 px-4 py-2 text-xs font-semibold text-white/90 transition hover:bg-white/10 sm:text-sm"
                >
                  Get Free Audit
                </Link>
                <Link
                  href="/quote"
                  className="rounded-full bg-[#1dd1a1] px-4 py-2 text-xs font-bold text-[#0f2f22] transition hover:bg-[#37dfb2] sm:text-sm"
                >
                  Get Quote
                </Link>
              </div>
            </div>
          </div>

          <div className="mt-14 max-w-4xl">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-emerald-300">
              Brand Packaging Solutions
            </p>
            <h1 className="mt-4 text-4xl font-black leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
              Explore Packaging Solutions
              <span className="block text-emerald-300">That Build Stronger Brands</span>
            </h1>
            <p className="mt-6 max-w-3xl text-sm leading-relaxed text-emerald-50/85 sm:text-base">
              Discover custom packaging categories designed to improve presentation, perceived value,
              and brand impact. Compare by industry, material, finish, and use case.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link
                href="/audit"
                className="rounded-full bg-[#1dd1a1] px-6 py-3 text-sm font-bold text-[#0f2f22] transition hover:bg-[#37dfb2]"
              >
                Get Free Packaging Audit
              </Link>
              <Link
                href="/quote"
                className="rounded-full border border-white/25 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                Request Custom Quote
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-[1240px] rounded-3xl border border-[#103a2a]/10 bg-white p-6 shadow-sm sm:p-8">
          <AnimateOnScroll animation="blur-in">
            <h2 className="text-3xl font-black tracking-tight text-[#103a2a] sm:text-4xl">
              Explore by Your Need
            </h2>
          </AnimateOnScroll>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-[#103a2a]/70 sm:text-base">
            This page is built to help both technical and non-technical users discover the right packaging
            path quickly, not just browse images.
          </p>

          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {FILTER_GROUPS.map((group, idx) => (
              <AnimateOnScroll key={group.title} animation="fade-up" delay={idx * 70}>
                <article className="rounded-2xl border border-[#103a2a]/10 bg-[#f8fbf9] p-5">
                  <h3 className="text-base font-black text-[#103a2a]">{group.title}</h3>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {group.items.map((item) => (
                      <button
                        key={item}
                        type="button"
                        onClick={() => toggleFilter(group.key, item)}
                        className={`rounded-full border px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.08em] transition ${
                          activeFilters[group.key] === item
                            ? "border-[#103a2a] bg-[#103a2a] text-white"
                            : "border-[#103a2a]/15 bg-white text-[#103a2a]/75 hover:border-[#103a2a]/40"
                        }`}
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                </article>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 pb-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-[1240px]">
          <AnimateOnScroll animation="blur-in">
            <h2 className="text-3xl font-black tracking-tight text-[#103a2a] sm:text-4xl">
              Packaging Categories
            </h2>
          </AnimateOnScroll>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-[#103a2a]/70 sm:text-base">
            Each category is presented as a solution card with strategic context, so visitors can understand
            where it fits before requesting consultation.
          </p>

          <div className="mt-5 flex flex-wrap items-center gap-3">
            <span className="rounded-full bg-[#103a2a] px-3 py-1 text-xs font-semibold uppercase tracking-[0.1em] text-white">
              {filteredCategories.length} Result{filteredCategories.length === 1 ? "" : "s"}
            </span>
            {hasActiveFilters ? (
              <button
                type="button"
                onClick={clearFilters}
                className="rounded-full border border-[#103a2a]/20 bg-white px-3 py-1 text-xs font-semibold uppercase tracking-[0.1em] text-[#103a2a] transition hover:border-[#103a2a]/45"
              >
                Clear Filters
              </button>
            ) : null}
          </div>

          <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {filteredCategories.map((card, idx) => (
              <AnimateOnScroll key={card.id} animation="fade-up" delay={idx * 45}>
                <article className="group overflow-hidden rounded-3xl border border-[#103a2a]/10 bg-white shadow-[0_12px_38px_rgba(16,58,42,0.09)] transition-transform duration-300 hover:-translate-y-1">
                  <div className="relative h-56 overflow-hidden">
                    <Image
                      src={card.image}
                      alt={card.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                    <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#103a2a]">
                      Solution
                    </span>
                    <p className="absolute bottom-4 left-4 right-4 text-xl font-black text-white drop-shadow">
                      {card.title}
                    </p>
                  </div>
                  <div className="p-5">
                    <p className="text-sm leading-relaxed text-[#103a2a]/75">{card.description}</p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {card.tags.map((tag) => (
                        <span
                          key={`${card.id}-${tag}`}
                          className="rounded-full border border-[#103a2a]/15 bg-[#f7faf8] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.08em] text-[#103a2a]/70"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="mt-5 flex items-center gap-2">
                      <Link
                        href={`/category/${card.slug}`}
                        className="rounded-full bg-[#103a2a] px-4 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-white transition hover:bg-[#0c2e22]"
                      >
                        View Details
                      </Link>
                      <Link
                        href="/quote"
                        className="rounded-full border border-[#103a2a]/20 px-4 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-[#103a2a] transition hover:border-[#103a2a]/40"
                      >
                        Get Quote
                      </Link>
                      <Link
                        href="/audit"
                        className="rounded-full border border-[#103a2a]/20 px-4 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-[#103a2a] transition hover:border-[#103a2a]/40"
                      >
                        Talk to Expert
                      </Link>
                    </div>
                  </div>
                </article>
              </AnimateOnScroll>
            ))}
          </div>
          {filteredCategories.length === 0 ? (
            <div className="mt-6 rounded-2xl border border-[#103a2a]/10 bg-white p-6 text-center">
              <p className="text-sm font-medium text-[#103a2a]/75">
                No categories match the selected filters. Clear filters to explore all options.
              </p>
            </div>
          ) : null}
        </div>
      </section>

      <section className="px-4 pb-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-[1240px] rounded-3xl border border-[#103a2a]/10 bg-white p-6 shadow-sm sm:p-8">
          <AnimateOnScroll animation="fade-up">
            <h3 className="text-2xl font-black tracking-tight text-[#103a2a] sm:text-3xl">
              Why Category Selection Matters
            </h3>
          </AnimateOnScroll>
          <div className="mt-5 grid gap-4 md:grid-cols-3">
            <article className="rounded-2xl border border-[#103a2a]/10 bg-[#f8fbf9] p-5">
              <h4 className="text-lg font-black text-[#103a2a]">Brand Perception</h4>
              <p className="mt-2 text-sm leading-relaxed text-[#103a2a]/75">
                Packaging structure and finishing directly influence how premium and trustworthy your
                brand feels on shelf and online.
              </p>
            </article>
            <article className="rounded-2xl border border-[#103a2a]/10 bg-[#f8fbf9] p-5">
              <h4 className="text-lg font-black text-[#103a2a]">Material + Finish Impact</h4>
              <p className="mt-2 text-sm leading-relaxed text-[#103a2a]/75">
                Material and finish choices affect protection, cost efficiency, print quality, and how
                your product competes in crowded categories.
              </p>
            </article>
            <article className="rounded-2xl border border-[#103a2a]/10 bg-[#f8fbf9] p-5">
              <h4 className="text-lg font-black text-[#103a2a]">Audit Before Manufacturing</h4>
              <p className="mt-2 text-sm leading-relaxed text-[#103a2a]/75">
                Auditing before production reduces expensive mistakes and aligns packaging decisions with
                your conversion, logistics, and growth goals.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="px-4 pb-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-[1240px] rounded-3xl bg-[#103a2a] px-6 py-10 text-center sm:px-10">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-emerald-300">
            Lead Discovery
          </p>
          <h3 className="mx-auto mt-4 max-w-3xl text-3xl font-black leading-tight tracking-tight text-white sm:text-4xl">
            Not Sure Which Packaging Fits Your Brand?
          </h3>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-emerald-50/85 sm:text-base">
            Get a free packaging audit and discover the right structure, material, and finish for your
            product before manufacturing.
          </p>
          <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/audit"
              className="rounded-full bg-[#1dd1a1] px-6 py-3 text-sm font-bold text-[#0f2f22] transition hover:bg-[#37dfb2]"
            >
              Book Free Audit
            </Link>
            <Link
              href="/quote"
              className="rounded-full border border-white/25 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              Start Your Packaging Project
            </Link>
          </div>
        </div>
      </section>

      <Footer />

      <style jsx>{`
        .catalog-glow {
          animation: glowMove 8s ease-in-out infinite alternate;
        }
        .catalog-glow-delay {
          animation: glowMove 9s ease-in-out infinite alternate-reverse;
        }
        @keyframes glowMove {
          0% {
            transform: translate3d(0, 0, 0) scale(1);
          }
          100% {
            transform: translate3d(18px, -14px, 0) scale(1.1);
          }
        }
      `}</style>
    </main>
  );
}
