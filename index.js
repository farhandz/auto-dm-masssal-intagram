const Nightmare = require('nightmare');
const nightmare = Nightmare({ show: true });
const fs = require('fs');

nightmare
    .goto('https://www.gumtree.com')
    .wait('.search-bar .keyword-search-container input')
    .type('.search-bar .keyword-search-container input', 'n64 console')
    .click('.search-bar button[type="submit"]')
    .wait('.srp-results')
    .evaluate(() => {

        //mendapatkan semua data dari nama username
        let ads = [...document.querySelectorAll('li.natural')];
        console.log(ads)
        let forSaleAds = ads.filter(ad => ad.querySelector('.listing-price'));

        //looping dan return menjadi  object
        let data = forSaleAds.map(ad => {
            let title = ad.querySelector('.listing-title').innerText;
            let price = Number.parseInt(ad.querySelector('.listing-price strong').innerText.slice(1));
            let location = ad.querySelector('.listing-location').innerText;
            let desc = ad.querySelector('.listing-description').innerText;

            return { title, price, location, desc };
        });
        //return array of object
        return data;
    })
    .end()
    .then(data => {
        //convert to JSON and save as file
        data = JSON.stringify(data, null, 2);
        fs.writeFileSync('gumtree.json', data);
    })
    .catch(error => {
        console.error('Scraping failed:', error)
    })