"use client";

import Image from "next/image";
import Link from "next/link";
import AnimateOnScroll from "@/components/ui/AnimateOnScroll";

/* ── Types ── */
export type IndustryItem = {
  id: string;
  title: string;
  description: string;
  imageSrc: string;
  href: string;
  badge?: string; // e.g. "Coming Soon"
};

type Props = {
  title: string;
  items: IndustryItem[];
  /** When set, remounts the grid on change and runs staggered card entrance (e.g. category tab id). */
  itemsKey?: string;
};

/* ── Main component ── */
export default function IndustryPackagingSlider({ title, items, itemsKey }: Props) {
  return (
    <section className="w-full py-12 md:py-16 md:pt-0">
      <AnimateOnScroll animation="blur-in">
        <h2 className="mb-8 text-center text-3xl font-bold tracking-tight md:mb-10 md:text-4xl">
          {title}
        </h2>
      </AnimateOnScroll>

      <AnimateOnScroll animation="fade-in" delay={100}>
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          {items.length === 0 ? (
            <p className="py-12 text-center text-sm text-gray-500 md:text-base">
              No products in this filter yet — try another tab.
            </p>
          ) : (
            <div
              key={itemsKey ?? "industry-grid"}
              className="grid grid-cols-2 gap-x-3 gap-y-6 sm:gap-x-6 sm:gap-y-10 lg:grid-cols-4 lg:gap-x-8 lg:gap-y-12"
            >
              {items.map((item, index) => (
                <div
                  key={itemsKey ? `${itemsKey}-${item.id}` : item.id}
                  className={itemsKey ? "category-slider-card-in h-full min-w-0" : "h-full min-w-0"}
                  style={
                    itemsKey
                      ? { animationDelay: `${Math.min(index, 8) * 52}ms` }
                      : undefined
                  }
                >
                  <Link href={item.href} className="group block h-full pb-1">
                    <div className="relative overflow-hidden rounded-xl bg-gray-100 sm:rounded-2xl">
                      <div className="relative aspect-square w-full">
                        <Image
                          src={item.imageSrc}
                          alt={item.title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                          sizes="(max-width: 1024px) 45vw, 25vw"
                        />
                      </div>

                      {item.badge && (
                        <span className="absolute right-3 top-3 rounded-full bg-white px-3 py-1 text-xs font-medium text-gray-800 shadow-sm">
                          {item.badge}
                        </span>
                      )}
                    </div>

                    <div className="mt-2 flex items-center justify-center gap-1 sm:mt-3 sm:gap-2">
                      <h3 className="text-center text-[11px] font-semibold leading-snug text-gray-900 transition-colors group-hover:text-[var(--color-nav-active)] min-[380px]:text-xs sm:text-base md:text-lg">
                        {item.title}
                      </h3>
                      <span className="text-gray-400 transition-transform duration-300 group-hover:translate-x-1">
                        &rarr;
                      </span>
                    </div>

                    {/* <p className="mt-1.5 line-clamp-3 text-sm leading-relaxed text-gray-500">
                      {item.description}
                    </p> */}
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      </AnimateOnScroll>
    </section>
  );
}
