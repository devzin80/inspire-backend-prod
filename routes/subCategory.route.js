const express = require('express')
const {
    createSubCategory,
    getSubCategories,
    getSubCategory,
    updateSubCategory,
    deleteSubCategory,
} = require('../controllers/subCategory.controller')

const router = express.Router()

//  Route to create a new category
router.post('/create', createSubCategory)

// Get all categories
router.get('/all', getSubCategories)

// Get a single category by ID
router.get('/:id', getSubCategory)

// Update a category by ID
router.patch('/update/:id', updateSubCategory)

// Delete a category by ID
router.delete('/delete/:id', deleteSubCategory)

module.exports = router
