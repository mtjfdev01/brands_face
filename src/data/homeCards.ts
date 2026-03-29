/**
 * Home / hero carousel cards. `category` is the canonical slug for URLs:
 * `/category/[category]` (see `src/data/categoryPages.ts` for banners + product teasers).
 */
export interface HomeCard {
  title: string;
  category: string;
  image: string;
  color: string;
  heroDescription: string; 
  heroCtaText: string;
  heroSlides: Array<{
    title: string;
    description: string;
    ctaText: string;
    productImage?: string;
  }>;
}

export const HOME_CARDS: HomeCard[] = [
  {
    title: "Rigid Boxes",
    category: "rigid_boxes",
    image: "/assets/images/categories/rigid_box.jpeg",
    color: "#c4a265",
    heroDescription:
      "Durable rigid packaging that gives your products a premium shelf presence with precise structure, elegant finishing, and consistent brand impact.",
    heroCtaText: "Get Rigid Box Quote",
    heroSlides: [
      {
        title: "Premium Rigid Boxes",
        description:
          "Elevate high-value products with premium rigid box structures, luxury finishes, and stronger shelf appeal for retail success.",
        ctaText: "Get Rigid Box Quote",
      },
      {
        title: "Magnetic & Setup Rigid Styles",
        description:
          "Choose from magnetic closure, lift-off lid, and custom setup rigid styles tailored to your brand presentation and unboxing feel.",
        ctaText: "Customize Rigid Style",
      },
    ],
  },
  {
    title: "Corrugated Boxes",
    category: "corrugated_boxes",
    image: "/assets/images/categories/coregerated_box.jpeg",
    color: "#8b6f47",
    heroDescription:
      "Corrugated box solutions designed for strong protection in transit, efficient stacking, and polished branding for e-commerce and retail shipments.",
    heroCtaText: "Get Corrugated Quote",
    heroSlides: [
      {
        title: "Heavy-Duty Corrugated Boxes",
        description:
          "Built for protection and logistics efficiency, our corrugated packaging keeps products secure from warehouse to doorstep.",
        ctaText: "Get Corrugated Quote",
      },
      {
        title: "Ecommerce Shipping Corrugates",
        description:
          "Optimize shipping costs and brand visibility with durable corrugated designs engineered for modern e-commerce operations.",
        ctaText: "Design Shipping Box",
      },
    ],
  },
  {
    title: "Custom Pouches",
    category: "custom_pouches",
    image: "/assets/images/categories/pouch.jpeg",
    color: "#5a7a5a",
    heroDescription:
      "Custom pouches with flexible barrier options, eye-catching print quality, and practical convenience features for modern product packaging.",
    heroCtaText: "Get Pouch Quote",
    heroSlides: [
      {
        title: "Custom Printed Pouches",
        description:
          "High-impact pouch packaging with excellent print quality and practical resealable options to enhance customer convenience.",
        ctaText: "Get Pouch Quote",
      },
      {
        title: "Stand-Up & Flat Pouch Options",
        description:
          "Select stand-up, flat, or zipper pouch formats designed for shelf visibility, freshness retention, and smooth product handling.",
        ctaText: "Explore Pouch Types",
      },
    ],
  },
  {
    title: "Carry Bags",
    category: "carry_bags",
    image: "/assets/images/categories/gift_box.jpeg",
    color: "#a0522d",
    heroDescription:
      "Gift-ready boxes that combine premium visual presentation with functional structure to create memorable unboxing experiences every time.",
    heroCtaText: "Get Gift Box Quote",
    heroSlides: [
      {
        title: "Luxury Gift Box Packaging",
        description:
          "Create unforgettable unboxing moments with gift boxes that combine visual elegance and robust packaging structure.",
        ctaText: "Get Gift Box Quote",
      },
      {
        title: "Seasonal & Event Gift Boxes",
        description:
          "Launch themed gift box collections for holidays, campaigns, and events with fast production and premium finishing choices.",
        ctaText: "Plan Gift Collection",
      },
    ],
  },
  {
    title: "Kraft Boxes",
    category: "kraft_boxes",
    image: "/assets/images/categories/craft_box.jpeg",
    color: "#d4a0a0",
    heroDescription:
      "Eco-conscious kraft packaging with natural texture, strong construction, and clean printing options for sustainable brand positioning.",
    heroCtaText: "Get Kraft Box Quote",
    heroSlides: [
      {
        title: "Eco Kraft Box Solutions",
        description:
          "Sustainable kraft packaging with natural texture and strong build quality for environmentally conscious brands.",
        ctaText: "Get Kraft Box Quote",
      },
      {
        title: "Recyclable Kraft Branding",
        description:
          "Pair recyclable stock with clean custom printing to keep your packaging eco-focused without sacrificing visual impact.",
        ctaText: "Customize Kraft Branding",
      },
    ],
  },
  {
    title: "Labels & Tags",
    category: "labels_tags",
    image: "/assets/images/categories/tags.jpeg",
    color: "#c87941",
    heroDescription:
      "Custom labels and tags crafted for brand clarity, product storytelling, and standout visibility across retail shelves and shipping touchpoints.",
    heroCtaText: "Get Labels Quote",
    heroSlides: [
      {
        title: "Custom Labels & Tags",
        description:
          "Design labels and tags that strengthen brand identity, improve product clarity, and attract attention on crowded shelves.",
        ctaText: "Get Labels Quote",
      },
      {
        title: "Retail & Shipping Label Systems",
        description:
          "From product tags to shipping labels, create a consistent visual language across every customer touchpoint.",
        ctaText: "Build Label System",
      },
    ],
  },
  {
    title: "Art Card",
    category: "art_card",
    image: "/assets/images/categories/art_card.jpeg",
    color: "#9b8ec4",
    heroDescription:
      "Art-card packaging with vibrant print reproduction, smooth finishing options, and refined construction for premium product categories.",
    heroCtaText: "Get Art Card Quote",
    heroSlides: [
      {
        title: "Art Card Packaging",
        description:
          "Deliver vibrant graphics and premium print quality with art-card packaging tailored for high-impact product displays.",
        ctaText: "Get Art Card Quote",
      },
      {
        title: "Premium Coated Art Card",
        description:
          "Choose coated art-card stocks for sharper visuals, cleaner details, and elegant finishing that supports premium positioning.",
        ctaText: "Explore Art Card Finish",
      },
    ],
  },
];
