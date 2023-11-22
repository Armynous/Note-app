const Note = require('../models/NoteModel')
const mongoose = require('mongoose')

// get all data
const getNotes = async (req, res) => {
    const notes = await Note.find({}).sort({ createdAt: -1 })

    res.status(200).json(notes)
}

// get a single data
const getNote = async (req, res) => {
    const { id } = req.params
    const note = await Note.findById(id)

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: "Invalid note id" })
    }

    res.status(200).json(note)
}

// create a new data
const createNote = async (req, res) => {
    const { author, content } = req.body

    try {
        const note = await Note.create({ author, content })
        res.status(200).json(note)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

// delete a data
const deleteNote = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: "Invalid note id" })
    }

    const note = await Note.findByIdAndDelete({ _id: id })

    res.status(200).json(note)
}

//update a new data
const updateNote = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: "Invalid note id" })
    }

    const note = await Note.findByIdAndUpdate({ _id: id }, {
        ...req.body
    })

    res.status(200).json(note)
}

module.exports = {
    getNotes,
    getNote,
    createNote,
    deleteNote,
    updateNote
}