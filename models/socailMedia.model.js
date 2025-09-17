const mongoose = require('mongoose')
const Schema = mongoose.Schema

// MainCategory Schema
const socialSchema = new Schema(
    {
        url: {
            type: String,
            required: true,
        },
        image: {
            type: String,
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
    },
    { timestamps: true },
)

const SocialMedia = mongoose.model('SocialMedia', socialSchema)
module.exports = SocialMedia
