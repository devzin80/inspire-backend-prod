const Logo = require('../models/logo.model')

exports.createLogo = async (req, res) => {
    const { url } = req.body
    const logo = await Logo.create({url})
    if (!logo) {
        return res.status(500).json({
            success: false,
            message: 'Failed to create logo',
        })
    }

    res.status(200).json({
        success: true,
        logo,
    })
}

exports.updateLogo = async (req, res) => {
    const { id } = req.params
    const { updates} = req.body

    try {
        const updated = await Logo.findByIdAndUpdate(
            id,
            { $set: updates },
            { new: true },
        )

        if(!updated){
             return res.status(500).json({
                 success: false,
                 message: 'Failed to update',
             })
        }

        res.status(200).json({
            success: true,
            logo: updated
        })
        
    } catch (e) {
        res.status(400).json({
            success: false,
            message: e.message,
        })
    }
}


exports.getLogo = async (req, res) => {
  
    const logo = await Logo.find()
    if (!logo) {
        return res.status(500).json({
            success: false,
            message: 'Failed to get logo',
        })
    }

    res.status(200).json({
        success: true,
        logo:logo[0].url,
    })
}