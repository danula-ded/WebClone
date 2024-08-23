const beautifyFiles = require('./js/beautify.js');
const archiveAndDelete = require('./js/arhivator.js');

const path = require('path');

function cloneWeb() {
    //базовая инициализация
    const nameDirectory = "node";
    const pathDir = path.join(__dirname, nameDirectory);
    const url = "https://ritikasoniportfolio.netlify.app/";
    const isArchive = false;
    const isDeleteDir = false;

    console.log("init")

    import('website-scraper').then(({ default: scrape }) => {
        let options = {
            urls: [`${url}`],
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
            // все файлы делаем не сжатыми, а "красивыми"
            beautifyFiles(pathDir);
            console.log("Веб-сайт успешно отредактирован")
        }).then(() => {
            // архивирует файлы и удаляет папку из fs(опционально)
            archiveAndDelete(pathDir, isArchive, isDeleteDir);
        }).catch((err) => {
            console.log("Произошла ошибка", err);
        });
    });
}


cloneWeb()