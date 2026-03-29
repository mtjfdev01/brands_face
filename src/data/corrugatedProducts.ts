import type { ProductData } from "@/components/product/ProductInfo";

const CORR_IMAGES = [
  "/assets/images/categories/coregerated_box.jpeg",
  "/products/mailer-1.jpg",
  "/products/mailer-2.jpg",
];

const CORR_QUANTITIES: ProductData["quantities"] = [
  { qty: 100, pricePerPiece: 0.38, total: 38.0 },
  { qty: 250, pricePerPiece: 0.3, total: 75.0 },
  { qty: 500, pricePerPiece: 0.24, total: 120.0 },
  { qty: 1000, pricePerPiece: 0.19, total: 190.0 },
  { qty: 2500, pricePerPiece: 0.16, total: 400.0 },
];

const CORR_SIZES: ProductData["sizes"] = [
  { label: "S", dimensions: "From 15 × 10 × 8 cm" },
  { label: "M", dimensions: "From 25 × 20 × 15 cm" },
  { label: "L", dimensions: "From 40 × 30 × 20 cm" },
  { label: "Custom", dimensions: "RSC / die-cut to spec" },
];

const CORR_DEALS: ProductData["deals"] = [
  {
    title: "Corrugated line — stack & burst check",
    description:
      "We review flute, board weight, and stack height for your fulfilment path — fewer crushed corners in DC and last mile.",
    code: "CORRSTACK",
  },
  {
    title: "Inside print mock on mailer formats",
    description:
      "See your interior unboxing art on a physical mock before the full run — especially for e-commerce mailers.",
    code: "CORRMOCK",
  },
];

type CorrSpec = Pick<ProductData, "slug" | "title" | "description" | "features" | "details">;

function corrugatedProduct(spec: CorrSpec): ProductData {
  return {
    ...spec,
    badges: ["CORRUGATED", "SHIP-READY", "BRANDS FACE STUDIO"],
    deals: CORR_DEALS,
    quantities: CORR_QUANTITIES,
    sizes: CORR_SIZES,
    deliveryEstimate: "8–18 business days",
    images: CORR_IMAGES,
  };
}

