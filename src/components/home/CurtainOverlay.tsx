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

export default function CurtainOverlay({
  desktopSrc,
  mobileSrc,
  alt = "Brands Face",
  holdDuration = 1500,
  slideDuration = 1200,
}: Props) {
  const [phase, setPhase] = useState<"hold" | "sliding" | "done">("hold");
  const touchStartY = useRef<number | null>(null);

  useEffect(() => {
    if (phase === "done") return;

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

  const imgSrc = mobileSrc ?? desktopSrc;

  if (phase === "done") return null;

  return (
    <div
      className="fixed inset-0 z-50"
      style={{
        transform: phase === "sliding" ? "translateY(-100%)" : "translateY(0)",
        transition: phase === "sliding"
          ? `transform ${slideDuration}ms cubic-bezier(0.76, 0, 0.24, 1)`
          : "none",
      }}
    >
      {/* Desktop */}
      <Image
        src={desktopSrc}
        alt={alt}
        fill
        priority
        className="object-cover hidden md:block"
        sizes="(min-width: 768px) 100vw, 0px"
      />
      {/* Mobile */}
      <Image
        src={imgSrc}
        alt={alt}
        fill
        priority
        className="object-cover md:hidden"
        sizes="(max-width: 767px) 100vw, 0px"
      />
    </div>
  );
}
