const fs = require('fs');
const path = require('path');
const express = require('express');

const app = express();

const DEFAULT_LANG = 'en';
const PORT = 5000;

const getPath = (lang) => path.resolve(__dirname, `../locales/${lang || DEFAULT_LANG}.json`);

app.post('/api/locale/', (req, res) => res.send({}));
app.post('/api/locale/:lang/', (req, res) => {
    let filePath = getPath(req.params.lang);

    fs.access(filePath, fs.constants.F_OK, (err) => {
        if (err) {
            filePath = getPath();
        }

        fs.readFile(filePath, (err, data) => {
            res.json(JSON.parse(data));
        });
    });
});

app.listen(PORT, () => console.log(`API is listening on port ${PORT}.`));
