const mongoose = require('mongoose')
const Schema = mongoose.Schema

// MainCategory Schema
const mainCategorySchema = new Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },
        subcategories: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Subcategory', // Reference to Subcategory model
            },
        ],
    },
    { timestamps: true },
)

const MainCategory = mongoose.model('MainCategory', mainCategorySchema)
module.exports = MainCategory
