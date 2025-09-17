const mongoose = require('mongoose')

const classSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    subject: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Subject', // Reference to Subject model
    }],
    Subcategory: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Subcategory', // Reference to Subcategory model
    }],
})

const Class = mongoose.model('Class', classSchema)

module.exports = Class
