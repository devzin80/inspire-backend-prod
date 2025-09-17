const mongoose = require('mongoose')

const notificationSchema = new mongoose.Schema(
    {
        
        message: { type: String, required: true },
        class: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Class',
            required: true,
        },
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User', // since Admin is also in User schema
            
        },
        readBy: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
            },
        ],
    },
    { timestamps: true },
)

const Notification = mongoose.model('Notification', notificationSchema)
module.exports = Notification
