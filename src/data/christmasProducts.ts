import type { ProductData } from "@/components/product/ProductInfo";

const CHRISTMAS_IMAGES = [
  "/assets/images/categories/christmas/christmas_gift_bag.png",
  "/assets/images/categories/christmas/christmas (4).png",
  "/assets/images/categories/christmas/christmas_sweet_box.png",
];

const CHRISTMAS_QUANTITIES: ProductData["quantities"] = [
  { qty: 100, pricePerPiece: 1.15, total: 115.0 },
  { qty: 250, pricePerPiece: 0.92, total: 230.0 },
  { qty: 500, pricePerPiece: 0.76, total: 380.0 },
  { qty: 1000, pricePerPiece: 0.62, total: 620.0 },
  { qty: 2500, pricePerPiece: 0.52, total: 1300.0 },
];

const CHRISTMAS_SIZES: ProductData["sizes"] = [
  { label: "S", dimensions: "From 8 × 8 × 4 cm / A6 wrap sheets" },
  { label: "M", dimensions: "From 15 × 12 × 6 cm / retail gift formats" },
  { label: "L", dimensions: "From 25 × 20 × 10 cm / hamper and bakery packs" },
  { label: "Custom", dimensions: "Holiday dielines to your product cube" },
];

const CHRISTMAS_DEALS: ProductData["deals"] = [
  {
    title: "Christmas packaging — seasonal colour proof",
    description:
      "Lock festive reds, greens, gold foil, and kraft tones with a contract proof before the holiday production window.",
    code: "XMASPROOF",
  },
  {
    title: "Holiday run — mixed SKU packing",
    description:
      "Bundle gift boxes, bags, tags, and seals on one seasonal purchase order so retail and corporate gifting ship together.",
    code: "XMASLINE",
  },
];

type ChristmasSpec = Pick<ProductData, "slug" | "title" | "description" | "features" | "details">;

function christmasProduct(spec: ChristmasSpec): ProductData {
  return {
    ...spec,
    badges: ["CHRISTMAS PACKAGING", "HOLIDAY GIFTING", "BRANDS FACE STUDIO"],
    deals: CHRISTMAS_DEALS,
    quantities: CHRISTMAS_QUANTITIES,
    sizes: CHRISTMAS_SIZES,
    deliveryEstimate: "10–18 business days (book early for December)",
    images: CHRISTMAS_IMAGES,
  };
}

