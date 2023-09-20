const express = require('express');
const app = express();
const port = 3000;


app.get('/lo+l', (req, res) => {
    const oCount = req.url.match(/o+/g);
    const numberOfOs = oCount ? oCount[0].length : 0;
    const smileySize = `${Math.max(20, 10 + numberOfOs * 10)}px`;
    const htmlResponse = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>Smiley Face</title>
    </head>
    <body>
      <div style="font-size: ${smileySize};">
        <span>&#128578;</span>
      </div>
    </body>
    </html>
  `;

    res.send(htmlResponse);
});


app.use((req, res) => {
    res.send('not a lol route');
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
