// WITH USING root option


const express = require('express');
const app = express();
const path = require('path');
const port = 3000;

app.get('/public/:file', (req, res) => {
    const filename = req.params.file;
    const filePath = path.join(__dirname, 'public', filename);

    if (path.extname(filename) === '.jpg') {
        res.sendFile(filePath);
    } else {
        // by using root no files can be downloaded outside public foldert
        res.download(filename, { root: path.join(__dirname, 'public') });
    }
});

app.use((req, res) => {
    res.send('not a public route');
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
