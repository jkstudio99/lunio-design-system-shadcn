import os
import subprocess
from PIL import Image

BASE_DIR = "/Users/lunio/Downloads/lunio-design-system-shadcn/public/images"

def hex_to_rgb(h):
    h = h.lstrip('#')
    return tuple(int(h[i:i+2], 16) for i in (0, 2, 4))

def recolor(master_im, hex_color):
    rgb = hex_to_rgb(hex_color)
    alpha = master_im.split()[3]
    color_im = Image.new('RGB', master_im.size, rgb)
    color_im.putalpha(alpha)
    return color_im

def trace_to_svg(master_im, hex_color, out_svg_path, threshold=120):
    alpha = master_im.split()[3]
    pbm = alpha.point(lambda p: 0 if p > threshold else 255).convert('1')
    pbm_path = '/tmp/temp_trace.pbm'
    pbm.save(pbm_path)
    
    raw_svg_path = '/tmp/temp_potrace.svg'
    subprocess.run(['potrace', '-s', '-o', raw_svg_path, pbm_path], check=True)
    
    with open(raw_svg_path, 'r', encoding='utf-8') as f:
        svg_content = f.read()
    
    svg_content = svg_content.replace('fill="#000000"', f'fill="{hex_color}"')
    
    with open(out_svg_path, 'w', encoding='utf-8') as f:
        f.write(svg_content)
    print(f"Generated SVG: {out_svg_path}")

