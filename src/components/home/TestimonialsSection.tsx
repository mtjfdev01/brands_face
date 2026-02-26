"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";

/* ── Testimonial data ── */
const TESTIMONIALS = [
  {
    id: 1,
    name: "Sarah Mitchell",
    role: "Marketing Director, Luxe Cosmetics",
    stars: 5,
    quote: "The packaging completely transformed how customers perceive our brand. Sales jumped 40% after the rebrand.",
    thumbnail: "/testimonials/thumb-1.jpg",
    video: "/testimonials/video-1.mp4",
    color: "#2d6a4f",
  },
  {
    id: 2,
    name: "James Cooper",
    role: "Founder, Organic Roots",
    stars: 5,
    quote: "Better than expected! They understood our vision and delivered packaging that tells our sustainability story.",
    thumbnail: "/testimonials/thumb-2.jpg",
    video: "/testimonials/video-2.mp4",
    color: "#1a5632",
  },
  {
    id: 3,
    name: "Tina H.",
    role: "CEO, FreshBrew Co.",
    stars: 5,
    quote: "Unlock your brand's potential with packaging that actually converts. Our unboxing videos went viral overnight.",
    thumbnail: "/testimonials/thumb-3.jpg",
    video: "/testimonials/video-3.mp4",
    color: "#264653",
  },
  {
    id: 4,
    name: "Mark Reynolds",
    role: "Product Lead, NovaTech",
    stars: 5,
    quote: "From concept to delivery, the team nailed every detail. Our customers can't stop talking about the experience.",
    thumbnail: "/testimonials/thumb-4.jpg",
    video: "/testimonials/video-4.mp4",
    color: "#1b4332",
  },
  {
    id: 5,
    name: "Elena Vasquez",
    role: "Brand Strategist, Bloom & Co",
    stars: 5,
    quote: "This team doesn't just design boxes — they engineer brand moments. Absolutely world-class quality.",
    thumbnail: "/testimonials/thumb-5.jpg",
    video: "/testimonials/video-5.mp4",
    color: "#2b2d42",
  },
  {
    id: 6,
    name: "David Kim",
    role: "Co-Founder, SnackHive",
    stars: 5,
    quote: "We tried three agencies before finding BrandsCafe. Night and day difference — these guys get it.",
    thumbnail: "/testimonials/thumb-6.jpg",
    video: "/testimonials/video-6.mp4",
    color: "#3a5a40",
  },
];

const AUTO_INTERVAL = 4000;

