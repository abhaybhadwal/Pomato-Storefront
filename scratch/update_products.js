const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../js/products.js');
let content = fs.readFileSync(productsFilePath, 'utf8');

// Extract the productsData array
const match = content.match(/const\s+productsData\s*=\s*(\[[\s\S]*?\]);/);
if (!match) {
    console.error("Could not find productsData array");
    process.exit(1);
}

let productsData;
try {
    // using eval to parse the array safely enough in this local script
    productsData = eval(match[1]);
} catch(e) {
    console.error("Error parsing products data", e);
    process.exit(1);
}

// 3 Generated HD Phone images
const phoneImages = [
    "C:/Users/princ/.gemini/antigravity/brain/cd5ef136-f266-43e6-a9fe-6e65da10dfa8/hd_phone_1_1777537019462.png",
    "C:/Users/princ/.gemini/antigravity/brain/cd5ef136-f266-43e6-a9fe-6e65da10dfa8/hd_phone_2_1777537034206.png",
    "C:/Users/princ/.gemini/antigravity/brain/cd5ef136-f266-43e6-a9fe-6e65da10dfa8/hd_phone_3_1777537392825.png"
];

// 1 Generated Watch Image
const watchImage = "C:/Users/princ/.gemini/antigravity/brain/cd5ef136-f266-43e6-a9fe-6e65da10dfa8/hd_watch_1_1777537738239.png";

// Unsplash IDs for other HD categories
const watchImages = [
    watchImage,
    "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=800&q=80",
    "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80"
];

const earphoneImages = [
    "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=800&q=80",
    "https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?w=800&q=80"
];

const speakerImages = [
    "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=800&q=80",
    "https://images.unsplash.com/photo-1545454675-3531b543be5d?w=800&q=80"
];

const tabletImages = [
    "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=800&q=80",
    "https://images.unsplash.com/photo-1585790050230-5dd28404ccb9?w=800&q=80",
    "https://images.unsplash.com/photo-1561154464-82e9adf32764?w=800&q=80"
];

// Update existing phones with new images
productsData.forEach((product, idx) => {
    product.category = 'smartphones'; // Explicitly set category
    product.image = phoneImages[idx % phoneImages.length];
});

// Add new Watches
const newWatches = [
    { id: "watch-0", brand: "apple", name: "Apple Watch Ultra 2", rating: "4.9", feature: "Titanium Case", price: "RS 89,000", image: watchImages[0], badge: "Premium", category: "accessories", type: "watch" },
    { id: "watch-1", brand: "samsung", name: "Galaxy Watch 6 Classic", rating: "4.8", feature: "Rotating Bezel", price: "RS 45,000", image: watchImages[1], badge: "Hot", category: "accessories", type: "watch" },
    { id: "watch-2", brand: "google", name: "Pixel Watch 2", rating: "4.6", feature: "Fitbit Integration", price: "RS 35,000", image: watchImages[2], badge: null, category: "accessories", type: "watch" }
];

// Add new Earphones
const newEarphones = [
    { id: "audio-0", brand: "apple", name: "AirPods Pro Gen 2", rating: "4.9", feature: "Active Noise Cancellation", price: "RS 25,000", image: earphoneImages[0], badge: "Best Seller", category: "accessories", type: "audio" },
    { id: "audio-1", brand: "sony", name: "Sony WF-1000XM5", rating: "4.8", feature: "Hi-Res Audio", price: "RS 29,000", image: earphoneImages[1], badge: null, category: "accessories", type: "audio" }
];

// Add new Speakers
const newSpeakers = [
    { id: "speaker-0", brand: "apple", name: "HomePod Mini", rating: "4.7", feature: "360 Audio", price: "RS 10,000", image: speakerImages[0], badge: null, category: "accessories", type: "audio" },
    { id: "speaker-1", brand: "google", name: "Nest Audio", rating: "4.5", feature: "Google Assistant", price: "RS 8,000", image: speakerImages[1], badge: null, category: "accessories", type: "audio" }
];

// Add new Tablets
const newTablets = [
    { id: "tablet-0", brand: "apple", name: "iPad Pro M4", rating: "5.0", feature: "OLED Display", price: "RS 110,000", image: tabletImages[0], badge: "Future", category: "tablets", type: "tablet" },
    { id: "tablet-1", brand: "samsung", name: "Galaxy Tab S9 Ultra", rating: "4.9", feature: "S-Pen Included", price: "RS 120,000", image: tabletImages[1], badge: null, category: "tablets", type: "tablet" },
    { id: "tablet-2", brand: "xiaomi", name: "Xiaomi Pad 6 Max", rating: "4.6", feature: "14-inch Display", price: "RS 50,000", image: tabletImages[2], badge: null, category: "tablets", type: "tablet" }
];

const newProductsData = [...productsData, ...newWatches, ...newEarphones, ...newSpeakers, ...newTablets];

const newContent = `const productsData = ${JSON.stringify(newProductsData, null, 4)};\n`;
fs.writeFileSync(productsFilePath, newContent, 'utf8');

console.log("Updated products.js with HD images and new categories.");
