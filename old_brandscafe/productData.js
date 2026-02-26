const productData = {
    "Rigid Boxes": {
        image: "Rigid-Popup.png",
        desc: "The pinnacle of luxury packaging.\nA solid, non-collapsible structure perfect for high-end branding.",
        overview: "Rigid boxes provide maximum protection and a premium feel. Often used for electronics, jewelry, and luxury gift sets.",
        link: "products/rigid-boxes.html"
    },
    "Magnetic Snap Box": {
        image: "magnetic.png",
        desc: "Features a concealed magnetic closure for a satisfying 'click'.\nElegant and reusable, making it a favorite for influencer kits.",
        overview: "The magnetic flap provides a high-end unboxing experience and keeps products secure without extra ribbons.",
        link: "products/rigid-boxes/magnetic-snap-box.html"
    },
    "Lid & Base Box": {
        image: "Lid-base.png",
        desc: "A classic two-piece design where the lid covers the base.\nSimple, sturdy, and iconic for premium footwear and stationery.",
        overview: "Also known as a telescope box, this design is timeless and offers great structural integrity.",
        link: "products/rigid-boxes/lid-and-base-box.html"
    },
    "Drawer Style Box": {
        image: "drawer.png",
        desc: "A sliding mechanism that mimics a premium drawer.\nPerfect for watches, jewelry, and luxury skincare bottles.",
        overview: "The 'matchbox' style sliding action adds a layer of mystery and modern luxury to your packaging.",
        link: "products/rigid-boxes/drawer-style-box.html"
    },
    "Book Style Box": {
        image: "book.png",
        desc: "Opens like a hardcover book with a spine.\nIdeal for high-end tech, cosmetics, and limited edition sets.",
        overview: "The book-style opening provides a large 'canvas' on the inside lid for brand storytelling.",
        link: "products/rigid-boxes/book-style-box.html"
    },
    "Shoulder & Neck Box": {
        image: "shoulder-Neck.png",
        desc: "Features a visible inner 'neck' that separates the lid and base.\nCreates a beautiful color-contrast opportunity for luxury perfumes.",
        overview: "The shoulder adds extra height and a unique architectural look to the packaging.",
        link: "products/rigid-boxes/shoulder-and-neck-box.html"
    },
    "Collapsible Rigid Box": {
        image: "collapsible.png",
        desc: "Rigid luxury that folds flat for easy storage and shipping.\nCombines high-end feel with logistical efficiency.",
        overview: "Uses hidden magnets and adhesive strips to assemble into a solid rigid box in seconds.",
        link: "products/rigid-boxes/collapsible-rigid-box.html"
    },
    "Circular Rigid Tube": {
        image: "tube.png",
        desc: "A cylindrical structure for a unique shelf presence.\nBest for luxury wines, perfumes, and premium candles.",
        overview: "Circular tubes offer a distinctive shape that stands out from standard square packaging.",
        link: "products/rigid-boxes/circular-rigid-tube.html"
    },
    "Hexagonal Rigid Box": {
        image: "hexagonal.png",
        desc: "A 6-sided geometric design for a modern edge.\nExcellent for high-end confectionery and geometric-shaped products.",
        overview: "The hexagonal shape provides 360-degree branding opportunities and a very unique look.",
        link: "products/rigid-boxes/hexagonal-rigid-box.html"
    },
    "Custom Rigid Box": {
        image: "Custom Rigid.png",
        desc: "Let's create something unique, your idea our execution!",
        overview: "Brands Face not only gives you variety of box options but also accepts challenge to customize design of your choice, so bring any idea and we bring it to life.",
        link: "products/rigid-boxes/custom-rigid-box.html"
    },
    "Corrugated": {
        image: "corrugated-main.png",
        desc: "Versatile, strong, and 100% recyclable packaging.",
        overview: "From simple shipping boxes to high-end printed retail displays, corrugated material offers the perfect balance of protection and branding.",
        link: "products/corrugated-boxes.html"
    },
    "Full-Color Mailer Box": {
        image: "printed-mailer.png",
        desc: "High-definition digital printing on every surface.",
        overview: "The gold standard for D2C brands. We can print your brand colors inside and out, creating an unforgettable unboxing moment.",
        link: "products/corrugated-boxes/full-color-mailer-box.html"
    },
    "Litho-Laminated Luxury Box": {
        image: "litho-box.png",
        desc: "The ultimate blend of strength and premium finish.",
        overview: "We print your design on high-quality art paper first, then 'laminate' it onto corrugated board. This allows for foil stamping and magazine-quality graphics.",
        link: "products/corrugated-boxes/litho-laminated-luxury-box.html"
    },
    "Retail-Ready Packaging (RRP)": {
        image: "rrp-box.png",
        desc: "Boxes that go straight from the shipping truck to the shelf.",
        overview: "Designed with perforated 'tear-away' sections. The top comes off to reveal a neatly organized retail display.",
        link: "products/corrugated-boxes/retail-ready-packaging-rrp.html"
    },
    "Standard Shipping Box (RSC)": {
        image: "rsc-shipping.png",
        desc: "The industry standard for secure, low-cost transport.",
        overview: "Regular Slotted Containers (RSC) are the most common box style. All flaps are the same length, meeting in the center for easy sealing.",
        link: "products/corrugated-boxes/standard-shipping-box-rsc.html"
    },
    "Front Tuck Mailer": {
        image: "front-tuck.png",
        desc: "A sleek, self-locking box that requires no tape.",
        overview: "Features side flaps that lock into the front of the box. Ideal for retail-ready subscription boxes and gift kits.",
        link: "products/corrugated-boxes/front-tuck-mailer.html"
    },
    "Pizza & Food Box": {
        image: "food-corrugated.png",
        desc: "Grease-resistant and heat-insulated food containers.",
        overview: "Typically made from B-flute or E-flute material to keep food hot and prevent the box from becoming soggy.",
        link: "products/corrugated-boxes/pizza-and-food-box.html"
    },
    "Subscription Box": {
        image: "subscription.png",
        desc: "Tailored packaging designed for the ultimate unboxing.",
        overview: "A premium mailer box often featuring custom inserts (dividers) to keep specific products safe and beautifully presented.",
        link: "products/corrugated-boxes/subscription-box.html"
    },
    "Display Floor Stand": {
        image: "floor-display.png",
        desc: "Large-scale retail structures that drive massive sales.",
        overview: "Life-sized corrugated displays fully branded and engineered to hold the weight of dozens of products on store floors.",
        link: "products/corrugated-boxes/display-floor-stand.html"
    },
    "Counter Display Unit (CDU)": {
        image: "cdu-display.png",
        desc: "Small footprint, big impact for impulse buys.",
        overview: "Custom-printed corrugated units designed to sit next to cash registers. Perfect for small accessories or snacks.",
        link: "products/corrugated-boxes/counter-display-unit-cdu.html"
    },
    "Double Wall Heavy Duty": {
        image: "double-wall.png",
        desc: "Extra-strength protection for heavy or fragile items.",
        overview: "Features two layers of fluting (A+B or B+C) for maximum stacking strength. Best for industrial parts and electronics.",
        link: "products/corrugated-boxes/double-wall-heavy-duty.html"
    },
    "Custom Industrial Crate": {
        image: "industrial-crate.png",
        desc: "Engineered corrugated solutions for massive loads.",
        overview: "Heavy-duty corrugated containers designed to replace wooden crates, offering export-grade strength with less weight.",
        link: "products/corrugated-boxes/custom-industrial-crate.html"
    },
    "Kraft Paper": {
        image: "kraft-main-group.png",
        desc: "The #1 choice for sustainable, eco-conscious branding.",
        overview: "Kraft paper is manufactured using the kraft process, which is stronger than conventional paper. It is 100% biodegradable, recyclable, and compostable. Whether you need the organic look of Natural Brown, the clean finish of White Kraft, or the high-end feel of Black Kraft, this material provides a tactile, premium experience that tells your customers you care about the planet.",
        link: "products/kraft-paper.html"
    },
    "Natural Kraft Mailer": {
        image: "natural-mailer.png",
        desc: "Classic earthy brown corrugated mailer.",
        overview: "The most recognizable eco-friendly shipping solution. Provides heavy-duty protection with a 100% recyclable finish.",
        link: "products/kraft-paper/natural-kraft-mailer.html"
    },
    "White Kraft Box": {
        image: "white-kraft.png",
        desc: "Clean, crisp, and sustainable.",
        overview: "Bleached kraft paper offers a bright white surface that makes colors 'pop' while maintaining the textured, organic feel of paper.",
        link: "products/kraft-paper/white-kraft-box.html"
    },
    "Black Kraft Premium Box": {
        image: "black-kraft.png",
        desc: "Eco-friendly luxury in deep matte black.",
        overview: "Dyed kraft paper that looks incredibly high-end. Perfect for premium men's grooming or minimalist jewelry brands.",
        link: "products/kraft-paper/black-kraft-premium-box.html"
    },
    "Kraft Pillow Box": {
        image: "pillow.png",
        desc: "Elegant curved packaging for small gifts.",
        overview: "A one-piece design that snaps into a pillow shape. Popular for jewelry, scarves, and handmade soaps.",
        link: "products/kraft-paper/kraft-pillow-box.html"
    },
    "Gable Handle Box": {
        image: "gable.png",
        desc: "The versatile 'carrier' box with a built-in handle.",
        overview: "A favorite for party favors and food gift sets. It combines a box and a handle into one smart design.",
        link: "products/kraft-paper/gable-handle-box.html"
    },
    "Kraft Window Box": {
        image: "window.png",
        desc: "Natural texture with a transparent product view.",
        overview: "Features a die-cut window (with or without plant-based film) to show off the product inside while staying rustic.",
        link: "products/kraft-paper/kraft-window-box.html"
    },
    "Self-Sealing Kraft Bag": {
        image: "seal-bag.png",
        desc: "Flat or stand-up bags for dry goods.",
        overview: "Often used for coffee, tea, or snacks. Includes a grease-proof lining and a peel-and-seal strip.",
        link: "products/kraft-paper/self-sealing-kraft-bag.html"
    },
    "Twisted Handle Shopping Bag": {
        image: "shopping-bag.png",
        desc: "The iconic eco-friendly retail bag.",
        overview: "Strong, reinforced handles and a gusseted bottom. We can print your logo on both sides for mobile branding.",
        link: "products/kraft-paper/twisted-handle-shopping-bag.html"
    },
    "Rigid Kraft Tube": {
        image: "tube.png",
        desc: "High-strength cylindrical protection.",
        overview: "Multiple layers of kraft paper wound tightly. Ideal for posters, glass bottles, and luxury candles.",
        link: "products/kraft-paper/rigid-kraft-tube.html"
    },
    "Kraft Soap & Candle Sleeve": {
        image: "sleeve.png",
        desc: "Minimalist branding that slides on.",
        overview: "A cost-effective way to brand items. A simple printed sleeve that wraps around the product or a plain box.",
        link: "products/kraft-paper/kraft-soap-and-candle-sleeve.html"
    },
    "Corrugated Kraft Crate": {
        image: "kraft-crate.png",
        desc: "Industrial strength with a natural finish.",
        overview: "Used for shipping produce or heavy retail items that need a rustic, 'from-the-farm' presentation.",
        link: "products/kraft-paper/corrugated-kraft-crate.html"
    },
    "Interlocking Kraft Folder": {
        image: "folder.png",
        desc: "Flat-pack folders for documents and apparel.",
        overview: "Thin but stiff kraft cardstock that locks together without glue. Perfect for eco-friendly clothing brands.",
        link: "products/kraft-paper/interlocking-kraft-folder.html"
    },
    "Art Card": {
        image: "artcard-collection.png",
        desc: "The gold standard for retail-ready, high-definition packaging.",
        overview: "Art Card (also known as SBS Paperboard) is a premium, lightweight cardstock with a smooth, bright white surface. It is the preferred choice for cosmetics, pharmaceuticals, and retail consumer goods because it supports the highest quality printing and luxury finishes like gold foiling, spot UV, and soft-touch lamination. It is versatile, easy to assemble, and provides a sleek, professional look for any brand.",
        link: "products/art-card.html"
    },
    "Metallic Cardstock Box": {
        image: "metallic-cardstock.png",
        desc: "Full-surface metallic brilliance for a mirror-like finish.",
        overview: "Unlike foil stamping which is only for logos, these boxes are made from paperboard that is metallic across the entire surface. We use specialized UV inks to print over the silver or gold card, allowing us to create shimmering metallic colors and gradients. This is the ultimate 'shelf-shouter' for premium perfumes, skincare, and high-tech gadgets.",
        link: "products/art-card/metallic-cardstock-box.html"
    },
    "Straight Tuck End (STE)": {
        image: "ste-box.png",
        desc: "Premium look where both flaps tuck into the back.",
        overview: "The most popular choice for beauty and medical products. Since both flaps fold toward the back, the front face is perfectly smooth for branding.",
        link: "products/art-card/straight-tuck-end-ste.html"
    },
    "Reverse Tuck End (RTE)": {
        image: "rte-box.png",
        desc: "The most efficient and cost-effective folding carton.",
        overview: "The top and bottom flaps tuck in opposite directions. It is highly efficient for manufacturing and fits perfectly on retail shelves.",
        link: "products/art-card/reverse-tuck-end-rte.html"
    },
    "Auto-Lock Bottom Box": {
        image: "autolock.png",
        desc: "Pre-glued bottom for lightning-fast assembly.",
        overview: "The strongest folding carton bottom style. It arrives flat but 'snaps' into a locked position instantly. Best for heavier retail items like skincare jars.",
        link: "products/art-card/auto-lock-bottom-box.html"
    },
    "Snap-Lock (1-2-3) Bottom": {
        image: "snaplock.png",
        desc: "Interlocking bottom flaps for added security.",
        overview: "A manual-lock bottom that is more secure than a standard tuck. It is cost-effective because it requires no glue on the bottom.",
        link: "products/art-card/snap-lock-1-2-3-bottom.html"
    },
    "Double Wall Frame Tray": {
        image: "frame-tray.png",
        desc: "A sturdy, double-layered tray for high-end luxury.",
        overview: "Features thick, hollow side walls that give the appearance of a rigid box but at a folding carton price. Ideal for luxury chocolates and cosmetics.",
        link: "products/art-card/double-wall-frame-tray.html"
    },
    "Sleeve and Tray (Drawer)": {
        image: "drawer-artcard.png",
        desc: "The sliding unboxing experience on a budget.",
        overview: "A two-piece set consisting of an outer sleeve and an inner tray. It offers a premium 'sliding' reveal often used for electronics and stationery sets.",
        link: "products/art-card/sleeve-and-tray-drawer.html"
    },
    "Hanging Tab Display Box": {
        image: "hanging-tab.png",
        desc: "Compact retail box with a fold-out hanging tab.",
        overview: "Similar to a tuck box but includes a tab that can be folded down for shipping or up for hanging on pegboards.",
        link: "products/art-card/hanging-tab-display-box.html"
    },
    "Five Panel Hanger": {
        image: "five-panel-hanger.png",
        desc: "Box with an integrated backboard for retail hooks.",
        overview: "Includes an extra fifth panel that extends upward with a punch-hole. Essential for tech accessories and hardware items.",
        link: "products/art-card/five-panel-hanger.html"
    },
    "Pillow Box (Art Card)": {
        image: "artcard-pillow.png",
        desc: "Sleek, colorful curved packaging.",
        overview: "The Art Card version allows for high-gloss finishes and metallic foils, making it a favorite for jewelry and premium hair extensions.",
        link: "products/art-card/pillow-box-art-card.html"
    },
    "Hexagonal / Octagonal Box": {
        image: "geometric-box.png",
        desc: "Multi-sided geometric structures.",
        overview: "Stand out from the 'square' competition. These boxes offer a unique shelf presence for candy, snacks, and luxury perfumes.",
        link: "products/art-card/hexagonal-octagonal-box.html"
    },
    "Dispenser & Gravity Feed": {
        image: "gravity-feed.png",
        desc: "Self-dispensing boxes for countertop convenience.",
        overview: "Designed with a perforated opening at the bottom. As one product is pulled out, the next one drops down into place. Perfect for sachets and protein bars.",
        link: "products/art-card/dispenser-and-gravity-feed.html"
    },
    "Gable Box (Art Card)": {
        image: "art-gable.png",
        desc: "Lightweight gift box with a built-in handle.",
        overview: "Often used for event favors or lightweight meal kits. It combines a decorative box with a functional carry-handle.",
        link: "products/art-card/gable-box-art-card.html"
    },
    "Counter Display Unit (CDU)": {
        image: "artcard-cdu.png",
        desc: "Point-of-purchase display for small retail items.",
        overview: "Made from thick art card, these units hold multiple products on the counter. The lid usually folds back to become a header-board for advertising.",
        link: "products/art-card/counter-display-unit-cdu.html"
    },
    "Gift Boxes": {
        image: "gift-box-main.png",
        desc: "Exquisite packaging designed for life's special moments.",
        overview: "Our Gift Box collection focuses on presentation and unboxing. From elegant silk ribbon closures to unique geometric shapes, these boxes are designed to be kept and reused. Perfect for weddings, corporate gifting, luxury florists, and seasonal holidays.",
        link: "products/gift-boxes.html"
    },
    "Ribbon Tie Gift Box": {
        image: "ribbon-box.png",
        desc: "Classic elegance with a decorative silk ribbon closure.",
        overview: "A premium box where the lid is secured with a beautiful ribbon bow. The ribbon can be custom-dyed to match your brand colors. Ideal for high-end apparel and luxury hampers.",
        link: "products/gift-boxes/ribbon-tie-gift-box.html"
    },
    "Magnetic Gift Box": {
        image: "magnetic-gift.png",
        desc: "Modern luxury with a hidden magnetic snap.",
        overview: "A sleek, reusable box that closes with a satisfying 'click'. These are often shipped flat (collapsible) to save space but assemble into a rigid, premium gift container.",
        link: "products/gift-boxes/magnetic-gift-box.html"
    },
    "Heart-Shaped Box": {
        image: "heart-box.png",
        desc: "The ultimate choice for Valentine's and romantic gifts.",
        overview: "A specialized die-cut rigid box in a heart shape. Popular for luxury chocolates, preserved roses, and jewelry sets.",
        link: "products/gift-boxes/heart-shaped-box.html"
    },
    "Round Flower Box": {
        image: "round-box.png",
        desc: "The 'hat box' style for premium floral arrangements.",
        overview: "A deep, cylindrical rigid box. These are built with a waterproof lining option, making them the industry standard for luxury 'eternal' roses and flower delivery.",
        link: "products/gift-boxes/round-flower-box.html"
    },
    "Nested Box Sets": {
        image: "nested-boxes.png",
        desc: "A set of boxes in graduating sizes that fit inside each other.",
        overview: "Perfect for retail kits or tiered gift towers. They save on shipping costs while providing the customer with a beautiful set of matching storage boxes.",
        link: "products/gift-boxes/nested-box-sets.html"
    },
    "Carry-Handle Gift Box": {
        image: "handle-gift.png",
        desc: "Combines a gift box with the convenience of a bag.",
        overview: "Features integrated cord, ribbon, or plastic handles. This eliminates the need for an extra shopping bag, making it perfect for wine bottles and heavy gift sets.",
        link: "products/gift-boxes/carry-handle-gift-box.html"
    },
    "Window Gift Box": {
        image: "gift-window.png",
        desc: "Let the beauty of your gift shine through.",
        overview: "Features a large clear viewing pane. Commonly used for curated gift hampers, baby shower sets, and artisanal food displays.",
        link: "products/gift-boxes/window-gift-box.html"
    },
    "Suitcase Style Box": {
        image: "suitcase-box.png",
        desc: "Whimsical packaging with a handle and metal clasp.",
        overview: "Designed to look like a vintage suitcase. Extremely popular for kids' gift sets, 'adventure' themed branding, and luxury stationery kits.",
        link: "products/gift-boxes/suitcase-style-box.html"
    },
    "Christmas & Holiday Specials": {
        image: "holiday-box.png",
        desc: "Festive designs with metallic foils and glitter finishes.",
        overview: "Custom-themed boxes for peak seasons. Includes features like snowflake die-cuts, velvet textures, and gold-embossed patterns to drive holiday sales.",
        link: "products/gift-boxes/christmas-and-holiday-specials.html"
    },
    "Custom Pouches": {
        image: "pouches-main-group.png",
        desc: "Modern, lightweight, and high-barrier flexible packaging.",
        overview: "Custom pouches offer a versatile alternative to rigid packaging. They are designed to save on shipping costs and shelf space while providing superior protection against moisture, oxygen, and light. Available in high-gloss, matte, and soft-touch finishes with various closure options like resealable zippers and tear notches.",
        link: "products/custom-pouches.html"
    },
    "Stand-Up Pouch (Doypack)": {
        image: "stand-up-pouch.png",
        desc: "The retail superstar that stands tall on shelves.",
        overview: "Features a bottom gusset that allows the bag to stand upright when filled. Includes a resealable zip-lock and tear notches. Perfect for snacks, granola, and pet treats.",
        link: "products/custom-pouches/stand-up-pouch-doypack.html"
    },
    "Flat Pouch (3-Side Seal)": {
        image: "flat-pouch.png",
        desc: "Simple, sleek, and space-efficient.",
        overview: "Sealed on three sides with one end open for filling. Great for single-use samples, face masks, beef jerky, and flat food items.",
        link: "products/custom-pouches/flat-pouch-3-side-seal.html"
    },
    "Side Gusseted Bag": {
        image: "side-gusset.png",
        desc: "The classic choice for coffee and tea.",
        overview: "The sides expand when filled, allowing for a larger volume in a compact footprint. Often paired with a tin-tie or a one-way degassing valve for fresh coffee beans.",
        link: "products/custom-pouches/side-gusseted-bag.html"
    },
    "Flat Bottom Pouch (Box Pouch)": {
        image: "flat-bottom.png",
        desc: "The premium blend of a bag and a box.",
        overview: "With a completely flat base, this pouch offers maximum stability and five surfaces for branding. The top-tier choice for high-end specialty foods.",
        link: "products/custom-pouches/flat-bottom-pouch-box-pouch.html"
    },
    "Spout Pouch for Liquids": {
        image: "spout-pouch.png",
        desc: "The mess-free alternative to bottles.",
        overview: "Includes a plastic screw-cap spout. Ideal for juices, energy gels, soaps, and sauces. Lightweight and easy for customers to squeeze every last drop out.",
        link: "products/custom-pouches/spout-pouch-for-liquids.html"
    },
    "Kraft Paper Pouch": {
        image: "kraft-pouch.png",
        desc: "Organic look with a high-barrier lining.",
        overview: "Combines the earthy feel of kraft paper with an internal foil or plastic lining to keep contents fresh. Popular for organic tea and bath salts.",
        link: "products/custom-pouches/kraft-paper-pouch.html"
    },
    "Mylar & Smell-Proof Bags": {
        image: "mylar-bags.png",
        desc: "Ultimate barrier protection for sensitive items.",
        overview: "Constructed with metallic layers that block 100% of light and odors. These are puncture-resistant and perfect for long-term food storage or medicinal products.",
        link: "products/custom-pouches/mylar-and-smell-proof-bags.html"
    },
    "Satin & Velvet Gift Pouches": {
        image: "fabric-pouches.png",
        desc: "Soft-touch luxury for jewelry and accessories.",
        overview: "Non-plastic, high-end fabric pouches with drawstring closures. Perfect for jewelry, watches, and premium sunglasses.",
        link: "products/custom-pouches/satin-and-velvet-gift-pouches.html"
    },
    "Biodegradable Eco-Pouches": {
        image: "eco-pouch.png",
        desc: "Plant-based films that leave zero waste.",
        overview: "Made from compostable materials like cornstarch (PLA). They look and feel like plastic but break down naturally, satisfying the highest eco-standards.",
        link: "products/custom-pouches/biodegradable-eco-pouches.html"
    },
    "Labels & Tags": {
        image: "labels-main-overview.png",
        desc: "Professional labeling solutions for branding, security, and logistics.",
        overview: "Labels and tags are the final, essential layer of your brand identity. Our collection spans from high-speed industrial roll labels for automatic application to luxury embossed hang tags for high-end fashion. We use premium adhesives, moisture-resistant materials, and specialized finishes like 3D resin and metallic foils to ensure your product stands out on the shelf and remains compliant with industry standards.",
        link: "products/labels-and-tags.html"
    },
    "Roll Labels (Automatic)": {
        image: "roll-labels.png",
        desc: "High-efficiency rolls for machine application.",
        overview: "Precision-wound on 1-inch or 3-inch cores. These are designed for high-speed labeling lines for beverages, cosmetics, and pharmaceuticals.",
        link: "products/labels-and-tags/roll-labels-automatic.html"
    },
    "Sheet Labels (Manual)": {
        image: "sheet-labels.png",
        desc: "Affordable, easy-to-apply labels on flat sheets.",
        overview: "Ideal for small businesses and hand-application. Multiple labels per sheet allow for easy storage and quick peeling for boutique packaging.",
        link: "products/labels-and-tags/sheet-labels-manual.html"
    },
    "Die-Cut Vinyl Stickers": {
        image: "vinyl-stickers.png",
        desc: "Weatherproof stickers cut to any custom shape.",
        overview: "Made from premium vinyl that resists water, scratches, and sunlight. Perfect for promotional branding, laptop stickers, and outdoor equipment.",
        link: "products/labels-and-tags/die-cut-vinyl-stickers.html"
    },
    "Clear & Transparent Labels": {
        image: "clear-labels.png",
        desc: "The invisible 'no-label' look for modern brands.",
        overview: "Printed on ultra-clear BOPP material. It gives the illusion that your design is printed directly on the glass or plastic bottle.",
        link: "products/labels-and-tags/clear-and-transparent-labels.html"
    },
    "Metallic & Foil Labels": {
        image: "metallic-labels.png",
        desc: "High-shine silver, gold, and holographic finishes.",
        overview: "Reflective substrates that catch the light. Best for luxury spirits, premium vitamins, and 'Limited Edition' product lines.",
        link: "products/labels-and-tags/metallic-and-foil-labels.html"
    },
    "Luxury Hang Tags": {
        image: "hang-tags.png",
        desc: "Premium cardstock tags for high-end retail.",
        overview: "Includes options for strings, safety pins, or ribbons. Available with embossing and spot UV to provide a tactile experience for fashion brands.",
        link: "products/labels-and-tags/luxury-hang-tags.html"
    },
    "Woven Clothing Labels": {
        image: "woven-labels.png",
        desc: "Professional fabric branding for apparel.",
        overview: "High-density damask or satin threads woven together to create your logo. These labels are soft, durable, and won't fade in the wash.",
        link: "products/labels-and-tags/woven-clothing-labels.html"
    },
    "Care & Content Labels": {
        image: "care-labels.png",
        desc: "Legal and washing instruction labels for textiles.",
        overview: "Printed on soft nylon or polyester. These provide essential information like '100% Cotton' and 'Hand Wash Only' required for global retail.",
        link: "products/labels-and-tags/care-and-content-labels.html"
    },
    "Bottle & Jar Labels": {
        image: "bottle-labels.png",
        desc: "Oil and moisture-resistant labels for containers.",
        overview: "Specifically engineered with aggressive adhesives that stick to curved glass and plastic, even in cold or damp environments like refrigerators.",
        link: "products/labels-and-tags/bottle-and-jar-labels.html"
    },
    "Security & Tamper-Evident Seals": {
        image: "security-seals.png",
        desc: "Anti-tamper labels that show 'VOID' if opened.",
        overview: "Critical for pharmaceutical and electronics safety. These labels leave a visible residue if removed, ensuring product integrity for the customer.",
        link: "products/labels-and-tags/security-and-tamper-evident-seals.html"
    },
    "Thermal Transfer Labels": {
        image: "thermal-labels.png",
        desc: "High-speed printing for logistics and shipping.",
        overview: "Compatible with Zebra and other thermal printers. Ideal for barcodes, warehouse tracking, and shipping labels that need to stay legible.",
        link: "products/labels-and-tags/thermal-transfer-labels.html"
    },
    "Domed (3D) Resin Stickers": {
        image: "domed-stickers.png",
        desc: "A thick, glass-like 3D coating over your logo.",
        overview: "A clear polyurethane resin creates a 3D dome that protects the print from chemicals and scratches. Used for car badges and electronics.",
        link: "products/labels-and-tags/domed-3d-resin-stickers.html"
    },
    "Eco-Friendly Paper Labels": {
        image: "eco-labels.png",
        desc: "Compostable labels made from recycled fibers.",
        overview: "Crafted from sugarcane, hemp, or recycled paper with vegan adhesives. The perfect choice for sustainable and organic product lines.",
        link: "products/labels-and-tags/eco-friendly-paper-labels.html"
    },
    "Premium Finish": {
        image: "premium-main.png",
        desc: "The secret to high-end, luxury brand identity.",
        overview: "A premium finish is the final touch that transforms a standard box into a luxury experience. Whether it is the metallic shine of foil, the 3D texture of embossing, or the velvety feel of soft-touch lamination, these treatments increase the perceived value of your product and ensure your brand stands out on the shelf.",
        link: "products/premium-finish.html"
    },
    "Gold & Silver Foil Stamping": {
        image: "foil-stamping.png",
        desc: "High-shine metallic accents.",
        overview: "Foil stamping uses heat and pressure to bond a thin metallic film to the surface. It is the gold standard for luxury branding on perfume boxes, chocolate packaging, and premium spirits.",
        link: "products/premium-finish/gold-and-silver-foil-stamping.html"
    },
    "Spot UV & Raised UV": {
        image: "spot-uv.png",
        desc: "Glossy 3D effects on specific areas.",
        overview: "Spot UV applies a shiny liquid coating to specific parts of your design, like a logo. Raised UV (3D UV) adds physical height to the shine, so you can feel the texture.",
        link: "products/premium-finish/spot-uv-and-raised-uv.html"
    },
    "Embossing & Debossing": {
        image: "emboss.png",
        desc: "Physical 3D textures in the paper.",
        overview: "Embossing pushes the design 'out' toward the customer, while debossing sinks it 'in'. It creates a sophisticated, tactile feel that invites people to touch the box.",
        link: "products/premium-finish/embossing-and-debossing.html"
    },
    "Soft-Touch Lamination": {
        image: "soft-touch.png",
        desc: "The 'Velvet' feel for high-end boxes.",
        overview: "A premium matte film that feels like suede or peach skin. It is extremely popular for tech packaging and luxury cosmetics because it is fingerprint-resistant and looks very modern.",
        link: "products/premium-finish/soft-touch-lamination.html"
    },
    "Holographic & Iridescent Finish": {
        image: "holographic.png",
        desc: "Rainbow-shifting colors that catch the light.",
        overview: "These finishes change color as the box moves. It's a high-energy look perfect for tech accessories, gaming products, and eye-catching cosmetic lines.",
        link: "products/premium-finish/holographic-and-iridescent-finish.html"
    },
    "Matte & Gloss Lamination": {
        image: "lamination.png",
        desc: "Essential protective coatings.",
        overview: "Gloss adds a high-shine, vibrant finish that makes colors pop. Matte provides a subtle, non-reflective, elegant look. Both add a layer of durability and water resistance.",
        link: "products/premium-finish/matte-and-gloss-lamination.html"
    },
    "Texture & Linen Finish": {
        image: "linen.png",
        desc: "Patterns pressed into the material.",
        overview: "Instead of smooth paper, we use rollers to press patterns like linen, woodgrain, or leather into the box surface. Great for stationery and jewelry brands.",
        link: "products/premium-finish/texture-and-linen-finish.html"
    },
    "Glitter & Pearlescent Coating": {
        image: "glitter.png",
        desc: "Shimmering and sparkling effects.",
        overview: "Pearlescent finishes offer a soft, pearl-like glow, while glitter adds a bold sparkle. These are favorites for holiday gift sets and children's toy packaging.",
        link: "products/premium-finish/glitter-and-pearlescent-coating.html"
    },
    "Metallic Ink Printing": {
        image: "metallic-ink.png",
        desc: "Shimmering details printed directly into the art.",
        overview: "Unlike foil, this is ink mixed with metallic particles. It allows for tiny details and complex gradients that standard foil stamping can't handle.",
        link: "products/premium-finish/metallic-ink-printing.html"
    }
};
