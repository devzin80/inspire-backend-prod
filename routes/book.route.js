const express = require('express')
const { createBook, getAllBooks, getBookById, updateBook, deleteBook } = require('../controllers/book.controller')


const router = express.Router()

//  Route to create a new category
router.post('/create', createBook)

// Get all categories
router.get('/all', getAllBooks)

// Get a single category by ID
router.get('/:id', getBookById)

// Update a category by ID
router.patch('/update/:id', updateBook)

// Delete a category by ID
router.delete('/delete/:id', deleteBook)

module.exports = router
