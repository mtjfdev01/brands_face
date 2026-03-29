import type { ProductData } from "@/components/product/ProductInfo";

const ART_CARD_IMAGES = [
  "/assets/images/categories/art_card.jpeg",
  "/products/mailer-1.jpg",
  "/products/mailer-2.jpg",
];

const ART_CARD_QUANTITIES: ProductData["quantities"] = [
  { qty: 250, pricePerPiece: 0.42, total: 105.0 },
  { qty: 500, pricePerPiece: 0.34, total: 170.0 },
  { qty: 1000, pricePerPiece: 0.28, total: 280.0 },
  { qty: 2500, pricePerPiece: 0.22, total: 550.0 },
  { qty: 5000, pricePerPiece: 0.18, total: 900.0 },
];

const ART_CARD_SIZES: ProductData["sizes"] = [
  { label: "S", dimensions: "From 6 × 6 × 3 cm" },
  { label: "M", dimensions: "From 12 × 10 × 4 cm" },
  { label: "L", dimensions: "From 20 × 15 × 8 cm" },
  { label: "Custom", dimensions: "CAD-driven die lines" },
];

const ART_CARD_DEALS: ProductData["deals"] = [
  {
    title: "Art card line — die-line review included",
    description:
      "We validate tuck tension, glue flap geometry, and print registration on your dieline before plates — fewer surprises at press.",
    code: "ARTLINE",
  },
  {
    title: "First run colour proof credit",
    description:
      "Lock in brand colours with a contract proof on your chosen stock before the full run.",
    code: "ARTPROOF",
  },
];

type ArtCardSpec = Pick<ProductData, "slug" | "title" | "description" | "features" | "details">;

function artCardProduct(spec: ArtCardSpec): ProductData {
  return {
    ...spec,
    badges: ["ART CARD", "CMYK + FINISH", "BRANDS FACE STUDIO"],
    deals: ART_CARD_DEALS,
    quantities: ART_CARD_QUANTITIES,
    sizes: ART_CARD_SIZES,
    deliveryEstimate: "10–18 business days",
    images: ART_CARD_IMAGES,
  };
}

