const fs = require('fs');
const path = './js/products.js';
let content = fs.readFileSync(path, 'utf8');
// Extract the array part
const arrayStr = content.replace(/const\s+productsData\s*=\s*/, '').replace(/;\s*$/,'' );
let data = JSON.parse(arrayStr);
// Update images for smartphones
data = data.map(item => {
  if (item.category === 'smartphones') {
    const query = encodeURIComponent(item.name + ' smartphone');
    item.image = `https://source.unsplash.com/800x800/?${query}`;
  }
  return item;
});
const output = 'const productsData = ' + JSON.stringify(data, null, 4) + ';';
fs.writeFileSync(path, output, 'utf8');
console.log('Smartphone images updated with Unsplash URLs.');
