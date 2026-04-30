// update_products_images.js
// This script updates the image URLs in js/products.js to point to locally downloaded official images.

const fs = require('fs');
const path = require('path');

const productsPath = path.join(__dirname, '..', 'js', 'products.js');
const mappingPath = path.join(__dirname, 'official_images.json');

if (!fs.existsSync(mappingPath)) {
  console.error('official_images.json not found. Run get_og_images.js first.');
  process.exit(1);
}

const mapping = JSON.parse(fs.readFileSync(mappingPath, 'utf-8'));

// Load the product data via the exported module (products.js must export productsData)
let productsData = [];
try {
  const prodModule = require(productsPath);
  productsData = prodModule.productsData || [];
} catch (e) {
  console.error('Failed to load products.js. Ensure it exports productsData.', e);
  process.exit(1);
}

// Update each product's image field to local path
for (const product of productsData) {
  const url = mapping[product.id];
  if (url) {
    const ext = path.extname(new URL(url).pathname) || '.jpg';
    product.image = `images/official/${product.id}${ext}`;
  }
}

// Write back to products.js file
// We'll generate a new file content preserving the original structure.
const originalContent = fs.readFileSync(productsPath, 'utf-8');
// Find the start of the array definition (after const productsData = ) and replace the array content.
const arrayStart = originalContent.indexOf('[');
const arrayEnd = originalContent.lastIndexOf(']');
if (arrayStart === -1 || arrayEnd === -1) {
  console.error('Could not locate products array in products.js');
  process.exit(1);
}
const before = originalContent.slice(0, arrayStart);
const after = originalContent.slice(arrayEnd + 1);
const newArrayContent = JSON.stringify(productsData, null, 2);
const newContent = `${before}${newArrayContent}${after}`;
fs.writeFileSync(productsPath, newContent, 'utf-8');
console.log('products.js updated with local image paths.');
