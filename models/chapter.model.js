const mongoose = require('mongoose')
const Schema = mongoose.Schema

const chapterSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
        },
        slug: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },

        price: {
            type: Number,
            required: true,
        },
        itemType: {
            type: String, // Simply define it as a String
            default: 'Chapter', // Set it to 'chapter' by default
        },
        subject: {
            type: Schema.Types.ObjectId,
            ref: 'Subject', // Reference to Subject model
        },
        topics: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Topic', // Reference to Topic model
            },
        ],
        modelTests: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Quiz', // Reference to Topic model
            },
        ],
    },
    { timestamps: true },
)

const Chapter = mongoose.model('Chapter', chapterSchema)

module.exports = Chapter
