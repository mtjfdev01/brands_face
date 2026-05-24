"use client";

import { useMemo } from "react";
import PageHero from "@/components/hero/PageHero";
import type { PageHeroImage } from "@/components/hero/PageHeroMedia";
import { getCategoryPageConfig } from "@/data/categoryPages";
import { HOME_CARDS } from "@/data/homeCards";

type Props = {
  categorySlug: string | null | undefined;
};

function buildCategoryHeroImages(
  card: (typeof HOME_CARDS)[number] | undefined,
  bannerImages: string[],
): PageHeroImage[] {
  if (!card) return [];

  const slides = card.heroSlides ?? [];
  const seen = new Set<string>();
  const result: PageHeroImage[] = [];

  const push = (src: string | undefined, alt: string, priority?: boolean) => {
    if (!src || seen.has(src)) return;
    seen.add(src);
    result.push({ src, alt, priority });
  };

  slides.forEach((slide, idx) => {
    const src =
      slide.productImage ||
      (bannerImages.length > 0 ? bannerImages[idx % bannerImages.length] : undefined) ||
      card.image;
    push(src, slide.title || card.title, idx === 0);
  });

  bannerImages.forEach((src, idx) => {
    push(src, `${card.title} packaging ${idx + 1}`);
  });

  push(card.image, card.title, result.length === 0);

  return result;
}

export default function CategoryPageHero({ categorySlug }: Props) {
  const card = useMemo(
    () => HOME_CARDS.find((c) => c.category === categorySlug) ?? HOME_CARDS[0],
    [categorySlug],
  );

  const images = useMemo(() => {
    const bannerImages =
      (categorySlug ? getCategoryPageConfig(categorySlug)?.bannerImages : undefined)?.filter(Boolean) ?? [];
    return buildCategoryHeroImages(card, bannerImages);
  }, [card, categorySlug]);

  const primarySlide = card?.heroSlides?.[0];
  const title = primarySlide?.title ?? `Custom ${card?.title ?? "Packaging"}`;
  const description =
    primarySlide?.description ||
    card?.heroDescription ||
    "Premium custom packaging solutions tailored to your category with reliable production quality, flexible finishes, and fast turnaround.";

  return (
    <PageHero
      eyebrow={card?.title ?? "Packaging"}
      title={title}
      description={description}
      feature="Category-specific structures, finishes, and production options built for retail and e-commerce growth."
      primaryCta={{ label: card?.heroCtaText ?? "Get a Free Quote", href: "/quote" }}
      secondaryCta={{ label: "Free packaging audit", href: "/audit" }}
      images={images}
      sliderAutoplayDelay={5000}
    />
  );
}
