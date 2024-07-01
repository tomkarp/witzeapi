const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const port = 3001;

app.use(express.json());

const jokesFilePath = path.join(__dirname, 'data', 'jokes.json');
const jokes = loadJokes(jokesFilePath);
const questionsFilePath = path.join(__dirname, 'data', 'questions.json');
const questions = loadJokes(questionsFilePath);

// Funktion zum Laden der Witze aus der Datei
function loadJokes(path) {
    const data = fs.readFileSync(path, 'utf8');
    return JSON.parse(data);
}

// Endpunkt zum Abrufen aller Witze
app.get('/jokes', (req, res) => {
    res.json(jokes);
});

// Endpunkt zum Abrufen aller Scherzfragen
app.get('/questions', (req, res) => {
    res.json(questions);
});

// Endpunkt zum Abrufen eines einzelnen Witzes nach ID
app.get('/jokes/:id', (req, res) => {
    if (!jokes[req.params.id]) return res.status(404).send('Witz nicht gefunden');
    res.json(jokes[req.params.id]);
});

// Endpunkt zum Abrufen einer einzelnen Scherzfrage nach ID
app.get('/questions/:id', (req, res) => {
    if (!questions[req.params.id]) return res.status(404).send('Witz nicht gefunden');
    res.json(questions[req.params.id]);
});


app.listen(port, () => {
    console.log(`Witze-Server läuft auf Port:${port}`);
});
