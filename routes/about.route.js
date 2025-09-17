const express = require('express')
const { createAbout, getAbout, updateAbout } = require('../controllers/about.controller')



const router = express.Router()

router.post('/create', createAbout)
router.get('/all', getAbout)


router.patch('/update/:id', updateAbout)


module.exports = router
