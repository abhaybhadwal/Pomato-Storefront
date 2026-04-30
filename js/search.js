// Search Functionality for Luxe Tech Storefront

function initSearchUI() {
    if (document.getElementById('search-overlay')) return;

    const searchHTML = `
        <div id="search-overlay" class="fixed inset-0 bg-black/80 backdrop-blur-xl z-[200] opacity-0 invisible transition-all duration-300 flex flex-col items-center pt-24 px-6">
            <button id="close-search-btn" class="absolute top-8 right-8 p-3 text-zinc-400 hover:text-white transition-colors rounded-full hover:bg-white/5">
                <span class="material-symbols-outlined text-3xl">close</span>
            </button>
            
            <div class="w-full max-w-2xl transform translate-y-4 transition-transform duration-300" id="search-content">
                <div class="relative group">
                    <span class="material-symbols-outlined absolute left-6 top-1/2 -translate-y-1/2 text-zinc-500 text-3xl group-focus-within:text-blue-400 transition-colors">search</span>
                    <input type="text" id="search-input" placeholder="Search for brands, models, or categories..." 
                        class="w-full bg-white/5 border border-white/10 rounded-2xl py-6 pl-20 pr-8 text-2xl text-white placeholder-zinc-600 focus:outline-none focus:border-blue-500/50 focus:ring-4 focus:ring-blue-500/10 transition-all">
                </div>
                
                <div id="search-results" class="mt-8 grid grid-cols-1 gap-4 max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar">
                    <!-- Quick suggestions or results -->
                    <div class="p-4 text-zinc-500 text-center italic">Type to start searching...</div>
                </div>
            </div>
        </div>
        
        <style>
            .custom-scrollbar::-webkit-scrollbar { width: 6px; }
            .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
            .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 10px; }
            .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(255,255,255,0.2); }
        </style>
    `;

    document.body.insertAdjacentHTML('beforeend', searchHTML);

    const overlay = document.getElementById('search-overlay');
    const input = document.getElementById('search-input');
    const resultsContainer = document.getElementById('search-results');
    const content = document.getElementById('search-content');

    const closeSearch = () => {
        overlay.classList.add('opacity-0', 'invisible');
        content.classList.add('translate-y-4');
        input.value = '';
        resultsContainer.innerHTML = '<div class="p-4 text-zinc-500 text-center italic">Type to start searching...</div>';
    };

    const openSearch = () => {
        overlay.classList.remove('invisible', 'opacity-0');
        content.classList.remove('translate-y-4');
        setTimeout(() => input.focus(), 100);
    };

    document.getElementById('close-search-btn').addEventListener('click', closeSearch);
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) closeSearch();
    });

    // Hook up all search buttons in the navbar
    document.querySelectorAll('#search-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            openSearch();
        });
    });

    // Search Logic
    input.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase().trim();
        if (query.length < 2) {
            resultsContainer.innerHTML = '<div class="p-4 text-zinc-500 text-center italic">Type at least 2 characters...</div>';
            return;
        }

        if (typeof productsData === 'undefined') {
            resultsContainer.innerHTML = '<div class="p-4 text-red-400 text-center">Data not loaded.</div>';
            return;
        }

        const filtered = productsData.filter(p => 
            p.name.toLowerCase().includes(query) || 
            p.brand.toLowerCase().includes(query) || 
            (p.category && p.category.toLowerCase().includes(query)) ||
            (p.feature && p.feature.toLowerCase().includes(query))
        ).slice(0, 8); // Limit to 8 quick results

        if (filtered.length === 0) {
            resultsContainer.innerHTML = `<div class="p-8 text-zinc-500 text-center">No results found for "${query}"</div>`;
            return;
        }

        resultsContainer.innerHTML = filtered.map(p => `
            <a href="brand.html#${p.brand.toLowerCase()}" class="flex items-center gap-6 p-4 rounded-xl hover:bg-white/5 transition-colors border border-white/5 group">
                <div class="w-16 h-16 bg-white/5 rounded-lg flex items-center justify-center p-2 flex-shrink-0">
                    <img src="${p.image.split('?')[0].replace(/\.[a-z0-9]+$/i, '')}.jpg" class="w-full h-full object-contain" onerror="this.src='${p.image}'">
                </div>
                <div class="flex-1">
                    <h4 class="text-white font-bold group-hover:text-blue-400 transition-colors">${p.name}</h4>
                    <p class="text-zinc-500 text-sm">${p.brand} • ${p.category || 'Smartphone'}</p>
                </div>
                <div class="text-right">
                    <p class="text-white font-bold">${window.currency ? window.currency.format(p.price) : p.price}</p>
                    <span class="text-[10px] text-blue-400 font-bold uppercase tracking-widest">View Device</span>
                </div>
            </a>
        `).join('') + `
            <div class="pt-4 border-t border-white/5 text-center">
                <a href="brand.html#${query}" class="text-blue-400 hover:text-blue-300 text-sm font-bold flex items-center justify-center gap-2">
                    View all results for "${query}" <span class="material-symbols-outlined text-sm">arrow_forward</span>
                </a>
            </div>
        `;
    });

    // Handle Enter key
    input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            const query = input.value.trim();
            if (query) {
                window.location.href = `brand.html#${query.toLowerCase()}`;
                closeSearch();
            }
        }
    });
}

document.addEventListener('DOMContentLoaded', initSearchUI);
