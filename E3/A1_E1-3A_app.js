const http = require("http");
const { echoRoute, htmlRoute } = require("./routes");

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
    echoRoute.route(req, res);
    htmlRoute.route(req, res);
    if (!res.headersSent) {
        res.end("Default response");
    }
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}`);
});