const express = require('express');
const fs = require('fs');
const path = require('path');
const formData = require('express-form-data');





const app = express();
app.use(express.json());
app.use(formData.parse());
app.use(express.urlencoded({ extended: true }));
const port = 3000;
const publicDirectory = path.join(__dirname, 'public');


const downloadCounts = {};




app.use('/files', express.static(publicDirectory));


app.get('/files', (req, res) => {
    fs.readdir(publicDirectory, (err, files) => {
        if (err) {
            return res.status(500).send('Error listing files.');
        }
        const fileLinks = files.map(file => `<a href="/files/${file}">${file}</a>`);
        res.send(`<h1>Files:</h1>${fileLinks.join('<br>')}`);
    });
});


app.get('/files/:filename', (req, res) => {
    const filename = req.params.filename;
    const filePath = path.join(publicDirectory, filename);

    downloadCounts[filename] = downloadCounts[filename] ? downloadCounts[filename] + 1 : 1;

    res.download(filePath, filename, () => {
        fs.writeFileSync('downloadCounts.json', JSON.stringify(downloadCounts));
    });
});


app.get('/upload/form', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});


app.post('/upload', (req, res) => {
    const uploadedFile = req.files.file;
    if (!uploadedFile) {
        return res.status(400).send('No file uploaded.');
    }
    const targetPath = path.join(publicDirectory, uploadedFile.name);
    fs.copyFile(uploadedFile.path, targetPath, (err) => {
        if (err) {
            return res.status(500).send({ message: 'Error uploading file.' });
        } else {
            res.send({ message: 'File uploaded successfully.' });
        }
    });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
