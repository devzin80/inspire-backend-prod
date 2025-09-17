const Coupon = require('../models/coupon.model')

exports.createCoupon = async (req, res) => {
    const {
        couponFor,
        coupon,
        applyToClasses,
        value,
        unit,
        minPurchase,
        startDate,
        endDate,
        status,
    } = req.body

    try {
        const NewCoupon = await Coupon.create({
            couponFor,
            coupon,
            applyToClasses,
            value,
            unit,
            minPurchase,
            startDate,
            endDate,
            status,
        })

        if (!NewCoupon) {
            return res.status(500).json({
                success: false,
                message: 'Failed to create Coupon',
            })
        }

        res.status(200).json({
            success: true,
            NewCoupon,
        })
    } catch (e) {
        res.status(400).json({
            success: false,
            message: e.message,
        })
    }
}

exports.applyCoupon = async (req, res) => {
    const { coupon, purchaseAmount, date, itemType } = req.body

    try {
        const validateCoupon = await Coupon.findOne(coupon)

        if (!validateCoupon) {
            return res.status(404).json({
                success: false,
                message: 'No Coupon Found',
            })
        }

        if (
            validateCoupon.couponFor != itemType ||
            validateCoupon.status != 'start'
        ) {
            return res.status(404).json({
                success: false,
                message: 'Invalid Coupon',
            })
        }

        if (
            validateCoupon.minPurchase != '0' &&
            validateCoupon.minPurchase >= purchaseAmount
        ) {
            return res.status(404).json({
                success: false,
                message: 'Invalid Amount',
            })
        }
        if (
            validateCoupon.startDate < date &&
            validateCoupon.endDate < date
        ) {
            return res.status(404).json({
                success: false,
                message: 'Coupon Expired',
            })
        }

        res.status(200).json({
            success: true,
            coupon : {
                value: validateCoupon.value,
                unit: validateCoupon.unit
            }
        })
    } catch (e) {
        res.status(400).json({
            success: false,
            message: e.message,
        })
    }
}


exports.updateCoupon = async (req, res) => {
    try {
        const { id } = req.params
        const { updates } = req.body

        const couponData = await Coupon.findByIdAndUpdate(
            id,
            { $set: updates },
            { new: true },
        )
        if (!couponData) {
            return res.status(404).json({
                success: false,
                message: 'Class not found',
            })
        }
        res.status(200).json({
            success: true,
            couponData,
        })
    } catch (e) {
        res.status(400).json({
            success: false,
            message: e.message,
        })
    }
}

exports.deleteCoupon = async (req, res) => {
    try {
        const { id } = req.params

        const couponData = await Coupon.findByIdAndDelete(id)
        if (!couponData) {
            return res.status(404).json({
                success: false,
                message: 'Coupon not found',
            })
        }
        res.status(200).json({
            success: true,
            message: 'Coupon deleted successfully',
        })
    } catch (e) {
        res.status(400).json({
            success: false,
            message: e.message,
        })
    }
}

exports.getCoupons = async (req, res) => {
    try {
        const coupons = await Coupon.find()
        .populate('applyToClasses')
        // .populate('Subcategory')
        if (!coupons || coupons.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'No coupons found',
            })
        }
        res.status(200).json({
            success: true,
            coupons,
        })
    } catch (e) {
        res.status(400).json({
            success: false,
            message: e.message,
        })
    }
}
