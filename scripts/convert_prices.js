const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'js', 'products.js');
let content = fs.readFileSync(filePath, 'utf-8');

// Use regex to find "price": "RS 185,000" and convert to "price": 185000
// Handle different formats if any
content = content.replace(/"price":\s*"RS\s*([\d,]+)"/g, (match, priceStr) => {
    const numericPrice = parseInt(priceStr.replace(/,/g, ''));
    return `"price": ${numericPrice}`;
});

fs.writeFileSync(filePath, content, 'utf-8');
console.log('Successfully converted prices to numbers in products.js');
