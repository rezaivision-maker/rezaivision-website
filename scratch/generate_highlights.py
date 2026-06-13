import os
import math
from PIL import Image, ImageDraw, ImageFilter, ImageFont

def create_gold_gradient(width, height):
    # Brand colors
    color_a = (166, 124, 69)   # #A67C45 (Darker Gold)
    color_b = (200, 164, 107)  # #C8A46B (Brand Gold)
    color_c = (229, 199, 139)  # #E5C78B (Lighter Gold)
    
    # Create a small gradient canvas to avoid slow loops
    grad_small = Image.new("RGB", (256, 256))
    for y in range(256):
        for x in range(256):
            t = (x + y) / 510.0
            if t < 0.5:
                factor = t / 0.5
                r = int(color_a[0] + (color_b[0] - color_a[0]) * factor)
                g = int(color_a[1] + (color_b[1] - color_a[1]) * factor)
                b = int(color_a[2] + (color_b[2] - color_a[2]) * factor)
            else:
                factor = (t - 0.5) / 0.5
                r = int(color_b[0] + (color_c[0] - color_b[0]) * factor)
                g = int(color_b[1] + (color_c[1] - color_b[1]) * factor)
                b = int(color_b[2] + (color_c[2] - color_b[2]) * factor)
            grad_small.putpixel((x, y), (r, g, b))
            
    return grad_small.resize((width, height), Image.Resampling.BILINEAR)

def rotate_point(x, y, cx, cy, angle_rad):
    dx = x - cx
    dy = y - cy
    rx = cx + dx * math.cos(angle_rad) - dy * math.sin(angle_rad)
    ry = cy + dx * math.sin(angle_rad) + dy * math.cos(angle_rad)
    return rx, ry

def draw_star(draw, x, y, outer_r, inner_r, fill_color, outline_color=None, width=0):
    points = []
    for i in range(10):
        r = outer_r if i % 2 == 0 else inner_r
        angle = i * math.pi / 5 - math.pi / 2
        px = x + r * math.cos(angle)
        py = y + r * math.sin(angle)
        points.append((px, py))
    draw.polygon(points, fill=fill_color, outline=outline_color, width=width)

def draw_leaf(draw, x, y, angle_deg, s):
    angle_rad = angle_deg * math.pi / 180
    base_pts = [(0, -11 * s), (5 * s, 0), (0, 11 * s), (-5 * s, 0)]
    rot_pts = []
    for px, py in base_pts:
        rx, ry = rotate_point(px, py, 0, 0, angle_rad)
        rot_pts.append((x + rx, y + ry))
    draw.polygon(rot_pts, fill=255)

