const beautify = require('js-beautify');
const uglyHtml = '<html><head><title>Test</title></head><body><h1>Hello World</h1></body></html>';
const beautifiedHtml = beautify(uglyHtml);
console.log(beautifiedHtml);