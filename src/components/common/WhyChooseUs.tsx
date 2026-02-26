"use client";

import Image from "next/image";
import AnimateOnScroll from "@/components/ui/AnimateOnScroll";

/* ── Types ── */
export type FeatureCard = {
  id: string;
  title: string;
  description: string;
  imageSrc: string;
  bgColor: string; // Tailwind bg class e.g. "bg-blue-100"
};

type Props = {
  heading: string;
  subheading: string;
  features: FeatureCard[];
};

/* ── Single card ── */
function Card({ feature }: { feature: FeatureCard }) {
  return (
    <div
      className={`${feature.bgColor} rounded-3xl p-6 md:p-8 flex flex-col items-center text-center h-full transition-transform duration-300 hover:-translate-y-2 hover:shadow-xl`}
    >
      {/* Title */}
      <h3 className="text-lg font-bold text-gray-900 leading-snug md:text-xl">
        {feature.title}
      </h3>

      {/* Description */}
      <p className="mt-3 text-sm leading-relaxed text-gray-700/80 max-w-[280px]">
        {feature.description}
      </p>

      {/* Illustration */}
      <div className="relative mt-auto pt-5 w-full flex items-end justify-center">
        <div className="relative w-[180px] h-[160px] md:w-[200px] md:h-[180px]">
          <Image
            src={feature.imageSrc}
            alt={feature.title}
            fill
            className="object-contain object-bottom"
            sizes="200px"
          />
        </div>
      </div>
    </div>
  );
}

/* ── Main section ── */
export default function WhyChooseUs({ heading, subheading, features }: Props) {
  // Split into row 1 (first 4) and row 2 (remaining)
  const topRow = features.slice(0, 4);
  const bottomRow = features.slice(4);

  return (
    <section className="w-full py-14 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Heading */}
        <AnimateOnScroll animation="blur-in">
          <h2 className="text-center text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl">
            {heading}
          </h2>
        </AnimateOnScroll>

        {/* Subheading */}
        <AnimateOnScroll animation="fade-up" delay={100}>
          <p className="mx-auto mt-4 max-w-3xl text-center text-base leading-relaxed text-gray-600 md:text-lg">
            {subheading}
          </p>
        </AnimateOnScroll>

        {/* Top row — 4 cards */}
        <AnimateOnScroll animation="fade-up" stagger delay={200} className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
          {topRow.map((feature) => (
            <Card key={feature.id} feature={feature} />
          ))}
        </AnimateOnScroll>

        {/* Bottom row — 2 wider cards, centered */}
        {bottomRow.length > 0 && (
          <AnimateOnScroll animation="fade-up" stagger delay={400} className="mt-4 md:mt-5 grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5 max-w-3xl mx-auto">
            {bottomRow.map((feature) => (
              <Card key={feature.id} feature={feature} />
            ))}
          </AnimateOnScroll>
        )}
      </div>
    </section>
  );
}
