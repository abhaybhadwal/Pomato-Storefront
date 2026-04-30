const fs = require('fs');
const path = require('path');

const productsJsPath = path.join(__dirname, '..', 'js', 'products.js');
let productsJsContent = fs.readFileSync(productsJsPath, 'utf8');

// Match all image paths
const regex = /"image": "(images\/[^"]+)\.png"/g;
let match;
const images = [];

while ((match = regex.exec(productsJsContent)) !== null) {
    images.push(match[1]); // e.g. 'images/apple-iphone-15-pro-max'
}

// Generate an SVG for each
images.forEach((imgBase, index) => {
    const brand = imgBase.split('/')[1].split('-')[0];
    
    // Create unique gradient colors
    const hue1 = (index * 137) % 360;
    const hue2 = (index * 271 + 180) % 360;
    
    const color1 = `hsl(${hue1}, 80%, 60%)`;
    const color2 = `hsl(${hue2}, 80%, 30%)`;
    
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400">
        <defs>
            <linearGradient id="grad${index}" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stop-color="${color1}" />
                <stop offset="100%" stop-color="${color2}" />
            </linearGradient>
            <filter id="shadow">
                <feDropShadow dx="0" dy="10" stdDeviation="15" flood-opacity="0.3"/>
            </filter>
        </defs>
        
        <!-- Background -->
        <rect width="400" height="400" fill="transparent"/>
        
        <!-- Phone Body -->
        <g transform="translate(110, 20)" filter="url(#shadow)">
            <rect width="180" height="360" rx="24" fill="#1a1a1a" stroke="#444" stroke-width="2"/>
            
            <!-- Screen -->
            <rect x="5" y="5" width="170" height="350" rx="20" fill="url(#grad${index})"/>
            
            <!-- Dynamic Island / Notch -->
            <rect x="55" y="15" width="70" height="20" rx="10" fill="#000"/>
            
            <!-- Reflection highlight -->
            <path d="M 10 20 Q 90 20 170 100 L 170 300 Q 90 300 10 200 Z" fill="rgba(255,255,255,0.05)" pointer-events="none"/>
            
            <!-- Brand Text -->
            <text x="90" y="180" font-family="sans-serif" font-size="24" font-weight="bold" fill="rgba(255,255,255,0.8)" text-anchor="middle" dominant-baseline="middle" transform="rotate(-90 90 180)">
                ${brand.toUpperCase()}
            </text>
        </g>
    </svg>`;
    
    const svgPath = path.join(__dirname, '..', imgBase + '.svg');
    fs.writeFileSync(svgPath, svg);
});

// Update products.js to use .svg instead of .png
const updatedContent = productsJsContent.replace(/"image": "(images\/[^"]+)\.png"/g, '"image": "$1.svg"');
fs.writeFileSync(productsJsPath, updatedContent);

console.log(`Generated ${images.length} unique SVG images and updated products.js`);
