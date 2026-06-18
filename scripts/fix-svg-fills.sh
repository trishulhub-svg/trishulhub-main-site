#!/usr/bin/env bash
# Add fill="currentColor" to all simple-icons SVGs so they inherit text color
# (simple-icons SVGs come without fill attribute = black by default, invisible on dark bg)

set -e
LOGO_DIR="/home/z/my-project/public/images/logos"

for svg in "$LOGO_DIR"/*.svg; do
  name=$(basename "$svg")
  # If the <svg> tag has no fill attribute, inject fill="currentColor"
  if ! grep -q '<svg[^>]*fill=' "$svg"; then
    sed -i 's|<svg |<svg fill="currentColor" |' "$svg"
  fi
  # Also strip any explicit fill="black" on path elements (defensive)
  sed -i 's|fill="black"||g' "$svg"
  # Strip xmlns:xlink if present (harmless but cleaner)
  echo "Patched: $name"
done

echo "---"
echo "Sample after patching (react.svg first 300 chars):"
head -c 300 "$LOGO_DIR/react.svg"
