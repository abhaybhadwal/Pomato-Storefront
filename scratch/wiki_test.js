const https = require('https');

function getWikiImage(title) {
    const url = `https://en.wikipedia.org/w/api.php?action=query&generator=search&gsrsearch=${encodeURIComponent(title)}&gsrlimit=1&prop=pageimages&pithumbsize=500&format=json`;
    
    const options = {
        headers: {
            'User-Agent': 'ProductImageBot/1.0 (test@example.com)'
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
                        console.log(`Title: ${title} -> Image: ${pages[pageId].thumbnail.source}`);
                    } else {
                        console.log(`Title: ${title} -> No image found in top result`);
                    }
                } else {
                    console.log(`Title: ${title} -> No search results`);
                }
            } catch (e) {
                console.error("Error parsing JSON:", e);
            }
        });
    }).on('error', err => console.error(err));
}

getWikiImage('iPhone 15 Pro Max');
getWikiImage('Samsung Galaxy S24 Ultra smartphone');
getWikiImage('Google Pixel 8 Pro');
getWikiImage('OnePlus 12');
getWikiImage('Nothing Phone 2');
