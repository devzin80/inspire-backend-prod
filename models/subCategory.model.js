const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Subcategory Schema
const subcategorySchema = new Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },
        classes: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Class', // Reference to Class model
            },
        ],
        subjects: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Subject', // Reference to Subject model
            },
        ],
        category: {
            type: Schema.Types.ObjectId,
            ref: 'MainCategory', // Reference to Category model
        },
    },
    { timestamps: true },
)

const Subcategory = mongoose.model('Subcategory', subcategorySchema)
module.exports = Subcategory
