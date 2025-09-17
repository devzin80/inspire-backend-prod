const mongoose = require('mongoose')
const Schema = mongoose.Schema

const couponSchema = new Schema({
    couponFor: {
        type: String,
        required: true,
        enum: ['book', 'course'],
    },
    coupon: {
        type: String,
        required: true,
    },
    applyToClasses: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Class',
        },
    ],
    value: {
        type: String,
        required: true,
    },
    unit: {
        type: String,
        required: true,
        enum: ['taka', 'percent'],
    },
    minPurchase: {
        type: String,
    },
    startDate: {
        type: Date,
        required: true,
    },
    endDate: {
        type: Date,
        required: true,
    },
    status: {
        type: String,
        required: true,
        enum: ['start', 'stop'],
    },
})

const Coupon = mongoose.model('Coupon', couponSchema)
module.exports = Coupon
