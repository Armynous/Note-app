const express = require('express');
const Note = require('../models/NoteModel')
const { getNotes, createNote, getNote, deleteNote, updateNote } = require('../controllers/NoteController')

const router = express.Router();

router.get('/', getNotes)

router.get('/:id', getNote)

router.post('/', createNote)

router.delete('/:id', deleteNote)

router.patch('/:id', updateNote)

module.exports = router