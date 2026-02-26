$dirs = Get-ChildItem -Path 'products' -Directory
foreach ($d in $dirs) {
    $files = Get-ChildItem -Path (Join-Path $d.FullName '*.html') -File -ErrorAction SilentlyContinue
    foreach ($f in $files) {
        $content = Get-Content $f.FullName -Raw
        if ($content -notmatch 'navbar\.js') {
            $new = $content -replace '(</body>)', '    <script src="../../navbar.js"></script>`n$1'
            Set-Content -Path $f.FullName -Value $new -Encoding UTF8
            Write-Host "Added navbar to $($f.FullName)"
        }
        elseif ($content -match 'src=\"\.\./navbar\.js\"') {
            $new = $content -replace 'src=\"\.\./navbar\.js\"', 'src=\"../../navbar.js\"'
            Set-Content -Path $f.FullName -Value $new -Encoding UTF8
            Write-Host "Fixed path $($f.FullName)"
        }
    }
}
Write-Host "Done."