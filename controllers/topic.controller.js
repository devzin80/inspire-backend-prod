const Chapter = require("../models/chapter.model")
const Topic = require("../models/topic.model")

exports.createTopic = async (req, res) => {
    console.log('triggered create topic');
    
    try {
        const { title, slug, chapter, price } = req.body
        const topic = await Topic.create({ title, chapter, price, slug })
        const topicId = topic._id
        await Chapter.findByIdAndUpdate(
            chapter, // Filter
            { $push: { topics: topicId } }, // Update operation
            { new: true, useFindAndModify: false }, // Options: return the updated document
        )
        res.status(201).json({
            success: true,
            topic,
        })
    } catch (e) {
        res.status(400).json({
            success: false,
            message: e.message,
        })
    }
}

// Function to get all topics

exports.getTopics = async (req, res) => {
    try {
        const topics = await Topic.find()
        res.status(200).json({
            success: true,
            topics,
        })
    } catch (e) {
        res.status(400).json({
            success: false,
            message: e.message,
        })
    }
}

// Function to get a single category

exports.getTopic = async (req, res) => {
    try {
        const { id } = req.params
        const topic = await Topic.findById(id)
        if (!topic) {
            return res.status(400).json({
                success: false,
                message: 'topic not found',
            })
        }
        res.status(200).json({
            success: true,
            topic,
        })
    } catch (e) {
        res.status(400).json({
            success: false,
            message: e.message,
        })
    }
}



// Function to update a Topic

exports.updateTopic = async (req, res) => {
    try {
        const { id, updates } = req.body
        const topic = await Topic.findByIdAndUpdate(
            id,
            { $set: updates },
            { new: true },
        )
        if (!topic) {
            return res.status(400).json({
                success: false,
                message: 'topic not found',
            })
        }
        res.status(200).json({
            success: true,
            topic,
        })
    } catch (e) {
        res.status(400).json({
            success: false,
            message: e.message,
        })
    }
}

// Function to delete a category

exports.deleteTopic = async (req, res) => {
    try {
        const { id, chapter } = req.body
        const topic = await Topic.findByIdAndDelete(id)
        if (!topic) {
            return res.status(400).json({
                success: false,
                message: 'topic not found',
            })
        }
        await Chapter.findByIdAndUpdate(
            chapter,
            { $pull: { topics: id } }, // Update operation
            { new: true, useFindAndModify: false },
        )
        res.status(200).json({
            success: true,
            topic,
        })
    } catch (e) {
        res.status(400).json({
            success: false,
            message: e.message,
        })
    }
}
