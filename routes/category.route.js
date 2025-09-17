const express = require('express')
const {
    createCategory,
    getCategories,
    getCategory,
    updateCategory,
    deleteCategory,
} = require('../controllers/category.controller')
const router = express.Router()

//  Route to create a new category
router.post('/create', createCategory)

// Get all categories
router.get('/all', getCategories)

// Get a single category by ID
router.get('/:id', getCategory)

// Update a category by ID
router.patch('/update/:id', updateCategory)

// Delete a category by ID
router.delete('/delete/:id', deleteCategory)

module.exports = router
