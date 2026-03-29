import type { ProductData } from "@/components/product/ProductInfo";

const RIGID_IMAGES = [
  "/products/rigid-1.jpg",
  "/products/rigid-2.jpg",
  "/products/rigid-3.jpg",
];

const RIGID_QUANTITIES: ProductData["quantities"] = [
  { qty: 50, pricePerPiece: 3.5, total: 175.0 },
  { qty: 100, pricePerPiece: 2.9, total: 290.0 },
  { qty: 250, pricePerPiece: 2.4, total: 600.0 },
  { qty: 500, pricePerPiece: 1.95, total: 975.0 },
];

const RIGID_SIZES: ProductData["sizes"] = [
  { label: "Compact", dimensions: "From 8 × 8 × 4 cm" },
  { label: "Standard", dimensions: "From 15 × 15 × 8 cm" },
  { label: "Large format", dimensions: "From 25 × 20 × 12 cm" },
  { label: "Fully custom", dimensions: "Built to your product dimensions" },
];

const RIGID_DEALS: ProductData["deals"] = [
  {
    title: "Rigid line — complimentary structural review",
    description:
      "Our packaging engineers review closure mechanics, board weight, and insert strategy with you before tooling — so the box fits your product and brand story.",
    code: "RIGIDREVIEW",
  },
  {
    title: "Premium finishing sampler on first order",
    description:
      "Explore soft-touch wrap, foil, or emboss options on your first rigid run with guided samples from our studio team.",
    code: "RIGIDFINISH",
  },
];

type RigidSpec = Pick<ProductData, "slug" | "title" | "description" | "features" | "details">;

function rigidProduct(spec: RigidSpec): ProductData {
  return {
    ...spec,
    badges: ["PREMIUM RIGID", "CUSTOM STRUCTURE", "BRANDS FACE STUDIO"],
    deals: RIGID_DEALS,
    quantities: RIGID_QUANTITIES,
    sizes: RIGID_SIZES,
    deliveryEstimate: "14–22 business days",
    images: RIGID_IMAGES,
  };
}

