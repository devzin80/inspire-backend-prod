const express = require('express')
const { getClasses, getClass, createClass, updateClass, deleteClass } = require('../controllers/class.controller')
const { route } = require('./user.route')
const router = express.Router()

router.get('/all', getClasses)
router.get('/:id', getClass)
router.post('/create', createClass)
router.patch('/update/:id', updateClass)
router.delete('/delete/:id', deleteClass)












module.exports = router