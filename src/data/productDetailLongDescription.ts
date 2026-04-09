/**
 * Rich long-form product copy for PDP detail panels (placeholder until CMS / per-SKU data).
 * Structured as blocks so the UI can render headings, paragraphs, and lists consistently.
 */

export type ProductDetailBlock =
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "p"; text: string }
  | { type: "ul"; items: string[] };

/** Default catalogue-style detail copy — long, with multiple headings and lists. */
export const DEFAULT_PRODUCT_DETAIL_BLOCKS: ProductDetailBlock[] = [
  {
    type: "h2",
    text: "Overview",
  },
  {
    type: "p",
    text:
      "This packaging solution is engineered for brands that care about first impressions and repeat purchases. Every panel, fold, and finish is specified to protect your product in transit while presenting a premium unboxing moment on the shelf, at the counter, or on the doorstep.",
  },
  {
    type: "p",
    text:
      "Whether you are launching a new SKU, refreshing an existing line, or scaling fulfilment across regions, the construction balances structural integrity with efficient flat-pack storage and straightforward assembly for your team or 3PL partner.",
  },
  {
    type: "h2",
    text: "Materials and construction",
  },
  {
    type: "h3",
    text: "Board and substrates",
  },
  {
    type: "p",
    text:
      "We work with responsibly sourced fibre-based boards and can recommend weights and flute profiles based on product weight, stacking height, and shipping method. Heavier items may call for reinforced corners, double-wall sections, or internal inserts that lock components in place without rattling.",
  },
  {
    type: "ul",
    items: [
      "Kraft, white, or coated liners to match your brand palette and print plan",
      "Optional moisture barriers or grease-resistant treatments for food-adjacent use",
      "Recycled-content options where specification and regional rules allow",
    ],
  },
  {
    type: "h3",
    text: "Print and finishing",
  },
  {
    type: "p",
    text:
      "Artwork can be produced with crisp line work, rich solids, and photography that holds registration across panels. Finishing steps such as lamination, soft-touch coating, spot UV, foil, or embossing add depth and tactile appeal — we will advise which combinations suit your run size and timeline.",
  },
  {
    type: "ul",
    items: [
      "CMYK or expanded gamut for vibrant brand colours",
      "Pantone matching for corporate identity consistency",
      "Matte, gloss, or satin lamination for durability and hand-feel",
    ],
  },
  {
    type: "h2",
    text: "Sizing and structural options",
  },
  {
    type: "p",
    text:
      "Dimensions are quoted as internal usable space unless your brief specifies external measurements for retail or courier constraints. We can prototype with digital cutters or small-run samples so you can validate fit with your actual product, void fill, and any instruction leaflets.",
  },
  {
    type: "h3",
    text: "Closure and opening styles",
  },
  {
    type: "p",
    text:
      "Choose a closure that matches how customers interact with the pack: quick access for replenishment, tamper-evident features for compliance, or a slow reveal for gifting. Magnetic closures, ribbon ties, friction locks, and tear strips each change both cost and perceived value.",
  },
  {
    type: "ul",
    items: [
      "Tuck-end, mailer, and sleeve formats for e-commerce efficiency",
      "Rigid-style setups with separate lid and base for luxury positioning",
      "Window patches or die-cut reveals when the product should be visible",
    ],
  },
  {
    type: "h2",
    text: "Sustainability and disposal",
  },
  {
    type: "p",
    text:
      "We help you align packaging choices with your sustainability story: fibre certification, recyclability by region, lightweighting to cut freight emissions, and designs that minimise glue or mixed materials that complicate recycling streams.",
  },
  {
    type: "p",
    text:
      "Where compostable or biodegradable films are requested, we clarify performance limits (shelf life, oxygen and moisture barrier) so expectations stay realistic for your category and distribution chain.",
  },
  {
    type: "h2",
    text: "Quality, proofing, and production",
  },
  {
    type: "h3",
    text: "Before you print",
  },
  {
    type: "p",
    text:
      "A structured proofing workflow reduces surprises on press. You will receive flat dielines, 3D visualisations where helpful, and marked-up PDFs for alignment, safe zones, and barcode placement. Physical proofs are available for colour-critical or structurally complex jobs.",
  },
  {
    type: "ul",
    items: [
      "Preflight checks on resolution, fonts, and spot colours",
      "White ink and varnish layers called out on separate plates when needed",
      "Random sample pulls during the run for burst strength and print inspection",
    ],
  },
  {
    type: "h3",
    text: "Lead times and MOQs",
  },
  {
    type: "p",
    text:
      "Standard lead times depend on order quantity, finishing complexity, and seasonal demand. Rush options may be available for an expedite fee. Minimum order quantities are set to keep unit economics sensible on tooling and make-ready; your account manager can suggest consolidation or ladder pricing across multiple SKUs.",
  },
  {
    type: "h2",
    text: "Storage, fulfilment, and compliance",
  },
  {
    type: "p",
    text:
      "Flat-packed delivery keeps warehousing efficient. If you need packs pre-assembled, labelled, or kitted with inserts, discuss this early so labour and line layout are quoted accurately. For regulated categories, we support ingredient panels, warning copy, and country-of-origin markings within approved artwork templates.",
  },
  {
    type: "ul",
    items: [
      "Barcode symbologies and quiet zones verified against GS1 guidance where applicable",
      "Palletisation and carton markings for import and distribution partners",
      "Documented batch traceability for critical supply chains",
    ],
  },
  {
    type: "h2",
    text: "How to order",
  },
  {
    type: "p",
    text:
      "Share your product dimensions, target quantity, delivery timeline, and any reference samples or competitor packs you admire. We will return a structured quote with material options, finishes, and a clear timeline from artwork approval to despatch.",
  },
  {
    type: "p",
    text:
      "For repeat programmes, we maintain locked specifications and can hold safety stock or schedule call-offs against an annual agreement. That keeps your packaging consistent while smoothing cash flow and production peaks.",
  },
];

