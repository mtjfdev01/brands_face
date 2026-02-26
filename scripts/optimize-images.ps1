# Image optimization helper for Windows (requires ImageMagick)
# Usage: Open PowerShell in repository root and run: .\scripts\optimize-images.ps1 -MaxWidth 1200 -Quality 85 -SizeKBThreshold 100
param(
    [int]$MaxWidth = 1200,
    [int]$Quality = 85,
    [int]$SizeKBThreshold = 100
)

$repoRoot = Split-Path -Parent $MyInvocation.MyCommand.Definition
$images = Get-ChildItem -Path $repoRoot -Recurse -Include *.png, *.jpg, *.jpeg -File | Where-Object { [math]::Round($_.Length / 1KB, 2) -ge $SizeKBThreshold }

if (-not (Get-Command magick -ErrorAction SilentlyContinue)) {
    Write-Error "ImageMagick 'magick' not found. Install ImageMagick and ensure 'magick' is in PATH."
    return
}

$optDir = Join-Path $repoRoot "optimized-images"
if (-not (Test-Path $optDir)) { New-Item -ItemType Directory -Path $optDir | Out-Null }

foreach ($img in $images) {
    $relPath = $img.FullName.Substring($repoRoot.Length).TrimStart('\') -replace '\\', '/' 
    $baseName = [IO.Path]::GetFileNameWithoutExtension($img.Name)
    $outWebP = Join-Path $optDir ($baseName + ".webp")

    Write-Host "Optimizing: $relPath -> $(Split-Path $outWebP -Leaf) (max width $MaxWidth, quality $Quality)"

    # Convert and resize while preserving aspect ratio
    magick "$($img.FullName)" -resize ${MaxWidth}x -quality $Quality -define webp:method=6 "$outWebP"
}

Write-Host "Optimization complete. Optimized images are in: $optDir"
Write-Host "Next steps: review optimized images and update HTML <img> src/srcset to point to optimized files or serve via CDN."