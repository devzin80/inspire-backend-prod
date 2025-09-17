const express = require('express');
const { createVideo, getVideo, updateVideo, deleteVideo, getVideoBySlug } = require('../controllers/video.controller');
const router = express.Router()


router.post('/create', createVideo)
router.get('/:id', getVideo)
router.get('/slug/:id', getVideoBySlug)
router.patch('/update/:id', updateVideo)
router.delete('/delete/:id', deleteVideo)










module.exports = router