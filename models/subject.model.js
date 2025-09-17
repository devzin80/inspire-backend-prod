const mongoose = require('mongoose')
const Schema = mongoose.Schema

const subjectSchema = new Schema(
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
        image: {
            type: String,
            default: '/default-subject-icon.svg', // Assuming image is a required
        },
        price: {
            type: String,
            required: true,
        },
        itemType: {
            type: String, // Simply define it as a String
            default: 'Subject', // Set it to 'subject' by default
        },
        subcategory: {
            type: Schema.Types.ObjectId,
            ref: 'Subcategory', // Reference to Subcategory model
        },
        class: {
            type: Schema.Types.ObjectId,
            ref: 'Class', // Reference to Class model
        },
        chapters: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Chapter', // Reference to Chapter model
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

const Subject = mongoose.model('Subject', subjectSchema)

module.exports = Subject
