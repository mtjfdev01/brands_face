# Script to add navbar.js to all product pages
$allPages = Get-ChildItem -Path 'products' -Filter '*.html' -Recurse -ErrorAction SilentlyContinue
$missingNavbar = @()

foreach ($file in $allPages) {
    $content = Get-Content $file.FullName -Raw
    if ($content -notmatch 'navbar\.js') {
        $missingNavbar += $file.FullName
    }
}

Write-Host "Pages missing navbar.js: $($missingNavbar.Count)"
Write-Host ""

$successCount = 0
foreach ($filePath in $missingNavbar) {
    $content = Get-Content $filePath -Raw
    
    # Determine correct path based on folder depth
    if ($filePath -like '*\*\*') {
        # Sub-product page (products\category\product.html)
        $navbarScript = '    <script src="../navbar.js"></script>'
    } else {
        # Category page (products\category.html)
        $navbarScript = '    <script src="./navbar.js"></script>'
    }
    
    # Add navbar.js script before closing body tag
    if ($content -match '</body>') {
        $newContent = $content -replace '(</body>)', "$navbarScript`n`$1"
        Set-Content -Path $filePath -Value $newContent -Encoding UTF8
        $successCount++
        
        $relPath = $filePath -replace '^', '..\'
        Write-Host "✓ $relPath"
    }
}

Write-Host ""
Write-Host "✓ Successfully updated: $successCount pages"
