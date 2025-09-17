const express = require('express')
const {
    createSubject,
    getSubjects,
    getSubject,
    updateSubject,
    deleteSubject,
    getSubjectBySlug,
} = require('../controllers/subject.controller')

const router = express.Router()

//  Route to create a new category
router.post('/create', createSubject)

// Get all categories
router.get('/all', getSubjects)

// Get a single category by ID
router.get('/:id', getSubject)

router.get('/slug/:id', getSubjectBySlug)



// Update a category by ID
router.patch('/update/:id', updateSubject)

// Delete a category by ID
router.delete('/delete/:id', deleteSubject)

module.exports = router
