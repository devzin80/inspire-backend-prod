const Note = require('../models/note.model')
const Video = require('../models/video.model')

exports.createNote = async (req, res) => {
    const { title, url, video } = req.body
    try {
        const note = await Note.create({ title, url })
        if (!note) {
            return res.status(500).json({
                success: false,
                message: 'Failed to create note',
            })
        }
        await Video.findByIdAndUpdate(video, {
            $push: { notes: note._id },
        })
        res.status(200).json({
            success: true,
            note,
        })
    } catch (e) {
        res.status(400).json({
            success: false,
            message: e.message,
        })
    }
}

exports.getNotes = async (req, res) => {
    try {
        const notes = await Note.find()
        res.status(200).json({
            success: true,
            notes,
        })
    } catch (e) {
        res.status(400).json({
            success: false,
            message: e.message,
        })
    }
}

exports.getNoteById = async (req, res) => {
    try {
        const { id } = req.params
        const note = await Note.findById(id)
        res.status(200).json({
            success: true,
            note,
        })
    } catch (e) {
        res.status(400).json({
            success: false,
            message: e.message,
        })
    }
}

exports.updateNote = async (req, res) => {
    const { id } = req.params
    const {updates } = req.body
    try {
        const note = await Note.findByIdAndUpdate(
            id,
            { $set: updates },
            { new: true },
        )
        res.status(200).json({
            success: true,
            note,
        })
    } catch (e) {
        res.status(400).json({
            success: false,
            message: e.message,
        })
    }
}


exports.deleteNote = async (req, res) => {
    const { id } = req.params
    try {
        const note = await Note.findByIdAndDelete(id)
        res.status(200).json({
            success: true,
            note,
        })
    } catch (e) {
        res.status(400).json({
            success: false,
            message: e.message,
        })
    }
}