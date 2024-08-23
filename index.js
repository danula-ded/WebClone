const beautifyFiles = require('./js/beautify.js');
const archiveAndDelete = require('./js/arhivator.js');

function cloneWeb() {
    const nameDirectory = "node";
    const url = document.getElementById("url-input").value
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
            beautifyFiles(__dirname + `/${nameDirectory}`);
        }).then(() => {
            // архивирует файлы и удаляет папку из fs(опционально)
            archiveAndDelete(__dirname + `/${nameDirectory}`, false, true);
        }).catch((err) => {
            console.log("Произошла ошибка", err);
        });
    });
}


cloneWeb()