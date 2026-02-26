# Fixed SEO Optimization Script for Product Pages

function ConvertToTitleCase {
    param([string]$text)
    $textinfo = (Get-Culture).TextInfo
    $textinfo.ToTitleCase($text.ToLower())
}

$baseDir = "d:\Main Website file\website-setup\products"
$processed = 0

$categories = @{
    "art-card" = "Art Card"
    "corrugated-boxes" = "Corrugated Boxes"
    "rigid-boxes" = "Rigid Boxes"
    "gift-boxes" = "Gift Boxes"
    "kraft-paper" = "Kraft Paper"
    "custom-pouches" = "Custom Pouches"
    "labels-and-tags" = "Labels & Tags"
    "premium-finish" = "Premium Finishes"
}

foreach ($category in $categories.Keys) {
    $catDir = Join-Path $baseDir $category
    $categoryTitle = $categories[$category]
    
    if (Test-Path $catDir) {
        $files = Get-ChildItem -Path $catDir -Filter "*.html" -File
        
        foreach ($file in $files) {
            try {
                $content = Get-Content $file.FullName -Raw -Encoding UTF8
                $productNameRaw = $file.BaseName
                $productName = ConvertToTitleCase ($productNameRaw -replace '-', ' ')
                
                # Construct proper canonical URL
                $relativePath = "products/$category/$($file.Name)"
                $canonicalUrl = "https://brandsface.com/$relativePath"
                
                # Extract existing description if present, or create new one
                $descMatch = [regex]::Match($content, 'meta name="description" content="([^"]+)"')
                $description = if ($descMatch.Success) { $descMatch.Groups[1].Value } else { "Premium $categoryTitle - Custom packaging solution. High-quality manufacturing from Karachi, Pakistan." }
                
                # Build proper title
                $titleContent = "$productName | $categoryTitle | Brands Face"
                
                # Fix all the problematic sections
                $content = $content -replace 'name="description" content="[^"]*"', "name=`"description`" content=`"$description`""
                $content = $content -replace '<title>[^<]*</title>', "<title>$titleContent</title>"
                
                # Fix Open Graph and Twitter titles
                $content = $content -replace 'property="og:title" content="[^"]*"', "property=`"og:title`" content=`"$productName | $categoryTitle`""
                $content = $content -replace 'name="twitter:title" content="[^"]*"', "name=`"twitter:title`" content=`"$productName | $categoryTitle`""
                
                # Fix canonical link
                $content = $content -replace 'rel="canonical" href="[^"]*"', "rel=`"canonical`" href=`"$canonicalUrl`""
                
                # Fix og:url
                $content = $content -replace 'property="og:url" content="[^"]*"', "property=`"og:url`" content=`"$canonicalUrl`""
                
                # Fix breadcrumb JSON - more complex pattern
                $breadcrumbPattern = '"itemListElement": \[[\s\S]*?\]'
                $breadcrumbReplace = @"
"itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://brandsface.com/" },
            { "@type": "ListItem", "position": 2, "name": "Products", "item": "https://brandsface.com/products/" },
            { "@type": "ListItem", "position": 3, "name": "$categoryTitle", "item": "https://brandsface.com/products/$category.html" },
            { "@type": "ListItem", "position": 4, "name": "$productName", "item": "$canonicalUrl" }
        ]
"@
                
                $content = $content -replace $breadcrumbPattern, $breadcrumbReplace
                
                Set-Content -Path $file.FullName -Value $content -Encoding UTF8
                Write-Host "Fixed: $($file.BaseName)"
                $processed++
            }
            catch {
                Write-Host "ERROR: $($file.Name) - $($_.Exception.Message)"
            }
        }
    }
}

Write-Host ""
Write-Host "Completed! Fixed $processed files"
