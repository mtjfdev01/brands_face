'use client';

import ProductSlider, { type Item as ProductItem } from '@/components/common/ProductRowScroll';
import IndustryPackagingSlider, { type IndustryItem } from '@/components/common/IndustryPackagingSlider';
import WhyChooseUs, { type FeatureCard } from '@/components/common/WhyChooseUs';
import SetTheTrends, { type TrendVideo } from '@/components/common/SetTheTrends';
import StudioShowcase from '@/components/common/StudioShowcase';
import Footer from '@/components/common/Footer';
import Hero from '@/components/hero/Hero';
import PromoCardsSlider from '@/components/promo/PromoCarsSlider';

export default function SalePage() {
  const industries: IndustryItem[] = [
    {
      id: "ind-1",
      title: "Automotive Packaging",
      description:
        "We believe in printing and producing automotive packaging products that endure, secure, and deliver parts with efficiency and excellence everywhere.",
      imageSrc: "/products/automotive.jpg",
      href: "/industries/automotive",
      badge: "Coming Soon",
    },
    {
      id: "ind-2",
      title: "Pets Packaging",
      description:
        "A vast range of packaging products for pet care that preserves the freshness of all the treats and protects toys. We keep both pets and owners happy.",
      imageSrc: "/products/pets.jpg",
      href: "/industries/pets",
      badge: "Coming Soon",
    },
    {
      id: "ind-3",
      title: "Stationery Packaging",
      description:
        "We make stationery packaging products that protect, secure, and functionally arrange writing essentials. So, consumers buy from display to desk.",
      imageSrc: "/products/stationery.jpg",
      href: "/industries/stationery",
      badge: "Coming Soon",
    },
    {
      id: "ind-4",
      title: "Gift Packaging",
      description:
        "Gift packaging is more than just a box. It speaks emotions by creating memories with a personal touch to every present with a unique unboxing experience.",
      imageSrc: "/products/gift-packaging.jpg",
      href: "/industries/gift",
      badge: "Coming Soon",
    },
    {
      id: "ind-5",
      title: "E-Commerce Packaging",
      description:
        "Smart, sturdy, and sustainable e-commerce packaging products are ideal for safe shipping and the best for brand impact and warehouse-friendly logistics.",
      imageSrc: "/products/ecommerce.jpg",
      href: "/industries/ecommerce",
      badge: "Coming Soon",
    },
    {
      id: "ind-6",
      title: "Display Packaging",
      description:
        "Showcase the products with premium display packaging box stocks, strong structures and strategic branding that boosts retail visibility and sales.",
      imageSrc: "/products/display.jpg",
      href: "/industries/display",
      badge: "Coming Soon",
    },
    {
      id: "ind-7",
      title: "Food Packaging",
      description:
        "Safe, fresh, and visually appealing food packaging solutions that maintain quality standards while making your products stand out on every shelf.",
      imageSrc: "/products/food.jpg",
      href: "/industries/food",
      badge: "Coming Soon",
    },
    {
      id: "ind-8",
      title: "Cosmetics Packaging",
      description:
        "Elegant and protective cosmetics packaging that reflects your brand identity, keeps products safe, and creates a luxurious unboxing experience.",
      imageSrc: "/products/cosmetics.jpg",
      href: "/industries/cosmetics",
      badge: "Coming Soon",
    },
  ];

  const whyFeatures: FeatureCard[] = [
    {
      id: "why-1",
      title: "Free Design Support",
      description:
        "We provide you with all-in packaging designs' assistance. Our marvelous themes always come hand in hand with functionality and aesthetics.",
      imageSrc: "/hero/why-design-support.png",
      bgColor: "bg-blue-100",
    },
    {
      id: "why-2",
      title: "E-Commerce Packaging Solutions",
      description:
        "Shop 'custom printed boxes with logo' in bulk quantities and wholesale prices. We offer a lightweight, sturdier, easy unboxing and closing experience.",
      imageSrc: "/hero/why-ecommerce.png",
      bgColor: "bg-red-300",
    },
    {
      id: "why-3",
      title: "Eco-Friendly Packaging",
      description:
        "Print 247 is an environmentally responsible packaging company. We endorse the use of recyclable and sustainable materials for a greener planet.",
      imageSrc: "/hero/why-eco-friendly.png",
      bgColor: "bg-rose-200",
    },
    {
      id: "why-4",
      title: "Quick Turnaround Time",
      description:
        "We are fast. We are quick. And we keep you updated till you receive the order/packaging products in your hands, which are shipped nationwide.",
      imageSrc: "/hero/why-turnaround.png",
      bgColor: "bg-yellow-300",
    },
    {
      id: "why-5",
      title: "Ideal Customer Support",
      description:
        "We provide you with the most skillful customer support in the USA. Dial us, then let us make your dream packaging a reality with 24/7 support.",
      imageSrc: "/hero/why-customer-support.png",
      bgColor: "bg-pink-200",
    },
    {
      id: "why-6",
      title: "Low MOQs",
      description:
        "Our printing and packaging company offers the most pleasing low MOQs (Minimum Order Quantity) packages in the United States of America.",
      imageSrc: "/hero/why-low-moqs.png",
      bgColor: "bg-violet-200",
    },
  ];

  const trendVideos: TrendVideo[] = [
    { id: "tv-1", src: "/videos/trend-1.mp4", poster: "/videos/trend-1-poster.jpg" },
    { id: "tv-2", src: "/videos/trend-2.mp4", poster: "/videos/trend-2-poster.jpg" },
    { id: "tv-3", src: "/videos/trend-3.mp4", poster: "/videos/trend-3-poster.jpg" },
    { id: "tv-4", src: "/videos/trend-4.mp4", poster: "/videos/trend-4-poster.jpg" },
    { id: "tv-5", src: "/videos/trend-5.mp4", poster: "/videos/trend-5-poster.jpg" },
    { id: "tv-6", src: "/videos/trend-6.mp4", poster: "/videos/trend-6-poster.jpg" },
    { id: "tv-7", src: "/videos/trend-7.mp4", poster: "/videos/trend-7-poster.jpg" },
    { id: "tv-8", src: "/videos/trend-8.mp4", poster: "/videos/trend-8-poster.jpg" },
  ];

  const products: ProductItem[] = [
    {
      id: "1",
      title: "Custom Rigid Boxes",
      imageSrc: "/products/rigid.png",
      href: "/products/rigid",
    },
    {
      id: "2",
      title: "Custom Mailer Boxes",
      imageSrc: "/products/mailer.png",
      href: "/products/mailer",
    },
    {
      id: "3",
      title: "Gift Boxes",
      imageSrc: "/products/gift.png",
      href: "/products/gift",
    },
    {
      id: "4",
      title: "Folding Carton",
      imageSrc: "/products/mailer.png",
      href: "/products/carton",
    },
    {
      id: "5",
      title: "Cardboard Boxes",
      imageSrc: "/products/mailer.png",
      href: "/products/cardboard",
    },
    {
      id: "6",
      title: "Cardboard Boxes",
      imageSrc: "/products/mailer.png",
      href: "/products/cardboard",
    },
    {
      id: "7",
      title: "Cardboard Boxes",
      imageSrc: "/products/mailer.png",
      href: "/products/cardboard",
    },
    {
      id: "8",
      title: "Cardboard Boxes",
      imageSrc: "/products/mailer.png",
      href: "/products/cardboard",
    },
  ];

  return (
    <main className="min-h-screen bg-[var(--color-page-bg)]">
      <Hero />
      <PromoCardsSlider />
      <ProductSlider
        title="Let's Make the Right Custom Retail Boxes"
        items={products}
      />
      <IndustryPackagingSlider
        title="All-Inclusive Industrial Packaging Supplies"
        items={industries}
      />
      <WhyChooseUs
        heading="A Big Why?"
        subheading="Why Choose Us? We transform your product packaging. Let's make your product roar. Let's make your product take the lead. Join us to be a Success Story. Join us, because We are an American packaging company for Americans."
        features={whyFeatures}
      />
      <SetTheTrends
        marqueeText='See Our Products and Say, "Wow" Let&apos;em See Your Products and Say, "Wow"'
        heading="Set the Trends"
        subheading='Indeed, you are just a call away from us. Hence, you set the new trends of packaging products with us. Because we think "Beautiful". We think "Revolutionary". For You!'
        videos={trendVideos}
      />
      <StudioShowcase />
      <Footer />
    </main>
  );
}
