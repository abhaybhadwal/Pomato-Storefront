// get_og_images.js
// This script reads the product data and fetches an official image URL for each product using DuckDuckGo Images API.
// It writes a JSON file mapping product IDs to the chosen image URL.

const fs = require('fs');
const path = require('path');
const ddg = require('duckduckgo-images-api');

// Load product data (the file exports productsData)
const productsPath = path.join(__dirname, '..', 'js', 'products.js');
let productsData = [];
try {
  // Require the file – it should export an object with productsData
  const prodModule = require(productsPath);
  productsData = prodModule.productsData || [];
} catch (e) {
  console.error('Failed to load products.js:', e);
  process.exit(1);
}

async function fetchImage(product) {
  const query = `${product.brand} ${product.name}`;
  try {
    const results = await ddg.image_search({
      query,
      moderate: true,
      iterations: 1,
      safeSearch: 'Off',
    });
    if (results && results.length > 0) {
      // Return the first image URL
      return results[0].image;
    }
  } catch (err) {
    console.error(`Error fetching image for ${query}:`, err);
  }
  return null;
}

(async () => {
  const mapping = {};
  for (const product of productsData) {
    const imgUrl = await fetchImage(product);
    if (imgUrl) {
      mapping[product.id] = imgUrl;
      console.log(`${product.id} -> ${imgUrl}`);
    } else {
      console.warn(`No image found for ${product.id}`);
    }
  }
  const outPath = path.join(__dirname, 'official_images.json');
  fs.writeFileSync(outPath, JSON.stringify(mapping, null, 2), 'utf-8');
  console.log('Image mapping written to', outPath);
})();
