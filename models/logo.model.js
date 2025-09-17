const mongoose = require('mongoose')
const Schema = mongoose.Schema

// MainCategory Schema
const logoSchema = new Schema(
    {
        url: {
            type: String,
            required: true,
        },
    },
    { timestamps: true },
)

const Logo = mongoose.model('Logo', logoSchema)
module.exports = Logo
