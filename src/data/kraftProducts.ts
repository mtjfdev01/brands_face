import type { ProductData } from "@/components/product/ProductInfo";

const KRAFT_IMAGES = [
  "/assets/images/categories/craft_box.jpeg",
  "/products/mailer.png",
  "/products/mailer-1.jpg",
];

const KRAFT_QUANTITIES: ProductData["quantities"] = [
  { qty: 250, pricePerPiece: 0.36, total: 90.0 },
  { qty: 500, pricePerPiece: 0.28, total: 140.0 },
  { qty: 1000, pricePerPiece: 0.22, total: 220.0 },
  { qty: 2500, pricePerPiece: 0.18, total: 450.0 },
  { qty: 5000, pricePerPiece: 0.15, total: 750.0 },
];

const KRAFT_SIZES: ProductData["sizes"] = [
  { label: "S", dimensions: "From 6 × 6 × 3 cm" },
  { label: "M", dimensions: "From 12 × 10 × 4 cm" },
  { label: "L", dimensions: "From 22 × 18 × 8 cm" },
  { label: "Custom", dimensions: "Kraft-lined folding cartons" },
];

const KRAFT_DEALS: ProductData["deals"] = [
  {
    title: "Kraft line — natural stock audit",
    description:
      "We confirm stock shade, fibre direction, and print strategy so your kraft story reads authentic — not muddy brown.",
    code: "KRAFTLINE",
  },
  {
    title: "First order foil + emboss sampler",
    description:
      "See foil and emboss on your chosen kraft caliper before the full run — critical for premium natural boards.",
    code: "KRAFTPROOF",
  },
];

type KraftSpec = Pick<ProductData, "slug" | "title" | "description" | "features" | "details">;

function kraftProduct(spec: KraftSpec): ProductData {
  return {
    ...spec,
    badges: ["KRAFT STOCK", "NATURAL PRINT", "BRANDS FACE STUDIO"],
    deals: KRAFT_DEALS,
    quantities: KRAFT_QUANTITIES,
    sizes: KRAFT_SIZES,
    deliveryEstimate: "10–18 business days",
    images: KRAFT_IMAGES,
  };
}

