import('website-scraper').then(({ default: scrape }) => {
    let options = {
        urls: ['https://nodejs.org/'],
        directory: './node',

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

