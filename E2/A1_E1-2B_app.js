const http = require('http');
const fs = require('fs');
const path = require('path');
const mimeTypes = {
    '.html': 'text/html',
    '.css': 'text/css',
    '.js': 'application/javascript',
    '.json': 'application/json',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.png': 'image/png',
};


const server = http.createServer((req, res) => {

    const publicDirectory = path.join(__dirname, 'public');
    const requestedPath = path.join(publicDirectory, req.url);
    if (fs.existsSync(requestedPath) && fs.statSync(requestedPath).isDirectory()) {

        const files = fs.readdirSync(requestedPath);
        const listItems = files.map((file) => {
            const filePath = path.join(req.url, file);
            const fileStat = fs.statSync(path.join(publicDirectory, filePath));
            if (fileStat.isDirectory()) {
                return `<li>${file} (Folder)</li>`;
            } else {
                return `<li><a href="${filePath}">${file}</a></li>`;
            }
        });
        const htmlResponse = `
                <!DOCTYPE html>
                <html>
                <head>
                    <title>Directory Listing</title>
                </head>
                <body>
                    <h1>Directory Listing</h1>
                    <ul>
                        ${listItems.join('')}
                    </ul>
                </body>
                </html>
            `;

        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(htmlResponse);
    } else {

        if (fs.existsSync(requestedPath) && fs.statSync(requestedPath).isFile()) {
            const ext = path.extname(requestedPath).toLowerCase();
            if (Object.keys(mimeTypes).includes(ext)) {
                res.setHeader('Content-Type', mimeTypes[ext]);
                const fileStream = fs.createReadStream(requestedPath);
                fileStream.pipe(res);
            } else {
                res.writeHead(404, { 'Content-Type': 'text/plain' });
                res.end('File type not supported');
            }

        } else {

            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end('File not found');
        }
    }

});

const port = 3000;
server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
