const beautify = require('js-beautify');
const beautify_html = require('js-beautify').html;
const beautify_css = require('js-beautify').css;

const fs = require('fs');
const path = require('path');

const dirPath = __dirname + "/node/css";
const files = fs.readdirSync(dirPath);

files.forEach((file) => {
    const filePath = path.join(dirPath, file);
    const stats = fs.statSync(filePath);
    if (stats.isFile()) {
        const cssContent = fs.readFileSync(filePath, 'utf8');
        const beautifiedCss = beautify_css(cssContent);
        fs.writeFileSync(filePath, beautifiedCss);
    }
});