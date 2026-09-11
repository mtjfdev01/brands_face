/**
 * Home / hero carousel cards. `category` is the canonical slug for URLs:
 * `/category/[category]` (see `src/data/categoryPages.ts` for banners + product teasers).
 */
export interface HomeCard {
  title: string;
  category: string;
  image: string;
  color: string;
  /** Visible H1 on `/category/[category]` — must match the category name for SEO. */
  heroTitle: string;
  /** Optional accent line under the category H1. */
  heroHighlight?: string;
  heroDescription: string;
  /** Optional trust line under the description (defaults to a generic category line). */
  heroFeature?: string;
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
    title: "Christmas Packaging",
    category: "christmas-packaging",
    image: "/assets/images/categories/christmas/christmas_gift_bag.png",
    color: "#b23a3a",
    heroTitle: "Custom Christmas Packaging",
    heroHighlight: "Gift Bags, Boxes & Wrap",
    heroDescription:
      "Christmas gift bags, wrapping paper, sweet and bakery boxes, chocolate cartons, tags, and seals for holiday retail, hampers, and corporate gifting.",
    heroFeature:
      "Colour-matched Christmas sets — book 8–12 weeks before your ship-by date so proofs and foil land before peak season.",
    heroCtaText: "Get Christmas Packaging Quote",
    heroSlides: [
      {
        title: "Custom Christmas Packaging",
        description:
          "Christmas gift bags, wrapping paper, and festive cartons with foil, kraft, and full-colour print for retail and corporate gifting.",
        ctaText: "Get Christmas Packaging Quote",
      },
      {
        title: "One Christmas Line",
        description:
          "Sweet boxes, bakery packs, chocolate cartons, tags, and seals colour-matched so the whole holiday line ships together.",
        ctaText: "Explore Christmas Packaging",
      },
    ],
  },
  {
    title: "Art Card Boxes",
    category: "art_card_boxes",
    image: "/assets/images/categories/art_card.jpeg",
    color: "#9b8ec4",
    heroTitle: "Custom Art Card Boxes",
    heroDescription:
      "Custom art card boxes with vibrant print reproduction, smooth finishing options, and refined construction for premium product categories.",
    heroCtaText: "Get Art Card Quote",
    heroSlides: [
      {
        title: "Custom Art Card Boxes",
        description:
          "Deliver vibrant graphics and premium print quality with art-card boxes tailored for high-impact product displays.",
        ctaText: "Get Art Card Quote",
      },
      {
        title: "Premium Coated Art Card Boxes",
        description:
          "Choose coated art-card stocks for sharper visuals, cleaner details, and elegant finishing that supports premium positioning.",
        ctaText: "Explore Art Card Finish",
      },
    ],
  },
  {
    title: "Corrugated Boxes",
    category: "corrugated_boxes",
    image: "/assets/images/categories/coregerated_box.jpeg",
    color: "#8b6f47",
    heroTitle: "Custom Corrugated Boxes",
    heroDescription:
      "Custom corrugated boxes designed for strong protection in transit, efficient stacking, and polished branding for e-commerce and retail shipments.",
    heroCtaText: "Get Corrugated Quote",
    heroSlides: [
      {
        title: "Custom Corrugated Boxes",
        description:
          "Built for protection and logistics efficiency, our corrugated boxes keep products secure from warehouse to doorstep.",
        ctaText: "Get Corrugated Quote",
      },
      {
        title: "Ecommerce Shipping Corrugated Boxes",
        description:
          "Optimize shipping costs and brand visibility with durable corrugated mailers engineered for modern e-commerce operations.",
        ctaText: "Design Shipping Box",
      },
    ],
  },
  {
    title: "Custom Pouches",
    category: "custom_pouches",
    image: "/assets/images/categories/pouch.jpeg",
    color: "#5a7a5a",
    heroTitle: "Custom Pouches",
    heroDescription:
      "Custom pouches with flexible barrier options, eye-catching print quality, and practical convenience features for modern product packaging.",
    heroCtaText: "Get Pouch Quote",
    heroSlides: [
      {
        title: "Custom Pouches",
        description:
          "High-impact pouch packaging with excellent print quality and practical resealable options to enhance customer convenience.",
        ctaText: "Get Pouch Quote",
      },
      {
        title: "Stand-Up & Flat Pouches",
        description:
          "Select stand-up, flat, or zipper pouch formats designed for shelf visibility, freshness retention, and smooth product handling.",
        ctaText: "Explore Pouch Types",
      },
    ],
  },
  {
    title: "Carry Bags",
    category: "carry_bags",
    image: "/assets/images/categories/categories_layout/shopping_bags/shopping_bags (1).png",
    color: "#a0522d",
    heroTitle: "Custom Carry Bags",
    heroDescription:
      "Custom carry bags for retail checkout and gifting — paper shopping bags, kraft carry bags, and luxury bags with rope, ribbon, and die-cut handles.",
    heroCtaText: "Get Carry Bag Quote",
    heroSlides: [
      {
        title: "Custom Carry Bags",
        description:
          "Branded paper shopping bags and retail carry bags with custom print, reinforced handles, and structures matched to your product load.",
        ctaText: "Get Carry Bag Quote",
      },
      {
        title: "Luxury & Kraft Carry Bags",
        description:
          "Choose kraft, laminated, rope-handle, and ribbon-handle carry bags for boutiques, cosmetics, apparel, and event gifting.",
        ctaText: "Explore Carry Bag Types",
      },
    ],
  },
  {
    title: "Kraft Boxes",
    category: "kraft_boxes",
    image: "/assets/images/categories/craft_box.jpeg",
    color: "#d4a0a0",
    heroTitle: "Custom Kraft Boxes",
    heroDescription:
      "Custom kraft boxes with natural texture, strong construction, and clean printing options for sustainable brand positioning.",
    heroCtaText: "Get Kraft Box Quote",
    heroSlides: [
      {
        title: "Custom Kraft Boxes",
        description:
          "Sustainable kraft boxes with natural texture and strong build quality for environmentally conscious brands.",
        ctaText: "Get Kraft Box Quote",
      },
      {
        title: "Recyclable Kraft Box Branding",
        description:
          "Pair recyclable kraft stock with clean custom printing to keep your packaging eco-focused without sacrificing visual impact.",
        ctaText: "Customize Kraft Branding",
      },
    ],
  },
  {
    title: "Labels & Tags",
    category: "labels_and_tags",
    image: "/assets/images/categories/tags.jpeg",
    color: "#c87941",
    heroTitle: "Custom Labels & Tags",
    heroDescription:
      "Custom labels and tags crafted for brand clarity, product storytelling, and standout visibility across retail shelves and shipping touchpoints.",
    heroCtaText: "Get Labels Quote",
    heroSlides: [
      {
        title: "Custom Labels & Tags",
        description:
          "Design labels and hang tags that strengthen brand identity, improve product clarity, and attract attention on crowded shelves.",
        ctaText: "Get Labels Quote",
      },
      {
        title: "Retail & Shipping Labels",
        description:
          "From product tags to shipping labels, create a consistent visual language across every customer touchpoint.",
        ctaText: "Build Label System",
      },
    ],
  },
  {
    title: "Rigid Boxes",
    category: "rigid_boxes",
    image: "/assets/images/categories/rigid_box.jpeg",
    color: "#c4a265",
    heroTitle: "Custom Rigid Boxes",
    heroDescription:
      "Custom rigid boxes that give your products a premium shelf presence with precise structure, elegant finishing, and consistent brand impact.",
    heroCtaText: "Get Rigid Box Quote",
    heroSlides: [
      {
        title: "Custom Rigid Boxes",
        description:
          "Elevate high-value products with premium rigid box structures, luxury finishes, and stronger shelf appeal for retail success.",
        ctaText: "Get Rigid Box Quote",
      },
      {
        title: "Magnetic & Setup Rigid Boxes",
        description:
          "Choose from magnetic closure, lift-off lid, and custom setup rigid styles tailored to your brand presentation and unboxing feel.",
        ctaText: "Customize Rigid Style",
      },
    ],
  },
];
