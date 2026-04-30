const { image_search } = require('duckduckgo-images-api');
const fs = require('fs');
const https = require('https');
const http = require('http');
const path = require('path');

// Helper to download image
function downloadImage(url, filepath) {
    return new Promise((resolve, reject) => {
        const client = url.startsWith('https') ? https : http;
        client.get(url, (res) => {
            if (res.statusCode === 200) {
                res.pipe(fs.createWriteStream(filepath))
                   .on('error', reject)
                   .once('close', () => resolve(filepath));
            } else {
                res.resume();
                reject(new Error(`Request Failed With a Status Code: ${res.statusCode}`));
            }
        }).on('error', reject);
    });
}

async function testSearch() {
    try {
        const results = await image_search({ query: "iPhone 15 Pro Max smartphone official render transparent png", moderate: true });
        console.log("Search results:", results.length);
        if (results.length > 0) {
            console.log("First result:", results[0].image);
            await downloadImage(results[0].image, 'images/test_iphone.png');
            console.log("Downloaded successfully to images/test_iphone.png");
        }
    } catch (err) {
        console.error("Error:", err);
    }
}

testSearch();
