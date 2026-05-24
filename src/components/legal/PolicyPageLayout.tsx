import type { ReactNode } from "react";
import Footer from "@/components/home/Footer";
import PageHero from "@/components/hero/PageHero";

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
    <main className="min-h-screen bg-[var(--primary-cream)]">
      <PageHero
        eyebrow={kicker}
        title={title}
        description={
          lastUpdated
            ? `Last updated: ${lastUpdated}. Please read this policy carefully before using our services.`
            : "Please read this policy carefully before using our services."
        }
        breadcrumbs={[{ label: "Home", href: "/" }, { label: title }]}
      />

      <section className="mx-auto max-w-[820px] px-4 py-12 sm:px-6 sm:py-16 lg:py-20">
        <article className="rounded-2xl border border-[var(--dark-primary-green)]/10 bg-white p-6 shadow-[0_18px_50px_rgba(19,47,43,0.08)] sm:p-8 lg:p-10">
          <div className="policy-doc space-y-4 text-sm leading-relaxed text-[var(--dark-primary-green)]/80 [&_h2]:mt-8 [&_h2]:text-base [&_h2]:font-bold [&_h2]:text-[var(--dark-primary-green)] [&_h2]:first:mt-0 sm:[&_h2]:text-lg [&_p+p]:mt-3 [&_ul]:my-3 [&_ul]:list-disc [&_ul]:space-y-1.5 [&_ul]:pl-5">
            {children}
          </div>
        </article>
      </section>

      <Footer />
    </main>
  );
}