const CATEGORY_RANGE_LABEL: Record<string, string> = {
  art_card: "art card folding cartons",
  rigid_boxes: "rigid set-up boxes",
  corrugated_boxes: "corrugated shippers and retail packs",
  custom_pouches: "flexible pouches and barrier films",
  carry_bags: "paper retail and event bags",
  kraft_boxes: "kraft and unbleached fibre packs",
  labels_tags: "labels, tags, and adhesive graphics",
};

type CategorySnippet = {
  fitOut: string;
  structureBullets: (title: string) => string[];
  materialsBullets: (title: string) => string[];
  fulfilment: string;
};

const CATEGORY_SNIPPETS: Record<string, CategorySnippet> = {
  art_card: {
    fitOut:
      "Cartons erect quickly from flat, suit high-graphic retail, and pair well with windows, hang tabs, and speciality folds when the SKU demands shelf theatre.",
    structureBullets: (title) => [
      `Die-lines for ${title} respect grain direction, glue flap spans, and the compression loads of palletised retail.`,
      "Tuck, lock-bottom, sleeve, and two-piece formats each change how fast your line packs out and how the consumer opens the pack.",
      "We can stage digital samples or cut blanks so you approve fit before full litho or digital print commits.",
    ],
    materialsBullets: (title) => [
      `${title} typically runs on SBS, SUS, or recycled-content folding box board with coatings matched to your artwork.`,
      "Lamination, soft-touch, spot UV, foil, and emboss layers are quoted against run length and registration needs.",
      "Food-adjacent or cosmetic categories may need specific barrier coatings or migration-safe inks — flag your category early.",
    ],
    fulfilment:
      "Flat-packed cartons reduce inbound freight; if you need pre-erected packs or retail-ready displays, we fold that into labour and carton marking up front.",
  },
  rigid_boxes: {
    fitOut:
      "Rigid boards wrapped in print or cloth deliver a premium unboxing feel — ideal when the pack is part of the product story, not just protection.",
    structureBullets: (title) => [
      `${title} structures include lift-off lids, book styles, drawers, and magnetic closures sized to your insert stack.`,
      "Corner stays, neck trays, and wrapped edges are engineered for drop tests and repeated opening without fraying.",
      "Inserts in foam, EVA, paper, or fabric can be nested to the millimetre once we have samples or CAD.",
    ],
    materialsBullets: (title) => [
      `${title} wraps can be coated paper, textured stock, or textile lamination with debossed logos where the brief allows.`,
      "Foil, spot UV, and ribbon pulls are common upgrades; we balance hand-assembly time with your launch date.",
      "Retail and gifting programmes often mix outer rigid with inner folding cartons — we keep colour and finish families aligned.",
    ],
    fulfilment:
      "Rigid usually ships assembled or semi-kitted; we confirm palletisation, inner cartons, and VAC requirements for import markets.",
  },
  corrugated_boxes: {
    fitOut:
      "Corrugated balances crush strength, print impact, and DIM weight — from e-commerce mailers to heavy-duty industrial shippers.",
    structureBullets: (title) => [
      `${title} can be optimised for BCT, stack height, and automated erect lines with scores tuned to your flute choice.`,
      "Mailers, RSCs, die-cut wraps, and inserts are all on the table depending on fulfilment speed and branding.",
      "Inner partitions and die-cut inserts cut damage claims without over-packing — share your worst-case ship lane.",
    ],
    materialsBullets: (title) => [
      `${title} liners may be kraft, white, or mottled with flexo, litho laminate, or digital hybrid depending on artwork complexity.`,
      "E, B, C, and double-wall builds are matched to weight class and climate exposure.",
      "Recycled content and curbside-recyclable positioning can be designed in when the supply chain supports it.",
    ],
    fulfilment:
      "We label for 3PL, FBA-style, or regional courier constraints and can ship flat where your warehouse prefers to erect.",
  },
  custom_pouches: {
    fitOut:
      "Pouches are chosen for shelf presence, reclosability, and barrier performance across food, wellness, and household formulations.",
    structureBullets: (title) => [
      `${title} layouts define seal zones, gussets, hang holes, and fitments (zipper, valve, spout) around your fill process.`,
      "Matte, gloss, metallised, and paper-feel films each change stiffness, shelf blocking, and consumer grip.",
      "We align unwind direction, lap seals, and tear notches with your packing line speeds.",
    ],
    materialsBullets: (title) => [
      `${title} film stacks are specified for oxygen, moisture, and aroma barriers appropriate to shelf life targets.`,
      "Compostable or paper-look options are available where performance and regional rules allow — we set honest expectations up front.",
      "Finish panels, windows, and spot varnishes are held outside seal areas to protect integrity.",
    ],
    fulfilment:
      "Rolls or premade pouches ship according to your filling partner; we document seal temp windows and QA checks.",
  },
  carry_bags: {
    fitOut:
      "Bags carry brand at checkout and events — handle type, paper weight, and print register define perceived quality and load rating.",
    structureBullets: (title) => [
      `${title} can use twisted, flat, die-cut, or ribbon handles with reinforced patches for heavier baskets.`,
      "Gussets and turn-top constructions change how products sit and how logos read at arm’s length.",
      "We size for typical basket weights and reuse expectations so handles stay comfortable.",
    ],
    materialsBullets: (title) => [
      `${title} stocks range from natural kraft to coated art with lamination for durability in wet climates.`,
      "One- or two-colour flexo through to full CMYK are quoted against bag size and order quantity.",
      "Soy- or water-based inks and recycled fibre claims can be specified when your brand brief requires them.",
    ],
    fulfilment:
      "Bags ship flat or folded in outers; we mark cartons for retail backrooms or event logistics as needed.",
  },
  kraft_boxes: {
    fitOut:
      "Kraft reads authentic and sustainable — strong for e-commerce, artisan food, and brands that want texture-forward unboxing.",
    structureBullets: (title) => [
      `${title} structures include mailers, wraps, trays, and tubes sized to your product cube and void-fill plan.`,
      "Crash-lock and auto-bottom options speed pack-out when volumes climb.",
      "Interior fitments in kraft or corrugated keep glass and sets centred without plastic where possible.",
    ],
    materialsBullets: (title) => [
      `${title} often pairs with bold single-colour or two-colour print, black-ink-only premium looks, or minimal foils.`,
      "Uncoated surfaces absorb ink differently — we proof so solids and photography read as intended.",
      "Moisture-resistant or grease-tolerant treatments are available for food-contact use cases.",
    ],
    fulfilment:
      "Most kraft formats ship flat; we coordinate with your tape, label, and stamp workflow if you fulfil in-house.",
  },
  labels_tags: {
    fitOut:
      "Labels and tags are the interface between your brand and the product surface — adhesive, face stock, and finish must survive the full lifecycle.",
    structureBullets: (title) => [
      `${title} can be supplied on rolls, sheets, or fan-folded formats matched to applicators or hand apply.`,
      "Die shapes, perforations, and multi-layer constructions are built around container curvature and removal behaviour.",
      "Variable data, QR, and sequential codes are supported when artwork templates reserve clean zones.",
    ],
    materialsBullets: (title) => [
      `${title} adhesives are chosen for glass, HDPE, fibre, or textile surfaces and for chill, moisture, or outdoor exposure.`,
      "PP, PE, paper, and clear films each trade off clarity, conformability, and recyclability messaging.",
      "Hang tags combine board weight, drill holes, and stringing options for apparel and gifting.",
    ],
    fulfilment:
      "We pack to protect edges and unwind; core sizes and direction match your line or fulfilment partner’s spec.",
  },
};