const KRAFT_SPECS: KraftSpec[] = [
  /* ── Core folding structures ── */
  {
    slug: "kraft-tuck-end",
    title: "Kraft Tuck End Box",
    description:
      "Natural kraft folding carton with front tuck — warm texture, recyclable story, and efficient hand or machine pack.",
    features: [
      { label: "Stock", value: "Uncoated kraft / kraft-lined SBS" },
      { label: "Closure", value: "Friction tuck — dust flaps optional" },
      { label: "Print", value: "Flexo 1–3 colour, black ink hero" },
      { label: "Finish", value: "Raw kraft or light aqueous coat" },
      { label: "Min. order", value: "250 pieces" },
      { label: "Lead time", value: "10–18 business days" },
    ],
    details:
      "Kraft tuck ends are the honest face of folding cartons. We tune tuck depth for your product weight and caliper.\n\nPair with bold black or single Pantone for Scandinavian minimalism.\n\nIdeal for wellness, food adjacency, and conscious brands.",
  },
  {
    slug: "kraft-reverse-tuck-end",
    title: "Kraft Reverse Tuck End Box",
    description:
      "Opposing tucks on kraft — balanced retail opening and clean hand pack for shelf and DTC.",
    features: [
      { label: "Structure", value: "Reverse tuck on kraft" },
      { label: "Retail", value: "Facing panel hierarchy" },
      { label: "Print", value: "Continuous art across corners" },
      { label: "Feel", value: "Natural fibre texture visible" },
      { label: "Min. order", value: "250 pieces" },
      { label: "Lead time", value: "10–18 business days" },
    ],
    details:
      "Reverse tuck ends on kraft read premium without gloss. We align panel breaks to fibre direction.\n\nPopular for cosmetics and supplements where authenticity matters.\n\nDiscuss aqueous coating if handling is heavy.",
  },
  {
    slug: "kraft-straight-tuck-end",
    title: "Kraft Straight Tuck End Box",
    description:
      "Same-side tucks — machine-friendly and hero-face friendly on natural stock.",
    features: [
      { label: "Structure", value: "Straight tuck — same edge closures" },
      { label: "Fill", value: "Semi-auto and manual lines" },
      { label: "Print", value: "Large brand block on kraft" },
      { label: "Stock", value: "250–400 gsm typical" },
      { label: "Min. order", value: "250 pieces" },
      { label: "Lead time", value: "10–18 business days" },
    ],
    details:
      "Straight tuck kraft cartons maximise one primary face for logo and story.\n\nWe engineer tuck interference for your line speed.\n\nCommon for tea, dry goods, and apothecary.",
  },
  {
    slug: "kraft-auto-lock-bottom",
    title: "Kraft Auto Lock Bottom Box",
    description:
      "Pop-open kraft base — quick assembly with an organic look for bottles, jars, and sets.",
    features: [
      { label: "Base", value: "Auto-lock on kraft board" },
      { label: "Assembly", value: "Erect in seconds" },
      { label: "Print", value: "Interior contrast optional" },
      { label: "Load", value: "Sized to bottle weight" },
      { label: "Min. order", value: "250 pieces" },
      { label: "Lead time", value: "10–18 business days" },
    ],
    details:
      "Auto lock bottoms on kraft give subscription and retail warmth without plastic.\n\nWe validate burst strength for your fill mass.\n\nPair with kraft inserts for glass.",
  },
  {
    slug: "kraft-crash-lock-bottom",
    title: "Kraft Crash Lock Bottom Box",
    description:
      "High-speed crash base on natural stock — throughput with an earthy presentation.",
    features: [
      { label: "Base", value: "Crash lock — rapid erect" },
      { label: "Throughput", value: "Volume pack-out" },
      { label: "Strength", value: "Corner keys to weight class" },
      { label: "Print", value: "Large panel billboards" },
      { label: "Min. order", value: "500 pieces" },
      { label: "Lead time", value: "10–18 business days" },
    ],
    details:
      "Crash lock kraft suits busy fulfilment with brand warmth.\n\nWe prototype assembly feel for operator consistency.\n\nIdeal for beverage, pantry, and refill programs.",
  },
  {
    slug: "kraft-sleeve",
    title: "Kraft Sleeve Box",
    description:
      "Kraft slipcase over trays or bundles — seasonal sleeves on one inner investment.",
    features: [
      { label: "Format", value: "Sleeve over tray, bundle, or bottle" },
      { label: "Campaigns", value: "Swap sleeves seasonally" },
      { label: "Clearance", value: "Slide tuned to kraft friction" },
      { label: "Print", value: "Full-wrap flexo or litho label" },
      { label: "Min. order", value: "250 pieces" },
      { label: "Lead time", value: "10–18 business days" },
    ],
    details:
      "Kraft sleeves add narrative without plastic. We control grain and varnish for smooth pull.\n\nStrong for natural beauty and food gifting.\n\nPair with white or black ink for contrast.",
  },
  {
    slug: "kraft-drawer",
    title: "Kraft Drawer Box",
    description:
      "Slide-out drawer in kraft — tactile pull and giftable rhythm on natural paper.",
    features: [
      { label: "Structure", value: "Sleeve + drawer tray" },
      { label: "Pull", value: "Ribbon, thumb notch, or tab" },
      { label: "Print", value: "Exterior / interior storytelling" },
      { label: "Interior", value: "Kraft or contrast inserts" },
      { label: "Min. order", value: "250 pieces" },
      { label: "Lead time", value: "12–20 business days" },
    ],
    details:
      "Kraft drawers feel artisanal. We calibrate glide and stop for your product.\n\nUse for curated kits, tea, and gift programs.\n\nOptional foil on kraft for quiet luxury.",
  },
  {
    slug: "kraft-window",
    title: "Kraft Window Box",
    description:
      "PET or RPET window on kraft — product visibility with a natural frame.",
    features: [
      { label: "Window", value: "Film patch on uncoated stock" },
      { label: "Adhesion", value: "Primers tested for kraft" },
      { label: "Retail", value: "Facing visibility" },
      { label: "Print", value: "Window surround branding" },
      { label: "Min. order", value: "250 pieces" },
      { label: "Lead time", value: "12–20 business days" },
    ],
    details:
      "Windows on kraft need honest adhesive testing — we prototype before scale.\n\nPopular for soaps, bars, and confectionery.\n\nRPET options for recycled content stories.",
  },
  {
    slug: "kraft-pillow",
    title: "Kraft Pillow Box",
    description:
      "Curved kraft pillow — minimal material for accessories, samples, and small gifts.",
    features: [
      { label: "Structure", value: "Pillow die — glue closure" },
      { label: "SKU", value: "Light contents" },
      { label: "Print", value: "All-over pattern friendly" },
      { label: "Retail", value: "Hang hole options" },
      { label: "Min. order", value: "500 pieces" },
      { label: "Lead time", value: "10–18 business days" },
    ],
    details:
      "Kraft pillows are charming and efficient. We size curve radius for fibre cracking limits.\n\nGreat for samples, jewellery, and event kits.\n\nPair with belly bands for tiers.",
  },
  {
    slug: "kraft-two-piece",
    title: "Kraft Two-Piece Box",
    description:
      "Telescope lid + base in kraft — giftable depth without plastic gloss.",
    features: [
      { label: "Structure", value: "Telescope lid over base" },
      { label: "Reveal", value: "Step height tuned to product" },
      { label: "Print", value: "Interior flood optional" },
      { label: "Inserts", value: "Kraft or natural pulp platforms" },
      { label: "Min. order", value: "250 pieces" },
      { label: "Lead time", value: "12–20 business days" },
    ],
    details:
      "Two-piece kraft sets read premium and grounded. We calibrate lid slip.\n\nIdeal for gift sets, limited drops, and retail gifting.\n\nCombine with foil or deboss for tactility.",
  },

  /* ── Use-case based ── */
  {
    slug: "kraft-soap",
    title: "Kraft Soap Boxes",
    description:
      "Bars and sets — grease-aware coatings, venting, and rustic or apothecary aesthetics.",
    features: [
      { label: "Barrier", value: "Grease-resistant options" },
      { label: "Vent", value: "Natural bar strategies" },
      { label: "Print", value: "Ingredient and scent story" },
      { label: "Retail", value: "Hang tab or window" },
      { label: "Min. order", value: "500 pieces" },
      { label: "Lead time", value: "10–18 business days" },
    ],
    details:
      "Soap and kraft are a classic pairing. We select coatings for oil migration honestly.\n\nWindows show colour and texture.\n\nBuilt for handmade, spa, and mass natural lines.",
  },
  {
    slug: "kraft-skincare",
    title: "Kraft Skincare Boxes",
    description:
      "Tubes, jars, and ampoules — panels for claims and natural brand tone on kraft.",
    features: [
      { label: "Layout", value: "Multi-SKU wells + compliance" },
      { label: "Insert", value: "Kraft, pulp, or light foam" },
      { label: "Print", value: "Small-type legibility on kraft" },
      { label: "Finish", value: "Light coat for handling" },
      { label: "Min. order", value: "250 pieces" },
      { label: "Lead time", value: "10–18 business days" },
    ],
    details:
      "Skincare on kraft reads clean and honest. We plan microcopy contrast.\n\nTray heights for droppers and pumps.\n\nSuited to clean beauty and DTC regimens.",
  },
  {
    slug: "kraft-cosmetics",
    title: "Kraft Cosmetics Boxes",
    description:
      "Colour cosmetics on natural stock — bold ink on brown, or litho upgrade for photography.",
    features: [
      { label: "Contrast", value: "Black / white / metallic on kraft" },
      { label: "Partitions", value: "Pans and minis" },
      { label: "Retail", value: "Shelf-ready faces" },
      { label: "Upgrade", value: "Litho label for hero art" },
      { label: "Min. order", value: "250 pieces" },
      { label: "Lead time", value: "10–18 business days" },
    ],
    details:
      "Kraft cosmetics lean editorial. We manage scuff in retail handling.\n\nSleeves rotate campaigns.\n\nStrong for indie colour brands.",
  },
  {
    slug: "kraft-makeup",
    title: "Kraft Makeup Boxes",
    description:
      "Palettes and kits — shallow depths, mirror options, and refill-friendly kraft layouts.",
    features: [
      { label: "Depth", value: "Shallow trays for palettes" },
      { label: "Mirror", value: "Optional mirror well" },
      { label: "Print", value: "Shade names and finish callouts" },
      { label: "Inserts", value: "Paper or moulded" },
      { label: "Min. order", value: "250 pieces" },
      { label: "Lead time", value: "12–20 business days" },
    ],
    details:
      "Makeup kits need precision — we align wells to pan geometry.\n\nKraft gives a pro-artisan vibe for pro and collab lines.\n\nMirror integration specified for scratch-free arrival.",
  },
  {
    slug: "kraft-perfume",
    title: "Kraft Perfume Boxes",
    description:
      "Fragrance-grade kraft — bottle maps, collar clearance, and premium foil strategies on natural board.",
    features: [
      { label: "Fit", value: "Bottle CAD and weight" },
      { label: "Finish", value: "Foil, deboss, soft-touch hybrid" },
      { label: "Insert", value: "Kraft, pulp, or foam" },
      { label: "Retail", value: "Gift corridor presence" },
      { label: "Min. order", value: "250 pieces" },
      { label: "Lead time", value: "12–20 business days" },
    ],
    details:
      "Perfume on kraft is niche-house friendly. We engineer retention and drop scenarios.\n\nFoil on kraft requires testing — we sample first.\n\nIdeal for indie fragrance and travel formats.",
  },
  {
    slug: "kraft-essential-oil",
    title: "Kraft Essential Oil Boxes",
    description:
      "Small bottles and rollers — compliance copy, oil-safe finishes, botanical art.",
    features: [
      { label: "Layout", value: "Wells and finger lifts" },
      { label: "Compliance", value: "Dilution & usage panels" },
      { label: "Coating", value: "Oil-tolerant where needed" },
      { label: "Print", value: "Botanical storytelling" },
      { label: "Min. order", value: "250 pieces" },
      { label: "Lead time", value: "10–18 business days" },
    ],
    details:
      "Essential oil packs need small-format discipline and honest oil resistance.\n\nKraft reinforces natural positioning.\n\nSuited to wellness and apothecary.",
  },
  {
    slug: "kraft-candle",
    title: "Kraft Candle Boxes",
    description:
      "Jar and tin protection — kraft warmth with burn instructions and gift-ready structure.",
    features: [
      { label: "Clearance", value: "Lid and jar diameter" },
      { label: "Protection", value: "Corner buffers" },
      { label: "Print", value: "Safety and scent notes" },
      { label: "Gift", value: "Ribbon-ready lids optional" },
      { label: "Min. order", value: "250 pieces" },
      { label: "Lead time", value: "10–18 business days" },
    ],
    details:
      "Candles on kraft feel artisanal. We engineer for weight and fragility.\n\nCopy panels for safety and brand story.\n\nHome fragrance and seasonal gifting.",
  },
  {
    slug: "kraft-gift",
    title: "Kraft Gift Boxes",
    description:
      "Occasion-ready folding cartons — ribbon, window, and two-piece options in natural paper.",
    features: [
      { label: "Formats", value: "Tuck, telescope, sleeve + tray" },
      { label: "Seasonal", value: "Sleeve campaigns" },
      { label: "Print", value: "Foil, emboss, spot contrast" },
      { label: "Inserts", value: "Natural pulp platforms" },
      { label: "Min. order", value: "250 pieces" },
      { label: "Lead time", value: "12–20 business days" },
    ],
    details:
      "Gift kraft is emotion without plastic shine. We balance protection with unboxing.\n\nQ4 and corporate gifting.\n\nPair with branded tissue for layers.",
  },
  {
    slug: "kraft-food",
    title: "Kraft Food Boxes",
    description:
      "Bakery, dry goods, and meal adjacency — food-grade barriers and grease strategies on kraft.",
    features: [
      { label: "Safety", value: "Food-grade coatings / liners" },
      { label: "Grease", value: "Barrier boards for fried / oily" },
      { label: "Print", value: "Ingredient and nutrition zones" },
      { label: "Vent", value: "Hot product where relevant" },
      { label: "Min. order", value: "500 pieces" },
      { label: "Lead time", value: "10–20 business days" },
    ],
    details:
      "Food kraft must match jurisdiction. We involve compliance early.\n\nKraft reads artisan for bakery and specialty.\n\nDiscuss moisture for hot fills.",
  },
  {
    slug: "kraft-retail",
    title: "Kraft Retail Boxes",
    description:
      "Shelf-facing kraft — planogram dimensions, hang tabs, and retail scuff resistance.",
    features: [
      { label: "Retail", value: "Facing hierarchy and hang tabs" },
      { label: "Scuff", value: "Light aqueous or varnish" },
      { label: "Print", value: "High-contrast ink on kraft" },
      { label: "Stack", value: "Compression for shelf weight" },
      { label: "Min. order", value: "250 pieces" },
      { label: "Lead time", value: "10–18 business days" },
    ],
    details:
      "Retail kraft stands out in aisles of white. We tune for handling and stack.\n\nHang tabs and windows for visibility.\n\nMass natural and club retail.",
  },

  /* ── Premium / variation ── */
  {
    slug: "kraft-printed",
    title: "Printed Kraft Boxes",
    description:
      "High-coverage flexo and litho on kraft — managing dot gain and colour on natural fibre.",
    features: [
      { label: "Print", value: "Flexo direct or litho label / laminate" },
      { label: "Colour", value: "Pantone + ink density on brown" },
      { label: "Coverage", value: "Solid fields and fine type" },
      { label: "Proofing", value: "Drawdowns on live stock" },
      { label: "Min. order", value: "250 pieces" },
      { label: "Lead time", value: "10–18 business days" },
    ],
    details:
      "Printed kraft is a craft — fibre shows through. We calibrate ink for your brand.\n\nWhite ink and dense blacks are common heroes.\n\nCore to Brands Face natural programs.",
  },
  {
    slug: "kraft-foiled",
    title: "Foiled Kraft Boxes",
    description:
      "Hot foil on kraft — metallic warmth that respects natural board texture.",
    features: [
      { label: "Foil", value: "Gold, copper, matte metallic" },
      { label: "Adhesion", value: "Tested on kraft caliper" },
      { label: "Art", value: "Vector foil masks" },
      { label: "Pairing", value: "Works with deboss" },
      { label: "Min. order", value: "250 pieces" },
      { label: "Lead time", value: "12–20 business days" },
    ],
    details:
      "Foil on kraft is jewellery for packaging. We test adhesion on your exact stock.\n\nPopular for fragrance, gifting, and limited drops.\n\nQuiet luxury with a metallic flash.",
  },
  {
    slug: "kraft-embossed",
    title: "Embossed Kraft Boxes",
    description:
      "Blind emboss on uncoated stock — deep fibre compression and tactile logos.",
    features: [
      { label: "Tooling", value: "Magnesium / brass by detail" },
      { label: "Stock", value: "Caliper limits reviewed" },
      { label: "Effects", value: "Blind or foil-registered" },
      { label: "Art", value: "Minimum line weights" },
      { label: "Min. order", value: "250 pieces" },
      { label: "Lead time", value: "14–22 business days" },
    ],
    details:
      "Emboss on kraft feels honest. We review art for crush on folds.\n\nCombine with soft-touch hybrid for contrast.\n\nExcellent for monograms and crests.",
  },
  {
    slug: "kraft-matte",
    title: "Matte Kraft Boxes",
    description:
      "Soft-touch or matte aqueous on kraft — fingerprint friendliness while keeping fibre visible.",
    features: [
      { label: "Finish", value: "Soft-touch / matte aqueous" },
      { label: "Feel", value: "Velvety with fibre ghost" },
      { label: "Print", value: "Pairs with foil and emboss" },
      { label: "Care", value: "Handling notes for fulfilment" },
      { label: "Min. order", value: "250 pieces" },
      { label: "Lead time", value: "10–18 business days" },
    ],
    details:
      "Matte kraft bridges premium and natural. We specify coat weight for fold.\n\nSampling recommended — hand-feel varies by stock.\n\nWellness and lifestyle favourite.",
  },
  {
    slug: "kraft-gloss",
    title: "Gloss Kraft Boxes",
    description:
      "Spot or overall gloss on kraft — selective shine for logos and panels without full plastic gloss.",
    features: [
      { label: "Finish", value: "Gloss UV / gloss aqueous" },
      { label: "Contrast", value: "Matte kraft + gloss logo" },
      { label: "Retail", value: "Shelf pop" },
      { label: "Print", value: "Registered to art" },
      { label: "Min. order", value: "250 pieces" },
      { label: "Lead time", value: "12–20 business days" },
    ],
    details:
      "Gloss on kraft creates contrast — not full cello. We manage scuff resistance.\n\nPopular for logo locks and pattern highlights.\n\nPair with matte field for editorial.",
  },
  {
    slug: "kraft-with-inserts",
    title: "Kraft Boxes with Inserts",
    description:
      "Paper, pulp, and light foam inserts — retention and unboxing on natural shells.",
    features: [
      { label: "Inserts", value: "Kraft, moulded pulp, EVA" },
      { label: "CAD", value: "Product-driven cavities" },
      { label: "Sustainability", value: "Paper-first paths" },
      { label: "Pairing", value: "Any tuck, sleeve, telescope" },
      { label: "Min. order", value: "250 pieces" },
      { label: "Lead time", value: "12–22 business days" },
    ],
    details:
      "Inserts make kraft predictive. We drop-test the full system.\n\nPulp aligns with eco stories.\n\nEssential for glass, sets, and electronics adjacency.",
  },
  {
    slug: "kraft-recycled",
    title: "Recycled Kraft Boxes",
    description:
      "High post-consumer content — documented recycled fibre and recyclability at end of life.",
    features: [
      { label: "Content", value: "PCW / PCC tiers documented" },
      { label: "Colour", value: "Shade variance expectations set" },
      { label: "Print", value: "Ink systems compatible" },
      { label: "Claims", value: "Messaging support" },
      { label: "Min. order", value: "250 pieces" },
      { label: "Lead time", value: "10–18 business days" },
    ],
    details:
      "Recycled kraft varies in shade — we set expectations in proofs.\n\nIdeal for brands with credible circular stories.\n\nWe avoid greenwashing with clear documentation.",
  },
  {
    slug: "kraft-eco-friendly",
    title: "Eco-Friendly Kraft Boxes",
    description:
      "Water-based inks, compostable windows where feasible, plastic reduction, and right-sizing.",
    features: [
      { label: "Ink", value: "Water-based flexo programs" },
      { label: "Materials", value: "FSC kraft options" },
      { label: "Void", value: "Paper fill strategies" },
      { label: "Design", value: "Right-size to reduce waste" },
      { label: "Min. order", value: "250 pieces" },
      { label: "Lead time", value: "10–18 business days" },
    ],
    details:
      "Eco-friendly kraft is holistic — stock, ink, inserts, and fulfilment cube.\n\nWe optimise for your actual supply chain.\n\nBrands Face alignment for values-led brands.",
  },
];

export const KRAFT_PRODUCTS: Record<string, ProductData> = Object.fromEntries(
  KRAFT_SPECS.map((spec) => [spec.slug, kraftProduct(spec)]),
) as Record<string, ProductData>;
