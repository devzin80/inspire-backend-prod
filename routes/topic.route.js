const express = require('express');
const { createTopic, getTopics, getTopic, updateTopic, deleteTopic } = require('../controllers/topic.controller');

const router = express.Router()




router.post('/create', createTopic)
router.get('/all', getTopics)
router.get('/:id', getTopic)
router.patch('/update/:id', updateTopic)
router.delete('/delete/:id', deleteTopic)





module.exports = router