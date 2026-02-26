# Update all product HTML files with enhanced SEO and loading animation
$productDir = "d:\Main Website file\website-setup\products"
$loaderCSS = @'
    <!-- Loading Animation Styles -->
    <style>
        #page-loader {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(135deg, #1a4d2e 0%, #0f3620 100%);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 9999;
            opacity: 1;
        }

        .loader-spinner {
            position: relative;
            width: 50px;
            height: 50px;
        }

        .loader-spinner::after {
            content: "";
            position: absolute;
            top: 0;
            left: 0;
            width: 50px;
            height: 50px;
            border: 4px solid rgba(255, 255, 255, 0.2);
            border-top: 4px solid #2ecc71;
            border-radius: 50%;
            animation: spin 0.8s linear infinite;
        }

        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }

        .loader-text {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, 80px);
            color: #2ecc71;
            font-family: "Manrope", sans-serif;
            font-size: 14px;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 2px;
            white-space: nowrap;
        }
    </style>
'@

$loaderHTML = '    <!-- Page Loading Animation -->
    <div id="page-loader">
        <div class="loader-spinner"></div>
        <div class="loader-text">Loading...</div>
    </div>
'

# Find all HTML files in products folder
# Find all HTML files in products folder
$files = Get-ChildItem -Path $productDir -Filter "*.html" -Recurse
$files | ForEach-Object {
    $filePath = $_.FullName
    $fileName = $_.Name
    
    # Skip if already updated (has loading animation)
    if (Select-String -Path $filePath -Pattern "page-loader" -Quiet) {
        Write-Host "Skipping $fileName (already updated)"
        continue
    }
    
    Write-Host "Updating $fileName..."
    
    try {
        # Read the file
        $content = Get-Content -Path $filePath -Raw
    
        # Add missing preconnect and dns-prefetch if not present
        if ($content -notmatch 'dns-prefetch.*cdnjs') {
            $content = $content -replace '(<link rel="preconnect" href="https://fonts\.googleapis\.com">)', 
            '$1
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link rel="dns-prefetch" href="https://cdnjs.cloudflare.com">'
        }
    
        # Add loading animation CSS before </head>
        if ($content -notmatch 'Loading Animation Styles') {
            $content = $content -replace '(</head>)', "`n$loaderCSS`n`$1"
        }
    
        # Add loading animation HTML after <body>
        if ($content -notmatch '<div id="page-loader">') {
            $content = $content -replace '(<body[^>]*>)', "`$1`n`n$loaderHTML"
        }
    
        # Add loading animation script before </body> if not already there
        if ($content -notmatch 'loading-animation\.js') {
            # Count how many slashes are in the path to determine the correct relative path
            $pathDepth = ($filePath -split '\\products\\').Count - 1
            $depth = ($filePath.Substring($filePath.IndexOf('\products\') + 10) -split '\\').Count - 1
        
            if ($depth -eq 0) {
                # File is directly in products folder
                $scriptPath = '<script src="../loading-animation.js"></script>'
            }
            else {
                # File is in a subfolder
                $scriptPath = '<script src="' + ('../' * ($depth + 1)) + 'loading-animation.js"></script>'
            }
        
            $content = $content -replace '(</body>)', "`n    $scriptPath`n`$1"
        }
    
        # Write back the file
        Set-Content -Path $filePath -Value $content -Encoding UTF8
        Write-Host "✓ Updated $fileName"
    }
    catch {
        Write-Host "Error updating $fileName : $_"
    }
}

Write-Host "All product pages processed!"
