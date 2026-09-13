import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Footer from "@/components/home/Footer";
import QuickQuoteHeroSection from "@/components/home/QuickQuoteHeroSection";
import { aboutShareMetadata, siteOrigin } from "@/lib/seo";

export const metadata: Metadata = aboutShareMetadata();

const STORY_IMAGE = "/assets/images/pages/about/about_hero.png";

const STUDIO = {
  atelier: "/assets/images/pages/about/expertise-atelier.png",
  foil: "/assets/images/pages/about/expertise-foil.png",
  board: "/assets/images/pages/about/expertise-board.png",
};

const VALUE_STILLS = [
  {
    src: "/assets/images/pages/about/values-quality.png",
    alt: "Print proof, colour chips, and foil swatches on a packaging quality table",
    caption: "Quality",
  },
  {
    src: "/assets/images/pages/about/values-strategy.png",
    alt: "Packaging audit still life with kraft box, pouch sample, and dieline sketches",
    caption: "Strategy",
  },
  {
    src: "/assets/images/pages/about/values-materials.png",
    alt: "Kraft roll, recycled flute, cotton twine, and responsible packaging materials",
    caption: "Materials",
  },
];

const CRAFTS = [
  {
    n: "01",
    title: "Structure",
    text: "Rigid, corrugated, and folding cartons specified for shelf, ship, and unboxing.",
  },
  {
    n: "02",
    title: "Print",
    text: "Colour-true graphics that stay aligned from proof to the packed carton.",
  },
  {
    n: "03",
    title: "Finish",
    text: "Foil, emboss, kraft, and soft-touch stocks that raise perceived value.",
  },
  {
    n: "04",
    title: "Formats",
    text: "Pouches, carry bags, labels, and seasonal packs in the same brand system.",
  },
];

const LINES = [
  { label: "Rigid boxes", href: "/category/rigid_boxes" },
  { label: "Corrugated boxes", href: "/category/corrugated_boxes" },
  { label: "Custom pouches", href: "/category/custom_pouches" },
  { label: "Carry bags", href: "/category/carry_bags" },
];

const VALUES = [
  {
    n: "01",
    title: "Quality First",
    text: "Every structure, print, and finish is specified to protect the product and raise perceived value on shelf and at unboxing.",
  },
  {
    n: "02",
    title: "Strategy Before Print",
    text: "We audit what your current pack is saying before we design a new one — so spend goes to conversion, not decoration.",
  },
  {
    n: "03",
    title: "Built for USA Brands",
    text: "We serve retail and e-commerce brands across the USA with custom boxes, pouches, bags, and labels matched to US market expectations.",
  },
  {
    n: "04",
    title: "Clear Quotes & Timelines",
    text: "You get a written scope, finishing options, and a production window you can plan a launch around — no hidden add-ons after approval.",
  },
  {
    n: "05",
    title: "Eco-Conscious Options",
    text: "Kraft, recyclable stocks, and responsible coatings are available whenever the category and supply chain support them.",
  },
  {
    n: "06",
    title: "End-to-End Execution",
    text: "From dieline and proof to production and packing specs, one team owns the line so colour, structure, and delivery stay aligned.",
  },
];

