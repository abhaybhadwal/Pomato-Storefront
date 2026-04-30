const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');

// Curated direct image URLs for each product (using gsmarena CDN and official sources)
const imageMap = {
    // Apple
    "apple-iphone-15-pro-max":     "https://fdn2.gsmarena.com/vv/pics/apple/apple-iphone-15-pro-max-1.jpg",
    "apple-iphone-15-pro":         "https://fdn2.gsmarena.com/vv/pics/apple/apple-iphone-15-pro-1.jpg",
    "apple-iphone-15-plus":        "https://fdn2.gsmarena.com/vv/pics/apple/apple-iphone-15-plus-1.jpg",
    "apple-iphone-15":             "https://fdn2.gsmarena.com/vv/pics/apple/apple-iphone-15-1.jpg",
    "apple-iphone-14-pro-max":     "https://fdn2.gsmarena.com/vv/pics/apple/apple-iphone-14-pro-max-1.jpg",
    "apple-iphone-14-pro":         "https://fdn2.gsmarena.com/vv/pics/apple/apple-iphone-14-pro-1.jpg",
    "apple-iphone-14":             "https://fdn2.gsmarena.com/vv/pics/apple/apple-iphone-14-1.jpg",
    "apple-iphone-13":             "https://fdn2.gsmarena.com/vv/pics/apple/apple-iphone-13-1.jpg",
    "apple-iphone-se-2022":        "https://fdn2.gsmarena.com/vv/pics/apple/apple-iphone-se-2022-1.jpg",
    "apple-iphone-12":             "https://fdn2.gsmarena.com/vv/pics/apple/apple-iphone-12-1.jpg",
    // Samsung
    "samsung-galaxy-s24-ultra":    "https://fdn2.gsmarena.com/vv/pics/samsung/samsung-galaxy-s24-ultra-1.jpg",
    "samsung-galaxy-s24":          "https://fdn2.gsmarena.com/vv/pics/samsung/samsung-galaxy-s24-plus-1.jpg",
    "samsung-galaxy-z-fold-5":     "https://fdn2.gsmarena.com/vv/pics/samsung/samsung-galaxy-z-fold5-1.jpg",
    "samsung-galaxy-z-flip-5":     "https://fdn2.gsmarena.com/vv/pics/samsung/samsung-galaxy-z-flip5-1.jpg",
    "samsung-galaxy-s23-ultra":    "https://fdn2.gsmarena.com/vv/pics/samsung/samsung-galaxy-s23-ultra-1.jpg",
    "samsung-galaxy-s23-fe":       "https://fdn2.gsmarena.com/vv/pics/samsung/samsung-galaxy-s23-fe-1.jpg",
    "samsung-galaxy-a54-5g":       "https://fdn2.gsmarena.com/vv/pics/samsung/samsung-galaxy-a54-1.jpg",
    "samsung-galaxy-a34":          "https://fdn2.gsmarena.com/vv/pics/samsung/samsung-galaxy-a34-1.jpg",
    "samsung-galaxy-m14":          "https://fdn2.gsmarena.com/vv/pics/samsung/samsung-galaxy-m14-5g-1.jpg",
    // Google
    "google-pixel-8-pro":          "https://fdn2.gsmarena.com/vv/pics/google/google-pixel-8-pro-1.jpg",
    "google-pixel-8":              "https://fdn2.gsmarena.com/vv/pics/google/google-pixel-8-1.jpg",
    "google-pixel-7-pro":          "https://fdn2.gsmarena.com/vv/pics/google/google-pixel7-pro-1.jpg",
    "google-pixel-7":              "https://fdn2.gsmarena.com/vv/pics/google/google-pixel7-1.jpg",
    "google-pixel-7a":             "https://fdn2.gsmarena.com/vv/pics/google/google-pixel-7a-1.jpg",
    "google-pixel-fold":           "https://fdn2.gsmarena.com/vv/pics/google/google-pixel-fold-1.jpg",
    "google-pixel-6-pro":          "https://fdn2.gsmarena.com/vv/pics/google/google-pixel6-pro-1.jpg",
    "google-pixel-6":              "https://fdn2.gsmarena.com/vv/pics/google/google-pixel6-1.jpg",
    "google-pixel-6a":             "https://fdn2.gsmarena.com/vv/pics/google/google-pixel-6a-1.jpg",
    "google-pixel-5":              "https://fdn2.gsmarena.com/vv/pics/google/google-pixel5-1.jpg",
    // OnePlus
    "oneplus-oneplus-12":          "https://fdn2.gsmarena.com/vv/pics/oneplus/oneplus-12-1.jpg",
    "oneplus-oneplus-12r":         "https://fdn2.gsmarena.com/vv/pics/oneplus/oneplus-12r-1.jpg",
    "oneplus-oneplus-open":        "https://fdn2.gsmarena.com/vv/pics/oneplus/oneplus-open-1.jpg",
    "oneplus-oneplus-11":          "https://fdn2.gsmarena.com/vv/pics/oneplus/oneplus-11-1.jpg",
    "oneplus-oneplus-11r":         "https://fdn2.gsmarena.com/vv/pics/oneplus/oneplus-11r-1.jpg",
    "oneplus-oneplus-nord-3":      "https://fdn2.gsmarena.com/vv/pics/oneplus/oneplus-nord-3-1.jpg",
    "oneplus-oneplus-nord-ce-3":   "https://fdn2.gsmarena.com/vv/pics/oneplus/oneplus-nord-ce3-lite-5g-1.jpg",
    "oneplus-oneplus-10-pro":      "https://fdn2.gsmarena.com/vv/pics/oneplus/oneplus-10-pro-1.jpg",
    "oneplus-oneplus-10t":         "https://fdn2.gsmarena.com/vv/pics/oneplus/oneplus-10t-1.jpg",
    "oneplus-oneplus-9-pro":       "https://fdn2.gsmarena.com/vv/pics/oneplus/oneplus-9-pro-1.jpg",
    // Xiaomi
    "xiaomi-xiaomi-14-ultra":      "https://fdn2.gsmarena.com/vv/pics/xiaomi/xiaomi-14-ultra-1.jpg",
    "xiaomi-xiaomi-14-pro":        "https://fdn2.gsmarena.com/vv/pics/xiaomi/xiaomi-14-pro-1.jpg",
    "xiaomi-xiaomi-14":            "https://fdn2.gsmarena.com/vv/pics/xiaomi/xiaomi-14-1.jpg",
    "xiaomi-redmi-note-13-pro":    "https://fdn2.gsmarena.com/vv/pics/xiaomi/xiaomi-redmi-note-13-pro-plus-1.jpg",
    "xiaomi-poco-x6-pro":          "https://fdn2.gsmarena.com/vv/pics/xiaomi/xiaomi-poco-x6-pro-1.jpg",
    "xiaomi-poco-f5":              "https://fdn2.gsmarena.com/vv/pics/xiaomi/xiaomi-poco-f5-1.jpg",
    "xiaomi-xiaomi-13-pro":        "https://fdn2.gsmarena.com/vv/pics/xiaomi/xiaomi-13-pro-1.jpg",
    "xiaomi-redmi-12-5g":          "https://fdn2.gsmarena.com/vv/pics/xiaomi/xiaomi-redmi-12-1.jpg",
    "xiaomi-xiaomi-pad-6":         "https://fdn2.gsmarena.com/vv/pics/xiaomi/xiaomi-pad-6-1.jpg",
    // ASUS
    "asus-rog-phone-8-pro":        "https://fdn2.gsmarena.com/vv/pics/asus/asus-rog-phone-8-pro-1.jpg",
    "asus-rog-phone-8":            "https://fdn2.gsmarena.com/vv/pics/asus/asus-rog-phone-8-1.jpg",
    "asus-rog-phone-7-ultimate":   "https://fdn2.gsmarena.com/vv/pics/asus/asus-rog-phone-7-ultimate-1.jpg",
    "asus-rog-phone-7":            "https://fdn2.gsmarena.com/vv/pics/asus/asus-rog-phone-7-1.jpg",
    "asus-zenfone-10":             "https://fdn2.gsmarena.com/vv/pics/asus/asus-zenfone-10-1.jpg",
    "asus-zenfone-9":              "https://fdn2.gsmarena.com/vv/pics/asus/asus-zenfone-9-1.jpg",
    "asus-rog-phone-6":            "https://fdn2.gsmarena.com/vv/pics/asus/asus-rog-phone-6-1.jpg",
    "asus-rog-phone-5s":           "https://fdn2.gsmarena.com/vv/pics/asus/asus-rog-phone-5s-1.jpg",
    "asus-zenfone-8":              "https://fdn2.gsmarena.com/vv/pics/asus/asus-zenfone-8-1.jpg",
    "asus-rog-phone-3":            "https://fdn2.gsmarena.com/vv/pics/asus/asus-rog-phone-3-1.jpg",
    // Nothing
    "nothing-nothing-phone-2":     "https://fdn2.gsmarena.com/vv/pics/nothing/nothing-phone-2-1.jpg",
    "nothing-nothing-phone-2a":    "https://fdn2.gsmarena.com/vv/pics/nothing/nothing-phone-2a-1.jpg",
    "nothing-nothing-phone-1":     "https://fdn2.gsmarena.com/vv/pics/nothing/nothing-phone-1-1.jpg",
    "nothing-cmf-phone-1":         "https://fdn2.gsmarena.com/vv/pics/nothing/nothing-cmf-phone-1-1.jpg",
    "nothing-phone-2-white":       "https://fdn2.gsmarena.com/vv/pics/nothing/nothing-phone-2-1.jpg",
    "nothing-phone-2-dark":        "https://fdn2.gsmarena.com/vv/pics/nothing/nothing-phone-2-1.jpg",
    "nothing-phone-1-white":       "https://fdn2.gsmarena.com/vv/pics/nothing/nothing-phone-1-1.jpg",
    "nothing-phone-2a-milk":       "https://fdn2.gsmarena.com/vv/pics/nothing/nothing-phone-2a-1.jpg",
    "nothing-phone-2a-black":      "https://fdn2.gsmarena.com/vv/pics/nothing/nothing-phone-2a-1.jpg",
    "nothing-nothing-concept":     "https://fdn2.gsmarena.com/vv/pics/nothing/nothing-phone-2-1.jpg",
    // Sony
    "sony-xperia-1-v":             "https://fdn2.gsmarena.com/vv/pics/sony/sony-xperia-1-v-1.jpg",
    "sony-xperia-5-v":             "https://fdn2.gsmarena.com/vv/pics/sony/sony-xperia-5-v-1.jpg",
    "sony-xperia-10-v":            "https://fdn2.gsmarena.com/vv/pics/sony/sony-xperia-10-v-1.jpg",
    "sony-xperia-1-iv":            "https://fdn2.gsmarena.com/vv/pics/sony/sony-xperia-1-iv-1.jpg",
    "sony-xperia-5-iv":            "https://fdn2.gsmarena.com/vv/pics/sony/sony-xperia-5-iv-1.jpg",
    "sony-xperia-pro-i":           "https://fdn2.gsmarena.com/vv/pics/sony/sony-xperia-pro-i-1.jpg",
    "sony-xperia-1-iii":           "https://fdn2.gsmarena.com/vv/pics/sony/sony-xperia-1-iii-1.jpg",
    "sony-xperia-5-iii":           "https://fdn2.gsmarena.com/vv/pics/sony/sony-xperia-5-iii-1.jpg",
    "sony-xperia-10-iii":          "https://fdn2.gsmarena.com/vv/pics/sony/sony-xperia-10-iii-1.jpg",
    "sony-xperia-1-ii":            "https://fdn2.gsmarena.com/vv/pics/sony/sony-xperia-1-ii-1.jpg",
    // Tablets
    "apple-ipad-pro-13-2024":      "https://fdn2.gsmarena.com/vv/pics/apple/apple-ipad-pro-13-2024-1.jpg",
    "apple-ipad-air-13-2024":      "https://fdn2.gsmarena.com/vv/pics/apple/apple-ipad-air-13-2024-1.jpg",
    "apple-ipad-10-9-2022":        "https://fdn2.gsmarena.com/vv/pics/apple/apple-ipad-109-2022-1.jpg",
    "apple-ipad-mini-2021":        "https://fdn2.gsmarena.com/vv/pics/apple/apple-ipad-mini-2021-1.jpg",
    "samsung-galaxy-tab-s9-ultra": "https://fdn2.gsmarena.com/vv/pics/samsung/samsung-galaxy-tab-s9-ultra-1.jpg",
    "samsung-galaxy-tab-s9-plus":  "https://fdn2.gsmarena.com/vv/pics/samsung/samsung-galaxy-tab-s9-plus-1.jpg",
    "samsung-galaxy-tab-s9-fe":    "https://fdn2.gsmarena.com/vv/pics/samsung/samsung-galaxy-tab-s9-fe-1.jpg",
    "xiaomi-pad-6":                "https://fdn2.gsmarena.com/vv/pics/xiaomi/xiaomi-pad-6-1.jpg",
    "oneplus-pad":                 "https://fdn2.gsmarena.com/vv/pics/oneplus/oneplus-pad-1.jpg"
};

