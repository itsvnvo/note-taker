const noteData = require('../../../db/db.json')
const path = require('path');
const fs = require("fs");

module.exports = (app) => {


    app.get('/api/notes', (req, res) => {
        fs.readFile(path.resolve('db/', 'db.json'), 'utf-8', (err, data) => {
            if (err) console.error(err);
            console.log('This is data 1', data)
            res.json(JSON.parse(data));

        });
    });

    app.get('/notes', (req, res) => {
        res.sendFile(path.join(__dirname, '../../notes.html'));
    });

    app.post('/api/notes', (req, res) => {
        const newNote = req.body
        fs.readFile(path.resolve('db/', 'db.json'), 'utf-8', (err, dbInfo) => {
            const parsed = JSON.parse(dbInfo)
            if (err) console.error(err);
            parsed.push(newNote)
            fs.writeFile(path.resolve('db/', 'db.json'), JSON.stringify(parsed), err => {
                if (err) console.error(err);
                console.log("Note made");
            });
        });
        res.json(newNote);
    })
};