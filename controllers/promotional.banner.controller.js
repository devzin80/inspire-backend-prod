const PromotionalBanner = require("../models/promotionalBanner.model")


exports.createPromotionalBanner = async (req, res) => {
    const { url, image } = req.body
    try {
        const promotionalBanner = await PromotionalBanner.create({url, image})

        if (!promotionalBanner) {
            return res.status(500).json({
                success: false,
                message: 'Failed to Create',
            })
        }

        res.status(200).json({
            success: true,
            promotionalBanner,
        })
    } catch (e) {
        res.status(400).json({
            success: false,
            message: e.message,
        })
    }
}
exports.getPromotionalBanners = async (req, res) => {
    try {
        const promotionalBanners = await PromotionalBanner.find().lean()

        if (!promotionalBanners) {
            return res.status(500).json({
                success: false,
                message: 'Failed to fetch',
            })
        }

        res.status(200).json({
            success: true,
            promotionalBanners,
        })
    } catch (e) {
        res.status(400).json({
            success: false,
            message: e.message,
        })
    }
}
exports.updatePromotionalBanner = async (req, res) => {
    const { id } = req.params
    const { updates } = req.body

    try {
        const banner = await PromotionalBanner.findByIdAndUpdate(
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
exports.deletePromotionalBanner = async (req, res) => {
    const { id } = req.params

    try {
        const banner = await PromotionalBanner.findByIdAndDelete(id)

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
