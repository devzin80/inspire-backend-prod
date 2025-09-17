const Footer = require("../models/footer.model")

exports.createFooter = async(req, res) => {
    const { phone, address, email} = req.body
    console.log(phone, address, email);
    
    try {
        const newFooter = await Footer.create({
            phone,
            email,
            address
        })
        if(!newFooter) return res.status(500).json({
            success: false,
            message: " Failed to create Footer"
        })

        res.status(200).json({
            success:true,
            newFooter
        })


    } catch (e) {
         res.status(400).json({
             success: false,
             message: e.message,
         })
    }
}
exports.getFooter = async(req, res) => {
    
    try {
        const footer = await Footer.find().lean()
        if (!footer)
            return res.status(500).json({
                success: false,
                message: ' Failed to Fetch Footer',
            })

        res.status(200).json({
            success: true,
            footer,
        })


    } catch (e) {
         res.status(400).json({
             success: false,
             message: e.message,
         })
    }
}

exports.updateFooter = async (req, res) => {
    const { id } = req.params
    const { updates } = req.body

    try {
        const updatedFooter = await Footer.findByIdAndUpdate(
            id,
            { $set: updates },
            { new: true },
        )

        if (!updatedFooter) {
            return res.status(500).json({
                success: false,
                message: 'Failed to update',
            })
        }

        res.status(200).json({
            success: true,
            logo: updatedFooter,
        })
    } catch (e) {
        res.status(400).json({
            success: false,
            message: e.message,
        })
    }
}


