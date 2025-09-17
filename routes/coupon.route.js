const express = require('express')
const {
    createCoupon,
    applyCoupon,
    getCoupons,
    updateCoupon,
    deleteCoupon,
} = require('../controllers/coupon.controller')

const router = express.Router()

router.post('/create', createCoupon)
router.post('/apply-coupon', applyCoupon)
router.get('/all', getCoupons)

router.patch('/update/:id', updateCoupon)
router.delete('/delete/:id', deleteCoupon)

module.exports = router
