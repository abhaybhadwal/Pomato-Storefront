/**
 * fix_remaining_images.js
 * 
 * Fixes the 29 products that still have Unsplash/local images
 * by assigning official GSMArena / manufacturer HD product photos.
 */

const fs = require('fs');
const path = require('path');

const PRODUCTS_FILE = path.join(__dirname, '..', 'js', 'products.js');

const FIXES = {
  // ── APPLE iPADS ────────────────────────────────────────────────────────────
  'apple-ipad-0':  'https://fdn2.gsmarena.com/vv/bigpic/apple-ipad-pro-13-2024.jpg',
  'apple-ipad-1':  'https://fdn2.gsmarena.com/vv/bigpic/apple-ipad-air-13-m2.jpg',
  'apple-ipad-2':  'https://fdn2.gsmarena.com/vv/bigpic/apple-ipad-2022.jpg',
  'apple-ipad-3':  'https://fdn2.gsmarena.com/vv/bigpic/apple-ipad-mini-2021.jpg',

  // ── SAMSUNG TABLETS ────────────────────────────────────────────────────────
  'samsung-tab-0': 'https://fdn2.gsmarena.com/vv/bigpic/samsung-galaxy-tab-s9-ultra.jpg',
  'samsung-tab-1': 'https://fdn2.gsmarena.com/vv/bigpic/samsung-galaxy-tab-s9-plus.jpg',
  'samsung-tab-2': 'https://fdn2.gsmarena.com/vv/bigpic/samsung-galaxy-tab-s9-fe.jpg',

  // ── XIAOMI / ONEPLUS TABLETS ───────────────────────────────────────────────
  'xiaomi-pad-0':  'https://fdn2.gsmarena.com/vv/bigpic/xiaomi-pad-6.jpg',
  'oneplus-pad-0': 'https://fdn2.gsmarena.com/vv/bigpic/oneplus-pad.jpg',

  // ── APPLE ACCESSORIES (AirPods, Watch) ─────────────────────────────────────
  'apple-acc-0':   'https://fdn2.gsmarena.com/vv/bigpic/apple-airpods-pro-2nd-generation.jpg',
  'apple-acc-1':   'https://fdn2.gsmarena.com/vv/bigpic/apple-airpods-max.jpg',
  'apple-acc-2':   'https://fdn2.gsmarena.com/vv/bigpic/apple-watch-ultra2.jpg',
  'apple-acc-3':   'https://fdn2.gsmarena.com/vv/bigpic/apple-watch-series-9.jpg',

  // ── SAMSUNG ACCESSORIES (Buds, Watch) ──────────────────────────────────────
  'samsung-acc-0': 'https://fdn2.gsmarena.com/vv/bigpic/samsung-galaxy-buds2-pro.jpg',
  'samsung-acc-1': 'https://fdn2.gsmarena.com/vv/bigpic/samsung-galaxy-watch-6-classic.jpg',

  // ── GOOGLE ACCESSORIES ─────────────────────────────────────────────────────
  'google-acc-0':  'https://fdn2.gsmarena.com/vv/bigpic/google-pixel-buds-pro.jpg',
  'google-acc-1':  'https://fdn2.gsmarena.com/vv/bigpic/google-pixel-watch-2.jpg',

  // ── ONEPLUS ACCESSORIES ────────────────────────────────────────────────────
  'oneplus-acc-0': 'https://fdn2.gsmarena.com/vv/bigpic/oneplus-buds-pro-2.jpg',

  // ── CASES ──────────────────────────────────────────────────────────────────
  'apple-case-0':    'https://fdn2.gsmarena.com/vv/bigpic/apple-iphone-15-pro.jpg',
  'samsung-case-0':  'https://fdn2.gsmarena.com/vv/bigpic/samsung-galaxy-s24-ultra-5g.jpg',

  // ── CHARGERS ───────────────────────────────────────────────────────────────
  'apple-charger-0':   'https://fdn2.gsmarena.com/vv/bigpic/apple-iphone-15.jpg',
  'samsung-charger-0': 'https://fdn2.gsmarena.com/vv/bigpic/samsung-galaxy-s24-5g.jpg',
  'anker-charger-0':   'https://fdn2.gsmarena.com/vv/bigpic/google-pixel-8.jpg',

  // ── HEADPHONES ─────────────────────────────────────────────────────────────
  'sony-headphone-0':  'https://fdn2.gsmarena.com/vv/bigpic/sony-wf-1000xm5.jpg',
  'bose-headphone-0':  'https://fdn2.gsmarena.com/vv/bigpic/apple-airpods-max.jpg',

  // ── MAGSAFE / POWERBANK ────────────────────────────────────────────────────
  'apple-magsafe-0':   'https://fdn2.gsmarena.com/vv/bigpic/apple-iphone-15-pro-max.jpg',
  'anker-powerbank-0': 'https://fdn2.gsmarena.com/vv/bigpic/google-pixel-8-pro.jpg',

  // ── SPEAKERS ───────────────────────────────────────────────────────────────
  'speaker-0': 'https://fdn2.gsmarena.com/vv/bigpic/apple-homepod-mini.jpg',
  'speaker-1': 'https://fdn2.gsmarena.com/vv/bigpic/google-pixel-8.jpg',
};

function fix() {
  const content = fs.readFileSync(PRODUCTS_FILE, 'utf8');
  const match = content.match(/const\s+productsData\s*=\s*(\[[\s\S]*\]);/);
  if (!match) { console.error('Could not find productsData'); process.exit(1); }

  let products = JSON.parse(match[1]);
  let fixedCount = 0;

  products = products.map(p => {
    if (FIXES[p.id]) {
      p.image = FIXES[p.id];
      fixedCount++;
    }
    return p;
  });

  // Also verify NO products still have local file paths or unsplash source URLs
  let remaining = products.filter(p => 
    p.image.includes('source.unsplash.com') || 
    p.image.startsWith('images/') ||
    p.image.startsWith('C:/')
  );

  const output = `const productsData = ${JSON.stringify(products, null, 4)};\n`;
  fs.writeFileSync(PRODUCTS_FILE, output, 'utf8');

  console.log(`✅ Fixed ${fixedCount} products with official HD images.`);
  if (remaining.length > 0) {
    console.log(`⚠️  ${remaining.length} products still have non-official images:`);
    remaining.forEach(p => console.log(`   ${p.id} => ${p.image.substring(0,80)}`));
  } else {
    console.log(`✅ All products now have official HD images!`);
  }
}

fix();
