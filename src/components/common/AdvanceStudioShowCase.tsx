"use client";

import AnimateOnScroll from "@/components/ui/AnimateOnScroll";
import StudioCanvasPreview from "@/components/common/StudioCanvasPreview";

const FEATURES = [
  "12 box types with real-time 3D preview",
  "Upload artwork & textures instantly",
  "Choose materials, finishes & colors",
  "Export high-quality renders in one click",
  // "Free to use — no account needed",
];

export default function AdvanceStudioShowCase() {
  const handleOpenStudio = () => {
    window.open("/studio", "_blank", "noopener,noreferrer");
  };

  return (
    <section className="relative w-full overflow-hidden py-16 md:py-24 bg-[#123b2b]">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-24 -left-16 w-72 h-72 rounded-full bg-[#2bc18a]/25 blur-3xl animate-pulse" />
        <div className="absolute -bottom-24 -right-10 w-80 h-80 rounded-full bg-[var(--color-brand-accent)]/20 blur-3xl animate-pulse [animation-delay:0.8s]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(480px,56%)] gap-10 lg:gap-12 items-center">
          <AnimateOnScroll animation="slide-left" className="max-w-2xl">
            <p className="inline-flex items-center gap-2 text-xs sm:text-sm text-white/70 tracking-[0.16em] uppercase mb-4">
              <span className="w-8 h-px bg-[#57d7aa]" />
              Smart Packaging Studio
            </p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white leading-[1.08] tracking-tight">
              Build your box in{" "}
              <span className="text-[#57d7aa]">real time</span>
              <br />
              with an advanced 3D workflow
            </h2>

            <div className="mt-8 flex flex-wrap gap-3">
              <button
                onClick={handleOpenStudio}
                className="group relative inline-flex items-center gap-2 bg-white text-[#123b2b] text-sm font-semibold px-7 py-3.5 rounded-full shadow-lg hover:shadow-2xl transition-all"
              >
                Design now
                <svg className="w-4 h-4 transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.4}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </button>

              <button
                onClick={handleOpenStudio}
                className="inline-flex items-center gap-2 border border-white/25 text-white/90 text-sm font-semibold px-6 py-3.5 rounded-full hover:bg-white/10 transition-all"
              >
                Open studio preview
              </button>
            </div>

            <AnimateOnScroll animation="slide-right" stagger as="ul" className="space-y-3 pt-8">
              {FEATURES.map((feature) => (
                <li key={feature} className="flex items-start gap-3">
                  <span className="mt-1.5 w-2 h-2 rounded-full bg-[#57d7aa] shadow-[0_0_12px_#57d7aa] shrink-0" />
                  <span className="text-white/90 text-base md:text-lg font-medium">{feature}</span>
                </li>
              ))}
            </AnimateOnScroll>
          </AnimateOnScroll>

          <AnimateOnScroll animation="scale-in" delay={180} className="w-full">
            <div className="rounded-2xl border border-white/20 p-3 bg-white/[0.03]">
              <StudioCanvasPreview />
            </div>
          </AnimateOnScroll>
        </div>
      </div>
    </section>
  );
}
