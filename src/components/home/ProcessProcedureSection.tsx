"use client";

import { useEffect, useRef, useState } from "react";

type Step = {
  title: string;
  description: string;
  accent: string;
};

const STEPS: Step[] = [
  {
    title: "Brand Packaging Audit",
    description:
      "We analyze your current packaging, category benchmarks, and customer perception gaps to identify the highest-impact improvements.",
    accent: "from-emerald-300 to-emerald-500",
  },
  {
    title: "Strategy & Structure Planning",
    description:
      "Our team defines packaging hierarchy, material direction, and conversion-focused design priorities aligned with your target market.",
    accent: "from-teal-300 to-cyan-500",
  },
  {
    title: "Design, Prototype & Test",
    description:
      "We create production-ready visuals and structural concepts, then refine using practical testing for usability, brand feel, and logistics.",
    accent: "from-amber-300 to-orange-500",
  },
  {
    title: "Production & Scale Launch",
    description:
      "After approval, we move to manufacturing with quality controls and delivery planning so your packaging performs at scale.",
    accent: "from-fuchsia-300 to-pink-500",
  },
];

export default function ProcessProcedureSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLElement | null)[]>([]);
  const [inView, setInView] = useState(false);
  const [connectorPoints, setConnectorPoints] = useState<Array<{ x: number; y: number }>>([]);
  const [gridSize, setGridSize] = useState({ width: 1, height: 1 });

  useEffect(() => {
    const target = sectionRef.current;
    if (!target) return;

    const isMobile = window.innerWidth < 640;
    const enterThreshold = isMobile ? 0.18 : 0.55;
    const exitThreshold = isMobile ? 0.06 : 0.2;

    const observer = new IntersectionObserver(
      ([entry]) => {
        // Hysteresis: enter a bit later, exit a bit earlier.
        if (entry.intersectionRatio >= enterThreshold) {
          setInView(true);
        } else if (entry.intersectionRatio <= exitThreshold) {
          setInView(false);
        }
      },
      { threshold: [exitThreshold, enterThreshold], rootMargin: "0px 0px -8% 0px" },
    );

    observer.observe(target);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const updateConnectorPoints = () => {
      const grid = gridRef.current;
      if (!grid) return;

      const gridRect = grid.getBoundingClientRect();
      setGridSize({
        width: Math.max(gridRect.width, 1),
        height: Math.max(gridRect.height, 1),
      });
      const points = cardRefs.current
        .map((card) => {
          if (!card) return null;
          const rect = card.getBoundingClientRect();
          return {
            x: rect.left - gridRect.left + rect.width / 2,
            y: rect.top - gridRect.top + rect.height / 2,
          };
        })
        .filter((point): point is { x: number; y: number } => point !== null);

      setConnectorPoints(points);
    };

    const syncPoints = () => window.requestAnimationFrame(updateConnectorPoints);
    const timeout = window.setTimeout(syncPoints, 80);
    syncPoints();

    window.addEventListener("resize", syncPoints);
    return () => {
      window.clearTimeout(timeout);
      window.removeEventListener("resize", syncPoints);
    };
  }, [inView]);

  return (
    <section ref={sectionRef} className="relative overflow-hidden px-4 py-16 sm:px-6 sm:py-20 lg:px-10 lg:py-24">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/4 top-0 h-64 w-64 rounded-full bg-emerald-300/30 blur-[110px]" />
        <div className="absolute bottom-0 right-1/4 h-72 w-72 rounded-full bg-cyan-300/25 blur-[120px]" />
      </div>

      <div className="relative mx-auto max-w-[1200px] rounded-[28px] border border-[#103a2a]/10 bg-white/85 p-6 shadow-[0_18px_60px_rgba(16,58,42,0.12)] backdrop-blur-xl sm:p-8 lg:p-10">
        <div className="max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#103a2a]/70">Procedure</p>
          <h2 className="mt-3 text-3xl font-black leading-tight tracking-tight text-[#103a2a] sm:text-4xl lg:text-5xl">
            From Audit to Shelf-Ready Packaging
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-[#103a2a]/75 sm:text-base">
            A strategic, step-by-step process designed to turn packaging into a measurable growth channel for your brand.
          </p>
        </div>

        <div className="mt-10">
          <div ref={gridRef} className="relative grid grid-cols-1 gap-4 sm:gap-5 md:grid-cols-2">
            {connectorPoints.length === STEPS.length && (
              <svg
                className="pointer-events-none absolute inset-0 z-0 h-full w-full"
                viewBox={`0 0 ${gridSize.width} ${gridSize.height}`}
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                <polyline
                  points={connectorPoints.map((point) => `${point.x},${point.y}`).join(" ")}
                  fill="none"
                  stroke="#2D7A63"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeDasharray="8 10"
                  opacity="0.45"
                />
                {connectorPoints.map((point, idx) => (
                  <circle
                    key={`connector-node-${idx}`}
                    cx={point.x}
                    cy={point.y}
                    r="5.5"
                    fill="white"
                    stroke="#2D7A63"
                    strokeWidth="2"
                    opacity="0.8"
                  />
                ))}
              </svg>
            )}
            {STEPS.map((step, idx) => (
              <article
                key={step.title}
                ref={(el) => {
                  cardRefs.current[idx] = el;
                }}
                className="relative z-10 rounded-2xl border border-[#103a2a]/10 bg-white p-5 shadow-sm transition-all duration-700 sm:p-6"
                style={{
                  opacity: inView ? 1 : 0,
                  transform: inView
                    ? "translateX(0px) translateY(0px)"
                    : `translateX(${idx % 2 === 0 ? "-56px" : "56px"}) translateY(14px)`,
                  transitionDelay: `${idx * 120}ms`,
                }}
              >
                <div className="flex items-start gap-4">
                  <div className="relative mt-1 hidden h-10 w-10 shrink-0 sm:block">
                    <div className={`absolute inset-0 rounded-full bg-gradient-to-br ${step.accent}`} />
                    <div className="absolute inset-[2px] rounded-full bg-white" />
                    <span className="absolute inset-0 flex items-center justify-center text-sm font-black text-[#103a2a]">
                      {idx + 1}
                    </span>
                  </div>

                  <div className="w-full">
                    <div className="flex items-center gap-3 sm:block">
                      <div className="relative h-8 w-8 shrink-0 sm:hidden">
                        <div className={`absolute inset-0 rounded-full bg-gradient-to-br ${step.accent}`} />
                        <div className="absolute inset-[2px] rounded-full bg-white" />
                        <span className="absolute inset-0 flex items-center justify-center text-xs font-black text-[#103a2a]">
                          {idx + 1}
                        </span>
                      </div>
                      <h3 className="text-lg font-bold text-[#103a2a] sm:text-xl">{step.title}</h3>
                    </div>
                    <p className="mt-2 text-sm leading-relaxed text-[#103a2a]/75 sm:text-[15px]">{step.description}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
