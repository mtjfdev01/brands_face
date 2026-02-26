"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";

const CARDS = [
  { image: "/inspirations/djuce.jpg", color: "#c4a265" },
  { image: "/inspirations/kuyichi.jpg", color: "#8b6f47" },
  { image: "/inspirations/oase.jpg", color: "#5a7a5a" },
  { image: "/inspirations/psi-bufet.jpg", color: "#a0522d" },
  { image: "/inspirations/your-kaya.jpg", color: "#d4a0a0" },
  { image: "/inspirations/hemp-juice.jpg", color: "#c87941" },
  { image: "/inspirations/fluus.jpg", color: "#6b8e9b" },
  { image: "/inspirations/xlash.jpg", color: "#9b8ec4" },
];

const ENTER_MS = 900;
const HOLD_MS = 700;
const EXIT_MS = 800;
const CYCLE_MS = ENTER_MS + HOLD_MS + EXIT_MS;

const CARD_W = 180;
const CARD_H = 255;
const PAD = 24;

interface AnimCard {
  card: (typeof CARDS)[0];
  entryX: number;
  entryY: number;
  entryRot: number;
  holdX: number;
  holdY: number;
  holdRot: number;
  exitX: number;
  exitY: number;
  exitRot: number;
}

interface Zone { xMin: number; xMax: number; yMin: number; yMax: number }

function randRange(min: number, max: number) {
  return min + Math.random() * (max - min);
}

function getHoldZones(vw: number, vh: number): Zone[] {
  const halfW = vw / 2 - CARD_W / 2 - PAD;
  const halfH = vh / 2 - CARD_H / 2 - PAD;

  const safeMinX = Math.min(halfW * 0.42, 200);
  const safeMinY = Math.min(halfH * 0.35, 120);

  return [
    { xMin: -halfW,    xMax: -safeMinX, yMin: -halfH,    yMax: -safeMinY }, // top-left
    { xMin:  safeMinX, xMax:  halfW,    yMin: -halfH,    yMax: -safeMinY }, // top-right
    { xMin: -halfW,    xMax: -safeMinX, yMin:  safeMinY, yMax:  halfH    }, // bottom-left
    { xMin:  safeMinX, xMax:  halfW,    yMin:  safeMinY, yMax:  halfH    }, // bottom-right
    { xMin: -safeMinX, xMax:  safeMinX, yMin: -halfH,    yMax: -safeMinY }, // top-center
    { xMin: -safeMinX, xMax:  safeMinX, yMin:  safeMinY, yMax:  halfH    }, // bottom-center
    { xMin: -halfW,    xMax: -safeMinX, yMin: -safeMinY, yMax:  safeMinY }, // mid-left
    { xMin:  safeMinX, xMax:  halfW,    yMin: -safeMinY, yMax:  safeMinY }, // mid-right
  ];
}

