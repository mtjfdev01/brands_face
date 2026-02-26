# Image & Asset Optimization Guide

## 📸 Image Optimization Best Practices

### Image Formats

Use modern formats with fallbacks:

```html
<picture>
  <source srcset="image.webp" type="image/webp" />
  <source srcset="image.jpg" type="image/jpeg" />
  <img src="image.jpg" alt="Description" />
</picture>
```

### Recommended Image Sizes

**Product Main Image:**

- Desktop: 800x800px
- Mobile: 400x400px
- File size: 200-300KB max
- Format: WebP (with JPG fallback)

**Product Thumbnails:**

- Size: 100x100px to 150x150px
- File size: 20-50KB
- Format: WebP or compressed JPG

**Box Mockup (Hero Image):**

- Size: 1200x900px (or higher for retina)
- File size: 300-500KB
- Format: WebP with JPG fallback

**Gallery Images:**

- Size: 600x600px to 1200x1200px
- File size: 150-400KB per image
- Format: WebP preferred

**Thumbnails Grid:**

- Size: 200x200px
- File size: 30-60KB
- Format: JPG or WebP

### Image Optimization Tools

**Online Tools (Free):**

1. **TinyPNG** (tinypng.com) - Excellent compression
2. **ImageOptim** (imageoptim.com) - Batch optimization
3. **Squoosh** (squoosh.app) - Google's web tool, great for WebP
4. **CloudConvert** (cloudconvert.com) - Format conversion
5. **IMGBOT** (imgbot.io) - Automated optimization

**Desktop Tools:**

1. **ImageMagick** - Command-line tool
2. **XnConvert** - Batch converter
3. **Photoshop** - Professional tool with export options

### Compression Settings

**JPG Images:**

- Quality: 75-85%
- Progressive JPG: Yes
- Remove metadata: Yes

**PNG Images:**

- Interlaced: Yes
- Optimize: Maximum compression
- Remove metadata: Yes

**WebP Images:**

- Quality: 80-85%
- Method: 6 (highest quality, slower)

### Optimization Commands

**Using ImageMagick (if installed):**

```bash
# Resize and compress JPG
convert input.jpg -resize 800x800 -quality 80 output.jpg

# Convert to WebP
convert input.jpg -quality 80 output.webp

# Batch convert
for file in *.jpg; do
  convert "$file" -quality 75 "optimized/$file"
done
```

**Using ImageMin (Node.js):**

```bash
npm install imagemin imagemin-jpeg imagemin-png
imagemin img/ --out-dir=img/optimized
```

## 🎨 Asset Organization

### Recommended Folder Structure

```
assets/
├── images/
│   ├── products/
│   │   ├── rigid-boxes/
│   │   │   ├── main-image.jpg
│   │   │   ├── gallery-1.jpg
│   │   │   └── thumbnails/
│   │   ├── corrugated-boxes/
│   │   │   ├── main-image.jpg
│   │   │   └── gallery-1.jpg
│   │   └── ... (other products)
│   ├── hero/
│   │   ├── box-mockup.jpg
│   │   └── box-mockup.webp
│   ├── about/
│   │   ├── team.jpg
│   │   └── facility.jpg
│   └── icons/
│       ├── facebook.svg
│       ├── instagram.svg
│       └── linkedin.svg
├── css/
│   ├── style.css
│   ├── product-page-theme.css
│   └── ... (minified versions)
└── js/
    ├── main.js
    ├── navbar.js
    ├── footer.js
    └── loading-animation.js
```

## 🖼️ Current Image References

Your website currently references these images (add them to the appropriate folders):

**Main Images:**

- `box-mockup.png` - Hero image (needs optimization)
- `box1.png` - Product gallery
- `box3.png` - Product gallery
- `box4.png` - Product gallery
- `box6.png` - Product gallery

**Favicon:**

- `favicon.ico` - Website favicon

### How to Add Images:

1. **Hero Image (box-mockup.png):**
   - Place in: `assets/images/hero/`
   - Referencing: Optimize and convert to WebP
   - Size: 1200x900px minimum

2. **Product Images:**
   - Create folders: `assets/images/products/[product-type]/`
   - Add main and gallery images
   - Update HTML references from relative paths

3. **Update Image Paths in HTML:**

   Current (example):

   ```html
   <img id="mainView" src="../box-mockup.png" alt="Rigid Box Premium" />
   ```

   Updated format:

   ```html
   <picture>
     <source
       srcset="../assets/images/products/rigid-boxes/main.webp"
       type="image/webp"
     />
     <source
       srcset="../assets/images/products/rigid-boxes/main.jpg"
       type="image/jpeg"
     />
     <img
       id="mainView"
       src="../assets/images/products/rigid-boxes/main.jpg"
       alt="Rigid Box Premium"
     />
   </picture>
   ```

## 📊 Performance Impact

**Before Optimization:**

- Unoptimized JPG: ~2MB
- PNG images: ~1.5MB
- Total: ~3.5MB per page

**After Optimization:**

- Optimized JPG: ~200KB
- WebP fallback: ~150KB
- Total: ~350KB per page
- **Performance gain: ~90% reduction**

## 🚀 Lazy Loading Images

For below-fold images, use native lazy loading:

```html
<img src="image.jpg" alt="Description" loading="lazy" />
```

Or use Intersection Observer API for more control:

```javascript
const images = document.querySelectorAll('img[data-src]');
const imageObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const img = entry.target;
      img.src = img.dataset.src;
      image Observer.unobserve(img);
    }
  });
});
images.forEach(img => imageObserver.observe(img));
```

## 🎯 Image Checklist Before Deployment

- [ ] All product images optimized and compressed
- [ ] WebP versions created for main images
- [ ] Correct alt text on all images (for SEO)
- [ ] Image file names are descriptive (e.g., `rigid-box-magnetic-snap.jpg`)
- [ ] Responsive images using `<picture>` or `srcset`
- [ ] Lazy loading implemented for gallery images
- [ ] Favicon set and optimized
- [ ] All image paths correctly reference assets folder
- [ ] Images tested on slow network (DevTools throttling)
- [ ] Mobile version images load fast

## 📈 Recommended Free Tools Online

1. **Squoosh.app** - Google's tool for WebP conversion
2. **TinyPNG.com** - Great compression (also does PNG)
3. **BulkResizer.com** - Batch resize
4. **ILoveIMG.com** - Batch compress JPG
5. **Sharpie.app** - Free WebP converter

## 💡 Pro Tips

1. **Use CDN for images** - Serve from a content delivery network
2. **Set width/height attributes** - Prevents layout shift
3. **Use descriptive alt text** - Better SEO and accessibility
4. **Monitor file sizes** - Keep PNG under 500KB, JPG under 300KB
5. **Test on real devices** - Mobile performance matters

---

**Once you add images, you can further optimize performance by:**

- Implementing image CDN (Cloudinary, ImageKit)
- Using responsive images with srcset
- Enabling AVIF format (latest standard)
- Lazy loading below-fold images
- Setting proper cache headers

Always test with PageSpeed Insights after adding images!
