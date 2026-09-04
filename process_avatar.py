import os
from PIL import Image, ImageChops

def process_avatar_fast():
    base_dir = "/Users/mananrastogi/helloworld/portfolio/public/assets/images"
    input_path = os.path.join(base_dir, "image.png")
    optimized_path = os.path.join(base_dir, "avatar_optimized.png")

    print(f"Loading {input_path}...")
    img = Image.open(input_path).convert("RGBA")
    
    # Get the background color from top-left pixel
    bg_color = img.getpixel((0, 0))
    
    # Create a mask of the background color
    data = img.getdata()
    newData = []
    
    # Tolerance for background removal
    tol = 30
    for item in data:
        if abs(item[0] - bg_color[0]) < tol and \
           abs(item[1] - bg_color[1]) < tol and \
           abs(item[2] - bg_color[2]) < tol:
            newData.append((255, 255, 255, 0)) # transparent
        else:
            newData.append(item)
            
    img.putdata(newData)
    
    # Get bounding box of non-transparent pixels
    bbox = img.getbbox()
    if bbox:
        img = img.crop(bbox)
        
    # Calculate size for 512x512 fitting
    max_size = 512
    ratio = min(max_size / img.width, max_size / img.height)
    new_size = (int(img.width * ratio), int(img.height * ratio))
    optimized = img.resize(new_size, Image.Resampling.LANCZOS)
    
    # Center in 512x512 transparent canvas
    final_img = Image.new('RGBA', (max_size, max_size), (0, 0, 0, 0))
    offset = ((max_size - new_size[0]) // 2, (max_size - new_size[1]) // 2)
    final_img.paste(optimized, offset)
    
    final_img.save(optimized_path)
    print(f"Saved optimized avatar to {optimized_path}")

if __name__ == "__main__":
    process_avatar_fast()
