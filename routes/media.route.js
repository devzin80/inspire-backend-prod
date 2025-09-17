const express = require('express')
const { createMedia, getMedias, updateMedia, deleteMedia } = require('../controllers/social.controller')



const router = express.Router()

//  Route to create a new category
router.post('/create', createMedia)

// Get all categories
router.get('/all', getMedias)

// Get a single category by ID


// Update a category by ID
router.patch('/update/:id', updateMedia)

// Delete a category by ID
router.delete('/delete/:id', deleteMedia)

module.exports = router
