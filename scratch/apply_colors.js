const fs = require('fs');

const path = '../js/products.js';
let content = fs.readFileSync(path, 'utf8');

// Parse the JSON array
const jsonStr = content.replace('const productsData = ', '').replace(/;$/, '');
let data = JSON.parse(jsonStr);

// Helper function to create a clean URL slug from the product name
function slugify(text) {
    return text.toString().toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^\w\-]+/g, '')
        .replace(/\-\-+/g, '-')
        .replace(/^-+/, '')
        .replace(/-+$/, '');
}

data = data.map((item, index) => {
    // Revert image path to the valid brand AI render
    item.image = `images/${item.brand}.png`;
    
    // Add a unique CSS filter to make each device look like a different color variant!
    // We will hue-rotate and adjust brightness/contrast slightly based on the index.
    const hue = (index * 45) % 360;
    const brightness = 1 + (index % 3) * 0.1; // 1.0, 1.1, 1.2
    
    item.imageFilter = `hue-rotate(${hue}deg) brightness(${brightness})`;
    
    return item;
});

const output = `const productsData = ${JSON.stringify(data, null, 4)};`;
fs.writeFileSync(path, output);
console.log('Successfully updated image paths and added unique color filters for all 80 devices!');
