const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../js/products.js');
let content = fs.readFileSync(productsFilePath, 'utf8');

// Extract the productsData array
const match = content.match(/const\s+productsData\s*=\s*(\[[\s\S]*?\]);/);
if (!match) {
    console.error("Could not find productsData array");
    process.exit(1);
}

let productsData;
try {
    productsData = eval(match[1]);
} catch(e) {
    console.error("Error parsing products data", e);
    process.exit(1);
}

function slugify(text) {
    return text.toString().toLowerCase()
        .replace(/\s+/g, '-')           // Replace spaces with -
        .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
        .replace(/\-\-+/g, '-')         // Replace multiple - with single -
        .replace(/^-+/, '')             // Trim - from start of text
        .replace(/-+$/, '');            // Trim - from end of text
}

// Revert existing phones with original images
productsData.forEach((product) => {
    if (product.category === 'smartphones' || !product.category) {
        const slug = slugify(product.name);
        // Set back to the SVG format, brand.html will fallback to png/jpg if svg fails
        product.image = `images/${product.brand}-${slug}.svg`;
    }
});

const newContent = `const productsData = ${JSON.stringify(productsData, null, 4)};\n`;
fs.writeFileSync(productsFilePath, newContent, 'utf8');

console.log("Restored original images for smartphones.");
