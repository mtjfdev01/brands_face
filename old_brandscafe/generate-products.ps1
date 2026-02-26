# Get the template from rigid-boxes.html
$templatePath = "d:\Main Website file\website-setup\products\rigid-boxes.html"
$template = Get-Content $templatePath -Raw

# Define product data for each category
$productData = @{
    "rigid-boxes" = @{
        "category" = "Rigid Boxes"
        "intro" = "Uncompromising strength meets effortless elegance"
        "description" = "The pinnacle of luxury packaging. Our rigid boxes are engineered for premium brands that demand the best."
        "specs" = @("Premium Materials", "Magnetic Closures", "Custom Sizes", "Finishing Options")
    }
    "corrugated-boxes" = @{
        "category" = "Corrugated"
        "intro" = "Strong, sustainable, and stunning"
        "description" = "Versatile corrugated solutions that balance protection with premium presentation for modern brands."
        "specs" = @("Durable Build", "Eco-Friendly", "Full Color Print", "Custom Design")
    }
    "kraft-paper" = @{
        "category" = "Kraft Paper"
        "intro" = "Sustainable elegance for conscious brands"
        "description" = "Eco-friendly kraft packaging that proves sustainability doesn't compromise on style."
        "specs" = @("100% Recyclable", "Natural Appeal", "Versatile Finishes", "Eco Materials")
    }
    "art-card" = @{
        "category" = "Art Card"
        "intro" = "Retail-ready packaging with artistic flair"
        "description" = "Premium art card solutions perfect for retail environments with stunning print quality."
        "specs" = @("High Print Quality", "Retail Ready", "Vibrant Colors", "Professional Finish")
    }
    "gift-boxes" = @{
        "category" = "Gift Boxes"
        "intro" = "Elevate your gifting experience"
        "description" = "Elegant gift boxes designed to create memorable unboxing moments for special occasions."
        "specs" = @("Elegant Design", "Premium Feel", "Custom Styling", "Special Occasions")
    }
    "custom-pouches" = @{
        "category" = "Custom Pouches"
        "intro" = "Flexible packaging with maximum impact"
        "description" = "Innovative pouch solutions for food, cosmetics, and e-commerce brands."
        "specs" = @("Flexible Design", "Durable Seal", "Custom Shapes", "Brand Protection")
    }
    "labels-and-tags" = @{
        "category" = "Labels & Tags"
        "intro" = "Details that tell your brand story"
        "description" = "Professional labeling solutions from roll labels to luxury hang tags for every brand need."
        "specs" = @("Multiple Formats", "Premium Finishes", "Precision Printing", "Custom Designs")
    }
    "premium-finish" = @{
        "category" = "Premium Finish"
        "intro" = "Luxury details that make brands shine"
        "description" = "Advanced finishing techniques including foil stamping, embossing, and specialty coatings."
        "specs" = @("Foil Stamping", "Embossing", "Special Effects", "Premium Coating")
    }
}

function ConvertFilenameToTitle {
    param([string]$filename)
    $name = [System.IO.Path]::GetFileNameWithoutExtension($filename)
    $title = ($name -replace '-', ' ' | Get-Culture).TextInfo.ToTitleCase($_)
    return $title
}

function GenerateSpecCards {
    param([array]$specs)
    $html = ""
    for ($i = 0; $i -lt $specs.Count; $i++) {
        $delay = 400 + ($i * 100)
        $spec = $specs[$i]
        $html += "                    <div class=`"spec-card`" data-aos=`"zoom-in`" data-aos-delay=`"$delay`">`r`n"
        $html += "                        <h4>$($spec.Split(' ')[0])</h4><p>$spec</p>`r`n"
        $html += "                    </div>`r`n"
    }
    return $html
}

# Get all directories
$directories = @(
    "d:\Main Website file\website-setup\products\rigid-boxes",
    "d:\Main Website file\website-setup\products\corrugated-boxes",
    "d:\Main Website file\website-setup\products\kraft-paper",
    "d:\Main Website file\website-setup\products\art-card",
    "d:\Main Website file\website-setup\products\gift-boxes",
    "d:\Main Website file\website-setup\products\custom-pouches",
    "d:\Main Website file\website-setup\products\labels-and-tags",
    "d:\Main Website file\website-setup\products\premium-finish"
)

$count = 0

foreach ($dir in $directories) {
    $folderName = Split-Path $dir -Leaf
    $catData = $productData[$folderName]
    
    Get-ChildItem -Path $dir -Filter "*.html" | ForEach-Object {
        $filename = $_.Name
        $productTitle = ConvertFilenameToTitle $filename
        $filePath = $_.FullName
        
        # Generate spec cards for this product
        $specCards = GenerateSpecCards $catData.specs
        
        # Replace template content
        $newContent = $template
        
        # Replace title and meta
        $newContent = $newContent -replace 'Custom Rigid Boxes \| Brands Face Packaging', "$productTitle | $($catData.category) | Brands Face Packaging"
        $newContent = $newContent -replace '<span class="badge"[^>]*>[^<]*</span>', "<span class=`"badge`">$($catData.category)</span>"
        $newContent = $newContent -replace '<h1[^>]*>[^<]*</h1>', "<h1>$productTitle</h1>"
        $newContent = $newContent -replace 'Uncompromising strength meets effortless elegance\..*?<\/p>', "Uncompromising quality for $($catData.category.ToLower()) brands. $($catData.intro)</p>"
        
        # Replace spec cards
        $oldSpecPattern = '<div class="spec-card"[^>]*>.*?(?=<\/div>\s*<div class="details-content")'
        $newContent = $newContent -replace $oldSpecPattern, $specCards
        
        # Replace description
        $newContent = $newContent -replace 'Rigid boxes, also known as set-up boxes,.*?for luxury\.', $catData.description
        
        # Save the new file
        Set-Content -Path $filePath -Value $newContent -Encoding UTF8
        Write-Host " Updated: $filename"
        $count++
    }
}

Write-Host "`nCompleted: $count files updated successfully!"
