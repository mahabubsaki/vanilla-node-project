const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3000;

const logDirectory = path.join(__dirname, 'logs');
const logFilePath = path.join(logDirectory, 'requests.log');
const maxLogSize = 5 * 1024; // 5 KB


if (!fs.existsSync(logDirectory)) {
    fs.mkdirSync(logDirectory);
}


let logStream = createLogStream(logFilePath);

function createLogStream(filePath) {
    return fs.createWriteStream(filePath, { flags: 'a' });
}

function requestLogger(req, res, next) {

    const { method, url, query, ip } = req;


    console.log(`HTTP Method: ${method}`);
    console.log(`Requested URL: ${url}`);
    console.log(`Query Parameters:`, query);
    console.log(`IP Address: ${ip}`);
    console.log(`Timestamp: ${new Date().toISOString()}`);


    logStream.write(`HTTP Method: ${method}\n`);
    logStream.write(`Requested URL: ${url}\n`);
    logStream.write(`Query Parameters: ${JSON.stringify(query)}\n`);
    logStream.write(`IP Address: ${ip}\n`);
    logStream.write(`Timestamp: ${new Date().toISOString()}\n`);
    logStream.write('\n');
    logStream.write('\n');
    logStream.write('\n');


    if (logStream.bytesWritten > maxLogSize) {
        logStream.end();
        const oldLogFilePath = path.join(logDirectory, 'old_requests.log');
        fs.renameSync(logFilePath, oldLogFilePath);
        logStream = createLogStream(logFilePath);
    }

    next();
}

app.use(requestLogger);


app.get('/', (req, res) => {
    res.send('Hello, Express!');
});

app.get('/example', (req, res) => {
    res.send('This is an example route.');
});

app.use((req, res) => {
    res.send('route not exist');
});

// Start the Express server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
