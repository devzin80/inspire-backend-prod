const SocialMedia = require('../models/socailMedia.model')

exports.createMedia = async (req, res) => {
    const { url, image, name } = req.body
    try {
        const media = await SocialMedia.create({url, image, name})

        if (!media) {
            return res.status(500).json({
                success: false,
                message: 'Failed to Create',
            })
        }

        res.status(200).json({
            success: true,
            media,
        })
    } catch (e) {
        res.status(400).json({
            success: false,
            message: e.message,
        })
    }
}
exports.getMedias = async (req, res) => {
    try {
        const medias = await SocialMedia.find().lean()

        if (!medias) {
            return res.status(500).json({
                success: false,
                message: 'Failed to fetch',
            })
        }

        res.status(200).json({
            success: true,
            medias,
        })
    } catch (e) {
        res.status(400).json({
            success: false,
            message: e.message,
        })
    }
}
exports.updateMedia = async (req, res) => {
    const { id } = req.params
    const { updates } = req.body

    try {
        const media = await SocialMedia.findByIdAndUpdate(
            id,
            { $set: updates },
            { new: true },
        )

        if (!media) {
            return res.status(500).json({
                success: false,
                message: 'Failed to update',
            })
        }

        res.status(200).json({
            success: true,
            media,
        })
    } catch (e) {
        res.status(400).json({
            success: false,
            message: e.message,
        })
    }
}
exports.deleteMedia = async (req, res) => {
    const { id } = req.params

    try {
        const media = await SocialMedia.findByIdAndDelete(id)

        if (!media) {
            return res.status(500).json({
                success: false,
                message: 'Failed to Delete',
            })
        }

        res.status(200).json({
            success: true,
            media,
        })
    } catch (e) {
        res.status(400).json({
            success: false,
            message: e.message,
        })
    }
}