const IMAGES_DIR = path.join(__dirname, '..', 'images');

function downloadImage(url, dest) {
    return new Promise((resolve, reject) => {
        const file = fs.createWriteStream(dest);
        const mod = url.startsWith('https') ? https : http;
        const req = mod.get(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120 Safari/537.36',
                'Referer': 'https://www.gsmarena.com/',
                'Accept': 'image/webp,image/apng,image/*,*/*;q=0.8',
            }
        }, (res) => {
            if (res.statusCode === 200) {
                res.pipe(file);
                file.on('finish', () => file.close(() => resolve()));
            } else {
                file.close(() => fs.unlink(dest, () => {}));
                reject(new Error(`HTTP ${res.statusCode} for ${url}`));
            }
        });
        req.on('error', (err) => {
            file.close(() => fs.unlink(dest, () => {}));
            reject(err);
        });
    });
}

(async () => {
    let success = 0;
    let failed = [];

    for (const [key, url] of Object.entries(imageMap)) {
        const dest = path.join(IMAGES_DIR, `${key}.jpg`);
        if (fs.existsSync(dest)) {
            continue;
        }
        try {
            process.stdout.write(`Downloading ${key}... `);
            await downloadImage(url, dest);
            console.log(`OK`);
            success++;
        } catch (err) {
            console.log(`FAILED (${err.message})`);
            failed.push(key);
        }
        // Small delay between requests to be polite
        await new Promise(r => setTimeout(r, 300));
    }

    console.log(`\nDone! ${success} downloaded, ${failed.length} failed.`);
    if (failed.length > 0) {
        console.log('Failed:', failed.join(', '));
    }
})();
