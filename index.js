const beautifyFiles = require('./js/beautify.js');
const archiveAndDelete = require('./js/arhivator.js');

export function cloneWeb() {
    const nameDirectory = "node";
    const url = document.getElementById("url-input").value
    console.log("init")
    import('website-scraper').then(({ default: scrape }) => {
        let options = {
            urls: [`./${url}`],
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


        // копируем файлы через scrapper
        scrape(options).then(() => {
            console.log("Веб-сайт успешно скачан");
        }).then(() => {
            // все файлы чаще 
            beautifyFiles(__dirname + `/${nameDirectory}`);
            console.log("Веб-сайт успешно отредактирован")
        }).then(() => {
            // архивирует файлы и удаляет папку из fs
            archiveAndDelete(__dirname + `/${nameDirectory}`);
            console.log("Веб-сайт успешно архивирован");
        }).catch((err) => {
            console.log("Произошла ошибка", err);
        });
    });
}
