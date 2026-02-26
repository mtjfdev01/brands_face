# SEO Optimization for All Product Pages

function ConvertFileNameToTitle {
    param([string]$fileName)
    ($fileName -replace '-', ' ' | Get-Culture).TextInfo.ToTitleCase($_)
}

function GenerateSEOHead {
    param(
        [string]$productName,
        [string]$category,
        [string]$categoryTitle,
        [string]$filePath
    )
    
    $baseUrl = "https://brandsface.com"
    $relativeUrl = $filePath.Replace("d:\Main Website file\website-setup\", "").Replace("\", "/")
    $canonicalUrl = "$baseUrl/$relativeUrl"
    
    $descriptions = @{
        "auto-lock-bottom-box" = "Premium auto-lock bottom boxes for retail packaging. Secure automatic locking, no tape needed."
        "counter-display-unit-cdu" = "Custom counter display units for point-of-sale marketing. Retail shelf-ready displays."
        "dispenser-and-gravity-feed" = "Dispenser boxes and gravity-feed systems. Auto-dispensing reduces handling time."
        "double-wall-frame-tray" = "Premium double-wall frame trays with professional finishes for retail display."
        "custom-rigid-box" = "Premium rigid boxes with magnetic closures for luxury packaging."
        "custom-pouches" = "Flexible pouch packaging for food, cosmetics, and e-commerce brands."
        "labels-and-tags" = "Custom labels and hang tags with premium finishes and precision printing."
    }
    
    $description = $descriptions[$productName]
    if (-not $description) {
        $description = "Premium custom packaging solution. High-quality finishes and custom designs from Pakistan's leading manufacturer."
    }
    
    $productTitle = ConvertFileNameToTitle $productName
    
    $seoHead = "<meta charset=`"UTF-8`">`r`n"
    $seoHead += "    <meta name=`"viewport`" content=`"width=device-width, initial-scale=1.0`">`r`n"
    $seoHead += "    <meta name=`"theme-color`" content=`"#1a4d2e`">`r`n"
    $seoHead += "    <meta name=`"description`" content=`"$description Brand Face Packaging - Custom packaging from Karachi.`">`r`n"
    $seoHead += "    <meta name=`"keywords`" content=`"$productName, $category packaging, custom boxes, packaging solutions`">`r`n"
    $seoHead += "    <meta name=`"author`" content=`"Brands Face Packaging`">`r`n"
    $seoHead += "    <meta name=`"robots`" content=`"index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1`">`r`n"
    $seoHead += "    <meta http-equiv=`"X-UA-Compatible`" content=`"IE=edge`">`r`n"
    $seoHead += "    `r`n"
    $seoHead += "    <title>$productTitle | $categoryTitle | Brands Face</title>`r`n"
    $seoHead += "    <link rel=`"icon`" href=`"../../favicon.ico`" type=`"image/x-icon`">`r`n"
    $seoHead += "    <link rel=`"canonical`" href=`"$canonicalUrl`">`r`n"
    $seoHead += "    `r`n"
    $seoHead += "    <!-- Open Graph -->`r`n"
    $seoHead += "    <meta property=`"og:title`" content=`"$productTitle | $categoryTitle`">`r`n"
    $seoHead += "    <meta property=`"og:description`" content=`"$description`">`r`n"
    $seoHead += "    <meta property=`"og:type`" content=`"website`">`r`n"
    $seoHead += "    <meta property=`"og:url`" content=`"$canonicalUrl`">`r`n"
    $seoHead += "    <meta property=`"og:image`" content=`"$baseUrl/box-mockup.png`">`r`n"
    $seoHead += "    <meta property=`"og:image:width`" content=`"1200`">`r`n"
    $seoHead += "    <meta property=`"og:image:height`" content=`"630`">`r`n"
    $seoHead += "    `r`n"
    $seoHead += "    <!-- Twitter Card -->`r`n"
    $seoHead += "    <meta name=`"twitter:card`" content=`"summary_large_image`">`r`n"
    $seoHead += "    <meta name=`"twitter:title`" content=`"$productTitle | $categoryTitle`">`r`n"
    $seoHead += "    <meta name=`"twitter:description`" content=`"$description`">`r`n"
    $seoHead += "    `r`n"
    $seoHead += "    <!-- Structured Data -->`r`n"
    $seoHead += "    <script type=`"application/ld+json`">`r`n"
    $seoHead += "    {`r`n"
    $seoHead += "        `"@context`": `"https://schema.org`",`r`n"
    $seoHead += "        `"@type`": `"BreadcrumbList`",`r`n"
    $seoHead += "        `"itemListElement`": [`r`n"
    $seoHead += "            { `"@type`": `"ListItem`", `"position`": 1, `"name`": `"Home`", `"item`": `"$baseUrl/`" },`r`n"
    $seoHead += "            { `"@type`": `"ListItem`", `"position`": 2, `"name`": `"Products`", `"item`": `"$baseUrl/products/`" },`r`n"
    $seoHead += "            { `"@type`": `"ListItem`", `"position`": 3, `"name`": `"$categoryTitle`", `"item`": `"$baseUrl/products/$category.html`" },`r`n"
    $seoHead += "            { `"@type`": `"ListItem`", `"position`": 4, `"name`": `"$productTitle`", `"item`": `"$canonicalUrl`" }`r`n"
    $seoHead += "        ]`r`n"
    $seoHead += "    }`r`n"
    $seoHead += "    </script>`r`n"
    
    return $seoHead
}

# Process all product categories
$baseDir = "d:\Main Website file\website-setup\products"
$processed = 0
$errors = 0

$categories = @("art-card", "corrugated-boxes", "rigid-boxes", "gift-boxes", "kraft-paper", "custom-pouches", "labels-and-tags", "premium-finish")

foreach ($category in $categories) {
    $catDir = Join-Path $baseDir $category
    
    if (Test-Path $catDir) {
        $files = Get-ChildItem -Path $catDir -Filter "*.html" -File
        
        foreach ($file in $files) {
            try {
                $content = Get-Content $file.FullName -Raw -Encoding UTF8
                $productName = $file.BaseName
                $categoryTitle = (ConvertFileNameToTitle $category)
                
                # Generate new head
                $newHead = GenerateSEOHead -productName $productName -category $category -categoryTitle $categoryTitle -filePath $file.FullName
                
                # Replace meta/title section
                $pattern = '(?s)<meta charset="UTF-8">.*?(?=<link rel="stylesheet")'
                $content = $content -replace $pattern, $newHead
                
                Set-Content -Path $file.FullName -Value $content -Encoding UTF8
                
                Write-Host "Updated: $($file.BaseName)"
                $processed++
            }
            catch {
                Write-Host "ERROR: $($file.Name) - $($_.Exception.Message)"
                $errors++
            }
        }
    }
}

Write-Host ""
Write-Host "Complete! Processed: $processed files, Errors: $errors"
