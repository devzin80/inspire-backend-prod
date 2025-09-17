const Banner = require('../models/banner.model')


exports.createBanner = async (req, res) => {
    const { url, image } = req.body
    try {
        const banner = await Banner.create({url, image})

        if (!banner) {
            return res.status(500).json({
                success: false,
                message: 'Failed to Create',
            })
        }

        res.status(200).json({
            success: true,
            banner,
        })
    } catch (e) {
        res.status(400).json({
            success: false,
            message: e.message,
        })
    }
}
exports.getBanners = async (req, res) => {
    try {
        const banners = await Banner.find().lean()

        if (!banners) {
            return res.status(500).json({
                success: false,
                message: 'Failed to fetch',
            })
        }

        res.status(200).json({
            success: true,
            banners,
        })
    } catch (e) {
        res.status(400).json({
            success: false,
            message: e.message,
        })
    }
}
exports.updateBanner = async (req, res) => {
    const { id } = req.params
    const { updates } = req.body

    try {
        const banner = await Banner.findByIdAndUpdate(
            id,
            { $set: updates },
            { new: true },
        )

        if (!banner) {
            return res.status(500).json({
                success: false,
                message: 'Failed to update',
            })
        }

        res.status(200).json({
            success: true,
            banner,
        })
    } catch (e) {
        res.status(400).json({
            success: false,
            message: e.message,
        })
    }
}
exports.deleteBanner = async (req, res) => {
    const { id } = req.params

    try {
        const banner = await Banner.findByIdAndDelete(id)

        if (!banner) {
            return res.status(500).json({
                success: false,
                message: 'Failed to Delete',
            })
        }

        res.status(200).json({
            success: true,
            banner,
        })
    } catch (e) {
        res.status(400).json({
            success: false,
            message: e.message,
        })
    }
}
