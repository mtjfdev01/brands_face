function injectProductNavbar() {
    // If a navbar already exists in the page (e.g. the homepage header), do not inject another one.
    if (document.querySelector('header nav#navbar')) {
        return;
    }
    const currentPath = window.location.pathname;
    const currentFile = currentPath.split("/").pop();
    
    // Detect if we're in a subdirectory (sub-product page)
    const pathSegments = currentPath.split("/").filter(s => s);
    const isInSubdir = pathSegments.length > 2; // e.g., /products/rigid-boxes/magnetic-snap-box.html
    const pathPrefix = isInSubdir ? "../" : "";
    
    // Helper function to convert product links to root-relative paths
    // Ensures links work from any page depth by using absolute paths like '/products/...'
    const adjustLink = (link) => {
        if (!link) return '#';
        // already absolute
        if (link.startsWith('/')) return link;
        // already points into products folder
        if (link.startsWith('products/')) return '/' + link;
        // links that contain a slash but don't start with products/ (e.g. 'rigid-boxes/...')
        if (link.includes('/')) return '/products/' + link;
        // plain filenames like 'rigid-boxes.html' -> assume they live under /products/
        return '/products/' + link;
    };

    // The Catalog structure with ALL 8 Main Products & Sub-Products
    const productsData = [
        { 
            name: "Rigid Boxes", 
            link: "rigid-boxes.html", 
            subs: [
                { name: "Magnetic Snap Box", link: "rigid-boxes/magnetic-snap-box.html" },
                { name: "Lid & Base Box", link: "rigid-boxes/lid-and-base-box.html" },
                { name: "Drawer Style Box", link: "rigid-boxes/drawer-style-box.html" },
                { name: "Book Style Box", link: "rigid-boxes/book-style-box.html" },
                { name: "Shoulder & Neck Box", link: "rigid-boxes/shoulder-and-neck-box.html" },
                { name: "Collapsible Rigid Box", link: "rigid-boxes/collapsible-rigid-box.html" },
                { name: "Circular Rigid Tube", link: "rigid-boxes/circular-rigid-tube.html" },
                { name: "Hexagonal Rigid Box", link: "rigid-boxes/hexagonal-rigid-box.html" },
                { name: "Custom Rigid Box", link: "rigid-boxes/custom-rigid-box.html" }
            ]
        },
        { 
            name: "Corrugated", 
            link: "corrugated-boxes.html", 
            subs: [
                { name: "Full-Color Mailer Box", link: "corrugated-boxes/full-color-mailer-box.html" },
                { name: "Litho-Laminated Luxury Box", link: "corrugated-boxes/litho-laminated-luxury-box.html" },
                { name: "Retail-Ready Packaging (RRP)", link: "corrugated-boxes/retail-ready-packaging-rrp.html" },
                { name: "Standard Shipping Box (RSC)", link: "corrugated-boxes/standard-shipping-box-rsc.html" },
                { name: "Front Tuck Mailer", link: "corrugated-boxes/front-tuck-mailer.html" },
                { name: "Pizza & Food Box", link: "corrugated-boxes/pizza-and-food-box.html" },
                { name: "Subscription Box", link: "corrugated-boxes/subscription-box.html" },
                { name: "Display Floor Stand", link: "corrugated-boxes/display-floor-stand.html" },
                { name: "Counter Display Unit (CDU)", link: "corrugated-boxes/counter-display-unit-cdu.html" },
                { name: "Double Wall Heavy Duty", link: "corrugated-boxes/double-wall-heavy-duty.html" },
                { name: "Custom Industrial Crate", link: "corrugated-boxes/custom-industrial-crate.html" }
            ]
        },
        { 
            name: "Kraft Paper", 
            link: "kraft-paper.html", 
            subs: [
                { name: "Natural Kraft Mailer", link: "kraft-paper/natural-kraft-mailer.html" },
                { name: "White Kraft Box", link: "kraft-paper/white-kraft-box.html" },
                { name: "Black Kraft Premium Box", link: "kraft-paper/black-kraft-premium-box.html" },
                { name: "Kraft Pillow Box", link: "kraft-paper/kraft-pillow-box.html" },
                { name: "Gable Handle Box", link: "kraft-paper/gable-handle-box.html" },
                { name: "Kraft Window Box", link: "kraft-paper/kraft-window-box.html" },
                { name: "Self-Sealing Kraft Bag", link: "kraft-paper/self-sealing-kraft-bag.html" },
                { name: "Twisted Handle Shopping Bag", link: "kraft-paper/twisted-handle-shopping-bag.html" },
                { name: "Rigid Kraft Tube", link: "kraft-paper/rigid-kraft-tube.html" },
                { name: "Kraft Soap & Candle Sleeve", link: "kraft-paper/kraft-soap-and-candle-sleeve.html" },
                { name: "Corrugated Kraft Crate", link: "kraft-paper/corrugated-kraft-crate.html" },
                { name: "Interlocking Kraft Folder", link: "kraft-paper/interlocking-kraft-folder.html" }
            ]
        },
        { 
            name: "Art Card", 
            link: "art-card.html", 
            subs: [
                { name: "Metallic Cardstock Box", link: "art-card/metallic-cardstock-box.html" },
                { name: "Straight Tuck End (STE)", link: "art-card/straight-tuck-end-ste.html" },
                { name: "Reverse Tuck End (RTE)", link: "art-card/reverse-tuck-end-rte.html" },
                { name: "Auto-Lock Bottom Box", link: "art-card/auto-lock-bottom-box.html" },
                { name: "Snap-Lock (1-2-3) Bottom", link: "art-card/snap-lock-1-2-3-bottom.html" },
                { name: "Double Wall Frame Tray", link: "art-card/double-wall-frame-tray.html" },
                { name: "Sleeve and Tray (Drawer)", link: "art-card/sleeve-and-tray-drawer.html" },
                { name: "Hanging Tab Display Box", link: "art-card/hanging-tab-display-box.html" },
                { name: "Five Panel Hanger", link: "art-card/five-panel-hanger.html" },
                { name: "Pillow Box (Art Card)", link: "art-card/pillow-box-art-card.html" },
                { name: "Hexagonal / Octagonal Box", link: "art-card/hexagonal-octagonal-box.html" },
                { name: "Dispenser & Gravity Feed", link: "art-card/dispenser-and-gravity-feed.html" },
                { name: "Gable Box (Art Card)", link: "art-card/gable-box-art-card.html" },
                { name: "Counter Display Unit (CDU)", link: "art-card/counter-display-unit-cdu.html" }
            ]
        },
        { 
            name: "Gift Boxes", 
            link: "gift-boxes.html", 
            subs: [
                { name: "Ribbon Tie Gift Box", link: "gift-boxes/ribbon-tie-gift-box.html" },
                { name: "Magnetic Gift Box", link: "gift-boxes/magnetic-gift-box.html" },
                { name: "Heart-Shaped Box", link: "gift-boxes/heart-shaped-box.html" },
                { name: "Round Flower Box", link: "gift-boxes/round-flower-box.html" },
                { name: "Nested Box Sets", link: "gift-boxes/nested-box-sets.html" },
                { name: "Carry-Handle Gift Box", link: "gift-boxes/carry-handle-gift-box.html" },
                { name: "Window Gift Box", link: "gift-boxes/window-gift-box.html" },
                { name: "Suitcase Style Box", link: "gift-boxes/suitcase-style-box.html" },
                { name: "Christmas & Holiday Specials", link: "gift-boxes/christmas-and-holiday-specials.html" }
            ]
        },
        { 
            name: "Custom Pouches", 
            link: "custom-pouches.html", 
            subs: [
                { name: "Stand-Up Pouch (Doypack)", link: "custom-pouches/stand-up-pouch-doypack.html" },
                { name: "Flat Pouch (3-Side Seal)", link: "custom-pouches/flat-pouch-3-side-seal.html" },
                { name: "Side Gusseted Bag", link: "custom-pouches/side-gusseted-bag.html" },
                { name: "Flat Bottom Pouch (Box Pouch)", link: "custom-pouches/flat-bottom-pouch-box-pouch.html" },
                { name: "Spout Pouch for Liquids", link: "custom-pouches/spout-pouch-for-liquids.html" },
                { name: "Kraft Paper Pouch", link: "custom-pouches/kraft-paper-pouch.html" },
                { name: "Mylar & Smell-Proof Bags", link: "custom-pouches/mylar-and-smell-proof-bags.html" },
                { name: "Satin & Velvet Gift Pouches", link: "custom-pouches/satin-and-velvet-gift-pouches.html" },
                { name: "Biodegradable Eco-Pouches", link: "custom-pouches/biodegradable-eco-pouches.html" }
            ]
        },
        { 
            name: "Labels and Tags", 
            link: "labels-and-tags.html", 
            subs: [
                { name: "Roll Labels (Automatic)", link: "labels-and-tags/roll-labels-automatic.html" },
                { name: "Sheet Labels (Manual)", link: "labels-and-tags/sheet-labels-manual.html" },
                { name: "Die-Cut Vinyl Stickers", link: "labels-and-tags/die-cut-vinyl-stickers.html" },
                { name: "Clear & Transparent Labels", link: "labels-and-tags/clear-and-transparent-labels.html" },
                { name: "Metallic & Foil Labels", link: "labels-and-tags/metallic-and-foil-labels.html" },
                { name: "Luxury Hang Tags", link: "labels-and-tags/luxury-hang-tags.html" },
                { name: "Woven Clothing Labels", link: "labels-and-tags/woven-clothing-labels.html" },
                { name: "Care & Content Labels", link: "labels-and-tags/care-and-content-labels.html" },
                { name: "Bottle & Jar Labels", link: "labels-and-tags/bottle-and-jar-labels.html" },
                { name: "Security & Tamper-Evident Seals", link: "labels-and-tags/security-and-tamper-evident-seals.html" },
                { name: "Thermal Transfer Labels", link: "labels-and-tags/thermal-transfer-labels.html" },
                { name: "Domed (3D) Resin Stickers", link: "labels-and-tags/domed-3d-resin-stickers.html" },
                { name: "Eco-Friendly Paper Labels", link: "labels-and-tags/eco-friendly-paper-labels.html" }
            ]
        },
        { 
            name: "Premium Finish", 
            link: "premium-finish.html", 
            subs: [
                { name: "Gold & Silver Foil Stamping", link: "premium-finish/gold-and-silver-foil-stamping.html" },
                { name: "Spot UV & Raised UV", link: "premium-finish/spot-uv-and-raised-uv.html" },
                { name: "Embossing & Debossing", link: "premium-finish/embossing-and-debossing.html" },
                { name: "Soft-Touch Lamination", link: "premium-finish/soft-touch-lamination.html" },
                { name: "Holographic & Iridescent Finish", link: "premium-finish/holographic-and-iridescent-finish.html" },
                { name: "Matte & Gloss Lamination", link: "premium-finish/matte-and-gloss-lamination.html" },
                { name: "Texture & Linen Finish", link: "premium-finish/texture-and-linen-finish.html" },
                { name: "Glitter & Pearlescent Coating", link: "premium-finish/glitter-and-pearlescent-coating.html" },
                { name: "Metallic Ink Printing", link: "premium-finish/metallic-ink-printing.html" }
            ]
        }
    ];

    let dropdownItems = "";
    productsData.forEach(cat => {
        // Always include all main products and their subproducts so navigation is available from any page
        dropdownItems += `
                <li class="dropdown-item">
                    <a href="${adjustLink(cat.link)}">${cat.name} <span class="arrow">›</span></a>
                    <ul class="submenu">
                        ${cat.subs.map(sub => `<li><a href="${adjustLink(sub.link)}">${sub.name}</a></li>`).join('')}
                    </ul>
                </li>`;
    });

    // Determine if we're on a product page or homepage
    const isProductPage = currentFile.endsWith('.html') && currentFile !== 'index.html' && currentFile !== '404.html' && currentFile !== 'privacy.html' && currentFile !== 'return-refund.html' && currentFile !== 'lab.html';
    const quoteLink = isProductPage ? '#quote-form' : '/index.html#contact';

    const navHTML = `
    <header class="product-navbar">
        <style>
        /* Scoped product navbar dropdown styles (homepage class names) */
        .product-navbar .nav-item.dropdown { position: relative; }
        .product-navbar .dropdown-menu {
            display: none;
            position: absolute;
            top: 100%;
            right: 0;
            background: var(--primary);
            min-width: 220px;
            list-style: none;
            padding: 10px 0;
            border-top: 3px solid var(--accent);
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
            max-height: 60vh;
            overflow-y: auto;
            z-index: 1200;
        }

        .product-navbar .nav-item.dropdown:hover > .dropdown-menu,
        .product-navbar .nav-item.dropdown:focus-within > .dropdown-menu { display: block; }

        /* Support programmatic open state (used for click/touch toggles) */
        .product-navbar .dropdown-menu.open { display: block; }
        .product-navbar .dropdown-item.open > .submenu { display: block; }

        .product-navbar .dropdown-item { position: relative; }

        .product-navbar .dropdown-item > a {
            display: flex;
            justify-content: space-between;
            padding: 12px 20px;
            color: white;
            text-decoration: none;
            font-size: 0.9rem;
            transition: 0.3s;
        }

        .product-navbar .dropdown-item > a:hover { background: rgba(255, 255, 255, 0.1); color: var(--accent); }

        .product-navbar .submenu {
            display: none;
            position: absolute;
            top: 0;
            right: 100%; /* shows to the LEFT of the main menu */
            background: #353a85;
            min-width: 200px;
            list-style: none;
            padding: 10px 0;
            border-right: 2px solid var(--accent);
            max-height: 55vh;
            overflow-y: auto;
            z-index: 1250;
        }

        .product-navbar .dropdown-item:hover > .submenu { display: block; }

        /* If submenu doesn't fit below, open upward instead */
        .product-navbar .dropdown-item.open-up > .submenu {
            top: auto;
            /* move the submenu 1 inch further above the parent to keep it visible */
            bottom: calc(100% + 1in);
        }

        .product-navbar .submenu li a { display: block; padding: 8px 20px; color: rgba(255,255,255,0.8); font-size:0.8rem; text-decoration:none; }
        .product-navbar .submenu li a:hover { color: white; }

        .product-navbar .dropdown-menu.main-flip { left: 0; right: auto; }
        .product-navbar .dropdown-menu.main-flip .submenu { right: auto; left: 100%; border-right: none; border-left: 2px solid var(--accent); }

        @keyframes fadeIn { from { opacity: 0; transform: translateY(-6px); } to { opacity: 1; transform: translateY(0); } }
        </style>
        <nav id="navbar" class="scrolled">
            <div class="nav-left"><a href="${quoteLink}" class="btn btn-primary btn-nav">Get a Quote</a></div>
            <a href="/index.html" class="logo">BRANDS FACE</a>
            <div class="nav-right">
                <a href="/index.html">HOME</a>
                <div class="nav-item dropdown">
                    <a href="#" class="nav-link active">PRODUCTS</a>
                    <ul class="dropdown-menu">
                        ${dropdownItems}
                    </ul>
                </div>
                <a href="/about-us.html">ABOUT US</a>
            </div>
        </nav>
    </header>`;

    // If this is a product page, remove any existing header/nav to avoid duplicates
    if (isProductPage) {
        const oldHeader = document.querySelector('header');
        if (oldHeader) oldHeader.remove();
    }

    document.body.insertAdjacentHTML('afterbegin', navHTML);

    // Inject mobile menu markup for product pages (avoid duplicating if already present)
    if (!document.querySelector('.mobile-menu') && !document.getElementById('mobileMenu')) {
        const mobileHTML = `
            <button id="mobileMenuToggle" class="mobile-menu-btn" aria-label="Open menu">
                <span class="menu-icon">☰</span>
            </button>

            <div id="mobileMenu" class="mobile-menu">
                <div class="mobile-menu-header">
                    <a href="/" class="mobile-logo">Brands Face</a>
                    <button class="mobile-close-btn" aria-label="Close menu">×</button>
                </div>
                <div class="mobile-menu-content">
                    <!-- Mobile navigation will be populated by existing navbar/menu scripts -->
                </div>
            </div>
            <div id="mobileMenuBackdrop" class="mobile-menu-backdrop"></div>
        `;
        document.body.insertAdjacentHTML('beforeend', mobileHTML);

        // Basic mobile menu close handler (supplements existing main/product scripts)
        (function attachMobileClose(){
            const closeBtn = document.querySelector('.mobile-close-btn');
            const menu = document.getElementById('mobileMenu') || document.querySelector('.mobile-menu');
            const backdrop = document.getElementById('mobileMenuBackdrop') || document.querySelector('.mobile-menu-backdrop');
            if (!closeBtn || !menu) return;
            closeBtn.addEventListener('click', () => {
                menu.classList.remove('active');
                if (backdrop) backdrop.style.display = 'none';
                document.body.style.overflow = '';
            });
            if (backdrop) backdrop.addEventListener('click', () => {
                menu.classList.remove('active');
                backdrop.style.display = 'none';
                document.body.style.overflow = '';
            });
        })();
    }
    // Add runtime behavior: flip main dropdown and sub-menus when they would overflow the viewport
    (function attachSubmenuFlip(){
        const navRoot = document.querySelector('.product-navbar');
        if (!navRoot) return;
        const catItems = navRoot.querySelectorAll('.dropdown-menu .dropdown-item');
        const navItem = navRoot.querySelector('.nav-item.dropdown');
        const mainMenu = navRoot.querySelector('.dropdown-menu');
        const HOVER_CLOSE_DELAY = 180; // ms
        let mainCloseTimer = null;
        const itemCloseTimers = new WeakMap();

        // Handle main dropdown flipping if it would overflow viewport on the right
        if (navItem && mainMenu) {
            navItem.addEventListener('mouseenter', () => {
                const prev = mainMenu.style.display;
                mainMenu.style.display = 'block';
                mainMenu.style.visibility = 'hidden';
                const menuRect = mainMenu.getBoundingClientRect();
                const parentRect = navItem.getBoundingClientRect();
                const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
                const spaceRight = vw - parentRect.right;
                const spaceLeft = parentRect.left;
                if (menuRect.width > spaceRight && spaceLeft > menuRect.width) {
                    mainMenu.classList.add('main-flip');
                } else {
                    mainMenu.classList.remove('main-flip');
                }
                mainMenu.style.visibility = '';
                mainMenu.style.display = prev;
            });
            // Ensure menu shows on hover and hides on leave (robust for subproduct pages)
            navItem.addEventListener('mouseenter', () => {
                if (mainCloseTimer) { clearTimeout(mainCloseTimer); mainCloseTimer = null; }
                mainMenu.classList.add('open');
            });
            navItem.addEventListener('mouseleave', () => {
                if (mainCloseTimer) clearTimeout(mainCloseTimer);
                mainCloseTimer = setTimeout(() => {
                    mainMenu.classList.remove('open');
                }, HOVER_CLOSE_DELAY);
            });
            // Toggle on click (useful for touch/subproduct pages)
            const productsLink = navItem.querySelector('.nav-link');
            if (productsLink) {
                productsLink.addEventListener('click', (e) => {
                    e.preventDefault();
                    mainMenu.classList.toggle('open');
                });
            }
        }

        catItems.forEach(item => {
            const sub = item.querySelector('.submenu');
            if (!sub) return;
            item.addEventListener('mouseenter', () => {
                // cancel any pending close for this item
                const t = itemCloseTimers.get(item);
                if (t) { clearTimeout(t); itemCloseTimers.delete(item); }
                // Temporarily show to measure size
                const prevDisplay = sub.style.display;
                sub.style.display = 'block';
                sub.style.visibility = 'hidden';
                const subRect = sub.getBoundingClientRect();
                const itemRect = item.getBoundingClientRect();
                const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
                const spaceRight = vw - itemRect.right;
                const spaceLeft = itemRect.left;
                // Determine default opening side for this sub-menu (depends on whether main menu was flipped)
                const mainFlipped = mainMenu && mainMenu.classList.contains('main-flip');
                if (mainFlipped) {
                    if (subRect.width > spaceLeft && spaceRight > subRect.width) {
                        sub.classList.add('flip'); // flip to open right
                    } else {
                        sub.classList.remove('flip');
                    }
                } else {
                    if (subRect.width > spaceRight && spaceLeft > subRect.width) {
                        sub.classList.add('flip'); // flip to open left
                    } else {
                        sub.classList.remove('flip');
                    }
                }
                // Vertical positioning: if submenu doesn't fit below, open upward
                const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);
                const spaceBelow = vh - itemRect.bottom;
                const spaceAbove = itemRect.top;
                if (subRect.height > spaceBelow && spaceAbove > subRect.height) {
                    item.classList.add('open-up');
                } else {
                    item.classList.remove('open-up');
                }
                // restore
                sub.style.visibility = '';
                sub.style.display = prevDisplay;
                // ensure visible while hovered
                item.classList.add('open');
            });
            item.addEventListener('mouseleave', () => {
                // small delay before closing to allow mouse to reach submenu
                const existing = itemCloseTimers.get(item);
                if (existing) clearTimeout(existing);
                const timer = setTimeout(() => {
                    item.classList.remove('open');
                    itemCloseTimers.delete(item);
                }, HOVER_CLOSE_DELAY);
                itemCloseTimers.set(item, timer);
            });
        });

        // Remove flip on resize to recalc
        window.addEventListener('resize', () => {
            if (mainMenu) mainMenu.classList.remove('main-flip');
            navRoot.querySelectorAll('.dropdown-menu .submenu.flip').forEach(s => s.classList.remove('flip'));
        });
        // Add click-to-toggle for categories (helps on touch and when hover isn't reliable)
        navRoot.querySelectorAll('.dropdown-menu .dropdown-item').forEach(item => {
            const link = item.querySelector('a');
            const sub = item.querySelector('.submenu');
            if (!link || !sub) return;
            link.addEventListener('click', (e) => {
                // On small screens toggle submenu instead of navigating; on desktop allow navigation
                const isTouchWidth = window.matchMedia('(max-width: 900px)').matches;
                if (isTouchWidth) {
                    e.preventDefault();
                    item.classList.toggle('open');
                } else {
                    // allow navigation on desktop: no preventDefault
                    // but close any open toggles to avoid stale state
                    navRoot.querySelectorAll('.dropdown-menu .dropdown-item.open').forEach(i => i.classList.remove('open'));
                }
            });
        });

        // Close open submenus when clicking outside
        document.addEventListener('click', (e) => {
            if (!navRoot.contains(e.target)) {
                navRoot.querySelectorAll('.dropdown-menu .dropdown-item.open').forEach(i => i.classList.remove('open'));
                if (mainMenu) mainMenu.classList.remove('open');
            }
        });
    })();
}
injectProductNavbar();