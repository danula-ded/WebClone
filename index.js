const express = require('express');
const beautifyFiles = require('./js/beautify.js');
const archiveAndDelete = require('./js/arhivator.js');
const path = require('path');

const app = express();
const port = 3000;

app.use(express.json()); // добавляем эту строку

app.post('/clone-web', async (req, res) => {
    try {
        const url = req.body.url;
        const nameDirectory = "node";
        const pathDir = path.join(__dirname, nameDirectory);
        const isArchive = false;
        const isDeleteDir = false;

        const options = {
            urls: [`${url}`],
            directory: `./${nameDirectory}`,
        };

        const { default: scrape } = await import('website-scraper');
        await scrape(options); // добавляем await перед вызовом scrape
        console.log("Веб-сайт успешно скачан");
        beautifyFiles(pathDir);
        console.log("Веб-сайт успешно отредактирован");
        archiveAndDelete(pathDir, isArchive, isDeleteDir);
        res.json({ message: "Success" });
    } catch (err) {
        console.log("Произошла ошибка", err);
    }
});

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});