const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
// const http = require('http');
// const query = require('querystring');
// const htmlHandler = require('./htmlResponses.js');



const app = express();

//for fetching cross origin files, like a local JSON on a secure server
app.use(cors());

const PORT = process.env.PORT || process.env.NODE_PORT || 3000;

app.get('/api/projects', (req, res) => {
    fs.readFile(path.join(__dirname, 'src/projectTracker.json'), 'utf8', (err, data) => {
        if (err) {
            res.status(500).json({ error: 'Failed to read projects' });
            return;
        }
        res.json(JSON.parse(data));
    });
});

app.get('/api/graphics', (req, res) => {
    fs.readFile(path.join(__dirname, 'src/graphicsTracker.json'), 'utf8', (err, data) => {
        if (err) {
            res.status(500).json({ error: 'Failed to read projects' });
            return;
        }
        res.json(JSON.parse(data));
    });
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'home.html'));
});

app.use(express.static(path.join(__dirname)));
app.listen(PORT, () => {
    console.log(`Running on:${PORT}`);
});

// const onRequest = (request, response) => {
//     // checks betweed https or http to test for is it's encrypted
//     const protocol = request.connection.encrypted ? 'https' : 'http';
//     // parsedurl builds a new url by attaching the protocol and the requested headers host key
//     const parsedUrl = new URL(request.url, `${protocol}://${request.headers.host}`);

//     // request.acceptedTypes = request.headers.accept.split(',');

//     // check if method is post or get
//     if (request.method === 'POST') {
//         handlePost(request, response, parsedUrl);
//     } else if (request.method === 'GET') {
//         handleGet(request, response, parsedUrl);
//     }
// };
