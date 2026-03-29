import type { ProductData } from "@/components/product/ProductInfo";

const CARRY_BAG_IMAGES = [
  "/assets/images/categories/gift_box.jpeg",
  "/products/gift.png",
  "/products/rigid.png",
];

const CARRY_BAG_QUANTITIES: ProductData["quantities"] = [
  { qty: 100, pricePerPiece: 1.2, total: 120.0 },
  { qty: 250, pricePerPiece: 0.95, total: 237.5 },
  { qty: 500, pricePerPiece: 0.78, total: 390.0 },
  { qty: 1000, pricePerPiece: 0.62, total: 620.0 },
  { qty: 2500, pricePerPiece: 0.52, total: 1300.0 },
];

const CARRY_BAG_SIZES: ProductData["sizes"] = [
  { label: "XS", dimensions: "From 150 × 100 × 80 mm" },
  { label: "S", dimensions: "From 220 × 120 × 100 mm" },
  { label: "M", dimensions: "From 320 × 150 × 120 mm" },
  { label: "L", dimensions: "From 400 × 180 × 140 mm" },
];

const CARRY_BAG_DEALS: ProductData["deals"] = [
  {
    title: "Carry bag line — handle pull test",
    description:
      "We validate handle attachment, board weight, and burst for your load class — fewer breakages at checkout and curbside.",
    code: "BAGTEST",
  },
  {
    title: "Premium ribbon & rope sample kit",
    description:
      "Match handle colour, fibre, and knot style to your brand before mass production.",
    code: "BAGHANDLE",
  },
];

type CarryBagSpec = Pick<ProductData, "slug" | "title" | "description" | "features" | "details">;

function carryBagProduct(spec: CarryBagSpec): ProductData {
  return {
    ...spec,
    badges: ["CARRY BAGS", "RETAIL READY", "BRANDS FACE STUDIO"],
    deals: CARRY_BAG_DEALS,
    quantities: CARRY_BAG_QUANTITIES,
    sizes: CARRY_BAG_SIZES,
    deliveryEstimate: "10–20 business days",
    images: CARRY_BAG_IMAGES,
  };
}

