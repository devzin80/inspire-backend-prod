const mongoose = require('mongoose')
const Schema = mongoose.Schema

// MainCategory Schema
const noteSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },
        url: {
            type: String,
            required: true,
        },
    },
    { timestamps: true },
)

const Note = mongoose.model('Note', noteSchema)
module.exports = Note
