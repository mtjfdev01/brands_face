import type { ReactNode } from "react";
import Link from "next/link";
import Footer from "@/components/home/Footer";
import HomeHeroNavbar from "@/components/nav/HomeHeroNavbar";

export type PolicyPageLayoutProps = {
  title: string;
  kicker?: string;
  lastUpdated?: string;
  children: ReactNode;
};

export default function PolicyPageLayout({
  title,
  kicker = "Legal",
  lastUpdated,
  children,
}: PolicyPageLayoutProps) {
  return (
    <main className="min-h-screen bg-[#f5f0ea]">
      <section className="relative overflow-hidden bg-[#103a2a] px-4 pb-16 sm:px-6 sm:pb-20 lg:px-8">
        <HomeHeroNavbar variant="layout" />
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/4 top-0 h-64 w-64 rounded-full bg-emerald-800/25 blur-[100px]" />
          <div className="absolute bottom-0 right-1/4 h-72 w-72 rounded-full bg-cyan-800/15 blur-[110px]" />
        </div>

        <div className="relative mx-auto max-w-[1240px] pt-20 sm:pt-24">
          <nav className="text-xs text-emerald-200/90">
            <Link href="/" className="transition-colors hover:text-white">
              Home
            </Link>
            <span className="mx-2 opacity-60">/</span>
            <span className="text-emerald-100/90">{title}</span>
          </nav>
          <p className="mt-5 text-xs font-semibold uppercase tracking-[0.22em] text-emerald-300">{kicker}</p>
          <h1 className="mt-3 text-3xl font-black tracking-tight text-white sm:text-4xl lg:text-5xl">{title}</h1>
          {lastUpdated ? (
            <p className="mt-4 text-sm text-emerald-50/75">Last updated: {lastUpdated}</p>
          ) : null}
        </div>
      </section>

      <section className="mx-auto max-w-[820px] px-4 py-12 sm:px-6 sm:py-16 lg:py-20">
        <article className="rounded-2xl border border-[#103a2a]/10 bg-white p-6 shadow-[0_18px_50px_rgba(16,58,42,0.08)] sm:p-8 lg:p-10">
          <div className="policy-doc space-y-4 text-sm leading-relaxed text-[#103a2a]/80 [&_h2]:mt-8 [&_h2]:text-base [&_h2]:font-bold [&_h2]:text-[#103a2a] [&_h2]:first:mt-0 sm:[&_h2]:text-lg [&_p+p]:mt-3 [&_ul]:my-3 [&_ul]:list-disc [&_ul]:space-y-1.5 [&_ul]:pl-5">
            {children}
          </div>
        </article>
      </section>

      <Footer />
    </main>
  );
}
