#!/usr/bin/env bash
# Convert hero-bg.mp4 to a highly optimized GIF.
# The hero video plays behind heavy dark overlays (z-[5] gradients + z-[6]
# radial glow in hero.tsx), so most of the photo-real detail is invisible.
# We can safely drop to 480px @ 8fps and still look great.
set -euo pipefail

SRC="/home/z/my-project/public/videos/hero-bg.mp4"
PALETTE="/tmp/hero-palette.png"
OUT_GIF="/home/z/my-project/public/videos/hero-bg.gif"

# 480px wide, 8fps — about half the byte size of 640/10 while looking
# essentially identical behind the hero's overlay stack.
VF="fps=8,scale=480:-1:flags=lanczos"

echo "Step 1/2: generating palette..."
ffmpeg -y -v error -i "$SRC" \
  -vf "$VF,palettegen=stats_mode=diff" \
  "$PALETTE"

echo "Step 2/2: encoding GIF with palette..."
ffmpeg -y -v error -i "$SRC" -i "$PALETTE" \
  -lavfi "$VF [x]; [x][1:v] paletteuse=dither=bayer:bayer_scale=5:diff_mode=rectangle" \
  "$OUT_GIF"

echo "Done."
echo "Source MP4:"; ls -lh "$SRC"
echo "Output GIF:"; ls -lh "$OUT_GIF"
