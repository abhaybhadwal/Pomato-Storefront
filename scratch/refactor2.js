const fs = require('fs');
const path = '../brand.html';
let html = fs.readFileSync(path, 'utf8');

// Find start of Bento Grid
const startStr = '<!-- Bento Grid Layout -->';
const endStr = '</div>\n</div>\n</main>';
const endStr2 = '</div>\r\n</div>\r\n</main>';

const startIndex = html.indexOf(startStr);
const endIndex = html.lastIndexOf('</main>');

if (startIndex !== -1 && endIndex !== -1) {
    const beforeGrid = html.substring(0, startIndex);
    
    const newGrid = `<!-- Bento Grid Layout -->
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-md" id="product-grid">
    <!-- Products will be dynamically injected here by JS -->
</div>
</div>
</main>`;
    
    html = beforeGrid + newGrid + html.substring(endIndex + '</main>'.length);
    console.log("Replaced grid boundaries.");
} else {
    console.log("Still could not find grid boundaries.");
}

fs.writeFileSync(path, html);
