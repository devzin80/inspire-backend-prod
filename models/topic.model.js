const mongoose = require('mongoose')
const Schema = mongoose.Schema

const topicSchema = new Schema(
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
            default: 'Topic', // Set it to 'topic' by default
        },
        chapter: {
            type: Schema.Types.ObjectId,
            ref: 'Chapter', // Reference to Chapter model
        },
        videos: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Video', // Reference to Video model
            },
        ],
        quizzes: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Quiz', // Reference to Quiz model
            },
        ],
    },
    { timestamps: true },
)

const Topic = mongoose.model('Topic', topicSchema)

module.exports = Topic