function categorySnippet(category: string): CategorySnippet {
  return (
    CATEGORY_SNIPPETS[category] ?? {
      fitOut:
        "This format is specified to balance protection, brand presentation, and efficient production across typical retail and e-commerce lanes.",
      structureBullets: (title) => [
        `Structural options for ${title} are sized from your product dimensions, clearance rules, and how the pack is opened.`,
        "We review stacking, drop risk, and fulfilment speed before locking the final dieline.",
        "Samples and proofs reduce rework once artwork hits production.",
      ],
      materialsBullets: (title) => [
        `Material stacks for ${title} follow your category, budget, and sustainability targets.`,
        "Finishes and coatings are matched to run length and the tactile story you want on shelf.",
        "Regulatory copy and barcode zones are checked during preflight.",
      ],
      fulfilment:
        "Ship-flat versus assembled trade-offs are explained in your quote so warehousing and 3PL costs stay predictable.",
    }
  );
}

/**
 * Per-SKU long-form blocks for the PDP scroll panel — generated from catalogue teasers
 * and attached in `categoryPageConfig.ts` (`attachCatalogDefaults`). Override with
 * `detailBlocks` on a teaser when you need fully custom copy.
 */
export function buildProductDetailBlocksForTeaser(input: {
  slug: string;
  title: string;
  subtitle: string;
  heading?: string;
  category: string;
}): ProductDetailBlock[] {
  const range = CATEGORY_RANGE_LABEL[input.category] ?? "custom packaging";
  const tier = input.heading?.trim() ? `${input.heading.trim()} assortment` : "catalogue listing";
  const slugPhrase = input.slug.replace(/-/g, " ");
  const sn = categorySnippet(input.category);

  return [
    { type: "h2", text: "Overview" },
    {
      type: "p",
      text: `${input.title} sits in our ${range} as a ${tier}. In brief: ${input.subtitle} We treat every quote as a mini engineering exercise so artwork, structure, and MOQs line up with how you actually ship.`,
    },
    {
      type: "p",
      text: `Reference SKU “${slugPhrase}” when you message the team — it maps to the specifications, gallery images, and finishing assumptions we used when drafting this listing. Adjustments for retail compliance, export markings, or channel-specific barcodes are routine add-ons.`,
    },
    { type: "h2", text: "Structure and use cases" },
    {
      type: "h3",
      text: "How this format fits your line",
    },
    {
      type: "p",
      text: sn.fitOut,
    },
    {
      type: "ul",
      items: sn.structureBullets(input.title),
    },
    {
      type: "h2",
      text: "Materials, print, and finishing",
    },
    {
      type: "h3",
      text: "What we typically specify",
    },
    {
      type: "p",
      text:
        "Board weights, film microns, adhesive classes, and coating stacks are chosen after we know weight, climate, shelf life, and the surfaces your pack touches. Nothing here replaces a signed spec sheet, but it frames the decisions we will walk through on a call.",
    },
    {
      type: "ul",
      items: sn.materialsBullets(input.title),
    },
    {
      type: "h2",
      text: "Proofing, quality, and lead times",
    },
    {
      type: "p",
      text:
        "Expect a structured proof path: flat PDFs for copy and colour, marked dielines for dimensions, and — when needed — physical proofs or white samples before bulk. Random QC pulls during the run check registration, adhesion, and structural integrity against the signed standard.",
    },
    {
      type: "ul",
      items: [
        "Artwork preflight covers fonts, spot colours, minimum type, and barcode quiet zones.",
        "Tooling and make-ready are quoted transparently when a new size or feature debuts.",
        "Rush lanes may be available; they are scheduled around press and finishing capacity.",
      ],
    },
    {
      type: "h2",
      text: "Fulfilment and logistics",
    },
    {
      type: "p",
      text: sn.fulfilment,
    },
    {
      type: "h2",
      text: "How to order",
    },
    {
      type: "p",
      text: `Share dimensions, quantities, launch dates, and any must-match reference packaging for ${input.title}. We return options, timelines, and pricing tiers so you can compare finishes and volumes without guesswork.`,
    },
    {
      type: "p",
      text:
        "Ongoing programmes benefit from locked specs and scheduled reprints — fewer surprises on colour and structure, and better planning for seasonal peaks.",
    },
  ];
}
