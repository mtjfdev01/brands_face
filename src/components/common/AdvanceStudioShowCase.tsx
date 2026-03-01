"use client";

import { useMemo, useState, type CSSProperties } from "react";
import Image from "next/image";
import AnimateOnScroll from "@/components/ui/AnimateOnScroll";

const FEATURES = [
  "12 box types with real-time 3D preview",
  "Upload artwork & textures instantly",
  "Choose materials, finishes & colors",
  "Export high-quality renders in one click",
  "Free to use — no account needed",
];

const FLOATING_CHIPS = [
  { label: "UV + Foil", x: "10%", y: "14%", delay: "0s" },
  { label: "3D Preview", x: "76%", y: "16%", delay: "0.6s" },
  { label: "Live Resize", x: "6%", y: "78%", delay: "1.1s" },
  { label: "Export HD", x: "78%", y: "82%", delay: "0.3s" },
];

export default function AdvanceStudioShowCase() {
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 });

  const handleOpenStudio = () => {
    window.open("/studio", "_blank", "noopener,noreferrer");
  };

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ rx: -(py * 7), ry: px * 9 });
  };

  const onMouseLeave = () => setTilt({ rx: 0, ry: 0 });

  const frameStyle = useMemo<CSSProperties>(
    () => ({
      transform: `perspective(1400px) rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg) translateZ(0)`,
      transition: "transform 220ms cubic-bezier(0.16, 1, 0.3, 1)",
    }),
    [tilt],
  );

  return (
    <section className="relative w-full overflow-hidden py-16 md:py-24 bg-[#123b2b]">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-24 -left-16 w-72 h-72 rounded-full bg-[#2bc18a]/25 blur-3xl animate-pulse" />
        <div className="absolute -bottom-24 -right-10 w-80 h-80 rounded-full bg-[var(--color-brand-accent)]/20 blur-3xl animate-pulse [animation-delay:0.8s]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-10 lg:gap-16 mb-12 md:mb-16">
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
          </AnimateOnScroll>

          <AnimateOnScroll animation="slide-right" stagger as="ul" className="space-y-3 pt-1">
            {FEATURES.map((feature) => (
              <li key={feature} className="flex items-start gap-3">
                <span className="mt-1.5 w-2 h-2 rounded-full bg-[#57d7aa] shadow-[0_0_12px_#57d7aa] shrink-0" />
                <span className="text-white/90 text-base md:text-lg font-medium">{feature}</span>
              </li>
            ))}
          </AnimateOnScroll>
        </div>

        <AnimateOnScroll animation="scale-in" delay={180}>
          <div className="relative" onMouseMove={onMouseMove} onMouseLeave={onMouseLeave}>
            {FLOATING_CHIPS.map((chip) => (
              <div
                key={chip.label}
                className="pointer-events-none hidden md:inline-flex absolute z-20 text-[11px] font-semibold px-3 py-1.5 rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-md floating-chip"
                style={{ left: chip.x, top: chip.y, animationDelay: chip.delay }}
              >
                {chip.label}
              </div>
            ))}

            <div
              role="button"
              tabIndex={0}
              onClick={handleOpenStudio}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") handleOpenStudio();
              }}
              className="group relative cursor-pointer rounded-2xl md:rounded-3xl border-[6px] md:border-[8px] border-[#0f2f22] bg-[#0f2f22] shadow-[0_25px_80px_rgba(0,0,0,0.45)] overflow-hidden"
              style={frameStyle}
            >
              <div className="flex items-center gap-2 px-4 py-2.5 bg-[#0f2f22] border-b border-white/10">
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-red-400" />
                  <span className="w-3 h-3 rounded-full bg-yellow-400" />
                  <span className="w-3 h-3 rounded-full bg-green-400" />
                </div>
                <div className="flex-1 flex justify-center">
                  <div className="bg-white/10 rounded-md px-4 py-1 text-xs text-white/55 font-mono max-w-xs w-full text-center">
                    brandsface.com/studio
                  </div>
                </div>
                <div className="w-[54px]" />
              </div>

              <div className="relative w-full aspect-[16/9] bg-[#0c261c]">
                <Image
                  src="/studio.png"
                  alt="Brands Face 3D Studio"
                  fill
                  className="object-contain object-center transition-transform duration-700 group-hover:scale-[1.03]"
                  sizes="(max-width: 1280px) 100vw, 1280px"
                  priority
                />

                <div className="absolute inset-0 bg-gradient-to-tr from-black/30 via-transparent to-[#2bc18a]/20" />

                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transition-all duration-300 scale-95 group-hover:scale-100">
                    <div className="inline-flex items-center gap-2 bg-white text-[#101018] text-sm font-semibold px-6 py-3 rounded-full shadow-2xl">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                      Open 3D Studio
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-center gap-1 py-3 bg-[#0f2f22] border-t border-white/10">
                {["Outside", "Inside", "3D view", "2D view"].map((label, idx) => (
                  <span
                    key={label}
                    className={`text-xs px-4 py-1.5 rounded-full font-medium transition-colors ${
                      idx === 2 ? "bg-white/15 text-white" : "text-white/45 hover:text-white/70"
                    }`}
                  >
                    {label}
                  </span>
                ))}
              </div>
            </div>

            <div className="absolute -inset-6 bg-[#2bc18a]/20 rounded-[42px] blur-3xl -z-10 opacity-80 group-hover:opacity-100 transition-opacity duration-500" />
          </div>
        </AnimateOnScroll>
      </div>

      <style jsx>{`
        .floating-chip {
          animation: floatY 3.2s ease-in-out infinite;
        }
        @keyframes floatY {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-6px);
          }
        }
      `}</style>
    </section>
  );
}
