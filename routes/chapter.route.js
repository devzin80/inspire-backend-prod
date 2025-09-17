const express = require('express');
const { createChapter, getAllChapters, getChapterByID, updateChapter, deleteChapter, getChapterBySlug } = require('../controllers/chapter.controller');
const router = express.Router()




router.post('/create', createChapter)
router.get('/all', getAllChapters)
router.get('/:id', getChapterByID)
router.get('/slug/:id', getChapterBySlug)
router.patch('/update/:id', updateChapter)
router.delete('/delete/:id', deleteChapter)










module.exports = router