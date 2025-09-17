const Topic = require("../models/topic.model")
const Video = require("../models/video.model")




// Create a new video
exports.createVideo = async (req, res) => {
    try {
        const {
            title,
            topic,
            url,
            description,
            thumbnail,
            duration,
            preview,
            slug,
        } = req.body

        // Auto-generate slug from title
       

        const video = await Video.create({
            title,
            slug,
            url,
            description,
            thumbnail,
            duration,
            preview: preview || false,
            topic,
        })

        if(!video){
            return res.status(500).json({
                success: false,
                message: 'something went wrong'
            })

        }

        // Link video with topic
        await Topic.findByIdAndUpdate(topic, {
            $push: { videos: video._id}
        })

        res.status(201).json({
            success: true,
            video,
        })
    } catch (e) {
        res.status(400).json({
            success: false,
            message: e.message,
        })
    }
}

// Get all videos
exports.getVideos = async (req, res) => {
    try {
        const videos = await Video.find()
            .populate('topic', 'title') // populate topic title
            .populate('notes', 'title') // populate notes
            .populate('comments') // populate comments
        res.status(200).json({
            success: true,
            videos,
        })
    } catch (e) {
        res.status(400).json({
            success: false,
            message: e.message,
        })
    }
}

// Get a single video
exports.getVideoBySlug = async (req, res) => {
    try {
        const { id } = req.params
        const video = await Video.findOne({slug:id})
            // .populate('topic', 'title')
            .populate('notes')
            // .populate('comments')

        if (!video) {
            return res.status(404).json({
                success: false,
                message: 'video not found',
            })
        }
        res.status(200).json({
            success: true,
            video,
        })
    } catch (e) {
        res.status(400).json({
            success: false,
            message: e.message,
        })
    }
}
exports.getVideo = async (req, res) => {
    try {
        const { id } = req.params
        const video = await Video.findById(id)
            .populate('topic', 'title')
            .populate('notes', 'title')
            .populate('comments')

        if (!video) {
            return res.status(404).json({
                success: false,
                message: 'video not found',
            })
        }
        res.status(200).json({
            success: true,
            video,
        })
    } catch (e) {
        res.status(400).json({
            success: false,
            message: e.message,
        })
    }
}

// Update video
exports.updateVideo = async (req, res) => {
    try {
        const { id } = req.params
        const updates = req.body

        // regenerate slug if title changes
        

        const video = await Video.findByIdAndUpdate(
            id,
            { $set: updates },
            { new: true },
        )

        if (!video) {
            return res.status(404).json({
                success: false,
                message: 'video not found',
            })
        }
        res.status(200).json({
            success: true,
            video,
        })
    } catch (e) {
        res.status(400).json({
            success: false,
            message: e.message,
        })
    }
}

// Delete video
exports.deleteVideo = async (req, res) => {
    try {
        const { id, topic } = req.body
        const video = await Video.findByIdAndDelete(id)
        if (!video) {
            return res.status(404).json({
                success: false,
                message: 'video not found',
            })
        }
        await Topic.findByIdAndUpdate(topic,{
            $pull: {videos: id}
        })
        res.status(200).json({
            success: true,
            video,
        })
    } catch (e) {
        res.status(400).json({
            success: false,
            message: e.message,
        })
    }
}

// Add a comment to a video
exports.addComment = async (commentId, videoId) => {
    try {
        const updatedVideo = await Video.findByIdAndUpdate(
            videoId,
            { $push: { comments: commentId } },
            { new: true },
        )
        if (!updatedVideo) throw new Error('video not found')
        return updatedVideo
    } catch (error) {
        console.error('Error adding comment:', error.message)
    }
}

// Remove a comment from a video
exports.removeComment = async (commentId, videoId) => {
    try {
        const updatedVideo = await Video.findByIdAndUpdate(
            videoId,
            { $pull: { comments: commentId } },
            { new: true },
        )
        if (!updatedVideo) throw new Error('video not found')
        return updatedVideo
    } catch (error) {
        console.error('Error removing comment:', error.message)
    }
}

// Add a note to a video
exports.addNote = async (videoId, noteId) => {
    try {
        const updatedVideo = await Video.findByIdAndUpdate(
            videoId,
            { $push: { notes: noteId } },
            { new: true },
        )
        if (!updatedVideo) throw new Error('video not found')
        return updatedVideo
    } catch (error) {
        console.error('Error adding note:', error.message)
    }
}

// Remove a note from a video
exports.removeNote = async (videoId, noteId) => {
    try {
        const updatedVideo = await Video.findByIdAndUpdate(
            videoId,
            { $pull: { notes: noteId } },
            { new: true },
        )
        if (!updatedVideo) throw new Error('video not found')
        return updatedVideo
    } catch (error) {
        console.error('Error removing note:', error.message)
    }
}
