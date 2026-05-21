import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/home/Footer";
export const metadata: Metadata = {
  title: "Support | Brands Face",
  description: "Get help with quotes, orders, and packaging projects from Brands Face.",
};

export default function SupportPage() {
  return (
    <main className="min-h-screen bg-[#f5f0ea]">
      <section className="relative overflow-hidden bg-[#103a2a] px-4 pb-16 sm:px-6 sm:pb-20 lg:px-8">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/4 top-0 h-64 w-64 rounded-full bg-emerald-800/25 blur-[100px]" />
          <div className="absolute bottom-0 right-1/4 h-72 w-72 rounded-full bg-cyan-800/15 blur-[110px]" />
        </div>
        <div className="relative mx-auto max-w-[1240px] pt-10 sm:pt-12">
          <nav className="text-xs text-emerald-200/90">
            <Link href="/" className="transition-colors hover:text-white">
              Home
            </Link>
            <span className="mx-2 opacity-60">/</span>
            <span className="text-emerald-100/90">Support</span>
          </nav>
          <p className="mt-5 text-xs font-semibold uppercase tracking-[0.22em] text-emerald-300">Help</p>
          <h1 className="mt-3 text-3xl font-black tracking-tight text-white sm:text-4xl lg:text-5xl">Support</h1>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-emerald-50/85 sm:text-base">
            We are here for questions about quotes, specifications, timelines, and after-sales support.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-[820px] px-4 py-12 sm:px-6 sm:py-16">
        <div className="rounded-2xl border border-[#103a2a]/10 bg-white p-6 shadow-[0_18px_50px_rgba(16,58,42,0.08)] sm:p-8 lg:p-10">
          <h2 className="text-lg font-bold text-[#103a2a] sm:text-xl">Contact us</h2>
          <p className="mt-3 text-sm leading-relaxed text-[#103a2a]/80">
            The fastest way to reach our team is through the quote and project form. For general enquiries, use the
            chat options on the site when available.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/quote"
              className="inline-flex rounded-full bg-[#1dd1a1] px-5 py-2.5 text-sm font-bold text-[#0f2f22] transition hover:bg-[#37dfb2]"
            >
              Get a quote
            </Link>
            <Link
              href="/about"
              className="inline-flex rounded-full border border-[#103a2a]/20 bg-[#103a2a]/5 px-5 py-2.5 text-sm font-semibold text-[#103a2a] transition hover:bg-[#103a2a]/10"
            >
              About Brands Face
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