const CORR_SPECS: CorrSpec[] = [
  /* ── Core structures ── */
  {
    slug: "corrugated-regular-slotted",
    title: "Regular Slotted Corrugated Box",
    description:
      "Classic RSC — efficient material use, fast tape closure, and the workhorse of warehousing, palletisation, and bulk shipping.",
    features: [
      { label: "Style", value: "Regular slotted container (RSC)" },
      { label: "Flute", value: "B, C, E — matched to weight & stack" },
      { label: "Print", value: "Flexo 1–3 colour or litho laminate" },
      { label: "Closure", value: "Tape, staples, or glue" },
      { label: "Min. order", value: "100 pieces" },
      { label: "Lead time", value: "8–18 business days" },
    ],
    details:
      "RSC boxes dominate logistics for a reason: predictable geometry, strong corners when taped correctly, and tooling-friendly production.\n\nWe specify board combinations for your product mass, pallet pattern, and DC handling.\n\nIdeal for inner packs, replenishment, and outer shippers when print is secondary to protection.",
  },
  {
    slug: "corrugated-die-cut",
    title: "Die-Cut Corrugated Box",
    description:
      "Custom outlines and self-locking features — tailored openings, handles, and retail-facing shapes without a standard RSC footprint.",
    features: [
      { label: "Tooling", value: "Steel rule die — one-time cost amortised" },
      { label: "Lock", value: "Self-lock bases, tuck flaps, retail windows" },
      { label: "Print", value: "Flexo or litho label / laminate" },
      { label: "MOQ", value: "Higher than RSC — we advise break-even" },
      { label: "Min. order", value: "250 pieces" },
      { label: "Lead time", value: "10–20 business days" },
    ],
    details:
      "Die-cut corrugated unlocks brand shape — curves, thumb notches, and integrated handles.\n\nWe prototype fold sequence and burst strength before cutting steel.\n\nStrong for retail-ready shippers and category-disrupting silhouettes.",
  },
  {
    slug: "corrugated-mailer",
    title: "Mailer Corrugated Box",
    description:
      "E-flute and B-flute mailers with roll-end locks — DTC-first protection with billboard exteriors and optional inside print.",
    features: [
      { label: "Format", value: "Roll-end tuck, lock-front, or literature mailer" },
      { label: "Flute", value: "E-flute common for parcel stiffness" },
      { label: "Print", value: "Exterior / interior flexo or litho" },
      { label: "Unboxing", value: "Tear strip, reclose options" },
      { label: "Min. order", value: "100 pieces" },
      { label: "Lead time", value: "8–18 business days" },
    ],
    details:
      "Corrugated mailers bridge protection and brand. We tune board for cube efficiency vs crush in small parcel networks.\n\nInside print turns the arrival moment into a channel — perfect for Brands Face DTC programs.\n\nDistinct from folding-carton mailers when you need flute cushioning.",
  },
  {
    slug: "corrugated-roll-end-tuck-top",
    title: "Roll End Tuck Top Corrugated Box",
    description:
      "RETT style with rolled end panels — clean hand closure, retail-friendly opening, and strong corners for medium weight.",
    features: [
      { label: "Style", value: "Roll end tuck top (RETT)" },
      { label: "Closure", value: "Tuck friction + optional friction lock" },
      { label: "Retail", value: "Shelf-ready with panel branding" },
      { label: "Flute", value: "B / E per product weight" },
      { label: "Min. order", value: "100 pieces" },
      { label: "Lead time", value: "8–18 business days" },
    ],
    details:
      "RETT cartons feel more finished than basic RSC for retail-facing SKUs. We align tuck tension for repeated opens in store.\n\nUse for giftable categories and club retail where presentation matters.\n\nPair with inserts for mixed sets.",
  },
  {
    slug: "corrugated-full-overlap",
    title: "Full Overlap Corrugated Box",
    description:
      "FOL — outer flaps fully overlap for extra top/bottom crush resistance and heavy or sharp contents.",
    features: [
      { label: "Style", value: "Full overlap slotted (FOL)" },
      { label: "Strength", value: "High edge crush — heavy or dense goods" },
      { label: "Closure", value: "Tape pattern optimised for FOL" },
      { label: "Print", value: "Large panel billboards" },
      { label: "Min. order", value: "100 pieces" },
      { label: "Lead time", value: "8–18 business days" },
    ],
    details:
      "FOL is chosen when weight and handling abuse dominate. We specify board and tape strategy for your stack height.\n\nCommon in industrial adjacency, dense beverage, and hardware.\n\nDiscuss palletisation early — footprint drives cost.",
  },
  {
    slug: "corrugated-one-piece-folder",
    title: "One Piece Folder Corrugated Box",
    description:
      "OPF — flat sheet scored to wrap flat goods: frames, books, prints, and thin products with minimal void.",
    features: [
      { label: "Style", value: "One-piece folder (OPF)" },
      { label: "Contents", value: "Flat or shallow products" },
      { label: "Depth", value: "Multi-depth scores optional" },
      { label: "Print", value: "Large flat panels" },
      { label: "Min. order", value: "100 pieces" },
      { label: "Lead time", value: "8–18 business days" },
    ],
    details:
      "OPF reduces void fill for flat SKUs. We tune scores for clean fold without cracking liner.\n\nIdeal for art, books, and flat electronics.\n\nCombine with corner protectors for high-value goods.",
  },
  {
    slug: "corrugated-tray",
    title: "Corrugated Tray Box",
    description:
      "Open trays for display, pick lines, and inner containment — stackable and often paired with lids or shrink.",
    features: [
      { label: "Format", value: "Tray — glued corners or lock corners" },
      { label: "Use", value: "Retail display, inner tray, freezer formats" },
      { label: "Stack", value: "Compression tuned to load" },
      { label: "Print", value: "High-visibility sides" },
      { label: "Min. order", value: "250 pieces" },
      { label: "Lead time", value: "8–18 business days" },
    ],
    details:
      "Trays organise shelves and fulfilment. We design hand holes and stack interlock where needed.\n\nFood-safe coatings available for bakery and produce adjacency.\n\nPair with clear lids or top sheets for retail.",
  },
  {
    slug: "corrugated-sleeve",
    title: "Corrugated Sleeve Box",
    description:
      "Sleeves over bundles or trays — campaign graphics without replacing the entire tray system.",
    features: [
      { label: "Format", value: "Sleeve over tray, bundle, or bottle cluster" },
      { label: "Campaigns", value: "Swap sleeves seasonally" },
      { label: "Clearance", value: "Slide resistance & scuff control" },
      { label: "Print", value: "360° flexo or litho wrap" },
      { label: "Min. order", value: "250 pieces" },
      { label: "Lead time", value: "8–18 business days" },
    ],
    details:
      "Corrugated sleeves add billboard space to stable inner trays. We control grain and glue for smooth pull.\n\nStrong for beverage, multipacks, and club retail.\n\nReduce plastic with paperboard sleeves where feasible.",
  },
  {
    slug: "corrugated-partition",
    title: "Corrugated Partition Box",
    description:
      "Partitions and cells — separate bottles, jars, and fragile items inside the outer shipper.",
    features: [
      { label: "Interior", value: "Die-cut partitions — cell counts to spec" },
      { label: "Protection", value: "Anti-clatter and tip resistance" },
      { label: "Flute", value: "Matched to bottle height & weight" },
      { label: "Assembly", value: "Knock-down or pre-glued options" },
      { label: "Min. order", value: "250 pieces" },
      { label: "Lead time", value: "10–20 business days" },
    ],
    details:
      "Partitions turn one shipper into many safe lanes. We CAD around your BOM and drop-test scenarios.\n\nEssential for glass, ceramics, and multi-bottle sets.\n\nDiscuss automation — some partitions are hand-erect friendly only.",
  },
  {
    slug: "corrugated-shipping",
    title: "Corrugated Shipping Box",
    description:
      "Purpose-built outers for parcel networks — optimised L×W×H, crush curves, and tape economics at scale.",
    features: [
      { label: "Optimisation", value: "Cube vs rate shopping guidance" },
      { label: "Test", value: "ISTA procedures available" },
      { label: "Print", value: "Minimal to full brand wrap" },
      { label: "Flute", value: "Single or double wall by lane" },
      { label: "Min. order", value: "100 pieces" },
      { label: "Lead time", value: "8–18 business days" },
    ],
    details:
      "Shipping boxes are logistics first. We align board with carrier limits and your damage rate targets.\n\nBranding can stay efficient with one flexo hit or full litho for hero SKUs.\n\nCore to high-volume Brands Face fulfilment programs.",
  },

  /* ── Use-case based ── */
  {
    slug: "corrugated-ecommerce",
    title: "E-commerce Corrugated Boxes",
    description:
      "DTC-optimised shippers — inside print, easy open, right-size cubes, and damage reduction in small parcel sortation.",
    features: [
      { label: "Parcel", value: "Sized for rate & sortation" },
      { label: "Print", value: "Interior + exterior storytelling" },
      { label: "Open", value: "Tear strip, frustration-free" },
      { label: "Returns", value: "Reclose options optional" },
      { label: "Min. order", value: "100 pieces" },
      { label: "Lead time", value: "8–18 business days" },
    ],
    details:
      "E-commerce corrugated is your physical channel. We prototype around your pick path and insert strategy.\n\nInside print pays for itself in repeat and UGC.\n\nBuilt for velocity brands that care about arrival as much as acquisition.",
  },
  {
    slug: "corrugated-subscription",
    title: "Subscription Corrugated Boxes",
    description:
      "Rhythm-friendly formats — predictable dimensions for pick, branding that rewards loyalty, and inserts for variable SKUs.",
    features: [
      { label: "Cadence", value: "Consistent outer for FC automation" },
      { label: "Variable", value: "Partitions for rotating contents" },
      { label: "Print", value: "Seasonal overprints or sleeves" },
      { label: "Durability", value: "Multi-touch mail journey" },
      { label: "Min. order", value: "250 pieces" },
      { label: "Lead time", value: "10–20 business days" },
    ],
    details:
      "Subscription boxes see repeat stress — we engineer corners and hand holes for monthly handling.\n\nSleeves let you rotate creative without new outers every month.\n\nIdeal for curation brands and replenishment programs.",
  },
  {
    slug: "corrugated-retail",
    title: "Retail Corrugated Boxes",
    description:
      "Shelf-facing graphics, display backs, and PDQ-friendly footprints — retail rigidity without moving to full paperboard folding cartons.",
    features: [
      { label: "Display", value: "Header holes, tear-away fronts" },
      { label: "Print", value: "High-impact flexo or litho laminate" },
      { label: "Retail", value: "Planogram dimensions" },
      { label: "Flute", value: "E/B for shelf presence" },
      { label: "Min. order", value: "250 pieces" },
      { label: "Lead time", value: "10–20 business days" },
    ],
    details:
      "Retail corrugated balances cost with presence. We align facing panels to planogram height and sight lines.\n\nOptional litho labels upgrade photography-heavy art.\n\nStrong for club, grocery, and mass beauty adjacency.",
  },
  {
    slug: "corrugated-gift",
    title: "Gift Corrugated Boxes",
    description:
      "Giftable outers with clean print, optional ribbons or sleeves, and inserts for mixed sets — ship-safe and photogenic.",
    features: [
      { label: "Unboxing", value: "Inside print & reveal sequencing" },
      { label: "Finish", value: "Kraft warmth or bright litho" },
      { label: "Inserts", value: "Partitions and platforms" },
      { label: "Seasonal", value: "Sleeve campaigns" },
      { label: "Min. order", value: "100 pieces" },
      { label: "Lead time", value: "8–18 business days" },
    ],
    details:
      "Gift corrugated must survive shipping and still feel special. We balance crush strength with hand feel.\n\nPair with art card inserts or rigid inners for tiered programs.\n\nQ4 and corporate gifting friendly.",
  },
  {
    slug: "corrugated-cosmetics",
    title: "Cosmetics Corrugated Boxes",
    description:
      "Sets and palettes — partition maps, anti-scuff print, and retail-ready faces for mass and prestige corridors.",
    features: [
      { label: "Interior", value: "Cells for compacts, tubes, minis" },
      { label: "Print", value: "Vivid flexo or litho laminate" },
      { label: "Surface", value: "Scuff-resistant coatings" },
      { label: "Compliance", value: "Panel space for claims" },
      { label: "Min. order", value: "250 pieces" },
      { label: "Lead time", value: "10–20 business days" },
    ],
    details:
      "Cosmetics shippers fight vibration and retail handling. We design inserts around pan geometry and glass.\n\nCampaign sleeves rotate looks on stable outers.\n\nBuilt for colour brands and retail launches.",
  },
  {
    slug: "corrugated-skincare",
    title: "Skincare Corrugated Boxes",
    description:
      "Bottle kits and refill programs — height clearance, insert retention, and education panels on the shipper.",
    features: [
      { label: "Retention", value: "Inserts for pumps and glass" },
      { label: "Print", value: "Routine storytelling inside" },
      { label: "Cold chain", value: "Discuss where relevant" },
      { label: "Flute", value: "Sized to bottle weight" },
      { label: "Min. order", value: "100 pieces" },
      { label: "Lead time", value: "8–18 business days" },
    ],
    details:
      "Skincare corrugated needs honest protection for glass and airless packs. We prototype from your BOM.\n\nInterior print carries regimen education.\n\nSuited to DTC regimens and retail multipacks.",
  },
  {
    slug: "corrugated-perfume",
    title: "Perfume Corrugated Boxes",
    description:
      "Fragile glass protection — corner crush strategy, partition discipline, and premium print for gift corridors.",
    features: [
      { label: "Protection", value: "Partitions + void strategy" },
      { label: "Print", value: "Litho upgrade for luxury art" },
      { label: "Test", value: "Drop scenarios for glass classes" },
      { label: "Unboxing", value: "Layered reveal options" },
      { label: "Min. order", value: "250 pieces" },
      { label: "Lead time", value: "10–20 business days" },
    ],
    details:
      "Perfume requires conservative board specs and insert discipline. We align to bottle CAD and closure height.\n\nPremium shippers often pair corrugated outers with inner rigid or folding cartons.\n\nIdeal for gift sets and limited editions.",
  },
  {
    slug: "corrugated-pr-kit",
    title: "PR Kit Corrugated Boxes",
    description:
      "Share-worthy outers — layered inserts, room for press sheets, and durable enough for courier networks.",
    features: [
      { label: "Story", value: "Layered reveal & panel sequencing" },
      { label: "Space", value: "Minis, full size, collateral wells" },
      { label: "Print", value: "Hashtag & CTA panels optional" },
      { label: "Durability", value: "Multi-stop courier paths" },
      { label: "Min. order", value: "100 pieces" },
      { label: "Lead time", value: "10–20 business days" },
    ],
    details:
      "PR kits are packaging as media. We sequence layers for creator beats — from outer sleeve to hero product.\n\nCorrugated keeps weight and cost sane at influencer scale.\n\nA Brands Face staple for launches.",
  },
  {
    slug: "corrugated-food",
    title: "Food Corrugated Boxes",
    description:
      "Food-safe barriers and venting — bakery, meal kits, and retail food adjacency with compliance-aware layouts.",
    features: [
      { label: "Safety", value: "Food-grade liners / coatings where required" },
      { label: "Vent", value: "Hot and cold chain considerations" },
      { label: "Grease", value: "Barrier boards for fried / oily" },
      { label: "Print", value: "FDA-adjacent copy zones" },
      { label: "Min. order", value: "250 pieces" },
      { label: "Lead time", value: "10–22 business days" },
    ],
    details:
      "Food corrugated must match jurisdiction and product class. We involve compliance early for coatings and claims.\n\nVenting and moisture management differ by SKU.\n\nStrong for meal kits, bakery, and specialty retail.",
  },
  {
    slug: "corrugated-electronics",
    title: "Electronics Corrugated Boxes",
    description:
      "Accessory and small device shippers — ESD conversations where needed, insert retention, and drop discipline.",
    features: [
      { label: "Insert", value: "Foam, pulp, or engineered paper" },
      { label: "ESD", value: "Reviewed for sensitive SKUs" },
      { label: "Print", value: "Spec and compliance panels" },
      { label: "Test", value: "ISTA 3A / 6A as appropriate" },
      { label: "Min. order", value: "100 pieces" },
      { label: "Lead time", value: "10–20 business days" },
    ],
    details:
      "Electronics corrugated balances protection with cube efficiency. We design inserts for drop and compression.\n\nESD needs are evaluated honestly — not every SKU needs shielding.\n\nIdeal for peripherals, audio, and small appliances.",
  },

  /* ── Premium / variation ── */
  {
    slug: "corrugated-custom-printed",
    title: "Custom Printed Corrugated Boxes",
    description:
      "High-coverage flexo and litho-laminate — brand colour control, photographic panels, and inside-out campaigns.",
    features: [
      { label: "Print", value: "Flexo direct or litho laminate to corrugated" },
      { label: "Colour", value: "Pantone + CMYK governance" },
      { label: "Coverage", value: "Full wrap and interior print" },
      { label: "Proofing", value: "Drawdowns and press proofs" },
      { label: "Min. order", value: "100 pieces" },
      { label: "Lead time", value: "10–22 business days" },
    ],
    details:
      "Custom printed corrugated is how DTC brands own the porch. We manage washboarding expectations on kraft and white mediums.\n\nLitho laminate unlocks photography and fine type on B-flute and heavier.\n\nCore to Brands Face campaigns that need shelf and doorstep parity.",
  },
  {
    slug: "corrugated-kraft",
    title: "Kraft Corrugated Boxes",
    description:
      "Natural kraft liners — authentic texture, eco-forward story, and bold contrast with black or white ink strategies.",
    features: [
      { label: "Face", value: "Natural kraft liner" },
      { label: "Print", value: "Flexo — single hit to full coverage" },
      { label: "Story", value: "Recyclable, widely accepted curbside" },
      { label: "Finish", value: "Matte hand-feel native to kraft" },
      { label: "Min. order", value: "100 pieces" },
      { label: "Lead time", value: "8–18 business days" },
    ],
    details:
      "Kraft corrugated reads honest and modern. We advise ink coverage vs cost and scuff in handling.\n\nPopular with wellness, food, and conscious brands.\n\nPair with minimalist typography for premium quiet.",
  },
  {
    slug: "corrugated-white",
    title: "White Corrugated Boxes",
    description:
      "White mottle liners — brighter art, cleaner photography reproduction, and retail pop vs natural kraft.",
    features: [
      { label: "Face", value: "White mottle top liner" },
      { label: "Print", value: "High-chroma flexo and litho" },
      { label: "Look", value: "Clinical to playful — brand dependent" },
      { label: "Contrast", value: "Pairs with kraft interior for surprise" },
      { label: "Min. order", value: "100 pieces" },
      { label: "Lead time", value: "8–18 business days" },
    ],
    details:
      "White corrugated is the default for colourful DTC. We manage dot gain and flute show-through honestly.\n\nInterior white enables inside print without muddiness.\n\nStrong for beauty, lifestyle, and premium consumables.",
  },
  {
    slug: "corrugated-heavy-duty",
    title: "Heavy Duty Corrugated Boxes",
    description:
      "Double-wall and high-burst singles — industrial weight classes, export lanes, and pallet loads.",
    features: [
      { label: "Board", value: "Double wall BC, AB — spec’d to load" },
      { label: "Test", value: "Edge crush & burst data" },
      { label: "Use", value: "Dense goods, export, long stack" },
      { label: "Print", value: "Handling icons and hazmat zones" },
      { label: "Min. order", value: "100 pieces" },
      { label: "Lead time", value: "10–22 business days" },
    ],
    details:
      "Heavy duty is engineering-first. We review pallet patterns, clamp force, and moisture paths.\n\nNot every SKU needs double wall — we right-size honestly.\n\nIdeal for industrial adjacency and high-mass DTC.",
  },
  {
    slug: "corrugated-with-inserts",
    title: "Corrugated Boxes with Inserts",
    description:
      "Integrated partitions, molded pulp, foam, and paper platforms — ship-ready systems, not just an outer shell.",
    features: [
      { label: "Inserts", value: "Corrugated, pulp, foam, paper" },
      { label: "CAD", value: "Product-driven cavity design" },
      { label: "Assembly", value: "Knock-down vs pre-erect" },
      { label: "Sustainability", value: "Paper-first paths preferred" },
      { label: "Min. order", value: "250 pieces" },
      { label: "Lead time", value: "12–24 business days" },
    ],
    details:
      "Inserts make corrugated predictive. We drop-test the full system — not the box alone.\n\nFoam for weight class, pulp for eco-forward, paper for light goods.\n\nEssential for glass, mixed sets, and electronics.",
  },
  {
    slug: "corrugated-branded-shipping",
    title: "Branded Shipping Corrugated Boxes",
    description:
      "Outer shipper as billboard — tape lines, panel breaks, and brand systems tuned for parcel network visibility.",
    features: [
      { label: "Brand", value: "Logo, pattern, and icon systems" },
      { label: "Ops", value: "Tape-friendly void of critical art" },
      { label: "Campaign", value: "Rotating prints by SKU" },
      { label: "Sustainability", value: "Right-size to reduce filler" },
      { label: "Min. order", value: "100 pieces" },
      { label: "Lead time", value: "8–18 business days" },
    ],
    details:
      "Branded shipping is retention and acquisition. We align art to how carriers handle and stack boxes.\n\nDiscuss QR and personalisation for reorder flows.\n\nBuilt for brands that want the doorstep to feel unmistakably theirs.",
  },
  {
    slug: "corrugated-laminated",
    title: "Laminated Corrugated Boxes",
    description:
      "Litho laminate to corrugated — near-offset quality on flute, for hero SKUs and photographic campaigns.",
    features: [
      { label: "Process", value: "Pre-print sheet laminated to corrugated" },
      { label: "Quality", value: "Fine type and photography" },
      { label: "MOQ", value: "Higher than flexo — break-even guidance" },
      { label: "Finish", value: "Matte / gloss film options" },
      { label: "Min. order", value: "250 pieces" },
      { label: "Lead time", value: "12–24 business days" },
    ],
    details:
      "Laminated corrugated is the premium of the category. We manage score cracking and panel alignment on folds.\n\nIdeal when brand equity demands photography fidelity.\n\nPair with white or kraft mediums depending on art direction.",
  },
  {
    slug: "corrugated-eco-friendly",
    title: "Eco-Friendly Corrugated Boxes",
    description:
      "High recycled content, right-sizing, paper alternatives to plastic void, and credible end-of-life messaging.",
    features: [
      { label: "Material", value: "High recycled-content board tiers" },
      { label: "Ink", value: "Water-based flexo programs" },
      { label: "Void", value: "Paper fill strategies" },
      { label: "Claims", value: "Messaging support without greenwashing" },
      { label: "Min. order", value: "100 pieces" },
      { label: "Lead time", value: "8–18 business days" },
    ],
    details:
      "Eco-friendly corrugated is about credible choices — not stickers. We document recycled content and recyclability pathways.\n\nRight-sizing reduces filler and emissions.\n\nFor Brands Face clients who need performance and values alignment.",
  },
];

export const CORRUGATED_PRODUCTS: Record<string, ProductData> = Object.fromEntries(
  CORR_SPECS.map((spec) => [spec.slug, corrugatedProduct(spec)]),
) as Record<string, ProductData>;
