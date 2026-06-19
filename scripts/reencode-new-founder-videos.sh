#!/bin/bash
# Re-encode the 3 new founder videos to web-friendly size.
# Source: 2574x3218 (huge! ~4-5MB each, portrait 4:5)
# Target: 858x1072 (~1MB each, same 4:5 portrait aspect as existing)
#
# Mapping (per VLM analysis):
#   "Portfolio 1 (1).mp4"  → founder-kiran.mp4   (VLM confirmed same person)
#   "Portfolio 1 .mp4"     → founder-akshat.mp4  (beard/mustache, red wristband)
#   "Portfolio 1 (2).mp4"  → founder-pruthvi.mp4 (no facial hair, gray tie)
# Taroon video stays unchanged (per user request).

set -e
UPLOAD="/home/z/my-project/upload"
VIDEOS="/home/z/my-project/public/videos"

reencode() {
  local src="$1"
  local dst="$2"
  echo "Re-encoding: $(basename "$src") → $(basename "$dst")"
  ffmpeg -y -i "$src" \
    -vf "scale=858:1072:flags=lanczos" \
    -c:v libx264 \
    -preset medium \
    -crf 23 \
    -pix_fmt yuv420p \
    -movflags +faststart \
    -an \
    "/tmp/$(basename "$dst")"
  mv "/tmp/$(basename "$dst")" "$dst"
  echo "  ✓ $(ls -la "$dst" | awk '{print $5}') bytes"
}

# Kiran (replaces existing)
reencode "$UPLOAD/Portfolio 1  (1).mp4" "$VIDEOS/founder-kiran.mp4"

# Akshat (new)
reencode "$UPLOAD/Portfolio 1 .mp4" "$VIDEOS/founder-akshat.mp4"

# Pruthvi (new)
reencode "$UPLOAD/Portfolio 1  (2).mp4" "$VIDEOS/founder-pruthvi.mp4"

echo ""
echo "=== All founder videos now in /public/videos/ ==="
ls -la "$VIDEOS/"
