"use client";

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { HOME_CARDS } from "@/data/homeCards";

type AllCategoriesOverlayProps = {
  open: boolean;
  onClose: () => void;
};

export default function AllCategoriesOverlay({ open, onClose }: AllCategoriesOverlayProps) {
  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open, onClose]);

  return (
    <div
      className={`fixed inset-0 z-[90] transition-all duration-500 ${
        open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
      }`}
      aria-hidden={!open}
    >
      <div className="absolute inset-0 bg-[#06130e]/70 backdrop-blur-md" onClick={onClose} />

      <div className="pointer-events-none absolute -left-16 top-16 h-56 w-56 rounded-full bg-emerald-400/20 blur-3xl" />
      <div className="pointer-events-none absolute bottom-20 right-12 h-64 w-64 rounded-full bg-cyan-300/20 blur-3xl" />
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-fuchsia-300/15 blur-3xl" />

      <div className="absolute inset-0 overflow-y-auto p-4 sm:p-8">
        <div
          className={`mx-auto w-full max-w-6xl rounded-[28px] border border-white/20 bg-white/[0.08] p-5 shadow-[0_30px_90px_rgba(0,0,0,0.35)] backdrop-blur-xl transition-all duration-500 sm:p-7 ${
            open ? "translate-y-0 scale-100" : "translate-y-6 scale-[0.98]"
          }`}
        >
          <div className="mb-6 flex items-start justify-between gap-4 sm:mb-8">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-emerald-100/80">Explore</p>
              <h3 className="mt-2 text-3xl font-black leading-tight text-white sm:text-4xl">All Packaging Categories</h3>
              <p className="mt-2 max-w-2xl text-sm text-emerald-50/80 sm:text-base">
                Pick a category to see detailed specs, structures, and customization options for your next packaging launch.
              </p>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/30 bg-white/10 text-white transition hover:rotate-90 hover:bg-white/20"
              aria-label="Close categories panel"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
                <path d="M6 6l12 12M18 6L6 18" />
              </svg>
            </button>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {HOME_CARDS.map((card, idx) => (
              <Link
                key={card.category}
                href={`/category/${card.category}`}
                onClick={onClose}
                className={`group relative overflow-hidden rounded-2xl border border-white/20 bg-white/10 p-2 transition-all duration-500 hover:-translate-y-1 hover:border-white/50 hover:bg-white/15 ${
                  open ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
                }`}
                style={{ transitionDelay: `${idx * 45}ms` }}
              >
                <div className="relative h-44 overflow-hidden rounded-xl sm:h-48">
                  <Image
                    src={card.image}
                    alt={card.title}
                    fill
                    className="object-cover transition duration-700 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                </div>

                <div className="absolute right-5 top-5 rounded-full border border-white/40 bg-black/20 px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-white/90">
                  Category
                </div>

                <div className="absolute bottom-4 left-4 right-4">
                  <p className="text-lg font-black leading-tight text-white drop-shadow">{card.title}</p>
                  <p className="mt-1 text-xs text-emerald-100/85">View details and customization</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