export default function TestimonialsSection() {
  const [active, setActive] = useState(0);
  const [popup, setPopup] = useState<number | null>(null);
  const [phase, setPhase] = useState<"before" | "in" | "after">("before");
  const sectionRef = useRef<HTMLElement>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  const total = TESTIMONIALS.length;

  const startAuto = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setActive((p) => (p + 1) % total);
    }, AUTO_INTERVAL);
  }, [total]);

  useEffect(() => {
    startAuto();
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [startAuto]);

  useEffect(() => {
    const update = () => {
      const el = sectionRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      if (rect.top > vh * 0.86) {
        setPhase("before");
      } else if (rect.bottom < vh * 0.16) {
        setPhase("after");
      } else {
        setPhase("in");
      }
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  const go = (dir: -1 | 1) => {
    setActive((p) => (p + dir + total) % total);
    startAuto();
  };

  const goTo = (idx: number) => {
    setActive(idx);
    startAuto();
  };

  /* ── Swipe support ── */
  const touchX = useRef(0);
  const onTouchStart = (e: React.TouchEvent) => { touchX.current = e.touches[0].clientX; };
  const onTouchEnd = (e: React.TouchEvent) => {
    const dx = e.changedTouches[0].clientX - touchX.current;
    if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1);
  };

  return (
    <>
      <section
        ref={sectionRef}
        className="relative w-full overflow-hidden"
        style={{
          minHeight: "100vh",
          opacity: phase === "before" ? 0 : 1,
          transform:
            phase === "in"
              ? "translateY(0px) scale(1)"
              : phase === "before"
                ? "translateY(120px) scale(0.94)"
                : "translateY(-90px) scale(0.86)",
          filter: phase === "in" ? "blur(0px)" : "blur(2px)",
          transition: "transform 1.05s cubic-bezier(0.16,1,0.3,1), opacity 0.85s ease, filter 0.85s ease",
          willChange: "transform, opacity, filter",
        }}
      >
        {/* ── Background image ── */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/testimonials/bg.jpg"
            alt=""
            fill
            className="object-cover"
            sizes="100vw"
            priority
            onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/70" />
        </div>

        {/* ── Heading ── */}
        <div className="relative z-10 pt-16 sm:pt-20 lg:pt-24 text-center px-4">
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black text-white uppercase italic leading-[0.95] tracking-tight drop-shadow-xl">
            Better Than
            <br />
            Advertise<span className="text-[#4ade80]">.</span>
          </h2>
        </div>

        {/* ── Slider ── */}
        <div className="relative z-10 mt-auto flex flex-col items-center justify-end pb-10 sm:pb-14 lg:pb-16"
          style={{ minHeight: "calc(100vh - 220px)" }}>

          {/* Cards track */}
          <div
            ref={trackRef}
            className="relative w-full max-w-[1400px] mx-auto px-4"
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
          >
            <div className="relative flex items-center justify-center" style={{ height: 420 }}>
              {TESTIMONIALS.map((t, idx) => {
                let offset = idx - active;
                if (offset > total / 2) offset -= total;
                if (offset < -total / 2) offset += total;
                const dist = Math.abs(offset);
                const isActive = offset === 0;

                if (dist > 2) return null;

                const gap = 342;
                const tx = offset * gap;
                const sc = isActive ? 1 : 0.88;
                const op = isActive ? 1 : dist === 1 ? 0.7 : 0.4;

                return (
                  <div
                    key={t.id}
                    className="absolute transition-all duration-500 ease-out cursor-pointer"
                    style={{
                      width: "clamp(270px, 28vw, 340px)",
                      transform: `translateX(${tx}px) scale(${sc})`,
                      opacity: op,
                      zIndex: isActive ? 20 : 10 - dist,
                    }}
                    onClick={() => { if (isActive) setPopup(idx); else goTo(idx); }}
                  >
                    {/* Video thumbnail */}
                    <div className="relative aspect-video rounded-xl overflow-hidden mb-3 group">
                      <div className="absolute inset-0" style={{ backgroundColor: t.color }} />
                      <Image
                        src={t.thumbnail}
                        alt={t.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="360px"
                        onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
                      />
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
                      {/* Play button */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center transition-all duration-300 ${isActive ? "bg-white/90 scale-100 shadow-lg shadow-black/30" : "bg-white/50 scale-75"} group-hover:scale-110`}>
                          <svg className="w-5 h-5 sm:w-6 sm:h-6 text-[#1a1a1a] ml-0.5" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M8 5v14l11-7z" />
                          </svg>
                        </div>
                      </div>
                    </div>

                    {/* Card body */}
                    <div className="backdrop-blur-xl bg-white/10 border border-white/15 rounded-xl p-4 sm:p-5">
                      {/* Stars */}
                      <div className="flex gap-0.5 mb-2">
                        {Array.from({ length: t.stars }).map((_, s) => (
                          <svg key={s} className="w-4 h-4 text-yellow-400" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                          </svg>
                        ))}
                      </div>
                      <p className="text-white/90 text-sm sm:text-base font-medium leading-snug line-clamp-2 mb-3">
                        &ldquo;{t.quote}&rdquo;
                      </p>
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-white text-xs font-bold uppercase">
                          {t.name.charAt(0)}
                        </div>
                        <div>
                          <p className="text-white text-xs sm:text-sm font-semibold leading-tight">{t.name}</p>
                          <p className="text-white/50 text-[10px] sm:text-xs leading-tight">{t.role}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Navigation arrows */}
          <div className="flex items-center gap-3 mt-6 sm:mt-8">
            <button
              onClick={() => go(-1)}
              className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#22c55e] hover:bg-[#16a34a] text-white flex items-center justify-center transition-all hover:scale-110 active:scale-95 shadow-lg shadow-green-900/40"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            {/* Dots */}
            <div className="flex gap-1.5">
              {TESTIMONIALS.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => goTo(idx)}
                  className={`rounded-full transition-all duration-300 ${idx === active ? "w-6 h-2 bg-white" : "w-2 h-2 bg-white/40 hover:bg-white/60"}`}
                />
              ))}
            </div>

            <button
              onClick={() => go(1)}
              className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#22c55e] hover:bg-[#16a34a] text-white flex items-center justify-center transition-all hover:scale-110 active:scale-95 shadow-lg shadow-green-900/40"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </section>

      {/* ── Video Popup Modal ── */}
      {popup !== null && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 backdrop-blur-sm"
          onClick={() => setPopup(null)}
        >
          <div
            className="relative w-[90vw] max-w-[900px] aspect-video rounded-2xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={() => setPopup(null)}
              className="absolute top-3 right-3 z-10 w-9 h-9 rounded-full bg-black/60 hover:bg-black/80 text-white flex items-center justify-center transition-colors"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Video player */}
            <video
              src={TESTIMONIALS[popup].video}
              className="w-full h-full object-cover bg-black"
              autoPlay
              controls
              playsInline
              onError={(e) => {
                const el = e.target as HTMLVideoElement;
                el.style.display = "none";
                const parent = el.parentElement;
                if (parent && !parent.querySelector(".fallback-msg")) {
                  const msg = document.createElement("div");
                  msg.className = "fallback-msg absolute inset-0 flex flex-col items-center justify-center text-white bg-black";
                  msg.innerHTML = `
                    <svg class="w-16 h-16 mb-4 opacity-40" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25h-9A2.25 2.25 0 002.25 7.5v9a2.25 2.25 0 002.25 2.25z" />
                    </svg>
                    <p class="text-sm opacity-60">Video coming soon</p>
                  `;
                  parent.appendChild(msg);
                }
              }}
            />
          </div>
        </div>
      )}
    </>
  );
}
