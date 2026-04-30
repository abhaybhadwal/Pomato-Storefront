const https = require('https');

const urls = [
  'https://www.apple.com/iphone-16-pro/',
  'https://www.apple.com/iphone-16/',
  'https://www.apple.com/iphone-15-pro/',
  'https://www.apple.com/iphone-15/',
  'https://www.apple.com/iphone-14/',
  'https://www.apple.com/shop/product/MTJW3ZM/A/iphone-15-fine-woven-case-with-magsafe-evergreen',
  'https://www.samsung.com/us/mobile/mobile-accessories/phones/galaxy-s24-ultra-silicone-case-dark-violet-ef-ps928tvegus/',
  'https://www.samsung.com/us/mobile/mobile-accessories/phones/45w-power-adapter-with-cable-ep-t4510xbegus/'
];

urls.forEach(url => {
  const req = https.get(url, res => {
    let data = '';
    res.on('data', d => data += d);
    res.on('end', () => {
      const match = data.match(/<meta property="og:image" content="(.*?)"/);
      console.log(url + ' -> ' + (match ? match[1] : 'no og:image'));
    });
  });
  req.on('error', e => console.error(url + ' -> ' + e.message));
});
