/**
 * Category page configs: hero assets, tab definitions, and product teasers per category.
 *
 * Paste your `CategoryPageConfig[]` entries here (same shape as in `categoryPages.ts`).
 * `attachCatalogDefaults` merges category + product FAQ defaults and generates per-SKU
 * `detailBlocks` for the PDP scroll panel (override any teaser with an explicit `detailBlocks` array).
 */
import type { CategoryFaqItem, CategoryPageConfig } from "./categoryPages";
import type { ProductData } from "@/components/product/ProductInfo";
import { buildProductDetailBlocksForTeaser } from "./productDetailLongDescription";
import { ART_CARD_PRODUCTS } from "@/data/artCardProducts";
import { CORRUGATED_PRODUCTS } from "@/data/corrugatedProducts";
import { KRAFT_PRODUCTS } from "@/data/kraftProducts";
import { RIGID_PRODUCTS } from "@/data/rigidProducts";

function pdpFromProduct(p: ProductData | undefined) {
  if (!p) return undefined;
  const { title, description, badges, deals, sizes, features, details } = p;
  return { title, description, badges, deals, sizes, features, details };
}

const _CATEGORY_PAGE_CONFIG_RAW: CategoryPageConfig[] = [
    {
      category: "art_card",
      cardImage: "/assets/images/categories/categories_layout/art_card/art_card%20(1).webp",
      bannerImages: [
        "/assets/images/categories/categories_layout/art_card/art_card%20(1).webp",
        "/assets/images/categories/categories_layout/art_card/art_card%20(2).webp",
        "/assets/images/categories/categories_layout/art_card/art_card%20(3).webp",
      ],
      tabs: [
        { id: "all", label: "All" },
        { id: "core_products", label: "Core Products" },
        { id: "use_case", label: "Use-case Based" },
        { id: "premium_variations", label: "Premium variations" },
      ],
      products: [
        {
          slug: "art-card-tuck-end",
          tabId: "core_products",
          cardImage: "/assets/images/categories/ART Card BOXES/Core Product Pages/Tuck End Art Card Box/download (5).jpg",
          detailImages: [
            "/assets/images/categories/ART Card BOXES/Core Product Pages/Tuck End Art Card Box/Eco-Friendly Tuck End Boxes for Bath Bomb Packaging.jpg",
            "/assets/images/categories/ART Card BOXES/Core Product Pages/Tuck End Art Card Box/Modern Skincare Packaging _ Unique Packaging _ Packaging Design Ideas.jpg",
            "/assets/images/categories/ART Card BOXES/Core Product Pages/Tuck End Art Card Box/Tuck Boxes For Bath Bomb.jpg",
          ],
          heading: "Core",
          title: "Tuck End Art Card Box",
          subtitle: "Standard folding carton — fast pack, sharp graphics on coated stock.",
          pdp: pdpFromProduct(ART_CARD_PRODUCTS["art-card-tuck-end"]),
        },
        {
          slug: "art-card-reverse-tuck-end",
          tabId: "core_products",
          cardImage: "/assets/images/categories/ART Card BOXES/Core Product Pages/Reverse Tuck End Art Card Box/Eco-Friendly Tuck End Boxes for Bath Bomb Packaging.jpg",
          detailImages: [
            "/assets/images/categories/ART Card BOXES/Core Product Pages/Reverse Tuck End Art Card Box/Perfume product box design.jpg",
            "/assets/images/categories/ART Card BOXES/Core Product Pages/Reverse Tuck End Art Card Box/Small reverse tuck boxes.jpg",
            "/assets/images/categories/ART Card BOXES/Core Product Pages/Reverse Tuck End Art Card Box/Versatile Reverse Straight Tuck End Boxes.jpg",
          ],
          heading: "Core",
          title: "Reverse Tuck End Art Card Box",
          subtitle: "Opposing tucks — balanced retail presentation and clean opening.",
          pdp: pdpFromProduct(ART_CARD_PRODUCTS["art-card-reverse-tuck-end"]),
        },
        {
          slug: "art-card-straight-tuck-end",
          tabId: "core_products",
          cardImage: "/assets/images/categories/ART Card BOXES/Core Product Pages/Straight Tuck End Art Card Box/A vibrant and minimal straight tuck end box design….jpg", 
          detailImages: [
            "/assets/images/categories/ART Card BOXES/Core Product Pages/Straight Tuck End Art Card Box/Knight Playing Cards by Nicolai Aaroe.jpg",
            "/assets/images/categories/ART Card BOXES/Core Product Pages/Straight Tuck End Art Card Box/Minimalism As A Design Trend Lets The Packaging Speak Volumes For A Brand - Design & Paper.jpg",
            "/assets/images/categories/ART Card BOXES/Core Product Pages/Straight Tuck End Art Card Box/OIP.webp",
          ],
          heading: "Core",
          title: "Straight Tuck End Art Card Box",
          subtitle: "Same-side tucks — machine-friendly and hero-face friendly.",
          pdp: pdpFromProduct(ART_CARD_PRODUCTS["art-card-straight-tuck-end"]),
        },
        {
          slug: "art-card-auto-lock-bottom",
          tabId: "core_products",
          cardImage: "/assets/images/categories/ART Card BOXES/Core Product Pages/Auto Lock Bottom Art Card Box/Auto_Lock_Bottom_Tuck_Top_Front_Back_A.jpg",
          detailImages: [
            "/assets/images/categories/ART Card BOXES/Core Product Pages/Auto Lock Bottom Art Card Box/Auto-lock-Boxes05-600x500.jpg",
            "/assets/images/categories/ART Card BOXES/Core Product Pages/Auto Lock Bottom Art Card Box/Eco-Friendly Tuck End Boxes for Bath Bomb Packaging.jpg",
            "/assets/images/categories/ART Card BOXES/Core Product Pages/Auto Lock Bottom Art Card Box/Minimalism As A Design Trend Lets The Packaging Speak Volumes For A Brand - Design & Paper.jpg",
          ],
          heading: "Core",
          title: "Auto Lock Bottom Art Card Box",
          subtitle: "Pop-open base — quick assembly, stable for bottles and sets.",
          pdp: pdpFromProduct(ART_CARD_PRODUCTS["art-card-auto-lock-bottom"]),
        },
        {
          slug: "art-card-crash-lock-bottom",
          tabId: "core_products",
          cardImage: "/assets/images/categories/ART Card BOXES/Core Product Pages/Crash Lock Bottom Art Card Box/Auto-lock-Boxes05-600x500.jpg",
          detailImages: [
            "/assets/images/categories/ART Card BOXES/Core Product Pages/Crash Lock Bottom Art Card Box/Crash Lock_Bottom_Tuck_Top_Front_Back_A.jpg",
            "/assets/images/categories/ART Card BOXES/Core Product Pages/Crash Lock Bottom Art Card Box/Eco-Friendly Tuck End Boxes for Bath Bomb Packaging.jpg",
            "/assets/images/categories/ART Card BOXES/Core Product Pages/Crash Lock Bottom Art Card Box/Minimalism As A Design Trend Lets The Packaging Speak Volumes For A Brand - Design & Paper.jpg",
          ],
          heading: "Core",
          title: "Crash Lock Bottom Art Card Box",
          subtitle: "One-push crash base — high-throughput fulfilment lines.",
          pdp: pdpFromProduct(ART_CARD_PRODUCTS["art-card-crash-lock-bottom"]),
        },
        {
          slug: "art-card-sleeve",
          tabId: "core_products",
          cardImage: "/assets/images/categories/ART Card BOXES/Core Product Pages/Sleeve Art Card Box/aquira_500x500.png",
          detailImages: [
            "/assets/images/categories/ART Card BOXES/Core Product Pages/Sleeve Art Card Box/cocktail_cabinet_500x500.png",
            "/assets/images/categories/ART Card BOXES/Core Product Pages/Sleeve Art Card Box/Recchiuti Confections.jpg",
            "/assets/images/categories/ART Card BOXES/Core Product Pages/Sleeve Art Card Box/reddit_ the front page of the internet.jpg",
          ],
          heading: "Core",
          title: "Sleeve Art Card Box",
          subtitle: "Slipcase sleeves — swap campaigns without retooling the inner tray.",
          pdp: pdpFromProduct(ART_CARD_PRODUCTS["art-card-sleeve"]),
        },
        {
          slug: "art-card-pillow",
          tabId: "core_products",
          cardImage: "/assets/images/categories/ART Card BOXES/Core Product Pages/Pillow Art Card Box/Custom pillow boxes are eye captivating and best….jpg",
          detailImages: [
            "/assets/images/categories/ART Card BOXES/Core Product Pages/Pillow Art Card Box/Elegant Gold And Black Gift Box _ Pillow Box….jpg",
            "/assets/images/categories/ART Card BOXES/Core Product Pages/Pillow Art Card Box/Olive Jewelry Packaging Mama’s Sauce.jpg",
            "/assets/images/categories/ART Card BOXES/Core Product Pages/Pillow Art Card Box/Pillow Box PSD Mockup for Showcasing Your….jpg",
          ],
          heading: "Core",
          title: "Pillow Art Card Box",
          subtitle: "Compact curved pack — accessories, vouchers, small giftables.",
          pdp: pdpFromProduct(ART_CARD_PRODUCTS["art-card-pillow"]),
        },
        {
          slug: "art-card-window",
          tabId: "core_products",
          cardImage: "/assets/images/categories/ART Card BOXES/Core Product Pages/Window Art Card Box/6 x Gift Boxes with Window Packaging Gift Boxes Wrapping Paper Boxes Party  _ eBay UK.jpg",
          detailImages: [
            "/assets/images/categories/ART Card BOXES/Core Product Pages/Window Art Card Box/Buy cake box,cakes boxes,wholesale cake boxes,small cake box _ Cake box supplier, box wholesale, packaging supplier, custom make packaging.jpg",
            "/assets/images/categories/ART Card BOXES/Core Product Pages/Window Art Card Box/download (5).jpg",
            "/assets/images/categories/ART Card BOXES/Core Product Pages/Window Art Card Box/Hammont Window Box with Four Sections (Red - 6 Pack).jpg",
          ],
          heading: "Core",
          title: "Window Art Card Box",
          subtitle: "PET window patches — product visibility with clean film edges.",
          pdp: pdpFromProduct(ART_CARD_PRODUCTS["art-card-window"]),
        },
        {
          slug: "art-card-hang-tab",
          tabId: "core_products",
          cardImage: "/assets/images/categories/ART Card BOXES/Core Product Pages/Hang Tab Art Card Box/ChatGPT Image Mar 30, 2026, 11_13_58 AM.png",
          detailImages: [
            "/assets/images/categories/ART Card BOXES/Core Product Pages/Hang Tab Art Card Box/custom-hang-tab-box.webp",
            "/assets/images/categories/ART Card BOXES/Core Product Pages/Hang Tab Art Card Box/printed_hang_tab_boxes_500x500.png",
            "/assets/images/categories/ART Card BOXES/Core Product Pages/Hang Tab Art Card Box/Standard Card Deck Box Dieline- Hanging Tuck Box Template for Poker Size Cards- SVG, PDF, AI Download.jpg",
          ],
          heading: "Core",
          title: "Hang Tab Art Card Box",
          subtitle: "Peg-ready — integrated or applied tabs for retail strips.",
          pdp: pdpFromProduct(ART_CARD_PRODUCTS["art-card-hang-tab"]),
        },
        {
          slug: "art-card-two-piece",
          tabId: "core_products",
          cardImage: "/assets/images/categories/ART Card BOXES/Core Product Pages/Two-Piece Art Card Box/Aquira Solid Shampoo Packaging __ Behance.jpg",
          detailImages: [
            "/assets/images/categories/ART Card BOXES/Core Product Pages/Two-Piece Art Card Box/box_ribbon_500x500_preserved.jpg",
            "/assets/images/categories/ART Card BOXES/Core Product Pages/Two-Piece Art Card Box/download (5).jpg",
            "/assets/images/categories/ART Card BOXES/Core Product Pages/Two-Piece Art Card Box/White Rectangular Rigid Sleeve Box - 12x6x2_5.jpg",
          ],
          heading: "Core",
          title: "Two-Piece Art Card Box",
          subtitle: "Telescope lid + base — giftable presentation at carton economics.",
          pdp: pdpFromProduct(ART_CARD_PRODUCTS["art-card-two-piece"]),
        },
        {
          slug: "art-card-perfume",
          tabId: "use_case",
          cardImage: "/assets/images/categories/ART Card BOXES/Use-Case Based Product Pages/Perfume Art Card Boxes/download (5).jpg",
          detailImages: [
            "/assets/images/categories/ART Card BOXES/Use-Case Based Product Pages/Perfume Art Card Boxes/download (6).jpg",
            "/assets/images/categories/ART Card BOXES/Use-Case Based Product Pages/Perfume Art Card Boxes/GHAZAL 13.jpg",
            "/assets/images/categories/ART Card BOXES/Use-Case Based Product Pages/Perfume Art Card Boxes/zil taj.jpg",
          ],
          heading: "Use case",
          title: "Perfume Art Card Boxes",
          subtitle: "Fragrance-grade registration, bottle clearance, counter presence.",
          pdp: pdpFromProduct(ART_CARD_PRODUCTS["art-card-perfume"]),
        },
        {
          slug: "art-card-skincare",
          tabId: "use_case",
          cardImage: "/assets/images/categories/ART Card BOXES/Use-Case Based Product Pages/Skincare Art Card Boxes/cocco_500x500.jpg",
          detailImages: [
            "/assets/images/categories/ART Card BOXES/Use-Case Based Product Pages/Skincare Art Card Boxes/creme_crumbs_500x500.jpg",
            "/assets/images/categories/ART Card BOXES/Use-Case Based Product Pages/Skincare Art Card Boxes/download (5).jpg",
            "/assets/images/categories/ART Card BOXES/Use-Case Based Product Pages/Skincare Art Card Boxes/Street boss food truck _ Car, truck or van wrap contest.jpg",
          ],
          heading: "Use case",
          title: "Skincare Art Card Boxes",
          subtitle: "Routines and ampoules — panels for claims and ingredients.",
          pdp: pdpFromProduct(ART_CARD_PRODUCTS["art-card-skincare"]),
        },
        {
          slug: "art-card-cosmetics",
          tabId: "use_case",
          cardImage: "/assets/images/categories/ART Card BOXES/Use-Case Based Product Pages/Cosmetics Art Card Boxes/download (5).jpg",
          detailImages: [
            "/assets/images/categories/ART Card BOXES/Use-Case Based Product Pages/Cosmetics Art Card Boxes/download (6).jpg",
            "/assets/images/categories/ART Card BOXES/Use-Case Based Product Pages/Cosmetics Art Card Boxes/dreamore_500x500.jpg",
            "/assets/images/categories/ART Card BOXES/Use-Case Based Product Pages/Cosmetics Art Card Boxes/looshi_500x500_no_white_corners.jpg",
          ],
          heading: "Use case",
          title: "Cosmetics Art Card Boxes",
          subtitle: "Colour cosmetics — scuff-resistant finishes and campaign sleeves.",
          pdp: pdpFromProduct(ART_CARD_PRODUCTS["art-card-cosmetics"]),
        },
        {
          slug: "art-card-makeup",
          tabId: "use_case",
          cardImage: "/assets/images/categories/ART Card BOXES/Use-Case Based Product Pages/Makeup Art Card Boxes/test_1.jpg",
          detailImages: [
            "/assets/images/categories/ART Card BOXES/Use-Case Based Product Pages/Makeup Art Card Boxes/Gifts & Sets.jpg",
            "/assets/images/categories/ART Card BOXES/Use-Case Based Product Pages/Makeup Art Card Boxes/Keep It Glossy Lip Set.jpg",
            "/assets/images/categories/ART Card BOXES/Use-Case Based Product Pages/Makeup Art Card Boxes/Look Fantastic Beauty Box Review – March 2020.jpg",
          ],
          heading: "Use case",
          title: "Makeup Art Card Boxes",
          subtitle: "Palettes and kits — shallow depths, mirrors, refill-friendly layouts.",
          pdp: pdpFromProduct(ART_CARD_PRODUCTS["art-card-makeup"]),
        },
        {
          slug: "art-card-soap",
          tabId: "use_case",
          cardImage: "/assets/images/categories/ART Card BOXES/Use-Case Based Product Pages/Soap Art Card Boxes/How to Choosing the Best Soap Box Packaging_.jpg",
          detailImages: [
            "/assets/images/categories/ART Card BOXES/Use-Case Based Product Pages/Soap Art Card Boxes/packaging.jpg",
            "/assets/images/categories/ART Card BOXES/Use-Case Based Product Pages/Soap Art Card Boxes/Soap Packagin.jpg",
            "/assets/images/categories/ART Card BOXES/Use-Case Based Product Pages/Soap Art Card Boxes/Soap topper.jpg",
          ],
          heading: "Use case",
          title: "Soap Art Card Boxes",
          subtitle: "Bars and sets — grease barriers, vents, rustic or clinical look.",
          pdp: pdpFromProduct(ART_CARD_PRODUCTS["art-card-soap"]),
        },
        {
          slug: "art-card-hair-care",
          tabId: "use_case",
          cardImage: "/assets/images/categories/ART Card BOXES/Use-Case Based Product Pages/Hair Care Art Card Boxes/Colorful Lotion Pump Bottles _ OEM & Custom Packaging Inspiration.jpg",
          detailImages: [
            "/assets/images/categories/ART Card BOXES/Use-Case Based Product Pages/Hair Care Art Card Boxes/download (5).jpg",
            "/assets/images/categories/ART Card BOXES/Use-Case Based Product Pages/Hair Care Art Card Boxes/download (6).jpg",
            "/assets/images/categories/ART Card BOXES/Use-Case Based Product Pages/Hair Care Art Card Boxes/Haircare brand (beauty) packaging design with illustration.jpg",
          ],
          heading: "Use case",
          title: "Hair Care Art Card Boxes",
          subtitle: "Bottle stability, cluster packs, salon and retail graphics.",
          pdp: pdpFromProduct(ART_CARD_PRODUCTS["art-card-hair-care"]),
        },
        {
          slug: "art-card-essential-oil",
          tabId: "use_case",
          cardImage: "/assets/images/categories/ART Card BOXES/Use-Case Based Product Pages/Essential Oil Art Card Boxes/d4a68a1919612b076697ce9f92cd4614.jpg",
          detailImages: [
            "/assets/images/categories/ART Card BOXES/Use-Case Based Product Pages/Essential Oil Art Card Boxes/Essential-Oil-Box.webp",
            "/assets/images/categories/ART Card BOXES/Use-Case Based Product Pages/Essential Oil Art Card Boxes/OIP.webp",
            "/assets/images/categories/ART Card BOXES/Use-Case Based Product Pages/Essential Oil Art Card Boxes/R.webp",
          ],
          heading: "Use case",
          title: "Essential Oil Art Card Boxes",
          subtitle: "Small bottles, compliance copy, oil-safe coatings.",
          pdp: pdpFromProduct(ART_CARD_PRODUCTS["art-card-essential-oil"]),
        },
        {
          slug: "art-card-lipstick",
          tabId: "use_case",
          cardImage: "/assets/images/categories/ART Card BOXES/Use-Case Based Product Pages/Lipstick Art Card Boxes/Custom Lipstick Packaging.jpg",
          detailImages: [
            "/assets/images/categories/ART Card BOXES/Use-Case Based Product Pages/Lipstick Art Card Boxes/download (5).jpg",
            "/assets/images/categories/ART Card BOXES/Use-Case Based Product Pages/Lipstick Art Card Boxes/Lipstick Boxes _ Custom Packaging Lane.jpg",
            "/assets/images/categories/ART Card BOXES/Use-Case Based Product Pages/Lipstick Art Card Boxes/Wholesale Personalize Inserts Lipstick Boxes Custom Printing With Logo.jpg",
          ],
          heading: "Use case",
          title: "Lipstick Art Card Boxes",
          subtitle: "Slim vertical packs — foil, metallic ink, counter-ready.",
          pdp: pdpFromProduct(ART_CARD_PRODUCTS["art-card-lipstick"]),
        },
        {
          slug: "art-card-serum",
          tabId: "use_case",
          cardImage: "/assets/images/categories/ART Card BOXES/Use-Case Based Product Pages/Serum Art Card Boxes/Amber glass essential oil bottle branding mockup _ Premium PSD.jpg",
          detailImages: [
            "/assets/images/categories/ART Card BOXES/Use-Case Based Product Pages/Serum Art Card Boxes/Moksi – Visual Journal.jpg",
            "/assets/images/categories/ART Card BOXES/Use-Case Based Product Pages/Serum Art Card Boxes/Organic Skincare Packaging _ Branding Design Ideas.jpg",
            "/assets/images/categories/ART Card BOXES/Use-Case Based Product Pages/Serum Art Card Boxes/The Ultimate Guide to Custom CBD Tincture Boxes.jpg",
          ],
          heading: "Use case",
          title: "Serum Art Card Boxes",
          subtitle: "Droppers and airless — inserts and clinical or premium tone.",
          pdp: pdpFromProduct(ART_CARD_PRODUCTS["art-card-serum"]),
        },
        {
          slug: "art-card-gift",
          tabId: "use_case",
          cardImage: "/assets/images/categories/ART Card BOXES/Use-Case Based Product Pages/Gift Art Card Boxes/10pcs Colorful Gift Boxes with Flower Decorations, Perfect for Present Wrapping.jpg",
          detailImages: [
            "/assets/images/categories/ART Card BOXES/Use-Case Based Product Pages/Gift Art Card Boxes/Kemweao Hand-held Candy Box Clear Printing Paper Add Atmosphere Candy Bag for Anniversary, Size_See details page.jpg",
            "/assets/images/categories/ART Card BOXES/Use-Case Based Product Pages/Gift Art Card Boxes/Red Favor Boxes _ Zazzle.jpg",
            "/assets/images/categories/ART Card BOXES/Use-Case Based Product Pages/Gift Art Card Boxes/Flower-shaped folding box design sharing.jpg",
          ],
          heading: "Use case",
          title: "Gift Art Card Boxes",
          subtitle: "Occasion-ready — ribbon, window, two-piece gifting without rigid cost.",
          pdp: pdpFromProduct(ART_CARD_PRODUCTS["art-card-gift"]),
        },
        {
          slug: "art-card-printed",
          tabId: "premium_variations",
          cardImage: "/assets/images/categories/ART Card BOXES/Premium Variation Pages/Printed Art Card Boxes/Bliff Organic Tea.jpg",
          detailImages: [
            "/assets/images/categories/ART Card BOXES/Premium Variation Pages/Printed Art Card Boxes/Box packaging Photos - Download Free High-Quality Pictures _ Freepik.jpg",
            "/assets/images/categories/ART Card BOXES/Premium Variation Pages/Printed Art Card Boxes/KNESKO SKIN.jpg",
            "/assets/images/categories/ART Card BOXES/Premium Variation Pages/Printed Art Card Boxes/saffron packaging design.jpg",
          ],
          heading: "Premium",
          title: "Printed Art Card Boxes",
          subtitle: "High-fidelity CMYK — colour governance and contract proofs.",
          pdp: pdpFromProduct(ART_CARD_PRODUCTS["art-card-printed"]),
        },
        {
          slug: "art-card-foiled",
          tabId: "premium_variations",
          cardImage: "/assets/images/categories/ART Card BOXES/Premium Variation Pages/Foiled Art Card Boxes/Aqua day perfume box.jpg",
          detailImages: [
            "/assets/images/categories/ART Card BOXES/Premium Variation Pages/Foiled Art Card Boxes/Box aqua day.jpg",
            "/assets/images/categories/ART Card BOXES/Premium Variation Pages/Foiled Art Card Boxes/Green Valley Perfume Box Design.jpg",
            "/assets/images/categories/ART Card BOXES/Premium Variation Pages/Foiled Art Card Boxes/Living Lalique is also available in a matching body cream!!.jpg",
          ],
          heading: "Premium",
          title: "Foiled Art Card Boxes",
          subtitle: "Hot foil on cartons — metallic logos with laminate-safe adhesion.",
          pdp: pdpFromProduct(ART_CARD_PRODUCTS["art-card-foiled"]),
        },
        {
          slug: "art-card-embossed",
          tabId: "premium_variations",
          cardImage: "/assets/images/categories/ART Card BOXES/Premium Variation Pages/Embossed Art Card Boxes/Custom Packaging Designs.jpg",
          detailImages: [
            "/assets/images/categories/ART Card BOXES/Premium Variation Pages/Embossed Art Card Boxes/Dior Office.jpg",
            "/assets/images/categories/ART Card BOXES/Premium Variation Pages/Embossed Art Card Boxes/download (5).jpg",
            "/assets/images/categories/ART Card BOXES/Premium Variation Pages/Embossed Art Card Boxes/Sweet Box Design.jpg",
          ],
          heading: "Premium",
          title: "Embossed Art Card Boxes",
          subtitle: "Blind or registered emboss — tactile brand memory on SBS.",
          pdp: pdpFromProduct(ART_CARD_PRODUCTS["art-card-embossed"]),
        },
        {
          slug: "art-card-matte-finish",
          tabId: "premium_variations",
          cardImage: "/assets/images/categories/ART Card BOXES/Premium Variation Pages/Matte Finish Art Card Boxes/Blue Karavan Saffron.jpg",
          detailImages: [
            "/assets/images/categories/ART Card BOXES/Premium Variation Pages/Matte Finish Art Card Boxes/Cannabis-Flower-Boxes-2.jpg",
            "/assets/images/categories/ART Card BOXES/Premium Variation Pages/Matte Finish Art Card Boxes/download (5).jpg",
            "/assets/images/categories/ART Card BOXES/Premium Variation Pages/Matte Finish Art Card Boxes/Render 5.png",
          ],
          heading: "Premium",
          title: "Matte Finish Art Card Boxes",
          subtitle: "Soft-touch and satin matte — fingerprint-friendly luxury fields.",
          pdp: pdpFromProduct(ART_CARD_PRODUCTS["art-card-matte-finish"]),
        },
        {
          slug: "art-card-gloss-finish",
          tabId: "premium_variations",
          cardImage: "/assets/images/categories/ART Card BOXES/Premium Variation Pages/Gloss Finish Art Card Boxes/Bomibox September 2019.jpg",
          detailImages: [
            "/assets/images/categories/ART Card BOXES/Premium Variation Pages/Gloss Finish Art Card Boxes/asas.jpg",
            "/assets/images/categories/ART Card BOXES/Premium Variation Pages/Gloss Finish Art Card Boxes/NO7 BOOTS.jpg",
            "/assets/images/categories/ART Card BOXES/Premium Variation Pages/Gloss Finish Art Card Boxes/Product Review_  Dr_ Spiller Pure Skincare Solutions.jpg",
          ],
          heading: "Premium",
          title: "Gloss Finish Art Card Boxes",
          subtitle: "High-gloss UV or film — saturated colour and shelf pop.",
          pdp: pdpFromProduct(ART_CARD_PRODUCTS["art-card-gloss-finish"]),
        },
        {
          slug: "art-card-spot-uv",
          tabId: "premium_variations",
          cardImage: "/assets/images/categories/ART Card BOXES/Premium Variation Pages/Spot UV Art Card Boxes/The Black Box.jpg",
          detailImages: [
            "/assets/images/categories/ART Card BOXES/Premium Variation Pages/Spot UV Art Card Boxes/accorciamo_wine_500x500.jpg",
            "/assets/images/categories/ART Card BOXES/Premium Variation Pages/Spot UV Art Card Boxes/How to Design Custom boxes for your brand awareness_ Custom Retail Packaging.jpg",
            "/assets/images/categories/ART Card BOXES/Premium Variation Pages/Spot UV Art Card Boxes/spot_uv_logo_mockup_500x500.jpg",
          ],
          heading: "Premium",
          title: "Spot UV Art Card Boxes",
          subtitle: "Selective gloss on matte — logo lift and editorial contrast.",
          pdp: pdpFromProduct(ART_CARD_PRODUCTS["art-card-spot-uv"]),
        },
        {
          slug: "art-card-window-patch",
          tabId: "premium_variations",
          cardImage: "/assets/images/categories/ART Card BOXES/Premium Variation Pages/Window Patch Art Card Boxes/What-is-a-window-patching.png",
          detailImages: [
            "/assets/images/categories/ART Card BOXES/Premium Variation Pages/Window Patch Art Card Boxes/window_box_500x500.jpg",
            "/assets/images/categories/ART Card BOXES/Premium Variation Pages/Window Patch Art Card Boxes/window_box_templates_500x500.png",
            "/assets/images/categories/ART Card BOXES/Premium Variation Pages/Window Patch Art Card Boxes/window_box_two_500x500.jpg",
          ],
          heading: "Premium",
          title: "Window Patch Art Card Boxes",
          subtitle: "Precision film patches — RPET options and clean corners.",
          pdp: pdpFromProduct(ART_CARD_PRODUCTS["art-card-window-patch"]),
        },
        {
          slug: "art-card-insert",
          tabId: "premium_variations",
          cardImage: "/assets/images/categories/ART Card BOXES/Premium Variation Pages/Insert Art Card Boxes/2023 Longtake Eau de Parfum & Solid Perfume.jpg",
          detailImages: [
            "/assets/images/categories/ART Card BOXES/Premium Variation Pages/Insert Art Card Boxes/land_lab_visual_journal_500x500.jpg",
            "/assets/images/categories/ART Card BOXES/Premium Variation Pages/Insert Art Card Boxes/Packaging Design.jpg",
            "/assets/images/categories/ART Card BOXES/Premium Variation Pages/Insert Art Card Boxes/recursos_perfume_500x500.jpg",
          ],
          heading: "Premium",
          title: "Insert Art Card Boxes",
          subtitle: "Paper, pulp, EVA inserts — retention and unboxing rhythm.",
          pdp: pdpFromProduct(ART_CARD_PRODUCTS["art-card-insert"]),
        },
      ],
    },
    {
      category: "rigid_boxes",
      cardImage: "/assets/images/categories/categories_layout/rigid_box/rigid_cat_main%20(1).png",
      bannerImages: [
        "/assets/images/categories/categories_layout/rigid_box/rigid_cat_main%20(1).png",
        "/assets/images/categories/categories_layout/rigid_box/rigid_cat_main%20(2).png",
        "/assets/images/categories/categories_layout/rigid_box/rigid_cat_main%20(3).png",
      ],
      tabs: [
        { id: "all", label: "All" },
        { id: "core_products", label: "Core Products" },
        { id: "use_case", label: "Use-case Based" },
        { id: "premium_variations", label: "Premium variations" },
      ],
      products: [
        // {
        //   slug: "rigid",
        //   tabId: "core_products",
        //   cardImage: "/assets/images/categories/RIGID BOX Category/rigid/01.jpg",
        //   heading: "Signature",
        //   title: "Custom Rigid Box",
        //   subtitle: "Premium structure, magnetic closure options, and luxury finishes for high-end retail.",
        // },
        {
          tabId: "core_products",
          cardImage:
            "/assets/images/categories/RIGID BOX Category/Core Product Pages Rigid/Magnetic Closure Rigid Box/Magnetic Closure Box-01.png",
          detailImages: [
            "/assets/images/categories/RIGID BOX Category/Core Product Pages Rigid/Magnetic Closure Rigid Box/Magnetic Closure Box-02.jpg",
            "/assets/images/categories/RIGID BOX Category/Core Product Pages Rigid/Magnetic Closure Rigid Box/Magnetic Closure Box-03.jpg",
            "/assets/images/categories/RIGID BOX Category/Core Product Pages Rigid/Magnetic Closure Rigid Box/Magnetic Closure Box-04.jpg",
          ],
          heading: "Core",
          title: "Magnetic Closure Rigid Box",
          subtitle: "Concealed magnets and a clean reveal — flagship luxury unboxing.",
          slug: "magnetic-closure-rigid-box",
          pdp: {
            title: "Magnetic Closure Rigid Box",
            description:
              "A flagship presentation format with concealed magnets and a clean reveal — ideal for luxury retail, subscriptions, and unboxing moments that need to feel effortless.",
            badges: ["PREMIUM RIGID", "CUSTOM STRUCTURE", "BRANDS FACE STUDIO"],
            deals: [
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
            ],
            sizes: [
              { label: "Compact", dimensions: "From 8 × 8 × 4 cm" },
              { label: "Standard", dimensions: "From 15 × 15 × 8 cm" },
              { label: "Large format", dimensions: "From 25 × 20 × 12 cm" },
              { label: "Fully custom", dimensions: "Built to your product dimensions" },
            ],
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
          }
        },
        {
          slug: "drawer-slide-out-rigid-box",
          tabId: "core_products",
          cardImage:
            "/assets/images/categories/RIGID BOX Category/Core Product Pages Rigid/Drawer  Slide-Out Rigid Box/D-S-1.jpg",
          detailImages: [
            "/assets/images/categories/RIGID BOX Category/Core Product Pages Rigid/Drawer  Slide-Out Rigid Box/D-S-2.jpg",
            "/assets/images/categories/RIGID BOX Category/Core Product Pages Rigid/Drawer  Slide-Out Rigid Box/D-S-3.jpg",
            "/assets/images/categories/RIGID BOX Category/Core Product Pages Rigid/Drawer  Slide-Out Rigid Box/D-S-4.jpg",
          ],
          heading: "Core",
          title: "Drawer / Slide-Out Rigid Box",
          subtitle: "Sleeve and drawer mechanics for curated kits and jewelry-style reveals.",
          pdp: pdpFromProduct(RIGID_PRODUCTS["drawer-slide-out-rigid-box"]),
        },
        {
          slug: "lift-off-lid-rigid-box",
          tabId: "core_products",
          cardImage:
            "/assets/images/categories/RIGID BOX Category/Core Product Pages Rigid/Lift-Off Lid Rigid Box/L-1.jpg",
          detailImages: [
            "/assets/images/categories/RIGID BOX Category/Core Product Pages Rigid/Lift-Off Lid Rigid Box/L-2.png",
            "/assets/images/categories/RIGID BOX Category/Core Product Pages Rigid/Lift-Off Lid Rigid Box/L-3.jpg",
            "/assets/images/categories/RIGID BOX Category/Core Product Pages Rigid/Lift-Off Lid Rigid Box/L-4.jpg",
          ],
          heading: "Core",
          title: "Lift-Off Lid Rigid Box",
          subtitle: "Telescoping lid and base — maximum billboard space for retail and gifts.",
          pdp: pdpFromProduct(RIGID_PRODUCTS["lift-off-lid-rigid-box"]),
        },
        {
          slug: "shoulder-neck-rigid-box",
          tabId: "core_products",
          cardImage:
            "/assets/images/categories/RIGID BOX Category/Core Product Pages Rigid/Shoulder Neck Rigid Box/NS_1.jpg",
          detailImages: [
            "/assets/images/categories/RIGID BOX Category/Core Product Pages Rigid/Shoulder Neck Rigid Box/NS_2.jpg",
            "/assets/images/categories/RIGID BOX Category/Core Product Pages Rigid/Shoulder Neck Rigid Box/NS_4.jpg",
            "/assets/images/categories/RIGID BOX Category/Core Product Pages Rigid/Shoulder Neck Rigid Box/NS-3.jpg",
          ],
          heading: "Core",
          title: "Shoulder Neck Rigid Box",
          subtitle: "Step-down neck reveal — lid appears to float above the product.",
          pdp: pdpFromProduct(RIGID_PRODUCTS["shoulder-neck-rigid-box"]),
        },
        {
          slug: "book-style-rigid-box",
          tabId: "core_products",
          cardImage:
            "/assets/images/categories/RIGID BOX Category/Core Product Pages Rigid/Book-Style Rigid Box/B_1.jpg",
          detailImages: [
            "/assets/images/categories/RIGID BOX Category/Core Product Pages Rigid/Book-Style Rigid Box/B-2.jpg",
            "/assets/images/categories/RIGID BOX Category/Core Product Pages Rigid/Book-Style Rigid Box/B-3.jpg",
            "/assets/images/categories/RIGID BOX Category/Core Product Pages Rigid/Book-Style Rigid Box/B-4.jpg",
          ],
          heading: "Core",
          title: "Book-Style Rigid Box",
          subtitle: "Hinged spine and narrative panels — editorial packaging for PR and retail.",
          pdp: pdpFromProduct(RIGID_PRODUCTS["book-style-rigid-box"]),
        },
        {
          slug: "hinged-lid-rigid-box",
          tabId: "core_products",
          cardImage:
            "/assets/images/categories/RIGID BOX Category/Core Product Pages Rigid/Hinged Lid Rigid Box/H1.jpg",
          detailImages: [
            "/assets/images/categories/RIGID BOX Category/Core Product Pages Rigid/Hinged Lid Rigid Box/H2.jpg",
            "/assets/images/categories/RIGID BOX Category/Core Product Pages Rigid/Hinged Lid Rigid Box/H-3.jpg",
            "/assets/images/categories/RIGID BOX Category/Core Product Pages Rigid/Hinged Lid Rigid Box/H-4.jpg",
          ],
          heading: "Core",
          title: "Hinged Lid Rigid Box",
          subtitle: "Durable hinge and retail-friendly closure for heavier products.",
          pdp: pdpFromProduct(RIGID_PRODUCTS["hinged-lid-rigid-box"]),
        },
        {
          slug: "two-piece-rigid-box",
          tabId: "core_products",
          cardImage:
            "/assets/images/categories/RIGID BOX Category/Core Product Pages Rigid/Two-Piece Rigid Box/T-1.jpg",
          detailImages: [
            "/assets/images/categories/RIGID BOX Category/Core Product Pages Rigid/Two-Piece Rigid Box/T-2.jpg",
            "/assets/images/categories/RIGID BOX Category/Core Product Pages Rigid/Two-Piece Rigid Box/T-3.jpg",
            "/assets/images/categories/RIGID BOX Category/Core Product Pages Rigid/Two-Piece Rigid Box/T-4.jpg",
          ],
          heading: "Core",
          title: "Two-Piece Rigid Box",
          subtitle: "Fast-pack base and lid — premium look with efficient fulfilment.",
          pdp: pdpFromProduct(RIGID_PRODUCTS["two-piece-rigid-box"]),
        },
        {
          slug: "collapsible-rigid-box",
          tabId: "core_products",
          cardImage:
            "/assets/images/categories/RIGID BOX Category/Core Product Pages Rigid/Collapsible Rigid Box/C1.jpg",
          detailImages: [
            "/assets/images/categories/RIGID BOX Category/Core Product Pages Rigid/Collapsible Rigid Box/C2.jpg",
            "/assets/images/categories/RIGID BOX Category/Core Product Pages Rigid/Collapsible Rigid Box/C3.jpg",
            "/assets/images/categories/RIGID BOX Category/Core Product Pages Rigid/Collapsible Rigid Box/C4.jpg",
          ],
          heading: "Core",
          title: "Collapsible Rigid Box",
          subtitle: "Fold-flat inbound, full rigid strength assembled — lower freight and storage.",
          pdp: pdpFromProduct(RIGID_PRODUCTS["collapsible-rigid-box"]),
        },
        {
          slug: "ribbon-pull-rigid-box",
          tabId: "core_products",
          cardImage:
            "/assets/images/categories/RIGID BOX Category/Core Product Pages Rigid/Ribbon Pull Rigid Box/R1.jpg",
          detailImages: [
            "/assets/images/categories/RIGID BOX Category/Core Product Pages Rigid/Ribbon Pull Rigid Box/R2.jpg",
            "/assets/images/categories/RIGID BOX Category/Core Product Pages Rigid/Ribbon Pull Rigid Box/R3.jpg",
            "/assets/images/categories/RIGID BOX Category/Core Product Pages Rigid/Ribbon Pull Rigid Box/R4.jpg",
          ],
          heading: "Core",
          title: "Ribbon Pull Rigid Box",
          subtitle: "Integrated ribbon lift — gift-ready and optimised for unboxing content.",
          pdp: pdpFromProduct(RIGID_PRODUCTS["ribbon-pull-rigid-box"]),
        },
        {
          slug: "sleeve-tray-rigid-box",
          tabId: "core_products",
          cardImage:
            "/assets/images/categories/RIGID BOX Category/Core Product Pages Rigid/Sleeve & Tray Rigid Box/ST1.jpg",
          detailImages: [
            "/assets/images/categories/RIGID BOX Category/Core Product Pages Rigid/Sleeve & Tray Rigid Box/St2.jpg",
            "/assets/images/categories/RIGID BOX Category/Core Product Pages Rigid/Sleeve & Tray Rigid Box/ST3.jpg",
            "/assets/images/categories/RIGID BOX Category/Core Product Pages Rigid/Sleeve & Tray Rigid Box/ST4.jpg",
          ],
          heading: "Core",
          title: "Sleeve & Tray Rigid Box",
          subtitle: "Interchangeable sleeves over a rigid tray — seasonal campaigns, one tray system.",
          pdp: pdpFromProduct(RIGID_PRODUCTS["sleeve-tray-rigid-box"]),
        },
        {
          slug: "perfume-rigid-boxes",
          tabId: "use_case",
          cardImage:
            "/assets/images/categories/RIGID BOX Category/USE Case Based Rigid BOXes/Perfume Rigid Boxes/Elegant black perfume packaging designed to….jpg",
          detailImages: [
            "/assets/images/categories/RIGID BOX Category/USE Case Based Rigid BOXes/Perfume Rigid Boxes/Elevate your.jpg",
            "/assets/images/categories/RIGID BOX Category/USE Case Based Rigid BOXes/Perfume Rigid Boxes/Green Valley Perfume Box Design.jpg",
            "/assets/images/categories/RIGID BOX Category/USE Case Based Rigid BOXes/Perfume Rigid Boxes/Luxury Perfume Packaging Box Design.jpg",
          ],
          heading: "Use case",
          title: "Perfume Rigid Boxes",
          subtitle: "Bottle stability, collar clearance, and luxury finishes for fragrance.",
          pdp: pdpFromProduct(RIGID_PRODUCTS["perfume-rigid-boxes"]),
        },
        {
          slug: "skincare-rigid-boxes",
          tabId: "use_case",
          cardImage:
            "/assets/images/categories/RIGID BOX Category/USE Case Based Rigid BOXes/Skincare Rigid Boxes/Luxury Skincare Gift Box with Insert….jpg",
          detailImages: [
            "/assets/images/categories/RIGID BOX Category/USE Case Based Rigid BOXes/Skincare Rigid Boxes/In Luxury Cosmetic boxes Packaging we use premium….jpg",
            "/assets/images/categories/RIGID BOX Category/USE Case Based Rigid BOXes/Skincare Rigid Boxes/Custom Lotion Boxes have become a core packaging… (1).jpg",
            "/assets/images/categories/RIGID BOX Category/USE Case Based Rigid BOXes/Skincare Rigid Boxes/Every detail exudes elegance! Your favorite….jpg",
          ],
          heading: "Use case",
          title: "Skincare Rigid Boxes",
          subtitle: "Serum sets and jars — inserts and panels sized for pumps and compliance copy.",
          pdp: pdpFromProduct(RIGID_PRODUCTS["skincare-rigid-boxes"]),
        },
        {
          slug: "cosmetics-gift-set-rigid-boxes",
          tabId: "use_case",
          cardImage:
            "/assets/images/categories/RIGID BOX Category/USE Case Based Rigid BOXes/Cosmetics Gift Set Rigid Boxes/premium cosmetic boxes.jpg",
          detailImages: [
              "/assets/images/categories/RIGID BOX Category/USE Case Based Rigid BOXes/Cosmetics Gift Set Rigid Boxes/Product info.jpg",
            "/assets/images/categories/RIGID BOX Category/USE Case Based Rigid BOXes/Cosmetics Gift Set Rigid Boxes/Sturdy specialty.jpg",
            "/assets/images/categories/RIGID BOX Category/USE Case Based Rigid BOXes/Cosmetics Gift Set Rigid Boxes/Take a peek at our.jpg",
          ],
          heading: "Use case",
          title: "Cosmetics Gift Set Rigid Boxes",
          subtitle: "Partitions and layered reveals for holiday coffrets and GWP programs.",
          pdp: pdpFromProduct(RIGID_PRODUCTS["cosmetics-gift-set-rigid-boxes"]),
        },
        {
          slug: "makeup-kit-rigid-boxes",
          tabId: "use_case",
          cardImage:
            "/assets/images/categories/RIGID BOX Category/USE Case Based Rigid BOXes/Makeup Kit Rigid Boxes/download (5).jpg",
          detailImages: [
            "/assets/images/categories/RIGID BOX Category/USE Case Based Rigid BOXes/Makeup Kit Rigid Boxes/Product information.jpg",
            "/assets/images/categories/RIGID BOX Category/USE Case Based Rigid BOXes/Makeup Kit Rigid Boxes/Tiktok Hit Product Women s Gift Makeup.jpg",
            "/assets/images/categories/RIGID BOX Category/USE Case Based Rigid BOXes/Makeup Kit Rigid Boxes/Unveil the allure of this glamorous gift box, a….jpg",
          ],
          heading: "Use case",
          title: "Makeup Kit Rigid Boxes",
          subtitle: "Palettes, brushes, and mirrors — shallow depths tuned to your BOM.",
          pdp: pdpFromProduct(RIGID_PRODUCTS["makeup-kit-rigid-boxes"]),
        },
        {
          slug: "jewelry-rigid-boxes",
          tabId: "use_case",
          cardImage:
            "/assets/images/categories/RIGID BOX Category/USE Case Based Rigid BOXes/Jewelry Rigid Boxes/High Quality Custom logo two open door luxury….jpg",
          detailImages: [
            "/assets/images/categories/RIGID BOX Category/USE Case Based Rigid BOXes/Jewelry Rigid Boxes/Jewelry boxes set, custom white jewellery box - Jewelry packaging sets.jpg",
            "/assets/images/categories/RIGID BOX Category/USE Case Based Rigid BOXes/Jewelry Rigid Boxes/jewelry packaging box can print logo.jpg",
            "/assets/images/categories/RIGID BOX Category/USE Case Based Rigid BOXes/Jewelry Rigid Boxes/Nopeampi toimitus_ Parempi palvelu_.jpg",
          ],
          heading: "Use case",
          title: "Jewelry Rigid Boxes",
          subtitle: "Velvet interiors and anti-scuff cradles for fine and demi-fine lines.",
          pdp: pdpFromProduct(RIGID_PRODUCTS["jewelry-rigid-boxes"]),
        },
        {
          slug: "candle-rigid-boxes",
          tabId: "use_case",
          cardImage:
            "/assets/images/categories/RIGID BOX Category/USE Case Based Rigid BOXes/Candle Rigid Boxes/download (5).jpg",
          detailImages: [
            "/assets/images/categories/RIGID BOX Category/USE Case Based Rigid BOXes/Candle Rigid Boxes/High-end premium rigid candle boxes with durable….jpg",
            "/assets/images/categories/RIGID BOX Category/USE Case Based Rigid BOXes/Candle Rigid Boxes/Low MOQ Customized Blue Clear Heavy Base Glass….jpg",
            "/assets/images/categories/RIGID BOX Category/USE Case Based Rigid BOXes/Candle Rigid Boxes/Order custom rigid candle boxes for elegant….jpg",
          ],
          heading: "Use case",
          title: "Candle Rigid Boxes",
          subtitle: "Jar clearance, shock buffers, and gift-forward structure for home fragrance.",
          pdp: pdpFromProduct(RIGID_PRODUCTS["candle-rigid-boxes"]),
        },
        {
          slug: "apparel-gift-rigid-boxes",
          tabId: "use_case",
          cardImage:
          "/assets/images/categories/RIGID BOX Category/USE Case Based Rigid BOXes/Apparel Gift Rigid Boxes/sales@kraftpackagingfactory_com MOQ-100.jpg",
          detailImages: [
            "/assets/images/categories/RIGID BOX Category/USE Case Based Rigid BOXes/Apparel Gift Rigid Boxes/BLOG_paper boxes_Guangzhou Xiangtengyun Paper….jpg",
            "/assets/images/categories/RIGID BOX Category/USE Case Based Rigid BOXes/Apparel Gift Rigid Boxes/Custom rigid boxes are designed to deliver both….jpg",
            "/assets/images/categories/RIGID BOX Category/USE Case Based Rigid BOXes/Apparel Gift Rigid Boxes/Elegant rigid gift box with a premium ribbon….jpg",
          ],
          heading: "Use case",
          title: "Apparel Gift Rigid Boxes",
          subtitle: "Depth for folded garments, tissue stories, and premium retail presence.",
          pdp: pdpFromProduct(RIGID_PRODUCTS["apparel-gift-rigid-boxes"]),
        },
        {
          slug: "electronics-rigid-boxes",
          tabId: "use_case",
          cardImage:
          "/assets/images/categories/RIGID BOX Category/USE Case Based Rigid BOXes/Electronics Rigid Boxes/power bank box.jpg",
          detailImages: [
            "/assets/images/categories/RIGID BOX Category/USE Case Based Rigid BOXes/Electronics Rigid Boxes/As an essential electronic accessory for daily….jpg",
            "/assets/images/categories/RIGID BOX Category/USE Case Based Rigid BOXes/Electronics Rigid Boxes/_Custom boxes packaging plays a crucial role in….jpg",
            "/assets/images/categories/RIGID BOX Category/USE Case Based Rigid BOXes/Electronics Rigid Boxes/download (5).jpg",
          ],
          heading: "Use case",
          title: "Electronics Rigid Boxes",
          subtitle: "Device wells, cable lanes, and drop-tested inserts for premium peripherals.",
          pdp: pdpFromProduct(RIGID_PRODUCTS["electronics-rigid-boxes"]),
        },
        {
          slug: "pr-influencer-kit-rigid-boxes",
          tabId: "use_case",
          cardImage:
            "/assets/images/categories/RIGID BOX Category/USE Case Based Rigid BOXes/PR  Influencer Kit Rigid Boxes/250ml 450ml Shampoo Bottle _ XingYuan.jpg",
          detailImages: [
            "/assets/images/categories/RIGID BOX Category/USE Case Based Rigid BOXes/PR  Influencer Kit Rigid Boxes/download (5).jpg",
            "/assets/images/categories/RIGID BOX Category/USE Case Based Rigid BOXes/PR  Influencer Kit Rigid Boxes/download (6).jpg",
            "/assets/images/categories/RIGID BOX Category/USE Case Based Rigid BOXes/PR  Influencer Kit Rigid Boxes/Kimirica Love Story Luxury Bath and Body Care Gift Set Box.jpg",
          ],
          heading: "Use case",
          title: "PR / Influencer Kit Rigid Boxes",
          subtitle: "Layered storytelling and share-worthy structure for creator unboxings.",
          pdp: pdpFromProduct(RIGID_PRODUCTS["pr-influencer-kit-rigid-boxes"]),
        },
        {
          slug: "luxury-hamper-gift-rigid-boxes",
          tabId: "use_case",
          cardImage:
            "/assets/images/categories/RIGID BOX Category/USE Case Based Rigid BOXes/Luxury Hamper  Gift Rigid Boxes/download (5).jpg",
          detailImages: [
            "/assets/images/categories/RIGID BOX Category/USE Case Based Rigid BOXes/Luxury Hamper  Gift Rigid Boxes/download (6).jpg",
            "/assets/images/categories/RIGID BOX Category/USE Case Based Rigid BOXes/Luxury Hamper  Gift Rigid Boxes/download (7).jpg",
            "/assets/images/categories/RIGID BOX Category/USE Case Based Rigid BOXes/Luxury Hamper  Gift Rigid Boxes/Luxury Rigid Box for Valentine Gifting _ Custom Packaging Manufacturer _ Kumar Printers.jpg",
          ],
          heading: "Use case",
          title: "Luxury Hamper / Gift Rigid Boxes",
          subtitle: "Deep mixed-SKU layouts with reinforced corners and carry options.",
          pdp: pdpFromProduct(RIGID_PRODUCTS["luxury-hamper-gift-rigid-boxes"]),
        },
        {
          slug: "foam-insert-rigid-boxes",
          tabId: "premium_variations",
          cardImage:
            "/assets/images/categories/RIGID BOX Category/Premium Variation Pages/Foam Insert Rigid Boxes/Box Tray.jpg",
          detailImages: [
            "/assets/images/categories/RIGID BOX Category/Premium Variation Pages/Foam Insert Rigid Boxes/Custom Mini Order Black Cardboard Book Magnet Box….jpg",
            "/assets/images/categories/RIGID BOX Category/Premium Variation Pages/Foam Insert Rigid Boxes/Rigid Boxes With Inserts _ Rigid Packaging Boxes.jpg",
            "/assets/images/categories/RIGID BOX Category/Premium Variation Pages/Foam Insert Rigid Boxes/Производитель коробок.jpg",
          ],
          heading: "Premium",
          title: "Foam Insert Rigid Boxes",
          subtitle: "CNC-routed cavities — exact silhouette, shock absorption, studio-clean presentation.",
          pdp: pdpFromProduct(RIGID_PRODUCTS["foam-insert-rigid-boxes"]),
        },
        {
          slug: "velvet-insert-rigid-boxes",
          tabId: "premium_variations",
          cardImage:
            "/assets/images/categories/RIGID BOX Category/Premium Variation Pages/Velvet Insert Rigid Boxes/2pcs pink jewelry gift boxes 3 15x3 15x0 7 inch 8x8x1 8cm - Temu Ireland.jpg",
          detailImages: [
            "/assets/images/categories/RIGID BOX Category/Premium Variation Pages/Velvet Insert Rigid Boxes/download (5).jpg",
            "/assets/images/categories/RIGID BOX Category/Premium Variation Pages/Velvet Insert Rigid Boxes/Emerald Velvet Wedding Invitations Box, Green Velvet Box for 5x7_ Party Invitations, Gold Foil Monogram, Keepsake, Personalized Photo Box.jpg",
            "/assets/images/categories/RIGID BOX Category/Premium Variation Pages/Velvet Insert Rigid Boxes/This premium rigid gift box is crafted from….jpg",
          ],
          heading: "Premium",
          title: "Velvet Insert Rigid Boxes",
          subtitle: "Plush platforms and jewellery-forward tactility for reflective products.",
          pdp: pdpFromProduct(RIGID_PRODUCTS["velvet-insert-rigid-boxes"]),
        },
        {
          slug: "divider-insert-rigid-boxes",
          tabId: "premium_variations",
          cardImage:
            "/assets/images/categories/RIGID BOX Category/Premium Variation Pages/Divider Insert Rigid Boxes/2.jpg",
          detailImages: [
            "/assets/images/categories/RIGID BOX Category/Premium Variation Pages/Divider Insert Rigid Boxes/3 Piece Rigid Style Lift Off Lid.jpg",
            "/assets/images/categories/RIGID BOX Category/Premium Variation Pages/Divider Insert Rigid Boxes/Custom Rigid Boxes _ Premium Packaging for Luxury Products.jpg",
            "/assets/images/categories/RIGID BOX Category/Premium Variation Pages/Divider Insert Rigid Boxes/Justessence Perfume on Packaging of the World….jpg",
          ],
          heading: "Premium",
          title: "Divider Insert Rigid Boxes",
          subtitle: "Paper or board partitions — multi-SKU sets without rattle.",
          pdp: pdpFromProduct(RIGID_PRODUCTS["divider-insert-rigid-boxes"]),
        },
        {
          slug: "custom-printed-rigid-boxes",
          tabId: "premium_variations",
          cardImage:
            "/assets/images/categories/RIGID BOX Category/Premium Variation Pages/Custom Printed Rigid Boxes/Custom Mailer Boxes for B2B Business _ Premium Mailer Packaging _ Kumar Printers.jpg",
          detailImages: [
            "/assets/images/categories/RIGID BOX Category/Premium Variation Pages/Custom Printed Rigid Boxes/Luxury Black Drawer Box Premium Gift Wrapping Wedding Cosmetics & Perfumes.jpg",
            "/assets/images/categories/RIGID BOX Category/Premium Variation Pages/Custom Printed Rigid Boxes/Luxury Custom Rigid Boxes for Limited Edition Products _ Premium B2B Packaging _ Kumar Printers.jpg",
            "/assets/images/categories/RIGID BOX Category/Premium Variation Pages/Custom Printed Rigid Boxes/LUXURY PACKAGING BOX.jpg",
          ],
          heading: "Premium",
          title: "Custom Printed Rigid Boxes",
          subtitle: "All-over exterior and interior print — campaign-grade colour control.",
          pdp: pdpFromProduct(RIGID_PRODUCTS["custom-printed-rigid-boxes"]),
        },
        {
          slug: "foiled-rigid-boxes",
          tabId: "premium_variations",
          cardImage:
            "/assets/images/categories/RIGID BOX Category/Premium Variation Pages/Foiled Rigid Boxes/Luxury B2B packaging for body care products.jpg",
          detailImages: [
            "/assets/images/categories/RIGID BOX Category/Premium Variation Pages/Foiled Rigid Boxes/Luxury Rigid Book Box.jpg",
            "/assets/images/categories/RIGID BOX Category/Premium Variation Pages/Foiled Rigid Boxes/Magnetic Rigid Boxes _ Custom Rigid Boxes.jpg",
            "/assets/images/categories/RIGID BOX Category/Premium Variation Pages/Foiled Rigid Boxes/Printing your Logo onto Stock Gift Boxes.jpg",
          ],
          heading: "Premium",
          title: "Foiled Rigid Boxes",
          subtitle: "Hot and cold foil accents — logos and borders that catch light and camera.",
          pdp: pdpFromProduct(RIGID_PRODUCTS["foiled-rigid-boxes"]),
        },
        {
          slug: "embossed-debossed-rigid-boxes",
          tabId: "premium_variations",
          cardImage:
            "/assets/images/categories/RIGID BOX Category/Premium Variation Pages/Embossed  Debossed Rigid Boxes/Emboss Craft For Paper Box Cover.jpg",
          detailImages: [
            "/assets/images/categories/RIGID BOX Category/Premium Variation Pages/Embossed  Debossed Rigid Boxes/Premium B2B packaging for hair care products.jpg",
            "/assets/images/categories/RIGID BOX Category/Premium Variation Pages/Embossed  Debossed Rigid Boxes/Printing your Logo onto Stock Gift Boxes (1).jpg",
            "/assets/images/categories/RIGID BOX Category/Premium Variation Pages/Embossed  Debossed Rigid Boxes/Three-dimensional art in paper - the romance of embossing.jpg",
          ],
          heading: "Premium",
          title: "Embossed / Debossed Rigid Boxes",
          subtitle: "Sculpted depth — blind or registered to print for craft cues.",
          pdp: pdpFromProduct(RIGID_PRODUCTS["embossed-debossed-rigid-boxes"]),
        },
        {
          slug: "textured-paper-wrapped-rigid-boxes",
          tabId: "premium_variations",
          cardImage:
            "/assets/images/categories/RIGID BOX Category/Premium Variation Pages/Textured Paper Wrapped Rigid Boxes/Custom Rigid Boxes that Scream Sophistication.jpg",
          detailImages: [
            "/assets/images/categories/RIGID BOX Category/Premium Variation Pages/Textured Paper Wrapped Rigid Boxes/download (5).jpg",
            "/assets/images/categories/RIGID BOX Category/Premium Variation Pages/Textured Paper Wrapped Rigid Boxes/Instagram.jpg",
            "/assets/images/categories/RIGID BOX Category/Premium Variation Pages/Textured Paper Wrapped Rigid Boxes/Whalers Rum.jpg",
          ],
          heading: "Premium",
          title: "Textured Paper Wrapped Rigid Boxes",
          subtitle: "Linen and leather-grain stocks — material-first luxury before ink.",
          pdp: pdpFromProduct(RIGID_PRODUCTS["textured-paper-wrapped-rigid-boxes"]),
        },
        {
          slug: "sustainable-rigid-boxes",
          tabId: "premium_variations",
          cardImage:
            "/assets/images/categories/RIGID BOX Category/Premium Variation Pages/Sustainable Rigid Boxes/7_5_.jpg",
          detailImages: [
            "/assets/images/categories/RIGID BOX Category/Premium Variation Pages/Sustainable Rigid Boxes/download (5).jpg",
            "/assets/images/categories/RIGID BOX Category/Premium Variation Pages/Sustainable Rigid Boxes/Produktverpackung aus Vollpappe.jpg",
            "/assets/images/categories/RIGID BOX Category/Premium Variation Pages/Sustainable Rigid Boxes/Shoulder and Neck Boxes with Premium Design.jpg",
          ],
          heading: "Premium",
          title: "Sustainable Rigid Boxes",
          subtitle: "FSC papers and recycled board — premium feel with credible material stories.",
          pdp: pdpFromProduct(RIGID_PRODUCTS["sustainable-rigid-boxes"]),
        },
      ],
    },
    {
      category: "corrugated_boxes",
      cardImage: "/assets/images/categories/categories_layout/corrugrated/corrugrated%20(1).png",
      bannerImages: [
        "/assets/images/categories/categories_layout/corrugrated/corrugrated%20(1).png",
        "/assets/images/categories/categories_layout/corrugrated/corrugrated%20(2).png",
        "/assets/images/categories/categories_layout/corrugrated/corrugrated%20(3).png",
      ],
      tabs: [
        { id: "all", label: "All" },
        { id: "core_products", label: "Core Products" },
        { id: "use_case", label: "Use-case Based" },
        { id: "premium_variations", label: "Premium variations" },
      ],
      products: [
        {
          slug: "corrugated-regular-slotted",
          tabId: "core_products",
          cardImage:
            "/assets/images/categories/Corrugated Boxes/Core Product Pages/Regular Slotted Corrugated Box/core_products_first.jpg",
          detailImages: [
            "/assets/images/categories/Corrugated Boxes/Core Product Pages/Regular Slotted Corrugated Box/core_products_second.jpg",
            "/assets/images/categories/Corrugated Boxes/Core Product Pages/Regular Slotted Corrugated Box/core_products_third.jpg",
            "/assets/images/categories/Corrugated Boxes/Core Product Pages/Regular Slotted Corrugated Box/core_products_fourth.jpg",
          ],
          heading: "Core",
          title: "Regular Slotted Corrugated Box",
          subtitle: "Classic RSC — efficient, stackable, the workhorse of bulk shipping.",
          pdp: pdpFromProduct(CORRUGATED_PRODUCTS["corrugated-regular-slotted"]),
        },
        {
          slug: "corrugated-die-cut",
          tabId: "core_products",
          cardImage:
            "/assets/images/categories/Corrugated Boxes/Core Product Pages/Die-Cut Corrugated Box/core_products_first.jpg",
          detailImages: [
            "/assets/images/categories/Corrugated Boxes/Core Product Pages/Die-Cut Corrugated Box/core_products_second.jpg",
            "/assets/images/categories/Corrugated Boxes/Core Product Pages/Die-Cut Corrugated Box/core_products_third.jpg",
            "/assets/images/categories/Corrugated Boxes/Core Product Pages/Die-Cut Corrugated Box/core_products_fourth.jpg",
          ],
          heading: "Core",
          title: "Die-Cut Corrugated Box",
          subtitle: "Custom outlines, self-lock bases, and retail-ready shapes.",
          pdp: pdpFromProduct(CORRUGATED_PRODUCTS["corrugated-die-cut"]),
        },
        {
          slug: "corrugated-mailer",
          tabId: "core_products",
          cardImage:
            "/assets/images/categories/Corrugated Boxes/Core Product Pages/Mailer Corrugated Box/core_products_first.jpg",
          detailImages: [
            "/assets/images/categories/Corrugated Boxes/Core Product Pages/Mailer Corrugated Box/core_products_second.jpg",
            "/assets/images/categories/Corrugated Boxes/Core Product Pages/Mailer Corrugated Box/core_products_third.jpg",
            "/assets/images/categories/Corrugated Boxes/Core Product Pages/Mailer Corrugated Box/core_products_fourth.jpg",
          ],
          heading: "Core",
          title: "Mailer Corrugated Box",
          subtitle: "E-flute / B-flute mailers — DTC protection with billboard print.",
          pdp: pdpFromProduct(CORRUGATED_PRODUCTS["corrugated-mailer"]),
        },
        {
          slug: "corrugated-roll-end-tuck-top",
          tabId: "core_products",
          cardImage:
            "/assets/images/categories/Corrugated Boxes/Core Product Pages/Roll End Tuck Top Corrugated Box/core_products_first.jpg",
          detailImages: [
            "/assets/images/categories/Corrugated Boxes/Core Product Pages/Roll End Tuck Top Corrugated Box/core_products_second.jpg",
            "/assets/images/categories/Corrugated Boxes/Core Product Pages/Roll End Tuck Top Corrugated Box/core_products_third.jpg",
            "/assets/images/categories/Corrugated Boxes/Core Product Pages/Roll End Tuck Top Corrugated Box/core_products_fourth.jpg",
          ],
          heading: "Core",
          title: "Roll End Tuck Top Corrugated Box",
          subtitle: "RETT — rolled ends, clean tuck closure, retail-friendly.",
          pdp: pdpFromProduct(CORRUGATED_PRODUCTS["corrugated-roll-end-tuck-top"]),
        },
        {
          slug: "corrugated-full-overlap",
          tabId: "core_products",
          cardImage:
            "/assets/images/categories/Corrugated Boxes/Core Product Pages/Full Overlap Corrugated Box/core_products_first.jpg",
          detailImages: [
            "/assets/images/categories/Corrugated Boxes/Core Product Pages/Full Overlap Corrugated Box/core_products_second.jpg",
            "/assets/images/categories/Corrugated Boxes/Core Product Pages/Full Overlap Corrugated Box/core_products_third.png",
            "/assets/images/categories/Corrugated Boxes/Core Product Pages/Full Overlap Corrugated Box/core_products_fourth.png",
          ],
          heading: "Core",
          title: "Full Overlap Corrugated Box",
          subtitle: "FOL — extra overlap flaps for heavy or dense contents.",
          pdp: pdpFromProduct(CORRUGATED_PRODUCTS["corrugated-full-overlap"]),
        },
        {
          slug: "corrugated-one-piece-folder",
          tabId: "core_products",
          cardImage:
            "/assets/images/categories/Corrugated Boxes/Core Product Pages/One Piece Folder Corrugated Box/core_products_first.jpg",
          detailImages: [
            "/assets/images/categories/Corrugated Boxes/Core Product Pages/One Piece Folder Corrugated Box/core_products_second.jpg",
            "/assets/images/categories/Corrugated Boxes/Core Product Pages/One Piece Folder Corrugated Box/core_products_third.jpg",
            "/assets/images/categories/Corrugated Boxes/Core Product Pages/One Piece Folder Corrugated Box/core_products_fourth.jpg",
          ],
          heading: "Core",
          title: "One Piece Folder Corrugated Box",
          subtitle: "OPF — wrap flat goods with minimal void.",
          pdp: pdpFromProduct(CORRUGATED_PRODUCTS["corrugated-one-piece-folder"]),
        },
        {
          slug: "corrugated-tray",
          tabId: "core_products",
          cardImage:
            "/assets/images/categories/Corrugated Boxes/Core Product Pages/Corrugated Tray Box/core_products_first.jpg",
          detailImages: [
            "/assets/images/categories/Corrugated Boxes/Core Product Pages/Corrugated Tray Box/core_products_second.jpg",
            "/assets/images/categories/Corrugated Boxes/Core Product Pages/Corrugated Tray Box/core_products_third.jpg",
            "/assets/images/categories/Corrugated Boxes/Core Product Pages/Corrugated Tray Box/core_products_fourth.jpg",
          ],
          heading: "Core",
          title: "Corrugated Tray Box",
          subtitle: "Open trays for display, pick lines, and inner containment.",
          pdp: pdpFromProduct(CORRUGATED_PRODUCTS["corrugated-tray"]),
        },
        {
          slug: "corrugated-sleeve",
          tabId: "core_products",
          cardImage:
            "/assets/images/categories/Corrugated Boxes/Core Product Pages/Corrugated Sleeve Box/core_products_first.jpg",
          detailImages: [
            "/assets/images/categories/Corrugated Boxes/Core Product Pages/Corrugated Sleeve Box/core_products_second.jpg",
            "/assets/images/categories/Corrugated Boxes/Core Product Pages/Corrugated Sleeve Box/core_products_third.webp",
            "/assets/images/categories/Corrugated Boxes/Core Product Pages/Corrugated Sleeve Box/core_products_fourth.jpg",
          ],
          heading: "Core",
          title: "Corrugated Sleeve Box",
          subtitle: "Campaign sleeves over trays — swap graphics without new inners.",
          pdp: pdpFromProduct(CORRUGATED_PRODUCTS["corrugated-sleeve"]),
        },
        {
          slug: "corrugated-partition",
          tabId: "core_products",
          cardImage:
            "/assets/images/categories/Corrugated Boxes/Core Product Pages/Corrugated Partition Box/core_products_first.jpg",
          detailImages: [
            "/assets/images/categories/Corrugated Boxes/Core Product Pages/Corrugated Partition Box/core_products_second.jpg",
            "/assets/images/categories/Corrugated Boxes/Core Product Pages/Corrugated Partition Box/core_products_third.jpg",
            "/assets/images/categories/Corrugated Boxes/Core Product Pages/Corrugated Partition Box/core_products_fourth.jpg",
          ],
          heading: "Core",
          title: "Corrugated Partition Box",
          subtitle: "Cells and partitions — glass-safe multi-bottle lanes.",
          pdp: pdpFromProduct(CORRUGATED_PRODUCTS["corrugated-partition"]),
        },
        {
          slug: "corrugated-shipping",
          tabId: "core_products",
          cardImage:
            "/assets/images/categories/Corrugated Boxes/Core Product Pages/Corrugated Shipping Box/core_products_first.jpg",
          detailImages: [
            "/assets/images/categories/Corrugated Boxes/Core Product Pages/Corrugated Shipping Box/core_products_second.jpg",
            "/assets/images/categories/Corrugated Boxes/Core Product Pages/Corrugated Shipping Box/core_products_third.jpg",
            "/assets/images/categories/Corrugated Boxes/Core Product Pages/Corrugated Shipping Box/core_products_fourth.jpg",
          ],
          heading: "Core",
          title: "Corrugated Shipping Box",
          subtitle: "Parcel-optimised outers — crush curves and tape economics.",
          pdp: pdpFromProduct(CORRUGATED_PRODUCTS["corrugated-shipping"]),
        },
        {
          slug: "corrugated-ecommerce",
          tabId: "use_case",
          cardImage:
            "/assets/images/categories/Corrugated Boxes/Use-Case Based Product Pages/E-commerce Corrugated Boxes/use_case_first.jpg",
          detailImages: [
            "/assets/images/categories/Corrugated Boxes/Use-Case Based Product Pages/E-commerce Corrugated Boxes/use_case_second.jpg",
            "/assets/images/categories/Corrugated Boxes/Use-Case Based Product Pages/E-commerce Corrugated Boxes/use_case_third.jpg",
            "/assets/images/categories/Corrugated Boxes/Use-Case Based Product Pages/E-commerce Corrugated Boxes/use_case_fourth.jpg",
          ],
          heading: "Use case",
          title: "E-commerce Corrugated Boxes",
          subtitle: "Inside print, right-size cubes, small-parcel durability.",
          pdp: pdpFromProduct(CORRUGATED_PRODUCTS["corrugated-ecommerce"]),
        },
        {
          slug: "corrugated-subscription",
          tabId: "use_case",
          cardImage:
            "/assets/images/categories/Corrugated Boxes/Use-Case Based Product Pages/Subscription Corrugated Boxes/use_case_first.jpg",
          detailImages: [
            "/assets/images/categories/Corrugated Boxes/Use-Case Based Product Pages/Subscription Corrugated Boxes/use_case_second.jpg",
            "/assets/images/categories/Corrugated Boxes/Use-Case Based Product Pages/Subscription Corrugated Boxes/use_case_third.jpg",
            "/assets/images/categories/Corrugated Boxes/Use-Case Based Product Pages/Subscription Corrugated Boxes/use_case_fourth.jpg",
          ],
          heading: "Use case",
          title: "Subscription Corrugated Boxes",
          subtitle: "Repeat-friendly outers — seasonal sleeves, variable inserts.",
          pdp: pdpFromProduct(CORRUGATED_PRODUCTS["corrugated-subscription"]),
        },
        {
          slug: "corrugated-retail",
          tabId: "use_case",
          cardImage:
            "/assets/images/categories/Corrugated Boxes/Use-Case Based Product Pages/Retail Corrugated Boxes/use_case_first.jpg",
          detailImages: [
            "/assets/images/categories/Corrugated Boxes/Use-Case Based Product Pages/Retail Corrugated Boxes/use_case_second.jpg",
            "/assets/images/categories/Corrugated Boxes/Use-Case Based Product Pages/Retail Corrugated Boxes/use_case_third.jpg",
            "/assets/images/categories/Corrugated Boxes/Use-Case Based Product Pages/Retail Corrugated Boxes/use_case_fourth.jpg",
          ],
          heading: "Use case",
          title: "Retail Corrugated Boxes",
          subtitle: "Shelf-facing graphics, display backs, planogram footprints.",
          pdp: pdpFromProduct(CORRUGATED_PRODUCTS["corrugated-retail"]),
        },
        {
          slug: "corrugated-gift",
          tabId: "use_case",
          cardImage:
            "/assets/images/categories/Corrugated Boxes/Use-Case Based Product Pages/Gift Corrugated Boxes/use_case_first.jpg",
          detailImages: [
            "/assets/images/categories/Corrugated Boxes/Use-Case Based Product Pages/Gift Corrugated Boxes/use_case_second.jpg",
            "/assets/images/categories/Corrugated Boxes/Use-Case Based Product Pages/Gift Corrugated Boxes/use_case_third.jpg",
            "/assets/images/categories/Corrugated Boxes/Use-Case Based Product Pages/Gift Corrugated Boxes/use_case_fourth.jpg",
          ],
          heading: "Use case",
          title: "Gift Corrugated Boxes",
          subtitle: "Photogenic unboxing — inserts for mixed sets.",
          pdp: pdpFromProduct(CORRUGATED_PRODUCTS["corrugated-gift"]),
        },
        {
          slug: "corrugated-cosmetics",
          tabId: "use_case",
          cardImage:
            "/assets/images/categories/Corrugated Boxes/Use-Case Based Product Pages/Cosmetics Corrugated Boxes/use_case_first.jpg",
          detailImages: [
            "/assets/images/categories/Corrugated Boxes/Use-Case Based Product Pages/Cosmetics Corrugated Boxes/use_case_second.jpg",
            "/assets/images/categories/Corrugated Boxes/Use-Case Based Product Pages/Cosmetics Corrugated Boxes/use_case_third.jpg",
            "/assets/images/categories/Corrugated Boxes/Use-Case Based Product Pages/Cosmetics Corrugated Boxes/use_case_fourth.jpg",
          ],
          heading: "Use case",
          title: "Cosmetics Corrugated Boxes",
          subtitle: "Partitions, scuff-smart print, retail-ready faces.",
          pdp: pdpFromProduct(CORRUGATED_PRODUCTS["corrugated-cosmetics"]),
        },
        {
          slug: "corrugated-skincare",
          tabId: "use_case",
          cardImage:
            "/assets/images/categories/Corrugated Boxes/Use-Case Based Product Pages/Skincare Corrugated Boxes/use_case_first.jpg",
          detailImages: [
            "/assets/images/categories/Corrugated Boxes/Use-Case Based Product Pages/Skincare Corrugated Boxes/use_case_second.jpg",
            "/assets/images/categories/Corrugated Boxes/Use-Case Based Product Pages/Skincare Corrugated Boxes/use_case_third.jpg",
            "/assets/images/categories/Corrugated Boxes/Use-Case Based Product Pages/Skincare Corrugated Boxes/use_case_fourth.jpg",
          ],
          heading: "Use case",
          title: "Skincare Corrugated Boxes",
          subtitle: "Bottle retention, inserts, regimen storytelling.",
          pdp: pdpFromProduct(CORRUGATED_PRODUCTS["corrugated-skincare"]),
        },
        {
          slug: "corrugated-perfume",
          tabId: "use_case",
          cardImage:
            "/assets/images/categories/Corrugated Boxes/Use-Case Based Product Pages/Perfume Corrugated Boxes/use_case_first.jpg",
          detailImages: [
            "/assets/images/categories/Corrugated Boxes/Use-Case Based Product Pages/Perfume Corrugated Boxes/use_case_second.jpg",
            "/assets/images/categories/Corrugated Boxes/Use-Case Based Product Pages/Perfume Corrugated Boxes/use_case_third.jpg",
            "/assets/images/categories/Corrugated Boxes/Use-Case Based Product Pages/Perfume Corrugated Boxes/use_case_fourth.jpg",
          ],
          heading: "Use case",
          title: "Perfume Corrugated Boxes",
          subtitle: "Glass protection, partitions, luxury print options.",
          pdp: pdpFromProduct(CORRUGATED_PRODUCTS["corrugated-perfume"]),
        },
        {
          slug: "corrugated-pr-kit",
          tabId: "use_case",
          cardImage:
            "/assets/images/categories/Corrugated Boxes/Use-Case Based Product Pages/PR Kit Corrugated Boxes/use_case_first.jpg",
          detailImages: [
            "/assets/images/categories/Corrugated Boxes/Use-Case Based Product Pages/PR Kit Corrugated Boxes/use_case_second.jpg",
            "/assets/images/categories/Corrugated Boxes/Use-Case Based Product Pages/PR Kit Corrugated Boxes/use_case_third.jpg",
            "/assets/images/categories/Corrugated Boxes/Use-Case Based Product Pages/PR Kit Corrugated Boxes/use_case_fourth.jpg",
          ],
          heading: "Use case",
          title: "PR Kit Corrugated Boxes",
          subtitle: "Layered reveals, collateral wells, creator-friendly.",
          pdp: pdpFromProduct(CORRUGATED_PRODUCTS["corrugated-pr-kit"]),
        },
        {
          slug: "corrugated-food",
          tabId: "use_case",
          cardImage:
            "/assets/images/categories/Corrugated Boxes/Use-Case Based Product Pages/Food Corrugated Boxes/use_case_first.jpg",
          detailImages: [
            "/assets/images/categories/Corrugated Boxes/Use-Case Based Product Pages/Food Corrugated Boxes/use_case_second.jpg",
            "/assets/images/categories/Corrugated Boxes/Use-Case Based Product Pages/Food Corrugated Boxes/use_case_third.jpg",
            "/assets/images/categories/Corrugated Boxes/Use-Case Based Product Pages/Food Corrugated Boxes/use_case_fourth.jpg",
          ],
          heading: "Use case",
          title: "Food Corrugated Boxes",
          subtitle: "Food-safe barriers, venting, bakery and meal-kit adjacency.",
          pdp: pdpFromProduct(CORRUGATED_PRODUCTS["corrugated-food"]),
        },
        {
          slug: "corrugated-electronics",
          tabId: "use_case",
          cardImage:
            "/assets/images/categories/Corrugated Boxes/Use-Case Based Product Pages/Electronics Corrugated Boxes/use_case_first.jpg",
          detailImages: [
            "/assets/images/categories/Corrugated Boxes/Use-Case Based Product Pages/Electronics Corrugated Boxes/use_case_second.jpg",
            "/assets/images/categories/Corrugated Boxes/Use-Case Based Product Pages/Electronics Corrugated Boxes/use_case_third.jpg",
            "/assets/images/categories/Corrugated Boxes/Use-Case Based Product Pages/Electronics Corrugated Boxes/use_case_fourth.jpg",
          ],
          heading: "Use case",
          title: "Electronics Corrugated Boxes",
          subtitle: "Inserts, drop tests, ESD-aware programs where needed.",
          pdp: pdpFromProduct(CORRUGATED_PRODUCTS["corrugated-electronics"]),
        },
        {
          slug: "corrugated-custom-printed",
          tabId: "premium_variations",
          cardImage:
            "/assets/images/categories/Corrugated Boxes/Premium  Variation Pages/Custom Printed Corrugated Boxes/premium_variations_first.jpg",
          detailImages: [
            "/assets/images/categories/Corrugated Boxes/Premium  Variation Pages/Custom Printed Corrugated Boxes/premium_variations_second.jpg",
            "/assets/images/categories/Corrugated Boxes/Premium  Variation Pages/Custom Printed Corrugated Boxes/premium_variations_third.jpg",
            "/assets/images/categories/Corrugated Boxes/Premium  Variation Pages/Custom Printed Corrugated Boxes/premium_variations_fourth.jpg",
          ],
          heading: "Premium",
          title: "Custom Printed Corrugated Boxes",
          subtitle: "Flexo to litho-lam — full wrap and inside-out campaigns.",
          pdp: pdpFromProduct(CORRUGATED_PRODUCTS["corrugated-custom-printed"]),
        },
        {
          slug: "corrugated-kraft",
          tabId: "premium_variations",
          cardImage:
            "/assets/images/categories/Corrugated Boxes/Premium  Variation Pages/Kraft Corrugated Boxes/premium_variations_first.jpg",
          detailImages: [
            "/assets/images/categories/Corrugated Boxes/Premium  Variation Pages/Kraft Corrugated Boxes/premium_variations_second.jpg",
            "/assets/images/categories/Corrugated Boxes/Premium  Variation Pages/Kraft Corrugated Boxes/premium_variations_third.jpg",
            "/assets/images/categories/Corrugated Boxes/Premium  Variation Pages/Kraft Corrugated Boxes/premium_variations_fourth.jpg",
          ],
          heading: "Premium",
          title: "Kraft Corrugated Boxes",
          subtitle: "Natural kraft liners — eco-forward, bold ink strategies.",
          pdp: pdpFromProduct(CORRUGATED_PRODUCTS["corrugated-kraft"]),
        },
        {
          slug: "corrugated-white",
          tabId: "premium_variations",
          cardImage:
            "/assets/images/categories/Corrugated Boxes/Premium  Variation Pages/White Corrugated Boxes/premium_variations_first.jpg",
          detailImages: [
            "/assets/images/categories/Corrugated Boxes/Premium  Variation Pages/White Corrugated Boxes/premium_variations_second.jpg",
            "/assets/images/categories/Corrugated Boxes/Premium  Variation Pages/White Corrugated Boxes/premium_variations_third.jpg",
            "/assets/images/categories/Corrugated Boxes/Premium  Variation Pages/White Corrugated Boxes/premium_variations_fourth.jpg",
          ],
          heading: "Premium",
          title: "White Corrugated Boxes",
          subtitle: "White mottle liners — bright art, clean photography.",
          pdp: pdpFromProduct(CORRUGATED_PRODUCTS["corrugated-white"]),
        },
        {
          slug: "corrugated-heavy-duty",
          tabId: "premium_variations",
          cardImage:
            "/assets/images/categories/Corrugated Boxes/Premium  Variation Pages/Heavy Duty Corrugated Boxes/premium_variations_first.jpg",
          detailImages: [
            "/assets/images/categories/Corrugated Boxes/Premium  Variation Pages/Heavy Duty Corrugated Boxes/premium_variations_second.jpg",
            "/assets/images/categories/Corrugated Boxes/Premium  Variation Pages/Heavy Duty Corrugated Boxes/premium_variations_third.jpg",
            "/assets/images/categories/Corrugated Boxes/Premium  Variation Pages/Heavy Duty Corrugated Boxes/premium_variations_fourth.jpg",
          ],
          heading: "Premium",
          title: "Heavy Duty Corrugated Boxes",
          subtitle: "Double-wall / high-burst — industrial and export lanes.",
          pdp: pdpFromProduct(CORRUGATED_PRODUCTS["corrugated-heavy-duty"]),
        },
        {
          slug: "corrugated-with-inserts",
          tabId: "premium_variations",
          cardImage:
            "/assets/images/categories/Corrugated Boxes/Premium  Variation Pages/Corrugated Boxes with Inserts/premium_variations_first.jpg",
          detailImages: [
            "/assets/images/categories/Corrugated Boxes/Premium  Variation Pages/Corrugated Boxes with Inserts/premium_variations_second.jpg",
            "/assets/images/categories/Corrugated Boxes/Premium  Variation Pages/Corrugated Boxes with Inserts/premium_variations_third.jpg",
            "/assets/images/categories/Corrugated Boxes/Premium  Variation Pages/Corrugated Boxes with Inserts/premium_variations_fourth.jpg",
          ],
          heading: "Premium",
          title: "Corrugated Boxes with Inserts",
          subtitle: "Foam, pulp, paper platforms — ship-ready systems.",
          pdp: pdpFromProduct(CORRUGATED_PRODUCTS["corrugated-with-inserts"]),
        },
        {
          slug: "corrugated-branded-shipping",
          tabId: "premium_variations",
          cardImage:
            "/assets/images/categories/Corrugated Boxes/Premium  Variation Pages/Branded Shipping Corrugated Boxes/premium_variations_first.jpg",
          detailImages: [
            "/assets/images/categories/Corrugated Boxes/Premium  Variation Pages/Branded Shipping Corrugated Boxes/premium_variations_second.jpg",
            "/assets/images/categories/Corrugated Boxes/Premium  Variation Pages/Branded Shipping Corrugated Boxes/premium_variations_third.jpg",
            "/assets/images/categories/Corrugated Boxes/Premium  Variation Pages/Branded Shipping Corrugated Boxes/premium_variations_fourth.jpg",
          ],
          heading: "Premium",
          title: "Branded Shipping Corrugated Boxes",
          subtitle: "Outer as billboard — tape-safe art, parcel visibility.",
          pdp: pdpFromProduct(CORRUGATED_PRODUCTS["corrugated-branded-shipping"]),
        },
        {
          slug: "corrugated-laminated",
          tabId: "premium_variations",
          cardImage:
            "/assets/images/categories/Corrugated Boxes/Premium  Variation Pages/Laminated Corrugated Boxes/premium_variations_first.jpg",
          detailImages: [
            "/assets/images/categories/Corrugated Boxes/Premium  Variation Pages/Laminated Corrugated Boxes/premium_variations_second.jpg",
            "/assets/images/categories/Corrugated Boxes/Premium  Variation Pages/Laminated Corrugated Boxes/premium_variations_third.jpg",
            "/assets/images/categories/Corrugated Boxes/Premium  Variation Pages/Laminated Corrugated Boxes/premium_variations_fourth.jpg",
          ],
          heading: "Premium",
          title: "Laminated Corrugated Boxes",
          subtitle: "Litho laminate to flute — hero photography and fine type.",
          pdp: pdpFromProduct(CORRUGATED_PRODUCTS["corrugated-laminated"]),
        },
        {
          slug: "corrugated-eco-friendly",
          tabId: "premium_variations",
          cardImage:
            "/assets/images/categories/Corrugated Boxes/Premium  Variation Pages/Eco-Friendly Corrugated Boxes/premium_variations_first.jpg",
          detailImages: [
            "/assets/images/categories/Corrugated Boxes/Premium  Variation Pages/Eco-Friendly Corrugated Boxes/premium_variations_second.jpg",
            "/assets/images/categories/Corrugated Boxes/Premium  Variation Pages/Eco-Friendly Corrugated Boxes/premium_variations_third.jpg",
            "/assets/images/categories/Corrugated Boxes/Premium  Variation Pages/Eco-Friendly Corrugated Boxes/premium_variations_fourth.jpg",
          ],
          heading: "Premium",
          title: "Eco-Friendly Corrugated Boxes",
          subtitle: "Recycled content, paper void, credible end-of-life messaging.",
          pdp: pdpFromProduct(CORRUGATED_PRODUCTS["corrugated-eco-friendly"]),
        },
      ],
    },
    {
      category: "custom_pouches",
      cardImage: "/assets/images/categories/categories_layout/pouches/elegant_pouch_packaging_arrangement.png",
      bannerImages: [
        "/assets/images/categories/categories_layout/pouches/elegant_pouch_packaging_arrangement.png",
        "/assets/images/categories/categories_layout/pouches/elegant_pouch_packaging_arrangement%20(2).png",
        "/assets/images/categories/categories_layout/pouches/elegant_pouch_packaging_arrangement.png",
      ],
      tabs: [
        { id: "all", label: "All" },
        { id: "core_products", label: "Core Products" },
        { id: "use_case", label: "Use-case Based" },
        { id: "premium_variations", label: "Premium variations" },
      ],
      products: [
        {
          slug: "pouch-stand-up",
          tabId: "core_products",
          cardImage: "/assets/images/categories/Pouches/Pouches/Core Product Pages/Stand Up Pouches/download (5).jpg",
          detailImages: [
                    "/assets/images/categories/Pouches/Pouches/Core Product Pages/Stand Up Pouches/download (6).jpg",
                    "/assets/images/categories/Pouches/Pouches/Core Product Pages/Stand Up Pouches/Stand-up Pouch Packaging Mockup.jpg",
                    "/assets/images/categories/Pouches/Pouches/Core Product Pages/Stand Up Pouches/Superior Stand-Up Pouches for Food.jpg"
          ],
          heading: "Core",
          title: "Stand Up Pouches",
          subtitle: "Bottom gusset — shelf presence, zipper and valve options.",
          pdp: {
            title: "Stand Up Pouches",
            description: "Stand Up Pouches — custom films, seals, and fitments matched to your fill product, barrier needs, and line speed.",
            badges: ["CUSTOM POUCHES", "FLEX PACK", "BRANDS FACE STUDIO"],
            deals: [
              {
                title: "Barrier + seal audit",
                description: "We confirm OTR, WVTR, seal window, and fitment torque for your SKU before production.",
                code: "POUCHSEAL",
              },
              {
                title: "Proof pack — film + print",
                description: "Pilot laminate stack, registration, and finish on your chosen web before the full run.",
                code: "POUCHPROOF",
              },
            ],
            sizes: [
              { label: "S", dimensions: "Single-serve / sachet class" },
              { label: "M", dimensions: "Stand-up retail — 100–500 g typical" },
              { label: "L", dimensions: "Refill and club sizes" },
              { label: "Custom", dimensions: "Web width and fill volume to your VFFS / HFFS line" },
            ],
            features: [
              { label: "Range", value: "Stand Up Pouches" },
              { label: "Reference art", value: "download (5).jpg" },
              { label: "Formats", value: "Rollstock, pre-made pouches — die-line to CAD" },
              { label: "Print", value: "Gravure, flexo, digital (pilot runs)" },
              { label: "Min. order", value: "5,000 pouches" },
              { label: "Lead time", value: "8–18 business days" },
            ],
            details: "Gallery paths mirror on-disk references under Core Product Pages/Stand Up Pouches.\n\nWe align film structure, zipper or spout placement, and burst to your supply chain.\n\nBrands Face specs for retail, DTC, and refill programs.",
          },
        },
        {
          slug: "pouch-flat",
          tabId: "core_products",
          cardImage: "/assets/images/categories/Pouches/Pouches/Core Product Pages/Flat Pouches/14 New Face Masks Every Skin-Care Fan Needs to Know.jpg",
          detailImages: [
                    "/assets/images/categories/Pouches/Pouches/Core Product Pages/Flat Pouches/BeautyPro Masks.jpg",
                    "/assets/images/categories/Pouches/Pouches/Core Product Pages/Flat Pouches/Mascarillas faciales.jpg",
                    "/assets/images/categories/Pouches/Pouches/Core Product Pages/Flat Pouches/Second Face- Fask Mask Brand.jpg"
          ],
          heading: "Core",
          title: "Flat Pouches",
          subtitle: "Lay-flat — samples, sachets, minimal postage cube.",
          pdp: {
            title: "Flat Pouches",
            description: "Flat Pouches — custom films, seals, and fitments matched to your fill product, barrier needs, and line speed.",
            badges: ["CUSTOM POUCHES", "FLEX PACK", "BRANDS FACE STUDIO"],
            deals: [
              {
                title: "Barrier + seal audit",
                description: "We confirm OTR, WVTR, seal window, and fitment torque for your SKU before production.",
                code: "POUCHSEAL",
              },
              {
                title: "Proof pack — film + print",
                description: "Pilot laminate stack, registration, and finish on your chosen web before the full run.",
                code: "POUCHPROOF",
              },
            ],
            sizes: [
              { label: "S", dimensions: "Single-serve / sachet class" },
              { label: "M", dimensions: "Stand-up retail — 100–500 g typical" },
              { label: "L", dimensions: "Refill and club sizes" },
              { label: "Custom", dimensions: "Web width and fill volume to your VFFS / HFFS line" },
            ],
            features: [
              { label: "Range", value: "Flat Pouches" },
              { label: "Reference art", value: "14 New Face Masks Every Skin-Care Fan Needs to Know.jpg" },
              { label: "Formats", value: "Rollstock, pre-made pouches — die-line to CAD" },
              { label: "Print", value: "Gravure, flexo, digital (pilot runs)" },
              { label: "Min. order", value: "5,000 pouches" },
              { label: "Lead time", value: "8–18 business days" },
            ],
            details: "Gallery paths mirror on-disk references under Core Product Pages/Flat Pouches.\n\nWe align film structure, zipper or spout placement, and burst to your supply chain.\n\nBrands Face specs for retail, DTC, and refill programs.",
          },
        },
        {
          slug: "pouch-spout",
          tabId: "core_products",
          cardImage: "/assets/images/categories/Pouches/Pouches/Core Product Pages/Spout Pouches/Limited Edition Pocket Sprayers.jpg",
          detailImages: [
                    "/assets/images/categories/Pouches/Pouches/Core Product Pages/Spout Pouches/Rage liquid coffee - concentrated.jpg",
                    "/assets/images/categories/Pouches/Pouches/Core Product Pages/Spout Pouches/SearchSystem™.jpg",
                    "/assets/images/categories/Pouches/Pouches/Core Product Pages/Spout Pouches/Spout pouches with a top nozzle, so that pour the liquid out easily_.jpg"
          ],
          heading: "Core",
          title: "Spout Pouches",
          subtitle: "Fitments for liquids — pour, refill, and reclose.",
          pdp: {
            title: "Spout Pouches",
            description: "Spout Pouches — custom films, seals, and fitments matched to your fill product, barrier needs, and line speed.",
            badges: ["CUSTOM POUCHES", "FLEX PACK", "BRANDS FACE STUDIO"],
            deals: [
              {
                title: "Barrier + seal audit",
                description: "We confirm OTR, WVTR, seal window, and fitment torque for your SKU before production.",
                code: "POUCHSEAL",
              },
              {
                title: "Proof pack — film + print",
                description: "Pilot laminate stack, registration, and finish on your chosen web before the full run.",
                code: "POUCHPROOF",
              },
            ],
            sizes: [
              { label: "S", dimensions: "Single-serve / sachet class" },
              { label: "M", dimensions: "Stand-up retail — 100–500 g typical" },
              { label: "L", dimensions: "Refill and club sizes" },
              { label: "Custom", dimensions: "Web width and fill volume to your VFFS / HFFS line" },
            ],
            features: [
              { label: "Range", value: "Spout Pouches" },
              { label: "Reference art", value: "Limited Edition Pocket Sprayers.jpg" },
              { label: "Formats", value: "Rollstock, pre-made pouches — die-line to CAD" },
              { label: "Print", value: "Gravure, flexo, digital (pilot runs)" },
              { label: "Min. order", value: "5,000 pouches" },
              { label: "Lead time", value: "8–18 business days" },
            ],
            details: "Gallery paths mirror on-disk references under Core Product Pages/Spout Pouches.\n\nWe align film structure, zipper or spout placement, and burst to your supply chain.\n\nBrands Face specs for retail, DTC, and refill programs.",
          },
        },
        {
          slug: "pouch-zipper",
          tabId: "core_products",
          cardImage: "/assets/images/categories/Pouches/Pouches/Core Product Pages/Zipper Pouches/Brown standup zipper pouches.jpg",
          detailImages: [
                    "/assets/images/categories/Pouches/Pouches/Core Product Pages/Zipper Pouches/Clothing Branding_ 142+ Brand Designs for Streetwear & Luxury Apparel.jpg",
                    "/assets/images/categories/Pouches/Pouches/Core Product Pages/Zipper Pouches/download (5).jpg",
                    "/assets/images/categories/Pouches/Pouches/Core Product Pages/Zipper Pouches/E-comm brand packaging design.jpg"
          ],
          heading: "Core",
          title: "Zipper Pouches",
          subtitle: "Press-to-close tracks — pantry and multi-use DTC.",
          pdp: {
            title: "Zipper Pouches",
            description: "Zipper Pouches — custom films, seals, and fitments matched to your fill product, barrier needs, and line speed.",
            badges: ["CUSTOM POUCHES", "FLEX PACK", "BRANDS FACE STUDIO"],
            deals: [
              {
                title: "Barrier + seal audit",
                description: "We confirm OTR, WVTR, seal window, and fitment torque for your SKU before production.",
                code: "POUCHSEAL",
              },
              {
                title: "Proof pack — film + print",
                description: "Pilot laminate stack, registration, and finish on your chosen web before the full run.",
                code: "POUCHPROOF",
              },
            ],
            sizes: [
              { label: "S", dimensions: "Single-serve / sachet class" },
              { label: "M", dimensions: "Stand-up retail — 100–500 g typical" },
              { label: "L", dimensions: "Refill and club sizes" },
              { label: "Custom", dimensions: "Web width and fill volume to your VFFS / HFFS line" },
            ],
            features: [
              { label: "Range", value: "Zipper Pouches" },
              { label: "Reference art", value: "Brown standup zipper pouches.jpg" },
              { label: "Formats", value: "Rollstock, pre-made pouches — die-line to CAD" },
              { label: "Print", value: "Gravure, flexo, digital (pilot runs)" },
              { label: "Min. order", value: "5,000 pouches" },
              { label: "Lead time", value: "8–18 business days" },
            ],
            details: "Gallery paths mirror on-disk references under Core Product Pages/Zipper Pouches.\n\nWe align film structure, zipper or spout placement, and burst to your supply chain.\n\nBrands Face specs for retail, DTC, and refill programs.",
          },
        },
        {
          slug: "pouch-three-side-seal",
          tabId: "core_products",
          cardImage: "/assets/images/categories/Pouches/Pouches/Core Product Pages/Three Side Seal Pouches/3 Side Seal Pouch.jpg",
          detailImages: [
                    "/assets/images/categories/Pouches/Pouches/Core Product Pages/Three Side Seal Pouches/Custom Mylar Bags & Pouches in the UK.jpg",
                    "/assets/images/categories/Pouches/Pouches/Core Product Pages/Three Side Seal Pouches/Pack Week Shake x2 _ Weekontrol.jpg",
                    "/assets/images/categories/Pouches/Pouches/Core Product Pages/Three Side Seal Pouches/réaliste se lever poche maquette pour emballage et l'image de marque.jpg"
          ],
          heading: "Core",
          title: "Three Side Seal Pouches",
          subtitle: "HFFS-friendly — single-dose and stick formats.",
          pdp: {
            title: "Three Side Seal Pouches",
            description: "Three Side Seal Pouches — custom films, seals, and fitments matched to your fill product, barrier needs, and line speed.",
            badges: ["CUSTOM POUCHES", "FLEX PACK", "BRANDS FACE STUDIO"],
            deals: [
              {
                title: "Barrier + seal audit",
                description: "We confirm OTR, WVTR, seal window, and fitment torque for your SKU before production.",
                code: "POUCHSEAL",
              },
              {
                title: "Proof pack — film + print",
                description: "Pilot laminate stack, registration, and finish on your chosen web before the full run.",
                code: "POUCHPROOF",
              },
            ],
            sizes: [
              { label: "S", dimensions: "Single-serve / sachet class" },
              { label: "M", dimensions: "Stand-up retail — 100–500 g typical" },
              { label: "L", dimensions: "Refill and club sizes" },
              { label: "Custom", dimensions: "Web width and fill volume to your VFFS / HFFS line" },
            ],
            features: [
              { label: "Range", value: "Three Side Seal Pouches" },
              { label: "Reference art", value: "3 Side Seal Pouch.jpg" },
              { label: "Formats", value: "Rollstock, pre-made pouches — die-line to CAD" },
              { label: "Print", value: "Gravure, flexo, digital (pilot runs)" },
              { label: "Min. order", value: "5,000 pouches" },
              { label: "Lead time", value: "8–18 business days" },
            ],
            details: "Gallery paths mirror on-disk references under Core Product Pages/Three Side Seal Pouches.\n\nWe align film structure, zipper or spout placement, and burst to your supply chain.\n\nBrands Face specs for retail, DTC, and refill programs.",
          },
        },
        {
          slug: "pouch-four-side-seal",
          tabId: "core_products",
          cardImage: "/assets/images/categories/Pouches/Pouches/Core Product Pages/Four Side Seal Pouches/4-side-seal-bag-150x150.webp",
          detailImages: [
                    "/assets/images/categories/Pouches/Pouches/Core Product Pages/Four Side Seal Pouches/4-side-seal-bag-300x300.webp",
                    "/assets/images/categories/Pouches/Pouches/Core Product Pages/Four Side Seal Pouches/4-side-seal.jpg",
                    "/assets/images/categories/Pouches/Pouches/Core Product Pages/Four Side Seal Pouches/4-Sided-Seal-Pouch-Stream-Peak-Singapore.jpg"
          ],
          heading: "Core",
          title: "Four Side Seal Pouches",
          subtitle: "Full perimeter seal — crisp edges for retail sets.",
          pdp: {
            title: "Four Side Seal Pouches",
            description: "Four Side Seal Pouches — custom films, seals, and fitments matched to your fill product, barrier needs, and line speed.",
            badges: ["CUSTOM POUCHES", "FLEX PACK", "BRANDS FACE STUDIO"],
            deals: [
              {
                title: "Barrier + seal audit",
                description: "We confirm OTR, WVTR, seal window, and fitment torque for your SKU before production.",
                code: "POUCHSEAL",
              },
              {
                title: "Proof pack — film + print",
                description: "Pilot laminate stack, registration, and finish on your chosen web before the full run.",
                code: "POUCHPROOF",
              },
            ],
            sizes: [
              { label: "S", dimensions: "Single-serve / sachet class" },
              { label: "M", dimensions: "Stand-up retail — 100–500 g typical" },
              { label: "L", dimensions: "Refill and club sizes" },
              { label: "Custom", dimensions: "Web width and fill volume to your VFFS / HFFS line" },
            ],
            features: [
              { label: "Range", value: "Four Side Seal Pouches" },
              { label: "Reference art", value: "4-side-seal-bag-150x150.webp" },
              { label: "Formats", value: "Rollstock, pre-made pouches — die-line to CAD" },
              { label: "Print", value: "Gravure, flexo, digital (pilot runs)" },
              { label: "Min. order", value: "5,000 pouches" },
              { label: "Lead time", value: "8–18 business days" },
            ],
            details: "Gallery paths mirror on-disk references under Core Product Pages/Four Side Seal Pouches.\n\nWe align film structure, zipper or spout placement, and burst to your supply chain.\n\nBrands Face specs for retail, DTC, and refill programs.",
          },
        },
        {
          slug: "pouch-gusset",
          tabId: "core_products",
          cardImage: "/assets/images/categories/Pouches/Pouches/Core Product Pages/Gusset Pouches/Customized flat bottom pouch box pouch.jpg",
          detailImages: [
                    "/assets/images/categories/Pouches/Pouches/Core Product Pages/Gusset Pouches/Flat Bottom Pouch With Tear off Zipper.jpg",
                    "/assets/images/categories/Pouches/Pouches/Core Product Pages/Gusset Pouches/Stand Up Pouches (1).jpg",
                    "/assets/images/categories/Pouches/Pouches/Core Product Pages/Gusset Pouches/Stand Up Pouches.jpg"
          ],
          heading: "Core",
          title: "Gusset Pouches",
          subtitle: "Side or bottom gussets — more volume, controlled shelf footprint.",
          pdp: {
            title: "Gusset Pouches",
            description: "Gusset Pouches — custom films, seals, and fitments matched to your fill product, barrier needs, and line speed.",
            badges: ["CUSTOM POUCHES", "FLEX PACK", "BRANDS FACE STUDIO"],
            deals: [
              {
                title: "Barrier + seal audit",
                description: "We confirm OTR, WVTR, seal window, and fitment torque for your SKU before production.",
                code: "POUCHSEAL",
              },
              {
                title: "Proof pack — film + print",
                description: "Pilot laminate stack, registration, and finish on your chosen web before the full run.",
                code: "POUCHPROOF",
              },
            ],
            sizes: [
              { label: "S", dimensions: "Single-serve / sachet class" },
              { label: "M", dimensions: "Stand-up retail — 100–500 g typical" },
              { label: "L", dimensions: "Refill and club sizes" },
              { label: "Custom", dimensions: "Web width and fill volume to your VFFS / HFFS line" },
            ],
            features: [
              { label: "Range", value: "Gusset Pouches" },
              { label: "Reference art", value: "Customized flat bottom pouch box pouch.jpg" },
              { label: "Formats", value: "Rollstock, pre-made pouches — die-line to CAD" },
              { label: "Print", value: "Gravure, flexo, digital (pilot runs)" },
              { label: "Min. order", value: "5,000 pouches" },
              { label: "Lead time", value: "8–18 business days" },
            ],
            details: "Gallery paths mirror on-disk references under Core Product Pages/Gusset Pouches.\n\nWe align film structure, zipper or spout placement, and burst to your supply chain.\n\nBrands Face specs for retail, DTC, and refill programs.",
          },
        },
        {
          slug: "pouch-pillow",
          tabId: "core_products",
          cardImage: "/assets/images/categories/Pouches/Pouches/Core Product Pages/Pillow Pouches/OFFICE Cafe.jpg",
          detailImages: [
                    "/assets/images/categories/Pouches/Pouches/Core Product Pages/Pillow Pouches/OIP (1).webp",
                    "/assets/images/categories/Pouches/Pouches/Core Product Pages/Pillow Pouches/OIP (2).webp",
                    "/assets/images/categories/Pouches/Pouches/Core Product Pages/Pillow Pouches/OIP.webp"
                    
          ],
          heading: "Core",
          title: "Pillow Pouches",
          subtitle: "VFFS-friendly — economical single-serve.",
          pdp: {
            title: "Pillow Pouches",
            description: "Pillow Pouches — custom films, seals, and fitments matched to your fill product, barrier needs, and line speed.",
            badges: ["CUSTOM POUCHES", "FLEX PACK", "BRANDS FACE STUDIO"],
            deals: [
              {
                title: "Barrier + seal audit",
                description: "We confirm OTR, WVTR, seal window, and fitment torque for your SKU before production.",
                code: "POUCHSEAL",
              },
              {
                title: "Proof pack — film + print",
                description: "Pilot laminate stack, registration, and finish on your chosen web before the full run.",
                code: "POUCHPROOF",
              },
            ],
            sizes: [
              { label: "S", dimensions: "Single-serve / sachet class" },
              { label: "M", dimensions: "Stand-up retail — 100–500 g typical" },
              { label: "L", dimensions: "Refill and club sizes" },
              { label: "Custom", dimensions: "Web width and fill volume to your VFFS / HFFS line" },
            ],
            features: [
              { label: "Range", value: "Pillow Pouches" },
              { label: "Reference art", value: "OFFICE Café designed by ‘FROM GRAPHIC’ Coffee break #packaging PD.jpg" },
              { label: "Formats", value: "Rollstock, pre-made pouches — die-line to CAD" },
              { label: "Print", value: "Gravure, flexo, digital (pilot runs)" },
              { label: "Min. order", value: "5,000 pouches" },
              { label: "Lead time", value: "8–18 business days" },
            ],
            details: "Gallery paths mirror on-disk references under Core Product Pages/Pillow Pouches.\n\nWe align film structure, zipper or spout placement, and burst to your supply chain.\n\nBrands Face specs for retail, DTC, and refill programs.",
          },
        },
        {
          slug: "pouch-sachet",
          tabId: "core_products",
          cardImage: "/assets/images/categories/Pouches/Pouches/Core Product Pages/Sachet Pouches/Custom Printed Moisture Barrier 3 Side Seal Matte Drip Coffee Sachet Bags.jpg",
          detailImages: [
                    "/assets/images/categories/Pouches/Pouches/Core Product Pages/Sachet Pouches/Free Modern Pouch Sachet Mockup.jpg",
                    "/assets/images/categories/Pouches/Pouches/Core Product Pages/Sachet Pouches/Sachet Mockup Set (1).jpg",
                    "/assets/images/categories/Pouches/Pouches/Core Product Pages/Sachet Pouches/Sachet Mockup Set.jpg"
          ],
          heading: "Core",
          title: "Sachet Pouches",
          subtitle: "Single-dose — serums, condiments, powders.",
          pdp: {
            title: "Sachet Pouches",
            description: "Sachet Pouches — custom films, seals, and fitments matched to your fill product, barrier needs, and line speed.",
            badges: ["CUSTOM POUCHES", "FLEX PACK", "BRANDS FACE STUDIO"],
            deals: [
              {
                title: "Barrier + seal audit",
                description: "We confirm OTR, WVTR, seal window, and fitment torque for your SKU before production.",
                code: "POUCHSEAL",
              },
              {
                title: "Proof pack — film + print",
                description: "Pilot laminate stack, registration, and finish on your chosen web before the full run.",
                code: "POUCHPROOF",
              },
            ],
            sizes: [
              { label: "S", dimensions: "Single-serve / sachet class" },
              { label: "M", dimensions: "Stand-up retail — 100–500 g typical" },
              { label: "L", dimensions: "Refill and club sizes" },
              { label: "Custom", dimensions: "Web width and fill volume to your VFFS / HFFS line" },
            ],
            features: [
              { label: "Range", value: "Sachet Pouches" },
              { label: "Reference art", value: "Custom Printed Moisture Barrier 3 Side Seal Matte Drip Coffee Sachet Bags.jpg" },
              { label: "Formats", value: "Rollstock, pre-made pouches — die-line to CAD" },
              { label: "Print", value: "Gravure, flexo, digital (pilot runs)" },
              { label: "Min. order", value: "5,000 pouches" },
              { label: "Lead time", value: "8–18 business days" },
            ],
            details: "Gallery paths mirror on-disk references under Core Product Pages/Sachet Pouches.\n\nWe align film structure, zipper or spout placement, and burst to your supply chain.\n\nBrands Face specs for retail, DTC, and refill programs.",
          },
        },
        {
          slug: "pouch-die-cut",
          tabId: "core_products",
          cardImage: "/assets/images/categories/Pouches/Pouches/Core Product Pages/Die-Cut Pouches/Shaped Pouch Packaging in Australia.jpg",
          detailImages: [
                    "/assets/images/categories/Pouches/Pouches/Core Product Pages/Die-Cut Pouches/Shaped Pouches (1).jpg",
                    "/assets/images/categories/Pouches/Pouches/Core Product Pages/Die-Cut Pouches/Shaped Pouches.jpg",
                    "/assets/images/categories/Pouches/Pouches/Core Product Pages/Die-Cut Pouches/We are the Shaped Pouch Manufacturers in Delhi India, here you can find Shaped Pouch, Bottle Shaped Pouch, Shaped Stand Up P.jpg"
          ],
          heading: "Core",
          title: "Die-Cut Pouches",
          subtitle: "Custom shapes, windows, and hang holes for retail.",
          pdp: {
            title: "Die-Cut Pouches",
            description: "Die-Cut Pouches — custom films, seals, and fitments matched to your fill product, barrier needs, and line speed.",
            badges: ["CUSTOM POUCHES", "FLEX PACK", "BRANDS FACE STUDIO"],
            deals: [
              {
                title: "Barrier + seal audit",
                description: "We confirm OTR, WVTR, seal window, and fitment torque for your SKU before production.",
                code: "POUCHSEAL",
              },
              {
                title: "Proof pack — film + print",
                description: "Pilot laminate stack, registration, and finish on your chosen web before the full run.",
                code: "POUCHPROOF",
              },
            ],
            sizes: [
              { label: "S", dimensions: "Single-serve / sachet class" },
              { label: "M", dimensions: "Stand-up retail — 100–500 g typical" },
              { label: "L", dimensions: "Refill and club sizes" },
              { label: "Custom", dimensions: "Web width and fill volume to your VFFS / HFFS line" },
            ],
            features: [
              { label: "Range", value: "Die-Cut Pouches" },
              { label: "Reference art", value: "Shaped Pouch Packaging in Australia.jpg" },
              { label: "Formats", value: "Rollstock, pre-made pouches — die-line to CAD" },
              { label: "Print", value: "Gravure, flexo, digital (pilot runs)" },
              { label: "Min. order", value: "5,000 pouches" },
              { label: "Lead time", value: "8–18 business days" },
            ],
            details: "Gallery paths mirror on-disk references under Core Product Pages/Die-Cut Pouches.\n\nWe align film structure, zipper or spout placement, and burst to your supply chain.\n\nBrands Face specs for retail, DTC, and refill programs.",
          },
        },
        {
          slug: "pouch-cosmetic",
          tabId: "use_case",
          cardImage: "/assets/images/categories/Pouches/Pouches/Use-Case Based Pages/Cosmetic Pouches/Free Cosmetic Refill Pouch Mockups PSD.jpg",
          detailImages: [
                    "/assets/images/categories/Pouches/Pouches/Use-Case Based Pages/Cosmetic Pouches/Gel Travel Pouches.jpg",
                    "/assets/images/categories/Pouches/Pouches/Use-Case Based Pages/Cosmetic Pouches/Get the Latest Hair & Beauty Products at KITSCH _ Free Shipping over $35.jpg",
                    "/assets/images/categories/Pouches/Pouches/Use-Case Based Pages/Cosmetic Pouches/Sephora Australia.jpg"
          ],
          heading: "Use case",
          title: "Cosmetic Pouches",
          subtitle: "Wipes and colour — matte film, compliance panels.",
          pdp: {
            title: "Cosmetic Pouches",
            description: "Cosmetic Pouches — custom films, seals, and fitments matched to your fill product, barrier needs, and line speed.",
            badges: ["CUSTOM POUCHES", "FLEX PACK", "BRANDS FACE STUDIO"],
            deals: [
              {
                title: "Barrier + seal audit",
                description: "We confirm OTR, WVTR, seal window, and fitment torque for your SKU before production.",
                code: "POUCHSEAL",
              },
              {
                title: "Proof pack — film + print",
                description: "Pilot laminate stack, registration, and finish on your chosen web before the full run.",
                code: "POUCHPROOF",
              },
            ],
            sizes: [
              { label: "S", dimensions: "Single-serve / sachet class" },
              { label: "M", dimensions: "Stand-up retail — 100–500 g typical" },
              { label: "L", dimensions: "Refill and club sizes" },
              { label: "Custom", dimensions: "Web width and fill volume to your VFFS / HFFS line" },
            ],
            features: [
              { label: "Range", value: "Cosmetic Pouches" },
              { label: "Reference art", value: "Free Cosmetic Refill Pouch Mockups PSD.jpg" },
              { label: "Formats", value: "Rollstock, pre-made pouches — die-line to CAD" },
              { label: "Print", value: "Gravure, flexo, digital (pilot runs)" },
              { label: "Min. order", value: "5,000 pouches" },
              { label: "Lead time", value: "8–18 business days" },
            ],
            details: "Gallery paths mirror on-disk references under Use-Case Based Pages/Cosmetic Pouches.\n\nWe align film structure, zipper or spout placement, and burst to your supply chain.\n\nBrands Face specs for retail, DTC, and refill programs.",
          },
        },
        {
          slug: "pouch-skincare",
          tabId: "use_case",
          cardImage: "/assets/images/categories/Pouches/Pouches/Use-Case Based Pages/Skincare Pouches/Custom Lotion Shampoo Skincare Sample Sachet 3 Side Sealed Bag Small Aluminum Foil Mini Flat Packaging Bags - Buy Ustom Logo.jpg",
          detailImages: [
                    "/assets/images/categories/Pouches/Pouches/Use-Case Based Pages/Skincare Pouches/download (5).jpg",
                    "/assets/images/categories/Pouches/Pouches/Use-Case Based Pages/Skincare Pouches/download (6).jpg",
                    "/assets/images/categories/Pouches/Pouches/Use-Case Based Pages/Skincare Pouches/Gel Travel Pouches.jpg"
          ],
          heading: "Use case",
          title: "Skincare Pouches",
          subtitle: "Serum, mask, refill — barrier matched to actives.",
          pdp: {
            title: "Skincare Pouches",
            description: "Skincare Pouches — custom films, seals, and fitments matched to your fill product, barrier needs, and line speed.",
            badges: ["CUSTOM POUCHES", "FLEX PACK", "BRANDS FACE STUDIO"],
            deals: [
              {
                title: "Barrier + seal audit",
                description: "We confirm OTR, WVTR, seal window, and fitment torque for your SKU before production.",
                code: "POUCHSEAL",
              },
              {
                title: "Proof pack — film + print",
                description: "Pilot laminate stack, registration, and finish on your chosen web before the full run.",
                code: "POUCHPROOF",
              },
            ],
            sizes: [
              { label: "S", dimensions: "Single-serve / sachet class" },
              { label: "M", dimensions: "Stand-up retail — 100–500 g typical" },
              { label: "L", dimensions: "Refill and club sizes" },
              { label: "Custom", dimensions: "Web width and fill volume to your VFFS / HFFS line" },
            ],
            features: [
              { label: "Range", value: "Skincare Pouches" },
              { label: "Reference art", value: "Custom Lotion Shampoo Skincare Sample Sachet 3 Side Sealed Bag Small Aluminum Foil Mini Flat Packaging Bags - Buy Ustom Logo.jpg" },
              { label: "Formats", value: "Rollstock, pre-made pouches — die-line to CAD" },
              { label: "Print", value: "Gravure, flexo, digital (pilot runs)" },
              { label: "Min. order", value: "5,000 pouches" },
              { label: "Lead time", value: "8–18 business days" },
            ],
            details: "Gallery paths mirror on-disk references under Use-Case Based Pages/Skincare Pouches.\n\nWe align film structure, zipper or spout placement, and burst to your supply chain.\n\nBrands Face specs for retail, DTC, and refill programs.",
          },
        },
        {
          slug: "pouch-makeup",
          tabId: "use_case",
          cardImage: "/assets/images/categories/Pouches/Pouches/Use-Case Based Pages/Makeup Pouches/cynthia ess on Instagram_ “Packaging too cute to open 👌🏻 Hello new @kosascosmetics LipFuel Hyaluronic Lip Balms_! Comes in.jpg",
          detailImages: [
                    "/assets/images/categories/Pouches/Pouches/Use-Case Based Pages/Makeup Pouches/download (5).jpg",
                    "/assets/images/categories/Pouches/Pouches/Use-Case Based Pages/Makeup Pouches/download (6).jpg",
                    "/assets/images/categories/Pouches/Pouches/Use-Case Based Pages/Makeup Pouches/Ramer Sponges.jpg"
          ],
          heading: "Use case",
          title: "Makeup Pouches",
          subtitle: "Remover wipes, travel sets — soft-touch and zips.",
          pdp: {
            title: "Makeup Pouches",
            description: "Makeup Pouches — custom films, seals, and fitments matched to your fill product, barrier needs, and line speed.",
            badges: ["CUSTOM POUCHES", "FLEX PACK", "BRANDS FACE STUDIO"],
            deals: [
              {
                title: "Barrier + seal audit",
                description: "We confirm OTR, WVTR, seal window, and fitment torque for your SKU before production.",
                code: "POUCHSEAL",
              },
              {
                title: "Proof pack — film + print",
                description: "Pilot laminate stack, registration, and finish on your chosen web before the full run.",
                code: "POUCHPROOF",
              },
            ],
            sizes: [
              { label: "S", dimensions: "Single-serve / sachet class" },
              { label: "M", dimensions: "Stand-up retail — 100–500 g typical" },
              { label: "L", dimensions: "Refill and club sizes" },
              { label: "Custom", dimensions: "Web width and fill volume to your VFFS / HFFS line" },
            ],
            features: [
              { label: "Range", value: "Makeup Pouches" },
              { label: "Reference art", value: "cynthia ess on Instagram_ “Packaging too cute to open 👌🏻 Hello new @kosascosmetics LipFuel Hyaluronic Lip Balms_! Comes in.jpg" },
              { label: "Formats", value: "Rollstock, pre-made pouches — die-line to CAD" },
              { label: "Print", value: "Gravure, flexo, digital (pilot runs)" },
              { label: "Min. order", value: "5,000 pouches" },
              { label: "Lead time", value: "8–18 business days" },
            ],
            details: "Gallery paths mirror on-disk references under Use-Case Based Pages/Makeup Pouches.\n\nWe align film structure, zipper or spout placement, and burst to your supply chain.\n\nBrands Face specs for retail, DTC, and refill programs.",
          },
        },
        {
          slug: "pouch-hair-care",
          tabId: "use_case",
          cardImage: "/assets/images/categories/Pouches/Pouches/Use-Case Based Pages/Hair Care Pouches/abb4be57be7858ab47b1323ec2f9dd4e.jpg",
          detailImages: [
                    "/assets/images/categories/Pouches/Pouches/Use-Case Based Pages/Hair Care Pouches/d66d9b680a4e620552e1aef6e761efc0.png",
                    "/assets/images/categories/Pouches/Pouches/Use-Case Based Pages/Hair Care Pouches/ed4aab32bbfa2f00e9a234e29eba0e95.jpg",
                    "/assets/images/categories/Pouches/Pouches/Use-Case Based Pages/Hair Care Pouches/ef421336d1324223ed37d8ccfaad8e47.jpg"
          ],
          heading: "Use case",
          title: "Hair Care Pouches",
          subtitle: "Refill volumes — spout, surfactant-compatible barriers.",
          pdp: {
            title: "Hair Care Pouches",
            description: "Hair Care Pouches — custom films, seals, and fitments matched to your fill product, barrier needs, and line speed.",
            badges: ["CUSTOM POUCHES", "FLEX PACK", "BRANDS FACE STUDIO"],
            deals: [
              {
                title: "Barrier + seal audit",
                description: "We confirm OTR, WVTR, seal window, and fitment torque for your SKU before production.",
                code: "POUCHSEAL",
              },
              {
                title: "Proof pack — film + print",
                description: "Pilot laminate stack, registration, and finish on your chosen web before the full run.",
                code: "POUCHPROOF",
              },
            ],
            sizes: [
              { label: "S", dimensions: "Single-serve / sachet class" },
              { label: "M", dimensions: "Stand-up retail — 100–500 g typical" },
              { label: "L", dimensions: "Refill and club sizes" },
              { label: "Custom", dimensions: "Web width and fill volume to your VFFS / HFFS line" },
            ],
            features: [
              { label: "Range", value: "Hair Care Pouches" },
              { label: "Reference art", value: "abb4be57be7858ab47b1323ec2f9dd4e.jpg" },
              { label: "Formats", value: "Rollstock, pre-made pouches — die-line to CAD" },
              { label: "Print", value: "Gravure, flexo, digital (pilot runs)" },
              { label: "Min. order", value: "5,000 pouches" },
              { label: "Lead time", value: "8–18 business days" },
            ],
            details: "Gallery paths mirror on-disk references under Use-Case Based Pages/Hair Care Pouches.\n\nWe align film structure, zipper or spout placement, and burst to your supply chain.\n\nBrands Face specs for retail, DTC, and refill programs.",
          },
        },
        {
          slug: "pouch-sample",
          tabId: "use_case",
          cardImage: "/assets/images/categories/Pouches/Pouches/Use-Case Based Pages/Sample Pouches/17ebabb73dcb90efdd9fc536e36e5a73.jpg",
          detailImages: [
                    "/assets/images/categories/Pouches/Pouches/Use-Case Based Pages/Sample Pouches/22a41a47cbcfe1f60955e8a1cc2092f5.webp",
                    "/assets/images/categories/Pouches/Pouches/Use-Case Based Pages/Sample Pouches/3a424229e40d734db51f810346c569c8.jpg",
                    "/assets/images/categories/Pouches/Pouches/Use-Case Based Pages/Sample Pouches/C137-51 - QQ Studio Pink Foil Packaging Bags for Cosmetics, Lotion Sample Bags, Skin Cream Bags, Bottle Shaped.jpg"
          ],
          heading: "Use case",
          title: "Sample Pouches",
          subtitle: "Trial and GWP — small doses, fast turns.",
          pdp: {
            title: "Sample Pouches",
            description: "Sample Pouches — custom films, seals, and fitments matched to your fill product, barrier needs, and line speed.",
            badges: ["CUSTOM POUCHES", "FLEX PACK", "BRANDS FACE STUDIO"],
            deals: [
              {
                title: "Barrier + seal audit",
                description: "We confirm OTR, WVTR, seal window, and fitment torque for your SKU before production.",
                code: "POUCHSEAL",
              },
              {
                title: "Proof pack — film + print",
                description: "Pilot laminate stack, registration, and finish on your chosen web before the full run.",
                code: "POUCHPROOF",
              },
            ],
            sizes: [
              { label: "S", dimensions: "Single-serve / sachet class" },
              { label: "M", dimensions: "Stand-up retail — 100–500 g typical" },
              { label: "L", dimensions: "Refill and club sizes" },
              { label: "Custom", dimensions: "Web width and fill volume to your VFFS / HFFS line" },
            ],
            features: [
              { label: "Range", value: "Sample Pouches" },
              { label: "Reference art", value: "17ebabb73dcb90efdd9fc536e36e5a73.jpg" },
              { label: "Formats", value: "Rollstock, pre-made pouches — die-line to CAD" },
              { label: "Print", value: "Gravure, flexo, digital (pilot runs)" },
              { label: "Min. order", value: "2,500 pouches" },
              { label: "Lead time", value: "8–18 business days" },
            ],
            details: "Gallery paths mirror on-disk references under Use-Case Based Pages/Sample Pouches.\n\nWe align film structure, zipper or spout placement, and burst to your supply chain.\n\nBrands Face specs for retail, DTC, and refill programs.",
          },
        },
        {
          slug: "pouch-travel-size",
          tabId: "use_case",
          cardImage: "/assets/images/categories/Pouches/Pouches/Use-Case Based Pages/Travel Size Pouches/21Pcs Travel Portable Size Refillable Empty Squeeze Pouch Stand Up Business Trip Portable Spout Pouch Refillable Empty Squee.jpg",
          detailImages: [
                    "/assets/images/categories/Pouches/Pouches/Use-Case Based Pages/Travel Size Pouches/Alo Unisex Bath and body.jpg",
                    "/assets/images/categories/Pouches/Pouches/Use-Case Based Pages/Travel Size Pouches/FREE to glow✨.jpg",
                    "/assets/images/categories/Pouches/Pouches/Use-Case Based Pages/Travel Size Pouches/Qq Studio Hand Wash Liquid Bottle Bags With Flip Open Cap And Translucent Window.jpg"
          ],
          heading: "Use case",
          title: "Travel Size Pouches",
          subtitle: "TSA-friendly — leak discipline, reclose.",
          pdp: {
            title: "Travel Size Pouches",
            description: "Travel Size Pouches — custom films, seals, and fitments matched to your fill product, barrier needs, and line speed.",
            badges: ["CUSTOM POUCHES", "FLEX PACK", "BRANDS FACE STUDIO"],
            deals: [
              {
                title: "Barrier + seal audit",
                description: "We confirm OTR, WVTR, seal window, and fitment torque for your SKU before production.",
                code: "POUCHSEAL",
              },
              {
                title: "Proof pack — film + print",
                description: "Pilot laminate stack, registration, and finish on your chosen web before the full run.",
                code: "POUCHPROOF",
              },
            ],
            sizes: [
              { label: "S", dimensions: "Single-serve / sachet class" },
              { label: "M", dimensions: "Stand-up retail — 100–500 g typical" },
              { label: "L", dimensions: "Refill and club sizes" },
              { label: "Custom", dimensions: "Web width and fill volume to your VFFS / HFFS line" },
            ],
            features: [
              { label: "Range", value: "Travel Size Pouches" },
              { label: "Reference art", value: "21Pcs Travel Portable Size Refillable Empty Squeeze Pouch Stand Up Business Trip Portable Spout Pouch Refillable Empty Squee.jpg" },
              { label: "Formats", value: "Rollstock, pre-made pouches — die-line to CAD" },
              { label: "Print", value: "Gravure, flexo, digital (pilot runs)" },
              { label: "Min. order", value: "5,000 pouches" },
              { label: "Lead time", value: "8–18 business days" },
            ],
            details: "Gallery paths mirror on-disk references under Use-Case Based Pages/Travel Size Pouches.\n\nWe align film structure, zipper or spout placement, and burst to your supply chain.\n\nBrands Face specs for retail, DTC, and refill programs.",
          },
        },
        {
          slug: "pouch-refill",
          tabId: "use_case",
          cardImage: "/assets/images/categories/Pouches/Pouches/Use-Case Based Pages/Refill Pouches/30_50_100ml Reusable Travel Pack Refill Pack Lotion Dispenser Bag Shampoo Transparent.jpg",
          detailImages: [
                    "/assets/images/categories/Pouches/Pouches/Use-Case Based Pages/Refill Pouches/Refill Discovery _ 6-Pack.jpg",
                    "/assets/images/categories/Pouches/Pouches/Use-Case Based Pages/Refill Pouches/The problem with refill pouches_ they're not as sustainable as you thought.jpg",
                    "/assets/images/categories/Pouches/Pouches/Use-Case Based Pages/Refill Pouches/Wonder·Land Refill Pouch.jpg"
          ],
          heading: "Use case",
          title: "Refill Pouches",
          subtitle: "Bulk refill — spout, handle, plastic-reduction story.",
          pdp: {
            title: "Refill Pouches",
            description: "Refill Pouches — custom films, seals, and fitments matched to your fill product, barrier needs, and line speed.",
            badges: ["CUSTOM POUCHES", "FLEX PACK", "BRANDS FACE STUDIO"],
            deals: [
              {
                title: "Barrier + seal audit",
                description: "We confirm OTR, WVTR, seal window, and fitment torque for your SKU before production.",
                code: "POUCHSEAL",
              },
              {
                title: "Proof pack — film + print",
                description: "Pilot laminate stack, registration, and finish on your chosen web before the full run.",
                code: "POUCHPROOF",
              },
            ],
            sizes: [
              { label: "S", dimensions: "Single-serve / sachet class" },
              { label: "M", dimensions: "Stand-up retail — 100–500 g typical" },
              { label: "L", dimensions: "Refill and club sizes" },
              { label: "Custom", dimensions: "Web width and fill volume to your VFFS / HFFS line" },
            ],
            features: [
              { label: "Range", value: "Refill Pouches" },
              { label: "Reference art", value: "30_50_100ml Reusable Travel Pack Refill Pack Lotion Dispenser Bag Shampoo Transparent.jpg" },
              { label: "Formats", value: "Rollstock, pre-made pouches — die-line to CAD" },
              { label: "Print", value: "Gravure, flexo, digital (pilot runs)" },
              { label: "Min. order", value: "5,000 pouches" },
              { label: "Lead time", value: "8–18 business days" },
            ],
            details: "Gallery paths mirror on-disk references under Use-Case Based Pages/Refill Pouches.\n\nWe align film structure, zipper or spout placement, and burst to your supply chain.\n\nBrands Face specs for retail, DTC, and refill programs.",
          },
        },
        {
          slug: "pouch-retail",
          tabId: "use_case",
          cardImage: "/assets/images/categories/Pouches/Pouches/Use-Case Based Pages/Retail Pouches/30_50_100ml Reusable Travel Pack Refill Pack Lotion Dispenser Bag Shampoo Transparent.jpg",
          detailImages: [
                    "/assets/images/categories/Pouches/Pouches/Use-Case Based Pages/Retail Pouches/Custom Gradient Matte Foil Pouches _ Double-Sided Opaque Metallized Packaging (Low MOQ).jpg",
                    "/assets/images/categories/Pouches/Pouches/Use-Case Based Pages/Retail Pouches/Custom Pouch Packaging Hang Hole Options.jpg",
                    "/assets/images/categories/Pouches/Pouches/Use-Case Based Pages/Retail Pouches/Superior Stand-Up Pouches for Food.jpg"
          ],
          heading: "Use case",
          title: "Retail Pouches",
          subtitle: "Hang holes, planogram stiffness, high-impact print.",
          pdp: {
            title: "Retail Pouches",
            description: "Retail Pouches — custom films, seals, and fitments matched to your fill product, barrier needs, and line speed.",
            badges: ["CUSTOM POUCHES", "FLEX PACK", "BRANDS FACE STUDIO"],
            deals: [
              {
                title: "Barrier + seal audit",
                description: "We confirm OTR, WVTR, seal window, and fitment torque for your SKU before production.",
                code: "POUCHSEAL",
              },
              {
                title: "Proof pack — film + print",
                description: "Pilot laminate stack, registration, and finish on your chosen web before the full run.",
                code: "POUCHPROOF",
              },
            ],
            sizes: [
              { label: "S", dimensions: "Single-serve / sachet class" },
              { label: "M", dimensions: "Stand-up retail — 100–500 g typical" },
              { label: "L", dimensions: "Refill and club sizes" },
              { label: "Custom", dimensions: "Web width and fill volume to your VFFS / HFFS line" },
            ],
            features: [
              { label: "Range", value: "Retail Pouches" },
              { label: "Reference art", value: "30_50_100ml Reusable Travel Pack Refill Pack Lotion Dispenser Bag Shampoo Transparent.jpg" },
              { label: "Formats", value: "Rollstock, pre-made pouches — die-line to CAD" },
              { label: "Print", value: "Gravure, flexo, digital (pilot runs)" },
              { label: "Min. order", value: "5,000 pouches" },
              { label: "Lead time", value: "8–18 business days" },
            ],
            details: "Gallery paths mirror on-disk references under Use-Case Based Pages/Retail Pouches.\n\nWe align film structure, zipper or spout placement, and burst to your supply chain.\n\nBrands Face specs for retail, DTC, and refill programs.",
          },
        },
        {
          slug: "pouch-gift",
          tabId: "use_case",
          cardImage: "/assets/images/categories/Pouches/Pouches/Use-Case Based Pages/Gift Pouches/31 Of The Best Gifts To Get At Urban Outfitters This Year.jpg",
          detailImages: [
                    "/assets/images/categories/Pouches/Pouches/Use-Case Based Pages/Gift Pouches/50-500 Custom Purple Poly Mailers Bag, Custom Shipping Bag With One Color Logo, Custom Matte Postage Bag.jpg",
                    "/assets/images/categories/Pouches/Pouches/Use-Case Based Pages/Gift Pouches/BINU BINU Soap House.jpg",
                    "/assets/images/categories/Pouches/Pouches/Use-Case Based Pages/Gift Pouches/Envelope de segurança para envios!.jpg"
          ],
          heading: "Use case",
          title: "Gift Pouches",
          subtitle: "Premium finishes — foil, matte, seasonal campaigns.",
          pdp: {
            title: "Gift Pouches",
            description: "Gift Pouches — custom films, seals, and fitments matched to your fill product, barrier needs, and line speed.",
            badges: ["CUSTOM POUCHES", "FLEX PACK", "BRANDS FACE STUDIO"],
            deals: [
              {
                title: "Barrier + seal audit",
                description: "We confirm OTR, WVTR, seal window, and fitment torque for your SKU before production.",
                code: "POUCHSEAL",
              },
              {
                title: "Proof pack — film + print",
                description: "Pilot laminate stack, registration, and finish on your chosen web before the full run.",
                code: "POUCHPROOF",
              },
            ],
            sizes: [
              { label: "S", dimensions: "Single-serve / sachet class" },
              { label: "M", dimensions: "Stand-up retail — 100–500 g typical" },
              { label: "L", dimensions: "Refill and club sizes" },
              { label: "Custom", dimensions: "Web width and fill volume to your VFFS / HFFS line" },
            ],
            features: [
              { label: "Range", value: "Gift Pouches" },
              { label: "Reference art", value: "31 Of The Best Gifts To Get At Urban Outfitters This Year.jpg" },
              { label: "Formats", value: "Rollstock, pre-made pouches — die-line to CAD" },
              { label: "Print", value: "Gravure, flexo, digital (pilot runs)" },
              { label: "Min. order", value: "5,000 pouches" },
              { label: "Lead time", value: "8–18 business days" },
            ],
            details: "Gallery paths mirror on-disk references under Use-Case Based Pages/Gift Pouches.\n\nWe align film structure, zipper or spout placement, and burst to your supply chain.\n\nBrands Face specs for retail, DTC, and refill programs.",
          },
        },
        {
          slug: "pouch-promotional",
          tabId: "use_case",
          cardImage: "/assets/images/categories/Pouches/Pouches/Use-Case Based Pages/Promotional Pouches/6e77249d879f72853086af4e0efd887b.jpg",
          detailImages: [
                    "/assets/images/categories/Pouches/Pouches/Use-Case Based Pages/Promotional Pouches/Custom Branded Stand-Up Pouches, Client Gifts, Corporate Packaging, Small Business Thank You.jpg",
                    "/assets/images/categories/Pouches/Pouches/Use-Case Based Pages/Promotional Pouches/Custom LogoZip Lock Biodegradable Custom Printed.jpg",
                    "/assets/images/categories/Pouches/Pouches/Use-Case Based Pages/Promotional Pouches/Same Amazing Product, Now at a Lower Price!.jpg"
          ],
          heading: "Use case",
          title: "Promotional Pouches",
          subtitle: "Events and giveaways — bold print, fast production.",
          pdp: {
            title: "Promotional Pouches",
            description: "Promotional Pouches — custom films, seals, and fitments matched to your fill product, barrier needs, and line speed.",
            badges: ["CUSTOM POUCHES", "FLEX PACK", "BRANDS FACE STUDIO"],
            deals: [
              {
                title: "Barrier + seal audit",
                description: "We confirm OTR, WVTR, seal window, and fitment torque for your SKU before production.",
                code: "POUCHSEAL",
              },
              {
                title: "Proof pack — film + print",
                description: "Pilot laminate stack, registration, and finish on your chosen web before the full run.",
                code: "POUCHPROOF",
              },
            ],
            sizes: [
              { label: "S", dimensions: "Single-serve / sachet class" },
              { label: "M", dimensions: "Stand-up retail — 100–500 g typical" },
              { label: "L", dimensions: "Refill and club sizes" },
              { label: "Custom", dimensions: "Web width and fill volume to your VFFS / HFFS line" },
            ],
            features: [
              { label: "Range", value: "Promotional Pouches" },
              { label: "Reference art", value: "6e77249d879f72853086af4e0efd887b.jpg" },
              { label: "Formats", value: "Rollstock, pre-made pouches — die-line to CAD" },
              { label: "Print", value: "Gravure, flexo, digital (pilot runs)" },
              { label: "Min. order", value: "10,000 pouches" },
              { label: "Lead time", value: "8–18 business days" },
            ],
            details: "Gallery paths mirror on-disk references under Use-Case Based Pages/Promotional Pouches.\n\nWe align film structure, zipper or spout placement, and burst to your supply chain.\n\nBrands Face specs for retail, DTC, and refill programs.",
          },
        },
        {
          slug: "pouch-printed",
          tabId: "premium_variations",
          cardImage: "/assets/images/categories/Pouches/Pouches/Premium  Variation Pages/Printed Pouches/All Products.jpg",
          detailImages: [
                    "/assets/images/categories/Pouches/Pouches/Premium  Variation Pages/Printed Pouches/download (5).jpg",
                    "/assets/images/categories/Pouches/Pouches/Premium  Variation Pages/Printed Pouches/Free Stand Up Pouch Packaging Mockup (PSD).jpg",
                    "/assets/images/categories/Pouches/Pouches/Premium  Variation Pages/Printed Pouches/Stand-Up PSD Pouch Packaging Mockup » CSS Author.jpg"
          ],
          heading: "Premium",
          title: "Printed Pouches",
          subtitle: "Rotogravure / flexo — full bleed, brand colour control.",
          pdp: {
            title: "Printed Pouches",
            description: "Printed Pouches — custom films, seals, and fitments matched to your fill product, barrier needs, and line speed.",
            badges: ["CUSTOM POUCHES", "FLEX PACK", "BRANDS FACE STUDIO"],
            deals: [
              {
                title: "Barrier + seal audit",
                description: "We confirm OTR, WVTR, seal window, and fitment torque for your SKU before production.",
                code: "POUCHSEAL",
              },
              {
                title: "Proof pack — film + print",
                description: "Pilot laminate stack, registration, and finish on your chosen web before the full run.",
                code: "POUCHPROOF",
              },
            ],
            sizes: [
              { label: "S", dimensions: "Single-serve / sachet class" },
              { label: "M", dimensions: "Stand-up retail — 100–500 g typical" },
              { label: "L", dimensions: "Refill and club sizes" },
              { label: "Custom", dimensions: "Web width and fill volume to your VFFS / HFFS line" },
            ],
            features: [
              { label: "Range", value: "Printed Pouches" },
              { label: "Reference art", value: "All Products.jpg" },
              { label: "Formats", value: "Rollstock, pre-made pouches — die-line to CAD" },
              { label: "Print", value: "Gravure, flexo, digital (pilot runs)" },
              { label: "Min. order", value: "5,000 pouches" },
              { label: "Lead time", value: "8–18 business days" },
            ],
            details: "Gallery paths mirror on-disk references under Premium  Variation Pages/Printed Pouches.\n\nWe align film structure, zipper or spout placement, and burst to your supply chain.\n\nBrands Face specs for retail, DTC, and refill programs.",
          },
        },
        {
          slug: "pouch-matte-finish",
          tabId: "premium_variations",
          cardImage: "/assets/images/categories/Pouches/Pouches/Premium  Variation Pages/Matte Finish Pouches/Buy custom printed Pouches at Best Price With Custom Printing_.jpg",
          detailImages: [
                    "/assets/images/categories/Pouches/Pouches/Premium  Variation Pages/Matte Finish Pouches/Custom Printed Flexible Packaging  _ Custom Standup Pouch _ Rightpak.jpg",
                    "/assets/images/categories/Pouches/Pouches/Premium  Variation Pages/Matte Finish Pouches/download (5).jpg",
                    "/assets/images/categories/Pouches/Pouches/Premium  Variation Pages/Matte Finish Pouches/Pouch Design For Mere.jpg"
          ],
          heading: "Premium",
          title: "Matte Finish Pouches",
          subtitle: "Soft-touch — premium feel, reduced shelf glare.",
          pdp: {
            title: "Matte Finish Pouches",
            description: "Matte Finish Pouches — custom films, seals, and fitments matched to your fill product, barrier needs, and line speed.",
            badges: ["CUSTOM POUCHES", "FLEX PACK", "BRANDS FACE STUDIO"],
            deals: [
              {
                title: "Barrier + seal audit",
                description: "We confirm OTR, WVTR, seal window, and fitment torque for your SKU before production.",
                code: "POUCHSEAL",
              },
              {
                title: "Proof pack — film + print",
                description: "Pilot laminate stack, registration, and finish on your chosen web before the full run.",
                code: "POUCHPROOF",
              },
            ],
            sizes: [
              { label: "S", dimensions: "Single-serve / sachet class" },
              { label: "M", dimensions: "Stand-up retail — 100–500 g typical" },
              { label: "L", dimensions: "Refill and club sizes" },
              { label: "Custom", dimensions: "Web width and fill volume to your VFFS / HFFS line" },
            ],
            features: [
              { label: "Range", value: "Matte Finish Pouches" },
              { label: "Reference art", value: "Buy custom printed Pouches at Best Price With Custom Printing_.jpg" },
              { label: "Formats", value: "Rollstock, pre-made pouches — die-line to CAD" },
              { label: "Print", value: "Gravure, flexo, digital (pilot runs)" },
              { label: "Min. order", value: "5,000 pouches" },
              { label: "Lead time", value: "8–18 business days" },
            ],
            details: "Gallery paths mirror on-disk references under Premium  Variation Pages/Matte Finish Pouches.\n\nWe align film structure, zipper or spout placement, and burst to your supply chain.\n\nBrands Face specs for retail, DTC, and refill programs.",
          },
        },
        {
          slug: "pouch-gloss-finish",
          tabId: "premium_variations",
          cardImage: "/assets/images/categories/Pouches/Pouches/Premium  Variation Pages/Gloss Finish Pouches/C352-353 Double-Sided Color Pull-Tab Heat Seal Side Gusset Bags Beauty Pouch (50 Bags_Pack).jpg",
          detailImages: [
                    "/assets/images/categories/Pouches/Pouches/Premium  Variation Pages/Gloss Finish Pouches/e168f95b582738d629932fc7d224d754.jpg",
                    "/assets/images/categories/Pouches/Pouches/Premium  Variation Pages/Gloss Finish Pouches/Pink packaging.jpg",
                    "/assets/images/categories/Pouches/Pouches/Premium  Variation Pages/Gloss Finish Pouches/Plastic Foil Pouch Packaging Mockup.jpg"
          ],
          heading: "Premium",
          title: "Gloss Finish Pouches",
          subtitle: "High chroma — mass retail and youth-forward brands.",
          pdp: {
            title: "Gloss Finish Pouches",
            description: "Gloss Finish Pouches — custom films, seals, and fitments matched to your fill product, barrier needs, and line speed.",
            badges: ["CUSTOM POUCHES", "FLEX PACK", "BRANDS FACE STUDIO"],
            deals: [
              {
                title: "Barrier + seal audit",
                description: "We confirm OTR, WVTR, seal window, and fitment torque for your SKU before production.",
                code: "POUCHSEAL",
              },
              {
                title: "Proof pack — film + print",
                description: "Pilot laminate stack, registration, and finish on your chosen web before the full run.",
                code: "POUCHPROOF",
              },
            ],
            sizes: [
              { label: "S", dimensions: "Single-serve / sachet class" },
              { label: "M", dimensions: "Stand-up retail — 100–500 g typical" },
              { label: "L", dimensions: "Refill and club sizes" },
              { label: "Custom", dimensions: "Web width and fill volume to your VFFS / HFFS line" },
            ],
            features: [
              { label: "Range", value: "Gloss Finish Pouches" },
              { label: "Reference art", value: "C352-353 Double-Sided Color Pull-Tab Heat Seal Side Gusset Bags Beauty Pouch (50 Bags_Pack).jpg" },
              { label: "Formats", value: "Rollstock, pre-made pouches — die-line to CAD" },
              { label: "Print", value: "Gravure, flexo, digital (pilot runs)" },
              { label: "Min. order", value: "5,000 pouches" },
              { label: "Lead time", value: "8–18 business days" },
            ],
            details: "Gallery paths mirror on-disk references under Premium  Variation Pages/Gloss Finish Pouches.\n\nWe align film structure, zipper or spout placement, and burst to your supply chain.\n\nBrands Face specs for retail, DTC, and refill programs.",
          },
        },
        {
          slug: "pouch-foil",
          tabId: "premium_variations",
          cardImage: "/assets/images/categories/Pouches/Pouches/Premium  Variation Pages/Gloss Finish Pouches/C352-353 Double-Sided Color Pull-Tab Heat Seal Side Gusset Bags Beauty Pouch (50 Bags_Pack).jpg",
          detailImages: [
                    "/assets/images/categories/Pouches/Pouches/Premium  Variation Pages/Gloss Finish Pouches/e168f95b582738d629932fc7d224d754.jpg",
                    "/assets/images/categories/Pouches/Pouches/Premium  Variation Pages/Gloss Finish Pouches/Pink packaging.jpg",
                    "/assets/images/categories/Pouches/Pouches/Premium  Variation Pages/Gloss Finish Pouches/Plastic Foil Pouch Packaging Mockup.jpg"
          ],
          heading: "Premium",
          title: "Foil Pouches",
          subtitle: "Metallised layers — barrier + metallic shelf flash.",
          pdp: {
            title: "Foil Pouches",
            description: "Foil Pouches — custom films, seals, and fitments matched to your fill product, barrier needs, and line speed.",
            badges: ["CUSTOM POUCHES", "FLEX PACK", "BRANDS FACE STUDIO"],
            deals: [
              {
                title: "Barrier + seal audit",
                description: "We confirm OTR, WVTR, seal window, and fitment torque for your SKU before production.",
                code: "POUCHSEAL",
              },
              {
                title: "Proof pack — film + print",
                description: "Pilot laminate stack, registration, and finish on your chosen web before the full run.",
                code: "POUCHPROOF",
              },
            ],
            sizes: [
              { label: "S", dimensions: "Single-serve / sachet class" },
              { label: "M", dimensions: "Stand-up retail — 100–500 g typical" },
              { label: "L", dimensions: "Refill and club sizes" },
              { label: "Custom", dimensions: "Web width and fill volume to your VFFS / HFFS line" },
            ],
            features: [
              { label: "Range", value: "Foil Pouches" },
              { label: "Reference art", value: "C352-353 Double-Sided Color Pull-Tab Heat Seal Side Gusset Bags Beauty Pouch (50 Bags_Pack).jpg" },
              { label: "Formats", value: "Rollstock, pre-made pouches — die-line to CAD" },
              { label: "Print", value: "Gravure, flexo, digital (pilot runs)" },
              { label: "Min. order", value: "5,000 pouches" },
              { label: "Lead time", value: "8–18 business days" },
            ],
            details: "Gallery paths mirror on-disk references under Premium  Variation Pages/Gloss Finish Pouches.\n\nWe align film structure, zipper or spout placement, and burst to your supply chain.\n\nBrands Face specs for retail, DTC, and refill programs.",
          },
        },
        {
          slug: "pouch-kraft",
          tabId: "premium_variations",
          cardImage: "/assets/images/categories/Pouches/Pouches/Premium  Variation Pages/Kraft Pouches/Custom Printed Food Packaging Kraft Paper Stand Up Pouch Bag (1).jpg",
          detailImages: [
                    "/assets/images/categories/Pouches/Pouches/Premium  Variation Pages/Kraft Pouches/Custom Printed Food Packaging Kraft Paper Stand Up Pouch Bag.jpg",
                    "/assets/images/categories/Pouches/Pouches/Premium  Variation Pages/Kraft Pouches/Grounded Packaging _ Compostable stand up pouch.jpg",
                    "/assets/images/categories/Pouches/Pouches/Premium  Variation Pages/Kraft Pouches/kraft paper pouch.jpg"
          ],
          heading: "Premium",
          title: "Kraft Pouches",
          subtitle: "Paper-look laminates — natural story, heat-seal inner.",
          pdp: {
            title: "Kraft Pouches",
            description: "Kraft Pouches — custom films, seals, and fitments matched to your fill product, barrier needs, and line speed.",
            badges: ["CUSTOM POUCHES", "FLEX PACK", "BRANDS FACE STUDIO"],
            deals: [
              {
                title: "Barrier + seal audit",
                description: "We confirm OTR, WVTR, seal window, and fitment torque for your SKU before production.",
                code: "POUCHSEAL",
              },
              {
                title: "Proof pack — film + print",
                description: "Pilot laminate stack, registration, and finish on your chosen web before the full run.",
                code: "POUCHPROOF",
              },
            ],
            sizes: [
              { label: "S", dimensions: "Single-serve / sachet class" },
              { label: "M", dimensions: "Stand-up retail — 100–500 g typical" },
              { label: "L", dimensions: "Refill and club sizes" },
              { label: "Custom", dimensions: "Web width and fill volume to your VFFS / HFFS line" },
            ],
            features: [
              { label: "Range", value: "Kraft Pouches" },
              { label: "Reference art", value: "Custom Printed Food Packaging Kraft Paper Stand Up Pouch Bag (1).jpg" },
              { label: "Formats", value: "Rollstock, pre-made pouches — die-line to CAD" },
              { label: "Print", value: "Gravure, flexo, digital (pilot runs)" },
              { label: "Min. order", value: "5,000 pouches" },
              { label: "Lead time", value: "8–18 business days" },
            ],
            details: "Gallery paths mirror on-disk references under Premium  Variation Pages/Kraft Pouches.\n\nWe align film structure, zipper or spout placement, and burst to your supply chain.\n\nBrands Face specs for retail, DTC, and refill programs.",
          },
        },
        {
          slug: "pouch-transparent",
          tabId: "premium_variations",
          cardImage: "/assets/images/categories/Pouches/Pouches/Premium  Variation Pages/Transparent Pouches/30_50_100ml Reusable Travel Pack Refill Pack Lotion Dispenser Bag Shampoo Transparent.jpg",
          detailImages: [
                    "/assets/images/categories/Pouches/Pouches/Premium  Variation Pages/Transparent Pouches/50pcs Thicken Self Sealing OPP Bags Transparent Plastic Storage Pouch with Hang Hole for Jewelry Ret.jpg",
                    "/assets/images/categories/Pouches/Pouches/Premium  Variation Pages/Transparent Pouches/5個のPVCプラスチック防水透明フロスト封筒ペンバッグ.jpg",
                    "/assets/images/categories/Pouches/Pouches/Premium  Variation Pages/Transparent Pouches/C268 QQ Studio Clear & Color Flat Resealable Zipper Pouch for Small Accessories Holding, Party Favors.jpg"
          ],
          heading: "Premium",
          title: "Transparent Pouches",
          subtitle: "See product colour and texture — clear PET / PE.",
          pdp: {
            title: "Transparent Pouches",
            description: "Transparent Pouches — custom films, seals, and fitments matched to your fill product, barrier needs, and line speed.",
            badges: ["CUSTOM POUCHES", "FLEX PACK", "BRANDS FACE STUDIO"],
            deals: [
              {
                title: "Barrier + seal audit",
                description: "We confirm OTR, WVTR, seal window, and fitment torque for your SKU before production.",
                code: "POUCHSEAL",
              },
              {
                title: "Proof pack — film + print",
                description: "Pilot laminate stack, registration, and finish on your chosen web before the full run.",
                code: "POUCHPROOF",
              },
            ],
            sizes: [
              { label: "S", dimensions: "Single-serve / sachet class" },
              { label: "M", dimensions: "Stand-up retail — 100–500 g typical" },
              { label: "L", dimensions: "Refill and club sizes" },
              { label: "Custom", dimensions: "Web width and fill volume to your VFFS / HFFS line" },
            ],
            features: [
              { label: "Range", value: "Transparent Pouches" },
              { label: "Reference art", value: "30_50_100ml Reusable Travel Pack Refill Pack Lotion Dispenser Bag Shampoo Transparent.jpg" },
              { label: "Formats", value: "Rollstock, pre-made pouches — die-line to CAD" },
              { label: "Print", value: "Gravure, flexo, digital (pilot runs)" },
              { label: "Min. order", value: "5,000 pouches" },
              { label: "Lead time", value: "8–18 business days" },
            ],
            details: "Gallery paths mirror on-disk references under Premium  Variation Pages/Transparent Pouches.\n\nWe align film structure, zipper or spout placement, and burst to your supply chain.\n\nBrands Face specs for retail, DTC, and refill programs.",
          },
        },
        {
          slug: "pouch-eco-friendly",
          tabId: "premium_variations",
          cardImage: "/assets/images/categories/Pouches/Pouches/Premium  Variation Pages/Eco-Friendly Pouches/All-purpose Food Storage.jpg",
          detailImages: [
                    "/assets/images/categories/Pouches/Pouches/Premium  Variation Pages/Eco-Friendly Pouches/Custom Logo Bag Pouch Stand Up Zipper Pouch Aluminum Foil Pouch Food Packaging Bag - Buy Bag Pouches,Aluminum Foil Pouch,Foo.jpg",
                    "/assets/images/categories/Pouches/Pouches/Premium  Variation Pages/Eco-Friendly Pouches/Custom Printed Food Packaging Kraft Paper Stand Up Pouch Bag.jpg",
                    "/assets/images/categories/Pouches/Pouches/Premium  Variation Pages/Eco-Friendly Pouches/Product label for kraft pouch _ Product label contest.jpg"
          ],
          heading: "Premium",
          title: "Eco-Friendly Pouches",
          subtitle: "Mono-material paths, low-VOC inks, credible claims.",
          pdp: {
            title: "Eco-Friendly Pouches",
            description: "Eco-Friendly Pouches — custom films, seals, and fitments matched to your fill product, barrier needs, and line speed.",
            badges: ["CUSTOM POUCHES", "FLEX PACK", "BRANDS FACE STUDIO"],
            deals: [
              {
                title: "Barrier + seal audit",
                description: "We confirm OTR, WVTR, seal window, and fitment torque for your SKU before production.",
                code: "POUCHSEAL",
              },
              {
                title: "Proof pack — film + print",
                description: "Pilot laminate stack, registration, and finish on your chosen web before the full run.",
                code: "POUCHPROOF",
              },
            ],
            sizes: [
              { label: "S", dimensions: "Single-serve / sachet class" },
              { label: "M", dimensions: "Stand-up retail — 100–500 g typical" },
              { label: "L", dimensions: "Refill and club sizes" },
              { label: "Custom", dimensions: "Web width and fill volume to your VFFS / HFFS line" },
            ],
            features: [
              { label: "Range", value: "Eco-Friendly Pouches" },
              { label: "Reference art", value: "12_47US $ 35% OFF_50pcs Wholesale Brown Kraft Paper Packaging Ziplock Bag Doypack Reusable Sealing All-purpose Food Storage .jpg" },
              { label: "Formats", value: "Rollstock, pre-made pouches — die-line to CAD" },
              { label: "Print", value: "Gravure, flexo, digital (pilot runs)" },
              { label: "Min. order", value: "5,000 pouches" },
              { label: "Lead time", value: "8–18 business days" },
            ],
            details: "Gallery paths mirror on-disk references under Premium  Variation Pages/Eco-Friendly Pouches.\n\nWe align film structure, zipper or spout placement, and burst to your supply chain.\n\nBrands Face specs for retail, DTC, and refill programs.",
          },
        },
        {
          slug: "pouch-zip-lock",
          tabId: "premium_variations",
          cardImage: "/assets/images/categories/Pouches/Pouches/Premium  Variation Pages/Pouches with Zip Lock/100 Matte Metallized Foil Standup Pouch Bags_ Resealable Zip Lock.jpg",
          detailImages: [
                    "/assets/images/categories/Pouches/Pouches/Premium  Variation Pages/Pouches with Zip Lock/f98658c0b168b03b29d5e466b109ee10.jpg",
                    "/assets/images/categories/Pouches/Pouches/Premium  Variation Pages/Pouches with Zip Lock/Pochettes de Rangement Transparentes à Fermeture Éclair, Anti-continuité, Feuille d'Att, Sac en.jpg",
                    "/assets/images/categories/Pouches/Pouches/Premium  Variation Pages/Pouches with Zip Lock/Saco Zip Lock Kraft Com Visor Stand Up Pouch 50un 10x15cm.jpg"
          ],
          heading: "Premium",
          title: "Pouches with Zip Lock",
          subtitle: "Integrated zip — reclose, portion control, pantry retention.",
          pdp: {
            title: "Pouches with Zip Lock",
            description: "Pouches with Zip Lock — custom films, seals, and fitments matched to your fill product, barrier needs, and line speed.",
            badges: ["CUSTOM POUCHES", "FLEX PACK", "BRANDS FACE STUDIO"],
            deals: [
              {
                title: "Barrier + seal audit",
                description: "We confirm OTR, WVTR, seal window, and fitment torque for your SKU before production.",
                code: "POUCHSEAL",
              },
              {
                title: "Proof pack — film + print",
                description: "Pilot laminate stack, registration, and finish on your chosen web before the full run.",
                code: "POUCHPROOF",
              },
            ],
            sizes: [
              { label: "S", dimensions: "Single-serve / sachet class" },
              { label: "M", dimensions: "Stand-up retail — 100–500 g typical" },
              { label: "L", dimensions: "Refill and club sizes" },
              { label: "Custom", dimensions: "Web width and fill volume to your VFFS / HFFS line" },
            ],
            features: [
              { label: "Range", value: "Pouches with Zip Lock" },
              { label: "Reference art", value: "100 Matte Metallized Foil Standup Pouch Bags_ Resealable Zip Lock.jpg" },
              { label: "Formats", value: "Rollstock, pre-made pouches — die-line to CAD" },
              { label: "Print", value: "Gravure, flexo, digital (pilot runs)" },
              { label: "Min. order", value: "5,000 pouches" },
              { label: "Lead time", value: "8–18 business days" },
            ],
            details: "Gallery paths mirror on-disk references under Premium  Variation Pages/Pouches with Zip Lock.\n\nWe align film structure, zipper or spout placement, and burst to your supply chain.\n\nBrands Face specs for retail, DTC, and refill programs.",
          },
        },
      ],
    },
    {
      category: "carry_bags",
      cardImage: "/assets/images/categories/categories_layout/shopping_bags/shopping_bags%20(1).png",
      bannerImages: [
        "/assets/images/categories/categories_layout/shopping_bags/shopping_bags%20(1).png",
        "/assets/images/categories/categories_layout/shopping_bags/shopping_bags%20(2).png",
        "/assets/images/categories/categories_layout/shopping_bags/shopping_bags%20(3).png",
      ],
      tabs: [
        { id: "all", label: "All" },
        { id: "core_products", label: "Core Products" },
        { id: "use_case", label: "Use-case Based" },
        { id: "premium_variations", label: "Premium variations" },
      ],
      products: [
        {
          slug: "carry-bag-paper",
          tabId: "core_products",
          cardImage: "/assets/images/categories/Carry Bags/Core Product Pages/Paper Carry Bags/Custom Logo Paper Shopping Bags - Luxury Gift Packaging Bags _ Personalized Clothing Boutique Paper Bag _ Eco-Friendly Retai.jpg",
          detailImages: [
                    "/assets/images/categories/Carry Bags/Core Product Pages/Paper Carry Bags/download (5).jpg",
                    "/assets/images/categories/Carry Bags/Core Product Pages/Paper Carry Bags/Miranda Mora Creates Conceptual Branding for Balché Restaurant - World Brand Design Society.jpg",
                    "/assets/images/categories/Carry Bags/Core Product Pages/Paper Carry Bags/Фирменный пакет.jpg"
          ],
          heading: "Core",
          title: "Paper Carry Bags",
          subtitle: "Coated or uncoated — scalable retail bags with print-friendly faces.",
          pdp: {
            title: "Paper Carry Bags",
            description: "Paper Carry Bags — custom board, handles, and print matched to your retail load, fulfilment cube, and campaign calendar.",
            badges: ["CARRY BAGS", "RETAIL READY", "BRANDS FACE STUDIO"],
            deals: [
              {
                title: "Handle load + burst check",
                description: "We sanity-check handle type, burst strength, and gusset for your SKU weight before production.",
                code: "BAGLOAD",
              },
              {
                title: "Proof pack — print + finish",
                description: "Pilot laminate, foil, or emboss on your chosen caliper before the full run.",
                code: "BAGPROOF",
              },
            ],
            sizes: [
              { label: "S", dimensions: "Compact boutique — small footprint class" },
              { label: "M", dimensions: "Standard retail — shirt box and bottles" },
              { label: "L", dimensions: "Wide gusset — apparel sets and gifts" },
              { label: "Custom", dimensions: "CAD to your packed cube and handle spec" },
            ],
            features: [
              { label: "Range", value: "Paper Carry Bags" },
              { label: "Reference art", value: "Custom Logo Paper Shopping Bags - Luxury Gift Packaging Bags _ Personalized Clothing Boutique Paper Bag _ Eco-Friendly Retai.jpg" },
              { label: "Structures", value: "Paper board, laminate, rope, ribbon, die-cut, twist handles" },
              { label: "Print", value: "CMYK, Pantone, specialty inks" },
              { label: "Min. order", value: "250 bags" },
              { label: "Lead time", value: "10–20 business days" },
            ],
            details: "Gallery paths mirror on-disk references for Paper Carry Bags.\n\nWe align GSM, fold, and handle attachment to your line speed and brand story.\n\nBrands Face specs for retail, DTC unboxing, and gifting.",
          },
        },
        {
          slug: "carry-bag-kraft",
          tabId: "core_products",
          cardImage: "/assets/images/categories/Carry Bags/Core Product Pages/Kraft Carry Bags/75 Pack Brown Kraft Gift Bags With Handles, Natural Plain Kraft Shopping Bags___.jpg",
          detailImages: [
                    "/assets/images/categories/Carry Bags/Core Product Pages/Kraft Carry Bags/df678f01cf01ac4cd774054eec3f60a3.jpg",
                    "/assets/images/categories/Carry Bags/Core Product Pages/Kraft Carry Bags/The Garden Socia.jpg",
                    "/assets/images/categories/Carry Bags/Core Product Pages/Kraft Carry Bags/Wine Bags Design Projects __ Photos, videos, logos, illustrations and branding.jpg"
          ],
          heading: "Core",
          title: "Kraft Carry Bags",
          subtitle: "Natural kraft — recyclable story, bold ink on brown.",
          pdp: {
            title: "Kraft Carry Bags",
            description: "Kraft Carry Bags — custom board, handles, and print matched to your retail load, fulfilment cube, and campaign calendar.",
            badges: ["CARRY BAGS", "RETAIL READY", "BRANDS FACE STUDIO"],
            deals: [
              {
                title: "Handle load + burst check",
                description: "We sanity-check handle type, burst strength, and gusset for your SKU weight before production.",
                code: "BAGLOAD",
              },
              {
                title: "Proof pack — print + finish",
                description: "Pilot laminate, foil, or emboss on your chosen caliper before the full run.",
                code: "BAGPROOF",
              },
            ],
            sizes: [
              { label: "S", dimensions: "Compact boutique — small footprint class" },
              { label: "M", dimensions: "Standard retail — shirt box and bottles" },
              { label: "L", dimensions: "Wide gusset — apparel sets and gifts" },
              { label: "Custom", dimensions: "CAD to your packed cube and handle spec" },
            ],
            features: [
              { label: "Range", value: "Kraft Carry Bags" },
              { label: "Reference art", value: "75 Pack Brown Kraft Gift Bags With Handles, Natural Plain Kraft Shopping Bags___.jpg" },
              { label: "Structures", value: "Paper board, laminate, rope, ribbon, die-cut, twist handles" },
              { label: "Print", value: "CMYK, Pantone, specialty inks" },
              { label: "Min. order", value: "250 bags" },
              { label: "Lead time", value: "10–20 business days" },
            ],
            details: "Gallery paths mirror on-disk references for Kraft Carry Bags.\n\nWe align GSM, fold, and handle attachment to your line speed and brand story.\n\nBrands Face specs for retail, DTC unboxing, and gifting.",
          },
        },
        {
          slug: "carry-bag-luxury",
          tabId: "core_products",
          cardImage: "/assets/images/categories/Carry Bags/Core Product Pages/Luxury Carry Bags/Custom Fashion Your Own Logo Print Cosmetics Luxury Gift Shopping Paper Bags With Button - Buy Shoes And Clothing Paper Bags.jpg",
          detailImages: [
                    "/assets/images/categories/Carry Bags/Core Product Pages/Luxury Carry Bags/Luxury Boutique Paper Bag.jpg",
                    "/assets/images/categories/Carry Bags/Core Product Pages/Luxury Carry Bags/This item is unavailable - Etsy.jpg",
                    "/assets/images/categories/Carry Bags/Core Product Pages/Luxury Carry Bags/ダークブラウンとアイボリーのフレームデザインの紙袋_ オリジナル紙袋のベリービーバッグ.jpg"
          ],
          heading: "Core",
          title: "Luxury Carry Bags",
          subtitle: "Thick board, soft-touch, foil — department-store presence.",
          pdp: {
            title: "Luxury Carry Bags",
            description: "Luxury Carry Bags — custom board, handles, and print matched to your retail load, fulfilment cube, and campaign calendar.",
            badges: ["CARRY BAGS", "RETAIL READY", "BRANDS FACE STUDIO"],
            deals: [
              {
                title: "Handle load + burst check",
                description: "We sanity-check handle type, burst strength, and gusset for your SKU weight before production.",
                code: "BAGLOAD",
              },
              {
                title: "Proof pack — print + finish",
                description: "Pilot laminate, foil, or emboss on your chosen caliper before the full run.",
                code: "BAGPROOF",
              },
            ],
            sizes: [
              { label: "S", dimensions: "Compact boutique — small footprint class" },
              { label: "M", dimensions: "Standard retail — shirt box and bottles" },
              { label: "L", dimensions: "Wide gusset — apparel sets and gifts" },
              { label: "Custom", dimensions: "CAD to your packed cube and handle spec" },
            ],
            features: [
              { label: "Range", value: "Luxury Carry Bags" },
              { label: "Reference art", value: "Custom Fashion Your Own Logo Print Cosmetics Luxury Gift Shopping Paper Bags With Button - Buy Shoes And Clothing Paper Bags.jpg" },
              { label: "Structures", value: "Paper board, laminate, rope, ribbon, die-cut, twist handles" },
              { label: "Print", value: "CMYK, Pantone, specialty inks" },
              { label: "Min. order", value: "250 bags" },
              { label: "Lead time", value: "10–20 business days" },
            ],
            details: "Gallery paths mirror on-disk references for Luxury Carry Bags.\n\nWe align GSM, fold, and handle attachment to your line speed and brand story.\n\nBrands Face specs for retail, DTC unboxing, and gifting.",
          },
        },
        {
          slug: "carry-bag-rope-handle",
          tabId: "core_products",
          cardImage: "/assets/images/categories/Carry Bags/Core Product Pages/Rope Handle Carry Bags/Fashion Paper bag Rope Handle (Mixed Colors_Mixed Patterns) Model Paper-bag-small-OJ-1304-1-00h-Sellzone.jpg",
          detailImages: [
                    "/assets/images/categories/Carry Bags/Core Product Pages/Rope Handle Carry Bags/delightcreativity (1).jpg",
                    "/assets/images/categories/Carry Bags/Core Product Pages/Rope Handle Carry Bags/delightcreativity (2).jpg",
                    "/assets/images/categories/Carry Bags/Core Product Pages/Rope Handle Carry Bags/delightcreativity.jpg"
          ],
          heading: "Core",
          title: "Rope Handle Carry Bags",
          subtitle: "Cotton or poly rope through eyelets — comfort and elevated look.",
          pdp: {
            title: "Rope Handle Carry Bags",
            description: "Rope Handle Carry Bags — custom board, handles, and print matched to your retail load, fulfilment cube, and campaign calendar.",
            badges: ["CARRY BAGS", "RETAIL READY", "BRANDS FACE STUDIO"],
            deals: [
              {
                title: "Handle load + burst check",
                description: "We sanity-check handle type, burst strength, and gusset for your SKU weight before production.",
                code: "BAGLOAD",
              },
              {
                title: "Proof pack — print + finish",
                description: "Pilot laminate, foil, or emboss on your chosen caliper before the full run.",
                code: "BAGPROOF",
              },
            ],
            sizes: [
              { label: "S", dimensions: "Compact boutique — small footprint class" },
              { label: "M", dimensions: "Standard retail — shirt box and bottles" },
              { label: "L", dimensions: "Wide gusset — apparel sets and gifts" },
              { label: "Custom", dimensions: "CAD to your packed cube and handle spec" },
            ],
            features: [
              { label: "Range", value: "Rope Handle Carry Bags" },
              { label: "Reference art", value: "Fashion Paper bag Rope Handle (Mixed Colors_Mixed Patterns) Model Paper-bag-small-OJ-1304-1-00h-Sellzone.jpg" },
              { label: "Structures", value: "Paper board, laminate, rope, ribbon, die-cut, twist handles" },
              { label: "Print", value: "CMYK, Pantone, specialty inks" },
              { label: "Min. order", value: "250 bags" },
              { label: "Lead time", value: "10–20 business days" },
            ],
            details: "Gallery paths mirror on-disk references for Rope Handle Carry Bags.\n\nWe align GSM, fold, and handle attachment to your line speed and brand story.\n\nBrands Face specs for retail, DTC unboxing, and gifting.",
          },
        },
        {
          slug: "carry-bag-ribbon-handle",
          tabId: "core_products",
          cardImage: "/assets/images/categories/Carry Bags/Core Product Pages/Ribbon Handle Carry Bags/10 Pcs Black And White Gift Bags Medium Boutique With Handles Wedding Party.jpg",
          detailImages: [
                    "/assets/images/categories/Carry Bags/Core Product Pages/Ribbon Handle Carry Bags/Black Paper Shopping Bag.jpg",
                    "/assets/images/categories/Carry Bags/Core Product Pages/Ribbon Handle Carry Bags/Mockup file.jpg",
                    "/assets/images/categories/Carry Bags/Core Product Pages/Ribbon Handle Carry Bags/Shopping Bag Mockup PSD for Stylish Branding & Deboss Effects.jpg"
          ],
          heading: "Core",
          title: "Ribbon Handle Carry Bags",
          subtitle: "Satin or grosgrain — giftable, photogenic boutique feel.",
          pdp: {
            title: "Ribbon Handle Carry Bags",
            description: "Ribbon Handle Carry Bags — custom board, handles, and print matched to your retail load, fulfilment cube, and campaign calendar.",
            badges: ["CARRY BAGS", "RETAIL READY", "BRANDS FACE STUDIO"],
            deals: [
              {
                title: "Handle load + burst check",
                description: "We sanity-check handle type, burst strength, and gusset for your SKU weight before production.",
                code: "BAGLOAD",
              },
              {
                title: "Proof pack — print + finish",
                description: "Pilot laminate, foil, or emboss on your chosen caliper before the full run.",
                code: "BAGPROOF",
              },
            ],
            sizes: [
              { label: "S", dimensions: "Compact boutique — small footprint class" },
              { label: "M", dimensions: "Standard retail — shirt box and bottles" },
              { label: "L", dimensions: "Wide gusset — apparel sets and gifts" },
              { label: "Custom", dimensions: "CAD to your packed cube and handle spec" },
            ],
            features: [
              { label: "Range", value: "Ribbon Handle Carry Bags" },
              { label: "Reference art", value: "10 Pcs Black And White Gift Bags Medium Boutique With Handles Wedding Party.jpg" },
              { label: "Structures", value: "Paper board, laminate, rope, ribbon, die-cut, twist handles" },
              { label: "Print", value: "CMYK, Pantone, specialty inks" },
              { label: "Min. order", value: "250 bags" },
              { label: "Lead time", value: "10–20 business days" },
            ],
            details: "Gallery paths mirror on-disk references for Ribbon Handle Carry Bags.\n\nWe align GSM, fold, and handle attachment to your line speed and brand story.\n\nBrands Face specs for retail, DTC unboxing, and gifting.",
          },
        },
        {
          slug: "carry-bag-die-cut-handle",
          tabId: "core_products",
          cardImage: "/assets/images/categories/Carry Bags/Core Product Pages/Die-Cut Handle Carry Bags/Custom Logo Luxury Boutique Gift Shopping Packaging Carrier Bag White Paper Bag With Die Cut Handles.jpg",
          detailImages: [
                    "/assets/images/categories/Carry Bags/Core Product Pages/Die-Cut Handle Carry Bags/Custom Medium Laminated Paper Bag in White.jpg",
                    "/assets/images/categories/Carry Bags/Core Product Pages/Die-Cut Handle Carry Bags/Premium Light Green Die-Cut Handle Bag with Bright Silver Foil.jpg",
                    "/assets/images/categories/Carry Bags/Core Product Pages/Die-Cut Handle Carry Bags/Sac en papier à poignée découpée avec Logo personnalisé, 500 pièces_lot, pour cadeau, vêtements,.jpg"
          ],
          heading: "Core",
          title: "Die-Cut Handle Carry Bags",
          subtitle: "Integrated handle cut — clean silhouette, efficient cost.",
          pdp: {
            title: "Die-Cut Handle Carry Bags",
            description: "Die-Cut Handle Carry Bags — custom board, handles, and print matched to your retail load, fulfilment cube, and campaign calendar.",
            badges: ["CARRY BAGS", "RETAIL READY", "BRANDS FACE STUDIO"],
            deals: [
              {
                title: "Handle load + burst check",
                description: "We sanity-check handle type, burst strength, and gusset for your SKU weight before production.",
                code: "BAGLOAD",
              },
              {
                title: "Proof pack — print + finish",
                description: "Pilot laminate, foil, or emboss on your chosen caliper before the full run.",
                code: "BAGPROOF",
              },
            ],
            sizes: [
              { label: "S", dimensions: "Compact boutique — small footprint class" },
              { label: "M", dimensions: "Standard retail — shirt box and bottles" },
              { label: "L", dimensions: "Wide gusset — apparel sets and gifts" },
              { label: "Custom", dimensions: "CAD to your packed cube and handle spec" },
            ],
            features: [
              { label: "Range", value: "Die-Cut Handle Carry Bags" },
              { label: "Reference art", value: "Custom Logo Luxury Boutique Gift Shopping Packaging Carrier Bag White Paper Bag With Die Cut Handles.jpg" },
              { label: "Structures", value: "Paper board, laminate, rope, ribbon, die-cut, twist handles" },
              { label: "Print", value: "CMYK, Pantone, specialty inks" },
              { label: "Min. order", value: "250 bags" },
              { label: "Lead time", value: "10–20 business days" },
            ],
            details: "Gallery paths mirror on-disk references for Die-Cut Handle Carry Bags.\n\nWe align GSM, fold, and handle attachment to your line speed and brand story.\n\nBrands Face specs for retail, DTC unboxing, and gifting.",
          },
        },
        {
          slug: "carry-bag-twisted-handle",
          tabId: "core_products",
          cardImage: "/assets/images/categories/Carry Bags/Core Product Pages/Twisted Handle Carry Bags/Petite Paper Twist Handle Bag .jpg",
          detailImages: [
                    "/assets/images/categories/Carry Bags/Core Product Pages/Twisted Handle Carry Bags/250 To-Go Bags.jpg",
                    "/assets/images/categories/Carry Bags/Core Product Pages/Twisted Handle Carry Bags/Bagcraft 12_ x 9_ x 16_ Natural Kraft Paper Shopping Bag with Handles - _Meals to Go_ Printing - 200_Bundle.jpg",
                    "/assets/images/categories/Carry Bags/Core Product Pages/Twisted Handle Carry Bags/BioPak Kraft Paper Bags Jumbo Twist Handle (Pack 150).jpg"
          ],
          heading: "Core",
          title: "Twisted Handle Carry Bags",
          subtitle: "Classic paper cord — everyday retail strength.",
          pdp: {
            title: "Twisted Handle Carry Bags",
            description: "Twisted Handle Carry Bags — custom board, handles, and print matched to your retail load, fulfilment cube, and campaign calendar.",
            badges: ["CARRY BAGS", "RETAIL READY", "BRANDS FACE STUDIO"],
            deals: [
              {
                title: "Handle load + burst check",
                description: "We sanity-check handle type, burst strength, and gusset for your SKU weight before production.",
                code: "BAGLOAD",
              },
              {
                title: "Proof pack — print + finish",
                description: "Pilot laminate, foil, or emboss on your chosen caliper before the full run.",
                code: "BAGPROOF",
              },
            ],
            sizes: [
              { label: "S", dimensions: "Compact boutique — small footprint class" },
              { label: "M", dimensions: "Standard retail — shirt box and bottles" },
              { label: "L", dimensions: "Wide gusset — apparel sets and gifts" },
              { label: "Custom", dimensions: "CAD to your packed cube and handle spec" },
            ],
            features: [
              { label: "Range", value: "Twisted Handle Carry Bags" },
              { label: "Reference art", value: "#10 Small Petite Paper Twist Handle Bag Brown 275 x 205 x 110mm 250 (Case) - Default.jpg" },
              { label: "Structures", value: "Paper board, laminate, rope, ribbon, die-cut, twist handles" },
              { label: "Print", value: "CMYK, Pantone, specialty inks" },
              { label: "Min. order", value: "250 bags" },
              { label: "Lead time", value: "10–20 business days" },
            ],
            details: "Gallery paths mirror on-disk references for Twisted Handle Carry Bags.\n\nWe align GSM, fold, and handle attachment to your line speed and brand story.\n\nBrands Face specs for retail, DTC unboxing, and gifting.",
          },
        },
        {
          slug: "carry-bag-flat-handle",
          tabId: "core_products",
          cardImage: "/assets/images/categories/Carry Bags/Core Product Pages/Flat Handle Carry Bags/11fd1cf6bcc510e819624992820c2e17.jpg",
          detailImages: [
                    "/assets/images/categories/Carry Bags/Core Product Pages/Flat Handle Carry Bags/Cute Cartoon Printed Folding Tote with.jpg",
                    "/assets/images/categories/Carry Bags/Core Product Pages/Flat Handle Carry Bags/download (5).jpg",
                    "/assets/images/categories/Carry Bags/Core Product Pages/Flat Handle Carry Bags/HOT BARGAINS White Paper Carrier Bags with Flat Handles, 250 Pack Medium 22 x 8 x 24 cm, Recyclable Shopping Bags.jpg"
          ],
          heading: "Core",
          title: "Flat Handle Carry Bags",
          subtitle: "Minimal flat straps — modern lines, strong folds.",
          pdp: {
            title: "Flat Handle Carry Bags",
            description: "Flat Handle Carry Bags — custom board, handles, and print matched to your retail load, fulfilment cube, and campaign calendar.",
            badges: ["CARRY BAGS", "RETAIL READY", "BRANDS FACE STUDIO"],
            deals: [
              {
                title: "Handle load + burst check",
                description: "We sanity-check handle type, burst strength, and gusset for your SKU weight before production.",
                code: "BAGLOAD",
              },
              {
                title: "Proof pack — print + finish",
                description: "Pilot laminate, foil, or emboss on your chosen caliper before the full run.",
                code: "BAGPROOF",
              },
            ],
            sizes: [
              { label: "S", dimensions: "Compact boutique — small footprint class" },
              { label: "M", dimensions: "Standard retail — shirt box and bottles" },
              { label: "L", dimensions: "Wide gusset — apparel sets and gifts" },
              { label: "Custom", dimensions: "CAD to your packed cube and handle spec" },
            ],
            features: [
              { label: "Range", value: "Flat Handle Carry Bags" },
              { label: "Reference art", value: "11fd1cf6bcc510e819624992820c2e17.jpg" },
              { label: "Structures", value: "Paper board, laminate, rope, ribbon, die-cut, twist handles" },
              { label: "Print", value: "CMYK, Pantone, specialty inks" },
              { label: "Min. order", value: "250 bags" },
              { label: "Lead time", value: "10–20 business days" },
            ],
            details: "Gallery paths mirror on-disk references for Flat Handle Carry Bags.\n\nWe align GSM, fold, and handle attachment to your line speed and brand story.\n\nBrands Face specs for retail, DTC unboxing, and gifting.",
          },
        },
        {
          slug: "carry-bag-laminated",
          tabId: "core_products",
          cardImage: "/assets/images/categories/Carry Bags/Core Product Pages/Laminated Carry Bags/500pcs Custom Logo High-Grade Matte Embossed Laminated Paper Bags with Ribbon Handle for Clothes.jpg",
          detailImages: [
                    "/assets/images/categories/Carry Bags/Core Product Pages/Laminated Carry Bags/Luxury Laminated Paper Bag.jpg",
                    "/assets/images/categories/Carry Bags/Core Product Pages/Laminated Carry Bags/Luxury Ribbon Handle Laminated Paper Bag.jpg",
                    "/assets/images/categories/Carry Bags/Core Product Pages/Laminated Carry Bags/Promotional Laminated Paper Bag with Custom Print _ Corporate Branding Bag.jpg"
          ],
          heading: "Core",
          title: "Laminated Carry Bags",
          subtitle: "Film laminate — scuff resistance and saturated colour.",
          pdp: {
            title: "Laminated Carry Bags",
            description: "Laminated Carry Bags — custom board, handles, and print matched to your retail load, fulfilment cube, and campaign calendar.",
            badges: ["CARRY BAGS", "RETAIL READY", "BRANDS FACE STUDIO"],
            deals: [
              {
                title: "Handle load + burst check",
                description: "We sanity-check handle type, burst strength, and gusset for your SKU weight before production.",
                code: "BAGLOAD",
              },
              {
                title: "Proof pack — print + finish",
                description: "Pilot laminate, foil, or emboss on your chosen caliper before the full run.",
                code: "BAGPROOF",
              },
            ],
            sizes: [
              { label: "S", dimensions: "Compact boutique — small footprint class" },
              { label: "M", dimensions: "Standard retail — shirt box and bottles" },
              { label: "L", dimensions: "Wide gusset — apparel sets and gifts" },
              { label: "Custom", dimensions: "CAD to your packed cube and handle spec" },
            ],
            features: [
              { label: "Range", value: "Laminated Carry Bags" },
              { label: "Reference art", value: "500pcs Custom Logo High-Grade Matte Embossed Laminated Paper Bags with Ribbon Handle for Clothes.jpg" },
              { label: "Structures", value: "Paper board, laminate, rope, ribbon, die-cut, twist handles" },
              { label: "Print", value: "CMYK, Pantone, specialty inks" },
              { label: "Min. order", value: "250 bags" },
              { label: "Lead time", value: "10–20 business days" },
            ],
            details: "Gallery paths mirror on-disk references for Laminated Carry Bags.\n\nWe align GSM, fold, and handle attachment to your line speed and brand story.\n\nBrands Face specs for retail, DTC unboxing, and gifting.",
          },
        },
        {
          slug: "carry-bag-foldable",
          tabId: "core_products",
          cardImage: "/assets/images/categories/Carry Bags/Core Product Pages/Foldable Carry Bags/4d38a9220756b2e3fb6e54bccb83efe1.jpg",
          detailImages: [
                    "/assets/images/categories/Carry Bags/Core Product Pages/Foldable Carry Bags/50 PCS Paper Bag With Kraft Handles Personalized Bulk - Etsy.jpg",
                    "/assets/images/categories/Carry Bags/Core Product Pages/Foldable Carry Bags/Sac en papier à poignée découpée avec Logo personnalisé, 500 pièces_lot, pour cadeau, vêtements,.jpg",
                    "/assets/images/categories/Carry Bags/Core Product Pages/Foldable Carry Bags/Пакет.jpg"
          ],
          heading: "Core",
          title: "Foldable Carry Bags",
          subtitle: "Collapsible structures — storage-efficient for back-of-house.",
          pdp: {
            title: "Foldable Carry Bags",
            description: "Foldable Carry Bags — custom board, handles, and print matched to your retail load, fulfilment cube, and campaign calendar.",
            badges: ["CARRY BAGS", "RETAIL READY", "BRANDS FACE STUDIO"],
            deals: [
              {
                title: "Handle load + burst check",
                description: "We sanity-check handle type, burst strength, and gusset for your SKU weight before production.",
                code: "BAGLOAD",
              },
              {
                title: "Proof pack — print + finish",
                description: "Pilot laminate, foil, or emboss on your chosen caliper before the full run.",
                code: "BAGPROOF",
              },
            ],
            sizes: [
              { label: "S", dimensions: "Compact boutique — small footprint class" },
              { label: "M", dimensions: "Standard retail — shirt box and bottles" },
              { label: "L", dimensions: "Wide gusset — apparel sets and gifts" },
              { label: "Custom", dimensions: "CAD to your packed cube and handle spec" },
            ],
            features: [
              { label: "Range", value: "Foldable Carry Bags" },
              { label: "Reference art", value: "4d38a9220756b2e3fb6e54bccb83efe1.jpg" },
              { label: "Structures", value: "Paper board, laminate, rope, ribbon, die-cut, twist handles" },
              { label: "Print", value: "CMYK, Pantone, specialty inks" },
              { label: "Min. order", value: "250 bags" },
              { label: "Lead time", value: "10–20 business days" },
            ],
            details: "Gallery paths mirror on-disk references for Foldable Carry Bags.\n\nWe align GSM, fold, and handle attachment to your line speed and brand story.\n\nBrands Face specs for retail, DTC unboxing, and gifting.",
          },
        },
        {
          slug: "carry-bag-retail",
          tabId: "use_case",
          cardImage: "/assets/images/categories/Carry Bags/Use-Case Based Pages/Retail Carry Bags/Coach [outlet] Women's And Men's Kraft Paper Bags Medium For Bag Wrappingjapan.jpg",
          detailImages: [
                    "/assets/images/categories/Carry Bags/Use-Case Based Pages/Retail Carry Bags/Custom Logo Luxury Boutique Gift Shopping Packaging Carrier Bag White Paper Bag With Die Cut Handles.jpg",
                    "/assets/images/categories/Carry Bags/Use-Case Based Pages/Retail Carry Bags/Custom Logo Shopping Bags - Personalized Packaging  for Small Business, Boutique Gift , Branded Retail.jpg",
                    "/assets/images/categories/Carry Bags/Use-Case Based Pages/Retail Carry Bags/Luxury Unlaminated Paper Bags _ Luxury Paper Bags.jpg"
          ],
          heading: "Use case",
          title: "Retail Carry Bags",
          subtitle: "High-frequency retail — durable handles, campaign print.",
          pdp: {
            title: "Retail Carry Bags",
            description: "Retail Carry Bags — custom board, handles, and print matched to your retail load, fulfilment cube, and campaign calendar.",
            badges: ["CARRY BAGS", "RETAIL READY", "BRANDS FACE STUDIO"],
            deals: [
              {
                title: "Handle load + burst check",
                description: "We sanity-check handle type, burst strength, and gusset for your SKU weight before production.",
                code: "BAGLOAD",
              },
              {
                title: "Proof pack — print + finish",
                description: "Pilot laminate, foil, or emboss on your chosen caliper before the full run.",
                code: "BAGPROOF",
              },
            ],
            sizes: [
              { label: "S", dimensions: "Compact boutique — small footprint class" },
              { label: "M", dimensions: "Standard retail — shirt box and bottles" },
              { label: "L", dimensions: "Wide gusset — apparel sets and gifts" },
              { label: "Custom", dimensions: "CAD to your packed cube and handle spec" },
            ],
            features: [
              { label: "Range", value: "Retail Carry Bags" },
              { label: "Reference art", value: "Coach [outlet] Women's And Men's Kraft Paper Bags Medium For Bag Wrappingjapan.jpg" },
              { label: "Structures", value: "Paper board, laminate, rope, ribbon, die-cut, twist handles" },
              { label: "Print", value: "CMYK, Pantone, specialty inks" },
              { label: "Min. order", value: "250 bags" },
              { label: "Lead time", value: "10–20 business days" },
            ],
            details: "Gallery paths mirror on-disk references for Retail Carry Bags.\n\nWe align GSM, fold, and handle attachment to your line speed and brand story.\n\nBrands Face specs for retail, DTC unboxing, and gifting.",
          },
        },
        {
          slug: "carry-bag-boutique",
          tabId: "use_case",
          cardImage: "/assets/images/categories/Carry Bags/Use-Case Based Pages/Boutique Carry Bags/download (5).jpg",
          detailImages: [
                    "/assets/images/categories/Carry Bags/Use-Case Based Pages/Boutique Carry Bags/download (6).jpg",
                    "/assets/images/categories/Carry Bags/Use-Case Based Pages/Boutique Carry Bags/Mary Steele - The Dieline.jpg",
                    "/assets/images/categories/Carry Bags/Use-Case Based Pages/Boutique Carry Bags/Merlyn - Identidade Visual.jpg"
          ],
          heading: "Use case",
          title: "Boutique Carry Bags",
          subtitle: "Small runs, soft-touch, editorial art — flagship tone.",
          pdp: {
            title: "Boutique Carry Bags",
            description: "Boutique Carry Bags — custom board, handles, and print matched to your retail load, fulfilment cube, and campaign calendar.",
            badges: ["CARRY BAGS", "RETAIL READY", "BRANDS FACE STUDIO"],
            deals: [
              {
                title: "Handle load + burst check",
                description: "We sanity-check handle type, burst strength, and gusset for your SKU weight before production.",
                code: "BAGLOAD",
              },
              {
                title: "Proof pack — print + finish",
                description: "Pilot laminate, foil, or emboss on your chosen caliper before the full run.",
                code: "BAGPROOF",
              },
            ],
            sizes: [
              { label: "S", dimensions: "Compact boutique — small footprint class" },
              { label: "M", dimensions: "Standard retail — shirt box and bottles" },
              { label: "L", dimensions: "Wide gusset — apparel sets and gifts" },
              { label: "Custom", dimensions: "CAD to your packed cube and handle spec" },
            ],
            features: [
              { label: "Range", value: "Boutique Carry Bags" },
              { label: "Reference art", value: "download (5).jpg" },
              { label: "Structures", value: "Paper board, laminate, rope, ribbon, die-cut, twist handles" },
              { label: "Print", value: "CMYK, Pantone, specialty inks" },
              { label: "Min. order", value: "250 bags" },
              { label: "Lead time", value: "10–20 business days" },
            ],
            details: "Gallery paths mirror on-disk references for Boutique Carry Bags.\n\nWe align GSM, fold, and handle attachment to your line speed and brand story.\n\nBrands Face specs for retail, DTC unboxing, and gifting.",
          },
        },
        {
          slug: "carry-bag-cosmetics",
          tabId: "use_case",
          cardImage: "/assets/images/categories/Carry Bags/Use-Case Based Pages/Cosmetics Carry Bags/Brand identity paper bag for SPA salon.jpg",
          detailImages: [
                    "/assets/images/categories/Carry Bags/Use-Case Based Pages/Cosmetics Carry Bags/download (5).jpg",
                    "/assets/images/categories/Carry Bags/Use-Case Based Pages/Cosmetics Carry Bags/download (6).jpg",
                    "/assets/images/categories/Carry Bags/Use-Case Based Pages/Cosmetics Carry Bags/Slowglow Brand Identity Design Renewal - seong a kim.jpg"
          ],
          heading: "Use case",
          title: "Cosmetics Carry Bags",
          subtitle: "Matte finishes, compact sizes — beauty counter ready.",
          pdp: {
            title: "Cosmetics Carry Bags",
            description: "Cosmetics Carry Bags — custom board, handles, and print matched to your retail load, fulfilment cube, and campaign calendar.",
            badges: ["CARRY BAGS", "RETAIL READY", "BRANDS FACE STUDIO"],
            deals: [
              {
                title: "Handle load + burst check",
                description: "We sanity-check handle type, burst strength, and gusset for your SKU weight before production.",
                code: "BAGLOAD",
              },
              {
                title: "Proof pack — print + finish",
                description: "Pilot laminate, foil, or emboss on your chosen caliper before the full run.",
                code: "BAGPROOF",
              },
            ],
            sizes: [
              { label: "S", dimensions: "Compact boutique — small footprint class" },
              { label: "M", dimensions: "Standard retail — shirt box and bottles" },
              { label: "L", dimensions: "Wide gusset — apparel sets and gifts" },
              { label: "Custom", dimensions: "CAD to your packed cube and handle spec" },
            ],
            features: [
              { label: "Range", value: "Cosmetics Carry Bags" },
              { label: "Reference art", value: "Brand identity paper bag for SPA salon.jpg" },
              { label: "Structures", value: "Paper board, laminate, rope, ribbon, die-cut, twist handles" },
              { label: "Print", value: "CMYK, Pantone, specialty inks" },
              { label: "Min. order", value: "250 bags" },
              { label: "Lead time", value: "10–20 business days" },
            ],
            details: "Gallery paths mirror on-disk references for Cosmetics Carry Bags.\n\nWe align GSM, fold, and handle attachment to your line speed and brand story.\n\nBrands Face specs for retail, DTC unboxing, and gifting.",
          },
        },
        {
          slug: "carry-bag-skincare",
          tabId: "use_case",
          cardImage: "/assets/images/categories/Carry Bags/Use-Case Based Pages/Skincare Carry Bags/download (5).jpg",
          detailImages: [
                    "/assets/images/categories/Carry Bags/Use-Case Based Pages/Skincare Carry Bags/download (6).jpg",
                    "/assets/images/categories/Carry Bags/Use-Case Based Pages/Skincare Carry Bags/Paper bag Packaging Design Beauty Salon.jpg",
                    "/assets/images/categories/Carry Bags/Use-Case Based Pages/Skincare Carry Bags/Recent Paper bag design.jpg"
          ],
          heading: "Use case",
          title: "Skincare Carry Bags",
          subtitle: "Calm aesthetics — kraft or soft white for regimens.",
          pdp: {
            title: "Skincare Carry Bags",
            description: "Skincare Carry Bags — custom board, handles, and print matched to your retail load, fulfilment cube, and campaign calendar.",
            badges: ["CARRY BAGS", "RETAIL READY", "BRANDS FACE STUDIO"],
            deals: [
              {
                title: "Handle load + burst check",
                description: "We sanity-check handle type, burst strength, and gusset for your SKU weight before production.",
                code: "BAGLOAD",
              },
              {
                title: "Proof pack — print + finish",
                description: "Pilot laminate, foil, or emboss on your chosen caliper before the full run.",
                code: "BAGPROOF",
              },
            ],
            sizes: [
              { label: "S", dimensions: "Compact boutique — small footprint class" },
              { label: "M", dimensions: "Standard retail — shirt box and bottles" },
              { label: "L", dimensions: "Wide gusset — apparel sets and gifts" },
              { label: "Custom", dimensions: "CAD to your packed cube and handle spec" },
            ],
            features: [
              { label: "Range", value: "Skincare Carry Bags" },
              { label: "Reference art", value: "download (5).jpg" },
              { label: "Structures", value: "Paper board, laminate, rope, ribbon, die-cut, twist handles" },
              { label: "Print", value: "CMYK, Pantone, specialty inks" },
              { label: "Min. order", value: "250 bags" },
              { label: "Lead time", value: "10–20 business days" },
            ],
            details: "Gallery paths mirror on-disk references for Skincare Carry Bags.\n\nWe align GSM, fold, and handle attachment to your line speed and brand story.\n\nBrands Face specs for retail, DTC unboxing, and gifting.",
          },
        },
        {
          slug: "carry-bag-perfume",
          tabId: "use_case",
          cardImage: "/assets/images/categories/Carry Bags/Use-Case Based Pages/Perfume Carry Bags/download (5).jpg",
          detailImages: [
                    "/assets/images/categories/Carry Bags/Use-Case Based Pages/Perfume Carry Bags/download (6).jpg",
                    "/assets/images/categories/Carry Bags/Use-Case Based Pages/Perfume Carry Bags/paper bag for perfume brand.jpg",
                    "/assets/images/categories/Carry Bags/Use-Case Based Pages/Perfume Carry Bags/Small Luxury Gift Bag.jpg"
          ],
          heading: "Use case",
          title: "Perfume Carry Bags",
          subtitle: "Thick board, ribbon, foil — gift corridor presence.",
          pdp: {
            title: "Perfume Carry Bags",
            description: "Perfume Carry Bags — custom board, handles, and print matched to your retail load, fulfilment cube, and campaign calendar.",
            badges: ["CARRY BAGS", "RETAIL READY", "BRANDS FACE STUDIO"],
            deals: [
              {
                title: "Handle load + burst check",
                description: "We sanity-check handle type, burst strength, and gusset for your SKU weight before production.",
                code: "BAGLOAD",
              },
              {
                title: "Proof pack — print + finish",
                description: "Pilot laminate, foil, or emboss on your chosen caliper before the full run.",
                code: "BAGPROOF",
              },
            ],
            sizes: [
              { label: "S", dimensions: "Compact boutique — small footprint class" },
              { label: "M", dimensions: "Standard retail — shirt box and bottles" },
              { label: "L", dimensions: "Wide gusset — apparel sets and gifts" },
              { label: "Custom", dimensions: "CAD to your packed cube and handle spec" },
            ],
            features: [
              { label: "Range", value: "Perfume Carry Bags" },
              { label: "Reference art", value: "download (5).jpg" },
              { label: "Structures", value: "Paper board, laminate, rope, ribbon, die-cut, twist handles" },
              { label: "Print", value: "CMYK, Pantone, specialty inks" },
              { label: "Min. order", value: "250 bags" },
              { label: "Lead time", value: "10–20 business days" },
            ],
            details: "Gallery paths mirror on-disk references for Perfume Carry Bags.\n\nWe align GSM, fold, and handle attachment to your line speed and brand story.\n\nBrands Face specs for retail, DTC unboxing, and gifting.",
          },
        },
        {
          slug: "carry-bag-gift",
          tabId: "use_case",
          cardImage: "/assets/images/categories/Carry Bags/Use-Case Based Pages/Gift Carry Bags/download (5).jpg",
          detailImages: [
                    "/assets/images/categories/Carry Bags/Use-Case Based Pages/Gift Carry Bags/download (6).jpg",
                    "/assets/images/categories/Carry Bags/Use-Case Based Pages/Gift Carry Bags/e79fe617b35ea1643af041bc125bfc78.jpg",
                    "/assets/images/categories/Carry Bags/Use-Case Based Pages/Gift Carry Bags/Gift Bag With Ribbon Digital Download Mockup - Gift Bag Mockup - Party Bag Mockup - Digital Download Gift Bag.jpg"
          ],
          heading: "Use case",
          title: "Gift Carry Bags",
          subtitle: "Occasion art, ribbon handles — Q4 and corporate gifting.",
          pdp: {
            title: "Gift Carry Bags",
            description: "Gift Carry Bags — custom board, handles, and print matched to your retail load, fulfilment cube, and campaign calendar.",
            badges: ["CARRY BAGS", "RETAIL READY", "BRANDS FACE STUDIO"],
            deals: [
              {
                title: "Handle load + burst check",
                description: "We sanity-check handle type, burst strength, and gusset for your SKU weight before production.",
                code: "BAGLOAD",
              },
              {
                title: "Proof pack — print + finish",
                description: "Pilot laminate, foil, or emboss on your chosen caliper before the full run.",
                code: "BAGPROOF",
              },
            ],
            sizes: [
              { label: "S", dimensions: "Compact boutique — small footprint class" },
              { label: "M", dimensions: "Standard retail — shirt box and bottles" },
              { label: "L", dimensions: "Wide gusset — apparel sets and gifts" },
              { label: "Custom", dimensions: "CAD to your packed cube and handle spec" },
            ],
            features: [
              { label: "Range", value: "Gift Carry Bags" },
              { label: "Reference art", value: "download (5).jpg" },
              { label: "Structures", value: "Paper board, laminate, rope, ribbon, die-cut, twist handles" },
              { label: "Print", value: "CMYK, Pantone, specialty inks" },
              { label: "Min. order", value: "250 bags" },
              { label: "Lead time", value: "10–20 business days" },
            ],
            details: "Gallery paths mirror on-disk references for Gift Carry Bags.\n\nWe align GSM, fold, and handle attachment to your line speed and brand story.\n\nBrands Face specs for retail, DTC unboxing, and gifting.",
          },
        },
        {
          slug: "carry-bag-apparel",
          tabId: "use_case",
          cardImage: "/assets/images/categories/Carry Bags/Use-Case Based Pages/Apparel Carry Bags/download (5).jpg",
          detailImages: [
                    "/assets/images/categories/Carry Bags/Use-Case Based Pages/Apparel Carry Bags/SENZA.jpg",
                    "/assets/images/categories/Carry Bags/Use-Case Based Pages/Apparel Carry Bags/Shopping Bag Mockup, Packaging Branding Mockup, Shop Bag Mockup, Carry Bag Mockup, Aesthetic Mockup PSD, Paper Gift Bag Mock.jpg",
                    "/assets/images/categories/Carry Bags/Use-Case Based Pages/Apparel Carry Bags/視線を釘付けにするビビットなピンクの紙袋_ オリジナル紙袋のベリービーバッグ.jpg"
          ],
          heading: "Use case",
          title: "Apparel Carry Bags",
          subtitle: "Wide gussets, strong rope — folded garments and hangers.",
          pdp: {
            title: "Apparel Carry Bags",
            description: "Apparel Carry Bags — custom board, handles, and print matched to your retail load, fulfilment cube, and campaign calendar.",
            badges: ["CARRY BAGS", "RETAIL READY", "BRANDS FACE STUDIO"],
            deals: [
              {
                title: "Handle load + burst check",
                description: "We sanity-check handle type, burst strength, and gusset for your SKU weight before production.",
                code: "BAGLOAD",
              },
              {
                title: "Proof pack — print + finish",
                description: "Pilot laminate, foil, or emboss on your chosen caliper before the full run.",
                code: "BAGPROOF",
              },
            ],
            sizes: [
              { label: "S", dimensions: "Compact boutique — small footprint class" },
              { label: "M", dimensions: "Standard retail — shirt box and bottles" },
              { label: "L", dimensions: "Wide gusset — apparel sets and gifts" },
              { label: "Custom", dimensions: "CAD to your packed cube and handle spec" },
            ],
            features: [
              { label: "Range", value: "Apparel Carry Bags" },
              { label: "Reference art", value: "download (5).jpg" },
              { label: "Structures", value: "Paper board, laminate, rope, ribbon, die-cut, twist handles" },
              { label: "Print", value: "CMYK, Pantone, specialty inks" },
              { label: "Min. order", value: "250 bags" },
              { label: "Lead time", value: "10–20 business days" },
            ],
            details: "Gallery paths mirror on-disk references for Apparel Carry Bags.\n\nWe align GSM, fold, and handle attachment to your line speed and brand story.\n\nBrands Face specs for retail, DTC unboxing, and gifting.",
          },
        },
        {
          slug: "carry-bag-jewelry",
          tabId: "use_case",
          cardImage: "/assets/images/categories/Carry Bags/Use-Case Based Pages/Jewelry Carry Bags/download (5).jpg",
          detailImages: [
                    "/assets/images/categories/Carry Bags/Use-Case Based Pages/Jewelry Carry Bags/Jewelry packaging wholesale, jewelry paper box manufacturers - Jewelry packaging sets.jpg",
                    "/assets/images/categories/Carry Bags/Use-Case Based Pages/Jewelry Carry Bags/paper bag design.jpg",
                    "/assets/images/categories/Carry Bags/Use-Case Based Pages/Jewelry Carry Bags/Star of Dune Packaging.jpg"
          ],
          heading: "Use case",
          title: "Jewelry Carry Bags",
          subtitle: "Compact luxury — foil, emboss, ribbon.",
          pdp: {
            title: "Jewelry Carry Bags",
            description: "Jewelry Carry Bags — custom board, handles, and print matched to your retail load, fulfilment cube, and campaign calendar.",
            badges: ["CARRY BAGS", "RETAIL READY", "BRANDS FACE STUDIO"],
            deals: [
              {
                title: "Handle load + burst check",
                description: "We sanity-check handle type, burst strength, and gusset for your SKU weight before production.",
                code: "BAGLOAD",
              },
              {
                title: "Proof pack — print + finish",
                description: "Pilot laminate, foil, or emboss on your chosen caliper before the full run.",
                code: "BAGPROOF",
              },
            ],
            sizes: [
              { label: "S", dimensions: "Compact boutique — small footprint class" },
              { label: "M", dimensions: "Standard retail — shirt box and bottles" },
              { label: "L", dimensions: "Wide gusset — apparel sets and gifts" },
              { label: "Custom", dimensions: "CAD to your packed cube and handle spec" },
            ],
            features: [
              { label: "Range", value: "Jewelry Carry Bags" },
              { label: "Reference art", value: "download (5).jpg" },
              { label: "Structures", value: "Paper board, laminate, rope, ribbon, die-cut, twist handles" },
              { label: "Print", value: "CMYK, Pantone, specialty inks" },
              { label: "Min. order", value: "250 bags" },
              { label: "Lead time", value: "10–20 business days" },
            ],
            details: "Gallery paths mirror on-disk references for Jewelry Carry Bags.\n\nWe align GSM, fold, and handle attachment to your line speed and brand story.\n\nBrands Face specs for retail, DTC unboxing, and gifting.",
          },
        },
        {
          slug: "carry-bag-event",
          tabId: "use_case",
          cardImage: "/assets/images/categories/Carry Bags/Use-Case Based Pages/Event Carry Bags/Custom Fashion Your Own Logo Print Cosmetics Luxury Gift Shopping Paper Bags With Button - Buy Shoes And Clothing Paper Bags.jpg",
          detailImages: [
                    "/assets/images/categories/Carry Bags/Use-Case Based Pages/Event Carry Bags/Personalized Paper Gift Bags with Ribbon, Custom Logo Packaging.jpg",
                    "/assets/images/categories/Carry Bags/Use-Case Based Pages/Event Carry Bags/Sac en carton épais avec impression de logo personnalisé, poignée en ruban, pour mariage,.jpg",
                    "/assets/images/categories/Carry Bags/Use-Case Based Pages/Event Carry Bags/伝統を感させるロイヤルブルーと花柄の気品あるデザインの紙袋_ オリジナル紙袋のベリービーバッグ.jpg"
          ],
          heading: "Use case",
          title: "Event Carry Bags",
          subtitle: "Fast turns, bold print — conferences and launches.",
          pdp: {
            title: "Event Carry Bags",
            description: "Event Carry Bags — custom board, handles, and print matched to your retail load, fulfilment cube, and campaign calendar.",
            badges: ["CARRY BAGS", "RETAIL READY", "BRANDS FACE STUDIO"],
            deals: [
              {
                title: "Handle load + burst check",
                description: "We sanity-check handle type, burst strength, and gusset for your SKU weight before production.",
                code: "BAGLOAD",
              },
              {
                title: "Proof pack — print + finish",
                description: "Pilot laminate, foil, or emboss on your chosen caliper before the full run.",
                code: "BAGPROOF",
              },
            ],
            sizes: [
              { label: "S", dimensions: "Compact boutique — small footprint class" },
              { label: "M", dimensions: "Standard retail — shirt box and bottles" },
              { label: "L", dimensions: "Wide gusset — apparel sets and gifts" },
              { label: "Custom", dimensions: "CAD to your packed cube and handle spec" },
            ],
            features: [
              { label: "Range", value: "Event Carry Bags" },
              { label: "Reference art", value: "Custom Fashion Your Own Logo Print Cosmetics Luxury Gift Shopping Paper Bags With Button - Buy Shoes And Clothing Paper Bags.jpg" },
              { label: "Structures", value: "Paper board, laminate, rope, ribbon, die-cut, twist handles" },
              { label: "Print", value: "CMYK, Pantone, specialty inks" },
              { label: "Min. order", value: "250 bags" },
              { label: "Lead time", value: "10–20 business days" },
            ],
            details: "Gallery paths mirror on-disk references for Event Carry Bags.\n\nWe align GSM, fold, and handle attachment to your line speed and brand story.\n\nBrands Face specs for retail, DTC unboxing, and gifting.",
          },
        },
        {
          slug: "carry-bag-promotional",
          tabId: "use_case",
          cardImage: "/assets/images/categories/Carry Bags/Use-Case Based Pages/Promotional Carry Bags/Custom Company Logo Business Promotional Gift Large Gift Bag _ Zazzle.jpg",
          detailImages: [
                    "/assets/images/categories/Carry Bags/Use-Case Based Pages/Promotional Carry Bags/Custom Company Logo Business Promotional Gift Medium Gift Bag _ Zazzle.jpg",
                    "/assets/images/categories/Carry Bags/Use-Case Based Pages/Promotional Carry Bags/majestic captivating elegant classy chic luxurious demure accessories store packaging design.jpg",
                    "/assets/images/categories/Carry Bags/Use-Case Based Pages/Promotional Carry Bags/Promotional Laminated Paper Bag with Custom Print _ Corporate Branding Bag.jpg"
          ],
          heading: "Use case",
          title: "Promotional Carry Bags",
          subtitle: "Economical boards — high-volume logo impact.",
          pdp: {
            title: "Promotional Carry Bags",
            description: "Promotional Carry Bags — custom board, handles, and print matched to your retail load, fulfilment cube, and campaign calendar.",
            badges: ["CARRY BAGS", "RETAIL READY", "BRANDS FACE STUDIO"],
            deals: [
              {
                title: "Handle load + burst check",
                description: "We sanity-check handle type, burst strength, and gusset for your SKU weight before production.",
                code: "BAGLOAD",
              },
              {
                title: "Proof pack — print + finish",
                description: "Pilot laminate, foil, or emboss on your chosen caliper before the full run.",
                code: "BAGPROOF",
              },
            ],
            sizes: [
              { label: "S", dimensions: "Compact boutique — small footprint class" },
              { label: "M", dimensions: "Standard retail — shirt box and bottles" },
              { label: "L", dimensions: "Wide gusset — apparel sets and gifts" },
              { label: "Custom", dimensions: "CAD to your packed cube and handle spec" },
            ],
            features: [
              { label: "Range", value: "Promotional Carry Bags" },
              { label: "Reference art", value: "Custom Company Logo Business Promotional Gift Large Gift Bag _ Zazzle.jpg" },
              { label: "Structures", value: "Paper board, laminate, rope, ribbon, die-cut, twist handles" },
              { label: "Print", value: "CMYK, Pantone, specialty inks" },
              { label: "Min. order", value: "500 bags" },
              { label: "Lead time", value: "10–20 business days" },
            ],
            details: "Gallery paths mirror on-disk references for Promotional Carry Bags.\n\nWe align GSM, fold, and handle attachment to your line speed and brand story.\n\nBrands Face specs for retail, DTC unboxing, and gifting.",
          },
        },
        {
          slug: "carry-bag-custom-printed",
          tabId: "premium_variations",
          cardImage: "/assets/images/categories/Carry Bags/Premium  Variation Pages/Custom Printed Carry Bags/Bag.jpg",
          detailImages: [
                    "/assets/images/categories/Carry Bags/Premium  Variation Pages/Custom Printed Carry Bags/bd09cc198d0356890865da634ebbb103.jpg",
                    "/assets/images/categories/Carry Bags/Premium  Variation Pages/Custom Printed Carry Bags/From I Identity to full event branding, thank you @strictlylawbusiness.jpg",
                    "/assets/images/categories/Carry Bags/Premium  Variation Pages/Custom Printed Carry Bags/Kabiri jewelry packaging _ Communication Arts.jpg"
          ],
          heading: "Premium",
          title: "Custom Printed Carry Bags",
          subtitle: "Full colour offset — panels and gussets, brand governance.",
          pdp: {
            title: "Custom Printed Carry Bags",
            description: "Custom Printed Carry Bags — custom board, handles, and print matched to your retail load, fulfilment cube, and campaign calendar.",
            badges: ["CARRY BAGS", "RETAIL READY", "BRANDS FACE STUDIO"],
            deals: [
              {
                title: "Handle load + burst check",
                description: "We sanity-check handle type, burst strength, and gusset for your SKU weight before production.",
                code: "BAGLOAD",
              },
              {
                title: "Proof pack — print + finish",
                description: "Pilot laminate, foil, or emboss on your chosen caliper before the full run.",
                code: "BAGPROOF",
              },
            ],
            sizes: [
              { label: "S", dimensions: "Compact boutique — small footprint class" },
              { label: "M", dimensions: "Standard retail — shirt box and bottles" },
              { label: "L", dimensions: "Wide gusset — apparel sets and gifts" },
              { label: "Custom", dimensions: "CAD to your packed cube and handle spec" },
            ],
            features: [
              { label: "Range", value: "Custom Printed Carry Bags" },
              { label: "Reference art", value: "Bag.jpg" },
              { label: "Structures", value: "Paper board, laminate, rope, ribbon, die-cut, twist handles" },
              { label: "Print", value: "CMYK, Pantone, specialty inks" },
              { label: "Min. order", value: "250 bags" },
              { label: "Lead time", value: "10–20 business days" },
            ],
            details: "Gallery paths mirror on-disk references for Custom Printed Carry Bags.\n\nWe align GSM, fold, and handle attachment to your line speed and brand story.\n\nBrands Face specs for retail, DTC unboxing, and gifting.",
          },
        },
        {
          slug: "carry-bag-foiled",
          tabId: "premium_variations",
          cardImage: "/assets/images/categories/Carry Bags/Premium  Variation Pages/Foiled Carry Bags/Custom Laminated Paper Bags - Create Laminated Paper Bags.jpg",
          detailImages: [
                    "/assets/images/categories/Carry Bags/Premium  Variation Pages/Foiled Carry Bags/Luxury Uncoated Paper Bags _ Alya Packaging.jpg",
                    "/assets/images/categories/Carry Bags/Premium  Variation Pages/Foiled Carry Bags/packaging – Beyond the M25 collective.jpg",
                    "/assets/images/categories/Carry Bags/Premium  Variation Pages/Foiled Carry Bags/Personalisierte schwarze Weihnachtsgeschenktasche, Folie gestempelt Name.jpg"
          ],
          heading: "Premium",
          title: "Foiled Carry Bags",
          subtitle: "Hot foil — metallic logos under store light.",
          pdp: {
            title: "Foiled Carry Bags",
            description: "Foiled Carry Bags — custom board, handles, and print matched to your retail load, fulfilment cube, and campaign calendar.",
            badges: ["CARRY BAGS", "RETAIL READY", "BRANDS FACE STUDIO"],
            deals: [
              {
                title: "Handle load + burst check",
                description: "We sanity-check handle type, burst strength, and gusset for your SKU weight before production.",
                code: "BAGLOAD",
              },
              {
                title: "Proof pack — print + finish",
                description: "Pilot laminate, foil, or emboss on your chosen caliper before the full run.",
                code: "BAGPROOF",
              },
            ],
            sizes: [
              { label: "S", dimensions: "Compact boutique — small footprint class" },
              { label: "M", dimensions: "Standard retail — shirt box and bottles" },
              { label: "L", dimensions: "Wide gusset — apparel sets and gifts" },
              { label: "Custom", dimensions: "CAD to your packed cube and handle spec" },
            ],
            features: [
              { label: "Range", value: "Foiled Carry Bags" },
              { label: "Reference art", value: "Custom Laminated Paper Bags - Create Laminated Paper Bags.jpg" },
              { label: "Structures", value: "Paper board, laminate, rope, ribbon, die-cut, twist handles" },
              { label: "Print", value: "CMYK, Pantone, specialty inks" },
              { label: "Min. order", value: "250 bags" },
              { label: "Lead time", value: "10–20 business days" },
            ],
            details: "Gallery paths mirror on-disk references for Foiled Carry Bags.\n\nWe align GSM, fold, and handle attachment to your line speed and brand story.\n\nBrands Face specs for retail, DTC unboxing, and gifting.",
          },
        },
        {
          slug: "carry-bag-embossed",
          tabId: "premium_variations",
          cardImage: "/assets/images/categories/Carry Bags/Premium  Variation Pages/Embossed Carry Bags/A Modern Black Gift Bag with A Matte Finish.jpg",
          detailImages: [
                    "/assets/images/categories/Carry Bags/Premium  Variation Pages/Embossed Carry Bags/Delight for lovers of craft details_ The shopping bag is decorated with embossed leaves, interpreting the natural luxury sty.jpg",
                    "/assets/images/categories/Carry Bags/Premium  Variation Pages/Embossed Carry Bags/Luxury paper bags And Boxes.jpg",
                    "/assets/images/categories/Carry Bags/Premium  Variation Pages/Embossed Carry Bags/Updates from JEHLICKOVA on Etsy.jpg"
          ],
          heading: "Premium",
          title: "Embossed Carry Bags",
          subtitle: "Blind emboss — tactile brand memory.",
          pdp: {
            title: "Embossed Carry Bags",
            description: "Embossed Carry Bags — custom board, handles, and print matched to your retail load, fulfilment cube, and campaign calendar.",
            badges: ["CARRY BAGS", "RETAIL READY", "BRANDS FACE STUDIO"],
            deals: [
              {
                title: "Handle load + burst check",
                description: "We sanity-check handle type, burst strength, and gusset for your SKU weight before production.",
                code: "BAGLOAD",
              },
              {
                title: "Proof pack — print + finish",
                description: "Pilot laminate, foil, or emboss on your chosen caliper before the full run.",
                code: "BAGPROOF",
              },
            ],
            sizes: [
              { label: "S", dimensions: "Compact boutique — small footprint class" },
              { label: "M", dimensions: "Standard retail — shirt box and bottles" },
              { label: "L", dimensions: "Wide gusset — apparel sets and gifts" },
              { label: "Custom", dimensions: "CAD to your packed cube and handle spec" },
            ],
            features: [
              { label: "Range", value: "Embossed Carry Bags" },
              { label: "Reference art", value: "A Modern Black Gift Bag with A Matte Finish.jpg" },
              { label: "Structures", value: "Paper board, laminate, rope, ribbon, die-cut, twist handles" },
              { label: "Print", value: "CMYK, Pantone, specialty inks" },
              { label: "Min. order", value: "250 bags" },
              { label: "Lead time", value: "10–20 business days" },
            ],
            details: "Gallery paths mirror on-disk references for Embossed Carry Bags.\n\nWe align GSM, fold, and handle attachment to your line speed and brand story.\n\nBrands Face specs for retail, DTC unboxing, and gifting.",
          },
        },
        {
          slug: "carry-bag-matte-finish",
          tabId: "premium_variations",
          cardImage: "/assets/images/categories/Carry Bags/Premium  Variation Pages/Matte Finish Carry Bags/download (5).jpg",
          detailImages: [
                    "/assets/images/categories/Carry Bags/Premium  Variation Pages/Matte Finish Carry Bags/Luxury Restaurant Packaging Design _ Saya Brand Identity.jpg",
                    "/assets/images/categories/Carry Bags/Premium  Variation Pages/Matte Finish Carry Bags/marie fleur (1).jpg",
                    "/assets/images/categories/Carry Bags/Premium  Variation Pages/Matte Finish Carry Bags/Подарочный Пакет С Вашим Дизайном.jpg"
          ],
          heading: "Premium",
          title: "Matte Finish Carry Bags",
          subtitle: "Soft-touch — fingerprint-friendly luxury fields.",
          pdp: {
            title: "Matte Finish Carry Bags",
            description: "Matte Finish Carry Bags — custom board, handles, and print matched to your retail load, fulfilment cube, and campaign calendar.",
            badges: ["CARRY BAGS", "RETAIL READY", "BRANDS FACE STUDIO"],
            deals: [
              {
                title: "Handle load + burst check",
                description: "We sanity-check handle type, burst strength, and gusset for your SKU weight before production.",
                code: "BAGLOAD",
              },
              {
                title: "Proof pack — print + finish",
                description: "Pilot laminate, foil, or emboss on your chosen caliper before the full run.",
                code: "BAGPROOF",
              },
            ],
            sizes: [
              { label: "S", dimensions: "Compact boutique — small footprint class" },
              { label: "M", dimensions: "Standard retail — shirt box and bottles" },
              { label: "L", dimensions: "Wide gusset — apparel sets and gifts" },
              { label: "Custom", dimensions: "CAD to your packed cube and handle spec" },
            ],
            features: [
              { label: "Range", value: "Matte Finish Carry Bags" },
              { label: "Reference art", value: "download (5).jpg" },
              { label: "Structures", value: "Paper board, laminate, rope, ribbon, die-cut, twist handles" },
              { label: "Print", value: "CMYK, Pantone, specialty inks" },
              { label: "Min. order", value: "250 bags" },
              { label: "Lead time", value: "10–20 business days" },
            ],
            details: "Gallery paths mirror on-disk references for Matte Finish Carry Bags.\n\nWe align GSM, fold, and handle attachment to your line speed and brand story.\n\nBrands Face specs for retail, DTC unboxing, and gifting.",
          },
        },
        {
          slug: "carry-bag-gloss-finish",
          tabId: "premium_variations",
          cardImage: "/assets/images/categories/Carry Bags/Premium  Variation Pages/Gloss Finish Carry Bags/25PCS Silver Mirror Paper Bags Gift Bags with Handles for Birthday Party Favor - Size 28x20x10cm.jpg",
          detailImages: [
                    "/assets/images/categories/Carry Bags/Premium  Variation Pages/Gloss Finish Carry Bags/download (5).jpg",
                    "/assets/images/categories/Carry Bags/Premium  Variation Pages/Gloss Finish Carry Bags/JAM Paper Glossy Gift Bag, 13 x 10 x 5, Black, 1_Pack - Walmart_com.jpg",
                    "/assets/images/categories/Carry Bags/Premium  Variation Pages/Gloss Finish Carry Bags/Paper bag, branded packaging bag, gift bag, packaging, corporate identity,.jpg"
          ],
          heading: "Premium",
          title: "Gloss Finish Carry Bags",
          subtitle: "High chroma — shelf pop and photography.",
          pdp: {
            title: "Gloss Finish Carry Bags",
            description: "Gloss Finish Carry Bags — custom board, handles, and print matched to your retail load, fulfilment cube, and campaign calendar.",
            badges: ["CARRY BAGS", "RETAIL READY", "BRANDS FACE STUDIO"],
            deals: [
              {
                title: "Handle load + burst check",
                description: "We sanity-check handle type, burst strength, and gusset for your SKU weight before production.",
                code: "BAGLOAD",
              },
              {
                title: "Proof pack — print + finish",
                description: "Pilot laminate, foil, or emboss on your chosen caliper before the full run.",
                code: "BAGPROOF",
              },
            ],
            sizes: [
              { label: "S", dimensions: "Compact boutique — small footprint class" },
              { label: "M", dimensions: "Standard retail — shirt box and bottles" },
              { label: "L", dimensions: "Wide gusset — apparel sets and gifts" },
              { label: "Custom", dimensions: "CAD to your packed cube and handle spec" },
            ],
            features: [
              { label: "Range", value: "Gloss Finish Carry Bags" },
              { label: "Reference art", value: "25PCS Silver Mirror Paper Bags Gift Bags with Handles for Birthday Party Favor - Size 28x20x10cm.jpg" },
              { label: "Structures", value: "Paper board, laminate, rope, ribbon, die-cut, twist handles" },
              { label: "Print", value: "CMYK, Pantone, specialty inks" },
              { label: "Min. order", value: "250 bags" },
              { label: "Lead time", value: "10–20 business days" },
            ],
            details: "Gallery paths mirror on-disk references for Gloss Finish Carry Bags.\n\nWe align GSM, fold, and handle attachment to your line speed and brand story.\n\nBrands Face specs for retail, DTC unboxing, and gifting.",
          },
        },
        {
          slug: "carry-bag-eco-friendly",
          tabId: "premium_variations",
          cardImage: "/assets/images/categories/Carry Bags/Premium  Variation Pages/Eco-Friendly Carry Bags/Bagways 30 PACK Reusable Grocery Bags with Handles, Durable, Foldable, Washable Eco-Friendly Shopping Totes, 14x6_5x14 Inch,.jpg",
          detailImages: [
                    "/assets/images/categories/Carry Bags/Premium  Variation Pages/Eco-Friendly Carry Bags/Loro villivakkam.jpg",
                    "/assets/images/categories/Carry Bags/Premium  Variation Pages/Eco-Friendly Carry Bags/Mirra Art Studio Coimbatore — Kraft Paper Bags by Roopac from Tiruppur.jpg",
                    "/assets/images/categories/Carry Bags/Premium  Variation Pages/Eco-Friendly Carry Bags/Nutz n Bites Food Paper Bags.jpg"
          ],
          heading: "Premium",
          title: "Eco-Friendly Carry Bags",
          subtitle: "FSC papers, water-based inks, natural handles.",
          pdp: {
            title: "Eco-Friendly Carry Bags",
            description: "Eco-Friendly Carry Bags — custom board, handles, and print matched to your retail load, fulfilment cube, and campaign calendar.",
            badges: ["CARRY BAGS", "RETAIL READY", "BRANDS FACE STUDIO"],
            deals: [
              {
                title: "Handle load + burst check",
                description: "We sanity-check handle type, burst strength, and gusset for your SKU weight before production.",
                code: "BAGLOAD",
              },
              {
                title: "Proof pack — print + finish",
                description: "Pilot laminate, foil, or emboss on your chosen caliper before the full run.",
                code: "BAGPROOF",
              },
            ],
            sizes: [
              { label: "S", dimensions: "Compact boutique — small footprint class" },
              { label: "M", dimensions: "Standard retail — shirt box and bottles" },
              { label: "L", dimensions: "Wide gusset — apparel sets and gifts" },
              { label: "Custom", dimensions: "CAD to your packed cube and handle spec" },
            ],
            features: [
              { label: "Range", value: "Eco-Friendly Carry Bags" },
              { label: "Reference art", value: "Bagways 30 PACK Reusable Grocery Bags with Handles, Durable, Foldable, Washable Eco-Friendly Shopping Totes, 14x6_5x14 Inch,.jpg" },
              { label: "Structures", value: "Paper board, laminate, rope, ribbon, die-cut, twist handles" },
              { label: "Print", value: "CMYK, Pantone, specialty inks" },
              { label: "Min. order", value: "250 bags" },
              { label: "Lead time", value: "10–20 business days" },
            ],
            details: "Gallery paths mirror on-disk references for Eco-Friendly Carry Bags.\n\nWe align GSM, fold, and handle attachment to your line speed and brand story.\n\nBrands Face specs for retail, DTC unboxing, and gifting.",
          },
        },
        {
          slug: "carry-bag-recycled-paper",
          tabId: "premium_variations",
          cardImage: "/assets/images/categories/Carry Bags/Premium  Variation Pages/Recycled Paper Carry Bags/bolsas de papel kraft asa rizada varios tamaños.jpg",
          detailImages: [
                    "/assets/images/categories/Carry Bags/Premium  Variation Pages/Recycled Paper Carry Bags/Custom Brown Paper Bags.jpg",
                    "/assets/images/categories/Carry Bags/Premium  Variation Pages/Recycled Paper Carry Bags/Custom Printed Kraft Paper Bags Hight Quantity Recyclable Shopping Gift Bag Food Take Away.jpg",
                    "/assets/images/categories/Carry Bags/Premium  Variation Pages/Recycled Paper Carry Bags/Starbucks Other _ Starbucks Mermaid Environmental Eco-Friendly Brown Black Paper Bag With Handles _ Color_ Black_Brown _ Siz.jpg"
          ],
          heading: "Premium",
          title: "Recycled Paper Carry Bags",
          subtitle: "High PCW content — shade-aware print.",
          pdp: {
            title: "Recycled Paper Carry Bags",
            description: "Recycled Paper Carry Bags — custom board, handles, and print matched to your retail load, fulfilment cube, and campaign calendar.",
            badges: ["CARRY BAGS", "RETAIL READY", "BRANDS FACE STUDIO"],
            deals: [
              {
                title: "Handle load + burst check",
                description: "We sanity-check handle type, burst strength, and gusset for your SKU weight before production.",
                code: "BAGLOAD",
              },
              {
                title: "Proof pack — print + finish",
                description: "Pilot laminate, foil, or emboss on your chosen caliper before the full run.",
                code: "BAGPROOF",
              },
            ],
            sizes: [
              { label: "S", dimensions: "Compact boutique — small footprint class" },
              { label: "M", dimensions: "Standard retail — shirt box and bottles" },
              { label: "L", dimensions: "Wide gusset — apparel sets and gifts" },
              { label: "Custom", dimensions: "CAD to your packed cube and handle spec" },
            ],
            features: [
              { label: "Range", value: "Recycled Paper Carry Bags" },
              { label: "Reference art", value: "bolsas de papel kraft asa rizada varios tamaños.jpg" },
              { label: "Structures", value: "Paper board, laminate, rope, ribbon, die-cut, twist handles" },
              { label: "Print", value: "CMYK, Pantone, specialty inks" },
              { label: "Min. order", value: "250 bags" },
              { label: "Lead time", value: "10–20 business days" },
            ],
            details: "Gallery paths mirror on-disk references for Recycled Paper Carry Bags.\n\nWe align GSM, fold, and handle attachment to your line speed and brand story.\n\nBrands Face specs for retail, DTC unboxing, and gifting.",
          },
        },
        {
          slug: "carry-bag-premium-shopping",
          tabId: "premium_variations",
          cardImage: "/assets/images/categories/Carry Bags/Premium  Variation Pages/Premium Shopping Bags/Atasar ambalaj ,Karton Çanta.jpg",
          detailImages: [
                    "/assets/images/categories/Carry Bags/Premium  Variation Pages/Premium Shopping Bags/Custom Logo Shopping Bags - Luxury Matte Art Paper Boutique Packaging.jpg",
                    "/assets/images/categories/Carry Bags/Premium  Variation Pages/Premium Shopping Bags/Sac cadeau en papier avec Logo monochrome imprimé gratuit, sac en papier pour Shopping, haut de.jpg",
                    "/assets/images/categories/Carry Bags/Premium  Variation Pages/Premium Shopping Bags/This item is unavailable - Etsy.jpg"
          ],
          heading: "Premium",
          title: "Premium Shopping Bags",
          subtitle: "Flagship-grade — thick board, interior print, luxury handles.",
          pdp: {
            title: "Premium Shopping Bags",
            description: "Premium Shopping Bags — custom board, handles, and print matched to your retail load, fulfilment cube, and campaign calendar.",
            badges: ["CARRY BAGS", "RETAIL READY", "BRANDS FACE STUDIO"],
            deals: [
              {
                title: "Handle load + burst check",
                description: "We sanity-check handle type, burst strength, and gusset for your SKU weight before production.",
                code: "BAGLOAD",
              },
              {
                title: "Proof pack — print + finish",
                description: "Pilot laminate, foil, or emboss on your chosen caliper before the full run.",
                code: "BAGPROOF",
              },
            ],
            sizes: [
              { label: "S", dimensions: "Compact boutique — small footprint class" },
              { label: "M", dimensions: "Standard retail — shirt box and bottles" },
              { label: "L", dimensions: "Wide gusset — apparel sets and gifts" },
              { label: "Custom", dimensions: "CAD to your packed cube and handle spec" },
            ],
            features: [
              { label: "Range", value: "Premium Shopping Bags" },
              { label: "Reference art", value: "Atasar ambalaj ,Karton Çanta.jpg" },
              { label: "Structures", value: "Paper board, laminate, rope, ribbon, die-cut, twist handles" },
              { label: "Print", value: "CMYK, Pantone, specialty inks" },
              { label: "Min. order", value: "250 bags" },
              { label: "Lead time", value: "10–20 business days" },
            ],
            details: "Gallery paths mirror on-disk references for Premium Shopping Bags.\n\nWe align GSM, fold, and handle attachment to your line speed and brand story.\n\nBrands Face specs for retail, DTC unboxing, and gifting.",
          },
        },
      ],
    },
    {
      category: "kraft_boxes",
      cardImage: "/assets/images/categories/categories_layout/kraft_paper/kraft_paper%20(1).png",
      bannerImages: [
        "/assets/images/categories/categories_layout/kraft_paper/kraft_paper%20(1).png",
        "/assets/images/categories/categories_layout/kraft_paper/kraft_paper%20(2).png",
        "/assets/images/categories/categories_layout/kraft_paper/kraft_paper%20(1).png",
      ],
      tabs: [
        { id: "all", label: "All" },
        { id: "core_products", label: "Core Products" },
        { id: "use_case", label: "Use-case Based" },
        { id: "premium_variations", label: "Premium variations" },
      ],
      products: [
        {
          slug: "kraft-tuck-end",
          tabId: "core_products",
          cardImage:
            "/assets/images/categories/Kraft boxes/Core Product Pages/Core Product Pages/Kraft Tuck End Box/250 Kraft Boxes 4 x 4 x 4  Reverse Tuck by NationalCarton on Etsy, $40_00.jpg",
          detailImages: [
            "/assets/images/categories/Kraft boxes/Core Product Pages/Core Product Pages/Kraft Tuck End Box/4 x 2 1_2 x 6_ White Reverse Tuck Folding Cartons.jpg",
            "/assets/images/categories/Kraft boxes/Core Product Pages/Core Product Pages/Kraft Tuck End Box/Kraft Tuck Box Organic Green Ecofriendly.jpg",
            "/assets/images/categories/Kraft boxes/Core Product Pages/Core Product Pages/Kraft Tuck End Box/Lavex 3 1_2_.jpg",
          ],
          heading: "Core",
          title: "Kraft Tuck End Box",
          subtitle: "Natural kraft folding carton — warm texture, efficient tuck closure.",
          pdp: pdpFromProduct(KRAFT_PRODUCTS["kraft-tuck-end"]),
        },
        {
          slug: "kraft-reverse-tuck-end",
          tabId: "core_products",
          cardImage:
            "/assets/images/categories/Kraft boxes/Core Product Pages/Core Product Pages/Kraft Reverse Tuck End Box/Exclusive Brand Reverse Tuck End Box.jpg",
          detailImages: [
            "/assets/images/categories/Kraft boxes/Core Product Pages/Core Product Pages/Kraft Reverse Tuck End Box/Lavex 2 1_2_ x 2 1_2_ x 4_ Kraft Heavy-Duty Reverse Tuck Carton - 500_Case.jpg",
            "/assets/images/categories/Kraft boxes/Core Product Pages/Core Product Pages/Kraft Reverse Tuck End Box/Lavex 4 1_2_ x 1 7_8_ x 4 1_2_ Kraft Reverse Tuck Carton (1).jpg",
            "/assets/images/categories/Kraft boxes/Core Product Pages/Core Product Pages/Kraft Reverse Tuck End Box/Lavex 4 1_2_ x 1 7_8_ x 4 1_2_ Kraft Reverse Tuck Carton.jpg",
          ],
          heading: "Core",
          title: "Kraft Reverse Tuck End Box",
          subtitle: "Opposing tucks — balanced retail opening on brown stock.",
          pdp: pdpFromProduct(KRAFT_PRODUCTS["kraft-reverse-tuck-end"]),
        },
        {
          slug: "kraft-straight-tuck-end",
          tabId: "core_products",
          cardImage:
            "/assets/images/categories/Kraft boxes/Core Product Pages/Core Product Pages/Kraft Straight Tuck End Box/OIP.webp",
          detailImages: [
            "/assets/images/categories/Kraft boxes/Core Product Pages/Core Product Pages/Kraft Straight Tuck End Box/Partners Brand 12.jpg",
            "/assets/images/categories/Kraft boxes/Core Product Pages/Core Product Pages/Kraft Straight Tuck End Box/Partners Brand Reverse Tuck Folding Carton, 3 in Inside Lg, 3 in Inside W, 6 in Inside H, Kraft, Fiberboard RTS22.jpg",
            "/assets/images/categories/Kraft boxes/Core Product Pages/Core Product Pages/Kraft Straight Tuck End Box/Partners Brand Reverse Tuck Folding Carton, 6 in Inside Lg, 1 1_2 in Inside W, 6 in Inside H, White, Fiberboard RTC52W.jpg",
          ],
          heading: "Core",
          title: "Kraft Straight Tuck End Box",
          subtitle: "Same-side tucks — machine-friendly, hero-face friendly.",
          pdp: pdpFromProduct(KRAFT_PRODUCTS["kraft-straight-tuck-end"]),
        },
        {
          slug: "kraft-auto-lock-bottom",
          tabId: "core_products",
          cardImage:
            "/assets/images/categories/Kraft boxes/Core Product Pages/Core Product Pages/Kraft Auto Lock Bottom Box/Auto_Lock_Bottom_Tuck_Top_Front_Back_A.jpg",
          detailImages: [
            "/assets/images/categories/Kraft boxes/Core Product Pages/Core Product Pages/Kraft Auto Lock Bottom Box/Auto-Bottom-Lock-Boxes3.webp",
            "/assets/images/categories/Kraft boxes/Core Product Pages/Core Product Pages/Kraft Auto Lock Bottom Box/Partners Brand Reverse Tuck Folding Carton, 3 in Inside Lg, 3 in Inside W, 6 in Inside H, Kraft, Fiberboard RTS22.jpg",
            "/assets/images/categories/Kraft boxes/Core Product Pages/Core Product Pages/Kraft Auto Lock Bottom Box/Partners Brand Reverse Tuck Folding Carton, 6 in Inside Lg, 1 1_2 in Inside W, 6 in Inside H, White, Fiberboard RTC52W.jpg",
          ],
          heading: "Core",
          title: "Kraft Auto Lock Bottom Box",
          subtitle: "Pop-open kraft base — quick assembly, organic look.",
          pdp: pdpFromProduct(KRAFT_PRODUCTS["kraft-auto-lock-bottom"]),
        },
        {
          slug: "kraft-crash-lock-bottom",
          tabId: "core_products",
          cardImage:
            "/assets/images/categories/Kraft boxes/Core Product Pages/Core Product Pages/Kraft Crash Lock Bottom Box/Auto_Lock_Bottom_Tuck_Top_Front_Back_A.jpg",
          detailImages: [
            "/assets/images/categories/Kraft boxes/Core Product Pages/Core Product Pages/Kraft Crash Lock Bottom Box/Auto-Bottom-Lock-Boxes3.webp",
            "/assets/images/categories/Kraft boxes/Core Product Pages/Core Product Pages/Kraft Crash Lock Bottom Box/Partners Brand Reverse Tuck Folding Carton, 3 in Inside Lg, 3 in Inside W, 6 in Inside H, Kraft, Fiberboard RTS22.jpg",
            "/assets/images/categories/Kraft boxes/Core Product Pages/Core Product Pages/Kraft Crash Lock Bottom Box/Partners Brand Reverse Tuck Folding Carton, 6 in Inside Lg, 1 1_2 in Inside W, 6 in Inside H, White, Fiberboard RTC52W.jpg",
          ],
          heading: "Core",
          title: "Kraft Crash Lock Bottom Box",
          subtitle: "High-speed crash base — throughput with earthy presentation.",
          pdp: pdpFromProduct(KRAFT_PRODUCTS["kraft-crash-lock-bottom"]),
        },
        {
          slug: "kraft-sleeve",
          tabId: "core_products",
          cardImage:
            "/assets/images/categories/Kraft boxes/Core Product Pages/Core Product Pages/Kraft Sleeve Box/50 шт_, внутренний размер 8_8_3,5 см, коробка из крафт-бумаги для подарка, мыло ручной работы, поделки, ювелирные изделия, с.jpg",
          detailImages: [
            "/assets/images/categories/Kraft boxes/Core Product Pages/Core Product Pages/Kraft Sleeve Box/Custom Kraft Sleeve Boxes.jpg",
            "/assets/images/categories/Kraft boxes/Core Product Pages/Core Product Pages/Kraft Sleeve Box/download (5).jpg",
            "/assets/images/categories/Kraft boxes/Core Product Pages/Core Product Pages/Kraft Sleeve Box/Drawer Box - Custom Pull-Out Sliding Box Design for Luxury Packaging.jpg",
          ],
          heading: "Core",
          title: "Kraft Sleeve Box",
          subtitle: "Slipcase sleeves — seasonal art on one inner system.",
          pdp: pdpFromProduct(KRAFT_PRODUCTS["kraft-sleeve"]),
        },
        {
          slug: "kraft-drawer",
          tabId: "core_products",
          cardImage:
            "/assets/images/categories/Kraft boxes/Core Product Pages/Core Product Pages/Kraft Drawer Box/[5 pieces] Kraft paper box drawer type EUNIO cardboard box.jpg",
          detailImages: [
            "/assets/images/categories/Kraft boxes/Core Product Pages/Core Product Pages/Kraft Drawer Box/download (5).jpg",
            "/assets/images/categories/Kraft boxes/Core Product Pages/Core Product Pages/Kraft Drawer Box/download (6).jpg",
            "/assets/images/categories/Kraft boxes/Core Product Pages/Core Product Pages/Kraft Drawer Box/Printed Kraft Cardboard Paper Folding Drawer Box.jpg",
          ],
          heading: "Core",
          title: "Kraft Drawer Box",
          subtitle: "Slide-out drawer — tactile pull on natural paper.",
          pdp: pdpFromProduct(KRAFT_PRODUCTS["kraft-drawer"]),
        },
        {
          slug: "kraft-window",
          tabId: "core_products",
          cardImage:
            "/assets/images/categories/Kraft boxes/Core Product Pages/Core Product Pages/Kraft Window Box/Baker's Lane 8_ x 5 3_4_ x 2 1_2_ Kraft Auto-Popup Window Cookie _ Bakery Box - 10_Pack.jpg",
          detailImages: [
            "/assets/images/categories/Kraft boxes/Core Product Pages/Core Product Pages/Kraft Window Box/download (5).jpg",
            "/assets/images/categories/Kraft boxes/Core Product Pages/Core Product Pages/Kraft Window Box/Kraft Cupcake Boxes with Clear Window and Inserts (14 x 10 x 4 In, 50 Pack).jpg",
            "/assets/images/categories/Kraft boxes/Core Product Pages/Core Product Pages/Kraft Window Box/This item is unavailable - Etsy.jpg",
          ],
          heading: "Core",
          title: "Kraft Window Box",
          subtitle: "PET patch on kraft — visibility with a natural frame.",
          pdp: pdpFromProduct(KRAFT_PRODUCTS["kraft-window"]),
        },
        {
          slug: "kraft-pillow",
          tabId: "core_products",
          cardImage:
            "/assets/images/categories/Kraft boxes/Core Product Pages/Core Product Pages/Kraft Pillow Box/Cool Paper Gift Boxes That Will Blow Your Mind.jpg",
          detailImages: [
            "/assets/images/categories/Kraft boxes/Core Product Pages/Core Product Pages/Kraft Pillow Box/download (5).jpg",
            "/assets/images/categories/Kraft boxes/Core Product Pages/Core Product Pages/Kraft Pillow Box/Gift box.jpg",
            "/assets/images/categories/Kraft boxes/Core Product Pages/Core Product Pages/Kraft Pillow Box/The Ultimate Guide to Kraft Paper Pillow Boxes- Factory Supplier.jpg",
          ],
          heading: "Core",
          title: "Kraft Pillow Box",
          subtitle: "Curved kraft pillow — minimal material for small gifts.",
          pdp: pdpFromProduct(KRAFT_PRODUCTS["kraft-pillow"]),
        },
        {
          slug: "kraft-two-piece",
          tabId: "core_products",
          cardImage:
            "/assets/images/categories/Kraft boxes/Core Product Pages/Core Product Pages/Kraft Two-Piece Box/[ MEDIUM FLAT ] 2-PC SQUARE – 25PCS (GIFT BOX PACKAGING).jpg",
          detailImages: [
            "/assets/images/categories/Kraft boxes/Core Product Pages/Core Product Pages/Kraft Two-Piece Box/1.jpg",
            "/assets/images/categories/Kraft boxes/Core Product Pages/Core Product Pages/Kraft Two-Piece Box/download (5).jpg",
            "/assets/images/categories/Kraft boxes/Core Product Pages/Core Product Pages/Kraft Two-Piece Box/Wholesale Packaging Supplies and Products _ Paper Mart.jpg",
          ],
          heading: "Core",
          title: "Kraft Two-Piece Box",
          subtitle: "Telescope lid + base — giftable depth without plastic gloss.",
          pdp: pdpFromProduct(KRAFT_PRODUCTS["kraft-two-piece"]),
        },
        {
          slug: "kraft-soap",
          tabId: "use_case",
          cardImage:
            "/assets/images/categories/Kraft boxes/Use-Case Based Product Pages/Kraft Soap Boxes/Custom Kraft Soap Boxes at PrintnBox.jpg",
          detailImages: [
            "/assets/images/categories/Kraft boxes/Use-Case Based Product Pages/Kraft Soap Boxes/Custom Soap Boxes Wholesale.jpg",
            "/assets/images/categories/Kraft boxes/Use-Case Based Product Pages/Kraft Soap Boxes/High-End Biodegradable Soap Packaging Boxes.jpg",
            "/assets/images/categories/Kraft boxes/Use-Case Based Product Pages/Kraft Soap Boxes/Soap Box - Square with Round Window (KRAFT COLOR) - 1 pc.jpg",
          ],
          heading: "Use case",
          title: "Kraft Soap Boxes",
          subtitle: "Grease-aware coatings — rustic or apothecary aesthetics.",
          pdp: pdpFromProduct(KRAFT_PRODUCTS["kraft-soap"]),
        },
        {
          slug: "kraft-skincare",
          tabId: "use_case",
          cardImage:
            "/assets/images/categories/Kraft boxes/Use-Case Based Product Pages/Kraft Skincare Boxes/Atelier Parsmei- Eco-friendly Packaging.jpg",
          detailImages: [
            "/assets/images/categories/Kraft boxes/Use-Case Based Product Pages/Kraft Skincare Boxes/Custom printed mailer boxes.jpg",
            "/assets/images/categories/Kraft boxes/Use-Case Based Product Pages/Kraft Skincare Boxes/download (5).jpg",
            "/assets/images/categories/Kraft boxes/Use-Case Based Product Pages/Kraft Skincare Boxes/Screenshot 2026-04-01 143525.jpg",
          ],
          heading: "Use case",
          title: "Kraft Skincare Boxes",
          subtitle: "Tubes and jars — natural tone, compliance-friendly panels.",
          pdp: pdpFromProduct(KRAFT_PRODUCTS["kraft-skincare"]),
        },
        {
          slug: "kraft-cosmetics",
          tabId: "use_case",
          cardImage:
            "/assets/images/categories/Kraft boxes/Use-Case Based Product Pages/Kraft Cosmetics Boxes/Atelier Parsmei- Eco-friendly Packaging.jpg",
          detailImages: [
            "/assets/images/categories/Kraft boxes/Use-Case Based Product Pages/Kraft Cosmetics Boxes/Custom printed mailer boxes.jpg",
            "/assets/images/categories/Kraft boxes/Use-Case Based Product Pages/Kraft Cosmetics Boxes/download (5).jpg",
            "/assets/images/categories/Kraft boxes/Use-Case Based Product Pages/Kraft Cosmetics Boxes/Screenshot 2026-04-01 143525.jpg",
          ],
          heading: "Use case",
          title: "Kraft Cosmetics Boxes",
          subtitle: "Bold ink on brown — editorial colour cosmetics.",
          pdp: pdpFromProduct(KRAFT_PRODUCTS["kraft-cosmetics"]),
        },
        {
          slug: "kraft-makeup",
          tabId: "use_case",
          cardImage:
            "/assets/images/categories/Kraft boxes/Use-Case Based Product Pages/Kraft Makeup Boxes/20pcs Kraft Paper Box DIY Lipstick Perfume Cosmetics _ Etsy.jpg",
          detailImages: [
            "/assets/images/categories/Kraft boxes/Use-Case Based Product Pages/Kraft Makeup Boxes/50 Pack Kraft Paper Lipstick Case Peru Rectangle Essential Oil Packaging Box for Lipstick Bottle.jpg",
            "/assets/images/categories/Kraft boxes/Use-Case Based Product Pages/Kraft Makeup Boxes/Buy Pushup Yellow Kraft Paper Packaging Boxes Cosmetic Product Online.jpg",
            "/assets/images/categories/Kraft boxes/Use-Case Based Product Pages/Kraft Makeup Boxes/Custom Logo Cardboard Cartons Shipping Mailer Box Kraft Cosmetic Set Cosmetics Mailing Skin Care Corrugated Packaging Boxes .jpg",
          ],
          heading: "Use case",
          title: "Kraft Makeup Boxes",
          subtitle: "Palettes and kits — shallow depths, artisan vibe.",
          pdp: pdpFromProduct(KRAFT_PRODUCTS["kraft-makeup"]),
        },
        {
          slug: "kraft-perfume",
          tabId: "use_case",
          cardImage:
            "/assets/images/categories/Kraft boxes/Use-Case Based Product Pages/Kraft Perfume Boxes/Buy Pushup Yellow Kraft Paper Packaging Boxes Cosmetic Product Online.jpg",
          detailImages: [
            "/assets/images/categories/Kraft boxes/Use-Case Based Product Pages/Kraft Perfume Boxes/Custom Logo Cardboard Cartons Shipping Mailer Box Kraft Cosmetic Set Cosmetics Mailing Skin Care Corrugated Packaging Boxes .jpg",
            "/assets/images/categories/Kraft boxes/Use-Case Based Product Pages/Kraft Perfume Boxes/download (5).jpg",
            "/assets/images/categories/Kraft boxes/Use-Case Based Product Pages/Kraft Perfume Boxes/download (6).jpg",
          ],
          heading: "Use case",
          title: "Kraft Perfume Boxes",
          subtitle: "Bottle maps, foil on kraft — niche-house friendly.",
          pdp: pdpFromProduct(KRAFT_PRODUCTS["kraft-perfume"]),
        },
        {
          slug: "kraft-essential-oil",
          tabId: "use_case",
          cardImage:
            "/assets/images/categories/Kraft boxes/Use-Case Based Product Pages/Kraft Essential Oil Boxes/Bluzen 5-Pack Essential Oil Blends.jpg",
          detailImages: [
            "/assets/images/categories/Kraft boxes/Use-Case Based Product Pages/Kraft Essential Oil Boxes/Essential Oil Boxes_ A Comprehensive Guide for Wholesalers, Brands & Businesses (1).jpg",
            "/assets/images/categories/Kraft boxes/Use-Case Based Product Pages/Kraft Essential Oil Boxes/Essential Oil Boxes_ A Comprehensive Guide for Wholesalers, Brands & Businesses.jpg",
            "/assets/images/categories/Kraft boxes/Use-Case Based Product Pages/Kraft Essential Oil Boxes/Set of 50 - Kraft Boxes - Various Sizes - for Lotion, Spray Bottles, Essential Oils, Cosmetics, Perfume - Etsy.jpg",
          ],
          heading: "Use case",
          title: "Kraft Essential Oil Boxes",
          subtitle: "Small bottles, compliance copy, botanical art.",
          pdp: pdpFromProduct(KRAFT_PRODUCTS["kraft-essential-oil"]),
        },
        {
          slug: "kraft-candle",
          tabId: "use_case",
          cardImage:
            "/assets/images/categories/Kraft boxes/Use-Case Based Product Pages/Kraft Candle Boxes/download (5).jpg",
          detailImages: [
            "/assets/images/categories/Kraft boxes/Use-Case Based Product Pages/Kraft Candle Boxes/download (6).jpg",
            "/assets/images/categories/Kraft boxes/Use-Case Based Product Pages/Kraft Candle Boxes/Screenshot 2026-04-01 145103.jpg",
            "/assets/images/categories/Kraft boxes/Use-Case Based Product Pages/Kraft Candle Boxes/Soft Pink Scented Candle.jpg",
          ],
          heading: "Use case",
          title: "Kraft Candle Boxes",
          subtitle: "Jar protection — burn instructions and gift-ready structure.",
          pdp: pdpFromProduct(KRAFT_PRODUCTS["kraft-candle"]),
        },
        {
          slug: "kraft-gift",
          tabId: "use_case",
          cardImage:
            "/assets/images/categories/Kraft boxes/Use-Case Based Product Pages/Kraft Gift Boxes/10pcs Hexagon Shape Creative Kraft Paper Candy Boxes Wedding Favors Gift Packaging Box For Birthday.jpg",
          detailImages: [
            "/assets/images/categories/Kraft boxes/Use-Case Based Product Pages/Kraft Gift Boxes/download (5).jpg",
            "/assets/images/categories/Kraft boxes/Use-Case Based Product Pages/Kraft Gift Boxes/Elegant Custom Gable Gift Box with Ribbon.jpg",
            "/assets/images/categories/Kraft boxes/Use-Case Based Product Pages/Kraft Gift Boxes/Mailer Boxes _ Custom Boxes _ Box Design _ Creative Packaging Design _ Packaging Design Inspiration.jpg",
          ],
          heading: "Use case",
          title: "Kraft Gift Boxes",
          subtitle: "Occasion-ready — ribbon, window, two-piece on natural stock.",
          pdp: pdpFromProduct(KRAFT_PRODUCTS["kraft-gift"]),
        },
        {
          slug: "kraft-food",
          tabId: "use_case",
          cardImage:
            "/assets/images/categories/Kraft boxes/Use-Case Based Product Pages/Kraft Food Boxes/10 Pack Kraft Paper Cupcake Boxes with Window and Inserts, Brown Bakery Boxes Cookie Cake Boxes with Jute Twine and Stickers.jpg",
          detailImages: [
            "/assets/images/categories/Kraft boxes/Use-Case Based Product Pages/Kraft Food Boxes/Bio Tek 47 oz Kraft Paper Lunch _ Chicken Box - with Fast Top - 7_ x 4 1_2_ x 2 3_4_ - 400 count box.jpg",
            "/assets/images/categories/Kraft boxes/Use-Case Based Product Pages/Kraft Food Boxes/Moretoes Bakery Boxes, 8x8x3 Inch Bakery Containers Brown Kraft Paper for Cupcake, Cookies and Baked Goods Set of 15.jpg",
            "/assets/images/categories/Kraft boxes/Use-Case Based Product Pages/Kraft Food Boxes/White clay coating inside kraft outside paper lunch food takeaway container - Buy Food Container Box, Food Container, Food B.jpg",
          ],
          heading: "Use case",
          title: "Kraft Food Boxes",
          subtitle: "Food-grade barriers — bakery, dry goods, meal adjacency.",
          pdp: pdpFromProduct(KRAFT_PRODUCTS["kraft-food"]),
        },
        {
          slug: "kraft-retail",
          tabId: "use_case",
          cardImage:
            "/assets/images/categories/Kraft boxes/Use-Case Based Product Pages/Kraft Retail Boxes/COST-EFFECTIVE CUSTOM KRAFT BOXES ARE PERFECT TO DISPLAY YOUR VALUED PRODUCTS.jpg",
          detailImages: [
            "/assets/images/categories/Kraft boxes/Use-Case Based Product Pages/Kraft Retail Boxes/Exploring Gable Box Styles and Benefits -Packaging Supplier.jpg",
            "/assets/images/categories/Kraft boxes/Use-Case Based Product Pages/Kraft Retail Boxes/Kraft Gift Boxes, Candle Boxes - Set of 10.jpg",
            "/assets/images/categories/Kraft boxes/Use-Case Based Product Pages/Kraft Retail Boxes/Wholesale Packaging Supplies and Products _ Paper Mart.jpg",
          ],
          heading: "Use case",
          title: "Kraft Retail Boxes",
          subtitle: "Shelf-facing kraft — hang tabs, scuff-smart finish.",
          pdp: pdpFromProduct(KRAFT_PRODUCTS["kraft-retail"]),
        },
        {
          slug: "kraft-printed",
          tabId: "premium_variations",
          cardImage:
            "/assets/images/categories/Kraft boxes/Premium  Variation Pages/Printed Kraft Boxes/download (5).jpg",
          detailImages: [
            "/assets/images/categories/Kraft boxes/Premium  Variation Pages/Printed Kraft Boxes/download (6).jpg",
            "/assets/images/categories/Kraft boxes/Premium  Variation Pages/Printed Kraft Boxes/Gothic Glam Fragrance Flight _ 1 oz Sample Bottles.jpg",
            "/assets/images/categories/Kraft boxes/Premium  Variation Pages/Printed Kraft Boxes/Printed Kraft Cardboard Paper Folding Drawer Box.jpg",
          ],
          heading: "Premium",
          title: "Printed Kraft Boxes",
          subtitle: "Flexo to litho — managing colour on natural fibre.",
          pdp: pdpFromProduct(KRAFT_PRODUCTS["kraft-printed"]),
        },
        {
          slug: "kraft-foiled",
          tabId: "premium_variations",
          cardImage:
            "/assets/images/categories/Kraft boxes/Premium  Variation Pages/Foiled Kraft Boxes/Dov Kroll and Dekel Maimon Create New Gift Box for Drimia Winery - World Brand Design Society.jpg",
          detailImages: [
            "/assets/images/categories/Kraft boxes/Premium  Variation Pages/Foiled Kraft Boxes/Foil Stamped Kraft Paper Packaging Box.jpg",
            "/assets/images/categories/Kraft boxes/Premium  Variation Pages/Foiled Kraft Boxes/Printing your Logo onto Stock Gift Boxes.jpg",
            "/assets/images/categories/Kraft boxes/Premium  Variation Pages/Foiled Kraft Boxes/Welcome JOANN Shoppers _ Your Favorite Fabrics _ Michaels.jpg",
          ],
          heading: "Premium",
          title: "Foiled Kraft Boxes",
          subtitle: "Hot foil on kraft — metallic warmth on brown stock.",
          pdp: pdpFromProduct(KRAFT_PRODUCTS["kraft-foiled"]),
        },
        {
          slug: "kraft-embossed",
          tabId: "premium_variations",
          cardImage:
            "/assets/images/categories/Kraft boxes/Premium  Variation Pages/Embossed Kraft Boxes/download (5).jpg",
          detailImages: [
            "/assets/images/categories/Kraft boxes/Premium  Variation Pages/Embossed Kraft Boxes/Eco Embossed Kraft Paper Box.jpg",
            "/assets/images/categories/Kraft boxes/Premium  Variation Pages/Embossed Kraft Boxes/Eco-friendly kraft paper box.jpg",
            "/assets/images/categories/Kraft boxes/Premium  Variation Pages/Embossed Kraft Boxes/Luxury Embossed Candle Packaging with Elegant Kraft Design.jpg",
          ],
          heading: "Premium",
          title: "Embossed Kraft Boxes",
          subtitle: "Blind emboss — tactile logos on uncoated fibre.",
          pdp: pdpFromProduct(KRAFT_PRODUCTS["kraft-embossed"]),
        },
        {
          slug: "kraft-matte",
          tabId: "premium_variations",
          cardImage:
            "/assets/images/categories/Kraft boxes/Premium  Variation Pages/Matte Kraft Boxes/download (5).jpg",
          detailImages: [
            "/assets/images/categories/Kraft boxes/Premium  Variation Pages/Matte Kraft Boxes/download (6).jpg",
            "/assets/images/categories/Kraft boxes/Premium  Variation Pages/Matte Kraft Boxes/OIP.webp",
            "/assets/images/categories/Kraft boxes/Premium  Variation Pages/Matte Kraft Boxes/R.jpg",
          ],
          heading: "Premium",
          title: "Matte Kraft Boxes",
          subtitle: "Soft-touch / matte aqueous — fingerprint-friendly natural.",
          pdp: pdpFromProduct(KRAFT_PRODUCTS["kraft-matte"]),
        },
        {
          slug: "kraft-gloss",
          tabId: "premium_variations",
          cardImage:
            "/assets/images/categories/Kraft boxes/Premium  Variation Pages/Printed Kraft Boxes/download (5).jpg",
          detailImages: [
            "/assets/images/categories/Kraft boxes/Premium  Variation Pages/Printed Kraft Boxes/download (6).jpg",
            "/assets/images/categories/Kraft boxes/Premium  Variation Pages/Printed Kraft Boxes/Gothic Glam Fragrance Flight _ 1 oz Sample Bottles.jpg",
            "/assets/images/categories/Kraft boxes/Premium  Variation Pages/Printed Kraft Boxes/Printed Kraft Cardboard Paper Folding Drawer Box.jpg",
          ],
          heading: "Premium",
          title: "Gloss Kraft Boxes",
          subtitle: "Selective gloss — logo pop without full plastic shine.",
          pdp: pdpFromProduct(KRAFT_PRODUCTS["kraft-gloss"]),
        },
        {
          slug: "kraft-with-inserts",
          tabId: "premium_variations",
          cardImage:
            "/assets/images/categories/Kraft boxes/Premium  Variation Pages/Kraft Boxes with Inserts/Bright Stripes and Stars Cake.jpg",
          detailImages: [
            "/assets/images/categories/Kraft boxes/Premium  Variation Pages/Kraft Boxes with Inserts/Disposable Takeout Kraft Sushi Packaging Custom Take Away Bento Food Luxury Gift Paper Takeaway Sushi Box With Compartment -.jpg",
            "/assets/images/categories/Kraft boxes/Premium  Variation Pages/Kraft Boxes with Inserts/Macaron Packaging Boxes Solution- Customizable & Affordable Here Only.jpg",
            "/assets/images/categories/Kraft boxes/Premium  Variation Pages/Kraft Boxes with Inserts/Wholesale kraft paper color flip box party chocolate favorite grazing box catering packaging platter box with partition.jpg",
          ],
          heading: "Premium",
          title: "Kraft Boxes with Inserts",
          subtitle: "Paper, pulp, foam — retention on natural shells.",
          pdp: pdpFromProduct(KRAFT_PRODUCTS["kraft-with-inserts"]),
        },
        {
          slug: "kraft-recycled",
          tabId: "premium_variations",
          cardImage:
            "/assets/images/categories/Kraft boxes/Premium  Variation Pages/Recycled Kraft Boxes/BOX.jpg",
          detailImages: [
            "/assets/images/categories/Kraft boxes/Premium  Variation Pages/Recycled Kraft Boxes/Kraft Tuck End Boxes_ 18pt Recycled Paperboard, Set of 50.jpg",
            "/assets/images/categories/Kraft boxes/Premium  Variation Pages/Recycled Kraft Boxes/Paper Cardboard Boxes Gift Paper Box Brown 2x2 X2_75 Inch For Gift Wrap 30 Pcs.jpg",
            "/assets/images/categories/Kraft boxes/Premium  Variation Pages/Recycled Kraft Boxes/Temu｜10 stuks_50 stuks_10x5cm Kleine Papieren Kussendoosjes voor Sieraden, Oorbellen, Verpakking, Organizer, Cadeau, Kartonn.jpg",
          ],
          heading: "Premium",
          title: "Recycled Kraft Boxes",
          subtitle: "High PCW content — documented recycled fibre.",
          pdp: pdpFromProduct(KRAFT_PRODUCTS["kraft-recycled"]),
        },
        {
          slug: "kraft-eco-friendly",
          tabId: "premium_variations",
          cardImage:
            "/assets/images/categories/Kraft boxes/Premium  Variation Pages/Eco-Friendly Kraft Boxes/Cajas Cubo Carton Packaging Embalaje Kraft 10x10x10 Pack X25 Kraft.jpg",
          detailImages: [
            "/assets/images/categories/Kraft boxes/Premium  Variation Pages/Eco-Friendly Kraft Boxes/Eco-Friendly Custom Kraft Box Packaging Inspiration.jpg",
            "/assets/images/categories/Kraft boxes/Premium  Variation Pages/Eco-Friendly Kraft Boxes/Kraft Eco.jpg",
            "/assets/images/categories/Kraft boxes/Premium  Variation Pages/Eco-Friendly Kraft Boxes/Unbox Sustainability_ Kraft Box Packaging That Stands Out.jpg",
          ],
          heading: "Premium",
          title: "Eco-Friendly Kraft Boxes",
          subtitle: "Water-based inks, FSC options, right-sizing for less waste.",
          pdp: pdpFromProduct(KRAFT_PRODUCTS["kraft-eco-friendly"]),
        },
      ],
    },
    {
      category: "labels_tags",
      cardImage: "/assets/images/categories/categories_layout/Labels%20%26%20Stickers/label_stickers%20(1).webp",
      bannerImages: [
              "/assets/images/categories/categories_layout/Labels%20%26%20Stickers/label_stickers%20(1).webp",
              "/assets/images/categories/categories_layout/Labels%20%26%20Stickers/label_stickers%20(2).webp",
              "/assets/images/categories/categories_layout/Labels%20%26%20Stickers/label_stickers%20(3).webp"
      ],
      tabs: [
        { id: "all", label: "All" },
        { id: "core_products", label: "Core Products" },
        { id: "use_case", label: "Use-case Based" },
        { id: "premium_variations", label: "Premium variations" },
      ],
      products: [
        {
          slug: "labels-apparel-tags",
          tabId: "core_products",
          cardImage: "/assets/images/categories/Labels & Tags/Core Product Pages/Apparel Tags/download (5).jpg",
          detailImages: [
                    "/assets/images/categories/Labels & Tags/Core Product Pages/Apparel Tags/download (6).jpg",
                    "/assets/images/categories/Labels & Tags/Core Product Pages/Apparel Tags/Fashion hang tags.jpg",
                    "/assets/images/categories/Labels & Tags/Core Product Pages/Apparel Tags/TAG2.jpg"
          ],
          heading: "Core",
          title: "Apparel Tags",
          subtitle: "Fashion hang tags — branding, size, and care callouts.",
          pdp: {
            title: "Apparel Tags",
            description: "Apparel Tags — custom print, die-cut, and stock options matched to your applicator, climate, and retail plan.",
            badges: ["LABELS & TAGS", "BRAND READY", "BRANDS FACE STUDIO"],
            deals: [
              {
                title: "Applicator and unwind audit",
                description: "We confirm core size, rewind direction, and liner release before production.",
                code: "LABELRUN",
              },
              {
                title: "Proof pack — stock + finish",
                description: "Pilot varnish, foil, or emboss on your chosen stock before the full run.",
                code: "LABELPROOF",
              },
            ],
            sizes: [
              { label: "S", dimensions: "From 1 × 2 in — small labels / tags" },
              { label: "M", dimensions: "From 2 × 3 in — typical retail" },
              { label: "L", dimensions: "Oversize panels and wrap bands" },
              { label: "Custom", dimensions: "Die-line to your dieline or applicator spec" },
            ],
            features: [
              { label: "Range", value: "Apparel Tags" },
              { label: "Reference art", value: "download (5).jpg" },
              { label: "Formats", value: "Sheets, rolls, singles — die-cut to CAD" },
              { label: "Print", value: "CMYK, Pantone, specialty inks" },
              { label: "Min. order", value: "250 pieces" },
              { label: "Lead time", value: "7–16 business days" },
            ],
            details: "Gallery paths mirror your on-disk references under Core Product Pages/Apparel Tags.\n\nWe align adhesive, caliper, and finish to fulfilment and climate.\n\nBrands Face specs for DTC and retail programs.",
          },
        },
        {
          slug: "labels-bottle-labels",
          tabId: "core_products",
          cardImage: "/assets/images/categories/Labels & Tags/Core Product Pages/Bottle Labels/Gold Modern 60ml Cosmetic Bottle Wrap Around Label (Label can suit 2 OZ _ 60ml cosmetic bottles but.jpg",
          detailImages: [
                    "/assets/images/categories/Labels & Tags/Core Product Pages/Bottle Labels/Minimalist Greenery Floral Room Spray Bottle Label (Add your product name, ingredients and safety in.jpg",
                    "/assets/images/categories/Labels & Tags/Core Product Pages/Bottle Labels/Product Customizable Pink Rustic Label.jpg",
                    "/assets/images/categories/Labels & Tags/Core Product Pages/Bottle Labels/White & Gold Cosmetic 1 OZ Dropper Bottle Label.jpg"
          ],
          heading: "Core",
          title: "Bottle Labels",
          subtitle: "Wrap-around and panel labels for bottles and jars.",
          pdp: {
            title: "Bottle Labels",
            description: "Bottle Labels — custom print, die-cut, and stock options matched to your applicator, climate, and retail plan.",
            badges: ["LABELS & TAGS", "BRAND READY", "BRANDS FACE STUDIO"],
            deals: [
              {
                title: "Applicator and unwind audit",
                description: "We confirm core size, rewind direction, and liner release before production.",
                code: "LABELRUN",
              },
              {
                title: "Proof pack — stock + finish",
                description: "Pilot varnish, foil, or emboss on your chosen stock before the full run.",
                code: "LABELPROOF",
              },
            ],
            sizes: [
              { label: "S", dimensions: "From 1 × 2 in — small labels / tags" },
              { label: "M", dimensions: "From 2 × 3 in — typical retail" },
              { label: "L", dimensions: "Oversize panels and wrap bands" },
              { label: "Custom", dimensions: "Die-line to your dieline or applicator spec" },
            ],
            features: [
              { label: "Range", value: "Bottle Labels" },
              { label: "Reference art", value: "Gold Modern 60ml Cosmetic Bottle Wrap Around Label (Label can suit 2 OZ _ 60ml cosmetic bottles but.jpg" },
              { label: "Formats", value: "Sheets, rolls, singles — die-cut to CAD" },
              { label: "Print", value: "CMYK, Pantone, specialty inks" },
              { label: "Min. order", value: "500 labels" },
              { label: "Lead time", value: "7–16 business days" },
            ],
            details: "Gallery paths mirror your on-disk references under Core Product Pages/Bottle Labels.\n\nWe align adhesive, caliper, and finish to fulfilment and climate.\n\nBrands Face specs for DTC and retail programs.",
          },
        },
        {
          slug: "labels-custom-product-labels",
          tabId: "core_products",
          cardImage: "/assets/images/categories/Labels & Tags/Core Product Pages/Custom Product Labels/StickerPromo.jpg",
          detailImages: [
                    "/assets/images/categories/Labels & Tags/Core Product Pages/Custom Product Labels/today and.jpg",
                    "/assets/images/categories/Labels & Tags/Core Product Pages/Custom Product Labels/download (5).jpg"
          ],
          heading: "Core",
          title: "Custom Product Labels",
          subtitle: "Product ID and promo stickers — ecommerce-ready runs.",
          pdp: {
            title: "Custom Product Labels",
            description: "Custom Product Labels — custom print, die-cut, and stock options matched to your applicator, climate, and retail plan.",
            badges: ["LABELS & TAGS", "BRAND READY", "BRANDS FACE STUDIO"],
            deals: [
              {
                title: "Applicator and unwind audit",
                description: "We confirm core size, rewind direction, and liner release before production.",
                code: "LABELRUN",
              },
              {
                title: "Proof pack — stock + finish",
                description: "Pilot varnish, foil, or emboss on your chosen stock before the full run.",
                code: "LABELPROOF",
              },
            ],
            sizes: [
              { label: "S", dimensions: "From 1 × 2 in — small labels / tags" },
              { label: "M", dimensions: "From 2 × 3 in — typical retail" },
              { label: "L", dimensions: "Oversize panels and wrap bands" },
              { label: "Custom", dimensions: "Die-line to your dieline or applicator spec" },
            ],
            features: [
              { label: "Range", value: "Custom Product Labels" },
              { label: "Reference art", value: "⚡ Boost Your Look — 30% OFF Custom Stickers!_Great for ecommerce & packaging__Order now! #StickerPromo.jpg" },
              { label: "Formats", value: "Sheets, rolls, singles — die-cut to CAD" },
              { label: "Print", value: "CMYK, Pantone, specialty inks" },
              { label: "Min. order", value: "500 labels" },
              { label: "Lead time", value: "7–16 business days" },
            ],
            details: "Gallery paths mirror your on-disk references under Core Product Pages/Custom Product Labels.\n\nWe align adhesive, caliper, and finish to fulfilment and climate.\n\nBrands Face specs for DTC and retail programs.",
          },
        },
        {
          slug: "labels-die-cut-labels",
          tabId: "core_products",
          cardImage: "/assets/images/categories/Labels & Tags/Core Product Pages/Die-Cut Labels/Customizable Round Waterproof Suitable For Weddings, Birthdays, Parties - Personalized Self-adhesive Stickers With Your Own .jpg",
          detailImages: [
                    "/assets/images/categories/Labels & Tags/Core Product Pages/Die-Cut Labels/Die Cut Sticker Mockup, Sticker Mockup, Printify Sticker Mockup, Canva Sticker Mockup, Custom Sticker PSD Template, Canva St.jpg",
                    "/assets/images/categories/Labels & Tags/Core Product Pages/Die-Cut Labels/download (5).jpg",
                    "/assets/images/categories/Labels & Tags/Core Product Pages/Die-Cut Labels/MUNBYN 2 Inch Brown Circle Thermal Sticker Labels, Self-Adhesive Round Direct Thermal Labels for Logo Design, QR Code, 750 S.jpg"
          ],
          heading: "Core",
          title: "Die-Cut Labels",
          subtitle: "Die-cut shapes — kiss-cut sheets and singles.",
          pdp: {
            title: "Die-Cut Labels",
            description: "Die-Cut Labels — custom print, die-cut, and stock options matched to your applicator, climate, and retail plan.",
            badges: ["LABELS & TAGS", "BRAND READY", "BRANDS FACE STUDIO"],
            deals: [
              {
                title: "Applicator and unwind audit",
                description: "We confirm core size, rewind direction, and liner release before production.",
                code: "LABELRUN",
              },
              {
                title: "Proof pack — stock + finish",
                description: "Pilot varnish, foil, or emboss on your chosen stock before the full run.",
                code: "LABELPROOF",
              },
            ],
            sizes: [
              { label: "S", dimensions: "From 1 × 2 in — small labels / tags" },
              { label: "M", dimensions: "From 2 × 3 in — typical retail" },
              { label: "L", dimensions: "Oversize panels and wrap bands" },
              { label: "Custom", dimensions: "Die-line to your dieline or applicator spec" },
            ],
            features: [
              { label: "Range", value: "Die-Cut Labels" },
              { label: "Reference art", value: "Customizable Round Waterproof Suitable For Weddings, Birthdays, Parties - Personalized Self-adhesive Stickers With Your Own .jpg" },
              { label: "Formats", value: "Sheets, rolls, singles — die-cut to CAD" },
              { label: "Print", value: "CMYK, Pantone, specialty inks" },
              { label: "Min. order", value: "500 labels" },
              { label: "Lead time", value: "7–16 business days" },
            ],
            details: "Gallery paths mirror your on-disk references under Core Product Pages/Die-Cut Labels.\n\nWe align adhesive, caliper, and finish to fulfilment and climate.\n\nBrands Face specs for DTC and retail programs.",
          },
        },
        {
          slug: "labels-hang-tags",
          tabId: "core_products",
          cardImage: "/assets/images/categories/Labels & Tags/Core Product Pages/Hang Tags/Custom Luxury Hanging Label With Free Slings Special Swing Paper Product Hang Tags For Clothing Garment - Buy Paper Hang Tag.jpg",
          detailImages: [
                    "/assets/images/categories/Labels & Tags/Core Product Pages/Hang Tags/Custom Product Hang tags, Swing Tags, Clothing hang tags, Gift Tags, Garment Tags.jpg",
                    "/assets/images/categories/Labels & Tags/Core Product Pages/Hang Tags/download (5).jpg",
                    "/assets/images/categories/Labels & Tags/Core Product Pages/Hang Tags/Professional Line Clothing Brand Hang Tags.jpg"
          ],
          heading: "Core",
          title: "Hang Tags",
          subtitle: "String-ready hang tags — apparel and gift retail.",
          pdp: {
            title: "Hang Tags",
            description: "Hang Tags — custom print, die-cut, and stock options matched to your applicator, climate, and retail plan.",
            badges: ["LABELS & TAGS", "BRAND READY", "BRANDS FACE STUDIO"],
            deals: [
              {
                title: "Applicator and unwind audit",
                description: "We confirm core size, rewind direction, and liner release before production.",
                code: "LABELRUN",
              },
              {
                title: "Proof pack — stock + finish",
                description: "Pilot varnish, foil, or emboss on your chosen stock before the full run.",
                code: "LABELPROOF",
              },
            ],
            sizes: [
              { label: "S", dimensions: "From 1 × 2 in — small labels / tags" },
              { label: "M", dimensions: "From 2 × 3 in — typical retail" },
              { label: "L", dimensions: "Oversize panels and wrap bands" },
              { label: "Custom", dimensions: "Die-line to your dieline or applicator spec" },
            ],
            features: [
              { label: "Range", value: "Hang Tags" },
              { label: "Reference art", value: "Custom Luxury Hanging Label With Free Slings Special Swing Paper Product Hang Tags For Clothing Garment - Buy Paper Hang Tag.jpg" },
              { label: "Formats", value: "Sheets, rolls, singles — die-cut to CAD" },
              { label: "Print", value: "CMYK, Pantone, specialty inks" },
              { label: "Min. order", value: "250 pieces" },
              { label: "Lead time", value: "7–16 business days" },
            ],
            details: "Gallery paths mirror your on-disk references under Core Product Pages/Hang Tags.\n\nWe align adhesive, caliper, and finish to fulfilment and climate.\n\nBrands Face specs for DTC and retail programs.",
          },
        },
        {
          slug: "labels-jar-labels",
          tabId: "core_products",
          cardImage: "/assets/images/categories/Labels & Tags/Core Product Pages/Jar Labels/EDITABLE Cosmetic Jar Label Template _ Modern and Minimalist Jar Label _ Body Product Label _ Wrap Around Jar Label _ Busine.jpg",
          detailImages: [
                    "/assets/images/categories/Labels & Tags/Core Product Pages/Jar Labels/Honey Packaging (1).jpg",
                    "/assets/images/categories/Labels & Tags/Core Product Pages/Jar Labels/Honey Packaging.jpg",
                    "/assets/images/categories/Labels & Tags/Core Product Pages/Jar Labels/Stylish Fonts Paycheck Budget,biweekly Budget ,finance Binder,expense Tracking,financial Top.jpg"
          ],
          heading: "Core",
          title: "Jar Labels",
          subtitle: "Wrap-around and panel labels for bottles and jars.",
          pdp: {
            title: "Jar Labels",
            description: "Jar Labels — custom print, die-cut, and stock options matched to your applicator, climate, and retail plan.",
            badges: ["LABELS & TAGS", "BRAND READY", "BRANDS FACE STUDIO"],
            deals: [
              {
                title: "Applicator and unwind audit",
                description: "We confirm core size, rewind direction, and liner release before production.",
                code: "LABELRUN",
              },
              {
                title: "Proof pack — stock + finish",
                description: "Pilot varnish, foil, or emboss on your chosen stock before the full run.",
                code: "LABELPROOF",
              },
            ],
            sizes: [
              { label: "S", dimensions: "From 1 × 2 in — small labels / tags" },
              { label: "M", dimensions: "From 2 × 3 in — typical retail" },
              { label: "L", dimensions: "Oversize panels and wrap bands" },
              { label: "Custom", dimensions: "Die-line to your dieline or applicator spec" },
            ],
            features: [
              { label: "Range", value: "Jar Labels" },
              { label: "Reference art", value: "EDITABLE Cosmetic Jar Label Template _ Modern and Minimalist Jar Label _ Body Product Label _ Wrap Around Jar Label _ Busine.jpg" },
              { label: "Formats", value: "Sheets, rolls, singles — die-cut to CAD" },
              { label: "Print", value: "CMYK, Pantone, specialty inks" },
              { label: "Min. order", value: "500 labels" },
              { label: "Lead time", value: "7–16 business days" },
            ],
            details: "Gallery paths mirror your on-disk references under Core Product Pages/Jar Labels.\n\nWe align adhesive, caliper, and finish to fulfilment and climate.\n\nBrands Face specs for DTC and retail programs.",
          },
        },
        {
          slug: "labels-price-tags",
          tabId: "core_products",
          cardImage: "/assets/images/categories/Labels & Tags/Core Product Pages/Price Tags/50 Kraft Paper Price Tags, Gift Tags, Wedding DIY (13x50mm) - Etsy.jpg",
          detailImages: [
                    "/assets/images/categories/Labels & Tags/Core Product Pages/Price Tags/Clothing Hang Tag with Price, Size, Style & Social.jpg",
                    "/assets/images/categories/Labels & Tags/Core Product Pages/Price Tags/Greenery Line Art Business Name Social Media Price Gift Tags.jpg",
                    "/assets/images/categories/Labels & Tags/Core Product Pages/Price Tags/Minimalist Black & White Clothing Labels Hang Tag.jpg"
          ],
          heading: "Core",
          title: "Price Tags",
          subtitle: "Kraft and printed price tags — peg and boutique fixtures.",
          pdp: {
            title: "Price Tags",
            description: "Price Tags — custom print, die-cut, and stock options matched to your applicator, climate, and retail plan.",
            badges: ["LABELS & TAGS", "BRAND READY", "BRANDS FACE STUDIO"],
            deals: [
              {
                title: "Applicator and unwind audit",
                description: "We confirm core size, rewind direction, and liner release before production.",
                code: "LABELRUN",
              },
              {
                title: "Proof pack — stock + finish",
                description: "Pilot varnish, foil, or emboss on your chosen stock before the full run.",
                code: "LABELPROOF",
              },
            ],
            sizes: [
              { label: "S", dimensions: "From 1 × 2 in — small labels / tags" },
              { label: "M", dimensions: "From 2 × 3 in — typical retail" },
              { label: "L", dimensions: "Oversize panels and wrap bands" },
              { label: "Custom", dimensions: "Die-line to your dieline or applicator spec" },
            ],
            features: [
              { label: "Range", value: "Price Tags" },
              { label: "Reference art", value: "50 Kraft Paper Price Tags, Gift Tags, Wedding DIY (13x50mm) - Etsy.jpg" },
              { label: "Formats", value: "Sheets, rolls, singles — die-cut to CAD" },
              { label: "Print", value: "CMYK, Pantone, specialty inks" },
              { label: "Min. order", value: "250 pieces" },
              { label: "Lead time", value: "7–16 business days" },
            ],
            details: "Gallery paths mirror your on-disk references under Core Product Pages/Price Tags.\n\nWe align adhesive, caliper, and finish to fulfilment and climate.\n\nBrands Face specs for DTC and retail programs.",
          },
        },
        {
          slug: "labels-roll-labels",
          tabId: "core_products",
          cardImage: "/assets/images/categories/Labels & Tags/Core Product Pages/Roll Labels/Custom Self-adhesive Metal Aluminum Sticker Embossed Bottle Logo Wine Label - Buy Embossed Metal Sticker,Aluminum Sticker La.jpg",
          detailImages: [
                    "/assets/images/categories/Labels & Tags/Core Product Pages/Roll Labels/BrandStickers.jpg",
                    "/assets/images/categories/Labels & Tags/Core Product Pages/Roll Labels/Our custom printeds.jpg",
                    "/assets/images/categories/Labels & Tags/Core Product Pages/Roll Labels/Custom Square Roll Labels.jpg"
          ],
          heading: "Core",
          title: "Roll Labels",
          subtitle: "Roll-fed labels — applicator-ready cores and unwind.",
          pdp: {
            title: "Roll Labels",
            description: "Roll Labels — custom print, die-cut, and stock options matched to your applicator, climate, and retail plan.",
            badges: ["LABELS & TAGS", "BRAND READY", "BRANDS FACE STUDIO"],
            deals: [
              {
                title: "Applicator and unwind audit",
                description: "We confirm core size, rewind direction, and liner release before production.",
                code: "LABELRUN",
              },
              {
                title: "Proof pack — stock + finish",
                description: "Pilot varnish, foil, or emboss on your chosen stock before the full run.",
                code: "LABELPROOF",
              },
            ],
            sizes: [
              { label: "S", dimensions: "From 1 × 2 in — small labels / tags" },
              { label: "M", dimensions: "From 2 × 3 in — typical retail" },
              { label: "L", dimensions: "Oversize panels and wrap bands" },
              { label: "Custom", dimensions: "Die-line to your dieline or applicator spec" },
            ],
            features: [
              { label: "Range", value: "Roll Labels" },
              { label: "Reference art", value: "🌟 Waterproof Vinyl Stickers for Superior Packaging! 🌟 Looking for durable and high-quality stickers_ Our custom printed, s.jpg" },
              { label: "Formats", value: "Sheets, rolls, singles — die-cut to CAD" },
              { label: "Print", value: "CMYK, Pantone, specialty inks" },
              { label: "Min. order", value: "500 labels" },
              { label: "Lead time", value: "7–16 business days" },
            ],
            details: "Gallery paths mirror your on-disk references under Core Product Pages/Roll Labels.\n\nWe align adhesive, caliper, and finish to fulfilment and climate.\n\nBrands Face specs for DTC and retail programs.",
          },
        },
        {
          slug: "labels-sheet-labels",
          tabId: "core_products",
          cardImage: "/assets/images/categories/Labels & Tags/Core Product Pages/Sheet Labels/test_1.jpg",
          detailImages: [
                    "/assets/images/categories/Labels & Tags/Core Product Pages/Sheet Labels/MiroCaro 4_ x 6_ Shipping Labels for Thermal Printer, Fan-Fold Postage Thermal Labels, Mailing Labels for Packages (4 Stacks.jpg",
                    "/assets/images/categories/Labels & Tags/Core Product Pages/Sheet Labels/v2croft 144 PCS Minimalist Laundry Room Labels Set, Water Resistant Stickers,Water_Oil Resistant Stickers for Laundry Room, .jpg"
          ],
          heading: "Core",
          title: "Sheet Labels",
          subtitle: "Fan-fold and sheet formats — hand apply or thermal print lines.",
          pdp: {
            title: "Sheet Labels",
            description: "Sheet Labels — custom print, die-cut, and stock options matched to your applicator, climate, and retail plan.",
            badges: ["LABELS & TAGS", "BRAND READY", "BRANDS FACE STUDIO"],
            deals: [
              {
                title: "Applicator and unwind audit",
                description: "We confirm core size, rewind direction, and liner release before production.",
                code: "LABELRUN",
              },
              {
                title: "Proof pack — stock + finish",
                description: "Pilot varnish, foil, or emboss on your chosen stock before the full run.",
                code: "LABELPROOF",
              },
            ],
            sizes: [
              { label: "S", dimensions: "From 1 × 2 in — small labels / tags" },
              { label: "M", dimensions: "From 2 × 3 in — typical retail" },
              { label: "L", dimensions: "Oversize panels and wrap bands" },
              { label: "Custom", dimensions: "Die-line to your dieline or applicator spec" },
            ],
            features: [
              { label: "Range", value: "Sheet Labels" },
              { label: "Reference art", value: "🎁 Special Sticker Sale_ 20% OFF!_Get custom stickers for your business or event at a discounted price!_Order today! #Sticke.jpg" },
              { label: "Formats", value: "Sheets, rolls, singles — die-cut to CAD" },
              { label: "Print", value: "CMYK, Pantone, specialty inks" },
              { label: "Min. order", value: "500 labels" },
              { label: "Lead time", value: "7–16 business days" },
            ],
            details: "Gallery paths mirror your on-disk references under Core Product Pages/Sheet Labels.\n\nWe align adhesive, caliper, and finish to fulfilment and climate.\n\nBrands Face specs for DTC and retail programs.",
          },
        },
        {
          slug: "labels-swing-tags",
          tabId: "core_products",
          cardImage: "/assets/images/categories/Labels & Tags/Core Product Pages/Swing Tags/Custom Luxury Hanging Label With Free Slings Special Swing Paper Product Hang Tags For Clothing Garment - Buy Paper Hang Tag.jpg",
          detailImages: [
                    "/assets/images/categories/Labels & Tags/Core Product Pages/Swing Tags/Custom Product Hang tags, Swing Tags, Clothing hang tags, Gift Tags, Garment Tags.jpg",
                    "/assets/images/categories/Labels & Tags/Core Product Pages/Swing Tags/download (5).jpg",
                    "/assets/images/categories/Labels & Tags/Core Product Pages/Swing Tags/Professional Line Clothing Brand Hang Tags.jpg"
          ],
          heading: "Core",
          title: "Swing Tags",
          subtitle: "String-ready hang tags — apparel and gift retail.",
          pdp: {
            title: "Swing Tags",
            description: "Swing Tags — custom print, die-cut, and stock options matched to your applicator, climate, and retail plan.",
            badges: ["LABELS & TAGS", "BRAND READY", "BRANDS FACE STUDIO"],
            deals: [
              {
                title: "Applicator and unwind audit",
                description: "We confirm core size, rewind direction, and liner release before production.",
                code: "LABELRUN",
              },
              {
                title: "Proof pack — stock + finish",
                description: "Pilot varnish, foil, or emboss on your chosen stock before the full run.",
                code: "LABELPROOF",
              },
            ],
            sizes: [
              { label: "S", dimensions: "From 1 × 2 in — small labels / tags" },
              { label: "M", dimensions: "From 2 × 3 in — typical retail" },
              { label: "L", dimensions: "Oversize panels and wrap bands" },
              { label: "Custom", dimensions: "Die-line to your dieline or applicator spec" },
            ],
            features: [
              { label: "Range", value: "Swing Tags" },
              { label: "Reference art", value: "Custom Luxury Hanging Label With Free Slings Special Swing Paper Product Hang Tags For Clothing Garment - Buy Paper Hang Tag.jpg" },
              { label: "Formats", value: "Sheets, rolls, singles — die-cut to CAD" },
              { label: "Print", value: "CMYK, Pantone, specialty inks" },
              { label: "Min. order", value: "250 pieces" },
              { label: "Lead time", value: "7–16 business days" },
            ],
            details: "Gallery paths mirror your on-disk references under Core Product Pages/Swing Tags.\n\nWe align adhesive, caliper, and finish to fulfilment and climate.\n\nBrands Face specs for DTC and retail programs.",
          },
        },
        {
          slug: "labels-clear-labels",
          tabId: "premium_variations",
          cardImage: "/assets/images/categories/Labels & Tags/Premium  Variation Pages/Clear Labels/72 Spice and Herb Name Jar Labels Clear Vinyl Stickers Waterproof and Washable 38mm Round - Etsy.jpg",
          detailImages: [
                    "/assets/images/categories/Labels & Tags/Premium  Variation Pages/Clear Labels/Custom Clear Stickers_ Personalized Logo Stickers, Round Labels - Etsy.jpg",
                    "/assets/images/categories/Labels & Tags/Premium  Variation Pages/Clear Labels/download (5).jpg",
                    "/assets/images/categories/Labels & Tags/Premium  Variation Pages/Clear Labels/High-End Style_ Luxury Brands.jpg"
          ],
          heading: "Premium",
          title: "Clear Labels",
          subtitle: "Clear and no-label look — glass-forward packaging.",
          pdp: {
            title: "Clear Labels",
            description: "Clear Labels — custom print, die-cut, and stock options matched to your applicator, climate, and retail plan.",
            badges: ["LABELS & TAGS", "BRAND READY", "BRANDS FACE STUDIO"],
            deals: [
              {
                title: "Applicator and unwind audit",
                description: "We confirm core size, rewind direction, and liner release before production.",
                code: "LABELRUN",
              },
              {
                title: "Proof pack — stock + finish",
                description: "Pilot varnish, foil, or emboss on your chosen stock before the full run.",
                code: "LABELPROOF",
              },
            ],
            sizes: [
              { label: "S", dimensions: "From 1 × 2 in — small labels / tags" },
              { label: "M", dimensions: "From 2 × 3 in — typical retail" },
              { label: "L", dimensions: "Oversize panels and wrap bands" },
              { label: "Custom", dimensions: "Die-line to your dieline or applicator spec" },
            ],
            features: [
              { label: "Range", value: "Clear Labels" },
              { label: "Reference art", value: "72 Spice and Herb Name Jar Labels Clear Vinyl Stickers Waterproof and Washable 38mm Round - Etsy.jpg" },
              { label: "Formats", value: "Sheets, rolls, singles — die-cut to CAD" },
              { label: "Print", value: "CMYK, Pantone, specialty inks" },
              { label: "Min. order", value: "500 labels" },
              { label: "Lead time", value: "7–16 business days" },
            ],
            details: "Gallery paths mirror your on-disk references under Premium  Variation Pages/Clear Labels.\n\nWe align adhesive, caliper, and finish to fulfilment and climate.\n\nBrands Face specs for DTC and retail programs.",
          },
        },
        {
          slug: "labels-embossed-labels",
          tabId: "premium_variations",
          cardImage: "/assets/images/categories/Labels & Tags/Premium  Variation Pages/Embossed Labels/Custom Order - 500pcs 4cm Gold Stickers + 200pcs 24x35+4cm OPP Bags - Personalized Label & Packaging Set.jpg",
          detailImages: [
                    "/assets/images/categories/Labels & Tags/Premium  Variation Pages/Embossed Labels/download (5).jpg",
                    "/assets/images/categories/Labels & Tags/Premium  Variation Pages/Embossed Labels/Embossed Sticker Custom Color Personalized stickers, Custom Seals, Wedding stickers, Custom Labels, Business Stickers, Gift .jpg",
                    "/assets/images/categories/Labels & Tags/Premium  Variation Pages/Embossed Labels/How to Elevate Your Brand Image with Custom Embossed Stickers.jpg"
          ],
          heading: "Premium",
          title: "Embossed Labels",
          subtitle: "Raised emboss — tactile logos and seals.",
          pdp: {
            title: "Embossed Labels",
            description: "Embossed Labels — custom print, die-cut, and stock options matched to your applicator, climate, and retail plan.",
            badges: ["LABELS & TAGS", "BRAND READY", "BRANDS FACE STUDIO"],
            deals: [
              {
                title: "Applicator and unwind audit",
                description: "We confirm core size, rewind direction, and liner release before production.",
                code: "LABELRUN",
              },
              {
                title: "Proof pack — stock + finish",
                description: "Pilot varnish, foil, or emboss on your chosen stock before the full run.",
                code: "LABELPROOF",
              },
            ],
            sizes: [
              { label: "S", dimensions: "From 1 × 2 in — small labels / tags" },
              { label: "M", dimensions: "From 2 × 3 in — typical retail" },
              { label: "L", dimensions: "Oversize panels and wrap bands" },
              { label: "Custom", dimensions: "Die-line to your dieline or applicator spec" },
            ],
            features: [
              { label: "Range", value: "Embossed Labels" },
              { label: "Reference art", value: "Custom Order - 500pcs 4cm Gold Stickers + 200pcs 24x35+4cm OPP Bags - Personalized Label & Packaging Set.jpg" },
              { label: "Formats", value: "Sheets, rolls, singles — die-cut to CAD" },
              { label: "Print", value: "CMYK, Pantone, specialty inks" },
              { label: "Min. order", value: "500 labels" },
              { label: "Lead time", value: "7–16 business days" },
            ],
            details: "Gallery paths mirror your on-disk references under Premium  Variation Pages/Embossed Labels.\n\nWe align adhesive, caliper, and finish to fulfilment and climate.\n\nBrands Face specs for DTC and retail programs.",
          },
        },
        {
          slug: "labels-foil-labels",
          tabId: "premium_variations",
          cardImage: "/assets/images/categories/Labels & Tags/Premium  Variation Pages/Foil Labels/495138157_122167639994361121_1775475973663713340_n.jpg",
          detailImages: [
                    "/assets/images/categories/Labels & Tags/Premium  Variation Pages/Foil Labels/495198708_122167640060361121_5788455271828361208_n.jpg",
                    "/assets/images/categories/Labels & Tags/Premium  Variation Pages/Foil Labels/Custom Self-adhesive Metal Aluminum Sticker Embossed Bottle Logo Wine Label - Buy Embossed Metal Sticker,Aluminum Sticker La.jpg",
                    "/assets/images/categories/Labels & Tags/Premium  Variation Pages/Foil Labels/Gold Foil Printing, Gold Custom Stickers, Any Shape Custom Stickers, Any Color Logo Labels, Custom Product Labels.jpg"
          ],
          heading: "Premium",
          title: "Foil Labels",
          subtitle: "Metallic foil and metalized accents — shelf pop and luxury cues.",
          pdp: {
            title: "Foil Labels",
            description: "Foil Labels — custom print, die-cut, and stock options matched to your applicator, climate, and retail plan.",
            badges: ["LABELS & TAGS", "BRAND READY", "BRANDS FACE STUDIO"],
            deals: [
              {
                title: "Applicator and unwind audit",
                description: "We confirm core size, rewind direction, and liner release before production.",
                code: "LABELRUN",
              },
              {
                title: "Proof pack — stock + finish",
                description: "Pilot varnish, foil, or emboss on your chosen stock before the full run.",
                code: "LABELPROOF",
              },
            ],
            sizes: [
              { label: "S", dimensions: "From 1 × 2 in — small labels / tags" },
              { label: "M", dimensions: "From 2 × 3 in — typical retail" },
              { label: "L", dimensions: "Oversize panels and wrap bands" },
              { label: "Custom", dimensions: "Die-line to your dieline or applicator spec" },
            ],
            features: [
              { label: "Range", value: "Foil Labels" },
              { label: "Reference art", value: "495138157_122167639994361121_1775475973663713340_n.jpg" },
              { label: "Formats", value: "Sheets, rolls, singles — die-cut to CAD" },
              { label: "Print", value: "CMYK, Pantone, specialty inks" },
              { label: "Min. order", value: "500 labels" },
              { label: "Lead time", value: "7–16 business days" },
            ],
            details: "Gallery paths mirror your on-disk references under Premium  Variation Pages/Foil Labels.\n\nWe align adhesive, caliper, and finish to fulfilment and climate.\n\nBrands Face specs for DTC and retail programs.",
          },
        },
        {
          slug: "labels-gloss-labels",
          tabId: "premium_variations",
          cardImage: "/assets/images/categories/Labels & Tags/Premium  Variation Pages/Gloss Labels/6e53f4c8213785dba72dd95fdb6c9f20.jpg",
          detailImages: [
                    "/assets/images/categories/Labels & Tags/Premium  Variation Pages/Gloss Labels/8b3a7e105f23dfa5d3a829fddbf5709d.jpg",
                    "/assets/images/categories/Labels & Tags/Premium  Variation Pages/Gloss Labels/c8ef7422b1bcb96265ddd6ba7c023cab.jpg",
                    "/assets/images/categories/Labels & Tags/Premium  Variation Pages/Gloss Labels/Pelekat Die-Cut Tersuai dalam Enam Bahan Premium untuk Kecemerlangan Jenama - Pilih Milik Anda Sekarang!.jpg"
          ],
          heading: "Premium",
          title: "Gloss Labels",
          subtitle: "High-gloss colour — saturated brand blocks.",
          pdp: {
            title: "Gloss Labels",
            description: "Gloss Labels — custom print, die-cut, and stock options matched to your applicator, climate, and retail plan.",
            badges: ["LABELS & TAGS", "BRAND READY", "BRANDS FACE STUDIO"],
            deals: [
              {
                title: "Applicator and unwind audit",
                description: "We confirm core size, rewind direction, and liner release before production.",
                code: "LABELRUN",
              },
              {
                title: "Proof pack — stock + finish",
                description: "Pilot varnish, foil, or emboss on your chosen stock before the full run.",
                code: "LABELPROOF",
              },
            ],
            sizes: [
              { label: "S", dimensions: "From 1 × 2 in — small labels / tags" },
              { label: "M", dimensions: "From 2 × 3 in — typical retail" },
              { label: "L", dimensions: "Oversize panels and wrap bands" },
              { label: "Custom", dimensions: "Die-line to your dieline or applicator spec" },
            ],
            features: [
              { label: "Range", value: "Gloss Labels" },
              { label: "Reference art", value: "6e53f4c8213785dba72dd95fdb6c9f20.jpg" },
              { label: "Formats", value: "Sheets, rolls, singles — die-cut to CAD" },
              { label: "Print", value: "CMYK, Pantone, specialty inks" },
              { label: "Min. order", value: "500 labels" },
              { label: "Lead time", value: "7–16 business days" },
            ],
            details: "Gallery paths mirror your on-disk references under Premium  Variation Pages/Gloss Labels.\n\nWe align adhesive, caliper, and finish to fulfilment and climate.\n\nBrands Face specs for DTC and retail programs.",
          },
        },
        {
          slug: "labels-kraft-tags",
          tabId: "premium_variations",
          cardImage: "/assets/images/categories/Labels & Tags/Premium  Variation Pages/Kraft Tags/Brush Script Handmade Your Logo Price.jpg",
          detailImages: [
                    "/assets/images/categories/Labels & Tags/Premium  Variation Pages/Kraft Tags/Etiquetas.jpg",
                    "/assets/images/categories/Labels & Tags/Premium  Variation Pages/Kraft Tags/Minimalist Brown Hang Tag Cards.jpg",
                    "/assets/images/categories/Labels & Tags/Premium  Variation Pages/Kraft Tags/Tag Kraft Redonda Com Furo E Cordão Rami _ Convites Convites De Casamento _ My Date Convites.jpg"
          ],
          heading: "Premium",
          title: "Kraft Tags",
          subtitle: "Natural kraft tags — artisan and sustainable tone.",
          pdp: {
            title: "Kraft Tags",
            description: "Kraft Tags — custom print, die-cut, and stock options matched to your applicator, climate, and retail plan.",
            badges: ["LABELS & TAGS", "BRAND READY", "BRANDS FACE STUDIO"],
            deals: [
              {
                title: "Applicator and unwind audit",
                description: "We confirm core size, rewind direction, and liner release before production.",
                code: "LABELRUN",
              },
              {
                title: "Proof pack — stock + finish",
                description: "Pilot varnish, foil, or emboss on your chosen stock before the full run.",
                code: "LABELPROOF",
              },
            ],
            sizes: [
              { label: "S", dimensions: "From 1 × 2 in — small labels / tags" },
              { label: "M", dimensions: "From 2 × 3 in — typical retail" },
              { label: "L", dimensions: "Oversize panels and wrap bands" },
              { label: "Custom", dimensions: "Die-line to your dieline or applicator spec" },
            ],
            features: [
              { label: "Range", value: "Kraft Tags" },
              { label: "Reference art", value: "Brush Script Handmade Your Logo Price.jpg" },
              { label: "Formats", value: "Sheets, rolls, singles — die-cut to CAD" },
              { label: "Print", value: "CMYK, Pantone, specialty inks" },
              { label: "Min. order", value: "250 pieces" },
              { label: "Lead time", value: "7–16 business days" },
            ],
            details: "Gallery paths mirror your on-disk references under Premium  Variation Pages/Kraft Tags.\n\nWe align adhesive, caliper, and finish to fulfilment and climate.\n\nBrands Face specs for DTC and retail programs.",
          },
        },
        {
          slug: "labels-matte-labels",
          tabId: "premium_variations",
          cardImage: "/assets/images/categories/Labels & Tags/Premium  Variation Pages/Matte Labels/Black & Silver Logo Business Order Thank You Label.jpg",
          detailImages: [
                    "/assets/images/categories/Labels & Tags/Premium  Variation Pages/Matte Labels/Candle Label Template Canva, Printable Modern Slim Candle Label Design, Vertical Candle Branding Labels, Custom Product Labe.jpg",
                    "/assets/images/categories/Labels & Tags/Premium  Variation Pages/Matte Labels/Custom Waterproof Private Candles Label Printing,Matte Gold Foil Sticker Label Printing For Candle Jars - Buy Candle Labels,.jpg",
                    "/assets/images/categories/Labels & Tags/Premium  Variation Pages/Matte Labels/Elegant Minimalist Black Business Appreciation Square Sticker.jpg"
          ],
          heading: "Premium",
          title: "Matte Labels",
          subtitle: "Soft matte fields — fingerprint-friendly premium.",
          pdp: {
            title: "Matte Labels",
            description: "Matte Labels — custom print, die-cut, and stock options matched to your applicator, climate, and retail plan.",
            badges: ["LABELS & TAGS", "BRAND READY", "BRANDS FACE STUDIO"],
            deals: [
              {
                title: "Applicator and unwind audit",
                description: "We confirm core size, rewind direction, and liner release before production.",
                code: "LABELRUN",
              },
              {
                title: "Proof pack — stock + finish",
                description: "Pilot varnish, foil, or emboss on your chosen stock before the full run.",
                code: "LABELPROOF",
              },
            ],
            sizes: [
              { label: "S", dimensions: "From 1 × 2 in — small labels / tags" },
              { label: "M", dimensions: "From 2 × 3 in — typical retail" },
              { label: "L", dimensions: "Oversize panels and wrap bands" },
              { label: "Custom", dimensions: "Die-line to your dieline or applicator spec" },
            ],
            features: [
              { label: "Range", value: "Matte Labels" },
              { label: "Reference art", value: "Black & Silver Logo Business Order Thank You Label.jpg" },
              { label: "Formats", value: "Sheets, rolls, singles — die-cut to CAD" },
              { label: "Print", value: "CMYK, Pantone, specialty inks" },
              { label: "Min. order", value: "500 labels" },
              { label: "Lead time", value: "7–16 business days" },
            ],
            details: "Gallery paths mirror your on-disk references under Premium  Variation Pages/Matte Labels.\n\nWe align adhesive, caliper, and finish to fulfilment and climate.\n\nBrands Face specs for DTC and retail programs.",
          },
        },
        {
          slug: "labels-textured-paper-tags",
          tabId: "premium_variations",
          cardImage: "/assets/images/categories/Labels & Tags/Premium  Variation Pages/Textured Paper Tags/500 Custom Wine Red Clothing Hang Tags Emboss geschenkanhnger Paper SwingTags Simple Tags Composed Hang Tags Burgundy Paper .jpg",
          detailImages: [
                    "/assets/images/categories/Labels & Tags/Premium  Variation Pages/Textured Paper Tags/500pcs Embossed Hang Tags Custom logo Clothing Tags, Hang Tags for Clothing, Custom Tags, Personalized Gift Tags, Simple Tag.jpg",
                    "/assets/images/categories/Labels & Tags/Premium  Variation Pages/Textured Paper Tags/Custom Embossed Hang Tags with Textured.jpg",
                    "/assets/images/categories/Labels & Tags/Premium  Variation Pages/Textured Paper Tags/download (5).jpg"
          ],
          heading: "Premium",
          title: "Textured Paper Tags",
          subtitle: "Textured stocks — depth without loud graphics.",
          pdp: {
            title: "Textured Paper Tags",
            description: "Textured Paper Tags — custom print, die-cut, and stock options matched to your applicator, climate, and retail plan.",
            badges: ["LABELS & TAGS", "BRAND READY", "BRANDS FACE STUDIO"],
            deals: [
              {
                title: "Applicator and unwind audit",
                description: "We confirm core size, rewind direction, and liner release before production.",
                code: "LABELRUN",
              },
              {
                title: "Proof pack — stock + finish",
                description: "Pilot varnish, foil, or emboss on your chosen stock before the full run.",
                code: "LABELPROOF",
              },
            ],
            sizes: [
              { label: "S", dimensions: "From 1 × 2 in — small labels / tags" },
              { label: "M", dimensions: "From 2 × 3 in — typical retail" },
              { label: "L", dimensions: "Oversize panels and wrap bands" },
              { label: "Custom", dimensions: "Die-line to your dieline or applicator spec" },
            ],
            features: [
              { label: "Range", value: "Textured Paper Tags" },
              { label: "Reference art", value: "500 Custom Wine Red Clothing Hang Tags Emboss geschenkanhnger Paper SwingTags Simple Tags Composed Hang Tags Burgundy Paper .jpg" },
              { label: "Formats", value: "Sheets, rolls, singles — die-cut to CAD" },
              { label: "Print", value: "CMYK, Pantone, specialty inks" },
              { label: "Min. order", value: "250 pieces" },
              { label: "Lead time", value: "7–16 business days" },
            ],
            details: "Gallery paths mirror your on-disk references under Premium  Variation Pages/Textured Paper Tags.\n\nWe align adhesive, caliper, and finish to fulfilment and climate.\n\nBrands Face specs for DTC and retail programs.",
          },
        },
        {
          slug: "labels-waterproof-labels",
          tabId: "premium_variations",
          cardImage: "/assets/images/categories/Labels & Tags/Premium  Variation Pages/Waterproof Labels/470219818_122145241928361121_6610032829724640635_n.jpg",
          detailImages: [
                    "/assets/images/categories/Labels & Tags/Premium  Variation Pages/Waterproof Labels/470597143_122145241796361121_3289846523323565967_n.jpg",
                    "/assets/images/categories/Labels & Tags/Premium  Variation Pages/Waterproof Labels/470675817_122145241868361121_7719441903545473439_n.jpg",
                    "/assets/images/categories/Labels & Tags/Premium  Variation Pages/Waterproof Labels/main pic.jpg"
          ],
          heading: "Premium",
          title: "Waterproof Labels",
          subtitle: "Water- and oil-resistant — bath, kitchen, and outdoor.",
          pdp: {
            title: "Waterproof Labels",
            description: "Waterproof Labels — custom print, die-cut, and stock options matched to your applicator, climate, and retail plan.",
            badges: ["LABELS & TAGS", "BRAND READY", "BRANDS FACE STUDIO"],
            deals: [
              {
                title: "Applicator and unwind audit",
                description: "We confirm core size, rewind direction, and liner release before production.",
                code: "LABELRUN",
              },
              {
                title: "Proof pack — stock + finish",
                description: "Pilot varnish, foil, or emboss on your chosen stock before the full run.",
                code: "LABELPROOF",
              },
            ],
            sizes: [
              { label: "S", dimensions: "From 1 × 2 in — small labels / tags" },
              { label: "M", dimensions: "From 2 × 3 in — typical retail" },
              { label: "L", dimensions: "Oversize panels and wrap bands" },
              { label: "Custom", dimensions: "Die-line to your dieline or applicator spec" },
            ],
            features: [
              { label: "Range", value: "Waterproof Labels" },
              { label: "Reference art", value: "470219818_122145241928361121_6610032829724640635_n.jpg" },
              { label: "Formats", value: "Sheets, rolls, singles — die-cut to CAD" },
              { label: "Print", value: "CMYK, Pantone, specialty inks" },
              { label: "Min. order", value: "500 labels" },
              { label: "Lead time", value: "7–16 business days" },
            ],
            details: "Gallery paths mirror your on-disk references under Premium  Variation Pages/Waterproof Labels.\n\nWe align adhesive, caliper, and finish to fulfilment and climate.\n\nBrands Face specs for DTC and retail programs.",
          },
        },
        {
          slug: "labels-beverage-labels",
          tabId: "use_case",
          cardImage: "/assets/images/categories/Labels & Tags/Use-Case Based Pages/Beverage Labels/Bottle design for miracle bone broth from scandinavia _ Product packaging contest.jpg",
          detailImages: [
                    "/assets/images/categories/Labels & Tags/Use-Case Based Pages/Beverage Labels/download (5).jpg",
                    "/assets/images/categories/Labels & Tags/Use-Case Based Pages/Beverage Labels/Editable Juice Bottle Label Template, Cold Press Labels, Beverage Bottle Stickers, Printable Labels.jpg",
                    "/assets/images/categories/Labels & Tags/Use-Case Based Pages/Beverage Labels/Top 10 Graphic Design Trends 2026 _ VistaPrint US.jpg"
          ],
          heading: "Use case",
          title: "Beverage Labels",
          subtitle: "Bottles and RTDs — nutrition panels and brand bands.",
          pdp: {
            title: "Beverage Labels",
            description: "Beverage Labels — custom print, die-cut, and stock options matched to your applicator, climate, and retail plan.",
            badges: ["LABELS & TAGS", "BRAND READY", "BRANDS FACE STUDIO"],
            deals: [
              {
                title: "Applicator and unwind audit",
                description: "We confirm core size, rewind direction, and liner release before production.",
                code: "LABELRUN",
              },
              {
                title: "Proof pack — stock + finish",
                description: "Pilot varnish, foil, or emboss on your chosen stock before the full run.",
                code: "LABELPROOF",
              },
            ],
            sizes: [
              { label: "S", dimensions: "From 1 × 2 in — small labels / tags" },
              { label: "M", dimensions: "From 2 × 3 in — typical retail" },
              { label: "L", dimensions: "Oversize panels and wrap bands" },
              { label: "Custom", dimensions: "Die-line to your dieline or applicator spec" },
            ],
            features: [
              { label: "Range", value: "Beverage Labels" },
              { label: "Reference art", value: "Bottle design for miracle bone broth from scandinavia _ Product packaging contest.jpg" },
              { label: "Formats", value: "Sheets, rolls, singles — die-cut to CAD" },
              { label: "Print", value: "CMYK, Pantone, specialty inks" },
              { label: "Min. order", value: "500 labels" },
              { label: "Lead time", value: "7–16 business days" },
            ],
            details: "Gallery paths mirror your on-disk references under Use-Case Based Pages/Beverage Labels.\n\nWe align adhesive, caliper, and finish to fulfilment and climate.\n\nBrands Face specs for DTC and retail programs.",
          },
        },
        {
          slug: "labels-candle-labels",
          tabId: "use_case",
          cardImage: "/assets/images/categories/Labels & Tags/Use-Case Based Pages/Candle Labels/Custom Candle Jars Luxury Candle Making Jars 5oz 8oz 10oz 12oz Unique Black Candle Jar Champagne Gold Empty - Buy Candle Jar.jpg",
          detailImages: [
                    "/assets/images/categories/Labels & Tags/Use-Case Based Pages/Candle Labels/Editable Candle Packaging Bundle, DIY Candle Label Template, Candle Care Card, Thank You Card Template, Box Sticker, Templet.jpg",
                    "/assets/images/categories/Labels & Tags/Use-Case Based Pages/Candle Labels/Elegant Minimal Kraft Candle Label.jpg",
                    "/assets/images/categories/Labels & Tags/Use-Case Based Pages/Candle Labels/Gold Foiled Candle Labeling Stickers Luxurious Stickers for Candle Packaging & Branding Real Foil Product Logo Label DIY Can.jpg"
          ],
          heading: "Use case",
          title: "Candle Labels",
          subtitle: "Jar candles — safety, scent, and burn copy.",
          pdp: {
            title: "Candle Labels",
            description: "Candle Labels — custom print, die-cut, and stock options matched to your applicator, climate, and retail plan.",
            badges: ["LABELS & TAGS", "BRAND READY", "BRANDS FACE STUDIO"],
            deals: [
              {
                title: "Applicator and unwind audit",
                description: "We confirm core size, rewind direction, and liner release before production.",
                code: "LABELRUN",
              },
              {
                title: "Proof pack — stock + finish",
                description: "Pilot varnish, foil, or emboss on your chosen stock before the full run.",
                code: "LABELPROOF",
              },
            ],
            sizes: [
              { label: "S", dimensions: "From 1 × 2 in — small labels / tags" },
              { label: "M", dimensions: "From 2 × 3 in — typical retail" },
              { label: "L", dimensions: "Oversize panels and wrap bands" },
              { label: "Custom", dimensions: "Die-line to your dieline or applicator spec" },
            ],
            features: [
              { label: "Range", value: "Candle Labels" },
              { label: "Reference art", value: "Custom Candle Jars Luxury Candle Making Jars 5oz 8oz 10oz 12oz Unique Black Candle Jar Champagne Gold Empty - Buy Candle Jar.jpg" },
              { label: "Formats", value: "Sheets, rolls, singles — die-cut to CAD" },
              { label: "Print", value: "CMYK, Pantone, specialty inks" },
              { label: "Min. order", value: "500 labels" },
              { label: "Lead time", value: "7–16 business days" },
            ],
            details: "Gallery paths mirror your on-disk references under Use-Case Based Pages/Candle Labels.\n\nWe align adhesive, caliper, and finish to fulfilment and climate.\n\nBrands Face specs for DTC and retail programs.",
          },
        },
        {
          slug: "labels-cosmetic-labels",
          tabId: "use_case",
          cardImage: "/assets/images/categories/Labels & Tags/Use-Case Based Pages/Cosmetic Labels/Shop today and .jpg",
          detailImages: [
                    "/assets/images/categories/Labels & Tags/Use-Case Based Pages/Cosmetic Labels/BrandStickers.jpg",
                    "/assets/images/categories/Labels & Tags/Use-Case Based Pages/Cosmetic Labels/Black & Gold Floral 4 OZ Cosmetic Bottle Label (Featuring a floral design in.jpg",
                    "/assets/images/categories/Labels & Tags/Use-Case Based Pages/Cosmetic Labels/Neutral Sage Green 2 OZ Dropper Bottle Wrap Label.jpg"
          ],
          heading: "Use case",
          title: "Cosmetic Labels",
          subtitle: "Colour cosmetics — scuff-aware finishes and panels.",
          pdp: {
            title: "Cosmetic Labels",
            description: "Cosmetic Labels — custom print, die-cut, and stock options matched to your applicator, climate, and retail plan.",
            badges: ["LABELS & TAGS", "BRAND READY", "BRANDS FACE STUDIO"],
            deals: [
              {
                title: "Applicator and unwind audit",
                description: "We confirm core size, rewind direction, and liner release before production.",
                code: "LABELRUN",
              },
              {
                title: "Proof pack — stock + finish",
                description: "Pilot varnish, foil, or emboss on your chosen stock before the full run.",
                code: "LABELPROOF",
              },
            ],
            sizes: [
              { label: "S", dimensions: "From 1 × 2 in — small labels / tags" },
              { label: "M", dimensions: "From 2 × 3 in — typical retail" },
              { label: "L", dimensions: "Oversize panels and wrap bands" },
              { label: "Custom", dimensions: "Die-line to your dieline or applicator spec" },
            ],
            features: [
              { label: "Range", value: "Cosmetic Labels" },
              { label: "Reference art", value: "🎁 Custom Stickers for Your Business – 20% OFF!_Boost your brand with custom stickers at a discounted price!_Shop today and .jpg" },
              { label: "Formats", value: "Sheets, rolls, singles — die-cut to CAD" },
              { label: "Print", value: "CMYK, Pantone, specialty inks" },
              { label: "Min. order", value: "500 labels" },
              { label: "Lead time", value: "7–16 business days" },
            ],
            details: "Gallery paths mirror your on-disk references under Use-Case Based Pages/Cosmetic Labels.\n\nWe align adhesive, caliper, and finish to fulfilment and climate.\n\nBrands Face specs for DTC and retail programs.",
          },
        },
        {
          slug: "labels-food-labels",
          tabId: "use_case",
          cardImage: "/assets/images/categories/Labels & Tags/Use-Case Based Pages/Food Labels/1 new message.jpg",
          detailImages: [
                    "/assets/images/categories/Labels & Tags/Use-Case Based Pages/Food Labels/230 Black Spice Labels by ThreeKin _ Waterproof & Oil-Resistant Pre-Printed Stickers for Spice Jars _ Durable, BPA-Free Seas.jpg",
                    "/assets/images/categories/Labels & Tags/Use-Case Based Pages/Food Labels/Branding • Instagram.jpg",
                    "/assets/images/categories/Labels & Tags/Use-Case Based Pages/Food Labels/Cottage Law Labels Template, Food License Label for Home Bakery Product_ Editable Cookie Ingredient List with Allergen Label.jpg"
          ],
          heading: "Use case",
          title: "Food Labels",
          subtitle: "Pantry and specialty food — ingredients and compliance space.",
          pdp: {
            title: "Food Labels",
            description: "Food Labels — custom print, die-cut, and stock options matched to your applicator, climate, and retail plan.",
            badges: ["LABELS & TAGS", "BRAND READY", "BRANDS FACE STUDIO"],
            deals: [
              {
                title: "Applicator and unwind audit",
                description: "We confirm core size, rewind direction, and liner release before production.",
                code: "LABELRUN",
              },
              {
                title: "Proof pack — stock + finish",
                description: "Pilot varnish, foil, or emboss on your chosen stock before the full run.",
                code: "LABELPROOF",
              },
            ],
            sizes: [
              { label: "S", dimensions: "From 1 × 2 in — small labels / tags" },
              { label: "M", dimensions: "From 2 × 3 in — typical retail" },
              { label: "L", dimensions: "Oversize panels and wrap bands" },
              { label: "Custom", dimensions: "Die-line to your dieline or applicator spec" },
            ],
            features: [
              { label: "Range", value: "Food Labels" },
              { label: "Reference art", value: "1 new message.jpg" },
              { label: "Formats", value: "Sheets, rolls, singles — die-cut to CAD" },
              { label: "Print", value: "CMYK, Pantone, specialty inks" },
              { label: "Min. order", value: "500 labels" },
              { label: "Lead time", value: "7–16 business days" },
            ],
            details: "Gallery paths mirror your on-disk references under Use-Case Based Pages/Food Labels.\n\nWe align adhesive, caliper, and finish to fulfilment and climate.\n\nBrands Face specs for DTC and retail programs.",
          },
        },
        {
          slug: "labels-hair-care-labels",
          tabId: "use_case",
          cardImage: "/assets/images/categories/Labels & Tags/Use-Case Based Pages/Hair Care Labels/Black and Gold Hair Conditioner Jar Label _ Zazzle.jpg",
          detailImages: [
                    "/assets/images/categories/Labels & Tags/Use-Case Based Pages/Hair Care Labels/Screenshot 2026-04-03 104943.jpg",
                    "/assets/images/categories/Labels & Tags/Use-Case Based Pages/Hair Care Labels/Want to design a label that actually sells__Here’s the step-by-step anatomy every designer should know__Save this for your n.jpg",
                    "/assets/images/categories/Labels & Tags/Use-Case Based Pages/Hair Care Labels/Zazzle_com Sign in.jpg"
          ],
          heading: "Use case",
          title: "Hair Care Labels",
          subtitle: "Tubs and pumps — regimen and salon-grade graphics.",
          pdp: {
            title: "Hair Care Labels",
            description: "Hair Care Labels — custom print, die-cut, and stock options matched to your applicator, climate, and retail plan.",
            badges: ["LABELS & TAGS", "BRAND READY", "BRANDS FACE STUDIO"],
            deals: [
              {
                title: "Applicator and unwind audit",
                description: "We confirm core size, rewind direction, and liner release before production.",
                code: "LABELRUN",
              },
              {
                title: "Proof pack — stock + finish",
                description: "Pilot varnish, foil, or emboss on your chosen stock before the full run.",
                code: "LABELPROOF",
              },
            ],
            sizes: [
              { label: "S", dimensions: "From 1 × 2 in — small labels / tags" },
              { label: "M", dimensions: "From 2 × 3 in — typical retail" },
              { label: "L", dimensions: "Oversize panels and wrap bands" },
              { label: "Custom", dimensions: "Die-line to your dieline or applicator spec" },
            ],
            features: [
              { label: "Range", value: "Hair Care Labels" },
              { label: "Reference art", value: "Black and Gold Hair Conditioner Jar Label _ Zazzle.jpg" },
              { label: "Formats", value: "Sheets, rolls, singles — die-cut to CAD" },
              { label: "Print", value: "CMYK, Pantone, specialty inks" },
              { label: "Min. order", value: "500 labels" },
              { label: "Lead time", value: "7–16 business days" },
            ],
            details: "Gallery paths mirror your on-disk references under Use-Case Based Pages/Hair Care Labels.\n\nWe align adhesive, caliper, and finish to fulfilment and climate.\n\nBrands Face specs for DTC and retail programs.",
          },
        },
        {
          slug: "labels-luxury-brand-tags",
          tabId: "use_case",
          cardImage: "/assets/images/categories/Labels & Tags/Use-Case Based Pages/Luxury Brand Tags/Creative and Unique Business Card Design Ideas.jpg",
          detailImages: [
                    "/assets/images/categories/Labels & Tags/Use-Case Based Pages/Luxury Brand Tags/download (5).jpg",
                    "/assets/images/categories/Labels & Tags/Use-Case Based Pages/Luxury Brand Tags/High Quality Custom Luxury Garment Swing Tags Clothes Label Print Name Logo Plastic Hang Tag With String Paper Hangtags - Bu.jpg",
                    "/assets/images/categories/Labels & Tags/Use-Case Based Pages/Luxury Brand Tags/Paper Bag Official Store - Amazing products with exclusive discounts on AliExpress.jpg"
          ],
          heading: "Use case",
          title: "Luxury Brand Tags",
          subtitle: "High-end swing tags — logo-forward boutique presence.",
          pdp: {
            title: "Luxury Brand Tags",
            description: "Luxury Brand Tags — custom print, die-cut, and stock options matched to your applicator, climate, and retail plan.",
            badges: ["LABELS & TAGS", "BRAND READY", "BRANDS FACE STUDIO"],
            deals: [
              {
                title: "Applicator and unwind audit",
                description: "We confirm core size, rewind direction, and liner release before production.",
                code: "LABELRUN",
              },
              {
                title: "Proof pack — stock + finish",
                description: "Pilot varnish, foil, or emboss on your chosen stock before the full run.",
                code: "LABELPROOF",
              },
            ],
            sizes: [
              { label: "S", dimensions: "From 1 × 2 in — small labels / tags" },
              { label: "M", dimensions: "From 2 × 3 in — typical retail" },
              { label: "L", dimensions: "Oversize panels and wrap bands" },
              { label: "Custom", dimensions: "Die-line to your dieline or applicator spec" },
            ],
            features: [
              { label: "Range", value: "Luxury Brand Tags" },
              { label: "Reference art", value: "Creative and Unique Business Card Design Ideas.jpg" },
              { label: "Formats", value: "Sheets, rolls, singles — die-cut to CAD" },
              { label: "Print", value: "CMYK, Pantone, specialty inks" },
              { label: "Min. order", value: "250 pieces" },
              { label: "Lead time", value: "7–16 business days" },
            ],
            details: "Gallery paths mirror your on-disk references under Use-Case Based Pages/Luxury Brand Tags.\n\nWe align adhesive, caliper, and finish to fulfilment and climate.\n\nBrands Face specs for DTC and retail programs.",
          },
        },
        {
          slug: "labels-perfume-labels",
          tabId: "use_case",
          cardImage: "/assets/images/categories/Labels & Tags/Use-Case Based Pages/Perfume Labels/graphic label.jpg",
          detailImages: [
                    "/assets/images/categories/Labels & Tags/Use-Case Based Pages/Perfume Labels/Luxury Perfume Bottle Labels, Perfume Label Template, Etiquette Parfum, Custom Perfume Label Design, Editable Cologne Labels.jpg",
                    "/assets/images/categories/Labels & Tags/Use-Case Based Pages/Perfume Labels/Screenshot 2026-04-03 104511.jpg",
                    "/assets/images/categories/Labels & Tags/Use-Case Based Pages/Perfume Labels/private label.gif"

          ],
          heading: "Use case",
          title: "Perfume Labels",
          subtitle: "Fragrance bottles — registration-tight typography.",
          pdp: {
            title: "Perfume Labels",
            description: "Perfume Labels — custom print, die-cut, and stock options matched to your applicator, climate, and retail plan.",
            badges: ["LABELS & TAGS", "BRAND READY", "BRANDS FACE STUDIO"],
            deals: [
              {
                title: "Applicator and unwind audit",
                description: "We confirm core size, rewind direction, and liner release before production.",
                code: "LABELRUN",
              },
              {
                title: "Proof pack — stock + finish",
                description: "Pilot varnish, foil, or emboss on your chosen stock before the full run.",
                code: "LABELPROOF",
              },
            ],
            sizes: [
              { label: "S", dimensions: "From 1 × 2 in — small labels / tags" },
              { label: "M", dimensions: "From 2 × 3 in — typical retail" },
              { label: "L", dimensions: "Oversize panels and wrap bands" },
              { label: "Custom", dimensions: "Die-line to your dieline or applicator spec" },
            ],
            features: [
              { label: "Range", value: "Perfume Labels" },
              { label: "Reference art", value: "#graphic _#label _#labeldesign _#perfumebranded _#everyone _#highlighted.jpg" },
              { label: "Formats", value: "Sheets, rolls, singles — die-cut to CAD" },
              { label: "Print", value: "CMYK, Pantone, specialty inks" },
              { label: "Min. order", value: "500 labels" },
              { label: "Lead time", value: "7–16 business days" },
            ],
            details: "Gallery paths mirror your on-disk references under Use-Case Based Pages/Perfume Labels.\n\nWe align adhesive, caliper, and finish to fulfilment and climate.\n\nBrands Face specs for DTC and retail programs.",
          },
        },
        {
          slug: "labels-retail-tags",
          tabId: "use_case",
          cardImage: "/assets/images/categories/Labels & Tags/Use-Case Based Pages/Retail Tags/Business Logo Hang Tag Price Clothing Swing Tags  Ornament Card _ Zazzle.jpg",
          detailImages: [
                    "/assets/images/categories/Labels & Tags/Use-Case Based Pages/Retail Tags/EMELIA Green Hang Tags Clothing Label Price Tag _ Zazzle.jpg",
                    "/assets/images/categories/Labels & Tags/Use-Case Based Pages/Retail Tags/gift sticker labels 1 Pin on BABY SHOWER.jpg",
                    "/assets/images/categories/Labels & Tags/Use-Case Based Pages/Retail Tags/Minimalist Black & White Clothing Labels Hang Tag.jpg"
          ],
          heading: "Use case",
          title: "Retail Tags",
          subtitle: "Clothing and gift retail — price, logo, and occasion tags.",
          pdp: {
            title: "Retail Tags",
            description: "Retail Tags — custom print, die-cut, and stock options matched to your applicator, climate, and retail plan.",
            badges: ["LABELS & TAGS", "BRAND READY", "BRANDS FACE STUDIO"],
            deals: [
              {
                title: "Applicator and unwind audit",
                description: "We confirm core size, rewind direction, and liner release before production.",
                code: "LABELRUN",
              },
              {
                title: "Proof pack — stock + finish",
                description: "Pilot varnish, foil, or emboss on your chosen stock before the full run.",
                code: "LABELPROOF",
              },
            ],
            sizes: [
              { label: "S", dimensions: "From 1 × 2 in — small labels / tags" },
              { label: "M", dimensions: "From 2 × 3 in — typical retail" },
              { label: "L", dimensions: "Oversize panels and wrap bands" },
              { label: "Custom", dimensions: "Die-line to your dieline or applicator spec" },
            ],
            features: [
              { label: "Range", value: "Retail Tags" },
              { label: "Reference art", value: "Business Logo Hang Tag Price Clothing Swing Tags  Ornament Card _ Zazzle.jpg" },
              { label: "Formats", value: "Sheets, rolls, singles — die-cut to CAD" },
              { label: "Print", value: "CMYK, Pantone, specialty inks" },
              { label: "Min. order", value: "250 pieces" },
              { label: "Lead time", value: "7–16 business days" },
            ],
            details: "Gallery paths mirror your on-disk references under Use-Case Based Pages/Retail Tags.\n\nWe align adhesive, caliper, and finish to fulfilment and climate.\n\nBrands Face specs for DTC and retail programs.",
          },
        },
        {
          slug: "labels-skincare-labels",
          tabId: "use_case",
          cardImage: "/assets/images/categories/Labels & Tags/Use-Case Based Pages/Skincare Labels/All Products - ONOXA.jpg",
          detailImages: [
                    "/assets/images/categories/Labels & Tags/Use-Case Based Pages/Skincare Labels/Cosmetic Product Label Skincare Magnolia Sticker.jpg",
                    "/assets/images/categories/Labels & Tags/Use-Case Based Pages/Skincare Labels/Elegant Black Gold Logo Cosmetic Jar Wrapper Label.jpg",
                    "/assets/images/categories/Labels & Tags/Use-Case Based Pages/Skincare Labels/Trendy Holographic Serum 2 OZ Dropper Bottle Label (Creator Uploaded).jpg"
          ],
          heading: "Use case",
          title: "Skincare Labels",
          subtitle: "Serums and creams — INCI and claims hierarchy.",
          pdp: {
            title: "Skincare Labels",
            description: "Skincare Labels — custom print, die-cut, and stock options matched to your applicator, climate, and retail plan.",
            badges: ["LABELS & TAGS", "BRAND READY", "BRANDS FACE STUDIO"],
            deals: [
              {
                title: "Applicator and unwind audit",
                description: "We confirm core size, rewind direction, and liner release before production.",
                code: "LABELRUN",
              },
              {
                title: "Proof pack — stock + finish",
                description: "Pilot varnish, foil, or emboss on your chosen stock before the full run.",
                code: "LABELPROOF",
              },
            ],
            sizes: [
              { label: "S", dimensions: "From 1 × 2 in — small labels / tags" },
              { label: "M", dimensions: "From 2 × 3 in — typical retail" },
              { label: "L", dimensions: "Oversize panels and wrap bands" },
              { label: "Custom", dimensions: "Die-line to your dieline or applicator spec" },
            ],
            features: [
              { label: "Range", value: "Skincare Labels" },
              { label: "Reference art", value: "All Products - ONOXA.jpg" },
              { label: "Formats", value: "Sheets, rolls, singles — die-cut to CAD" },
              { label: "Print", value: "CMYK, Pantone, specialty inks" },
              { label: "Min. order", value: "500 labels" },
              { label: "Lead time", value: "7–16 business days" },
            ],
            details: "Gallery paths mirror your on-disk references under Use-Case Based Pages/Skincare Labels.\n\nWe align adhesive, caliper, and finish to fulfilment and climate.\n\nBrands Face specs for DTC and retail programs.",
          },
        },
        {
          slug: "labels-soap-labels",
          tabId: "use_case",
          cardImage: "/assets/images/categories/Labels & Tags/Use-Case Based Pages/Soap Labels/Editable Soap Label Template _ Printable Soap Belly Band Wrap _ Handmade Soap Packaging _ Canva Label Template Stickers Prin.jpg",
          detailImages: [
                    "/assets/images/categories/Labels & Tags/Use-Case Based Pages/Soap Labels/Modern Product Cosmetic Soap Label _ Zazzle.jpg",
                    "/assets/images/categories/Labels & Tags/Use-Case Based Pages/Soap Labels/Soap Hang Tag Label Packaging Design.jpg",
                    "/assets/images/categories/Labels & Tags/Use-Case Based Pages/Soap Labels/Soap logo template _ Free Vector.jpg"
          ],
          heading: "Use case",
          title: "Soap Labels",
          subtitle: "Bars and belly bands — handmade and ingredient storytelling.",
          pdp: {
            title: "Soap Labels",
            description: "Soap Labels — custom print, die-cut, and stock options matched to your applicator, climate, and retail plan.",
            badges: ["LABELS & TAGS", "BRAND READY", "BRANDS FACE STUDIO"],
            deals: [
              {
                title: "Applicator and unwind audit",
                description: "We confirm core size, rewind direction, and liner release before production.",
                code: "LABELRUN",
              },
              {
                title: "Proof pack — stock + finish",
                description: "Pilot varnish, foil, or emboss on your chosen stock before the full run.",
                code: "LABELPROOF",
              },
            ],
            sizes: [
              { label: "S", dimensions: "From 1 × 2 in — small labels / tags" },
              { label: "M", dimensions: "From 2 × 3 in — typical retail" },
              { label: "L", dimensions: "Oversize panels and wrap bands" },
              { label: "Custom", dimensions: "Die-line to your dieline or applicator spec" },
            ],
            features: [
              { label: "Range", value: "Soap Labels" },
              { label: "Reference art", value: "Editable Soap Label Template _ Printable Soap Belly Band Wrap _ Handmade Soap Packaging _ Canva Label Template Stickers Prin.jpg" },
              { label: "Formats", value: "Sheets, rolls, singles — die-cut to CAD" },
              { label: "Print", value: "CMYK, Pantone, specialty inks" },
              { label: "Min. order", value: "500 labels" },
              { label: "Lead time", value: "7–16 business days" },
            ],
            details: "Gallery paths mirror your on-disk references under Use-Case Based Pages/Soap Labels.\n\nWe align adhesive, caliper, and finish to fulfilment and climate.\n\nBrands Face specs for DTC and retail programs.",
          },
        },
      ],
    },

  ];

/** Shared product-level FAQs (applied to every teaser unless `faqs` is set on that product). */
const PRODUCT_FAQ_STANDARD: CategoryFaqItem[] = [
  {
    question: "What is the typical minimum order quantity?",
    answer:
      "MOQs depend on board, print, and finishing. Your product card reflects a common starting quantity; we can often adjust for samples, pilots, or split shipments — ask for a quote.",
  },
  {
    question: "How long does production take?",
    answer:
      "Timing varies by proof cycles, tooling, and lane. A typical range is shown on the product; we lock dates after artwork approval and deposit.",
  },
  {
    question: "Can I customise size, print, and finish?",
    answer:
      "Yes. Share dimensions, artwork, and the unboxing story you want — we align structure, materials, and finishes (foil, emboss, soft-touch, etc.) to your brand.",
  },
];

/** Category hub FAQs — merged onto each block by `category` key when the raw entry has no `faqs`. */
const CATEGORY_FAQ_DEFAULTS: Record<string, CategoryFaqItem[]> = {
  art_card: [
    {
      question: "What is an art card folding carton?",
      answer:
        "Art card cartons are paperboard boxes — tuck ends, lock bottoms, sleeves, and more — ideal for retail, subscriptions, and light-to-medium weight products.",
    },
    {
      question: "Do you match brand colours and proofs?",
      answer:
        "We work from your brand guidelines, supply chain proofs, and dielines so colour, registration, and scores match what you expect on shelf and in the mail stream.",
    },
    {
      question: "Are sustainable stocks available?",
      answer:
        "Yes. We can specify recycled content, FSC-aligned papers, and finishes that suit your sustainability story — tell us your targets and region.",
    },
  ],
  rigid_boxes: [
    {
      question: "What makes rigid boxes different from folding cartons?",
      answer:
        "Rigid boxes use thicker wrapped board for a premium feel — magnetic closures, drawers, lift-off lids, and inserts are common for luxury and gift programmes.",
    },
    {
      question: "Can you engineer inserts for my product?",
      answer:
        "We design foam, paper, and fabric inserts to cradle your SKU, control movement, and elevate unboxing — share product CAD or samples when you quote.",
    },
    {
      question: "What lead times should I plan for?",
      answer:
        "Rigid runs usually need more time for wrapping, tooling, and QC. Your product page lists a typical window; rush options may be available by lane.",
    },
  ],
  corrugated_boxes: [
    {
      question: "Which flute and board grades do you offer?",
      answer:
        "We match E/B/C flutes and kraft or white liners to stacking strength, print, and cost — e-commerce shippers, retail trays, and heavy-duty formats.",
    },
    {
      question: "Can corrugated be printed inside and out?",
      answer:
        "Yes — flexo and litho options depending on run length and artwork. We help you pick the best print method for your brand and budget.",
    },
    {
      question: "Do you design for parcel and fulfilment?",
      answer:
        "We optimise dimensions for DIM weight, void fill, and damage rates so your shipper survives the last mile.",
    },
  ],
  custom_pouches: [
    {
      question: "Which barrier films do you support?",
      answer:
        "We specify films for moisture, oxygen, and shelf life goals — matte, gloss, metallised, and recyclable options where the application allows.",
    },
    {
      question: "Can pouches include zippers, valves, or spouts?",
      answer:
        "Yes. Tell us your fill process, retail requirements, and consumer use case — we’ll recommend workable features and seal zones.",
    },
    {
      question: "What artwork formats do you need?",
      answer:
        "Vector dielines plus layered artwork; we provide templates and review safe zones, barcodes, and nutrition panels when applicable.",
    },
  ],
  carry_bags: [
    {
      question: "What handle and paper options exist?",
      answer:
        "Twisted, flat, or ribbon handles; kraft, coated, and laminated stocks — we balance load, hand-feel, and print for retail and events.",
    },
    {
      question: "Can bags match our exact brand colours?",
      answer:
        "We match Pantone and brand systems with print proofs so bags align with your packaging family.",
    },
    {
      question: "What minimums apply to custom bags?",
      answer:
        "MOQs vary by size, print, and lamination. Use the product listing as a guide and request a quote for your artwork and quantity.",
    },
  ],
  kraft_boxes: [
    {
      question: "When should I choose kraft board?",
      answer:
        "Kraft suits natural, artisan, and e-commerce aesthetics — great with one- or two-colour print and recyclable positioning.",
    },
    {
      question: "Can kraft still look premium?",
      answer:
        "Yes — through structure, black or white ink, subtle foils, and uncoated textures that read authentic on shelf.",
    },
    {
      question: "Do you ship flat or assembled?",
      answer:
        "Most mailers and cartons ship flat to save freight; we’ll confirm assembly needs for speciality formats.",
    },
  ],
  labels_tags: [
    {
      question: "Roll or sheet labels — which do I need?",
      answer:
        "Rolls for applicators and high volume; sheets for short runs and hand apply. We align core size, unwind, and adhesive to your line.",
    },
    {
      question: "What finishes are available?",
      answer:
        "Matte, gloss, soft-touch, foil, emboss, and variable data — we match durability to product surface and climate.",
    },
    {
      question: "Can you match regulatory and barcode requirements?",
      answer:
        "We review legibility, contrast, and placement for retail and regulated categories before production.",
    },
  ],
};

function attachCatalogDefaults(raw: CategoryPageConfig[]): CategoryPageConfig[] {
  return raw.map((c) => ({
    ...c,
    faqs: c.faqs?.length ? c.faqs : CATEGORY_FAQ_DEFAULTS[c.category] ?? [],
    products: c.products.map((p) => ({
      ...p,
      faqs: p.faqs?.length ? p.faqs : PRODUCT_FAQ_STANDARD,
      detailBlocks:
        p.detailBlocks && p.detailBlocks.length > 0
          ? p.detailBlocks
          : buildProductDetailBlocksForTeaser({
              slug: p.slug,
              title: p.title,
              subtitle: p.subtitle,
              heading: p.heading,
              category: c.category,
            }),
    })),
  }));
}

export const CATEGORY_PAGE_CONFIG: CategoryPageConfig[] = attachCatalogDefaults(_CATEGORY_PAGE_CONFIG_RAW);
