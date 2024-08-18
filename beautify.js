const beautify_css = require('js-beautify').css;
const beautify_js = require('js-beautify').js;
const beautify_html = require('js-beautify').html;

const fs = require('fs');
const path = require('path');

function beautifyFiles(dirPath = __dirname) {
    const files = fs.readdirSync(dirPath);

    files.forEach((file) => {
        const filePath = path.join(dirPath, file);
        const stats = fs.statSync(filePath);

        if (stats.isFile()) {
            const ext = path.extname(file);

            let beautifiedContent;
            const content = fs.readFileSync(filePath, 'utf8');

            switch (ext) {
                case '.css':
                    beautifiedContent = beautify_css(content);
                    break;
                case '.js':
                    beautifiedContent = beautify_js(content);
                    break;
                case '.html':
                    beautifiedContent = beautify_html(content);
                    break;
                default:
                    return; // Пропустить файл, если расширение не соответствует
            }

            fs.writeFileSync(filePath, beautifiedContent);
        } else if (stats.isDirectory()) {
            // Рекурсивно форматировать файлы в поддиректориях
            beautifyFiles(filePath);
        }
    });
}

module.exports = beautifyFiles;