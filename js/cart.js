// Shopping Cart Logic for Luxe Tech Storefront

const CART_KEY = 'pomato_cart';

// --- State Management ---
function readCart() {
    try {
        return JSON.parse(localStorage.getItem(CART_KEY) || '{}');
    } catch {
        return {};
    }
}

function writeCart(cart) {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

function validateCart() {
    if (typeof productsData === 'undefined') return;
    const cart = readCart();
    let changed = false;
    for (const id in cart) {
        if (!productsData.some(p => p.id === id)) {
            delete cart[id];
            changed = true;
        }
    }
    if (changed) {
        writeCart(cart);
    }
}


function cartCount() {
    const cart = readCart();
    if (typeof productsData === 'undefined') return 0;
    return Object.keys(cart).reduce((sum, productId) => {
        const productExists = productsData.some(p => p.id === productId);
        return productExists ? sum + (Number(cart[productId]) || 0) : sum;
    }, 0);
}

function updateCartCountUI() {
    const els = document.querySelectorAll('#cart-count');
    const count = cartCount();
    els.forEach(el => {
        el.textContent = String(count);
        // Add a nice pop animation
        el.classList.remove('scale-100');
        el.classList.add('scale-125');
        setTimeout(() => {
            el.classList.remove('scale-125');
            el.classList.add('scale-100');
        }, 150);
    });
}

function addToCart(productId) {
    const cart = readCart();
    cart[productId] = (cart[productId] || 0) + 1;
    writeCart(cart);
    updateCartCountUI();
    openCart(); // Automatically open cart when item is added
}

function removeFromCart(productId) {
    const cart = readCart();
    delete cart[productId];
    writeCart(cart);
    updateCartCountUI();
    renderCart();
}

function updateCartItemQty(productId, delta) {
    const cart = readCart();
    const newQty = (cart[productId] || 0) + delta;
    if (newQty <= 0) {
        delete cart[productId];
    } else {
        cart[productId] = newQty;
    }
    writeCart(cart);
    updateCartCountUI();
    renderCart();
}

// --- Price Calculation Helper ---
function parsePrice(price) {
    if (typeof price === 'number') return price;
    if (!price) return 0;
    return Number(price.replace(/[^0-9]/g, ''));
}

function formatPrice(num) {
    if (window.currency && window.currency.format) {
        return window.currency.format(num);
    }
    return '₹' + num.toLocaleString('en-IN');
}

// --- Cart UI ---
let cartModalInitialized = false;

function initCartUI() {
    if (cartModalInitialized) return;
    
    // Inject Cart HTML
    const cartHTML = `
        <div id="cart-overlay" class="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] opacity-0 invisible transition-all duration-300"></div>
        <div id="cart-sidebar" class="fixed top-0 right-0 h-full w-full max-w-md bg-surface-container-lowest border-l border-white/10 shadow-2xl z-[101] translate-x-full transition-transform duration-300 flex flex-col">
            <!-- Header -->
            <div class="p-6 border-b border-white/10 flex justify-between items-center bg-surface-container/50">
                <h2 class="font-headline-md text-headline-md text-white flex items-center gap-2">
                    <span class="material-symbols-outlined text-primary" data-icon="shopping_cart">shopping_cart</span> 
                    Your Cart
                </h2>
                <button id="close-cart-btn" class="p-2 text-zinc-400 hover:text-white transition-colors rounded-full hover:bg-white/5 active:scale-95">
                    <span class="material-symbols-outlined" data-icon="close">close</span>
                </button>
            </div>
            
            <!-- Cart Items -->
            <div id="cart-items-container" class="flex-1 overflow-y-auto p-6 space-y-4">
                <!-- Items will be injected here -->
            </div>
            
            <!-- Cart Summary (Matching requested layout) -->
            <div id="cart-summary" class="bg-surface-container-low border-t border-white/10 p-6 flex-shrink-0">
                <div class="space-y-3 mb-4">
                    <div class="flex justify-between text-zinc-400 font-label-md">
                        <span>MRP</span>
                        <span id="cart-mrp" class="text-white">₹0</span>
                    </div>
                    <div class="flex justify-between text-zinc-400 font-label-md">
                        <span>Discounts <span class="material-symbols-outlined text-[14px] align-middle" data-icon="expand_more">expand_more</span></span>
                        <span id="cart-discount" class="text-green-400">- ₹0</span>
                    </div>
                    <div class="border-t border-white/10 my-2 pt-2 flex justify-between font-headline-sm text-white">
                        <span>Total Amount</span>
                        <span id="cart-total">₹0</span>
                    </div>
                </div>
                
                <div id="cart-savings-banner" class="bg-green-500/10 border border-green-500/20 rounded-lg p-3 flex items-center justify-center gap-2 text-green-400 font-label-md mb-6 hidden">
                    <span class="material-symbols-outlined" data-icon="local_offer" style="font-variation-settings: 'FILL' 1;">local_offer</span>
                    You'll save <span id="cart-savings-amount" class="font-bold">₹0</span> on this order!
                </div>
                
                <div class="flex items-start gap-3 mb-4 text-zinc-400 text-sm">
                    <span class="material-symbols-outlined text-zinc-500 text-3xl" data-icon="verified_user">verified_user</span>
                    <p>Safe and secure payments. Easy returns. 100% Authentic products.</p>
                </div>
                
                <div class="bg-surface-container border border-white/10 rounded-xl p-4 flex justify-between items-center shadow-lg">
                    <div class="flex flex-col">
                        <span id="cart-bottom-mrp" class="text-zinc-500 line-through text-xs mb-1">₹0</span>
                        <div class="flex items-center gap-1">
                            <span id="cart-bottom-total" class="font-headline-md text-white">₹0</span>
                            <span class="material-symbols-outlined text-zinc-500 text-sm" data-icon="info">info</span>
                        </div>
                    </div>
                    <button onclick="window.location.href='checkout.html'" class="bg-[#FFC107] text-black font-label-md font-bold px-8 py-3 rounded-lg hover:bg-[#FFD54F] active:scale-95 transition-all shadow-md">
                        Place Order
                    </button>
                </div>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', cartHTML);
    
    // Event Listeners
    document.getElementById('close-cart-btn').addEventListener('click', closeCart);
    document.getElementById('cart-overlay').addEventListener('click', closeCart);
    
    // Hook up navbar cart buttons
    const navCartBtns = document.querySelectorAll('#cart-btn');
    navCartBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            openCart();
        });
    });

    cartModalInitialized = true;
}

function openCart() {
    initCartUI();
    renderCart();
    
    const overlay = document.getElementById('cart-overlay');
    const sidebar = document.getElementById('cart-sidebar');
    
    // Show overlay
    overlay.classList.remove('invisible', 'opacity-0');
    overlay.classList.add('opacity-100');
    
    // Slide in sidebar
    sidebar.classList.remove('translate-x-full');
}

function closeCart() {
    const overlay = document.getElementById('cart-overlay');
    const sidebar = document.getElementById('cart-sidebar');
    if (!overlay || !sidebar) return;
    
    // Hide overlay
    overlay.classList.remove('opacity-100');
    overlay.classList.add('opacity-0');
    
    // Slide out sidebar
    sidebar.classList.add('translate-x-full');
    
    // Wait for transition to finish before making invisible
    setTimeout(() => {
        if (overlay.classList.contains('opacity-0')) {
            overlay.classList.add('invisible');
        }
    }, 300);
}

function renderCart() {
    const container = document.getElementById('cart-items-container');
    const summary = document.getElementById('cart-summary');
    if (!container || typeof productsData === 'undefined') return;

    const cart = readCart();
    const items = Object.keys(cart);
    
    if (items.length === 0) {
        container.innerHTML = `
            <div class="h-full flex flex-col items-center justify-center text-center text-zinc-500 gap-4">
                <span class="material-symbols-outlined text-6xl opacity-50" data-icon="shopping_basket">shopping_basket</span>
                <p class="font-headline-sm">Your cart is empty</p>
                <button onclick="closeCart()" class="mt-4 px-6 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors">Continue Shopping</button>
            </div>
        `;
        summary.style.display = 'none';
        return;
    }
    
    summary.style.display = 'block';
    container.innerHTML = '';
    
    let totalDiscountedPrice = 0;
    let totalMrp = 0;
    
    items.forEach(productId => {
        const qty = cart[productId];
        const product = productsData.find(p => p.id === productId);
        if (!product) return;
        
        // Calculate prices
        const price = parsePrice(product.price);
        // Create a mock MRP (e.g. 15% higher to show a discount) to match requested screenshot layout
        const mrp = Math.floor(price * 1.15); 
        
        totalDiscountedPrice += (price * qty);
        totalMrp += (mrp * qty);
        
        const imageSrc = product.image;
        
        const itemEl = document.createElement('div');
        itemEl.className = "flex gap-4 p-4 bg-surface-container rounded-xl border border-white/5";
        itemEl.innerHTML = `
            <div class="w-20 h-20 bg-white/5 rounded-lg overflow-hidden flex-shrink-0 flex items-center justify-center">
                <img src="${imageSrc}" class="w-full h-full object-contain p-2" onerror="this.src='https://via.placeholder.com/150?text=Product'">
            </div>
            <div class="flex-1 flex flex-col">
                <div class="flex justify-between items-start">
                    <h4 class="font-label-md text-white line-clamp-2">${product.name}</h4>
                    <button class="text-zinc-500 hover:text-red-400 transition-colors p-1" onclick="removeFromCart('${product.id}')">
                        <span class="material-symbols-outlined text-sm" data-icon="delete">delete</span>
                    </button>
                </div>
                <p class="text-xs text-zinc-500 mb-2">${product.brand.charAt(0).toUpperCase() + product.brand.slice(1)}</p>
                
                <div class="flex justify-between items-end mt-auto">
                    <div>
                        <span class="text-xs text-zinc-500 line-through mr-1">${formatPrice(mrp)}</span>
                        <span class="font-label-md text-white">${formatPrice(price)}</span>
                    </div>
                    
                    <div class="flex items-center bg-surface-container-highest rounded-lg border border-white/10 overflow-hidden">
                        <button class="px-2 py-1 text-zinc-400 hover:text-white hover:bg-white/10 transition-colors" onclick="updateCartItemQty('${product.id}', -1)">-</button>
                        <span class="px-3 py-1 text-xs font-label-md text-white border-x border-white/10 min-w-[32px] text-center">${qty}</span>
                        <button class="px-2 py-1 text-zinc-400 hover:text-white hover:bg-white/10 transition-colors" onclick="updateCartItemQty('${product.id}', 1)">+</button>
                    </div>
                </div>
            </div>
        `;
        container.appendChild(itemEl);
    });
    
    // Update Summary
    const discount = totalMrp - totalDiscountedPrice;
    
    document.getElementById('cart-mrp').textContent = formatPrice(totalMrp);
    document.getElementById('cart-discount').textContent = '- ' + formatPrice(discount);
    document.getElementById('cart-total').textContent = formatPrice(totalDiscountedPrice);
    
    document.getElementById('cart-bottom-mrp').textContent = formatPrice(totalMrp);
    document.getElementById('cart-bottom-total').textContent = formatPrice(totalDiscountedPrice);
    
    const savingsBanner = document.getElementById('cart-savings-banner');
    if (discount > 0) {
        savingsBanner.classList.remove('hidden');
        document.getElementById('cart-savings-amount').textContent = formatPrice(discount);
    } else {
        savingsBanner.classList.add('hidden');
    }
}

// Global initialization
document.addEventListener('DOMContentLoaded', () => {
    validateCart();
    initCartUI();
    updateCartCountUI();
});

// Delegated handler for dynamically-rendered product cards across all pages.
document.body.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-cart-add]');
    if (!btn) return;
    const productId = btn.getAttribute('data-cart-add');
    if (!productId) return;
    addToCart(productId);
});
