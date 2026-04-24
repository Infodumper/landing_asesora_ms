from PIL import Image, ImageOps
import numpy as np
import os

input_path = r'c:\TGPN\landing_asesora_ms\assets\img\menu_icons\talleres_raw.png'
output_path = r'c:\TGPN\landing_asesora_ms\assets\img\menu_icons\ico_talleres_fixed.png'

img = Image.open(input_path).convert('RGBA')
gray = ImageOps.grayscale(img)
data = np.array(gray)

# Threshold to get clean alpha
alpha_data = np.where(data > 60, 255, 0).astype(np.uint8)
alpha_mask = Image.fromarray(alpha_data)

# Create pure white lines
final_img = Image.new('RGBA', img.size, (255, 255, 255, 255))
final_img.putalpha(alpha_mask)

# Crop
bbox = final_img.getbbox()
if bbox:
    final_img = final_img.crop(bbox)

# Reduce padding even more to make the icon another 5% larger
# Previous was 0.15, now using 0.1 for maximum prominence
w, h = final_img.size
padding = int(max(w, h) * 0.1)
canvas_size = (w + padding*2, h + padding*2)
canvas = Image.new('RGBA', canvas_size, (0, 0, 0, 0))
canvas.paste(final_img, (padding, padding))

canvas.save(output_path)
print(f"Success: {output_path} updated with another 5% increase (10% total padding)")
