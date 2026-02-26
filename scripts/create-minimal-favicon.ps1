# Create a minimal placeholder favicon.ico
$ico = Join-Path (Get-Location) 'favicon.ico'

# Minimal ICO file (16x16, 1-bit) - 94 bytes total
# ICO header (6 bytes): reserved (0,0), type (1,0), count (1,0)
# Image directory entry (16 bytes): width, height, colors, reserved, planes (1,0), bpp (1,0), size, offset
# Minimal 16x16 bitmap data (70 bytes) with AND and XOR masks
$icoData = @(
    0x00, 0x00,             # Reserved
    0x01, 0x00,             # Type = 1 (Icon)
    0x01, 0x00,             # Count = 1
    0x10,                   # Width = 16
    0x10,                   # Height = 16
    0x00,                   # Color count = 0 (no palette)
    0x00,                   # Reserved
    0x01, 0x00,             # Color planes = 1
    0x01, 0x00,             # Bits per pixel = 1
    0x48, 0x00, 0x00, 0x00, # Size of image data = 72 bytes
    0x16, 0x00, 0x00, 0x00  # Offset = 22 bytes (header + directory)
)

# Minimal 16x16 monochrome image (72 bytes): 32 bytes AND mask + 40 bytes XOR mask
# Simple pattern: white background with a green square in the corner
$imageData = @(
    # AND mask (transparency): 32 bytes (16 rows x 2 bytes ea, 1=transparent, 0=opaque)
    0x00, 0x00,  # Row 0: opaque
    0x00, 0x00,  # Row 1: opaque
    0x00, 0x00,  # Row 2: opaque
    0x00, 0x00,  # Row 3: opaque
    0x00, 0x00,  # Row 4: opaque
    0x00, 0x00,  # Row 5: opaque
    0x00, 0x00,  # Row 6: opaque
    0x00, 0x00,  # Row 7: opaque
    0x00, 0x00,  # Row 8: opaque
    0x00, 0x00,  # Row 9: opaque
    0x00, 0x00,  # Row 10: opaque
    0x00, 0x00,  # Row 11: opaque
    0x00, 0x00,  # Row 12: opaque
    0x00, 0x00,  # Row 13: opaque
    0x00, 0x00,  # Row 14: opaque
    0x00, 0x00,  # Row 15: opaque
    # XOR mask (image): 40 bytes (16 rows x 2.5 bytes ea, padded)
    0xFF, 0xFF, 0xC0,  # Row 0: white with green corner
    0xFF, 0xFF, 0xC0,  # Row 1
    0xFF, 0xFF, 0xC0,  # Row 2
    0xFF, 0xFF, 0xC0,  # Row 3
    0xFF, 0xFF, 0xC0,  # Row 4
    0xFF, 0xFF, 0xC0,  # Row 5
    0xFF, 0xFF, 0xC0,  # Row 6
    0xFF, 0xFF, 0xC0,  # Row 7
    0xFF, 0xFF, 0xC0,  # Row 8
    0xFF, 0xFF, 0xC0,  # Row 9
    0xFF, 0xFF, 0xC0,  # Row 10
    0xFF, 0xFF, 0xC0,  # Row 11
    0xFF, 0xFF, 0xC0,  # Row 12
    0xFF, 0xFF, 0xC0,  # Row 13
    0xFF, 0xFF, 0xC0,  # Row 14
    0xFF, 0xFF, 0xC0   # Row 15
)

$allData = $icoData + $imageData
[byte[]]$bytes = $allData
[System.IO.File]::WriteAllBytes($ico, $bytes)
Write-Host "Created minimal favicon.ico at $ico" -ForegroundColor Green
