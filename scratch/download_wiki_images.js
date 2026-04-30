const https = require('https');
const fs = require('fs');
const path = require('path');

const accessories = {
    "apple-finewoven-case": "iPhone 15 Pro FineWoven Case",
    "samsung-silicone-case": "Samsung Galaxy S24 Ultra Silicone Case",
    "apple-20w-charger": "Apple 20W USB-C Power Adapter",
    "samsung-45w-charger": "Samsung 45W Power Adapter",
    "anker-nano-ii": "Anker Nano II 65W",
    "sony-wh-1000xm5": "Sony WH-1000XM5",
    "bose-qc-ultra": "Bose QuietComfort Ultra Headphones",
    "apple-magsafe-charger": "MagSafe Charger",
    "anker-powercore-5k": "Anker PowerCore Magnetic 5K"
};

const IMAGES_DIR = path.join(__dirname, '..', 'images');

function getWikiImage(title) {
    return new Promise((resolve, reject) => {
        const url = `https://en.wikipedia.org/w/api.php?action=query&generator=search&gsrsearch=${encodeURIComponent(title)}&gsrlimit=1&prop=pageimages&pithumbsize=800&format=json`;
        
        const options = {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                'Accept': 'application/json'
            }
        };

        https.get(url, options, (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => {
                try {
                    const json = JSON.parse(data);
                    if (json.query && json.query.pages) {
                        const pages = json.query.pages;
                        const pageId = Object.keys(pages)[0];
                        if (pages[pageId] && pages[pageId].thumbnail) {
                            resolve(pages[pageId].thumbnail.source);
                        } else {
                            resolve(null);
                        }
                    } else {
                        resolve(null);
                    }
                } catch (e) {
                    reject(e);
                }
            });
        }).on('error', err => reject(err));
    });
}

function downloadImage(url, dest) {
    return new Promise((resolve, reject) => {
        const file = fs.createWriteStream(dest);
        const options = {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                'Accept': 'image/webp,image/apng,image/*,*/*;q=0.8'
            }
        };
        https.get(url, options, (res) => {
            if (res.statusCode === 200) {
                res.pipe(file);
                file.on('finish', () => file.close(() => resolve()));
            } else {
                file.close(() => fs.unlink(dest, () => {}));
                reject(new Error(`HTTP ${res.statusCode}`));
            }
        }).on('error', (err) => {
            file.close(() => fs.unlink(dest, () => {}));
            reject(err);
        });
    });
}

(async () => {
    for (const [key, title] of Object.entries(accessories)) {
        const dest = path.join(IMAGES_DIR, `${key}.jpg`);
        if (fs.existsSync(dest)) {
            console.log(`Skipping ${key}, already exists.`);
            continue;
        }
        
        try {
            process.stdout.write(`Fetching ${title} (${key})... `);
            const imgUrl = await getWikiImage(title);
            if (imgUrl) {
                await downloadImage(imgUrl, dest);
                console.log(`OK`);
            } else {
                console.log(`No image found.`);
            }
        } catch (err) {
            console.log(`FAILED (${err.message})`);
        }
        await new Promise(r => setTimeout(r, 500));
    }
})();
