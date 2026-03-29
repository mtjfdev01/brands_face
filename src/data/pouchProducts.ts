import type { ProductData } from "@/components/product/ProductInfo";

const POUCH_IMAGES = [
  "/assets/images/categories/pouch.jpeg",
  "/products/mailer.png",
  "/products/mailer-1.jpg",
];

const POUCH_QUANTITIES: ProductData["quantities"] = [
  { qty: 1000, pricePerPiece: 0.12, total: 120.0 },
  { qty: 2500, pricePerPiece: 0.09, total: 225.0 },
  { qty: 5000, pricePerPiece: 0.075, total: 375.0 },
  { qty: 10000, pricePerPiece: 0.06, total: 600.0 },
  { qty: 25000, pricePerPiece: 0.05, total: 1250.0 },
];

const POUCH_SIZES: ProductData["sizes"] = [
  { label: "S", dimensions: "From 80 × 120 mm face" },
  { label: "M", dimensions: "From 120 × 180 mm face" },
  { label: "L", dimensions: "From 160 × 240 mm face" },
  { label: "Custom", dimensions: "Film width & gusset to spec" },
];

const POUCH_DEALS: ProductData["deals"] = [
  {
    title: "Pouch line — barrier film review",
    description:
      "We match OTR, WVTR, and seal strength to your formula and shelf life — fewer surprises after fill.",
    code: "POUCHLINE",
  },
  {
    title: "First article seal + drop review",
    description:
      "Validate heat-seal windows, peel strength, and spout torque on a physical sample before mass run.",
    code: "POUCHFA",
  },
];

type PouchSpec = Pick<ProductData, "slug" | "title" | "description" | "features" | "details">;

function pouchProduct(spec: PouchSpec): ProductData {
  return {
    ...spec,
    badges: ["FLEXIBLE PACK", "BARRIER FILMS", "BRANDS FACE STUDIO"],
    deals: POUCH_DEALS,
    quantities: POUCH_QUANTITIES,
    sizes: POUCH_SIZES,
    deliveryEstimate: "12–22 business days",
    images: POUCH_IMAGES,
  };
}

