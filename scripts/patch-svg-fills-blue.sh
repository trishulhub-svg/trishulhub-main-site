#!/bin/bash
# Patch all tech-stack SVG logos to use a hardcoded theme-blue fill.
#
# The previous approach used `fill="currentColor"` on the SVG root, expecting
# the parent CSS `color` to cascade into the SVG. THIS DOES NOT WORK for SVGs
# loaded via <img src="*.svg"> — the <img> element is a replaced element that
# renders the SVG as an opaque image; CSS color/fill on the parent does NOT
# propagate into the SVG document inside the <img>.
#
# The only reliable way to recolor SVGs loaded through <img> is to set the
# fill color directly inside the SVG file itself. So we replace
#   fill="currentColor"  →  fill="#00DEFF"
# in every logo file.
#
# Theme blue: #00DEFF (electric cyan, the TrishulHub accent color).

set -e
LOGO_DIR="/home/z/my-project/public/images/logos"
count=0
for svg in "$LOGO_DIR"/*.svg; do
  if grep -q 'fill="currentColor"' "$svg"; then
    sed -i 's/fill="currentColor"/fill="#00DEFF"/g' "$svg"
    count=$((count + 1))
    echo "  patched: $(basename "$svg")"
  fi
done
echo "Done. Patched $count files."
echo "---"
echo "Verification (first 3 lines of react.svg):"
head -3 "$LOGO_DIR/react.svg"
