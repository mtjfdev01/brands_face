# PowerShell Script to Add SEO Metadata to All Product Pages
# This will insert proper meta tags, Open Graph, Twitter Cards, and structured data

$productCategories = @{
    "art-card" = @("auto-lock-bottom-box", "counter-display-unit-cdu", "dispenser-and-gravity-feed", "double-wall-frame-tray", 
                   "five-panel-hanger", "gable-box-art-card", "hanging-tab-display-box", "hexagonal-octagonal-box", 
                   "metallic-cardstock-box", "pillow-box-art-card", "reverse-tuck-end-rte", "sleeve-and-tray-drawer", 
                   "snap-lock-1-2-3-bottom", "straight-tuck-end-ste")
    
    "corrugated-boxes" = @("counter-display-unit-cdu", "custom-industrial-crate", "display-floor-stand", "double-wall-heavy-duty", 
                          "front-tuck-mailer", "full-color-mailer-box", "litho-laminated-luxury-box", "pizza-and-food-box", 
                          "retail-ready-packaging-rrp", "standard-shipping-box-rsc", "subscription-box")
    
    "rigid-boxes" = @("book-style-box", "circular-rigid-tube", "collapsible-rigid-box", "custom-rigid-box", "drawer-style-box",
                      "hexagonal-rigid-box", "lid-and-base-box", "magnetic-snap-box", "shoulder-and-neck-box")
    
    "gift-boxes" = @("heart-flower-box", "hexagonal-gift-box", "luxury-ribbon-tie-box", "magnetic-closure-gift-box", 
                     "round-flower-box", "side-opening-gift-box", "two-piece-gift-box", "wedding-gift-box")
    
    "kraft-paper" = @("eco-friendly-kraft-box", "kraft-mailer-box", "kraft-pillow-box", "kraft-side-opening-box",
                      "kraft-tuck-box", "kraft-tube-box", "natural-kraft-wrapper", "specialty-kraft-box")
    
    "custom-pouches" = @("biodegradable-eco-pouches", "flat-bottom-pouch", "gusseted-pouch", "stand-up-pouch",
                         "spout-pouch-with-valve", "window-pouch", "zipper-seal-pouch")
    
    "labels-and-tags" = @("die-cut-labels", "embossed-hang-tags", "foil-printed-labels", "holographic-labels",
                          "metallic-hang-tags", "roll-labels", "security-seals", "woven-labels")
    
    "premium-finish" = @("embossing-and-debossing", "holographic-and-iridescent-finish", "matte-and-gloss-lamination",
                         "metallic-ink-printing", "soft-touch-lamination", "spot-uv-and-raised-uv", "texture-and-linen-finish")
}

function ConvertFileNameToTitle {
    param([string]$fileName)
    ($fileName -replace '-', ' ' | Get-Culture).TextInfo.ToTitleCase($_)
}

