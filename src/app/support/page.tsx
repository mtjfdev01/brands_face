import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/home/Footer";
import PageHero from "@/components/hero/PageHero";

export const metadata: Metadata = {
  title: "Support | Brands Face",
  description: "Get help with quotes, orders, and packaging projects from Brands Face.",
};

export default function SupportPage() {
  return (
    <main className="min-h-screen bg-[var(--primary-cream)]">
      <PageHero
        eyebrow="Help"
        title="Support"
        description="We are here for questions about quotes, specifications, timelines, and after-sales support."
        primaryCta={{ label: "Get a quote", href: "/quote" }}
        secondaryCta={{ label: "About Brands Face", href: "/about" }}
        image={{ src: "/assets/images/hero_main.png", alt: "Brands Face support" }}
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Support" }]}
      />

      <section className="mx-auto max-w-[820px] px-4 py-12 sm:px-6 sm:py-16">
        <div className="rounded-2xl border border-[var(--dark-primary-green)]/10 bg-white p-6 shadow-[0_18px_50px_rgba(19,47,43,0.08)] sm:p-8 lg:p-10">
          <h2 className="text-lg font-bold text-[var(--dark-primary-green)] sm:text-xl">Contact us</h2>
          <p className="mt-3 text-sm leading-relaxed text-[var(--dark-primary-green)]/80">
            The fastest way to reach our team is through the quote and project form. For general enquiries, use the
            chat options on the site when available.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/quote"
              className="inline-flex rounded-full bg-[var(--light-green)] px-5 py-2.5 text-sm font-bold text-[var(--primary-btn-text)] transition hover:brightness-110"
            >
              Get a quote
            </Link>
            <Link
              href="/about"
              className="inline-flex rounded-full border border-[var(--dark-primary-green)]/20 bg-[var(--dark-primary-green)]/5 px-5 py-2.5 text-sm font-semibold text-[var(--dark-primary-green)] transition hover:bg-[var(--dark-primary-green)]/10"
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
