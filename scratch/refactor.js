const fs = require('fs');
const path = '../brand.html';
let html = fs.readFileSync(path, 'utf8');

// 1. Remove the static product grid items
const startToken = '<!-- Bento Grid Layout -->\r\n<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-md">';
const endToken = '</div>\r\n</div>\r\n</main>';

const startIndex = html.indexOf(startToken);
const endIndex = html.indexOf(endToken);

if (startIndex !== -1 && endIndex !== -1) {
    const beforeGrid = html.substring(0, startIndex + startToken.length);
    // Replace the static items with nothing (leaving the empty grid container)
    // Actually let's just make the container empty with id="product-grid"
    const startToken2 = '<!-- Bento Grid Layout -->';
    const index2 = html.indexOf(startToken2);
    
    const newHtmlBeforeGrid = html.substring(0, index2);
    const newGrid = `<!-- Bento Grid Layout -->
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-md" id="product-grid">
    <!-- Products will be dynamically injected here by JS -->
</div>
</div>
</main>`;
    
    html = newHtmlBeforeGrid + newGrid + html.substring(endIndex + endToken.length);
} else {
    console.log("Could not find grid boundaries");
}

// 2. Change 'Showing 18 premium devices' to 'Showing 80 premium devices'
html = html.replace('Showing 18 premium devices', 'Showing 80 premium devices');

// 3. Replace the script at the bottom
const scriptStart = '<script>';
const scriptEnd = '</script>\r\n</body></html>';
const scriptIndex = html.lastIndexOf(scriptStart);

if(scriptIndex !== -1) {
    const newScript = `<script src="js/products.js"></script>
<script>
document.addEventListener('DOMContentLoaded', () => {
    const productGrid = document.getElementById('product-grid');
    if (!productGrid) return;
    
    // Render products
    function renderProducts(filteredProducts) {
        productGrid.innerHTML = '';
        if(filteredProducts.length === 0) {
            productGrid.innerHTML = '<div class="col-span-full text-center py-12"><p class="text-zinc-500 font-label-md">No products found for this category.</p></div>';
            return;
        }
        
        filteredProducts.forEach(product => {
            const badgeHtml = product.badge ? \`<div class="absolute top-sm right-sm px-base py-xs \${product.badge === 'Hot' ? 'bg-primary-container/20 text-primary-container' : 'bg-blue-500/20 text-blue-400'} rounded-full text-label-sm font-label-sm backdrop-blur-md">\${product.badge}</div>\` : '';
            
            const card = document.createElement('div');
            card.id = product.id;
            card.className = "bg-[#121212] glass-border rounded-xl p-md flex flex-col group hover:bg-[#181818] transition-all duration-300";
            
            card.innerHTML = \`
                <div class="relative w-full aspect-square mb-md overflow-hidden rounded-lg bg-white/5 flex items-center justify-center p-4">
                    <img alt="\${product.name}" class="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500" src="\${product.image}"/>
                    \${badgeHtml}
                </div>
                <div class="flex-1">
                    <div class="flex justify-between items-start mb-xs">
                        <h3 class="font-headline-md text-headline-md text-white">\${product.name}</h3>
                        <div class="flex items-center gap-xs">
                            <span class="material-symbols-outlined text-primary-container scale-75" data-icon="star" style="font-variation-settings: 'FILL' 1;">star</span>
                            <span class="text-label-sm font-label-sm text-zinc-400">\${product.rating}</span>
                        </div>
                    </div>
                    <p class="text-zinc-500 font-label-md mb-md">\${product.feature}</p>
                </div>
                <div class="flex justify-between items-center mt-auto">
                    <span class="text-headline-md font-headline-md text-white">\${product.price}</span>
                    <a href="contact.html?buy=\${product.id.toUpperCase()}" class="bg-primary-container text-white px-md py-sm rounded-full font-label-md inner-glow hover:bg-blue-500 transition-colors active:scale-95 duration-200 text-center">Buy Now</a>
                </div>
            \`;
            productGrid.appendChild(card);
        });
    }

    function filterProducts() {
        let hash = window.location.hash.substring(1).toLowerCase();
        
        let filtered = productsData;
        if (hash && hash !== 'all') {
            filtered = productsData.filter(p => p.brand.toLowerCase() === hash || p.name.toLowerCase().includes(hash));
        }
        
        renderProducts(filtered);
        
        // Update sidebar checkboxes
        const checkboxes = document.querySelectorAll('aside input[type="checkbox"]');
        if(checkboxes.length > 0) {
            checkboxes.forEach(cb => {
                const labelSpan = cb.nextElementSibling;
                if(labelSpan) {
                    const brandName = labelSpan.textContent.toLowerCase();
                    if(hash && hash !== 'all' && brandName.includes(hash)) {
                        cb.checked = true;
                    } else {
                        cb.checked = false;
                    }
                }
            });
        }
        
        if(hash && hash !== 'all') {
            window.scrollTo({
                top: productGrid.offsetTop - 100,
                behavior: 'smooth'
            });
        }
    }

    // Initial load
    filterProducts();
    window.addEventListener('hashchange', filterProducts);
    
    // Sidebar logic
    const checkboxes = document.querySelectorAll('aside input[type="checkbox"]');
    checkboxes.forEach(cb => {
        cb.addEventListener('change', (e) => {
            if (e.target.checked) {
                const labelSpan = e.target.nextElementSibling;
                if(labelSpan) {
                    let brandText = labelSpan.textContent.toLowerCase().split(' / ')[0].split(' ')[0];
                    if(brandText === 'xiaomi') brandText = 'xiaomi';
                    window.location.hash = brandText;
                }
            } else {
                const checkedBox = Array.from(checkboxes).find(box => box.checked);
                if (checkedBox) {
                    let brandText = checkedBox.nextElementSibling.textContent.toLowerCase().split(' / ')[0].split(' ')[0];
                    window.location.hash = brandText;
                } else {
                    window.location.hash = 'all';
                }
            }
        });
    });
});
</script>
</body></html>`;

    html = html.substring(0, scriptIndex) + newScript;
}

fs.writeFileSync(path, html);
console.log("Refactored brand.html");
