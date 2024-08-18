const fs = require('fs');
const path = require('path');
const archiver = require('archiver');

module.exports = function archiveAndDelete(dir) {
    const archiveName = `${dir}.zip`;
    const output = fs.createWriteStream(archiveName);
    const archive = archiver('zip', {
        zlib: { level: 9 }
    });

    archive.pipe(output);

    fs.readdirSync(dir).forEach(file => {
        const filePath = path.join(dir, file);
        archive.file(filePath, { name: file });
    });

    archive.finalize();

    output.on('close', () => {
        fs.rmdirSync(dir, { recursive: true });
        console.log(`Директория ${dir} успешно архивирована и удалена`);
    });
};