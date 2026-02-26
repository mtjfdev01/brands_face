# Create favicon.ico from favicon.svg using ImageMagick (magick)
# Usage: Run this script from the site root. It will write favicon.ico next to favicon.svg.
$root = Get-Location
$svg = Join-Path $root 'favicon.svg'
$ico = Join-Path $root 'favicon.ico'
if (-not (Test-Path $svg)) {
    Write-Host "favicon.svg not found at $svg. Please add favicon.svg first." -ForegroundColor Yellow
    exit 1
}
$magick = Get-Command magick -ErrorAction SilentlyContinue
if ($magick) {
    Write-Host "ImageMagick found. Generating favicon.ico..."
    magick convert $svg -define icon:auto-resize=256, 128, 64, 48, 32, 16 $ico
    if (Test-Path $ico) { Write-Host "Created $ico" -ForegroundColor Green } else { Write-Host "Failed to create $ico" -ForegroundColor Red }
}
else {
    Write-Host "ImageMagick (magick) not found. Please install ImageMagick or run this on a machine with magick available." -ForegroundColor Yellow
    Write-Host "If you prefer, I'll try to write a minimal placeholder ICO when you allow it." -ForegroundColor Yellow
    exit 2
}
