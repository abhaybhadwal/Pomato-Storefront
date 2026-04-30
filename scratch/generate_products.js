const fs = require('fs');

const brandsData = {
    'apple': {
        name: 'Apple',
        models: ['iPhone 15 Pro Max', 'iPhone 15 Pro', 'iPhone 15 Plus', 'iPhone 15', 'iPhone 14 Pro Max', 'iPhone 14 Pro', 'iPhone 14', 'iPhone 13', 'iPhone SE (2022)', 'iPhone 12'],
        basePrice: 60000,
        priceStep: 10000,
        features: ['Titanium Design', 'A17 Pro Chip', 'Dynamic Island', 'Super Retina XDR', 'ProMotion 120Hz', 'Ceramic Shield', 'MagSafe Compatible', 'A15 Bionic', 'Classic Design', '5G Capable'],
        image: 'images/2.png'
    },
    'samsung': {
        name: 'Samsung',
        models: ['Galaxy S24 Ultra', 'Galaxy S24+', 'Galaxy S24', 'Galaxy Z Fold 5', 'Galaxy Z Flip 5', 'Galaxy S23 Ultra', 'Galaxy S23 FE', 'Galaxy A54 5G', 'Galaxy A34', 'Galaxy M14'],
        basePrice: 20000,
        priceStep: 12000,
        features: ['Galaxy AI', 'Snapdragon 8 Gen 3', 'Dynamic AMOLED', 'Foldable Display', 'Flex Window', '200MP Camera', 'Fan Edition', 'Awesome Camera', 'Vibrant Display', 'Massive Battery'],
        image: 'images/1.png'
    },
    'google': {
        name: 'Google',
        models: ['Pixel 8 Pro', 'Pixel 8', 'Pixel 7 Pro', 'Pixel 7', 'Pixel 7a', 'Pixel Fold', 'Pixel 6 Pro', 'Pixel 6', 'Pixel 6a', 'Pixel 5'],
        basePrice: 30000,
        priceStep: 8000,
        features: ['Tensor G3', 'AI Photography', 'Macro Focus', 'Magic Eraser', 'Affordable Flagship', 'Foldable UI', 'Tensor G1', 'Material You', 'Compact Design', 'Classic Pixel'],
        image: 'images/12.png'
    },
    'oneplus': {
        name: 'OnePlus',
        models: ['OnePlus 12', 'OnePlus 12R', 'OnePlus Open', 'OnePlus 11', 'OnePlus 11R', 'OnePlus Nord 3', 'OnePlus Nord CE 3', 'OnePlus 10 Pro', 'OnePlus 10T', 'OnePlus 9 Pro'],
        basePrice: 25000,
        priceStep: 7000,
        features: ['Hasselblad Camera', 'Performance Beast', 'Apex Foldable', 'Snapdragon 8 Gen 2', 'Alert Slider', 'Nord Premium', 'Core Edition', 'Flagship Killer', '150W Charging', 'Fluid AMOLED'],
        image: 'images/5.png'
    },
    'xiaomi': {
        name: 'Xiaomi',
        models: ['Xiaomi 14 Ultra', 'Xiaomi 14 Pro', 'Xiaomi 14', 'Redmi Note 13 Pro+', 'Redmi Note 13 Pro', 'POCO X6 Pro', 'POCO F5', 'Xiaomi 13 Pro', 'Redmi 12 5G', 'Xiaomi Pad 6'],
        basePrice: 15000,
        priceStep: 9000,
        features: ['Leica Optics', 'HyperOS', 'Compact Flagship', '200MP Curved Display', 'Value King', 'Gaming Performance', 'Snapdragon 7+ Gen 2', 'Premium Build', 'Budget 5G', 'Productivity Beast'],
        image: 'images/6.png'
    },
    'asus': {
        name: 'Asus',
        models: ['ROG Phone 8 Pro', 'ROG Phone 8', 'ROG Phone 7 Ultimate', 'ROG Phone 7', 'Zenfone 10', 'Zenfone 9', 'ROG Phone 6', 'ROG Phone 5s', 'Zenfone 8', 'ROG Phone 3'],
        basePrice: 40000,
        priceStep: 6000,
        features: ['Gaming Beast', 'AeroActive Cooler', 'Matrix Display', 'Snapdragon 8 Gen 2', 'Compact Flagship', 'Gimbal Camera', '165Hz Display', 'AirTriggers', 'Pocket Size', 'Classic ROG'],
        image: 'images/phone.jpg'
    },
    'nothing': {
        name: 'Nothing',
        models: ['Nothing Phone (2)', 'Nothing Phone (2a)', 'Nothing Phone (1)', 'CMF Phone 1', 'Phone (2) White', 'Phone (2) Dark', 'Phone (1) White', 'Phone (2a) Milk', 'Phone (2a) Black', 'Nothing Concept'],
        basePrice: 22000,
        priceStep: 4000,
        features: ['Glyph Interface', 'Unique Design', 'Transparent Back', 'Modular Design', 'Nothing OS 2.5', 'Minimalist UI', 'Premium Feel', 'Matte Finish', 'Iconic Look', 'Future Vision'],
        image: 'images/3.png'
    },
    'sony': {
        name: 'Sony',
        models: ['Xperia 1 V', 'Xperia 5 V', 'Xperia 10 V', 'Xperia 1 IV', 'Xperia 5 IV', 'Xperia Pro-I', 'Xperia 1 III', 'Xperia 5 III', 'Xperia 10 III', 'Xperia 1 II'],
        basePrice: 35000,
        priceStep: 8000,
        features: ['Cinematic Display', 'Compact Creator', 'Battery Monster', 'True Optical Zoom', 'Alpha Tech', '1.0-type Sensor', '4K OLED', 'Creator Mode', 'Water Resistant', 'Classic Xperia'],
        image: 'images/4.png'
    }
};

const products = [];

Object.keys(brandsData).forEach(brandId => {
    const data = brandsData[brandId];
    data.models.forEach((model, index) => {
        // ID should be brand name + index
        const id = `${brandId}-${index}`;
        // Randomish rating
        const rating = (4.0 + (Math.random() * 0.9)).toFixed(1);
        const price = data.basePrice + ((data.models.length - index) * data.priceStep);
        const feature = data.features[index];
        const isHot = index === 0 && Math.random() > 0.5;
        const isNew = index === 1 && Math.random() > 0.5;

        products.push({
            id: id,
            brand: brandId,
            name: model,
            rating: rating,
            feature: feature,
            price: `RS ${price.toLocaleString()}`,
            image: data.image,
            badge: isHot ? 'Hot' : (isNew ? 'New' : null)
        });
    });
});

const output = `const productsData = ${JSON.stringify(products, null, 4)};`;
fs.writeFileSync('products_data.js', output);
console.log('Successfully generated products_data.js with', products.length, 'products.');