const CHRISTMAS_SPECS: ChristmasSpec[] = [
  {
    slug: "custom-christmas-gift-boxes",
    title: "Custom Christmas Gift Boxes",
    description:
      "Custom Christmas gift boxes for holiday retail, corporate gifting, and seasonal unboxing — printed festive structures with optional foil, ribbon, and inserts.",
    features: [
      { label: "Use", value: "Holiday retail, hampers, corporate gifts" },
      { label: "Board", value: "Art card / kraft / rigid wrap options" },
      { label: "Print", value: "CMYK + gold/silver foil, spot UV" },
      { label: "Season", value: "Christmas and winter campaigns" },
      { label: "Min. order", value: "100 pieces" },
      { label: "Lead time", value: "10–18 business days" },
    ],
    details:
      "Custom Christmas gift boxes are built for peak-season gifting: strong edges, festive print, and room for tissue, ribbon, and branded inserts.\n\nWe match red, green, kraft, and metallic palettes to your holiday campaign and size the cube to chocolates, candles, apparel, or mixed hampers.\n\nBook early for November–December fulfilment so proofs, foil, and packing kits land before your ship-by date.",
  },
  {
    slug: "custom-christmas-gift-bags",
    title: "Custom Christmas Gift Bags",
    description:
      "Custom Christmas gift bags for retail checkout and holiday events — paper shopping bags with festive print, reinforced handles, and seasonal branding.",
    features: [
      { label: "Format", value: "Paper carry / shopping bag" },
      { label: "Handles", value: "Twisted, ribbon, or die-cut" },
      { label: "Print", value: "Full colour Christmas artwork" },
      { label: "Load", value: "Retail gift and hamper weights" },
      { label: "Min. order", value: "100 pieces" },
      { label: "Lead time", value: "10–18 business days" },
    ],
    details:
      "Custom Christmas gift bags carry the brand from till to doorstep. We specify paper weight, handle pull, and gusset depth for typical holiday baskets.\n\nFestive graphics, kraft + foil, or full-bleed photography all run well on coated or uncoated bag stock.\n\nIdeal for boutiques, pop-ups, and corporate Christmas markets.",
  },
  {
    slug: "custom-christmas-wrapping-paper",
    title: "Custom Christmas Wrapping Paper",
    description:
      "Custom Christmas wrapping paper and gift wrap sheets or rolls — branded holiday patterns, kraft festive prints, and retail-ready wrap for seasonal gifting.",
    features: [
      { label: "Format", value: "Sheets, rolls, or folded wrap packs" },
      { label: "Stock", value: "Coated, kraft, or tissue overlay" },
      { label: "Print", value: "Repeat pattern or campaign artwork" },
      { label: "Finish", value: "Matte, gloss, or metallic ink" },
      { label: "Min. order", value: "250 sheets / 50 rolls" },
      { label: "Lead time", value: "10–16 business days" },
    ],
    details:
      "Custom Christmas wrapping paper extends your holiday identity beyond the box. We print seamless repeats or hero motifs sized to typical gift cubes.\n\nPair wrap with matching tags and seals for a complete Christmas gift-wrap set.\n\nRetail packs and bulk rolls are both available for stores and fulfilment teams.",
  },
  {
    slug: "christmas-sweet-boxes",
    title: "Christmas Sweet Boxes",
    description:
      "Christmas sweet boxes and confectionery gift cartons for festive treats — window, tuck, or two-piece packs sized for candies, biscuits, and holiday assortments.",
    features: [
      { label: "Use", value: "Sweets, candies, festive assortments" },
      { label: "Structure", value: "Tuck, window, or two-piece carton" },
      { label: "Food", value: "Food-adjacent inks and coatings on request" },
      { label: "Print", value: "Festive full colour + optional window" },
      { label: "Min. order", value: "250 pieces" },
      { label: "Lead time", value: "10–18 business days" },
    ],
    details:
      "Christmas sweet boxes present confectionery with seasonal colour and a sturdy carton that survives gift handling.\n\nWindows, inserts, and lock bottoms keep mixed sweets in place for retail and hamper packing.\n\nShare fill weights and allergen copy so we reserve legal panels on the Christmas pack.",
  },
  {
    slug: "christmas-art-card-boxes",
    title: "Christmas Art Card Boxes",
    description:
      "Christmas art card boxes — folding cartons on premium coated board with festive print, foil, and sharp seasonal graphics for holiday product lines.",
    features: [
      { label: "Board", value: "SBS / FBB art card 250–400 gsm" },
      { label: "Structure", value: "Tuck, sleeve, or lock-bottom" },
      { label: "Print", value: "CMYK + foil / spot UV for Christmas" },
      { label: "Use", value: "Holiday SKUs and gift cartons" },
      { label: "Min. order", value: "250 pieces" },
      { label: "Lead time", value: "10–18 business days" },
    ],
    details:
      "Christmas art card boxes deliver high-chroma festive graphics on coated folding carton stock.\n\nThey are the economical seasonal counterpart to rigid gift boxes when you need volume for Christmas retail.\n\nFoil snowflakes, metallic reds, and kraft-and-gold looks are common finishing paths.",
  },
  {
    slug: "christmas-bakery-boxes",
    title: "Christmas Bakery Boxes",
    description:
      "Christmas bakery boxes for cookies, cakes, and festive baked goods — window cartons and food-safe holiday packs for seasonal bakeries and gift sets.",
    features: [
      { label: "Use", value: "Cookies, cakes, festive baked gifts" },
      { label: "Structure", value: "Window bakery carton / auto-bottom" },
      { label: "Food", value: "Grease-tolerant coatings available" },
      { label: "Print", value: "Christmas bakery branding" },
      { label: "Min. order", value: "250 pieces" },
      { label: "Lead time", value: "10–18 business days" },
    ],
    details:
      "Christmas bakery boxes keep cookies, brownies, and festive cakes visible and protected through holiday queues.\n\nWe size windows, grease barriers, and stacking strength for bakery and café gifting.\n\nIdeal for Christmas cookie boxes, stollen cartons, and corporate treat packs.",
  },
  {
    slug: "christmas-chocolate-boxes",
    title: "Christmas Chocolate Boxes",
    description:
      "Christmas chocolate boxes and festive cocoa gift packaging — rigid or folding chocolate cartons with trays, windows, and holiday branding.",
    features: [
      { label: "Use", value: "Chocolates, truffles, cocoa gifts" },
      { label: "Inserts", value: "Paper, pulp, or plastic trays" },
      { label: "Structure", value: "Folding carton or rigid lid" },
      { label: "Print", value: "Luxury Christmas chocolate branding" },
      { label: "Min. order", value: "100 pieces" },
      { label: "Lead time", value: "12–20 business days" },
    ],
    details:
      "Christmas chocolate boxes cradle truffles and bars with seasonal presentation and a tray that survives gift transit.\n\nWe align cavity count, board stiffness, and foil stamping to your assortment.\n\nA flagship SKU for Christmas corporate gifting and chocolate retail.",
  },
  {
    slug: "custom-christmas-gift-tags",
    title: "Custom Christmas Gift Tags",
    description:
      "Custom Christmas gift tags and hang tags for holiday packaging — printed festive tags with string, drill holes, and matching Christmas brand artwork.",
    features: [
      { label: "Format", value: "Hang tags / gift tags" },
      { label: "Stock", value: "Art card or kraft tag board" },
      { label: "Finish", value: "Foil, emboss, or spot UV" },
      { label: "Fixing", value: "Drill, string, or self-adhesive" },
      { label: "Min. order", value: "500 pieces" },
      { label: "Lead time", value: "7–14 business days" },
    ],
    details:
      "Custom Christmas gift tags finish the wrap: names, SKUs, or campaign messages on a festive die-cut.\n\nMatch tags to boxes, bags, and wrapping paper for a coordinated Christmas packaging set.\n\nVariable data and QR codes are available for gifting programmes.",
  },
  {
    slug: "christmas-stickers-and-seals",
    title: "Christmas Stickers and Seals",
    description:
      "Christmas stickers and envelope seals for holiday packaging — festive adhesive labels, wax-look seals, and branded Christmas closure stickers.",
    features: [
      { label: "Format", value: "Die-cut stickers / envelope seals" },
      { label: "Adhesive", value: "Permanent or peelable holiday seals" },
      { label: "Print", value: "Full colour Christmas motifs" },
      { label: "Use", value: "Boxes, bags, wrap, cards" },
      { label: "Min. order", value: "500 labels" },
      { label: "Lead time", value: "7–14 business days" },
    ],
    details:
      "Christmas stickers and seals close gift wrap, tissue, and cartons with a branded festive mark.\n\nRound seals, snowflake kisses, and kraft-gold closures are common Christmas packaging add-ons.\n\nWe specify adhesive for paper, kraft, and coated wrap so seals stay put through gifting.",
  },
];

export const CHRISTMAS_PRODUCTS: Record<string, ProductData> = Object.fromEntries(
  CHRISTMAS_SPECS.map((spec) => [spec.slug, christmasProduct(spec)]),
) as Record<string, ProductData>;
