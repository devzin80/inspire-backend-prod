const express = require('express')
const { createBanner, getBanners, updateBanner, deleteBanner } = require('../controllers/banner.controller')




const router = express.Router()

//  Route to create a new category
router.post('/create', createBanner)

// Get all categories
router.get('/all', getBanners)

// Get a single category by ID


// Update a category by ID
router.patch('/update/:id', updateBanner)

// Delete a category by ID
router.delete('/delete/:id', deleteBanner)

module.exports = router
