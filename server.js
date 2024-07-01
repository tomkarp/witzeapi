const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const port = 3000;

app.use(express.json());

const jokesFilePath = path.join(__dirname, 'data', 'jokes.json');

// Funktion zum Laden der Witze aus der Datei
function loadJokes() {
    const data = fs.readFileSync(jokesFilePath, 'utf8');
    return JSON.parse(data);
}

// Endpunkt zum Abrufen aller Witze
app.get('/jokes', (req, res) => {
    const jokes = loadJokes();
    res.json(jokes);
});

// Endpunkt zum Abrufen eines einzelnen Witzes nach ID
app.get('/jokes/:id', (req, res) => {
    const jokes = loadJokes();
    const joke = jokes.find(j => j.id === parseInt(req.params.id));
    if (!joke) return res.status(404).send('Witz nicht gefunden');
    res.json(joke);
});


app.listen(port, () => {
    console.log(`Witze-Server läuft auf Port:${port}`);
});