const RIGID_SPECS: RigidSpec[] = [
  /* ── Core structures ── */
  {
    slug: "rigid-magnetic-closure",
    title: "Magnetic Closure Rigid Box",
    description:
      "A flagship presentation format with concealed magnets and a clean reveal — ideal for luxury retail, subscriptions, and unboxing moments that need to feel effortless.",
    features: [
      { label: "Structure", value: "Wrapped rigid board, magnetic flap closure" },
      { label: "Magnets", value: "Concealed neodymium — custom placement" },
      { label: "Print", value: "Full CMYK + spot / white" },
      { label: "Finish", value: "Soft-touch, matte, gloss, or foil lamination" },
      { label: "Min. order", value: "50 pieces" },
      { label: "Lead time", value: "14–22 business days" },
    ],
    details:
      "Magnetic closure rigid boxes are the backbone of premium product presentation. We engineer flap depth, magnet pull strength, and wrap tension so the lid seats perfectly — run after run.\n\nPair with foam, velvet, or paper inserts for cosmetics, tech, spirits, and gifts. Our studio aligns artwork to live edges and corner radius so your brand reads sharp at shelf and on camera.\n\nBest for Brands Face clients who want a focused, high-end line: flagship SKUs, limited drops, and influencer kits where first open matters.",
  },
  {
    slug: "rigid-drawer-slide-out",
    title: "Drawer / Slide-Out Rigid Box",
    description:
      "Slide-out drawer mechanics with a tactile pull — perfect for curated kits, jewelry, and products where discovery should feel deliberate and premium.",
    features: [
      { label: "Structure", value: "Outer sleeve + inner drawer tray" },
      { label: "Pull", value: "Ribbon, thumb notch, or metal pull tab" },
      { label: "Print", value: "Exterior / interior full colour" },
      { label: "Fit", value: "Tuned slide resistance & stop" },
      { label: "Min. order", value: "50 pieces" },
      { label: "Lead time", value: "14–22 business days" },
    ],
    details:
      "Drawer rigid boxes turn unboxing into a ritual. We calibrate sleeve clearance and drawer glide so movement feels smooth — never loose or sticky.\n\nUse for tiered kits, sampling programs, or retail sets where the inner tray can be lifted for display. Inserts and partitions keep every SKU in place during shipping.\n\nA strong choice when you want structure-forward packaging without a traditional hinged lid.",
  },
  {
    slug: "rigid-lift-off-lid",
    title: "Lift-Off Lid Rigid Box",
    description:
      "Classic two-part construction with a telescoping lid — clean lines, maximum billboard space, and a satisfying lift for high-end gifts and retail.",
    features: [
      { label: "Structure", value: "Separate base + lift-off lid" },
      { label: "Depth", value: "Telescope or flush lip profiles" },
      { label: "Print", value: "Wrap + edge-to-edge art options" },
      { label: "Stacking", value: "Optional nesting for fulfilment" },
      { label: "Min. order", value: "50 pieces" },
      { label: "Lead time", value: "14–22 business days" },
    ],
    details:
      "Lift-off lid boxes offer maximum surface for brand storytelling on the lid and base. We engineer lid overhang and finger clearance for a comfortable open without marring the wrap.\n\nIdeal for apparel gifts, premium consumables, and presentation sets where the lid can be reused or displayed.\n\nCombine with shoulder platforms or platform inserts for a staged product reveal.",
  },
  {
    slug: "rigid-shoulder-neck",
    title: "Shoulder Neck Rigid Box",
    description:
      "Interior shoulder creates a refined step-down reveal — the lid appears to float while the product sits proud for photography and retail.",
    features: [
      { label: "Structure", value: "Base + shoulder + lid (neck reveal)" },
      { label: "Reveal", value: "Configurable step height & contrast wrap" },
      { label: "Print", value: "Interior contrast panels optional" },
      { label: "Inserts", value: "Foam / paper / molded fit" },
      { label: "Min. order", value: "50 pieces" },
      { label: "Lead time", value: "16–24 business days" },
    ],
    details:
      "Shoulder neck rigid boxes are a Brands Face favourite for luxury positioning. The visible neck line frames the product and adds depth to unboxing content.\n\nWe tune shoulder width so the lid slides without binding, and align interior colours for a gallery-like presentation.\n\nExcellent for fragrance, skincare heroes, and single-SKU premium launches.",
  },
  {
    slug: "rigid-book-style",
    title: "Book-Style Rigid Box",
    description:
      "Hinged spine and book-like opening — narrative-friendly packaging for storytelling, press kits, and multi-panel brand experiences.",
    features: [
      { label: "Structure", value: "Hinged spine, lay-flat or shallow depth" },
      { label: "Panels", value: "Optional fold-out flaps or sleeves" },
      { label: "Print", value: "Continuous art across spine optional" },
      { label: "Closure", value: "Magnet, elastic, or ribbon tie" },
      { label: "Min. order", value: "50 pieces" },
      { label: "Lead time", value: "16–24 business days" },
    ],
    details:
      "Book-style rigids behave like a bound volume — perfect when you want packaging to feel editorial. We reinforce the spine and hinge cycle for repeated opens.\n\nUse for PR kits, founder stories, certificate presentation, or retail sets with layered inserts.\n\nPair with debossed titles or foil spine type for a true collectable feel.",
  },
  {
    slug: "rigid-hinged-lid",
    title: "Hinged Lid Rigid Box",
    description:
      "Single-body hinged lid with retail-friendly closure — strong structure for heavier products and frequent opening at counter or home.",
    features: [
      { label: "Structure", value: "One-piece base + hinged lid" },
      { label: "Hinge", value: "Tape-reinforced or cloth hinge options" },
      { label: "Closure", value: "Magnet, hook & loop, or tuck" },
      { label: "Print", value: "Inside-out print available" },
      { label: "Min. order", value: "50 pieces" },
      { label: "Lead time", value: "14–22 business days" },
    ],
    details:
      "Hinged lid rigids balance durability with ceremony. We specify board weight and hinge reinforcement based on product mass and open frequency.\n\nSuited to electronics accessories, wellness devices, and gift sets that stay on display after purchase.\n\nOptional elastic bands or ribbon keeps help when shipping without outer mailers.",
  },
  {
    slug: "rigid-two-piece",
    title: "Two-Piece Rigid Box",
    description:
      "Minimal base + lid separation — economical premium look with fast packing workflows for e-commerce and retail replenishment.",
    features: [
      { label: "Structure", value: "Telescope or shallow lid variants" },
      { label: "Assembly", value: "Fast pack — lid seats by alignment pins" },
      { label: "Print", value: "Full wrap, spot UV, or foil" },
      { label: "Depth", value: "Tuned for insert + product stack" },
      { label: "Min. order", value: "50 pieces" },
      { label: "Lead time", value: "14–22 business days" },
    ],
    details:
      "Two-piece rigids are the workhorse of premium packaging — simple, reliable, and easy to scale. We optimise lid depth for your insert stack height so nothing rattles.\n\nGreat for brands balancing fulfilment speed with shelf presence. Add sleeves or belly bands for seasonal campaigns without retooling the base box.",
  },
  {
    slug: "rigid-collapsible",
    title: "Collapsible Rigid Box",
    description:
      "Fold-flat rigid that assembles to full strength — lower inbound freight and storage while keeping a luxury unboxing on arrival.",
    features: [
      { label: "Structure", value: "Fold-flat corners, taped or magnetic assembly" },
      { label: "Freight", value: "Ships knocked-down; assembles in seconds" },
      { label: "Print", value: "Pre-wrapped panels before folding" },
      { label: "Strength", value: "Corner keys specified to your weight class" },
      { label: "Min. order", value: "100 pieces" },
      { label: "Lead time", value: "18–26 business days" },
    ],
    details:
      "Collapsible rigids solve warehousing and import cost without giving up the rigid feel. We design corner keys and tape paths so operators can assemble consistently.\n\nIdeal for growing DTC brands and global fulfilment where cube matters.\n\nWe validate assembled compression for your product weight class before production.",
  },
  {
    slug: "rigid-ribbon-pull",
    title: "Ribbon Pull Rigid Box",
    description:
      "Integrated ribbon lift for lids or drawers — tactile, photogenic, and gift-ready without extra packing steps.",
    features: [
      { label: "Ribbon", value: "Grosgrain, satin, or brand-dyed cotton" },
      { label: "Anchor", value: "Reinforced anchor points — no tear-out" },
      { label: "Structure", value: "Pairs with lift-off, drawer, or hinged bases" },
      { label: "Print", value: "Foil-stamped ribbon tags optional" },
      { label: "Min. order", value: "50 pieces" },
      { label: "Lead time", value: "14–22 business days" },
    ],
    details:
      "Ribbon pulls add a human, giftable gesture to rigid packaging. We engineer anchor strength and ribbon length for your box depth and product weight.\n\nPopular for holiday lines, bridal, and premium skincare gifting.\n\nColour-match ribbon to Pantone for a fully on-brand unboxing.",
  },
  {
    slug: "rigid-sleeve-tray",
    title: "Sleeve & Tray Rigid Box",
    description:
      "Outer printed sleeve over a rigid tray — swap sleeves for seasons while keeping one tray system for SKU efficiency.",
    features: [
      { label: "Structure", value: "Slipcase sleeve + inner rigid tray" },
      { label: "Campaigns", value: "Interchangeable sleeve artwork" },
      { label: "Tray", value: "Window cutouts or blind cover" },
      { label: "Print", value: "High-coverage sleeve + tray contrast" },
      { label: "Min. order", value: "50 pieces" },
      { label: "Lead time", value: "14–22 business days" },
    ],
    details:
      "Sleeve and tray systems give you flexibility: one tray investment, many sleeve looks for drops and regions.\n\nWe control sleeve clearance for smooth slide and scuff resistance on high-gloss art.\n\nStrong for cosmetics lines, tea and coffee sets, and curated gift programs.",
  },

  /* ── Use-case based ── */
  {
    slug: "rigid-perfume",
    title: "Perfume Rigid Boxes",
    description:
      "Fragrance-grade rigids with insert discipline — bottle stability, collar clearance, and finishes that read luxury under glass counters and studio lighting.",
    features: [
      { label: "Fit", value: "Bottle neck, collar, and pump clearance" },
      { label: "Insert", value: "Foam, satin wrap, or vacuum form" },
      { label: "Finish", value: "Soft-touch, metallic wrap, foil logo" },
      { label: "Compliance", value: "Weight-tested for glass bottle classes" },
      { label: "Min. order", value: "50 pieces" },
      { label: "Lead time", value: "14–22 business days" },
    ],
    details:
      "Perfume packaging has zero tolerance for movement — we prototype around your bottle CAD and weight distribution.\n\nExterior treatments are tuned for fingerprint resistance and counter display.\n\nIdeal for niche houses, travel sizes, and gift coffrets with multiple flacons.",
  },
  {
    slug: "rigid-skincare",
    title: "Skincare Rigid Boxes",
    description:
      "Serum sets, jars, and ampoule programs — rigids sized for pumps, droppers, and regulatory copy panels without crowding the art.",
    features: [
      { label: "Layout", value: "Multi-SKU wells + literature pocket" },
      { label: "Insert", value: "Paper, EVA, or molded pulp options" },
      { label: "Print", value: "Interior ingredient storytelling panels" },
      { label: "Finish", value: "Moisture-tolerant lamination where needed" },
      { label: "Min. order", value: "50 pieces" },
      { label: "Lead time", value: "14–22 business days" },
    ],
    details:
      "Skincare rigids balance regulation, education, and desire. We plan panel hierarchy so mandatory copy and hero visuals coexist.\n\nTray heights account for droppers, airless pumps, and jar lids.\n\nBuilt for DTC regimens, spa retail, and limited-edition drops.",
  },
  {
    slug: "rigid-cosmetics-gift-set",
    title: "Cosmetics Gift Set Rigid Boxes",
    description:
      "Curated colour stories and giftable compositions — partitions, windows, and layered reveals for holiday and GWP programs.",
    features: [
      { label: "Composition", value: "Partitions for pans, sticks, minis" },
      { label: "Reveal", value: "Window, ribbon, or staged lift layers" },
      { label: "Print", value: "Seasonal sleeves or permanent branding" },
      { label: "Retail", value: "Hang-tab or stackable base options" },
      { label: "Min. order", value: "50 pieces" },
      { label: "Lead time", value: "16–24 business days" },
    ],
    details:
      "Gift sets need to look abundant without chaos. We design partition maps that keep every SKU visible and secure.\n\nOptional outer sleeves let you rotate campaigns on one tray architecture.\n\nPerfect for holiday coffrets, influencer mailers, and counter displays.",
  },
  {
    slug: "rigid-makeup-kit",
    title: "Makeup Kit Rigid Boxes",
    description:
      "Palettes, brushes, and refill stories — rigids engineered for shallow depths, mirror clearance, and refill-friendly layouts.",
    features: [
      { label: "Depth", value: "Shallow trays for palettes & tools" },
      { label: "Mirror", value: "Optional mirror well & protective film" },
      { label: "Refill", value: "Magnetic pans or modular wells" },
      { label: "Print", value: "Shade names & finish callouts" },
      { label: "Min. order", value: "50 pieces" },
      { label: "Lead time", value: "16–24 business days" },
    ],
    details:
      "Makeup kits demand precision — we align wells to pan geometry and brush lengths so nothing shifts in transit.\n\nMirror integration and protective films are specified for scratch-free arrival.\n\nSuited to pro kits, collab launches, and education sets.",
  },
  {
    slug: "rigid-jewelry",
    title: "Jewelry Rigid Boxes",
    description:
      "Soft interiors, anti-tarnish considerations, and delicate product cradles — rigids that feel like a vault and a jewel case at once.",
    features: [
      { label: "Interior", value: "Velvet, suede, or flocked inserts" },
      { label: "Fit", value: "Ring, pendant, bracelet, or earring maps" },
      { label: "Finish", value: "Jewellery-safe adhesives & wraps" },
      { label: "Display", value: "Convertible lid props optional" },
      { label: "Min. order", value: "50 pieces" },
      { label: "Lead time", value: "14–22 business days" },
    ],
    details:
      "Jewelry rigids protect sentiment and margin. We specify insert density and fabric wrap so metals and stones do not contact abrasive surfaces.\n\nScale from single-piece gifts to multi-SKU sets.\n\nIdeal for fine fashion, demi-fine, and commemorative drops.",
  },
  {
    slug: "rigid-candle",
    title: "Candle Rigid Boxes",
    description:
      "Heat-aware spacing, jar clearance, and gift-forward structure — premium rigids for single wicks, trios, and accessory bundles.",
    features: [
      { label: "Clearance", value: "Lid / jar diameter & height tuned" },
      { label: "Protection", value: "Shock pads and corner buffers" },
      { label: "Scent", value: "Optional interior varnish for fragrance oils" },
      { label: "Print", value: "Burn instruction panels" },
      { label: "Min. order", value: "50 pieces" },
      { label: "Lead time", value: "14–22 business days" },
    ],
    details:
      "Candles stress packaging with weight and fragility. We engineer base crush strength and insert grip for glass jars.\n\nCopy panels for safety and scent notes are built into the layout.\n\nGreat for home fragrance brands and seasonal gifting.",
  },
  {
    slug: "rigid-apparel-gift",
    title: "Apparel Gift Rigid Boxes",
    description:
      "Folded garment depth, tissue stories, and lid clearance — rigids that protect drape and feel high-end at unboxing.",
    features: [
      { label: "Depth", value: "Sized for fold stacks & tissue" },
      { label: "Interior", value: "Ribbon ties or paper bands optional" },
      { label: "Print", value: "Large-format fashion imagery" },
      { label: "Retail", value: "Stackable bases for shelf" },
      { label: "Min. order", value: "50 pieces" },
      { label: "Lead time", value: "14–22 business days" },
    ],
    details:
      "Apparel gifts need generous volume without a sloppy fit. We map depth to your fold protocol and optional certificate pockets.\n\nWorks for knitwear, silk, caps, and premium basics.\n\nPair with magnetic or ribbon closure for a boutique feel.",
  },
  {
    slug: "rigid-electronics",
    title: "Electronics Rigid Boxes",
    description:
      "Device-centric rigids with ESD-aware insert options, cable wells, and quick-scan unboxing for premium peripherals.",
    features: [
      { label: "Insert", value: "Foam, molded pulp, or paper engineering" },
      { label: "Layout", value: "Device, cable, and doc wells" },
      { label: "Print", value: "Spec callouts & regulatory zones" },
      { label: "Protection", value: "Drop scenarios reviewed with weight class" },
      { label: "Min. order", value: "50 pieces" },
      { label: "Lead time", value: "16–24 business days" },
    ],
    details:
      "Electronics rigids must survive fulfilment and feel worthy of the chipset inside. We design insert retention and finger lifts for accessories.\n\nESD considerations are discussed for sensitive SKUs.\n\nIdeal for audio, wearables, and premium charging ecosystems.",
  },
  {
    slug: "rigid-pr-influencer-kit",
    title: "PR / Influencer Kit Rigid Boxes",
    description:
      "Share-worthy structure, layered storytelling, and room for press sheets — built for unboxing content and repeat opens on set.",
    features: [
      { label: "Story", value: "Layered reveals & panel sequencing" },
      { label: "Space", value: "Minis, full size, and note wells" },
      { label: "Print", value: "Hashtag & CTA panels optional" },
      { label: "Durability", value: "Hinge cycle suited to media handling" },
      { label: "Min. order", value: "50 pieces" },
      { label: "Lead time", value: "16–24 business days" },
    ],
    details:
      "PR kits are packaging as media. We sequence layers so creators capture each beat — from outer sleeve to hero product.\n\nSized for press releases, vouchers, and surprise inserts.\n\nA priority format for Brands Face when you want focused, premium launches.",
  },
  {
    slug: "rigid-luxury-hamper",
    title: "Luxury Hamper / Gift Rigid Boxes",
    description:
      "Deep formats, mixed SKU layouts, and carry handles — rigids that behave like hampers while staying photographable and retail-ready.",
    features: [
      { label: "Volume", value: "Deep base + reinforced corners" },
      { label: "Carry", value: "Ribbon, rope, or integrated handle" },
      { label: "Layout", value: "Mixed heights & partition maps" },
      { label: "Print", value: "Seasonal or permanent brand systems" },
      { label: "Min. order", value: "50 pieces" },
      { label: "Lead time", value: "18–26 business days" },
    ],
    details:
      "Luxury hampers combine weight, variety, and gift emotion. We engineer corner strength and handle pull for real-world carrying.\n\nPartitions keep bottles, jars, and soft goods from colliding.\n\nPerfect for Q4, corporate gifting, and hospitality programs.",
  },

  /* ── Premium variations ── */
  {
    slug: "rigid-foam-insert",
    title: "Foam Insert Rigid Boxes",
    description:
      "CNC-routed or die-cut foam cradles — exact product silhouette, shock absorption, and a studio-clean presentation.",
    features: [
      { label: "Foam", value: "PE / PU grades by weight class" },
      { label: "Routing", value: "CAD-driven cavities & finger lifts" },
      { label: "Finish", value: "Flocked or bare foam surfaces" },
      { label: "Pairing", value: "Any rigid shell — magnetic, lift-off, drawer" },
      { label: "Min. order", value: "50 pieces" },
      { label: "Lead time", value: "16–24 business days" },
    ],
    details:
      "Foam insert rigids are the standard for protection and precision. We prototype from your 3D files or physical samples.\n\nIdeal for electronics, tools, fragrance, and collector editions.\n\nAmong the best premium pages for Brands Face when protection and perceived value must align.",
  },
  {
    slug: "rigid-velvet-insert",
    title: "Velvet Insert Rigid Boxes",
    description:
      "Plush wrapped platforms and cavities — jewellery-forward tactility and light absorption for reflective products.",
    features: [
      { label: "Wrap", value: "Velvet / suede on board or thermoformed" },
      { label: "Colour", value: "Brand-matched fabric swatches" },
      { label: "Fit", value: "Die-cut wells for trays and singles" },
      { label: "Shell", value: "Pairs with shoulder, lift-off, or book styles" },
      { label: "Min. order", value: "50 pieces" },
      { label: "Lead time", value: "16–24 business days" },
    ],
    details:
      "Velvet inserts signal heirloom quality. We specify nap direction and adhesive systems that stay clean on edges.\n\nUse for jewelry, medals, premium cosmetics, and keepsakes.\n\nPhotographs beautifully for social and e-commerce grids.",
  },
  {
    slug: "rigid-divider-insert",
    title: "Divider Insert Rigid Boxes",
    description:
      "Paper or board partitions for multi-SKU sets — clean lanes, no rattle, and easy pick paths for fulfilment.",
    features: [
      { label: "Partitions", value: "Paperboard or wrapped chipboard" },
      { label: "Layout", value: "Configurable cell counts" },
      { label: "Print", value: "Printed partition faces optional" },
      { label: "Scale", value: "From duo sets to large assortments" },
      { label: "Min. order", value: "50 pieces" },
      { label: "Lead time", value: "14–22 business days" },
    ],
    details:
      "Divider inserts keep variety sets disciplined. We tune cell size to your BOM and add lift tabs where needed.\n\nPopular for skincare routines, sampler sets, and accessory kits.\n\nCost-effective premium structure versus full molded inserts.",
  },
  {
    slug: "rigid-custom-printed",
    title: "Custom Printed Rigid Boxes",
    description:
      "Photographic wraps, all-over patterns, and interior flood print — maximum colour control for campaigns that live on the shelf.",
    features: [
      { label: "Print", value: "Offset / digital hybrid by run size" },
      { label: "Coverage", value: "Exterior, interior, or both" },
      { label: "Proofing", value: "Contract proofs & drawdowns" },
      { label: "Colour", value: "Pantone + CMYK governance" },
      { label: "Min. order", value: "50 pieces" },
      { label: "Lead time", value: "14–22 business days" },
    ],
    details:
      "Custom printed rigids are your billboard. We manage registration across corners and edges so art feels intentional.\n\nInterior print turns every open into a second impression.\n\nIdeal for launches where colour accuracy is brand equity.",
  },
  {
    slug: "rigid-foiled",
    title: "Foiled Rigid Boxes",
    description:
      "Hot foil and cold foil accents — metallic logos, borders, and typography that catch retail light and camera flash.",
    features: [
      { label: "Foil", value: "Gold, silver, holographic, matte metallic" },
      { label: "Register", value: "Fine type & logo targeting" },
      { label: "Pairing", value: "Works with soft-touch or gloss laminate" },
      { label: "Art", value: "Vector foil masks supplied or built by studio" },
      { label: "Min. order", value: "50 pieces" },
      { label: "Lead time", value: "16–24 business days" },
    ],
    details:
      "Foiling elevates rigids without noisy graphics. We test foil adhesion on your chosen wrap and laminate stack.\n\nPopular for fragrance, spirits adjacency, and holiday editions.\n\nA core premium variation for brands that want quiet luxury with a flash of metal.",
  },
  {
    slug: "rigid-embossed-debossed",
    title: "Embossed / Debossed Rigid Boxes",
    description:
      "Sculpted logos and patterns you can feel — blind or registered to print for depth and craft cues.",
    features: [
      { label: "Tooling", value: "Brass / magnesium dies by detail level" },
      { label: "Effects", value: "Blind, registered, or combo foil + emboss" },
      { label: "Substrate", value: "Tuned for paper wrap thickness" },
      { label: "Art", value: "Minimum line weights reviewed pre-tool" },
      { label: "Min. order", value: "50 pieces" },
      { label: "Lead time", value: "18–26 business days" },
    ],
    details:
      "Emboss and deboss add tactile brand memory. We review artwork for crush and feathering on tight radii.\n\nCombine with soft-touch laminate for maximum hand feel.\n\nExcellent for monograms, crests, and geometric patterns.",
  },
  {
    slug: "rigid-textured-paper",
    title: "Textured Paper Wrapped Rigid Boxes",
    description:
      "Linen, leather-grain, and specialty stocks — material-first packaging when you want surface story before ink.",
    features: [
      { label: "Stock", value: "Textured art papers & colour-through options" },
      { label: "Wrap", value: "Corner tension & grain direction controlled" },
      { label: "Print", value: "Conservative ink coverage where needed" },
      { label: "Pairing", value: "Foil or deboss on texture" },
      { label: "Min. order", value: "50 pieces" },
      { label: "Lead time", value: "16–24 business days" },
    ],
    details:
      "Textured wraps trade flat print for material honesty. We map grain direction across panels for consistent light play.\n\nIdeal for wellness, stationery-adjacent brands, and quiet luxury.\n\nSampling recommended — we source swatches before full runs.",
  },
  {
    slug: "rigid-sustainable",
    title: "Sustainable Rigid Boxes",
    description:
      "Recycled board, FSC papers, and designed-for-recycling simplification — premium feel with credible material stories.",
    features: [
      { label: "Materials", value: "FSC papers, recycled greyboard tiers" },
      { label: "Laminate", value: "PP-free or low-plastic options where feasible" },
      { label: "Ink", value: "Vegetable / low-VOC programs" },
      { label: "Disclosure", value: "Recycle messaging panels optional" },
      { label: "Min. order", value: "50 pieces" },
      { label: "Lead time", value: "16–24 business days" },
    ],
    details:
      "Sustainable rigids balance ethics with perceived value. We document material chains for your marketing claims.\n\nNot every finish is compatible with every eco stock — we advise honestly per design.\n\nBuilt for brands that need premium unboxing without greenwashing.",
  },
];

export const RIGID_PRODUCTS: Record<string, ProductData> = Object.fromEntries(
  RIGID_SPECS.map((spec) => [spec.slug, rigidProduct(spec)]),
) as Record<string, ProductData>;
