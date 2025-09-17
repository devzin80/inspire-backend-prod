const mongoose = require('mongoose')
const Schema = mongoose.Schema

const bookSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },
        slug: {
            type: String,
            required: true,
        },
        itemType: {
            type: String, // Simply define it as a String
            default: 'Book', // Set it to 'Book' by default
        },
        writer: {
            type: String,
            trim: true,
        },

        price: {
            type: String,
        },
        offerPrice: {
            type: String,
        },

        stock: {
            type: Number,
            required: true,
            min: 0,
            default: 0,
        },
        images: [
            {
                type: String,
                default: '/default-book-icon.svg',
            },
        ],
        publication: {
            type: String,
        },
        edition: {
            type: String,
        },

        language: {
            type: String,
        },
        type: {
            type: String,
        },
        category: {
            type: String,
        },
        subcategory: {
            type: Schema.Types.ObjectId,
            ref: 'Subcategory',
        },
        class: {
            type: Schema.Types.ObjectId,
            ref: 'Class',
        },
    },
    { timestamps: true },
)

const Book = mongoose.model('Book', bookSchema)
module.exports = Book
