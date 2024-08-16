const beautify_js = require('js-beautify');
const beautify_html = require('js-beautify').html;
const beautify_css = require('js-beautify').css;


import('website-scraper').then(({ default: scrape }) => {
    let options = {
        urls: ['https://nodejs.org/'],
        directory: './node-homepage',

        // recursive: true,
        // maxDepth: 1
        // urlFilter: function(url){
        //     if(url.indexOf(websiteUrl) === 0){
        //         console.log(`URL ${url} matches ${websiteUrl}`);
        //         return true;
        //     }
        //     return false;
        // },
    };

    scrape(options).then((result) => {
        console.log("Веб-сайт успешно скачан");
    }).catch((err) => {
        console.log("Произошла ошибка", err);
    });
});

