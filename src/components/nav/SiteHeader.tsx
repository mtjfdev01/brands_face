"use client";

import { usePathname } from "next/navigation";
import HomeHeroNavbar from "@/components/nav/HomeHeroNavbar";

/** Global marketing navbar only — hidden on admin routes. */
export default function SiteHeader() {
  const pathname = usePathname();
  if (pathname?.startsWith("/admin")) {
    return null;
  }

  return <HomeHeroNavbar variant="layout" />;
}
