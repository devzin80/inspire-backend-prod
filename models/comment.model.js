const mongoose = require('mongoose')
const { Schema } = mongoose

// Schema for individual comments
const commentSchema = new Schema({
    content: {
        type: String,
        required: true,
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    isApproved: {
        type: Boolean,
        default: false, // Only show comments that are approved by an admin
    },
    isAdminReply: {
        type: Boolean,
        default: false, // To differentiate between user comments and admin replies
    },
    parent: {
        type: Schema.Types.ObjectId,
        ref: 'Comment',
        default: null, // Reference to the parent comment
    },
    replies: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Comment', // Array of reply comments
        },
    ],
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
})

// Middleware to update the updatedAt field
commentSchema.pre('save', function (next) {
    this.updatedAt = Date.now()
    next()
})

// Static method to get approved comments with all replies (recursive)

const Comment = mongoose.model('Comment', commentSchema)

module.exports = Comment
