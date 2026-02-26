# PowerShell script to inject navbar.js into all product HTML files

$productsDir = 'd:\Main Website file\Website- setup\products'

# Files that already have navbar.js
$filesWithNavbar = @(
    'products\rigid-boxes.html',
    'products\kraft-paper.html',
    'products\art-card.html',
    'products\rigid-boxes\magnetic-snap-box.html',
    'products\corrugated-boxes.html'
)

# Get all HTML files
$allHtmlFiles = Get-ChildItem -Path $productsDir -Filter '*.html' -Recurse -File

$totalFiles = $allHtmlFiles.Count
Write-Host "Total HTML files found: $totalFiles" -ForegroundColor Cyan

$filesToUpdate = @()
$alreadyHasNavbar = @()

# Check which files have navbar.js
foreach ($file in $allHtmlFiles) {
    $content = Get-Content -Path $file.FullName -Raw
    
    if ($content -match 'navbar\.js') {
        $alreadyHasNavbar += $file.FullName
    } else {
        $filesToUpdate += $file.FullName
    }
}

Write-Host "Files with navbar.js: $($alreadyHasNavbar.Count)" -ForegroundColor Green
Write-Host "Files without navbar.js: $($filesToUpdate.Count)" -ForegroundColor Yellow
Write-Host ""

# Update files
$successfulUpdates = 0
$errors = @()
$updatedFiles = @()

foreach ($filePath in $filesToUpdate) {
    try {
        $content = Get-Content -Path $filePath -Raw
        
        # Find the </body> tag
        $bodyTagPos = $content.LastIndexOf('</body>')
        
        if ($bodyTagPos -eq -1) {
            $errors += "$filePath : No </body> tag found"
            continue
        }
        
        # Determine the correct path based on file depth
        $relativePath = [System.IO.Path]::GetRelativePath($productsDir, $filePath)
        
        # Count the depth: if it contains a backslash, it's in a subdirectory
        if ($relativePath -match '\\') {
            # File is in a subdirectory (e.g., art-card\gable-box.html)
            $scriptSrc = '../navbar.js'
        } else {
            # File is directly in products folder (e.g., premium-finish.html)
            $scriptSrc = './navbar.js'
        }
        
        # Create the script tag
        $scriptTag = "`n`t<script src=""$scriptSrc""></script>"
        
        # Insert before </body>
        $newContent = $content.Substring(0, $bodyTagPos) + $scriptTag + "`n" + $content.Substring($bodyTagPos)
        
        # Write the updated content
        Set-Content -Path $filePath -Value $newContent -Encoding UTF8
        
        $successfulUpdates++
        $updatedFiles += $relativePath
        
    } catch {
        $errors += "$filePath : $($_.Exception.Message)"
    }
}

# Print summary
Write-Host "========== SUMMARY ==========" -ForegroundColor Cyan
Write-Host ""
Write-Host "Total files found: $totalFiles"
Write-Host "Files with navbar.js: $($alreadyHasNavbar.Count)"
Write-Host "Files missing navbar.js: $($filesToUpdate.Count)"
Write-Host "Successfully updated: $successfulUpdates"
Write-Host ""

if ($updatedFiles.Count -gt 0) {
    Write-Host "========== UPDATED FILES ==========" -ForegroundColor Green
    Write-Host ""
    foreach ($file in ($updatedFiles | Sort-Object)) {
        Write-Host "✓ $file"
    }
    Write-Host ""
}

if ($errors.Count -gt 0) {
    Write-Host "========== ERRORS ==========" -ForegroundColor Red
    Write-Host ""
    foreach ($error in $errors) {
        Write-Host "✗ $error"
    }
    Write-Host ""
}

Write-Host "========== END SUMMARY ==========" -ForegroundColor Cyan
Write-Host ""
