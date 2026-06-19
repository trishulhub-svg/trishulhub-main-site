#!/bin/bash
# Re-encode 4 decorative videos to small, web-friendly size.
# - All videos: 480px wide, 24fps, ~8s loop, H.264, yuv420p, faststart
# - Solid black backgrounds (perfect for mix-blend-mode: screen transparency)
# - Target size: 200-500KB each
set -e
SRC=/home/z/my-project/upload
DST=/home/z/my-project/public/videos/decor
mkdir -p "$DST"

# Common encoding options
# -vf "scale=480:-2" — 480px wide, height auto (multiple of 2 for yuv420p)
# -r 24 — 24fps (matches the slowest video)
# -t 8 — cap duration at 8s for consistent loop length
# -an — drop audio (decorative, no sound needed)
# -movflags +faststart — web-optimized MP4
# -crf 30 — higher = smaller file (28-32 is good for small decorative clips)
# -preset veryfast — faster encode, slightly larger file
ENCODE_OPTS=(-t 8 -an -r 24 -vf "scale=480:-2,format=yuv420p" -c:v libx264 -profile:v baseline -level 3.1 -pix_fmt yuv420p -crf 30 -preset veryfast -movflags +faststart)

echo "==> [1/4] Firefly TH logo (rotating 3D)"
ffmpeg -y -i "$SRC/firefly-logo-360.mp4" \
  "${ENCODE_OPTS[@]}" \
  "$DST/logo-th-rotate.mp4" 2>&1 | tail -2

echo "==> [2/4] Vision board (iridescent cubes)"
ffmpeg -y -i "$SRC/klickpin-vision.mp4" \
  "${ENCODE_OPTS[@]}" \
  "$DST/vision-cubes.mp4" 2>&1 | tail -2

echo "==> [3/4] Gift ideas (serpentine glass)"
ffmpeg -y -i "$SRC/klickpin-gift.mp4" \
  "${ENCODE_OPTS[@]}" \
  "$DST/gift-glass.mp4" 2>&1 | tail -2

echo "==> [4/4] Birthday decor (metallic ring)"
ffmpeg -y -i "$SRC/klickpin-birthday.mp4" \
  "${ENCODE_OPTS[@]}" \
  "$DST/birthday-ring.mp4" 2>&1 | tail -2

echo ""
echo "==> Final file sizes:"
ls -lh "$DST"/*.mp4
