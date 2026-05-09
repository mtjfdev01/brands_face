"use client";

export default function NewHowItWorks() {
  return (
    <section className="relative w-full overflow-hidden bg-[#020913] md:hidden" aria-label="How it works">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/assets/images/how_it_works.png"
        alt="How it works process: submit quote request, finalize pricing, prepare mockup, order preparation, quality check, and delivery."
        className="block h-auto w-auto mx-auto max-w-full"
      />
    </section>
  );
}
