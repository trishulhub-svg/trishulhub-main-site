#!/usr/bin/env python3
"""Crop and analyze the top-left area of the services screenshot to find the cubes video."""
from PIL import Image

img = Image.open('/home/z/my-project/download/preview/services-bottom.png')
print(f"Full image size: {img.size}")

# Crop top-left 250x300 area (where the video actually is, per DOM measurements)
w, h = img.size
crop = img.crop((0, 0, 250, 300))
crop.save('/home/z/my-project/scripts/video-samples/services-tl.png')

# Sample some pixels
print("\nSampled pixels in top-left area (R, G, B):")
for y in range(20, 300, 30):
    for x in range(20, 250, 30):
        px = crop.getpixel((x, y))
        print(f"  ({x:3d},{y:3d}): RGB={px}")

# Find brightest pixels
brightest = (0, 0, 0)
bright_count = 0
for y in range(crop.height):
    for x in range(crop.width):
        r, g, b = crop.getpixel((x, y))[:3]
        brightness = (r + g + b) / 3
        if brightness > 80:
            bright_count += 1
            if brightness > brightest[2]:
                brightest = (x, y, brightness)

print(f"\nBrightest pixel in area: x={brightest[0]}, y={brightest[1]}, brightness={brightest[2]:.1f}")
print(f"Total pixels brighter than 80: {bright_count} out of {crop.width * crop.height}")
