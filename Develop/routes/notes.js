const notes = require('express').Router();
const { v4: uuidv4 } = require('uuid');
const {readAndAppend, readFromFile} = require('../helpers/fsUtils');

notes.get('/', (req, res) => {
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
});

notes.post('/', (req, res) => {
    console.info (`${req.method} request received to add note.`)

    const {title, text} = req.body;

    if (title && text) {
        const newNote = {
            title,
            text,
            id: uuidv4(),
        };

        readAndAppend(newNote, '../Develop/db/db.json');

        const response = {
            status: 'success',
            body: newNote
        };

        console.log(response);

        res.status(201).json(response);
    } else {
        res.status(500).json('Error in posting note.')
    }
});

module.exports = notes;