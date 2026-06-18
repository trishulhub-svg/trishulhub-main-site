#!/bin/bash
# Re-encode the hero background video to a browser-friendly size.
# Original: 4048x2048 (5.3MB, 4.7s) — too large for many browsers to
# decode reliably, causing mid-playback errors that hide the video.
# Target: 1920x972 (H.264, ~1MB) — same 2:1 aspect, smooth decoding.

set -e
SRC="/home/z/my-project/public/videos/hero-bg.mp4"
TMP="/home/z/my-project/scripts/hero-bg-reencoded.mp4"

# Re-encode with H.264, faststart for progressive loading, CRF 23 (good quality)
ffmpeg -y -i "$SRC" \
  -vf "scale=1920:972:flags=lanczos" \
  -c:v libx264 \
  -preset medium \
  -crf 23 \
  -pix_fmt yuv420p \
  -movflags +faststart \
  -an \
  "$TMP"

# Replace original with re-encoded version
mv "$TMP" "$SRC"

echo "Done. New file:"
ls -la "$SRC"
ffprobe -v error -select_streams v:0 -show_entries stream=width,height,duration -of csv=p=0 "$SRC"
