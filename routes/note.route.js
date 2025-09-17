const express = require('express');
const { createNote, getNoteById, getNotes, updateNote, deleteNote } = require('../controllers/note.controller');

const router = express.Router()


router.post('/create', createNote)
router.get('/:id', getNoteById)
router.get('/slug/:id', getNotes)
router.patch('/update/:id', updateNote)
router.delete('/delete/:id', deleteNote)










module.exports = router