// Dependencies

const express = require('express');
const path = require('path');
const db = require('./db/db.json')
const fs = require('fs')


// Sets up the Express App
const PORT = process.env.PORT || 3001;
const app = express();

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// routes
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'public','index.html')));
app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, 'public','notes.html')));

// display all notes
app.get('/api/notes',(req, res) =>{
    const dbNotes = JSON.parse(fs.readFileSync("./db/db.json"))
    res.json(dbNotes)
});

// app.get('/api/notes/:id',(req, res) =>{
//     const chosen = req.params.id;
//     console
//     const dbNotes = JSON.parse(fs.readFileSync("./db/db.json"))
//     res.json(dbNotes)
// });


// create a new note
app.post('/api/notes', (req, res) => {
    const newNote = req.body;
    const dbNotes = JSON.parse(fs.readFileSync("./db/db.json"));
  newNote.id = dbNotes.length + 1;
    console.log(newNote)
    dbNotes.push(newNote)
   fs.writeFileSync("./db/db.json", JSON.stringify(dbNotes))
   res.json(newNote)
  });


// delete a note
app.delete('/api/notes/:id', (req, res,) => {
    const dbNotes = JSON.parse(fs.readFileSync("./db/db.json")); 
    const dbIndex = getIndexById(req.params.id, dbNotes);
    if (dbIndex !== -1) {
      dbNotes.splice(dbIndex, 1);
      res.status(204).send();
  } else {
    res.status(404).send();
    };
  });

  // Starts the server to begin listening

app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));
