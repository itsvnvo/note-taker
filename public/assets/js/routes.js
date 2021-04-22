const noteData = require('../../../db/db.json')
const path = require('path');
const fs = require("fs");

module.exports = (app) => {

    app.get('/api/notes', (req, res) => res.json(noteData));

    app.get('/notes', (req, res) => {
        res.sendFile(path.join(__dirname, '../../notes.html'));
    });

    app.post('/api/notes', (req, res) => {
        const newNote = req.body
        fs.writeFile(path.resolve('db/', 'db.json'), JSON.stringify(newNote), err => {
            if (err) console.error(err);
            
            console.log("Note made");
        });
         res.json(newNote);
    });
};