"use client";

import Image from "next/image";
import AnimateOnScroll from "@/components/ui/AnimateOnScroll";

/* ── Feature bullet data ── */
const FEATURES = [
  "12 box types with real-time 3D preview",
  "Upload artwork & textures instantly",
  "Choose materials, finishes & colors",
  "Export high-quality renders in one click",
  "Free to use — no account needed",
];

export default function StudioShowcase() {
  const handleOpenStudio = () => {
    window.open("/studio", "_blank", "noopener,noreferrer");
  };

  return (
    <section className="w-full bg-[#2563EB] py-16 md:py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* ── Top: Heading + Features ── */}
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-8 lg:gap-16 mb-12 md:mb-16">
          {/* Left — Heading + CTA */}
          <AnimateOnScroll animation="slide-left" className="max-w-xl">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-[1.15] tracking-tight italic">
              The easiest way to{" "}
              <span className="not-italic">design custom packaging</span>
            </h2>

            <button
              onClick={handleOpenStudio}
              className="mt-8 inline-flex items-center gap-2 bg-[#111111] text-white text-sm font-semibold px-7 py-3.5 rounded-full hover:bg-black transition-colors shadow-lg hover:shadow-xl"
            >
              Design now
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </button>
          </AnimateOnScroll>

          {/* Right — Feature list */}
          <AnimateOnScroll animation="slide-right" stagger as="ul" className="space-y-4 pt-1">
            {FEATURES.map((feature) => (
              <li key={feature} className="flex items-start gap-3">
                <svg
                  className="w-5 h-5 text-white mt-0.5 shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span className="text-white/90 text-base md:text-lg font-medium">
                  {feature}
                </span>
              </li>
            ))}
          </AnimateOnScroll>
        </div>

        {/* ── Bottom: Editor mockup ── */}
        <AnimateOnScroll animation="scale-in" delay={200}>
        <div
          onClick={handleOpenStudio}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") handleOpenStudio();
          }}
          className="group relative cursor-pointer"
        >
          {/* Device frame */}
          <div className="relative rounded-2xl md:rounded-3xl border-[6px] md:border-[8px] border-[#1a1a3e] bg-[#1a1a3e] shadow-2xl shadow-black/30 overflow-hidden transition-transform duration-500 group-hover:-translate-y-1 group-hover:shadow-3xl">
            {/* Browser chrome bar */}
            <div className="flex items-center gap-2 px-4 py-2.5 bg-[#1a1a3e]">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-red-400" />
                <span className="w-3 h-3 rounded-full bg-yellow-400" />
                <span className="w-3 h-3 rounded-full bg-green-400" />
              </div>
              <div className="flex-1 flex justify-center">
                <div className="bg-white/10 rounded-md px-4 py-1 text-xs text-white/50 font-mono max-w-xs w-full text-center">
                  brandscafe.com/studio
                </div>
              </div>
              <div className="w-[54px]" /> {/* spacer for symmetry */}
            </div>

            {/* Studio screenshot / preview */}
            <div className="relative w-full aspect-[16/9] bg-[#13131f]">
              <Image
                src="/studio.png"
                alt="Brands Cafe 3D Studio — Design your custom packaging"
                fill
                className="object-cover object-top"
                sizes="(max-width: 1280px) 100vw, 1280px"
                priority
              />

              {/* Fallback overlay when image is missing */}
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#13131f]/80 opacity-0 [&:has(+_img[style*='display:none'])]:opacity-100 transition-opacity pointer-events-none">
                <div className="w-16 h-16 rounded-2xl bg-[#7c5cfc] flex items-center justify-center mb-4">
                  <svg
                    className="w-8 h-8 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                    />
                  </svg>
                </div>
                <p className="text-white text-lg font-semibold">
                  3D Box Configurator
                </p>
                <p className="text-gray-400 text-sm mt-1">
                  Click to open in a new window
                </p>
              </div>

              {/* Hover overlay */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                <div className="opacity-0 group-hover:opacity-100 transition-all duration-300 scale-90 group-hover:scale-100">
                  <div className="flex items-center gap-3 bg-white text-gray-900 font-semibold text-sm px-6 py-3 rounded-full shadow-xl">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                      />
                    </svg>
                    Open 3D Studio
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom toolbar mockup */}
            <div className="flex items-center justify-center gap-1 py-3 bg-[#1a1a3e]">
              {["Outside", "Inside", "3D view", "2D view"].map((label, idx) => (
                <span
                  key={label}
                  className={`text-xs px-4 py-1.5 rounded-full font-medium transition-colors ${
                    idx === 2
                      ? "bg-white/15 text-white"
                      : "text-white/40 hover:text-white/60"
                  }`}
                >
                  {label}
                </span>
              ))}
            </div>
          </div>

          {/* Glow effect behind the frame */}
          <div className="absolute -inset-4 bg-blue-400/20 rounded-[40px] blur-3xl -z-10 group-hover:bg-blue-400/30 transition-colors duration-500" />
        </div>
        </AnimateOnScroll>
      </div>
    </section>
  );
}
