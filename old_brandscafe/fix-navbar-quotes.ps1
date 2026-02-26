Get-ChildItem -Path 'products' -Directory | ForEach-Object {
    Get-ChildItem -Path (Join-Path $_.FullName '*.html') -File | ForEach-Object {
        $file = $_
        $content = Get-Content $file.FullName -Raw
        $original = $content
        
        # Fix escaped quotes patterns
        $content = $content -replace 'src=\\"[^"]*navbar\.js\\"', 'src="../../navbar.js"'
        $content = $content -replace 'src="\.\.\/navbar\.js"', 'src="../../navbar.js"'
        
        if ($content -ne $original) {
            Set-Content -Path $file.FullName -Value $content -Encoding UTF8
            Write-Host "Fixed: $($file.Name)"
        }
    }
}
Write-Host "Done"
