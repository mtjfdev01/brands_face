"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

function hideMobileQuoteTab(pathname: string | null) {
  if (!pathname) return true;
  if (pathname.startsWith("/admin")) return true;
  if (pathname === "/quote" || pathname.startsWith("/quote/")) return true;
  if (pathname.startsWith("/products/")) return true;
  if (pathname === "/about" || pathname.startsWith("/about/")) return true;
  if (pathname === "/sale" || pathname.startsWith("/sale/")) return true;
  if (pathname === "/audit" || pathname.startsWith("/audit/")) return true;
  return false;
}

/** Mobile-only vertical quote tab, flush to the right-center of the viewport. */
export default function MobileQuoteTab() {
  const pathname = usePathname();
  const [heroBlocking, setHeroBlocking] = useState(pathname === "/");

  useEffect(() => {
    if (pathname !== "/") {
      setHeroBlocking(false);
      return;
    }

    setHeroBlocking(true);
    let cancelled = false;
    let observer: IntersectionObserver | null = null;
    let poll: number | undefined;

    const attach = () => {
      const el = document.getElementById("home-hero");
      if (!el) return false;
      observer = new IntersectionObserver(
        ([entry]) => {
          if (!cancelled) setHeroBlocking(entry.isIntersecting);
        },
        { threshold: 0 },
      );
      observer.observe(el);
      return true;
    };

    if (!attach()) {
      poll = window.setInterval(() => {
        if (attach() && poll) window.clearInterval(poll);
      }, 80);
    }

    return () => {
      cancelled = true;
      if (poll) window.clearInterval(poll);
      observer?.disconnect();
    };
  }, [pathname]);

  if (hideMobileQuoteTab(pathname) || heroBlocking) return null;

  return (
    <Link
      href="/quote"
      aria-label="Request a Quote"
      className="fixed right-0 z-[10040] flex items-center justify-center rounded-l-full border border-r-0 border-[#1dd1a1] bg-[var(--dark-primary-green)] px-2.5 py-5 text-sm font-bold tracking-wide text-white md:hidden print:hidden"
      style={{
        top: "50svh",
        transform: "translateY(-50%)",
        marginRight: "env(safe-area-inset-right, 0px)",
      }}
    >
      <span className="select-none [writing-mode:vertical-rl] rotate-180">Request a Quote</span>
    </Link>
  );
}