def main():
    print("=== Generating High-Quality Brand Logos for Lunio Design System ===")
    
    # -------------------------------------------------------------
    # 1. LUNIO
    # -------------------------------------------------------------
    lunio_dir = os.path.join(BASE_DIR, "lunio")
    os.makedirs(lunio_dir, exist_ok=True)
    
    lunio_master_path = os.path.join(lunio_dir, "lunio-white.png")
    im_lunio_master = Image.open(lunio_master_path)
    
    # Lunio Primary: #1C46B4
    lunio_primary_im = recolor(im_lunio_master, "#1C46B4")
    lunio_primary_path = os.path.join(lunio_dir, "lunio-primary.png")
    lunio_primary_im.save(lunio_primary_path, "PNG", optimize=True)
    print(f"Saved: {lunio_primary_path} (size={lunio_primary_im.size}, color=#1C46B4)")
    trace_to_svg(im_lunio_master, "#1C46B4", os.path.join(lunio_dir, "lunio-primary.svg"))
    
    # Lunio White: #FFFFFF
    lunio_white_im = recolor(im_lunio_master, "#FFFFFF")
    lunio_white_path = os.path.join(lunio_dir, "lunio-white.png")
    lunio_white_im.save(lunio_white_path, "PNG", optimize=True)
    print(f"Saved: {lunio_white_path} (size={lunio_white_im.size}, color=#FFFFFF)")
    trace_to_svg(im_lunio_master, "#FFFFFF", os.path.join(lunio_dir, "lunio-white.svg"))
    
    # Lunio Corporate Navy (Pantone 655 C): #002355
    lunio_corp_im = recolor(im_lunio_master, "#002355")
    lunio_corp_path = os.path.join(lunio_dir, "lunio-corporate.png")
    lunio_corp_im.save(lunio_corp_path, "PNG", optimize=True)
    trace_to_svg(im_lunio_master, "#002355", os.path.join(lunio_dir, "lunio-corporate.svg"))
    
    # -------------------------------------------------------------
    # 2. NOOZ (HELIX & SUNSET)
    # -------------------------------------------------------------
    nooz_dir = os.path.join(BASE_DIR, "nooz")
    os.makedirs(nooz_dir, exist_ok=True)
    
    nooz_master_path = os.path.join(nooz_dir, "Nooz-white.png")
    im_nooz_master = Image.open(nooz_master_path)
    
    # Nooz Helix Primary: #7347AE
    nooz_helix_im = recolor(im_nooz_master, "#7347AE")
    
    # Save as nooz-primary.png (referenced in DESIGN.md for Helix)
    nooz_prim_path = os.path.join(nooz_dir, "nooz-primary.png")
    nooz_helix_im.save(nooz_prim_path, "PNG", optimize=True)
    print(f"Saved: {nooz_prim_path} (size={nooz_helix_im.size}, color=#7347AE)")
    
    # Also save as nooz-helix.png and Nooz-helix.png
    nooz_helix_path = os.path.join(nooz_dir, "nooz-helix.png")
    nooz_helix_im.save(nooz_helix_path, "PNG", optimize=True)
    nooz_helix_cap_path = os.path.join(nooz_dir, "Nooz-helix.png")
    nooz_helix_im.save(nooz_helix_cap_path, "PNG", optimize=True)
    
    trace_to_svg(im_nooz_master, "#7347AE", os.path.join(nooz_dir, "nooz-primary.svg"))
    trace_to_svg(im_nooz_master, "#7347AE", os.path.join(nooz_dir, "nooz-helix.svg"))
    trace_to_svg(im_nooz_master, "#7347AE", os.path.join(nooz_dir, "Nooz-helix.svg"))
    
    # Nooz Sunset Primary: #F28131
    # Replace the tiny 162x68 blurry image with full 1133x359 high-resolution asset!
    nooz_sunset_im = recolor(im_nooz_master, "#F28131")
    nooz_sunset_cap_path = os.path.join(nooz_dir, "Nooz-sunset.png")
    nooz_sunset_im.save(nooz_sunset_cap_path, "PNG", optimize=True)
    print(f"Saved: {nooz_sunset_cap_path} (HIGH RES size={nooz_sunset_im.size}, color=#F28131)")
    
    nooz_sunset_path = os.path.join(nooz_dir, "nooz-sunset.png")
    nooz_sunset_im.save(nooz_sunset_path, "PNG", optimize=True)
    
    trace_to_svg(im_nooz_master, "#F28131", os.path.join(nooz_dir, "Nooz-sunset.svg"))
    trace_to_svg(im_nooz_master, "#F28131", os.path.join(nooz_dir, "nooz-sunset.svg"))
    
    # Nooz White: #FFFFFF
    nooz_white_im = recolor(im_nooz_master, "#FFFFFF")
    nooz_white_cap_path = os.path.join(nooz_dir, "Nooz-white.png")
    nooz_white_im.save(nooz_white_cap_path, "PNG", optimize=True)
    nooz_white_path = os.path.join(nooz_dir, "nooz-white.png")
    nooz_white_im.save(nooz_white_path, "PNG", optimize=True)
    
    trace_to_svg(im_nooz_master, "#FFFFFF", os.path.join(nooz_dir, "Nooz-white.svg"))
    trace_to_svg(im_nooz_master, "#FFFFFF", os.path.join(nooz_dir, "nooz-white.svg"))
    
    # Nooz Neutral Monochrome Black: #000000
    nooz_black_im = recolor(im_nooz_master, "#000000")
    nooz_black_path = os.path.join(nooz_dir, "nooz-black.png")
    nooz_black_im.save(nooz_black_path, "PNG", optimize=True)
    trace_to_svg(im_nooz_master, "#000000", os.path.join(nooz_dir, "nooz-black.svg"))
    
    # -------------------------------------------------------------
    # 3. LUNIO BEDDING
    # -------------------------------------------------------------
    bedding_dirs = [
        os.path.join(BASE_DIR, "lunio bedding"),
        os.path.join(BASE_DIR, "lunio-bedding"),
    ]
    
    bedding_master_path = os.path.join(BASE_DIR, "lunio bedding", "lunio-bedding-white@4x.png")
    im_bedding_master = Image.open(bedding_master_path)
    
    bedding_primary_im = recolor(im_bedding_master, "#1C46B4")
    bedding_white_im = recolor(im_bedding_master, "#FFFFFF")
    
    for b_dir in bedding_dirs:
        os.makedirs(b_dir, exist_ok=True)
        # @4x and standard 1x
        bedding_primary_im.save(os.path.join(b_dir, "lunio-bedding-primary@4x.png"), "PNG", optimize=True)
        bedding_primary_im.save(os.path.join(b_dir, "lunio-bedding-primary.png"), "PNG", optimize=True)
        bedding_white_im.save(os.path.join(b_dir, "lunio-bedding-white@4x.png"), "PNG", optimize=True)
        bedding_white_im.save(os.path.join(b_dir, "lunio-bedding-white.png"), "PNG", optimize=True)
        
        trace_to_svg(im_bedding_master, "#1C46B4", os.path.join(b_dir, "lunio-bedding-primary.svg"))
        trace_to_svg(im_bedding_master, "#FFFFFF", os.path.join(b_dir, "lunio-bedding-white.svg"))
        print(f"Updated Bedding directory: {b_dir}")
        
    # -------------------------------------------------------------
    # 4. HYPERCOOL BEDDING (PROVISIONAL)
    # -------------------------------------------------------------
    hypercool_dir = os.path.join(BASE_DIR, "hypercool")
    os.makedirs(hypercool_dir, exist_ok=True)
    
    hypercool_primary_im = recolor(im_lunio_master, "#155A7A")
    hypercool_white_im = recolor(im_lunio_master, "#FFFFFF")
    
    hypercool_primary_im.save(os.path.join(hypercool_dir, "hypercool-primary.png"), "PNG", optimize=True)
    hypercool_white_im.save(os.path.join(hypercool_dir, "hypercool-white.png"), "PNG", optimize=True)
    # -------------------------------------------------------------
    # 5. LUNIO LIFE (#2D274A Plum Night)
    # -------------------------------------------------------------
    life_dir = os.path.join(BASE_DIR, "lunio-life")
    os.makedirs(life_dir, exist_ok=True)
    life_master_path = os.path.join(life_dir, "lunio-life-logo-white.png")
    if os.path.exists(life_master_path):
        im_life_master = Image.open(life_master_path)
        life_primary_im = recolor(im_life_master, "#2D274A")
        life_white_im = recolor(im_life_master, "#FFFFFF")

        life_primary_im.save(os.path.join(life_dir, "lunio-life-logo-primary.png"), "PNG", optimize=True)
        life_primary_im.save(os.path.join(life_dir, "lunio-life-primary.png"), "PNG", optimize=True)
        life_white_im.save(os.path.join(life_dir, "lunio-life-logo-white.png"), "PNG", optimize=True)
        life_white_im.save(os.path.join(life_dir, "lunio-life-white.png"), "PNG", optimize=True)

        trace_to_svg(im_life_master, "#2D274A", os.path.join(life_dir, "lunio-life-primary.svg"))
        trace_to_svg(im_life_master, "#2D274A", os.path.join(life_dir, "lunio-life-logo-primary.svg"))
        trace_to_svg(im_life_master, "#FFFFFF", os.path.join(life_dir, "lunio-life-white.svg"))
        trace_to_svg(im_life_master, "#FFFFFF", os.path.join(life_dir, "lunio-life-logo-white.svg"))
        print(f"Generated Lunio Life assets in: {life_dir} (size={im_life_master.size}, color=#2D274A)")

    print("=== All brand logos generated successfully ===")

if __name__ == "__main__":
    main()

