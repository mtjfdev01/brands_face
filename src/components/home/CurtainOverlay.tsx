"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

type Props = {
  desktopSrc: string;
  mobileSrc?: string;
  alt?: string;
  /** Brief flash before slide-up (ms) */
  holdDuration?: number;
  /** Slide-up animation length (ms) */
  slideDuration?: number;
};

// Once per full page load / tab session; skipped on client navigations back to home.
let hasShownCurtainOverlayInSession = false;

const DEFAULT_HOLD_MS = 1000;
const DEFAULT_SLIDE_MS = 380;

export default function CurtainOverlay({
  desktopSrc,
  mobileSrc,
  alt = "Brands Face",
  holdDuration = DEFAULT_HOLD_MS,
  slideDuration = DEFAULT_SLIDE_MS,
}: Props) {
  const [phase, setPhase] = useState<"hold" | "sliding" | "done">(() =>
    hasShownCurtainOverlayInSession ? "done" : "hold",
  );

  useEffect(() => {
    if (phase === "done") return;
    hasShownCurtainOverlayInSession = true;

    if (phase === "hold") {
      const root = document.documentElement;
      root.dataset.curtainActive = "1";
      document.body.style.overflow = "hidden";

      const holdTimer = setTimeout(() => setPhase("sliding"), holdDuration);
      return () => {
        clearTimeout(holdTimer);
        delete root.dataset.curtainActive;
        document.body.style.overflow = "";
      };
    }

    const doneTimer = setTimeout(() => setPhase("done"), slideDuration);
    return () => clearTimeout(doneTimer);
  }, [phase, holdDuration, slideDuration]);

  if (phase === "done") return null;

  const mobileBannerSrc = mobileSrc ?? desktopSrc;

  return (
    <div
      className="pointer-events-none fixed inset-0 z-50 overflow-hidden"
      style={{
        transform: phase === "sliding" ? "translateY(-100%)" : "translateY(0)",
        transition:
          phase === "sliding"
            ? `transform ${slideDuration}ms cubic-bezier(0.76, 0, 0.24, 1)`
            : "none",
      }}
    >
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
      <div className="absolute inset-0 flex items-start justify-start md:hidden">
        <Image
          src={mobileBannerSrc}
          alt={alt}
          width={1080}
          height={1920}
          className="object-contain object-center"
          style={{ maxWidth: "100vw", width: "100vw", height: "auto" }}
          sizes="100vw"
        />
      </div>
    </div>
  );
}
