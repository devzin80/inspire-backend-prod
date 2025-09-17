const express = require('express')
const { createNotification, getAllNotification, getNotificationsByClass, markAsRead, markAllAsRead, updateNotification, deleteNotification } = require('../controllers/notification.controller')




const router = express.Router()

//  Route to create a new category
router.post('/create', createNotification)

// Get all categories
router.get('/all', getAllNotification)
router.get('/by-class', getNotificationsByClass)

// Get a single category by ID


// Update a category by ID
router.patch('/update/:id', updateNotification)

// // Delete a category by ID
router.delete('/delete/:id', deleteNotification)

router.patch('/mark-as-read', markAsRead)
router.patch('/mark-all-as-read', markAllAsRead)

module.exports = router
