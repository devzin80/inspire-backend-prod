const mongoose = require('mongoose')
const Schema = mongoose.Schema

const optionSchema = new Schema(
    {
        text: { type: String },
        optionImage: { type: String }, // URL or path to the image (optional)
        isCorrect: { type: Boolean, required: true },
    },
    { timestamps: true },
)

const Option = mongoose.model('Option', optionSchema)
module.exports = Option
