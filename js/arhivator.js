const fs = require('fs');
const path = require('path');
const archiver = require('archiver');

function archiving(dir) {
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
    console.log("Веб-сайт успешно архивирован");
}

function deleteDir(dir) {
    fs.rm(dir, { recursive: true, force: true }, (err) => {
        if (err) {
            console.error(err);
        } else {
            console.log(`Директория ${dir} удалена успешно`);
        }
    });
}

module.exports = function archiveAndDelete(dir, isArchive = true, isDeleteDir = true) {
    if (isArchive) {
        archiving(dir)
    }
    if (isDeleteDir) {
        deleteDir(dir)
    }

};