export default function AboutPage() {
  const origin = siteOrigin();

  return (
    <main className="min-h-screen bg-[var(--primary-cream)]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "AboutPage",
            name: "About Brandsface",
            url: `${origin}/about`,
            description:
              "About Brandsface — a custom packaging company serving brands across the USA with custom boxes, rigid boxes, pouches, carry bags, and labels.",
            mainEntity: {
              "@type": "Organization",
              name: "Brandsface",
              url: origin,
              description:
                "Custom packaging company serving brands across the USA with custom boxes, rigid boxes, pouches, carry bags, and labels.",
              areaServed: { "@type": "Country", name: "United States" },
            },
          }),
        }}
      />

      <section className="px-4 pb-12 pt-8 sm:px-6 sm:pb-16 sm:pt-10 lg:px-8">
        <div className="mx-auto max-w-[1100px]">
          {/* <nav className="text-xs text-[var(--dark-primary-green)]/55" aria-label="Breadcrumb">
            <Link href="/" className="transition-colors hover:text-[var(--dark-primary-green)]">
              Home
            </Link>
            <span className="mx-2 opacity-50">/</span>
            <span className="text-[var(--dark-primary-green)]">About us</span>
          </nav> */}

          <p className="mt-8 text-xs font-semibold uppercase tracking-[0.22em] text-[#c5a059]">
            Custom packaging company
          </p>
          <h1 className="mt-3 max-w-3xl font-[family-name:var(--font-playfair)] text-[2.15rem] font-extrabold leading-[1.15] text-[var(--dark-primary-green)] sm:text-5xl lg:text-[3.35rem]">
            Our Commitment To You
          </h1>
          <p className="mt-3 font-[family-name:var(--font-playfair)] text-xl italic text-[#c5a059] sm:text-2xl">
            Packaging as a growth channel
          </p>
          <p className="mt-6 max-w-3xl text-sm leading-relaxed text-[var(--dark-primary-green)]/80 sm:text-base">
            Brandsface treats every custom packaging order with the same care — whether you are launching a first SKU
            or scaling a national line. We stand behind print quality, structure, and the quote we give. When something
            is not right, we fix it. As a custom packaging company serving brands across the USA, we design boxes,
            pouches, carry bags, and labels that look premium, protect the product, and help the brand sell.
          </p>
        </div>
      </section>

      <section className="border-y border-[var(--dark-primary-green)]/8 bg-white px-4 py-14 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
        <div className="mx-auto grid max-w-[1100px] items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#c5a059]">Origin · Mission</p>
            <h2 className="mt-3 font-[family-name:var(--font-playfair)] text-3xl font-extrabold text-[var(--dark-primary-green)] sm:text-4xl">
              Our Story
            </h2>
            <div className="mt-6 space-y-4 text-sm leading-relaxed text-[var(--dark-primary-green)]/80 sm:text-[15px]">
              <p>
                Growing brands used to choose between generic stock boxes and packaging programmes built only for
                the largest corporations. Brandsface exists to close that gap. We give retail, beauty, food, and
                e-commerce teams a custom box manufacturer they can brief like a brand partner — not a commodity
                printer.
              </p>
              <p>
                We serve brands across the United States with custom rigid boxes, corrugated shippers, printed art-card
                cartons, pouches, carry bags, kraft packs, and labels. Production is planned around US retail and
                fulfilment standards: readable barcodes, durable transit, and unboxing that still feels considered when
                the pack lands on a doorstep.
              </p>
              <p>
                Every project starts with an audit of what the current pack communicates. Then we lock structure,
                board, print, and finish so colour, cost, and lead time stay honest from proof to shipment.
              </p>
            </div>
          </div>
          <div className="relative aspect-[5/4] overflow-hidden rounded-2xl bg-[var(--dark-primary-green)]/5 shadow-[0_18px_50px_rgba(19,47,43,0.12)]">
            <Image
              src={STORY_IMAGE}
              alt="Premium branded packaging designed by Brandsface"
              fill
              priority
              sizes="(max-width: 1024px) 92vw, 520px"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      <section className="px-4 py-14 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-[1100px]">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#c5a059]">The studio</p>
              <h2 className="mt-3 font-[family-name:var(--font-playfair)] text-3xl font-extrabold text-[var(--dark-primary-green)] sm:text-4xl">
                Our Packaging Expertise
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-[var(--dark-primary-green)]/75 sm:text-base">
                We work like a packaging studio: structure first, then print and finish — so boxes, pouches, bags, and
                labels feel like one line, not four separate orders.
              </p>
            </div>
            <p className="max-w-xs font-[family-name:var(--font-playfair)] text-lg italic text-[#c5a059] lg:text-right lg:text-xl">
              From dieline to finish.
            </p>
          </div>

          <div className="mt-10 grid gap-3 lg:grid-cols-3">
            <figure className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-[#f3eee6] shadow-[0_18px_50px_rgba(19,47,43,0.1)] lg:col-span-2">
              <Image
                src={STUDIO.atelier}
                alt="Packaging studio table with a rigid box, kraft board, gold foil, and ribbon"
                fill
                sizes="(max-width: 1024px) 92vw, 720px"
                className="object-cover"
              />
              <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[var(--dark-primary-green)]/85 to-transparent px-5 pb-4 pt-16 text-sm font-medium tracking-wide text-white">
                Studio table · box, kraft, foil, ribbon
              </figcaption>
            </figure>

            <figure className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-[var(--dark-primary-green)] shadow-[0_18px_50px_rgba(19,47,43,0.1)] sm:aspect-[4/3] lg:aspect-auto lg:h-full">
              <Image
                src={STUDIO.foil}
                alt="Gold foil stamping on forest-green paper stock"
                fill
                sizes="(max-width: 1024px) 92vw, 360px"
                className="object-cover"
              />
              <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 to-transparent px-4 pb-4 pt-12 text-xs font-semibold uppercase tracking-[0.18em] text-[#c5a059]">
                Print &amp; finish
              </figcaption>
            </figure>

            <figure className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-[#f3eee6] shadow-[0_18px_50px_rgba(19,47,43,0.1)] sm:aspect-[4/3] lg:aspect-[3/4]">
              <Image
                src={STUDIO.board}
                alt="Corrugated flute and kraft carton structure"
                fill
                sizes="(max-width: 1024px) 92vw, 360px"
                className="object-cover"
              />
              <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[var(--dark-primary-green)]/80 to-transparent px-4 pb-4 pt-12 text-xs font-semibold uppercase tracking-[0.18em] text-white">
                Board &amp; structure
              </figcaption>
            </figure>

            <div className="grid gap-6 rounded-2xl border border-[var(--dark-primary-green)]/10 bg-white p-6 sm:grid-cols-2 sm:p-8 lg:col-span-2 lg:content-center">
              {CRAFTS.map((item) => (
                <div key={item.n}>
                  <p className="font-[family-name:var(--font-playfair)] text-lg font-extrabold leading-none text-[#c5a059]">
                    {item.n}
                  </p>
                  <h3 className="mt-2 text-base font-bold text-[var(--dark-primary-green)]">{item.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-[var(--dark-primary-green)]/70">{item.text}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 flex flex-wrap gap-2">
            {LINES.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-full border border-[var(--dark-primary-green)]/15 bg-white px-4 py-2 text-sm font-semibold text-[var(--dark-primary-green)] transition hover:border-[#c5a059]/50 hover:text-[#c5a059]"
              >
                {item.label}
              </Link>
            ))}
          </div>

          <p className="mt-6 text-sm text-[var(--dark-primary-green)]/70">
            Also available:{" "}
            <Link href="/category/art_card_boxes" className="font-semibold text-[var(--dark-primary-green)] underline-offset-2 hover:underline">
              art card boxes
            </Link>
            ,{" "}
            <Link href="/category/kraft_boxes" className="font-semibold text-[var(--dark-primary-green)] underline-offset-2 hover:underline">
              kraft boxes
            </Link>
            ,{" "}
            <Link href="/category/labels_and_tags" className="font-semibold text-[var(--dark-primary-green)] underline-offset-2 hover:underline">
              labels &amp; tags
            </Link>
            , and{" "}
            <Link href="/category/christmas-packaging" className="font-semibold text-[var(--dark-primary-green)] underline-offset-2 hover:underline">
              Christmas packaging
            </Link>
            .{" "}
            <Link href="/catalog" className="font-semibold text-[#c5a059] underline-offset-2 hover:underline">
              View all products
            </Link>
          </p>
        </div>
      </section>

      <section className="bg-[var(--dark-primary-green)] px-4 py-14 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-[1100px]">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#c5a059]">How we work</p>
              <h2 className="mt-3 font-[family-name:var(--font-playfair)] text-3xl font-extrabold text-[var(--primary-cream)] sm:text-4xl">
                Our Values
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-white/70 sm:text-base">
                Honest quoting, dependable production, and packaging that performs for the brand — not just the brief.
              </p>
            </div>
            <p className="max-w-xs font-[family-name:var(--font-playfair)] text-lg italic text-[#c5a059] lg:text-right lg:text-xl">
              Quality before quantity.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-3 gap-2 sm:gap-3">
            {VALUE_STILLS.map((still) => (
              <figure
                key={still.src}
                className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-[#0d221f] shadow-[0_18px_50px_rgba(0,0,0,0.28)]"
              >
                <Image
                  src={still.src}
                  alt={still.alt}
                  fill
                  sizes="(max-width: 640px) 92vw, 360px"
                  className="object-cover"
                />
                <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 to-transparent px-4 pb-4 pt-12 text-xs font-semibold uppercase tracking-[0.18em] text-[#c5a059]">
                  {still.caption}
                </figcaption>
              </figure>
            ))}
          </div>

          <ol className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {VALUES.map((item) => (
              <li
                key={item.n}
                className="rounded-2xl border border-white/10 bg-white/[0.06] px-5 py-5 sm:px-6 sm:py-6"
              >
                <p className="font-[family-name:var(--font-playfair)] text-lg font-extrabold leading-none text-[#c5a059]">
                  {item.n}
                </p>
                <h3 className="mt-3 text-base font-bold text-[var(--primary-cream)]">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/65">{item.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <QuickQuoteHeroSection
        backgroundSrc="/assets/images/quick_quote.jpg"
        formAlign="right"
        layout="band"
        hangOnTop
        className="border-t border-[#103a2a]/10"
      />

      <Footer />
    </main>
  );
}