const ART_CARD_SPECS: ArtCardSpec[] = [
  /* ── Core folding structures ── */
  {
    slug: "art-card-tuck-end",
    title: "Tuck End Art Card Box",
    description:
      "The everyday folding carton — front tuck with friction fit. Fast to pack, economical at scale, and ideal for retail cartons and light DTC.",
    features: [
      { label: "Structure", value: "1-piece tuck end, standard or retail reverse" },
      { label: "Board", value: "SBS / FBB 250–400 gsm typical" },
      { label: "Print", value: "CMYK + spot / white underprint" },
      { label: "Closure", value: "Friction tuck — optional dust flaps" },
      { label: "Min. order", value: "250 pieces" },
      { label: "Lead time", value: "10–18 business days" },
    ],
    details:
      "Tuck end art card boxes are the backbone of folding-carton programs. We tune tuck depth and flap angles for your product weight and fulfilment speed.\n\nPair with matte or gloss laminate, soft-touch, or foil accents for shelf presence without rigid-tooling cost.\n\nBest when you need volume, predictable assembly, and sharp graphics on coated stock.",
  },
  {
    slug: "art-card-reverse-tuck-end",
    title: "Reverse Tuck End Art Card Box",
    description:
      "Top and bottom tucks oppose each other — cleaner retail presentation and balanced opening for hand-packed lines.",
    features: [
      { label: "Structure", value: "Reverse tuck — top/bottom opposing" },
      { label: "Retail", value: "Preferred hand-feel for shelf-facing SKUs" },
      { label: "Print", value: "Continuous art across corners" },
      { label: "Pack-out", value: "Works with inserts and sleeves" },
      { label: "Min. order", value: "250 pieces" },
      { label: "Lead time", value: "10–18 business days" },
    ],
    details:
      "Reverse tuck ends are chosen when both openings need controlled reveal — common for cosmetics, supplements, and giftable cartons.\n\nWe align panel breaks so logos and regulatory copy land squarely on faces.\n\nExcellent for Brands Face clients balancing fulfilment speed with premium perception.",
  },
  {
    slug: "art-card-straight-tuck-end",
    title: "Straight Tuck End Art Card Box",
    description:
      "Both tucks on the same panel edge — efficient for machine filling and straight-line graphics on the front face.",
    features: [
      { label: "Structure", value: "Straight tuck — same-side closures" },
      { label: "Fill", value: "Suited to semi-auto and manual fill" },
      { label: "Print", value: "Hero face maximised for brand block" },
      { label: "Variants", value: "Seal labels or tear strips optional" },
      { label: "Min. order", value: "250 pieces" },
      { label: "Lead time", value: "10–18 business days" },
    ],
    details:
      "Straight tuck cartons simplify panel layout when your hero art lives on one primary face.\n\nWe engineer tuck interference and glue strip placement for your line speed.\n\nCommon for pharma-style cartons, tea, and compact retail sets.",
  },
  {
    slug: "art-card-auto-lock-bottom",
    title: "Auto Lock Bottom Art Card Box",
    description:
      "Pop-open base with interlocking flaps — quick assembly at pack stations without tape, strong enough for modest weight.",
    features: [
      { label: "Base", value: "Auto-lock / snap-bottom" },
      { label: "Assembly", value: "Erect in seconds — stable footprint" },
      { label: "Load", value: "Suited to bottles, jars, and sets" },
      { label: "Print", value: "Full wrap + base panel branding" },
      { label: "Min. order", value: "250 pieces" },
      { label: "Lead time", value: "12–20 business days" },
    ],
    details:
      "Auto lock bottoms are the standard when you want a rigid-feeling base without rigid cost. We validate burst strength for your product mass.\n\nIdeal for subscription refills, retail cartons, and kits that ship in an outer mailer.\n\nPair with inserts for glass and PET.",
  },
  {
    slug: "art-card-crash-lock-bottom",
    title: "Crash Lock Bottom Art Card Box",
    description:
      "One-push crash assembly with high base integrity — faster than auto-lock on high-volume lines when tooling allows.",
    features: [
      { label: "Base", value: "Crash lock — rapid erect" },
      { label: "Throughput", value: "Tuned for volume pack-out" },
      { label: "Strength", value: "Corner keys sized to weight class" },
      { label: "Print", value: "Large panel billboards" },
      { label: "Min. order", value: "500 pieces" },
      { label: "Lead time", value: "12–20 business days" },
    ],
    details:
      "Crash lock cartons reduce labour on busy fulfilment floors. We prototype assembly feel so operators get consistent snaps.\n\nUse when bottle weight and line speed demand predictable bases.\n\nDiscuss palletisation and stack height early — we design compression accordingly.",
  },
  {
    slug: "art-card-sleeve",
    title: "Sleeve Art Card Box",
    description:
      "Slipcase sleeve over trays or bundles — campaign swaps without changing the inner tray investment.",
    features: [
      { label: "Format", value: "Sleeve over tray, bundle, or bottle" },
      { label: "Campaigns", value: "Interchangeable sleeve artwork" },
      { label: "Clearance", value: "Slide resistance & scuff control" },
      { label: "Print", value: "360° wrap graphics" },
      { label: "Min. order", value: "250 pieces" },
      { label: "Lead time", value: "10–18 business days" },
    ],
    details:
      "Sleeves let you refresh seasonal art while keeping one inner tray or bottle format.\n\nWe control grain direction and varnish for smooth pull on glossy art.\n\nStrong for cosmetics, chocolate, and beverage adjacency programs.",
  },
  {
    slug: "art-card-pillow",
    title: "Pillow Art Card Box",
    description:
      "Curved pillow pack — compact footprint for accessories, vouchers, and small giftables with minimal material.",
    features: [
      { label: "Structure", value: "Pillow die — glue or tuck variants" },
      { label: "SKU", value: "Ideal for small, light contents" },
      { label: "Print", value: "All-over pattern friendly" },
      { label: "Retail", value: "Hang hole options" },
      { label: "Min. order", value: "500 pieces" },
      { label: "Lead time", value: "10–18 business days" },
    ],
    details:
      "Pillow packs are efficient and charming for small goods. We size curve radius so boards don’t crack on fold.\n\nPopular for accessories, samples, and event kits.\n\nPair with belly bands for premium layering.",
  },
  {
    slug: "art-card-window",
    title: "Window Art Card Box",
    description:
      "PET or RPET window patches with clean registration — show the product while protecting the film edge in fulfilment.",
    features: [
      { label: "Window", value: "PET / RPET patch — anti-fog options" },
      { label: "Register", value: "Window vs product silhouette aligned" },
      { label: "Retail", value: "Theft-deterrent visibility" },
      { label: "Print", value: "Window surround branding" },
      { label: "Min. order", value: "250 pieces" },
      { label: "Lead time", value: "12–20 business days" },
    ],
    details:
      "Window cartons sell the product inside. We engineer patch adhesion and fold relief so films don’t lift in transit.\n\nDiscuss UV exposure and product sensitivity — we specify film grade.\n\nCommon for colour cosmetics, confectionery, and retail sets.",
  },
  {
    slug: "art-card-hang-tab",
    title: "Hang Tab Art Card Box",
    description:
      "Integrated or applied hang tabs for peg and clip strips — retail-ready without a separate hang card.",
    features: [
      { label: "Tab", value: "Butterfly, sombrero, or hook slot" },
      { label: "Strength", value: "Weight-rated for SKU mass" },
      { label: "Print", value: "Front-facing brand block" },
      { label: "Variants", value: "Euro-slot or J-hook layouts" },
      { label: "Min. order", value: "250 pieces" },
      { label: "Lead time", value: "10–18 business days" },
    ],
    details:
      "Hang tab cartons need honest pull testing. We specify board grain and glue paths so tabs survive retail handling.\n\nIdeal for health & beauty, hardware smalls, and impulse SKUs.\n\nWe can supply test reports for buyer compliance.",
  },
  {
    slug: "art-card-two-piece",
    title: "Two-Piece Art Card Box",
    description:
      "Telescope lid + base in paperboard — premium presentation at folding-carton economics for giftable programs.",
    features: [
      { label: "Structure", value: "Telescope lid over base" },
      { label: "Reveal", value: "Step height tuned to product" },
      { label: "Print", value: "Interior flood optional" },
      { label: "Inserts", value: "Paper, EVA, or pulp platforms" },
      { label: "Min. order", value: "250 pieces" },
      { label: "Lead time", value: "12–20 business days" },
    ],
    details:
      "Two-piece art card sets read more gift than single tuck cartons. We calibrate lid slip and finger clearance.\n\nUse for premium sets, limited drops, and retail gifting.\n\nCombine with foil or emboss for quiet luxury.",
  },

  /* ── Use-case based ── */
  {
    slug: "art-card-perfume",
    title: "Perfume Art Card Boxes",
    description:
      "Fragrance cartons with tight registration and weight-rated bases — bottle silhouette, collar clearance, and counter presence.",
    features: [
      { label: "Fit", value: "Bottle map and collar relief" },
      { label: "Base", value: "Auto-lock or crash lock by weight" },
      { label: "Finish", value: "Soft-touch, foil, emboss" },
      { label: "Retail", value: "Window or full-wrap options" },
      { label: "Min. order", value: "250 pieces" },
      { label: "Lead time", value: "12–20 business days" },
    ],
    details:
      "Perfume packaging must feel precious. We design dielines around your glass CAD and test drop scenarios.\n\nArt card allows high-chroma graphics and specialty finishes without rigid tooling on every SKU.\n\nIdeal for niche houses and travel formats.",
  },
  {
    slug: "art-card-skincare",
    title: "Skincare Art Card Boxes",
    description:
      "Routine sets, ampoules, and tubes — panel hierarchy for ingredients, claims, and brand story on coated stock.",
    features: [
      { label: "Layout", value: "Multi-SKU wells + compliance panels" },
      { label: "Finish", value: "Moisture-tolerant coatings where needed" },
      { label: "Print", value: "Small-type legibility tuned" },
      { label: "Inserts", value: "Paper partitions and platforms" },
      { label: "Min. order", value: "250 pieces" },
      { label: "Lead time", value: "10–18 business days" },
    ],
    details:
      "Skincare cartons balance regulation with desire. We sequence panel priority so mandatory copy and hero art coexist.\n\nTray heights account for pumps, droppers, and airless packs.\n\nBuilt for DTC routines, spa retail, and travel sets.",
  },
  {
    slug: "art-card-cosmetics",
    title: "Cosmetics Art Card Boxes",
    description:
      "Colour cosmetics and compacts — scuff-resistant varnish, tight fits, and campaign-ready sleeves.",
    features: [
      { label: "Surface", value: "Anti-scuff matte / soft-touch" },
      { label: "Fit", value: "Partitions for pans and palettes" },
      { label: "Campaigns", value: "Interchangeable sleeves" },
      { label: "Print", value: "Vivid CMYK on coated board" },
      { label: "Min. order", value: "250 pieces" },
      { label: "Lead time", value: "10–18 business days" },
    ],
    details:
      "Cosmetics demand fingerprint resistance and tight registration. We specify varnish stacks for handling in retail.\n\nSleeves and window patches let you rotate launches on one tray.\n\nPerfect for colour stories and seasonal coffrets.",
  },
  {
    slug: "art-card-makeup",
    title: "Makeup Art Card Boxes",
    description:
      "Palettes, brushes, and kits — shallow depths, mirror allowances, and refill-friendly layouts.",
    features: [
      { label: "Depth", value: "Shallow trays for palettes" },
      { label: "Mirror", value: "Optional mirror well engineering" },
      { label: "Print", value: "Shade names and finish callouts" },
      { label: "Inserts", value: "Paper, EVA, or thermoformed" },
      { label: "Min. order", value: "250 pieces" },
      { label: "Lead time", value: "12–20 business days" },
    ],
    details:
      "Makeup kits need precision — we align wells to pan geometry and brush lengths.\n\nArt card keeps campaigns affordable while delivering bold colour.\n\nSuited to pro kits, collabs, and education sets.",
  },
  {
    slug: "art-card-soap",
    title: "Soap Art Card Boxes",
    description:
      "Bars and sets — grease-resistant coatings, breathable structures, and rustic or clinical aesthetics.",
    features: [
      { label: "Coating", value: "Grease-barrier options" },
      { label: "Vent", value: "Venting strategies for natural bars" },
      { label: "Print", value: "Kraft-look or bright coated SBS" },
      { label: "Retail", value: "Hang tab or window options" },
      { label: "Min. order", value: "500 pieces" },
      { label: "Lead time", value: "10–18 business days" },
    ],
    details:
      "Soap cartons must handle oil and humidity without looking tired. We select coatings and board pairs honestly.\n\nWindows and hang tabs support retail placement.\n\nGreat for handmade, spa, and mass-market lines.",
  },
  {
    slug: "art-card-hair-care",
    title: "Hair Care Art Card Boxes",
    description:
      "Bottles, pumps, and tubes — tall carton stability, cluster packs, and shelf-ready graphics.",
    features: [
      { label: "Stability", value: "Base reinforcement for tall bottles" },
      { label: "Clusters", value: "Multi-pack partitions" },
      { label: "Print", value: "Salon and retail variants" },
      { label: "Finish", value: "Wet-area tolerant varnish" },
      { label: "Min. order", value: "250 pieces" },
      { label: "Lead time", value: "10–18 business days" },
    ],
    details:
      "Hair care cartons fight gravity on shelf. We engineer base geometry and glue for heavier fills.\n\nCluster packs and gift sets get partition maps tuned to your BOM.\n\nIdeal for salon, DTC, and mass retail.",
  },
  {
    slug: "art-card-essential-oil",
    title: "Essential Oil Art Card Boxes",
    description:
      "Small bottles and roller formats — drop protection, compliance panels, and oil-safe finishes.",
    features: [
      { label: "Insert", value: "Wells and finger lifts" },
      { label: "Compliance", value: "Dilution & usage panels" },
      { label: "Finish", value: "Oil-resistant coatings" },
      { label: "Print", value: "Botanical storytelling" },
      { label: "Min. order", value: "250 pieces" },
      { label: "Lead time", value: "10–18 business days" },
    ],
    details:
      "Essential oil packs need small-format precision and credible compliance. We plan microcopy zones early.\n\nCoatings are selected to minimise oil migration into paper.\n\nSuited to wellness, apothecary, and retail sets.",
  },
  {
    slug: "art-card-lipstick",
    title: "Lipstick Art Card Boxes",
    description:
      "Slim vertical cartons — tight fit for slimline bullets, giftable reveals, and counter-friendly faces.",
    features: [
      { label: "Format", value: "Slim vertical tuck or sleeve" },
      { label: "Reveal", value: "Ribbon pull or sleeve options" },
      { label: "Print", value: "Metallic ink and foil friendly" },
      { label: "Retail", value: "Hang tab optional" },
      { label: "Min. order", value: "500 pieces" },
      { label: "Lead time", value: "10–18 business days" },
    ],
    details:
      "Lipstick cartons are jewellery-small. We protect bullets with snug wells and clean edges.\n\nFinishes that read luxury on a tiny canvas — foil, emboss, soft-touch.\n\nPerfect for singles, duos, and holiday minis.",
  },
  {
    slug: "art-card-serum",
    title: "Serum Art Card Boxes",
    description:
      "Dropper bottles and airless packs — height clearance, insert discipline, and clinical or premium tone.",
    features: [
      { label: "Height", value: "Tuck or telescope for tall bottles" },
      { label: "Insert", value: "Foam or paper retention" },
      { label: "Print", value: "Ingredient hierarchy" },
      { label: "Finish", value: "Soft-touch, spot UV" },
      { label: "Min. order", value: "250 pieces" },
      { label: "Lead time", value: "10–18 business days" },
    ],
    details:
      "Serum cartons must survive drops and shelf scrutiny. We engineer inserts and panel breaks for droppers and pumps.\n\nArt card keeps batch flexibility for formula updates.\n\nStrong for clinical and premium DTC brands.",
  },
  {
    slug: "art-card-gift",
    title: "Gift Art Card Boxes",
    description:
      "Occasion-ready folding cartons — ribbon, window, and two-piece options for gifting without rigid cost.",
    features: [
      { label: "Formats", value: "Tuck, telescope, sleeve + tray" },
      { label: "Seasonal", value: "Campaign sleeves" },
      { label: "Print", value: "Foil, emboss, spot UV" },
      { label: "Inserts", value: "Platforms for mixed sets" },
      { label: "Min. order", value: "250 pieces" },
      { label: "Lead time", value: "12–20 business days" },
    ],
    details:
      "Gift art card boxes deliver emotion at volume. We balance unboxing cues with fulfilment realities.\n\nPair with inserts for mixed sets and fragile goods.\n\nIdeal for Q4, corporate gifting, and limited-edition drops.",
  },

  /* ── Premium variations ── */
  {
    slug: "art-card-printed",
    title: "Printed Art Card Boxes",
    description:
      "High-fidelity CMYK on coated board — brand colour governance, proofing, and consistency run to run.",
    features: [
      { label: "Print", value: "Offset / digital hybrid by run" },
      { label: "Colour", value: "Pantone + CMYK profiles" },
      { label: "Proofing", value: "Contract proofs available" },
      { label: "Coverage", value: "Solid fields and fine type" },
      { label: "Min. order", value: "250 pieces" },
      { label: "Lead time", value: "10–18 business days" },
    ],
    details:
      "Printed art card is your billboard at folding-carton scale. We manage dot gain and substrate white point.\n\nInterior print turns every open into a second impression.\n\nCore to Brands Face programs that need colour-accurate packaging.",
  },
  {
    slug: "art-card-foiled",
    title: "Foiled Art Card Boxes",
    description:
      "Hot foil on folding cartons — metallic logos, borders, and typography with controlled register on board.",
    features: [
      { label: "Foil", value: "Gold, silver, matte metallic, holographic" },
      { label: "Register", value: "Fine type targeting" },
      { label: "Pairing", value: "Matte laminate + foil stack" },
      { label: "Art", value: "Vector foil masks" },
      { label: "Min. order", value: "250 pieces" },
      { label: "Lead time", value: "12–20 business days" },
    ],
    details:
      "Foiling elevates folding cartons without rigid cost. We test adhesion on your laminate stack.\n\nPopular for fragrance adjacency, gifting, and holiday editions.\n\nQuiet luxury with a metallic flash.",
  },
  {
    slug: "art-card-embossed",
    title: "Embossed Art Card Boxes",
    description:
      "Blind or registered emboss / deboss on SBS — tactile logos and patterns within paper limits.",
    features: [
      { label: "Tooling", value: "Magnesium / brass by detail" },
      { label: "Effects", value: "Blind or print-registered" },
      { label: "Stock", value: "Tuned for board caliper" },
      { label: "Art", value: "Minimum line weights reviewed" },
      { label: "Min. order", value: "250 pieces" },
      { label: "Lead time", value: "14–22 business days" },
    ],
    details:
      "Embossing adds hand-feel memory on cartons. We review art for crush and feathering on folds.\n\nCombine with soft-touch for maximum tactility.\n\nExcellent for monograms and geometric patterns.",
  },
  {
    slug: "art-card-matte-finish",
    title: "Matte Finish Art Card Boxes",
    description:
      "Soft-touch and satin matte laminates — fingerprint-friendly luxury with deep, even colour fields.",
    features: [
      { label: "Laminate", value: "Soft-touch / anti-scuff matte" },
      { label: "Feel", value: "Velvety hand without heavy plastic" },
      { label: "Print", value: "Pairs with foil and emboss" },
      { label: "Care", value: "Handling notes for fulfilment" },
      { label: "Min. order", value: "250 pieces" },
      { label: "Lead time", value: "10–18 business days" },
    ],
    details:
      "Matte finishes dominate premium folding cartons. We specify laminate thickness for fold radii.\n\nIdeal for skincare, wellness, and quiet luxury brands.\n\nSampling recommended to lock hand-feel.",
  },
  {
    slug: "art-card-gloss-finish",
    title: "Gloss Finish Art Card Boxes",
    description:
      "High-gloss UV or film laminate — saturated colour pop and shelf shine for high-velocity retail.",
    features: [
      { label: "Finish", value: "Gloss UV / gloss film" },
      { label: "Colour", value: "Maximum chroma and contrast" },
      { label: "Retail", value: "Eye-catching on shelf" },
      { label: "Pairing", value: "Spot matte for contrast optional" },
      { label: "Min. order", value: "250 pieces" },
      { label: "Lead time", value: "10–18 business days" },
    ],
    details:
      "Gloss cartons read energetic and clean. We manage scuff resistance with varnish selection.\n\nCommon for mass beauty, confectionery, and youth-focused brands.\n\nCombine with spot matte for logo lockups.",
  },
  {
    slug: "art-card-spot-uv",
    title: "Spot UV Art Card Boxes",
    description:
      "Selective gloss UV over matte laminate — logo lift, droplet effects, and editorial contrast.",
    features: [
      { label: "Effect", value: "Spot UV on matte / soft-touch" },
      { label: "Register", value: "Tight to print masks" },
      { label: "Art", value: "Vector spot masks" },
      { label: "Pairing", value: "Works with CMYK photography" },
      { label: "Min. order", value: "250 pieces" },
      { label: "Lead time", value: "12–20 business days" },
    ],
    details:
      "Spot UV creates micro-contrast without full gloss. We align varnish height and register to art.\n\nPopular for logos, ingredient callouts, and pattern highlights.\n\nA Brands Face favourite for premium folding cartons.",
  },
  {
    slug: "art-card-window-patch",
    title: "Window Patch Art Card Boxes",
    description:
      "Precision film patches with clean corners — anti-fog, RPET options, and retail-ready visibility.",
    features: [
      { label: "Film", value: "PET / RPET — thickness by span" },
      { label: "Corners", value: "Relief cuts to prevent tear" },
      { label: "Product", value: "Silhouette aligned to contents" },
      { label: "Print", value: "Window surround art" },
      { label: "Min. order", value: "250 pieces" },
      { label: "Lead time", value: "12–20 business days" },
    ],
    details:
      "Window patches sell what’s inside. We engineer adhesive paths and fold relief for durability.\n\nDiscuss cold chain and condensation where relevant.\n\nDistinct from simple window die cuts — full patch programs.",
  },
  {
    slug: "art-card-insert",
    title: "Insert Art Card Boxes",
    description:
      "Paper, pulp, and EVA inserts integrated with folding cartons — retention, unboxing rhythm, and recyclability options.",
    features: [
      { label: "Inserts", value: "Paper, moulded pulp, EVA" },
      { label: "Retention", value: "CAD-driven cavities" },
      { label: "Sustainability", value: "Pulp and paper-first paths" },
      { label: "Pairing", value: "Any tuck, sleeve, or telescope" },
      { label: "Min. order", value: "250 pieces" },
      { label: "Lead time", value: "12–22 business days" },
    ],
    details:
      "Inserts turn folding cartons into protective systems. We prototype from your product CAD or samples.\n\nBalance recyclability with retention — we advise per SKU.\n\nEssential for glass, electronics adjacency, and gift sets.",
  },
];

export const ART_CARD_PRODUCTS: Record<string, ProductData> = Object.fromEntries(
  ART_CARD_SPECS.map((spec) => [spec.slug, artCardProduct(spec)]),
) as Record<string, ProductData>;
