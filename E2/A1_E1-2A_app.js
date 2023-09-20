const http = require('http');

const server = http.createServer((req, res) => {

    const method = req.method;
    const url = req.url;
    const headers = req.headers;



    res.setHeader('Content-Type', 'text/html');


    const html =
        `
    <head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>HTTP Echo Server</title>
</head>

<body>
    <p>Recived ${method}-request to ${url} with headers:</p>
    <ul>
        ${Object.entries(headers).map(([key, value]) => `<li>${key} : ${value}</li>`).join('')}
    </ul>
</body>

</html>
    `;


    res.end(html);
});

const port = 3000;
server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
