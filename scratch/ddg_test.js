const fs = require('fs');
const https = require('https');
const path = require('path');

function fetchHtml(url) {
    return new Promise((resolve, reject) => {
        https.get(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
            }
        }, (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => resolve(data));
        }).on('error', reject);
    });
}

async function searchImage(query) {
    const url = `https://html.duckduckgo.com/html/?q=${encodeURIComponent(query + ' smartphone review site:gsmarena.com')}`;
    const html = await fetchHtml(url);
    // Find the first image link
    const match = html.match(/<img[^>]+src="([^">]+)"/);
    if (match) {
        let imgUrl = match[1];
        if (imgUrl.startsWith('//')) {
            imgUrl = 'https:' + imgUrl;
        } else if (imgUrl.startsWith('/')) {
            imgUrl = 'https://duckduckgo.com' + imgUrl;
        }
        return imgUrl;
    }
    return null;
}

async function run() {
    const url = await searchImage('iPhone 15 Pro Max');
    console.log("Found:", url);
}

run();
