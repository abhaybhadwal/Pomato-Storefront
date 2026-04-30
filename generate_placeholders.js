const fs = require('fs');
const path = require('path');

const productsData = require('./js/products.js'); // Wait, products.js is not a module.

// I will just read products.js and parse the JSON manually using regex or string manip.
const content = fs.readFileSync(path.join(__dirname, 'js', 'products.js'), 'utf-8');
const match = content.match(/const productsData = (\[[\s\S]*?\]);/);
if (!match) {
    console.log("Could not find productsData");
    process.exit(1);
}

const products = eval(match[1]);
const IMAGES_DIR = path.join(__dirname, 'images');

if (!fs.existsSync(IMAGES_DIR)) fs.mkdirSync(IMAGES_DIR);

let generated = 0;

for (const product of products) {
    const baseName = path.basename(product.image, '.svg');
    const jpgPath = path.join(IMAGES_DIR, `${baseName}.jpg`);
    const pngPath = path.join(IMAGES_DIR, `${baseName}.png`);
    const svgPath = path.join(IMAGES_DIR, `${baseName}.svg`);

    if (!fs.existsSync(jpgPath) && !fs.existsSync(pngPath) && !fs.existsSync(svgPath)) {
        const title = product.name;
        // Generate a nice SVG placeholder
        const colors = [
            '#1a1b1e', '#2e5bff', '#121317', '#343539', '#474746', '#002388'
        ];
        const bgColor = colors[Math.floor(Math.random() * colors.length)];
        
        const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="100%" height="100%">
    <rect width="400" height="400" fill="${bgColor}"/>
    <text x="200" y="200" font-family="Arial, sans-serif" font-size="24" font-weight="bold" fill="#ffffff" text-anchor="middle" dominant-baseline="middle">${title}</text>
</svg>`;
        fs.writeFileSync(svgPath, svg);
        console.log(`Generated SVG placeholder for ${baseName}`);
        generated++;
    }
}

console.log(`Done. Generated ${generated} missing SVG placeholders.`);
