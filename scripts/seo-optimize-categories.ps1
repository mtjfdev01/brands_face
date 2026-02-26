# SEO Optimization Script for Category Pages
# This script adds comprehensive SEO metadata to all category pages

$categoryData = @{
    "corrugated-boxes.html" = @{
        "title"          = "Corrugated Boxes | Premium Custom Packaging | Brands Face"
        "description"    = "Custom corrugated boxes for shipping and retail. Durable, eco-friendly, full-color printing. Pakistan-manufactured. Perfect for e-commerce and logistics."
        "keywords"       = "corrugated boxes, shipping boxes, custom boxes, eco-friendly packaging, corrugated packaging manufacturer"
        "canonical"      = "https://brandsface.com/products/corrugated-boxes.html"
        "og:title"       = "Corrugated Boxes | Premium Custom Packaging"
        "og:description" = "Durable custom corrugated boxes for shipping and retail with eco-friendly materials and full-color printing."
    }
    "kraft-paper.html" = @{
        "title"          = "Kraft Paper Packaging | Sustainable Custom Solutions | Brands Face"
        "description"    = "Eco-friendly kraft paper packaging solutions. Sustainable, 100% recyclable, premium finishes. Custom kraft boxes and pouches manufactured in Pakistan."
        "keywords"       = "kraft paper packaging, sustainable packaging, eco-friendly boxes, kraft boxes, recycled packaging"
        "canonical"      = "https://brandsface.com/products/kraft-paper.html"
        "og:title"       = "Kraft Paper Packaging | Sustainable Custom Solutions"
        "og:description" = "Eco-friendly kraft paper packaging with premium finishes and sustainable manufacturing practices."
    }
    "gift-boxes.html" = @{
        "title"          = "Gift Boxes | Premium Custom Packaging | Brands Face"
        "description"    = "Elegant custom gift boxes for premium unboxing experiences. Luxury finishes, custom sizes, specialty papers. Perfect for retail and e-commerce brands."
        "keywords"       = "gift boxes, custom gift packaging, luxury boxes, premium packaging, unboxing experience"
        "canonical"      = "https://brandsface.com/products/gift-boxes.html"
        "og:title"       = "Gift Boxes | Premium Custom Packaging"
        "og:description" = "Elegant custom gift boxes designed for premium unboxing experiences with luxury finishes."
    }
    "custom-pouches.html" = @{
        "title"          = "Custom Pouches | Flexible Packaging Solutions | Brands Face"
        "description"    = "Custom pouches for food, cosmetics, and e-commerce. Flexible, durable, sealed. Stand-up pouches, gusseted pouches, and specialty designs available."
        "keywords"       = "custom pouches, flexible packaging, stand-up pouches, food pouches, cosmetic pouches"
        "canonical"      = "https://brandsface.com/products/custom-pouches.html"
        "og:title"       = "Custom Pouches | Flexible Packaging Solutions"
        "og:description" = "Flexible custom pouches for food, cosmetics, and e-commerce with secure sealing and custom designs."
    }
    "labels-and-tags.html" = @{
        "title"           = "Labels & Tags | Premium Custom Solutions | Brands Face"
        "description"     = "Custom labels and hang tags. Roll labels, stickers, luxury tags with premium finishes, hot foil stamping, embossing. Perfect for product branding."
        "keywords" = "custom labels, hang tags, product labels, labels and tags, label printing"
        "canonical" = "https://brandsface.com/products/labels-and-tags.html"
        "og:title" = "Labels & Tags | Premium Custom Solutions"
        "og:description" = "Custom labels and hang tags with premium finishes and precision printing for product branding."
    }
    "rigid-boxes.html"    = @{
        "title"          = "Rigid Boxes | Luxury Custom Packaging | Brands Face"
        "description"    = "Premium rigid boxes for luxury packaging. Magnetic closures, custom sizes, specialty finishes. Perfect for cosmetics, jewelry, electronics, and luxury goods."
        "keywords"       = "rigid boxes, luxury boxes, magnetic boxes, custom rigid packaging, premium boxes"
        "canonical"      = "https://brandsface.com/products/rigid-boxes.html"
        "og:title"       = "Rigid Boxes | Luxury Custom Packaging"
        "og:description" = "Premium rigid boxes with magnetic closures and luxury finishes for high-end brand packaging."
    }
    "premium-finish.html" = @{
        "title"          = "Premium Finishes | Luxury Packaging Details | Brands Face"
        "description"    = "Advanced finishing techniques: hot foil stamping, embossing, spot UV, soft-touch coating, metallic inks. Elevate your packaging with premium finishes."
        "keywords"       = "premium finishes, hot foil stamping, embossing, spot UV, soft touch, metallic printing"
        "canonical"      = "https://brandsface.com/products/premium-finish.html"
        "og:title"       = "Premium Finishes | Luxury Packaging Details"
        "og:description" = "Advanced finishing techniques including foil stamping, embossing, and specialty coatings for luxury packaging."
    }
}

function Update-CategoryPageSEO {
    param(
        [string]$filePath,
        [hashtable]$metadata
    )
    
    if (-not (Test-Path $filePath)) {
        Write-Warning "File not found: $filePath"
        return
    }
    
    $content = Get-Content $filePath -Raw
    
    # Build SEO head content
    $seoHead = @"
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="theme-color" content="#1a4d2e">
    <meta name="description" content="$($metadata['description'])">
    <meta name="keywords" content="$($metadata['keywords'])">
    <meta name="author" content="Brands Face Packaging">
    <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    
    <title>$($metadata['title'])</title>
    <link rel="icon" href="../favicon.ico" type="image/x-icon">
    <link rel="canonical" href="$($metadata['canonical'])">
    
    <!-- Open Graph / Facebook -->
    <meta property="og:title" content="$($metadata['og:title'])">
    <meta property="og:description" content="$($metadata['og:description'])">
    <meta property="og:type" content="website">
    <meta property="og:url" content="$($metadata['canonical'])">
    <meta property="og:image" content="https://brandsface.com/box-mockup.png">
    <meta property="og:image:width" content="1200">
    <meta property="og:image:height" content="630">
    <meta property="og:locale" content="en_US">
    
    <!-- Twitter Card -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="$($metadata['og:title'])">
    <meta name="twitter:description" content="$($metadata['og:description'])">
    <meta name="twitter:image" content="https://brandsface.com/box-mockup.png">
"@
    
    # Replace old head content with new SEO-optimized head
    $content = $content -replace '(?s)<meta charset="UTF-8">.*?<link rel="stylesheet" href="\.\.\/style\.css">', "$seoHead
    
    <link rel="stylesheet" href=".. / style.css">"
    
    Set-Content -Path $filePath -Value $content
    Write-Host "✓ Updated: $filePath"
}

# Update all category pages
$productsDir = "d:\Main Website file\website-setup\products"

foreach ($page in $categoryData.Keys) {
    $filePath = Join-Path $productsDir $page
    Update-CategoryPageSEO -filePath $filePath -metadata $categoryData[$page]
}

Write-Host "`n✓ Category page SEO optimization complete!"
