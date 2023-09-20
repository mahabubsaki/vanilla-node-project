// WITHOUT USING root option


const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

// Define a route that handles requests for /public/:filename
app.get('/public/:file', (req, res) => {
    const filename = req.params.file;
    console.log(filename);
    const filePath = path.join(__dirname, 'public', filename);


    if (path.extname(filePath) === '.jpg') {
        res.sendFile(filePath);
    } else {
        // Example of a malicious URL that might attempt to trick the server:
        // http://localhost:3000/public/..%2FA1_E1-6A_app.js this url will download our server code
        // %2E encodes a dot (.), and %2F encodes a slash (/),
        // attempting to traverse directories outside "./public."
        res.download(filePath, filename);
    }

});




app.use((req, res) => {
    res.send('not a public route');
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
