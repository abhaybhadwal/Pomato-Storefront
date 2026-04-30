const fs = require('fs');

const path = '../js/products.js';
let content = fs.readFileSync(path, 'utf8');

// The file looks like: const productsData = [ ... ];
// I will parse it, map over it, and overwrite it.
const jsonStr = content.replace('const productsData = ', '').replace(/;$/, '');
let data = JSON.parse(jsonStr);

data = data.map(item => {
    // Set the image to the respective brand image
    item.image = `images/${item.brand}.png`;
    return item;
});

const output = `const productsData = ${JSON.stringify(data, null, 4)};`;
fs.writeFileSync(path, output);
console.log('Successfully updated image paths in js/products.js');
