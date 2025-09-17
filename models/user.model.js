
const mongoose = require('mongoose')

const userSchema = new mongoose.Schema(
    {
        name: { type: String, default: '' },
        firstName: { type: String, default: '' },
        lastName: { type: String, default: '' },
        phoneNumber: { type: String, unique: true, default: '' },
        username: { type: String, unique: true, default: '' },
        profilePicture: { type: String, default: '/avater.svg' },
        address: {
            city: { type: String, default: '' },
            area: { type: String, default: '' },
            addressLine: { type: String, default: '' },
        },
        institutionName: { type: String, default: '' },
        class: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Class',
        },
        email: { type: String, unique: true, default: '' },
        password: { type: String },
        role: {
            type: String,
            default: 'user',
            enum: [
                'user',
                'admin',
                'superAdmin',
                'moderator',
                'guest',
                'editor',
            ],
        },
        isVerified: { type: Boolean, default: false },
    },
    { timestamps: true },
)

module.exports = mongoose.model('User', userSchema)