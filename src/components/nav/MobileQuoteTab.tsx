"use client";

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
  if (hideMobileQuoteTab(pathname)) return null;

  return (
    <Link
      href="/quote"
      aria-label="Request a Quote"
      className="fixed right-0 top-1/2 z-[10040] flex -translate-y-1/2 items-center justify-center rounded-l-full border border-r-0 border-[#1dd1a1] bg-[var(--dark-primary-green)] px-2.5 py-5 text-sm font-bold tracking-wide text-white md:hidden print:hidden"
      style={{ marginRight: "env(safe-area-inset-right, 0px)" }}
    >
      <span className="select-none [writing-mode:vertical-rl] rotate-180">Request a Quote</span>
    </Link>
  );
}
