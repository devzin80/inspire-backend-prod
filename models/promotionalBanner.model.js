const mongoose = require('mongoose')
const Schema = mongoose.Schema

// MainCategory Schema
const promotionalBannerSchema = new Schema(
    {
        url: {
            type: String,
           
            default: '#'
        },
        image: {
            type: String,
            required: true,
        },
    },
    { timestamps: true },
)

const PromotionalBanner = mongoose.model('PromotionalBanner', promotionalBannerSchema)
module.exports = PromotionalBanner
