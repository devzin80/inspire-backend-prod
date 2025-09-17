const express = require('express')
const { createPromotionalBanner, getPromotionalBanners, updatePromotionalBanner, deletePromotionalBanner } = require('../controllers/promotional.banner.controller')





const router = express.Router()

//  Route to create a new category
router.post('/create', createPromotionalBanner)

// Get all categories
router.get('/all', getPromotionalBanners)

// Get a single category by ID


// Update a category by ID
router.patch('/update/:id', updatePromotionalBanner)

// Delete a category by ID
router.delete('/delete/:id', deletePromotionalBanner)

module.exports = router
