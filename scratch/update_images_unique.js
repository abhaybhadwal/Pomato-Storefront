const fs = require('fs');
const path = '../js/products.js';

let content = fs.readFileSync(path, 'utf8');

// Parse the JSON array
const jsonStr = content.replace('const productsData = ', '').replace(/;$/, '');
let data = JSON.parse(jsonStr);

// Helper function to create a clean URL slug from the product name
function slugify(text) {
    return text.toString().toLowerCase()
        .replace(/\s+/g, '-')           // Replace spaces with -
        .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
        .replace(/\-\-+/g, '-')         // Replace multiple - with single -
        .replace(/^-+/, '')             // Trim - from start of text
        .replace(/-+$/, '');            // Trim - from end of text
}

data = data.map(item => {
    const slug = slugify(item.name);
    // e.g. images/apple-iphone-15-pro-max.png
    item.image = `images/${item.brand}-${slug}.png`;
    return item;
});

const output = `const productsData = ${JSON.stringify(data, null, 4)};`;
fs.writeFileSync(path, output);
console.log('Successfully updated image paths to be unique for all 80 devices!');
