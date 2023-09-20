

class RouteEntry {
    constructor(url, callback) {
        this.url = url;
        this.callback = callback;
    }

    route(req, res) {
        if (req.url === this.url) {
            this.callback(req, res);
        }
    }
}

function echoResponse(req, res) {
    if (!res.headersSent) {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end('Echo response');
    }
}

function htmlResponse(req, res) {
    if (!res.headersSent) {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end('<h1>HTML Response</h1>');
    }
}


const echoRoute = new RouteEntry('/echo', echoResponse);

const htmlRoute = new RouteEntry('/html', htmlResponse);

module.exports = { echoRoute, htmlRoute };