const POUCH_SPECS: PouchSpec[] = [
  /* ── Core formats ── */
  {
    slug: "pouch-stand-up",
    title: "Stand Up Pouches",
    description:
      "Bottom gusset stands the pack — shelf presence, efficient palletisation, and room for front and back branding.",
    features: [
      { label: "Format", value: "Stand-up with bottom gusset" },
      { label: "Film", value: "PET / PE, PET / MPET / PE, kraft / PE" },
      { label: "Options", value: "Zipper, valve, tear notch" },
      { label: "Fill", value: "Powder, granule, liquid (with fitment)" },
      { label: "Min. order", value: "1,000 pieces" },
      { label: "Lead time", value: "12–22 business days" },
    ],
    details:
      "Stand-up pouches are the default for flexible retail. We engineer gusset depth and stiffness for your net weight.\n\nBarrier stacks are matched to oxygen and moisture sensitivity.\n\nIdeal for snacks, supplements, and refill programs.",
  },
  {
    slug: "pouch-flat",
    title: "Flat Pouches",
    description:
      "Two-web or three-side seal — minimal footprint for samples, sachets, and mailer inserts.",
    features: [
      { label: "Format", value: "Lay-flat pouch" },
      { label: "Seal", value: "Three or four side seal variants" },
      { label: "Print", value: "Rotogravure / flexo by run size" },
      { label: "Use", value: "Samples, single dose, flat packs" },
      { label: "Min. order", value: "5,000 pieces" },
      { label: "Lead time", value: "12–22 business days" },
    ],
    details:
      "Flat pouches optimise postage cube and line speed. We tune seal strength for your product rheology.\n\nPopular for cosmetics samples, wipes, and condiments.\n\nDiscuss easy-open notches early.",
  },
  {
    slug: "pouch-spout",
    title: "Spout Pouches",
    description:
      "Fit-in spout for beverages, oils, and liquid refills — pour control, reclose options, and child-resistant paths where applicable.",
    features: [
      { label: "Fitment", value: "Corner or center spout — PP / PE" },
      { label: "Barrier", value: "High-barrier film for O2" },
      { label: "Cap", value: "Flip-top, tethered, CR" },
      { label: "Fill", value: "Hot and ambient fill reviewed" },
      { label: "Min. order", value: "5,000 pieces" },
      { label: "Lead time", value: "16–28 business days" },
    ],
    details:
      "Spout pouches replace rigid bottles for many categories. We validate torque, drop, and leak under your fill specs.\n\nFilm and fitment are tested as a system.\n\nStrong for refill, juice, and household liquids.",
  },
  {
    slug: "pouch-zipper",
    title: "Zipper Pouches",
    description:
      "Press-to-close zip tracks — reclose for snacks, supplements, and multi-use DTC.",
    features: [
      { label: "Zip", value: "PE / PP zipper track — single or double" },
      { label: "Placement", value: "Front or top load paths" },
      { label: "Feel", value: "Finger pull and alignment" },
      { label: "Film", value: "Matte / gloss / kraft laminate" },
      { label: "Min. order", value: "3,000 pieces" },
      { label: "Lead time", value: "12–22 business days" },
    ],
    details:
      "Zipper pouches improve retention and portion control. We align zip placement to your fill and consumer open.\n\nSeal integrity is tested after repeated opens.\n\nCore to pantry and wellness brands.",
  },
  {
    slug: "pouch-three-side-seal",
    title: "Three Side Seal Pouches",
    description:
      "Three sealed edges, one open for fill — efficient for horizontal form-fill and stick packs.",
    features: [
      { label: "Seal", value: "Three sides sealed — fill open" },
      { label: "HFFS", value: "Compatible with horizontal lines" },
      { label: "Print", value: "Front / back register" },
      { label: "Variants", value: "Hang hole, tear notch" },
      { label: "Min. order", value: "5,000 pieces" },
      { label: "Lead time", value: "12–22 business days" },
    ],
    details:
      "Three-side seal is the backbone of sachet and stick formats. We specify film width and seal bar compatibility.\n\nIdeal for powders, liquids, and single-use wipes.\n\nDiscuss COF for machine handling.",
  },
  {
    slug: "pouch-four-side-seal",
    title: "Four Side Seal Pouches",
    description:
      "All edges sealed around the product — uniform flat pack and crisp edges for retail sets.",
    features: [
      { label: "Seal", value: "Four-side seal — full perimeter" },
      { label: "Look", value: "Crisp edges" },
      { label: "Print", value: "360° art possible" },
      { label: "Use", value: "Flat retail, bundles" },
      { label: "Min. order", value: "5,000 pieces" },
      { label: "Lead time", value: "12–22 business days" },
    ],
    details:
      "Four-side seal packs read clean on shelf. We manage corner radius and film tension.\n\nCommon for masks, flat sets, and promotional bundles.\n\nPair with outer cartons for gifting.",
  },
  {
    slug: "pouch-gusset",
    title: "Gusset Pouches",
    description:
      "Side or bottom gussets for volume — expand capacity without losing shelf discipline.",
    features: [
      { label: "Gusset", value: "Side or bottom — depth to spec" },
      { label: "Stand", value: "Optional stand-up with bottom gusset" },
      { label: "Film", value: "Structured laminates" },
      { label: "Print", value: "Panel breaks for gusset art" },
      { label: "Min. order", value: "3,000 pieces" },
      { label: "Lead time", value: "12–22 business days" },
    ],
    details:
      "Gussets add volume without only growing face width. We map art across folds so branding stays intentional.\n\nUsed for coffee, bulk snacks, and powder.\n\nStack stability reviewed for pallet loads.",
  },
  {
    slug: "pouch-pillow",
    title: "Pillow Pouches",
    description:
      "Classic back-seal pillow — high throughput, economical, and ideal for single-serve.",
    features: [
      { label: "Format", value: "Pillow — back center seal" },
      { label: "Speed", value: "VFFS friendly" },
      { label: "Print", value: "Repeat patterns" },
      { label: "Use", value: "Snacks, confectionery, samples" },
      { label: "Min. order", value: "10,000 pieces" },
      { label: "Lead time", value: "12–22 business days" },
    ],
    details:
      "Pillow packs are cost-effective at scale. We align seal placement to your VFFS.\n\nGreat for high-volume single serve.\n\nBarrier matched to shelf life targets.",
  },
  {
    slug: "pouch-sachet",
    title: "Sachet Pouches",
    description:
      "Single-dose units — serums, condiments, and powders with tight seal control and easy-open notches.",
    features: [
      { label: "Dose", value: "Single-unit volumes" },
      { label: "Seal", value: "Hermetic seal strength" },
      { label: "Open", value: "Tear notch, laser score" },
      { label: "Fill", value: "Liquid, gel, powder" },
      { label: "Min. order", value: "10,000 pieces" },
      { label: "Lead time", value: "12–22 business days" },
    ],
    details:
      "Sachets are precision packaging. We validate burst and drop for your rheology.\n\nCosmetics and hospitality favourite.\n\nMicro text and regulatory copy planned at art stage.",
  },
  {
    slug: "pouch-die-cut",
    title: "Die-Cut Pouches",
    description:
      "Custom outlines and windows — shaped packs, euro-holes, and thumb notches for retail differentiation.",
    features: [
      { label: "Tooling", value: "Steel rule die for outline" },
      { label: "Window", value: "Clear PET or matte window" },
      { label: "Retail", value: "Hang holes, shaped headers" },
      { label: "MOQ", value: "Higher than standard — break-even" },
      { label: "Min. order", value: "5,000 pieces" },
      { label: "Lead time", value: "16–28 business days" },
    ],
    details:
      "Die-cut pouches differentiate on shelf. We review seal paths around complex shapes.\n\nWindows and hang tabs support retail placement.\n\nIdeal for hero SKUs and limited editions.",
  },

  /* ── Use-case based ── */
  {
    slug: "pouch-cosmetic",
    title: "Cosmetic Pouches",
    description:
      "Colour cosmetics and wipes — scuff resistance, matte film, and regulatory panels.",
    features: [
      { label: "Surface", value: "Soft-touch / matte BOPP" },
      { label: "Barrier", value: "Moisture-tuned for formulas" },
      { label: "Fill", value: "Cream, gel, wipe" },
      { label: "Retail", value: "Hang hole options" },
      { label: "Min. order", value: "3,000 pieces" },
      { label: "Lead time", value: "12–22 business days" },
    ],
    details:
      "Cosmetic pouches need clean handling and ingredient clarity. We plan panel hierarchy for compliance.\n\nMatte finishes reduce fingerprint noise in retail.\n\nSampling programs for shade and texture.",
  },
  {
    slug: "pouch-skincare",
    title: "Skincare Pouches",
    description:
      "Serum, mask, and refill — barrier films for actives, spout and tear options, and DTC-friendly cube.",
    features: [
      { label: "Barrier", value: "OTR / WVTR matched to formula" },
      { label: "Formats", value: "Flat, stand-up, sachet" },
      { label: "Refill", value: "Spout and pour paths" },
      { label: "Print", value: "Ingredient storytelling" },
      { label: "Min. order", value: "3,000 pieces" },
      { label: "Lead time", value: "12–22 business days" },
    ],
    details:
      "Skincare pouches extend shelf life without glass. We document film compatibility with your preservative system.\n\nRefill pouches support retail and subscription.\n\nBrands Face alignment for clean beauty.",
  },
  {
    slug: "pouch-makeup",
    title: "Makeup Pouches",
    description:
      "Remover wipes, cotton sets, and palettes in flexible formats — tactile feel and travel-friendly sizes.",
    features: [
      { label: "Format", value: "Flat and stand-up" },
      { label: "Texture", value: "Soft-touch laminate" },
      { label: "Travel", value: "TSA-friendly sizes optional" },
      { label: "Print", value: "Shade and campaign art" },
      { label: "Min. order", value: "3,000 pieces" },
      { label: "Lead time", value: "12–22 business days" },
    ],
    details:
      "Makeup pouches need to feel premium in hand. We select finishes and zips for repeated opens.\n\nTravel sets and gift bundles common.\n\nPair with cartons for retail.",
  },
  {
    slug: "pouch-hair-care",
    title: "Hair Care Pouches",
    description:
      "Refill pouches for shampoo, conditioner, and masks — large format fills and spout options.",
    features: [
      { label: "Volume", value: "500 ml – 2 L+ variants" },
      { label: "Spout", value: "Pour and reclose" },
      { label: "Barrier", value: "Surfactant compatibility" },
      { label: "Retail", value: "Hang or stand-up" },
      { label: "Min. order", value: "5,000 pieces" },
      { label: "Lead time", value: "14–24 business days" },
    ],
    details:
      "Hair care refills reduce plastic waste. We test seal strength with surfactant loads.\n\nStand-up and spout combos dominate retail.\n\nDiscuss e-commerce burst for parcel drops.",
  },
  {
    slug: "pouch-sample",
    title: "Sample Pouches",
    description:
      "Single-dose trial and GWP — small MOQ tiers, fast turns, and clear dose messaging.",
    features: [
      { label: "Dose", value: "1–15 ml typical" },
      { label: "Print", value: "Trial and legal copy" },
      { label: "Speed", value: "Expedited lanes available" },
      { label: "Formats", value: "Sachet, flat, mini stand-up" },
      { label: "Min. order", value: "5,000 pieces" },
      { label: "Lead time", value: "10–18 business days" },
    ],
    details:
      "Sample pouches drive trial. We optimise film cost per dose.\n\nGWP and influencer kits common.\n\nArt must read at tiny scale.",
  },
  {
    slug: "pouch-travel-size",
    title: "Travel Size Pouches",
    description:
      "TSA-friendly volumes — leak discipline, reclose zips, and compact cube for travel retail.",
    features: [
      { label: "Volume", value: "Under 100 ml segments" },
      { label: "Seal", value: "Leak test protocols" },
      { label: "Zip", value: "Travel reclose" },
      { label: "Retail", value: "Hang and clip strips" },
      { label: "Min. order", value: "3,000 pieces" },
      { label: "Lead time", value: "12–22 business days" },
    ],
    details:
      "Travel pouches need honest leak testing. We align with airline and retailer rules.\n\nSoft-touch and matte dominate.\n\nGift sets and hospitality programs.",
  },
  {
    slug: "pouch-refill",
    title: "Refill Pouches",
    description:
      "Bulk refill for home and retail — spout, handle, and barrier tuned to category.",
    features: [
      { label: "Barrier", value: "Category-specific stacks" },
      { label: "Spout", value: "Pour and reclose" },
      { label: "Handle", value: "Optional die-cut handle" },
      { label: "Story", value: "Plastic reduction messaging" },
      { label: "Min. order", value: "5,000 pieces" },
      { label: "Lead time", value: "14–24 business days" },
    ],
    details:
      "Refill pouches are circular economy story. We document film recyclability honestly.\n\nHome care and personal care lead.\n\nPair with rigid bottle or pump for first purchase.",
  },
  {
    slug: "pouch-retail",
    title: "Retail Pouches",
    description:
      "Shelf-ready graphics, hang holes, and stiffness for planogram discipline.",
    features: [
      { label: "Retail", value: "Hang hole, euro-hole" },
      { label: "Stiffness", value: "Film structure for face" },
      { label: "Print", value: "High-impact rotogravure" },
      { label: "Variants", value: "Multipack" },
      { label: "Min. order", value: "5,000 pieces" },
      { label: "Lead time", value: "12–22 business days" },
    ],
    details:
      "Retail pouches need to survive planogram and consumer handling. We test scuff and drop.\n\nColour blocking and nutrition panels planned early.\n\nClub and grocery adjacency.",
  },
  {
    slug: "pouch-gift",
    title: "Gift Pouches",
    description:
      "Premium finishes, matte and foil, and giftable shapes for seasonal and limited runs.",
    features: [
      { label: "Finish", value: "Soft-touch, foil, emboss" },
      { label: "Formats", value: "Stand-up, shaped, window" },
      { label: "Seasonal", value: "Short-run lanes" },
      { label: "Pairing", value: "Outer cartons optional" },
      { label: "Min. order", value: "3,000 pieces" },
      { label: "Lead time", value: "12–22 business days" },
    ],
    details:
      "Gift pouches need emotion and protection. We balance finish cost with shelf life.\n\nHoliday and limited editions.\n\nBrands Face studio for campaign art.",
  },
  {
    slug: "pouch-promotional",
    title: "Promotional Pouches",
    description:
      "Event and campaign packs — fast turn, bold print, and cost-effective structures for giveaways.",
    features: [
      { label: "Speed", value: "Expedited production" },
      { label: "Print", value: "Bold spot colour" },
      { label: "Formats", value: "Flat, pillow, sachet" },
      { label: "MOQ", value: "Flexible tiers" },
      { label: "Min. order", value: "5,000 pieces" },
      { label: "Lead time", value: "10–18 business days" },
    ],
    details:
      "Promotional pouches prioritise speed and impact. We simplify structures for reliable delivery.\n\nEvents, sampling, and influencer drops.\n\nDiscuss storage and humidity for fills.",
  },

  /* ── Premium / variation ── */
  {
    slug: "pouch-printed",
    title: "Printed Pouches",
    description:
      "Rotogravure and flexo — photographic quality, brand colour governance, and register.",
    features: [
      { label: "Print", value: "Up to 10-colour gravure" },
      { label: "Colour", value: "Pantone + CMYK" },
      { label: "Proofing", value: "Press proofs available" },
      { label: "Coverage", value: "Full bleed" },
      { label: "Min. order", value: "5,000 pieces" },
      { label: "Lead time", value: "12–22 business days" },
    ],
    details:
      "Printed pouches are your billboard. We manage registration across seals and gussets.\n\nInterior print for surprise unboxing.\n\nCore to Brands Face flexible programs.",
  },
  {
    slug: "pouch-matte-finish",
    title: "Matte Finish Pouches",
    description:
      "Soft-touch and matte OPV — premium hand-feel, reduced glare, and fingerprint control.",
    features: [
      { label: "Finish", value: "Matte BOPP / matte PET" },
      { label: "Feel", value: "Velvety surface" },
      { label: "Retail", value: "Reduced shelf glare" },
      { label: "Print", value: "Pairs with spot gloss" },
      { label: "Min. order", value: "3,000 pieces" },
      { label: "Lead time", value: "12–22 business days" },
    ],
    details:
      "Matte pouches dominate premium beauty. We specify laminate stack for scratch resistance.\n\nSpot gloss on matte for logo lift.\n\nSampling recommended for hand-feel.",
  },
  {
    slug: "pouch-gloss-finish",
    title: "Gloss Finish Pouches",
    description:
      "High-gloss BOPP for saturated colour and shelf pop — vibrant for mass and youth brands.",
    features: [
      { label: "Finish", value: "Gloss BOPP / gloss PET" },
      { label: "Colour", value: "Maximum chroma" },
      { label: "Retail", value: "Eye-catching on shelf" },
      { label: "Pairing", value: "Spot matte for contrast" },
      { label: "Min. order", value: "3,000 pieces" },
      { label: "Lead time", value: "12–22 business days" },
    ],
    details:
      "Gloss pouches read energetic and clean. We manage scuff with varnish.\n\nConfectionery and snack adjacency.\n\nCombine with matte for editorial contrast.",
  },
  {
    slug: "pouch-foil",
    title: "Foil Pouches",
    description:
      "Metallised film layers — barrier boost and metallic shine without loose foil.",
    features: [
      { label: "Film", value: "MPET / foil-look laminates" },
      { label: "Barrier", value: "High O2 / moisture" },
      { label: "Look", value: "Metallic fields" },
      { label: "Print", value: "Overprint for colour" },
      { label: "Min. order", value: "3,000 pieces" },
      { label: "Lead time", value: "12–22 business days" },
    ],
    details:
      "Foil-look pouches deliver shelf flash. We tune metal layer for barrier and flex crack.\n\nCoffee, snacks, and supplements common.\n\nDiscuss recyclability goals — structures vary.",
  },
  {
    slug: "pouch-kraft",
    title: "Kraft Pouches",
    description:
      "Paper-look laminates — natural story with heat-seal PE inner layers for food and dry goods.",
    features: [
      { label: "Face", value: "Kraft paper / PE laminate" },
      { label: "Story", value: "Natural, artisanal" },
      { label: "Print", value: "Flexo 1–3 colour or litho label" },
      { label: "Barrier", value: "Dry goods typical" },
      { label: "Min. order", value: "3,000 pieces" },
      { label: "Lead time", value: "12–22 business days" },
    ],
    details:
      "Kraft pouches read authentic. We test seal strength on paper fibre batches.\n\nSnacks, coffee, and wellness.\n\nMoisture-sensitive SKUs need barrier review.",
  },
  {
    slug: "pouch-transparent",
    title: "Transparent Pouches",
    description:
      "Clear windows — see product colour and texture, with optional full clear face.",
    features: [
      { label: "Film", value: "Clear PET / PE" },
      { label: "Window", value: "Full face or window patch" },
      { label: "Print", value: "Registered to product" },
      { label: "Barrier", value: "Tuned to fill" },
      { label: "Min. order", value: "3,000 pieces" },
      { label: "Lead time", value: "12–22 business days" },
    ],
    details:
      "Transparent pouches sell the product. We manage UV fade and barrier honestly.\n\nGummies, supplements, and colour cosmetics.\n\nPair with cartons for premium retail.",
  },
  {
    slug: "pouch-eco-friendly",
    title: "Eco-Friendly Pouches",
    description:
      "Mono-material PE, recyclable where infrastructure allows, and downgauging paths.",
    features: [
      { label: "Structure", value: "Mono PE / PP where feasible" },
      { label: "Ink", value: "Low-VOC inks" },
      { label: "Claims", value: "Store-drop and regional guidance" },
      { label: "Design", value: "Right-size to reduce waste" },
      { label: "Min. order", value: "5,000 pieces" },
      { label: "Lead time", value: "14–24 business days" },
    ],
    details:
      "Eco-friendly pouches are evolving. We document recyclability and end-of-life honestly.\n\nNot every SKU fits mono-material today — we advise per barrier need.\n\nBrands Face alignment for values-led launches.",
  },
  {
    slug: "pouch-zip-lock",
    title: "Pouches with Zip Lock",
    description:
      "Press-to-close zip integrated with stand-up or flat — reclose, portion control, and pantry retention.",
    features: [
      { label: "Zip", value: "PE / PP zipper track" },
      { label: "Formats", value: "Stand-up, flat bottom, gusset" },
      { label: "Test", value: "Seal after repeat open" },
      { label: "Print", value: "Full surface branding" },
      { label: "Min. order", value: "3,000 pieces" },
      { label: "Lead time", value: "12–22 business days" },
    ],
    details:
      "Zip lock pouches are retention and convenience. We align zip to consumer use and product weight.\n\nPantry, pet, and wellness categories.\n\nDistinct from heat-seal-only sachets — reclose is the hero.",
  },
];

export const POUCH_PRODUCTS: Record<string, ProductData> = Object.fromEntries(
  POUCH_SPECS.map((spec) => [spec.slug, pouchProduct(spec)]),
) as Record<string, ProductData>;
