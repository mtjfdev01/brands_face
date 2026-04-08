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
