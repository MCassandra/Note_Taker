// Dependencies

const express = require('express');
const path = require('path');

// Sets up the Express App

const app = express();
const PORT = 3002;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// routes
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'index.html')));

app.get('/add', (req, res) => res.sendFile(path.join(__dirname, 'notes.html')));

// display all notes
app.get('/api/notes', (req, res) => res.json(notes));

// display a single note

// create a new note


// Starts the server to begin listening

app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));