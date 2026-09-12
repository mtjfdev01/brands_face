import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Footer from "@/components/home/Footer";
import QuickQuoteHeroSection from "@/components/home/QuickQuoteHeroSection";
import { HOME_CARDS } from "@/data/homeCards";
import { aboutShareMetadata, siteOrigin } from "@/lib/seo";

export const metadata: Metadata = aboutShareMetadata();

const STORY_IMAGE = "/assets/images/pages/about/about_hero.png";

const EXPERTISE = HOME_CARDS.filter((card) =>
  ["rigid_boxes", "corrugated_boxes", "custom_pouches", "carry_bags"].includes(card.category),
).map((card) => ({
  title: card.heroTitle,
  href: `/category/${card.category}`,
  image: card.image,
  blurb: card.heroDescription,
}));

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
          <nav className="text-xs text-[var(--dark-primary-green)]/55" aria-label="Breadcrumb">
            <Link href="/" className="transition-colors hover:text-[var(--dark-primary-green)]">
              Home
            </Link>
            <span className="mx-2 opacity-50">/</span>
            <span className="text-[var(--dark-primary-green)]">About us</span>
          </nav>

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
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#c5a059]">What we make</p>
          <h2 className="mt-3 max-w-2xl font-[family-name:var(--font-playfair)] text-3xl font-extrabold text-[var(--dark-primary-green)] sm:text-4xl">
            Our Packaging Expertise
          </h2>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-[var(--dark-primary-green)]/75 sm:text-base">
            Custom boxes, folding cartons, flexible pouches, retail bags, and labels for food, beauty, retail, and
            e-commerce brands across the USA.
          </p>

          <div className="mt-10 grid gap-5 sm:grid-cols-2">
            {EXPERTISE.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="group overflow-hidden rounded-2xl border border-[var(--dark-primary-green)]/10 bg-white shadow-[0_10px_32px_rgba(19,47,43,0.07)] transition hover:-translate-y-0.5 hover:border-[#c5a059]/40"
              >
                <div className="relative aspect-[16/9] overflow-hidden bg-[#f3eee6]">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(max-width: 640px) 92vw, 520px"
                    className="object-cover transition duration-500 group-hover:scale-[1.04]"
                  />
                </div>
                <div className="p-5 sm:p-6">
                  <h3 className="font-[family-name:var(--font-playfair)] text-xl font-bold text-[var(--dark-primary-green)]">
                    {item.title}
                  </h3>
                  <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-[var(--dark-primary-green)]/70">
                    {item.blurb}
                  </p>
                </div>
              </Link>
            ))}
          </div>

          <p className="mt-8 text-sm text-[var(--dark-primary-green)]/70">
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

      <section className="border-t border-[var(--dark-primary-green)]/8 bg-white px-4 py-14 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
        <div className="mx-auto grid max-w-[1100px] items-start gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#c5a059]">How we work</p>
            <h2 className="mt-3 font-[family-name:var(--font-playfair)] text-3xl font-extrabold text-[var(--dark-primary-green)] sm:text-4xl">
              Our Values
            </h2>
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-[var(--dark-primary-green)]/75 sm:text-base">
              Honest quoting, dependable production, and packaging that performs for the brand — not just the brief.
            </p>

            <ol className="mt-10 space-y-7">
              {VALUES.map((item) => (
                <li key={item.n} className="flex gap-4">
                  <span className="mt-0.5 w-10 shrink-0 font-[family-name:var(--font-playfair)] text-xl font-extrabold text-[#c5a059]">
                    {item.n}.
                  </span>
                  <div>
                    <h3 className="text-lg font-bold text-[var(--dark-primary-green)]">{item.title}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-[var(--dark-primary-green)]/75">{item.text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          <div className="relative mx-auto aspect-[4/5] w-full max-w-md overflow-hidden rounded-2xl bg-[var(--primary-cream)] shadow-[0_18px_50px_rgba(19,47,43,0.12)] lg:mt-16">
            <Image
              src={STORY_IMAGE}
              alt="Brandsface custom packaging values — quality print and structure"
              fill
              sizes="(max-width: 1024px) 90vw, 420px"
              className="object-cover"
            />
          </div>
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
