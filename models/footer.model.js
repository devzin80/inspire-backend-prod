const mongoose = require('mongoose')
const Schema = mongoose.Schema

// MainCategory Schema
const footerSchema = new Schema(
    {
        address: {
            type: String,
           
        },
        phone: {
            type: String,
           
        },
        email: {
            type: String,
           
        },
    },
    { timestamps: true },
)

const Footer = mongoose.model('Footer', footerSchema)
module.exports = Footer
