const express = require('express')
const {
    createFooter,
    getFooter,
    updateFooter,
} = require('../controllers/footer.controller')

const router = express.Router()

router.post('/create', createFooter)
router.get('/all', getFooter)

router.patch('/update/:id', updateFooter)

module.exports = router
