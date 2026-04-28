"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

type Props = {
  desktopSrc: string;
  mobileSrc?: string;
  alt?: string;
  /** How long the curtain stays fully visible before it starts rising (ms) */
  holdDuration?: number;
  /** How long the slide-up animation takes (ms) */
  slideDuration?: number;
};

// Runtime-only global flag: survives client-side rerenders/navigation,
// resets on full page refresh.
let hasShownCurtainOverlayInSession = false;

export default function CurtainOverlay({
  desktopSrc,
  mobileSrc,
  alt = "Brands Face",
  holdDuration = 800,
  slideDuration = 800,
}: Props) {
  const [phase, setPhase] = useState<"hold" | "sliding" | "done">(() =>
    hasShownCurtainOverlayInSession ? "done" : "hold",
  );
  const touchStartY = useRef<number | null>(null);

  useEffect(() => {
    if (phase === "hold" && !hasShownCurtainOverlayInSession) {
      hasShownCurtainOverlayInSession = true;
    }
  }, [phase]);

  useEffect(() => {
    if (phase === "done") return;

    // Mark curtain active so other floating widgets can hide.
    const root = document.documentElement;
    root.dataset.curtainActive = "1";

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    let holdTimer: ReturnType<typeof setTimeout> | undefined;

    const startSliding = () => {
      setPhase((prev) => (prev === "hold" ? "sliding" : prev));
    };

    if (phase === "hold") {
      holdTimer = setTimeout(startSliding, holdDuration);
    }

    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) < 1) return;
      e.preventDefault();
      if (phase === "hold") startSliding();
    };

    const onTouchStart = (e: TouchEvent) => {
      touchStartY.current = e.touches[0]?.clientY ?? null;
    };

    const onTouchMove = (e: TouchEvent) => {
      const startY = touchStartY.current;
      const currentY = e.touches[0]?.clientY;
      if (startY == null || currentY == null) return;
      if (Math.abs(startY - currentY) < 4) return;
      e.preventDefault();
      if (phase === "hold") startSliding();
    };

    const onKeyDown = (e: KeyboardEvent) => {
      if (["ArrowDown", "PageDown", "Space"].includes(e.code)) {
        e.preventDefault();
        if (phase === "hold") startSliding();
      }
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: false });
    window.addEventListener("keydown", onKeyDown);

    return () => {
      if (holdTimer) clearTimeout(holdTimer);
      document.body.style.overflow = previousOverflow;
      delete root.dataset.curtainActive;
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [phase, holdDuration]);

  useEffect(() => {
    if (phase !== "sliding") return;
    const doneTimer = setTimeout(() => setPhase("done"), slideDuration);
    return () => clearTimeout(doneTimer);
  }, [phase, slideDuration]);

  if (phase === "done") return null;

  const mobileBannerSrc = mobileSrc ?? desktopSrc;

  return (
    <div
      className="fixed inset-0 z-50 overflow-hidden"
      style={{
        transform: phase === "sliding" ? "translateY(-100%)" : "translateY(0)",
        transition: phase === "sliding"
          ? `transform ${slideDuration}ms cubic-bezier(0.76, 0, 0.24, 1)`
          : "none",
      }}
    >
      {/* Hide whole layer (not only the inner img) so Next/Image wrappers cannot leak the wrong art. */}
      <div className="absolute inset-0 hidden md:block">
        <Image
          src={desktopSrc}
          alt={alt}
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
      </div>
      <div className="absolute inset-0 md:hidden flex items-start justify-start">
        <Image
          src={mobileBannerSrc}
          alt={alt}
          width={1080}
          height={1920}
          priority
          className="object-contain object-center"
          style={{ maxWidth: "100vw", width: "100vw", height: "auto" }}
          sizes="100vw"
        />
      </div>
    </div>
  );
}
