const express = require('express')
const { createQuiz, getQuizBySlug, getAllQuizzes, updateQuiz } = require('../controllers/quiz.controller')





const router = express.Router()

//  Route to create a new category
router.post('/create', createQuiz)

// Get all categories
router.get('/all', getAllQuizzes)
router.get('/by-slug', getQuizBySlug)

// Get a single category by ID


// Update a category by ID
router.patch('/update/:id', updateQuiz)

// // Delete a category by ID
// router.delete('/delete/:id', deleteQ)



module.exports = router
