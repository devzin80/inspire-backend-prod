const AboutUs = require("../models/aboutUs.model")


exports.createAbout = async (req, res) => {
    const { about } = req.body
    const aboutUS = await AboutUs.create({ about })
    if (!aboutUS) {
        return res.status(500).json({
            success: false,
            message: 'Failed to create aboutUS',
        })
    }

    res.status(200).json({
        success: true,
        aboutUS,
    })
}

exports.updateAbout = async (req, res) => {
    const { id } = req.params
    const { updates } = req.body

    try {
        const updated = await AboutUs.findByIdAndUpdate(
            id,
            { $set: updates },
            { new: true },
        )

        if (!updated) {
            return res.status(500).json({
                success: false,
                message: 'Failed to update',
            })
        }

        res.status(200).json({
            success: true,
            aboutUs: updated,
        })
    } catch (e) {
        res.status(400).json({
            success: false,
            message: e.message,
        })
    }
}

exports.getAbout = async (req, res) => {
    const aboutUs = await AboutUs.find()
    if (!aboutUs) {
        return res.status(500).json({
            success: false,
            message: 'Failed to get about',
        })
    }

    res.status(200).json({
        success: true,
        aboutUs,
    })
}