def generate_highlight_icon(name, index):
    target_size = 1080
    scale = 4  # 4x Supersampling
    size = target_size * scale
    cx, cy = size // 2, size // 2
    s = scale
    
    # 1. Base dark background
    bg_color = (14, 14, 14)  # #0E0E0E
    img = Image.new("RGB", (size, size), bg_color)
    
    # 2. Add soft gold glow halo in the center
    glow = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    glow_draw = ImageDraw.Draw(glow)
    # Circle for halo
    glow_draw.ellipse([cx - 350 * s, cy - 350 * s, cx + 350 * s, cy + 350 * s], fill=(200, 164, 107, 30))
    # Smooth Gaussian blur for the glow
    glow = glow.filter(ImageFilter.GaussianBlur(radius=45 * s))
    img.paste(glow, (0, 0), glow)
    
    # 3. Add raised circular badge (slightly lighter dark glass look)
    draw_img = ImageDraw.Draw(img)
    badge_color = (20, 20, 20)  # #141414
    draw_img.ellipse([cx - 335 * s, cy - 335 * s, cx + 335 * s, cy + 335 * s], fill=badge_color)
    
    # 4. Gold gradient resource
    gradient_img = create_gold_gradient(size, size)
    
    # 5. Fine Gold outer rim for the badge
    badge_border_mask = Image.new("L", (size, size), 0)
    bb_draw = ImageDraw.Draw(badge_border_mask)
    bb_draw.ellipse([cx - 335 * s, cy - 335 * s, cx + 335 * s, cy + 335 * s], outline=255, width=int(2.5 * s))
    img.paste(gradient_img, (0, 0), badge_border_mask)
    
    # 6. Generate the icon mask (L mode - white icon on black)
    icon_mask = Image.new("L", (size, size), 0)
    draw = ImageDraw.Draw(icon_mask)
    
    if name == "Projects":
        # Cinema camera body
        draw.rounded_rectangle([cx - 90 * s, cy - 35 * s, cx + 30 * s, cy + 70 * s], radius=12 * s, fill=255)
        # Matte box / Lens
        lens_poly = [
            (cx + 30 * s, cy - 15 * s),
            (cx + 90 * s, cy - 40 * s),
            (cx + 90 * s, cy + 75 * s),
            (cx + 30 * s, cy + 50 * s)
        ]
        draw.polygon(lens_poly, fill=255)
        # Reels
        for rx, ry in [(cx - 50 * s, cy - 75 * s), (cx + 10 * s, cy - 75 * s)]:
            draw.ellipse([rx - 32 * s, ry - 32 * s, rx + 32 * s, ry + 32 * s], fill=255)
            # Center cutouts (transparent/badge color)
            draw.ellipse([rx - 6 * s, ry - 6 * s, rx + 6 * s, ry + 6 * s], fill=0)
            for dx, dy in [(16 * s, 0), (-16 * s, 0), (0, 16 * s), (0, -16 * s)]:
                draw.ellipse([rx + dx - 5 * s, ry + dy - 5 * s, rx + dx + 5 * s, ry + dy + 5 * s], fill=0)
        
        # Details & casing cuts (black lines on mask)
        draw.rectangle([cx + 25 * s, cy - 45 * s, cx + 31 * s, cy + 80 * s], fill=0)
        draw.rectangle([cx - 95 * s, cy - 45 * s, cx + 35 * s, cy - 38 * s], fill=0)
        draw.line([(cx - 70 * s, cy + 15 * s), (cx + 10 * s, cy + 15 * s)], fill=0, width=4 * s)
        draw.line([(cx - 70 * s, cy + 35 * s), (cx - 10 * s, cy + 35 * s)], fill=0, width=4 * s)
        
    elif name == "BTS":
        # Clapperboard bottom rectangle
        draw.rectangle([cx - 90 * s, cy - 5 * s, cx + 90 * s, cy + 80 * s], fill=255)
        # Write lines representing data fields
        draw.line([(cx - 60 * s, cy + 25 * s), (cx + 60 * s, cy + 25 * s)], fill=0, width=6 * s)
        draw.line([(cx - 60 * s, cy + 50 * s), (cx + 10 * s, cy + 50 * s)], fill=0, width=6 * s)
        draw.line([(cx + 30 * s, cy + 50 * s), (cx + 60 * s, cy + 50 * s)], fill=0, width=6 * s)
        
        # Horizontal top bar
        draw.rectangle([cx - 90 * s, cy - 10 * s, cx + 90 * s, cy + 12 * s], fill=255)
        # Stripes on horizontal bar
        for sx in [cx - 70 * s, cx - 30 * s, cx + 10 * s, cx + 50 * s]:
            draw.line([(sx - 5 * s, cy - 10 * s), (sx + 15 * s, cy + 12 * s)], fill=0, width=10 * s)
            
        # Rotated clapper top bar (hinged)
        hinge_x, hinge_y = cx - 90 * s, cy - 10 * s
        angle = -25 * math.pi / 180  # Tilted up by 25 degrees
        
        # 4 corners of tilted bar: width 180s, height 22s
        p1 = rotate_point(cx - 90 * s, cy - 32 * s, hinge_x, hinge_y, angle)
        p2 = rotate_point(cx + 90 * s, cy - 32 * s, hinge_x, hinge_y, angle)
        p3 = rotate_point(cx + 90 * s, cy - 10 * s, hinge_x, hinge_y, angle)
        p4 = rotate_point(cx - 90 * s, cy - 10 * s, hinge_x, hinge_y, angle)
        draw.polygon([p1, p2, p3, p4], fill=255)
        
        # Stripes on tilted bar
        for sx in [-70 * s, -30 * s, 10 * s, 50 * s]:
            s_start = (hinge_x + sx + 90 * s, cy - 10 * s)
            s_end = (hinge_x + sx + 110 * s, cy - 32 * s)
            rs_start = rotate_point(s_start[0], s_start[1], hinge_x, hinge_y, angle)
            rs_end = rotate_point(s_end[0], s_end[1], hinge_x, hinge_y, angle)
            # Create angled black stripes
            draw.line([rs_start, rs_end], fill=0, width=10 * s)
            
        # Draw black separating lines
        draw.line([(cx - 95 * s, cy + 12 * s), (cx + 95 * s, cy + 12 * s)], fill=0, width=4 * s)
        
    elif name == "Clients":
        # Premium Laurel Wreath & Star
        # Left Stem Arc
        draw.arc([cx - 75 * s, cy - 40 * s, cx - 15 * s, cy + 60 * s], start=90, end=240, fill=255, width=4 * s)
        # Right Stem Arc
        draw.arc([cx + 15 * s, cy - 40 * s, cx + 75 * s, cy + 60 * s], start=-60, end=90, fill=255, width=4 * s)
        
        # Left Leaves
        draw_leaf(draw, cx - 45 * s, cy + 45 * s, 45, s)
        draw_leaf(draw, cx - 62 * s, cy + 25 * s, 25, s)
        draw_leaf(draw, cx - 70 * s, cy + 0 * s, 5, s)
        draw_leaf(draw, cx - 65 * s, cy - 25 * s, -15, s)
        draw_leaf(draw, cx - 48 * s, cy - 48 * s, -35, s)
        
        # Right Leaves
        draw_leaf(draw, cx + 45 * s, cy + 45 * s, -45, s)
        draw_leaf(draw, cx + 62 * s, cy + 25 * s, -25, s)
        draw_leaf(draw, cx + 70 * s, cy + 0 * s, -5, s)
        draw_leaf(draw, cx + 65 * s, cy - 25 * s, 15, s)
        draw_leaf(draw, cx + 48 * s, cy - 48 * s, 35, s)
        
        # Star in the center
        draw_star(draw, cx, cy - 10 * s, outer_r=40 * s, inner_r=16 * s, fill_color=255)
        
    elif name == "Reviews":
        # Editorial serif quotation mark (using Georgia font)
        try:
            font = ImageFont.truetype("/System/Library/Fonts/Supplemental/Georgia.ttf", 360 * s)
            text = "“"
            bbox = draw.textbbox((0, 0), text, font=font)
            text_w = bbox[2] - bbox[0]
            text_h = bbox[3] - bbox[1]
            tx = cx - text_w // 2 - bbox[0]
            ty = cy - text_h // 2 - bbox[1] - 30 * s # offset vertically slightly
            draw.text((tx, ty), text, font=font, fill=255)
        except Exception:
            # Fallback quote drawing if font fails
            draw.ellipse([cx - 40 * s, cy - 30 * s, cx - 10 * s, cy], fill=255)
            draw.polygon([(cx - 40 * s, cy), (cx - 10 * s, cy), (cx - 30 * s, cy + 40 * s)], fill=255)
            draw.ellipse([cx + 10 * s, cy - 30 * s, cx + 40 * s, cy], fill=255)
            draw.polygon([(cx + 10 * s, cy), (cx + 40 * s, cy), (cx + 20 * s, cy + 40 * s)], fill=255)
            
    elif name == "Stills":
        # Premium camera lens / aperture blades
        draw.ellipse([cx - 75 * s, cy - 75 * s, cx + 75 * s, cy + 75 * s], fill=255)
        # Hexagon in the center
        hex_pts = []
        for i in range(6):
            angle = i * math.pi / 3
            hx = cx + 18 * s * math.cos(angle)
            hy = cy + 18 * s * math.sin(angle)
            hex_pts.append((hx, hy))
        draw.polygon(hex_pts, fill=0)
        # 6 Blade lines
        for i in range(6):
            hx, hy = hex_pts[i]
            out_angle = i * math.pi / 3 + math.pi / 5
            ox = cx + 76 * s * math.cos(out_angle)
            oy = cy + 76 * s * math.sin(out_angle)
            draw.line([(hx, hy), (ox, oy)], fill=0, width=5 * s)
            
    elif name == "Grade":
        # DaVinci Resolve color wheels overlapping
        r = 40 * s
        # Draw Top
        draw.ellipse([cx - r, cy - 25 * s - r, cx + r, cy - 25 * s + r], fill=255)
        
        # Draw Bottom Left (overlapping with black mask edge first)
        draw.ellipse([cx - 30 * s - 44 * s, cy + 25 * s - 44 * s, cx - 30 * s + 44 * s, cy + 25 * s + 44 * s], fill=0)
        draw.ellipse([cx - 30 * s - r, cy + 25 * s - r, cx - 30 * s + r, cy + 25 * s + r], fill=255)
        
        # Draw Bottom Right (overlapping with black mask edge first)
        draw.ellipse([cx + 30 * s - 44 * s, cy + 25 * s - 44 * s, cx + 30 * s + 44 * s, cy + 25 * s + 44 * s], fill=0)
        draw.ellipse([cx + 30 * s - r, cy + 25 * s - r, cx + 30 * s + r, cy + 25 * s + r], fill=255)
        
        # Add joystick details to wheels (black points and crosses)
        for rx, ry, px, py in [
            (cx, cy - 25 * s, cx + 12 * s, cy - 37 * s),
            (cx - 30 * s, cy + 25 * s, cx - 48 * s, cy + 30 * s),
            (cx + 30 * s, cy + 25 * s, cx + 38 * s, cy + 13 * s)
        ]:
            draw.ellipse([rx - 4 * s, ry - 4 * s, rx + 4 * s, ry + 4 * s], fill=0)
            draw.line([(rx - 10 * s, ry), (rx + 10 * s, ry)], fill=0, width=2 * s)
            draw.line([(rx, ry - 10 * s), (rx, ry + 10 * s)], fill=0, width=2 * s)
            # draw indicator line
            draw.line([(rx, ry), (px, py)], fill=0, width=3 * s)
            draw.ellipse([px - 3 * s, py - 3 * s, px + 3 * s, py + 3 * s], fill=0)
            
    elif name == "Me":
        # Luxurious Serif monogram R (Georgia)
        try:
            font = ImageFont.truetype("/System/Library/Fonts/Supplemental/Georgia.ttf", 220 * s)
            text = "R"
            bbox = draw.textbbox((0, 0), text, font=font)
            text_w = bbox[2] - bbox[0]
            text_h = bbox[3] - bbox[1]
            tx = cx - text_w // 2 - bbox[0]
            ty = cy - text_h // 2 - bbox[1]
            draw.text((tx, ty), text, font=font, fill=255)
        except Exception:
            # Silhouette fallback
            draw.ellipse([cx - 28 * s, cy - 40 * s - 28 * s, cx + 28 * s, cy - 40 * s + 28 * s], fill=255)
            draw.ellipse([cx - 80 * s, cy + 10 * s, cx + 80 * s, cy + 130 * s], fill=255)
            
    elif name == "Mindset":
        # Geometrically cut diamond facet representation
        draw.polygon([
            (cx - 60 * s, cy - 40 * s), 
            (cx + 60 * s, cy - 40 * s), 
            (cx + 90 * s, cy - 15 * s), 
            (cx, cy + 75 * s), 
            (cx - 90 * s, cy - 15 * s)
        ], fill=255)
        
        # Facet lines (black cuts, width 4 * s)
        draw.line([(cx, cy + 75 * s), (cx - 40 * s, cy - 15 * s)], fill=0, width=4 * s)
        draw.line([(cx, cy + 75 * s), (cx, cy - 15 * s)], fill=0, width=4 * s)
        draw.line([(cx, cy + 75 * s), (cx + 40 * s, cy - 15 * s)], fill=0, width=4 * s)
        draw.line([(cx - 90 * s, cy - 15 * s), (cx + 90 * s, cy - 15 * s)], fill=0, width=4 * s)
        draw.line([(cx - 60 * s, cy - 40 * s), (cx - 40 * s, cy - 15 * s)], fill=0, width=4 * s)
        draw.line([(cx - 60 * s, cy - 40 * s), (cx, cy - 15 * s)], fill=0, width=4 * s)
        draw.line([(cx, cy - 40 * s), (cx, cy - 15 * s)], fill=0, width=4 * s)
        draw.line([(cx + 60 * s, cy - 40 * s), (cx, cy - 15 * s)], fill=0, width=4 * s)
        draw.line([(cx + 60 * s, cy - 40 * s), (cx + 40 * s, cy - 15 * s)], fill=0, width=4 * s)
        draw.line([(cx - 90 * s, cy - 15 * s), (cx - 60 * s, cy - 40 * s)], fill=0, width=4 * s)
        draw.line([(cx + 90 * s, cy - 15 * s), (cx + 60 * s, cy - 40 * s)], fill=0, width=4 * s)
        
    # 7. Create 3D drop shadow image for the icon
    shadow_img = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    # Fill icon silhouette with semi-transparent black
    shadow_img.paste((0, 0, 0, 150), (0, 0), icon_mask)
    # Blur the shadow layer
    shadow_img = shadow_img.filter(ImageFilter.GaussianBlur(radius=8 * s))
    
    # Offset shadow slightly: 2px right, 10px down
    offset_x = 2 * s
    offset_y = 10 * s
    img.paste(shadow_img, (offset_x, offset_y), shadow_img)
    
    # 8. Paste gold gradient icon onto the main canvas
    img.paste(gradient_img, (0, 0), icon_mask)
    
    # 9. Downscale with high-quality Lanczos resampling
    final_img = img.resize((target_size, target_size), Image.Resampling.LANCZOS)
    
    # 10. Save the final image
    filename = f"{index:02d}_{name.lower()}.png"
    output_path = os.path.join("/Users/parsha/Downloads/rezaemotion/instagram_highlights", filename)
    final_img.save(output_path, "PNG")
    print(f"Generated {filename}")

if __name__ == "__main__":
    highlights = ["Projects", "BTS", "Clients", "Reviews", "Stills", "Grade", "Me", "Mindset"]
    print("Starting premium highlight cover generation...")
    os.makedirs("/Users/parsha/Downloads/rezaemotion/instagram_highlights", exist_ok=True)
    for idx, item in enumerate(highlights, 1):
        generate_highlight_icon(item, idx)
    print("Highlight covers successfully generated!")
