const mongoose = require('mongoose')
const Schema = mongoose.Schema

// MainCategory Schema
const bannerSchema = new Schema(
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

const Banner = mongoose.model('Banner', bannerSchema)
module.exports = Banner
