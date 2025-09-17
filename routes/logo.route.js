const express = require('express')
const { createLogo, updateLogo, getLogo } = require('../controllers/logo.controller')


const router = express.Router()

router.post('/create', createLogo)
router.get('/all', getLogo)


router.patch('/update/:id', updateLogo)


module.exports = router
