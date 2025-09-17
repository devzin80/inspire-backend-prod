const mongoose = require('mongoose')
const Schema = mongoose.Schema

// MainCategory Schema
const aboutUsSchema = new Schema(
    {
        about: {
            type: String,
            required: true,
        },
    },
    { timestamps: true },
)

const AboutUs = mongoose.model('AboutUs', aboutUsSchema)
module.exports = AboutUs
