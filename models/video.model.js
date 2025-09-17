const mongoose = require('mongoose')
const Schema = mongoose.Schema

const videoSchema = new Schema(
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
        url: {
            type: String,
            required: true,
        },
        duration: {
            type: String,
        },
        description: {
            type: String,
        },
        thumbnail: {
            type: String,
        },
        preview: {
            type: Boolean,
            default: false,
        },
        topic: {
            type: Schema.Types.ObjectId,
            ref: 'Topic', // Reference to Topic model
        },
        notes: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Note', // Reference to Note model
            },
        ],
        comments: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Comment', // Reference to Comment model
            },
        ],
    },
    { timestamps: true },
)

const Video = mongoose.model('Video', videoSchema)

module.exports = Video
