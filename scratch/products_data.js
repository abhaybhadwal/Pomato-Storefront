const productsData = [
    {
        "id": "apple-0",
        "brand": "apple",
        "name": "iPhone 15 Pro Max",
        "rating": "4.7",
        "feature": "Titanium Design",
        "price": "RS 160,000",
        "image": "images/2.png",
        "badge": null
    },
    {
        "id": "apple-1",
        "brand": "apple",
        "name": "iPhone 15 Pro",
        "rating": "4.9",
        "feature": "A17 Pro Chip",
        "price": "RS 150,000",
        "image": "images/2.png",
        "badge": null
    },
    {
        "id": "apple-2",
        "brand": "apple",
        "name": "iPhone 15 Plus",
        "rating": "4.6",
        "feature": "Dynamic Island",
        "price": "RS 140,000",
        "image": "images/2.png",
        "badge": null
    },
    {
        "id": "apple-3",
        "brand": "apple",
        "name": "iPhone 15",
        "rating": "4.5",
        "feature": "Super Retina XDR",
        "price": "RS 130,000",
        "image": "images/2.png",
        "badge": null
    },
    {
        "id": "apple-4",
        "brand": "apple",
        "name": "iPhone 14 Pro Max",
        "rating": "4.8",
        "feature": "ProMotion 120Hz",
        "price": "RS 120,000",
        "image": "images/2.png",
        "badge": null
    },
    {
        "id": "apple-5",
        "brand": "apple",
        "name": "iPhone 14 Pro",
        "rating": "4.0",
        "feature": "Ceramic Shield",
        "price": "RS 110,000",
        "image": "images/2.png",
        "badge": null
    },
    {
        "id": "apple-6",
        "brand": "apple",
        "name": "iPhone 14",
        "rating": "4.8",
        "feature": "MagSafe Compatible",
        "price": "RS 100,000",
        "image": "images/2.png",
        "badge": null
    },
    {
        "id": "apple-7",
        "brand": "apple",
        "name": "iPhone 13",
        "rating": "4.5",
        "feature": "A15 Bionic",
        "price": "RS 90,000",
        "image": "images/2.png",
        "badge": null
    },
    {
        "id": "apple-8",
        "brand": "apple",
        "name": "iPhone SE (2022)",
        "rating": "4.8",
        "feature": "Classic Design",
        "price": "RS 80,000",
        "image": "images/2.png",
        "badge": null
    },
    {
        "id": "apple-9",
        "brand": "apple",
        "name": "iPhone 12",
        "rating": "4.5",
        "feature": "5G Capable",
        "price": "RS 70,000",
        "image": "images/2.png",
        "badge": null
    },
    {
        "id": "samsung-0",
        "brand": "samsung",
        "name": "Galaxy S24 Ultra",
        "rating": "4.6",
        "feature": "Galaxy AI",
        "price": "RS 140,000",
        "image": "images/1.png",
        "badge": null
    },
    {
        "id": "samsung-1",
        "brand": "samsung",
        "name": "Galaxy S24+",
        "rating": "4.7",
        "feature": "Snapdragon 8 Gen 3",
        "price": "RS 128,000",
        "image": "images/1.png",
        "badge": "New"
    },
    {
        "id": "samsung-2",
        "brand": "samsung",
        "name": "Galaxy S24",
        "rating": "4.3",
        "feature": "Dynamic AMOLED",
        "price": "RS 116,000",
        "image": "images/1.png",
        "badge": null
    },
    {
        "id": "samsung-3",
        "brand": "samsung",
        "name": "Galaxy Z Fold 5",
        "rating": "4.1",
        "feature": "Foldable Display",
        "price": "RS 104,000",
        "image": "images/1.png",
        "badge": null
    },
    {
        "id": "samsung-4",
        "brand": "samsung",
        "name": "Galaxy Z Flip 5",
        "rating": "4.5",
        "feature": "Flex Window",
        "price": "RS 92,000",
        "image": "images/1.png",
        "badge": null
    },
    {
        "id": "samsung-5",
        "brand": "samsung",
        "name": "Galaxy S23 Ultra",
        "rating": "4.8",
        "feature": "200MP Camera",
        "price": "RS 80,000",
        "image": "images/1.png",
        "badge": null
    },
    {
        "id": "samsung-6",
        "brand": "samsung",
        "name": "Galaxy S23 FE",
        "rating": "4.1",
        "feature": "Fan Edition",
        "price": "RS 68,000",
        "image": "images/1.png",
        "badge": null
    },
    {
        "id": "samsung-7",
        "brand": "samsung",
        "name": "Galaxy A54 5G",
        "rating": "4.9",
        "feature": "Awesome Camera",
        "price": "RS 56,000",
        "image": "images/1.png",
        "badge": null
    },
    {
        "id": "samsung-8",
        "brand": "samsung",
        "name": "Galaxy A34",
        "rating": "4.4",
        "feature": "Vibrant Display",
        "price": "RS 44,000",
        "image": "images/1.png",
        "badge": null
    },
    {
        "id": "samsung-9",
        "brand": "samsung",
        "name": "Galaxy M14",
        "rating": "4.2",
        "feature": "Massive Battery",
        "price": "RS 32,000",
        "image": "images/1.png",
        "badge": null
    },
    {
        "id": "google-0",
        "brand": "google",
        "name": "Pixel 8 Pro",
        "rating": "4.4",
        "feature": "Tensor G3",
        "price": "RS 110,000",
        "image": "images/12.png",
        "badge": null
    },
    {
        "id": "google-1",
        "brand": "google",
        "name": "Pixel 8",
        "rating": "4.8",
        "feature": "AI Photography",
        "price": "RS 102,000",
        "image": "images/12.png",
        "badge": "New"
    },
    {
        "id": "google-2",
        "brand": "google",
        "name": "Pixel 7 Pro",
        "rating": "4.6",
        "feature": "Macro Focus",
        "price": "RS 94,000",
        "image": "images/12.png",
        "badge": null
    },
    {
        "id": "google-3",
        "brand": "google",
        "name": "Pixel 7",
        "rating": "4.6",
        "feature": "Magic Eraser",
        "price": "RS 86,000",
        "image": "images/12.png",
        "badge": null
    },
    {
        "id": "google-4",
        "brand": "google",
        "name": "Pixel 7a",
        "rating": "4.1",
        "feature": "Affordable Flagship",
        "price": "RS 78,000",
        "image": "images/12.png",
        "badge": null
    },
    {
        "id": "google-5",
        "brand": "google",
        "name": "Pixel Fold",
        "rating": "4.6",
        "feature": "Foldable UI",
        "price": "RS 70,000",
        "image": "images/12.png",
        "badge": null
    },
    {
        "id": "google-6",
        "brand": "google",
        "name": "Pixel 6 Pro",
        "rating": "4.3",
        "feature": "Tensor G1",
        "price": "RS 62,000",
        "image": "images/12.png",
        "badge": null
    },
    {
        "id": "google-7",
        "brand": "google",
        "name": "Pixel 6",
        "rating": "4.2",
        "feature": "Material You",
        "price": "RS 54,000",
        "image": "images/12.png",
        "badge": null
    },
    {
        "id": "google-8",
        "brand": "google",
        "name": "Pixel 6a",
        "rating": "4.3",
        "feature": "Compact Design",
        "price": "RS 46,000",
        "image": "images/12.png",
        "badge": null
    },
    {
        "id": "google-9",
        "brand": "google",
        "name": "Pixel 5",
        "rating": "4.1",
        "feature": "Classic Pixel",
        "price": "RS 38,000",
        "image": "images/12.png",
        "badge": null
    },
    {
        "id": "oneplus-0",
        "brand": "oneplus",
        "name": "OnePlus 12",
        "rating": "4.8",
        "feature": "Hasselblad Camera",
        "price": "RS 95,000",
        "image": "images/5.png",
        "badge": null
    },
    {
        "id": "oneplus-1",
        "brand": "oneplus",
        "name": "OnePlus 12R",
        "rating": "4.2",
        "feature": "Performance Beast",
        "price": "RS 88,000",
        "image": "images/5.png",
        "badge": "New"
    },
    {
        "id": "oneplus-2",
        "brand": "oneplus",
        "name": "OnePlus Open",
        "rating": "4.6",
        "feature": "Apex Foldable",
        "price": "RS 81,000",
        "image": "images/5.png",
        "badge": null
    },
    {
        "id": "oneplus-3",
        "brand": "oneplus",
        "name": "OnePlus 11",
        "rating": "4.6",
        "feature": "Snapdragon 8 Gen 2",
        "price": "RS 74,000",
        "image": "images/5.png",
        "badge": null
    },
    {
        "id": "oneplus-4",
        "brand": "oneplus",
        "name": "OnePlus 11R",
        "rating": "4.1",
        "feature": "Alert Slider",
        "price": "RS 67,000",
        "image": "images/5.png",
        "badge": null
    },
    {
        "id": "oneplus-5",
        "brand": "oneplus",
        "name": "OnePlus Nord 3",
        "rating": "4.7",
        "feature": "Nord Premium",
        "price": "RS 60,000",
        "image": "images/5.png",
        "badge": null
    },
    {
        "id": "oneplus-6",
        "brand": "oneplus",
        "name": "OnePlus Nord CE 3",
        "rating": "4.1",
        "feature": "Core Edition",
        "price": "RS 53,000",
        "image": "images/5.png",
        "badge": null
    },
    {
        "id": "oneplus-7",
        "brand": "oneplus",
        "name": "OnePlus 10 Pro",
        "rating": "4.9",
        "feature": "Flagship Killer",
        "price": "RS 46,000",
        "image": "images/5.png",
        "badge": null
    },
    {
        "id": "oneplus-8",
        "brand": "oneplus",
        "name": "OnePlus 10T",
        "rating": "4.0",
        "feature": "150W Charging",
        "price": "RS 39,000",
        "image": "images/5.png",
        "badge": null
    },
    {
        "id": "oneplus-9",
        "brand": "oneplus",
        "name": "OnePlus 9 Pro",
        "rating": "4.4",
        "feature": "Fluid AMOLED",
        "price": "RS 32,000",
        "image": "images/5.png",
        "badge": null
    },
    {
        "id": "xiaomi-0",
        "brand": "xiaomi",
        "name": "Xiaomi 14 Ultra",
        "rating": "4.6",
        "feature": "Leica Optics",
        "price": "RS 105,000",
        "image": "images/6.png",
        "badge": null
    },
    {
        "id": "xiaomi-1",
        "brand": "xiaomi",
        "name": "Xiaomi 14 Pro",
        "rating": "4.5",
        "feature": "HyperOS",
        "price": "RS 96,000",
        "image": "images/6.png",
        "badge": null
    },
    {
        "id": "xiaomi-2",
        "brand": "xiaomi",
        "name": "Xiaomi 14",
        "rating": "4.1",
        "feature": "Compact Flagship",
        "price": "RS 87,000",
        "image": "images/6.png",
        "badge": null
    },
    {
        "id": "xiaomi-3",
        "brand": "xiaomi",
        "name": "Redmi Note 13 Pro+",
        "rating": "4.5",
        "feature": "200MP Curved Display",
        "price": "RS 78,000",
        "image": "images/6.png",
        "badge": null
    },
    {
        "id": "xiaomi-4",
        "brand": "xiaomi",
        "name": "Redmi Note 13 Pro",
        "rating": "4.5",
        "feature": "Value King",
        "price": "RS 69,000",
        "image": "images/6.png",
        "badge": null
    },
    {
        "id": "xiaomi-5",
        "brand": "xiaomi",
        "name": "POCO X6 Pro",
        "rating": "4.2",
        "feature": "Gaming Performance",
        "price": "RS 60,000",
        "image": "images/6.png",
        "badge": null
    },
    {
        "id": "xiaomi-6",
        "brand": "xiaomi",
        "name": "POCO F5",
        "rating": "4.6",
        "feature": "Snapdragon 7+ Gen 2",
        "price": "RS 51,000",
        "image": "images/6.png",
        "badge": null
    },
    {
        "id": "xiaomi-7",
        "brand": "xiaomi",
        "name": "Xiaomi 13 Pro",
        "rating": "4.5",
        "feature": "Premium Build",
        "price": "RS 42,000",
        "image": "images/6.png",
        "badge": null
    },
    {
        "id": "xiaomi-8",
        "brand": "xiaomi",
        "name": "Redmi 12 5G",
        "rating": "4.3",
        "feature": "Budget 5G",
        "price": "RS 33,000",
        "image": "images/6.png",
        "badge": null
    },
    {
        "id": "xiaomi-9",
        "brand": "xiaomi",
        "name": "Xiaomi Pad 6",
        "rating": "4.1",
        "feature": "Productivity Beast",
        "price": "RS 24,000",
        "image": "images/6.png",
        "badge": null
    },
    {
        "id": "asus-0",
        "brand": "asus",
        "name": "ROG Phone 8 Pro",
        "rating": "4.2",
        "feature": "Gaming Beast",
        "price": "RS 100,000",
        "image": "images/phone.jpg",
        "badge": null
    },
    {
        "id": "asus-1",
        "brand": "asus",
        "name": "ROG Phone 8",
        "rating": "4.2",
        "feature": "AeroActive Cooler",
        "price": "RS 94,000",
        "image": "images/phone.jpg",
        "badge": "New"
    },
    {
        "id": "asus-2",
        "brand": "asus",
        "name": "ROG Phone 7 Ultimate",
        "rating": "4.4",
        "feature": "Matrix Display",
        "price": "RS 88,000",
        "image": "images/phone.jpg",
        "badge": null
    },
    {
        "id": "asus-3",
        "brand": "asus",
        "name": "ROG Phone 7",
        "rating": "4.4",
        "feature": "Snapdragon 8 Gen 2",
        "price": "RS 82,000",
        "image": "images/phone.jpg",
        "badge": null
    },
    {
        "id": "asus-4",
        "brand": "asus",
        "name": "Zenfone 10",
        "rating": "4.1",
        "feature": "Compact Flagship",
        "price": "RS 76,000",
        "image": "images/phone.jpg",
        "badge": null
    },
    {
        "id": "asus-5",
        "brand": "asus",
        "name": "Zenfone 9",
        "rating": "4.2",
        "feature": "Gimbal Camera",
        "price": "RS 70,000",
        "image": "images/phone.jpg",
        "badge": null
    },
    {
        "id": "asus-6",
        "brand": "asus",
        "name": "ROG Phone 6",
        "rating": "4.3",
        "feature": "165Hz Display",
        "price": "RS 64,000",
        "image": "images/phone.jpg",
        "badge": null
    },
    {
        "id": "asus-7",
        "brand": "asus",
        "name": "ROG Phone 5s",
        "rating": "4.3",
        "feature": "AirTriggers",
        "price": "RS 58,000",
        "image": "images/phone.jpg",
        "badge": null
    },
    {
        "id": "asus-8",
        "brand": "asus",
        "name": "Zenfone 8",
        "rating": "4.9",
        "feature": "Pocket Size",
        "price": "RS 52,000",
        "image": "images/phone.jpg",
        "badge": null
    },
    {
        "id": "asus-9",
        "brand": "asus",
        "name": "ROG Phone 3",
        "rating": "4.6",
        "feature": "Classic ROG",
        "price": "RS 46,000",
        "image": "images/phone.jpg",
        "badge": null
    },
    {
        "id": "nothing-0",
        "brand": "nothing",
        "name": "Nothing Phone (2)",
        "rating": "4.7",
        "feature": "Glyph Interface",
        "price": "RS 62,000",
        "image": "images/3.png",
        "badge": "Hot"
    },
    {
        "id": "nothing-1",
        "brand": "nothing",
        "name": "Nothing Phone (2a)",
        "rating": "4.7",
        "feature": "Unique Design",
        "price": "RS 58,000",
        "image": "images/3.png",
        "badge": null
    },
    {
        "id": "nothing-2",
        "brand": "nothing",
        "name": "Nothing Phone (1)",
        "rating": "4.5",
        "feature": "Transparent Back",
        "price": "RS 54,000",
        "image": "images/3.png",
        "badge": null
    },
    {
        "id": "nothing-3",
        "brand": "nothing",
        "name": "CMF Phone 1",
        "rating": "4.2",
        "feature": "Modular Design",
        "price": "RS 50,000",
        "image": "images/3.png",
        "badge": null
    },
    {
        "id": "nothing-4",
        "brand": "nothing",
        "name": "Phone (2) White",
        "rating": "4.2",
        "feature": "Nothing OS 2.5",
        "price": "RS 46,000",
        "image": "images/3.png",
        "badge": null
    },
    {
        "id": "nothing-5",
        "brand": "nothing",
        "name": "Phone (2) Dark",
        "rating": "4.3",
        "feature": "Minimalist UI",
        "price": "RS 42,000",
        "image": "images/3.png",
        "badge": null
    },
    {
        "id": "nothing-6",
        "brand": "nothing",
        "name": "Phone (1) White",
        "rating": "4.1",
        "feature": "Premium Feel",
        "price": "RS 38,000",
        "image": "images/3.png",
        "badge": null
    },
    {
        "id": "nothing-7",
        "brand": "nothing",
        "name": "Phone (2a) Milk",
        "rating": "4.7",
        "feature": "Matte Finish",
        "price": "RS 34,000",
        "image": "images/3.png",
        "badge": null
    },
    {
        "id": "nothing-8",
        "brand": "nothing",
        "name": "Phone (2a) Black",
        "rating": "4.2",
        "feature": "Iconic Look",
        "price": "RS 30,000",
        "image": "images/3.png",
        "badge": null
    },
    {
        "id": "nothing-9",
        "brand": "nothing",
        "name": "Nothing Concept",
        "rating": "4.6",
        "feature": "Future Vision",
        "price": "RS 26,000",
        "image": "images/3.png",
        "badge": null
    },
    {
        "id": "sony-0",
        "brand": "sony",
        "name": "Xperia 1 V",
        "rating": "4.7",
        "feature": "Cinematic Display",
        "price": "RS 115,000",
        "image": "images/4.png",
        "badge": null
    },
    {
        "id": "sony-1",
        "brand": "sony",
        "name": "Xperia 5 V",
        "rating": "4.3",
        "feature": "Compact Creator",
        "price": "RS 107,000",
        "image": "images/4.png",
        "badge": "New"
    },
    {
        "id": "sony-2",
        "brand": "sony",
        "name": "Xperia 10 V",
        "rating": "4.3",
        "feature": "Battery Monster",
        "price": "RS 99,000",
        "image": "images/4.png",
        "badge": null
    },
    {
        "id": "sony-3",
        "brand": "sony",
        "name": "Xperia 1 IV",
        "rating": "4.8",
        "feature": "True Optical Zoom",
        "price": "RS 91,000",
        "image": "images/4.png",
        "badge": null
    },
    {
        "id": "sony-4",
        "brand": "sony",
        "name": "Xperia 5 IV",
        "rating": "4.2",
        "feature": "Alpha Tech",
        "price": "RS 83,000",
        "image": "images/4.png",
        "badge": null
    },
    {
        "id": "sony-5",
        "brand": "sony",
        "name": "Xperia Pro-I",
        "rating": "4.0",
        "feature": "1.0-type Sensor",
        "price": "RS 75,000",
        "image": "images/4.png",
        "badge": null
    },
    {
        "id": "sony-6",
        "brand": "sony",
        "name": "Xperia 1 III",
        "rating": "4.5",
        "feature": "4K OLED",
        "price": "RS 67,000",
        "image": "images/4.png",
        "badge": null
    },
    {
        "id": "sony-7",
        "brand": "sony",
        "name": "Xperia 5 III",
        "rating": "4.2",
        "feature": "Creator Mode",
        "price": "RS 59,000",
        "image": "images/4.png",
        "badge": null
    },
    {
        "id": "sony-8",
        "brand": "sony",
        "name": "Xperia 10 III",
        "rating": "4.6",
        "feature": "Water Resistant",
        "price": "RS 51,000",
        "image": "images/4.png",
        "badge": null
    },
    {
        "id": "sony-9",
        "brand": "sony",
        "name": "Xperia 1 II",
        "rating": "4.1",
        "feature": "Classic Xperia",
        "price": "RS 43,000",
        "image": "images/4.png",
        "badge": null
    }
];