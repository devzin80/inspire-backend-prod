const mongoose = require('mongoose');

const otpSchema = new mongoose.Schema(
    {
        otp: { type: String, required: true },
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        phone: { type: String, required: true },
        expires: {type: Date, required: true}
    },
    {
        timestamps: true,
    },
)

const Otp = mongoose.model('Otp', otpSchema);
module.exports = Otp;