function pickUnique<T>(arr: T[], count: number): T[] {
  const shuffled = [...arr].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

function buildGroup(startIdx: number, vw: number, vh: number): { group: AnimCard[]; nextIdx: number } {
  const count = Math.random() > 0.5 ? 3 : 2;
  const group: AnimCard[] = [];
  const zones = pickUnique(getHoldZones(vw, vh), count);

  for (let i = 0; i < count; i++) {
    const card = CARDS[(startIdx + i) % CARDS.length];

    const eAngle = Math.random() * Math.PI * 2;
    const eDist = 280 + Math.random() * 220;

    const xAngle = Math.random() * Math.PI * 2;
    const xDist = 320 + Math.random() * 280;

    const z = zones[i];

    group.push({
      card,
      entryX: Math.cos(eAngle) * eDist,
      entryY: Math.sin(eAngle) * eDist,
      entryRot: (Math.random() - 0.5) * 40,
      holdX: randRange(z.xMin, z.xMax),
      holdY: randRange(z.yMin, z.yMax),
      holdRot: (Math.random() - 0.5) * 16,
      exitX: Math.cos(xAngle) * xDist,
      exitY: Math.sin(xAngle) * xDist,
      exitRot: (Math.random() - 0.5) * 60,
    });
  }

  return { group, nextIdx: (startIdx + count) % CARDS.length };
}

export default function CreativeDirection() {
  const idxRef = useRef(0);
  const sizeRef = useRef({ w: 1200, h: 800 });
  const sectionRef = useRef<HTMLElement>(null);
  const [cycle, setCycle] = useState(0);
  const [phase, setPhase] = useState<"enter" | "hold" | "exit">("enter");
  const [group, setGroup] = useState<AnimCard[]>([]);
  const [ready, setReady] = useState(false);
  const [contentPhase, setContentPhase] = useState<"before" | "in" | "after">("before");

  useEffect(() => {
    const update = () => { sizeRef.current = { w: window.innerWidth, h: window.innerHeight }; };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const advance = useCallback(() => {
    const { w, h } = sizeRef.current;
    const { group: g, nextIdx } = buildGroup(idxRef.current, w, h);
    idxRef.current = nextIdx;
    setGroup(g);
  }, []);

  useEffect(() => { advance(); }, [cycle, advance]);

  useEffect(() => {
    setPhase("enter");
    setReady(false);
    const t1 = setTimeout(() => setPhase("hold"), ENTER_MS);
    const t2 = setTimeout(() => setPhase("exit"), ENTER_MS + HOLD_MS);
    const t3 = setTimeout(() => setCycle((c) => c + 1), CYCLE_MS);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, [cycle]);

  useEffect(() => {
    const id = requestAnimationFrame(() => setReady(true));
    return () => cancelAnimationFrame(id);
  }, [cycle]);

  useEffect(() => {
    const update = () => {
      const el = sectionRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      if (rect.top > vh * 0.75) {
        setContentPhase("before");
      } else if (rect.bottom < vh * 0.25) {
        setContentPhase("after");
      } else {
        setContentPhase("in");
      }
    };

    const boot = setTimeout(update, 120);
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      clearTimeout(boot);
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  const cardStyle = (ac: AnimCard): React.CSSProperties => {
    const enterT = `transform ${ENTER_MS}ms cubic-bezier(0.16,1,0.3,1), opacity ${ENTER_MS * 0.6}ms ease`;
    const exitT = `transform ${EXIT_MS}ms cubic-bezier(0.4,0,0.2,1), opacity ${EXIT_MS * 0.7}ms ease`;

    if (phase === "enter" && !ready) {
      return {
        transform: `translate(${ac.entryX}px, ${ac.entryY}px) scale(0.25) rotate(${ac.entryRot}deg)`,
        opacity: 0,
        transition: "none",
      };
    }
    if (phase === "enter" || phase === "hold") {
      return {
        transform: `translate(${ac.holdX}px, ${ac.holdY}px) scale(1) rotate(${ac.holdRot}deg)`,
        opacity: 1,
        transition: enterT,
      };
    }
    return {
      transform: `translate(${ac.exitX}px, ${ac.exitY}px) scale(0.5) rotate(${ac.exitRot}deg)`,
      opacity: 0,
      transition: exitT,
    };
  };

  return (
    <section ref={sectionRef} className="relative w-full overflow-hidden bg-[#f0ebe3]" style={{ minHeight: "100vh" }}>
      {/* ── Animated card group ── */}
      <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none">
        {group.map((ac, i) => (
          <div key={`${cycle}-${i}`} className="absolute" style={cardStyle(ac)}>
            <div className="relative w-[130px] h-[185px] sm:w-[160px] sm:h-[225px] lg:w-[180px] lg:h-[255px] rounded-2xl overflow-hidden shadow-2xl">
              <div className="absolute inset-0" style={{ backgroundColor: ac.card.color }} />
              <Image
                src={ac.card.image}
                alt=""
                fill
                className="object-cover"
                sizes="180px"
                onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
              <div className="absolute inset-0 rounded-2xl ring-1 ring-white/10 pointer-events-none" />
            </div>
          </div>
        ))}
      </div>

      {/* ── Central text content ── */}
      <div
        className="relative z-20 flex flex-col items-center justify-center min-h-screen px-6 text-center"
        style={{
          opacity: contentPhase === "in" ? 1 : 0,
          transform:
            contentPhase === "in"
              ? "translateY(0px) scale(1)"
              : contentPhase === "before"
                ? "translateY(120px) scale(0.92)"
                : "translateY(-120px) scale(0.82)",
          transition: "transform 1.7s cubic-bezier(0.16,1,0.3,1), opacity 1.3s ease",
        }}
      >
        <div className="inline-flex items-center gap-2 bg-[#f5c518] text-[#1a1a1a] text-[10px] sm:text-xs font-semibold px-3 py-1 rounded-full mb-4 shadow-lg">
          <svg className="w-3 h-3" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
          </svg>
          Brand + growth alignment
        </div>

        <h2 className="max-w-3xl text-xl sm:text-2xl md:text-3xl lg:text-4xl font-black text-[#1a1a1a] uppercase leading-[1.1] tracking-tight">
          Conversion-led{" "}
          <span className="relative inline">
            <span className="relative z-10 text-[#1a1a1a]">Creative Direction</span>
            <span className="absolute left-0 bottom-[0.05em] w-full h-[0.3em] bg-[#f5c518]/70 -z-0 rounded-sm" />
          </span>{" "}
          to make sure you go viral as well as grow your brand
        </h2>

        <p className="mt-4 sm:mt-5 max-w-xl text-sm sm:text-base text-[#1a1a1a]/55 leading-relaxed">
          We blend data-driven strategy with bold creative to deliver packaging
          that doesn&apos;t just look good — it performs.
        </p>

        <div className="mt-6 sm:mt-8 flex flex-wrap items-center justify-center gap-3">
          <button className="inline-flex items-center gap-2 bg-[#1a1a1a] text-white font-semibold text-xs sm:text-sm px-6 py-3 rounded-full hover:bg-[#333] hover:scale-[1.03] active:scale-[0.98] transition-all shadow-lg">
            Start a Project
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </button>
          <button className="inline-flex items-center gap-2 text-[#1a1a1a]/60 hover:text-[#1a1a1a] font-medium text-xs sm:text-sm px-5 py-3 rounded-full border border-[#1a1a1a]/12 hover:border-[#1a1a1a]/25 transition-all">
            See Our Work
          </button>
        </div>
      </div>
    </section>
  );
}
