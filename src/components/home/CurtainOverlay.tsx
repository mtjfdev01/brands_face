"use client";

import { useEffect, useState } from "react";
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
  alt = "Brands Cafe",
  holdDuration = 1500,
  slideDuration = 1200,
}: Props) {
  const [phase, setPhase] = useState<"hold" | "sliding" | "done">("hold");

  useEffect(() => {
    const holdTimer = setTimeout(() => setPhase("sliding"), holdDuration);
    return () => clearTimeout(holdTimer);
  }, [holdDuration]);

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
        sizes="100vw"
      />
      {/* Mobile */}
      <Image
        src={imgSrc}
        alt={alt}
        fill
        priority
        className="object-cover md:hidden"
        sizes="100vw"
      />
    </div>
  );
}
