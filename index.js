const beautifyFiles = require('./beautify.js');

const nameDirectory = "node";

import('website-scraper').then(({ default: scrape }) => {
    let options = {
        urls: ['https://nodejs.org/'],
        directory: `./${nameDirectory}`,

        // recursive: true,
        // maxDepth: 1
        // urlFilter: function(url){
        //     if(url.indexOf(websiteUrl) === 0){
        //         console.log(`URL ${ url } matches ${ websiteUrl } `);
        //         return true;
        //     }
        //     return false;
        // },
    };

    scrape(options).then(() => {
        console.log("Веб-сайт успешно скачан");
    }).then(() => {
        beautifyFiles(__dirname + `/${nameDirectory}`);
        console.log("Веб-сайт успешно отредактирован")
    }).catch((err) => {
        console.log("Произошла ошибка", err);
    });
});

// .then(() => {
//     beautifyFiles(__dirname + `/${nameDirectory}`);
//     console.log("Веб-сайт успешно архивирован")
// })