function GenerateSEOHead {
    param(
        [string]$productName,
        [string]$category,
        [string]$categoryTitle,
        [string]$filePath,
        [string]$baseUrl = "https://brandsface.com"
    )
    
    # Build the breadcrumb and URL
    $relativeUrl = $filePath.Replace("d:\Main Website file\website-setup\", "").Replace("\", "/")
    $canonicalUrl = "$baseUrl/$relativeUrl"
    
    # Product-specific descriptions
    $descriptions = @{
        "auto-lock-bottom-box" = "Premium auto-lock bottom boxes for retail packaging. Secure automatic locking mechanism, no tape needed. Ideal for cosmetics, electronics, specialty foods."
        "counter-display-unit-cdu" = "Custom counter display units for point-of-sale marketing. Shelf-ready CDUs for retail environments. Maximize product visibility and impulse purchases."
        "dispenser-and-gravity-feed" = "Dispenser boxes and gravity-feed systems for retail. Auto-dispensing design reduces handling time. Perfect for small products and convenience retail."
        "gift-boxes" = "Luxury gift boxes for premium unboxing experiences. Custom sizes, magnetic closures, specialty finishes. Create memorable moments for your customers."
        "kraft-paper-boxes" = "Eco-friendly kraft paper packaging solutions. Sustainable, 100% recyclable kraft materials. Premium finishes with environmental responsibility."
        "custom-rigid-box" = "Premium rigid boxes with magnetic closures. Luxury packaging for high-end brands. Jewelry, cosmetics, electronics, and premium retail brands."
        "custom-pouches" = "Flexible pouch packaging for food, cosmetics, and e-commerce. Stand-up pouches, gusseted pouches, specialty designs with secure sealing."
        "labels-and-tags" = "Custom labels and hang tags for product branding. Roll labels, stickers, luxury tags with premium finishes and precision printing."
    }
    
    $description = $descriptions[$productName]
    if (-not $description) {
        $description = "Premium custom packaging solution manufactured in Karachi. High-quality finishes, custom designs, eco-friendly options available."
    }
    
    $seoHead = @"
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="theme-color" content="#1a4d2e">
    <meta name="description" content="$description Brand Face Packaging - Pakistan's leading custom packaging manufacturer for USA markets.">
    <meta name="keywords" content="$(ConvertFileNameToTitle $productName), $category packaging, custom boxes, packaging solutions, retail packaging">
    <meta name="author" content="Brands Face Packaging">
    <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    
    <title>$(ConvertFileNameToTitle $productName) | $categoryTitle | Brands Face Packaging</title>
    <link rel="icon" href="../../favicon.ico" type="image/x-icon">
    <link rel="canonical" href="$canonicalUrl">
    
    <!-- Open Graph / Facebook -->
    <meta property="og:title" content="$(ConvertFileNameToTitle $productName) | $categoryTitle | Brands Face">
    <meta property="og:description" content="$description">
    <meta property="og:type" content="website">
    <meta property="og:url" content="$canonicalUrl">
    <meta property="og:image" content="$baseUrl/box-mockup.png">
    <meta property="og:image:width" content="1200">
    <meta property="og:image:height" content="630">
    <meta property="og:locale" content="en_US">
    
    <!-- Twitter Card -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="$(ConvertFileNameToTitle $productName) | $categoryTitle">
    <meta name="twitter:description" content="$description">
    <meta name="twitter:image" content="$baseUrl/box-mockup.png">
    
    <!-- Structured Data (BreadcrumbList) -->
    <script type="application/ld+json">
    {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "@id": "$canonicalUrl",
        "itemListElement": [
            {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": "$baseUrl/"
            },
            {
                "@type": "ListItem",
                "position": 2,
                "name": "Products",
                "item": "$baseUrl/products/"
            },
            {
                "@type": "ListItem",
                "position": 3,
                "name": "$categoryTitle",
                "item": "$baseUrl/products/$category.html"
            },
            {
                "@type": "ListItem",
                "position": 4,
                "name": "$(ConvertFileNameToTitle $productName)",
                "item": "$canonicalUrl"
            }
        ]
    }
    </script>
    
    <!-- Structured Data (Product) -->
    <script type="application/ld+json">
    {
        "@context": "https://schema.org",
        "@type": "Product",
        "name": "$(ConvertFileNameToTitle $productName)",
        "description": "$description",
        "image": "$baseUrl/box-mockup.png",
        "brand": {
            "@type": "Brand",
            "name": "Brands Face Packaging"
        },
        "manufacturer": {
            "@type": "Organization",
            "name": "Brands Face Packaging",
            "url": "$baseUrl/",
            "address": {
                "@type": "PostalAddress",
                "addressCountry": "PK",
                "addressLocality": "Karachi"
            }
        }
    }
    </script>
"@
    
    return $seoHead
}

# Main processing loop
$baseProductPath = "d:\Main Website file\website-setup\products"

foreach ($categoryFolder in $productCategories.Keys) {
    $categoryPath = Join-Path $baseProductPath $categoryFolder
    $categoryTitle = (ConvertFileNameToTitle $categoryFolder)
    
    Write-Host "Processing category: $categoryTitle"
    
    foreach ($productName in $productCategories[$categoryFolder]) {
        $htmlFile = "$productName.html"
        $filePath = Join-Path $categoryPath $htmlFile
        
        if (Test-Path $filePath) {
            Write-Host "  Updating: $htmlFile"
            
            $content = Get-Content $filePath -Raw
            
            # Generate new SEO head
            $seoHead = GenerateSEOHead -productName $productName -category $categoryFolder -categoryTitle $categoryTitle -filePath $filePath
            
            # Replace the old head section with new SEO head
            # Pattern: from <!DOCTYPE html> to </head>, keep the stylesheet links after
            $content = $content -replace '(?s)<meta charset="UTF-8">.*?(?=<link rel="stylesheet")', $seoHead
            
            # Save the updated file
            Set-Content -Path $filePath -Value $content -Encoding UTF8
            
        } else {
            Write-Host "  ⚠ NOT FOUND: $filePath" -ForegroundColor Yellow
        }
    }
}

Write-Host "`n✓ SEO optimization complete for all product pages!"
