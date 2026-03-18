const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

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

app.use(express.static(path.join(__dirname)));
app.listen(PORT, () =>{
    console.log(`Running on:${PORT}`);
});