const CARRY_BAG_SPECS: CarryBagSpec[] = [
  /* ── Core formats ── */
  {
    slug: "carry-bag-paper",
    title: "Paper Carry Bags",
    description:
      "Coated or uncoated paper bags — retail-ready structure, print-friendly faces, and scalable MOQs for boutiques and chains.",
    features: [
      { label: "Stock", value: "SBS / art paper 180–250 gsm typical" },
      { label: "Handles", value: "Twisted, flat, die-cut — configurable" },
      { label: "Print", value: "Offset / flexo by run size" },
      { label: "Use", value: "Boutique, retail, gifting" },
      { label: "Min. order", value: "100 pieces" },
      { label: "Lead time", value: "10–20 business days" },
    ],
    details:
      "Paper carry bags are the baseline of branded retail. We specify board weight for your average basket load.\n\nHandles and gussets are matched to product weight and hand comfort.\n\nIdeal for apparel, cosmetics, and general retail.",
  },
  {
    slug: "carry-bag-kraft",
    title: "Kraft Carry Bags",
    description:
      "Natural kraft exteriors — recyclable story, earthy texture, and bold contrast with black or white ink.",
    features: [
      { label: "Stock", value: "Kraft paper 120–200 gsm" },
      { label: "Finish", value: "Raw or light aqueous coating" },
      { label: "Print", value: "Flexo 1–3 colour or litho label" },
      { label: "Story", value: "Recyclable, widely accepted" },
      { label: "Min. order", value: "250 pieces" },
      { label: "Lead time", value: "10–20 business days" },
    ],
    details:
      "Kraft carry bags read conscious and modern. We align fibre direction and handle reinforcement for load.\n\nPopular with wellness, food, and eco-forward brands.\n\nDiscuss moisture if used near chilled goods.",
  },
  {
    slug: "carry-bag-luxury",
    title: "Luxury Carry Bags",
    description:
      "Thicker boards, soft-touch lamination, foil, and ribbon — department-store presence in hand.",
    features: [
      { label: "Stock", value: "Heavy board + lamination" },
      { label: "Finish", value: "Soft-touch, matte, gloss, foil" },
      { label: "Handles", value: "Ribbon, rope, or premium cord" },
      { label: "Details", value: "Emboss, spot UV, magnetic fold" },
      { label: "Min. order", value: "100 pieces" },
      { label: "Lead time", value: "14–24 business days" },
    ],
    details:
      "Luxury carry bags are packaging as accessory. We engineer corners and gussets for weight and ceremony.\n\nSampling is essential for hand-feel and colour.\n\nBuilt for fragrance, jewelry, and premium gifting.",
  },
  {
    slug: "carry-bag-rope-handle",
    title: "Rope Handle Carry Bags",
    description:
      "Cotton or poly rope through metal eyelets — high comfort, strong pull, and elevated retail look.",
    features: [
      { label: "Handle", value: "Cotton / poly rope — colour matched" },
      { label: "Hardware", value: "Eyelets — reinforcement patches" },
      { label: "Load", value: "Pull-tested per size" },
      { label: "Print", value: "Full surface branding" },
      { label: "Min. order", value: "100 pieces" },
      { label: "Lead time", value: "12–22 business days" },
    ],
    details:
      "Rope handles distribute load comfortably. We test pull-out and fatigue for your SKU weight.\n\nPopular for apparel, cosmetics, and gift retail.\n\nEyelet placement tuned to hand ergonomics.",
  },
  {
    slug: "carry-bag-ribbon-handle",
    title: "Ribbon Handle Carry Bags",
    description:
      "Satin or grosgrain ribbon — giftable, photogenic, and ideal for boutique and seasonal campaigns.",
    features: [
      { label: "Ribbon", value: "Satin, grosgrain, cotton — Pantone match" },
      { label: "Anchor", value: "Reinforced fold or rivet" },
      { label: "Finish", value: "Knots or concealed anchor" },
      { label: "Print", value: "Foil-friendly on board" },
      { label: "Min. order", value: "100 pieces" },
      { label: "Lead time", value: "12–22 business days" },
    ],
    details:
      "Ribbon handles add ceremony. We specify ribbon width and anchor strength for your basket weight.\n\nHoliday and bridal adjacency.\n\nPair with tissue and branded stickers for full gift.",
  },
  {
    slug: "carry-bag-die-cut-handle",
    title: "Die-Cut Handle Carry Bags",
    description:
      "Integrated handle cut from the bag body — no separate hardware, efficient cost, and clean silhouette.",
    features: [
      { label: "Handle", value: "Die-cut oval — reinforced patch" },
      { label: "Economy", value: "Lower hardware cost" },
      { label: "Print", value: "Large face billboards" },
      { label: "Use", value: "Light to medium retail loads" },
      { label: "Min. order", value: "250 pieces" },
      { label: "Lead time", value: "10–18 business days" },
    ],
    details:
      "Die-cut handles are efficient and modern. We reinforce patch geometry to prevent tear-out.\n\nBest for lighter baskets and event giveaways.\n\nDiscuss load limits honestly.",
  },
  {
    slug: "carry-bag-twisted-handle",
    title: "Twisted Handle Carry Bags",
    description:
      "Classic twisted paper cord — familiar retail feel, strong for everyday basket weights.",
    features: [
      { label: "Handle", value: "Twisted paper cord — colour options" },
      { label: "Interior", value: "Reinforced anchor points" },
      { label: "Retail", value: "High-street standard" },
      { label: "Print", value: "Flexo 1–4 colour" },
      { label: "Min. order", value: "250 pieces" },
      { label: "Lead time", value: "10–18 business days" },
    ],
    details:
      "Twisted handles are the default for volume retail. We tune cord gauge to bag size.\n\nCost-effective premium vs die-cut for heavier loads.\n\nFood-safe paths where needed.",
  },
  {
    slug: "carry-bag-flat-handle",
    title: "Flat Handle Carry Bags",
    description:
      "Flat paper straps — minimal profile, strong fold reinforcement, and clean modern lines.",
    features: [
      { label: "Handle", value: "Flat paper strap — internal fold" },
      { label: "Look", value: "Architectural minimal" },
      { label: "Print", value: "Continuous art across gusset" },
      { label: "Load", value: "Medium basket — tested" },
      { label: "Min. order", value: "250 pieces" },
      { label: "Lead time", value: "10–18 business days" },
    ],
    details:
      "Flat handles suit modern retail aesthetics. We reinforce fold paths for repeat handling.\n\nPopular with fashion and lifestyle brands.\n\nPair with matte laminate for premium quiet.",
  },
  {
    slug: "carry-bag-laminated",
    title: "Laminated Carry Bags",
    description:
      "Film-laminated exteriors — scuff resistance, water tolerance, and saturated colour for high-traffic retail.",
    features: [
      { label: "Laminate", value: "Soft-touch / gloss / matte film" },
      { label: "Durability", value: "Scuff and moisture improved" },
      { label: "Print", value: "Full photographic coverage" },
      { label: "Retail", value: "High-touch counters" },
      { label: "Min. order", value: "100 pieces" },
      { label: "Lead time", value: "12–22 business days" },
    ],
    details:
      "Laminated bags survive busy retail. We manage fold cracking on scores.\n\nIdeal for beauty and premium gifting.\n\nEnd-of-life messaging varies by region — we advise.",
  },
  {
    slug: "carry-bag-foldable",
    title: "Foldable Carry Bags",
    description:
      "Collapsible or fold-flat structures — storage efficiency for brands with limited back-of-house space.",
    features: [
      { label: "Structure", value: "Fold lines, magnetic fold optional" },
      { label: "Storage", value: "Ships flat" },
      { label: "Retail", value: "Quick erect at counter" },
      { label: "Print", value: "Panel art across folds" },
      { label: "Min. order", value: "100 pieces" },
      { label: "Lead time", value: "14–24 business days" },
    ],
    details:
      "Foldable bags reduce storage cube. We prototype fold sequence for operator speed.\n\nLuxury and gift sectors.\n\nPair with rigid inserts for structured presentation.",
  },

  /* ── Use-case based ── */
  {
    slug: "carry-bag-retail",
    title: "Retail Carry Bags",
    description:
      "High-frequency retail — scuff-smart finishes, brand blocks, and handle strength for daily basket weights.",
    features: [
      { label: "Durability", value: "Handle pull + burst" },
      { label: "Print", value: "Logo systems and campaigns" },
      { label: "Sizes", value: "S–L — planogram friendly" },
      { label: "Retail", value: "Counter and checkout" },
      { label: "Min. order", value: "250 pieces" },
      { label: "Lead time", value: "10–18 business days" },
    ],
    details:
      "Retail carry bags see abuse. We specify laminate and board for your traffic.\n\nMulti-store rollouts with consistent colour.\n\nBrands Face programs for chain retail.",
  },
  {
    slug: "carry-bag-boutique",
    title: "Boutique Carry Bags",
    description:
      "Small runs, elevated finishes, and editorial art — intimate retail and flagship tone.",
    features: [
      { label: "MOQ", value: "Flexible tiers" },
      { label: "Finish", value: "Soft-touch, foil, emboss" },
      { label: "Handles", value: "Ribbon, rope, custom" },
      { label: "Story", value: "Limited-edition friendly" },
      { label: "Min. order", value: "100 pieces" },
      { label: "Lead time", value: "12–22 business days" },
    ],
    details:
      "Boutique bags prioritise emotion over volume. We sample finishes and ribbon.\n\nIdeal for independent retailers and designer drops.\n\nPair with tissue and branded seals.",
  },
  {
    slug: "carry-bag-cosmetics",
    title: "Cosmetics Carry Bags",
    description:
      "Fingerprint-smart finishes, compact footprints, and premium handles for beauty retail.",
    features: [
      { label: "Surface", value: "Matte / soft-touch" },
      { label: "Size", value: "Compact for small baskets" },
      { label: "Print", value: "Campaign and shade stories" },
      { label: "Handles", value: "Ribbon, rope" },
      { label: "Min. order", value: "100 pieces" },
      { label: "Lead time", value: "10–20 business days" },
    ],
    details:
      "Cosmetics bags must feel clean in hand. We select coatings for fingerprint resistance.\n\nCounter and mall traffic.\n\nHoliday coffret and GWP adjacency.",
  },
  {
    slug: "carry-bag-skincare",
    title: "Skincare Carry Bags",
    description:
      "Calm aesthetics, natural kraft or soft white, and room for refill and multi-SKU baskets.",
    features: [
      { label: "Tone", value: "Clinical to organic" },
      { label: "Stock", value: "Kraft or coated SBS" },
      { label: "Print", value: "Ingredient and regimen story" },
      { label: "Load", value: "Sized for glass bottles" },
      { label: "Min. order", value: "100 pieces" },
      { label: "Lead time", value: "10–20 business days" },
    ],
    details:
      "Skincare retail bags need calm confidence. We plan panel hierarchy for compliance and brand.\n\nSpa and DTC retail.\n\nRefill program messaging optional.",
  },
  {
    slug: "carry-bag-perfume",
    title: "Perfume Carry Bags",
    description:
      "Thick board, ribbon or rope, and foil strategies — gift corridor presence for fragrance.",
    features: [
      { label: "Structure", value: "Heavy board + reinforcement" },
      { label: "Finish", value: "Foil, emboss, soft-touch" },
      { label: "Handles", value: "Ribbon, rope" },
      { label: "Retail", value: "Department store tone" },
      { label: "Min. order", value: "100 pieces" },
      { label: "Lead time", value: "14–24 business days" },
    ],
    details:
      "Perfume bags must feel precious. We engineer for bottle weight and glass protection.\n\nLimited editions and seasonal coffrets.\n\nBrands Face studio for campaign art.",
  },
  {
    slug: "carry-bag-gift",
    title: "Gift Carry Bags",
    description:
      "Occasion-ready art, ribbon handles, and seasonal sleeves — gifting without wrapping labour.",
    features: [
      { label: "Seasonal", value: "Campaign rotations" },
      { label: "Handles", value: "Ribbon, rope, tag" },
      { label: "Finish", value: "Foil, spot UV" },
      { label: "Sizes", value: "Gift sets to large format" },
      { label: "Min. order", value: "100 pieces" },
      { label: "Lead time", value: "12–22 business days" },
    ],
    details:
      "Gift bags are emotion at purchase. We balance cost with perceived value.\n\nQ4 and corporate gifting.\n\nPair with tissue and branded stickers.",
  },
  {
    slug: "carry-bag-apparel",
    title: "Apparel Carry Bags",
    description:
      "Wide gussets, strong handles, and long formats — sized for folded garments and hangers.",
    features: [
      { label: "Format", value: "Wide gusset" },
      { label: "Handles", value: "Rope, twisted — high pull" },
      { label: "Print", value: "Fashion imagery" },
      { label: "Retail", value: "Flagship and outlet" },
      { label: "Min. order", value: "100 pieces" },
      { label: "Lead time", value: "10–20 business days" },
    ],
    details:
      "Apparel bags need generous volume and honest load. We test pull for denim and outerwear mass.\n\nFashion and lifestyle retail.\n\nMatte laminate for luxury quiet.",
  },
  {
    slug: "carry-bag-jewelry",
    title: "Jewelry Carry Bags",
    description:
      "Compact footprints, small-batch luxury, and soft interiors — velvet-lined optional.",
    features: [
      { label: "Size", value: "Compact — small basket" },
      { label: "Finish", value: "Foil, emboss, soft-touch" },
      { label: "Handles", value: "Ribbon, cord" },
      { label: "Interior", value: "Tissue, optional pad" },
      { label: "Min. order", value: "100 pieces" },
      { label: "Lead time", value: "12–22 business days" },
    ],
    details:
      "Jewelry bags are compact ceremony. We reinforce small bags for surprising weight.\n\nFine and demi-fine retail.\n\nAnti-scuff finishes for handling.",
  },
  {
    slug: "carry-bag-event",
    title: "Event Carry Bags",
    description:
      "Conference and launch — fast turns, bold print, and cost-effective structures for giveaways.",
    features: [
      { label: "Speed", value: "Expedited lanes" },
      { label: "Print", value: "Bold spot colour" },
      { label: "Formats", value: "Die-cut, twisted handle" },
      { label: "MOQ", value: "Flexible" },
      { label: "Min. order", value: "250 pieces" },
      { label: "Lead time", value: "8–16 business days" },
    ],
    details:
      "Event bags prioritise visibility and speed. We simplify structures for reliable delivery.\n\nSponsor swag and trade shows.\n\nDiscuss storage and humidity for fills.",
  },
  {
    slug: "carry-bag-promotional",
    title: "Promotional Carry Bags",
    description:
      "Campaign and giveaway — economical boards, high-volume print, and logo-forward art.",
    features: [
      { label: "Economy", value: "Value structures" },
      { label: "Print", value: "1–2 colour flexo" },
      { label: "Volume", value: "High MOQ friendly" },
      { label: "Use", value: "Retail promo, launch" },
      { label: "Min. order", value: "500 pieces" },
      { label: "Lead time", value: "8–16 business days" },
    ],
    details:
      "Promotional bags maximise logo impact per dollar. We optimise for fill and ship.\n\nMass retail and franchise.\n\nKraft or white board paths.",
  },

  /* ── Premium / variation ── */
  {
    slug: "carry-bag-custom-printed",
    title: "Custom Printed Carry Bags",
    description:
      "Full colour offset — brand governance, photography, and panel sequencing for flagship retail.",
    features: [
      { label: "Print", value: "Offset / digital hybrid" },
      { label: "Colour", value: "Pantone + CMYK" },
      { label: "Proofing", value: "Contract proofs" },
      { label: "Coverage", value: "All panels + gusset" },
      { label: "Min. order", value: "100 pieces" },
      { label: "Lead time", value: "12–22 business days" },
    ],
    details:
      "Custom printed bags are walking billboards. We manage registration across folds and gussets.\n\nInterior print for surprise unboxing.\n\nCore to Brands Face retail programs.",
  },
  {
    slug: "carry-bag-foiled",
    title: "Foiled Carry Bags",
    description:
      "Hot foil on board — metallic logos and borders that read luxury under store lighting.",
    features: [
      { label: "Foil", value: "Gold, silver, matte metallic" },
      { label: "Register", value: "Fine type on board" },
      { label: "Pairing", value: "Soft-touch laminate" },
      { label: "Art", value: "Vector foil masks" },
      { label: "Min. order", value: "100 pieces" },
      { label: "Lead time", value: "14–24 business days" },
    ],
    details:
      "Foiling elevates paper bags without noisy graphics. We test adhesion on your laminate stack.\n\nFragrance and gifting adjacency.\n\nQuiet luxury with a metallic flash.",
  },
  {
    slug: "carry-bag-embossed",
    title: "Embossed Carry Bags",
    description:
      "Blind or registered emboss — tactile logos and patterns on coated or uncoated stock.",
    features: [
      { label: "Tooling", value: "Brass / magnesium dies" },
      { label: "Effects", value: "Blind, registered, foil + emboss" },
      { label: "Stock", value: "Caliper limits reviewed" },
      { label: "Art", value: "Minimum line weights" },
      { label: "Min. order", value: "100 pieces" },
      { label: "Lead time", value: "16–26 business days" },
    ],
    details:
      "Emboss adds tactile memory. We review art for crush on folds.\n\nCombine with soft-touch for maximum hand feel.\n\nExcellent for monograms and crests.",
  },
  {
    slug: "carry-bag-matte-finish",
    title: "Matte Finish Carry Bags",
    description:
      "Soft-touch and satin matte laminates — fingerprint-friendly luxury with deep colour fields.",
    features: [
      { label: "Finish", value: "Soft-touch / matte aqueous" },
      { label: "Feel", value: "Velvety hand" },
      { label: "Retail", value: "Reduced glare" },
      { label: "Print", value: "Pairs with foil" },
      { label: "Min. order", value: "100 pieces" },
      { label: "Lead time", value: "10–20 business days" },
    ],
    details:
      "Matte finishes dominate premium retail bags. We specify coat weight for fold.\n\nBeauty and lifestyle favourite.\n\nSampling recommended.",
  },
  {
    slug: "carry-bag-gloss-finish",
    title: "Gloss Finish Carry Bags",
    description:
      "High-gloss laminate — saturated colour and shelf pop for mass and youth-forward brands.",
    features: [
      { label: "Finish", value: "Gloss film / gloss laminate" },
      { label: "Colour", value: "Maximum chroma" },
      { label: "Retail", value: "High visibility" },
      { label: "Print", value: "Photography friendly" },
      { label: "Min. order", value: "100 pieces" },
      { label: "Lead time", value: "10–20 business days" },
    ],
    details:
      "Gloss bags read energetic. We manage scuff with varnish.\n\nMass retail and promotional.\n\nPair with spot matte for logo lockups.",
  },
  {
    slug: "carry-bag-eco-friendly",
    title: "Eco-Friendly Carry Bags",
    description:
      "FSC papers, water-based inks, and reduced plastic handles — credible sustainability messaging.",
    features: [
      { label: "Paper", value: "FSC-certified options" },
      { label: "Ink", value: "Vegetable / low-VOC" },
      { label: "Handles", value: "Paper, cotton, jute" },
      { label: "Claims", value: "Messaging support" },
      { label: "Min. order", value: "250 pieces" },
      { label: "Lead time", value: "10–20 business days" },
    ],
    details:
      "Eco-friendly bags require honest material choices. We document chain of custody where available.\n\nRight-size to reduce waste.\n\nBrands Face alignment for values-led retail.",
  },
  {
    slug: "carry-bag-recycled-paper",
    title: "Recycled Paper Carry Bags",
    description:
      "High post-consumer content — shade variance expectations set and print strategies tuned.",
    features: [
      { label: "Content", value: "PCW / PCC tiers" },
      { label: "Colour", value: "Natural shade variance" },
      { label: "Print", value: "Ink density adjusted" },
      { label: "End-of-life", value: "Recyclability guidance" },
      { label: "Min. order", value: "250 pieces" },
      { label: "Lead time", value: "10–20 business days" },
    ],
    details:
      "Recycled paper bags vary in shade — we set expectations in proofs.\n\nIdeal for brands with circular stories.\n\nDiscuss handle materials for full recyclability.",
  },
  {
    slug: "carry-bag-premium-shopping",
    title: "Premium Shopping Bags",
    description:
      "Flagship-grade — thick board, luxury handles, interior print, and details that match department-store expectation.",
    features: [
      { label: "Structure", value: "Heavy board + reinforcement" },
      { label: "Finish", value: "Soft-touch, foil, emboss" },
      { label: "Interior", value: "Printed interior optional" },
      { label: "Handles", value: "Ribbon, rope, custom" },
      { label: "Min. order", value: "100 pieces" },
      { label: "Lead time", value: "16–28 business days" },
    ],
    details:
      "Premium shopping bags are the top of the category. We prototype every finish and handle.\n\nBuilt for flagship, luxury gifting, and hero campaigns.\n\nA Brands Face signature when retail must feel unforgettable.",
  },
];

export const CARRY_BAG_PRODUCTS: Record<string, ProductData> = Object.fromEntries(
  CARRY_BAG_SPECS.map((spec) => [spec.slug, carryBagProduct(spec)]),
) as Record<string, ProductData>;
