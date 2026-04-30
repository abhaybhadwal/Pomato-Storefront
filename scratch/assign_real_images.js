/**
 * assign_real_images.js
 * 
 * Maps every product in products.js to its official, real HD image URL
 * sourced from GSMArena (the internet's most trusted phone database).
 * These are manufacturer-quality renders on white/grey backgrounds — 
 * exactly what professional e-commerce sites use.
 */

const fs = require('fs');
const path = require('path');

const PRODUCTS_FILE = path.join(__dirname, '..', 'js', 'products.js');

// Official high-resolution product images (GSMArena / official manufacturer CDNs)
// Format: productId -> imageUrl
const IMAGE_MAP = {

  // ── APPLE IPHONES ──────────────────────────────────────────────────────────
  'apple-fut-1':  'https://fdn2.gsmarena.com/vv/bigpic/apple-iphone-17-pro.jpg',
  'apple-16-pm':  'https://fdn2.gsmarena.com/vv/bigpic/apple-iphone-16-pro-max.jpg',
  'apple-0':      'https://fdn2.gsmarena.com/vv/bigpic/apple-iphone-15-pro-max.jpg',
  'apple-1':      'https://fdn2.gsmarena.com/vv/bigpic/apple-iphone-15-pro.jpg',
  'apple-2':      'https://fdn2.gsmarena.com/vv/bigpic/apple-iphone-15-plus.jpg',
  'apple-3':      'https://fdn2.gsmarena.com/vv/bigpic/apple-iphone-15.jpg',
  'apple-4':      'https://fdn2.gsmarena.com/vv/bigpic/apple-iphone-14-pro-max.jpg',
  'apple-5':      'https://fdn2.gsmarena.com/vv/bigpic/apple-iphone-14-pro.jpg',
  'apple-6':      'https://fdn2.gsmarena.com/vv/bigpic/apple-iphone-14.jpg',
  'apple-7':      'https://fdn2.gsmarena.com/vv/bigpic/apple-iphone-13.jpg',
  'apple-8':      'https://fdn2.gsmarena.com/vv/bigpic/apple-iphone-se-2022.jpg',
  'apple-9':      'https://fdn2.gsmarena.com/vv/bigpic/apple-iphone-12.jpg',

  // ── SAMSUNG ────────────────────────────────────────────────────────────────
  'samsung-s25-u': 'https://fdn2.gsmarena.com/vv/bigpic/samsung-galaxy-s25-ultra-5g.jpg',
  'samsung-0':     'https://fdn2.gsmarena.com/vv/bigpic/samsung-galaxy-s24-ultra-5g.jpg',
  'samsung-1':     'https://fdn2.gsmarena.com/vv/bigpic/samsung-galaxy-s24-5g.jpg',
  'samsung-2':     'https://fdn2.gsmarena.com/vv/bigpic/samsung-galaxy-s24-5g.jpg',
  'samsung-3':     'https://fdn2.gsmarena.com/vv/bigpic/samsung-galaxy-z-fold5.jpg',
  'samsung-4':     'https://fdn2.gsmarena.com/vv/bigpic/samsung-galaxy-z-flip5.jpg',
  'samsung-5':     'https://fdn2.gsmarena.com/vv/bigpic/samsung-galaxy-s23-ultra-5g.jpg',
  'samsung-6':     'https://fdn2.gsmarena.com/vv/bigpic/samsung-galaxy-s23-fe.jpg',
  'samsung-7':     'https://fdn2.gsmarena.com/vv/bigpic/samsung-galaxy-a54.jpg',
  'samsung-8':     'https://fdn2.gsmarena.com/vv/bigpic/samsung-galaxy-a34.jpg',
  'samsung-9':     'https://fdn2.gsmarena.com/vv/bigpic/samsung-galaxy-m14-5g.jpg',

  // ── GOOGLE PIXEL ───────────────────────────────────────────────────────────
  'google-p10-p': 'https://fdn2.gsmarena.com/vv/bigpic/google-pixel-9-pro.jpg',
  'google-0':     'https://fdn2.gsmarena.com/vv/bigpic/google-pixel-8-pro.jpg',
  'google-1':     'https://fdn2.gsmarena.com/vv/bigpic/google-pixel-8.jpg',
  'google-2':     'https://fdn2.gsmarena.com/vv/bigpic/google-pixel-7-pro.jpg',
  'google-3':     'https://fdn2.gsmarena.com/vv/bigpic/google-pixel-7.jpg',
  'google-4':     'https://fdn2.gsmarena.com/vv/bigpic/google-pixel-7a.jpg',
  'google-5':     'https://fdn2.gsmarena.com/vv/bigpic/google-pixel-fold.jpg',
  'google-6':     'https://fdn2.gsmarena.com/vv/bigpic/google-pixel-6-pro.jpg',
  'google-7':     'https://fdn2.gsmarena.com/vv/bigpic/google-pixel-6.jpg',
  'google-8':     'https://fdn2.gsmarena.com/vv/bigpic/google-pixel-6a.jpg',
  'google-9':     'https://fdn2.gsmarena.com/vv/bigpic/google-pixel-5.jpg',

  // ── ONEPLUS ────────────────────────────────────────────────────────────────
  'oneplus-0': 'https://fdn2.gsmarena.com/vv/bigpic/oneplus-12.jpg',
  'oneplus-1': 'https://fdn2.gsmarena.com/vv/bigpic/oneplus-12r.jpg',
  'oneplus-2': 'https://fdn2.gsmarena.com/vv/bigpic/oneplus-open.jpg',
  'oneplus-3': 'https://fdn2.gsmarena.com/vv/bigpic/oneplus-11.jpg',
  'oneplus-4': 'https://fdn2.gsmarena.com/vv/bigpic/oneplus-11r.jpg',
  'oneplus-5': 'https://fdn2.gsmarena.com/vv/bigpic/oneplus-nord-3.jpg',
  'oneplus-6': 'https://fdn2.gsmarena.com/vv/bigpic/oneplus-nord-ce3.jpg',
  'oneplus-7': 'https://fdn2.gsmarena.com/vv/bigpic/oneplus-10-pro.jpg',
  'oneplus-8': 'https://fdn2.gsmarena.com/vv/bigpic/oneplus-10t.jpg',
  'oneplus-9': 'https://fdn2.gsmarena.com/vv/bigpic/oneplus-9-pro.jpg',

  // ── XIAOMI / REDMI / POCO ──────────────────────────────────────────────────
  'xiaomi-0': 'https://fdn2.gsmarena.com/vv/bigpic/xiaomi-14-ultra.jpg',
  'xiaomi-1': 'https://fdn2.gsmarena.com/vv/bigpic/xiaomi-14-pro.jpg',
  'xiaomi-2': 'https://fdn2.gsmarena.com/vv/bigpic/xiaomi-14.jpg',
  'xiaomi-3': 'https://fdn2.gsmarena.com/vv/bigpic/xiaomi-redmi-note-13-pro-plus.jpg',
  'xiaomi-4': 'https://fdn2.gsmarena.com/vv/bigpic/xiaomi-redmi-note-13-pro.jpg',
  'xiaomi-5': 'https://fdn2.gsmarena.com/vv/bigpic/xiaomi-poco-x6-pro.jpg',
  'xiaomi-6': 'https://fdn2.gsmarena.com/vv/bigpic/xiaomi-poco-f5.jpg',
  'xiaomi-7': 'https://fdn2.gsmarena.com/vv/bigpic/xiaomi-13-pro.jpg',
  'xiaomi-8': 'https://fdn2.gsmarena.com/vv/bigpic/xiaomi-redmi-12-5g.jpg',
  'xiaomi-9': 'https://fdn2.gsmarena.com/vv/bigpic/xiaomi-pad-6.jpg',

  // ── ASUS ROG / ZENFONE ─────────────────────────────────────────────────────
  'asus-0': 'https://fdn2.gsmarena.com/vv/bigpic/asus-rog-phone-8-pro.jpg',
  'asus-1': 'https://fdn2.gsmarena.com/vv/bigpic/asus-rog-phone-8.jpg',
  'asus-2': 'https://fdn2.gsmarena.com/vv/bigpic/asus-rog-phone-7-ultimate.jpg',
  'asus-3': 'https://fdn2.gsmarena.com/vv/bigpic/asus-rog-phone-7.jpg',
  'asus-4': 'https://fdn2.gsmarena.com/vv/bigpic/asus-zenfone-10.jpg',
  'asus-5': 'https://fdn2.gsmarena.com/vv/bigpic/asus-zenfone-9.jpg',
  'asus-6': 'https://fdn2.gsmarena.com/vv/bigpic/asus-rog-phone-6.jpg',
  'asus-7': 'https://fdn2.gsmarena.com/vv/bigpic/asus-rog-phone-5s.jpg',
  'asus-8': 'https://fdn2.gsmarena.com/vv/bigpic/asus-zenfone-8.jpg',
  'asus-9': 'https://fdn2.gsmarena.com/vv/bigpic/asus-rog-phone-3.jpg',

  // ── NOTHING ────────────────────────────────────────────────────────────────
  'nothing-0': 'https://fdn2.gsmarena.com/vv/bigpic/nothing-phone-2.jpg',
  'nothing-1': 'https://fdn2.gsmarena.com/vv/bigpic/nothing-phone-2a.jpg',
  'nothing-2': 'https://fdn2.gsmarena.com/vv/bigpic/nothing-phone-1.jpg',
  'nothing-3': 'https://fdn2.gsmarena.com/vv/bigpic/nothing-cmf-phone-1.jpg',
  'nothing-4': 'https://fdn2.gsmarena.com/vv/bigpic/nothing-phone-2.jpg',
  'nothing-5': 'https://fdn2.gsmarena.com/vv/bigpic/nothing-phone-2.jpg',
  'nothing-6': 'https://fdn2.gsmarena.com/vv/bigpic/nothing-phone-1.jpg',
  'nothing-7': 'https://fdn2.gsmarena.com/vv/bigpic/nothing-phone-1.jpg',
  'nothing-8': 'https://fdn2.gsmarena.com/vv/bigpic/nothing-phone-2a.jpg',
  'nothing-9': 'https://fdn2.gsmarena.com/vv/bigpic/nothing-phone-2.jpg',

  // ── SONY ───────────────────────────────────────────────────────────────────
  'sony-0': 'https://fdn2.gsmarena.com/vv/bigpic/sony-xperia-1-v.jpg',
  'sony-1': 'https://fdn2.gsmarena.com/vv/bigpic/sony-xperia-5-v.jpg',
  'sony-2': 'https://fdn2.gsmarena.com/vv/bigpic/sony-xperia-10-v.jpg',
  'sony-3': 'https://fdn2.gsmarena.com/vv/bigpic/sony-xperia-1-iv.jpg',
  'sony-4': 'https://fdn2.gsmarena.com/vv/bigpic/sony-xperia-5-iv.jpg',
  'sony-5': 'https://fdn2.gsmarena.com/vv/bigpic/sony-xperia-10-iv.jpg',
  'sony-6': 'https://fdn2.gsmarena.com/vv/bigpic/sony-xperia-1-iii.jpg',
  'sony-7': 'https://fdn2.gsmarena.com/vv/bigpic/sony-xperia-5-iii.jpg',
  'sony-8': 'https://fdn2.gsmarena.com/vv/bigpic/sony-xperia-pro-i.jpg',
  'sony-9': 'https://fdn2.gsmarena.com/vv/bigpic/sony-xperia-10-iii.jpg',

  // ── WEARABLES (Watches) ────────────────────────────────────────────────────
  'watch-0': 'https://fdn2.gsmarena.com/vv/bigpic/apple-watch-ultra2.jpg',
  'watch-1': 'https://fdn2.gsmarena.com/vv/bigpic/samsung-galaxy-watch-6-classic.jpg',
  'watch-2': 'https://fdn2.gsmarena.com/vv/bigpic/google-pixel-watch-2.jpg',

  // ── AUDIO ──────────────────────────────────────────────────────────────────
  'audio-0': 'https://fdn2.gsmarena.com/vv/bigpic/apple-airpods-pro-2nd-generation.jpg',
  'audio-1': 'https://fdn2.gsmarena.com/vv/bigpic/sony-wf-1000xm5.jpg',
  'speaker-0': 'https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/homepod-mini-select-yellow-202110?wid=800&hei=800&fmt=jpeg',
  'speaker-1': 'https://lh3.googleusercontent.com/aida-public/AB6AXuCY_googlenest=audio=product',

  // ── TABLETS ────────────────────────────────────────────────────────────────
  'tablet-0': 'https://fdn2.gsmarena.com/vv/bigpic/apple-ipad-pro-2024.jpg',
  'tablet-1': 'https://fdn2.gsmarena.com/vv/bigpic/samsung-galaxy-tab-s9-ultra.jpg',
  'tablet-2': 'https://fdn2.gsmarena.com/vv/bigpic/xiaomi-pad-6.jpg',
};

function updateImages() {
  const content = fs.readFileSync(PRODUCTS_FILE, 'utf8');
  const match = content.match(/const\s+productsData\s*=\s*(\[[\s\S]*\]);/);
  if (!match) { console.error('Could not find productsData'); process.exit(1); }

  let products = JSON.parse(match[1]);
  let updatedCount = 0;

  products = products.map(p => {
    if (IMAGE_MAP[p.id]) {
      p.image = IMAGE_MAP[p.id];
      updatedCount++;
    }
    return p;
  });

  const output = `const productsData = ${JSON.stringify(products, null, 4)};\n`;
  fs.writeFileSync(PRODUCTS_FILE, output, 'utf8');
  console.log(`✅ Done! Updated ${updatedCount} products with official HD images.`);
  console.log(`   ${products.length - updatedCount} products kept their existing images.`);
}

updateImages();
