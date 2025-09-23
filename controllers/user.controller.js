const Otp = require('../models/otp.model')
const User = require('../models/user.model')
const bcrypt = require('bcrypt')
const crypto = require('crypto')
require('dotenv').config()



function generateUsername() {
    const prefix = 'IO-User'
    const randomStr = Math.random().toString(36).slice(2, 8) // 6-char alphanumeric
    const timestamp = Date.now().toString().slice(-4) // last 4 digits of timestamp
    return `${prefix}-${randomStr}${timestamp}`
}

exports.checkUser = async (req, res) => {
    try {
        const { phone } = req.query
        console.log('I am in ', phone)

        if (!phone) {
            return res.status(200).json({
                code: 400,
            })
        }

        const user = await User.findOne({ phoneNumber: phone })
        // console.log(user);

        if (!user) {
            return res.status(200).json({
                code: 5000,
                success: false,
                message: 'user Found with this phone number',
            })
        }
        res.status(200).json({
            success: true,
            code: 1000,
            user: {
                username: user.username,
                role: user.role,
            },
        })
    } catch (e) {
        res.status(500).json({
            message: 'Error Finding user' || e.message,
        })
    }
}

exports.generateOtp = async (req, res) => {
    const { phone } = req.body
    if (!phone)
        return res.status(400).json({ message: 'Must Provide Phone Number' })

    const otp = crypto.randomInt(1000, 10000).toString()
    const expires = Date.now() + 5 * 60 * 1000
    try {
        const storeOtp = await Otp.create({
            otp,
            phone,
            expires,
        })
        // console.log(storeOtp)

        if (!storeOtp)
            return res
                .status(500)
                .json({ message: 'Something went wrong saving Otp to db' })

        const smsConfig = {
            api_key: process.env.SMS_API_KEY,
            senderid: process.env.SMS_API_SENDER,
            number: phone,
            message: `[Inspire Online] Your verification code is ${otp}. This OTP is valid for 5 minutes. Do not share it with anyone.`,
        }

        const smsResponse = await fetch(process.env.BULK_SMS_API, {
            headers: {
                'Content-Type': 'application/json',
            },
            method: 'POST',
            body: JSON.stringify(smsConfig),
        })
        const otpSender = await smsResponse.json()

        if (
            otpSender.response_code == 202 &&
            otpSender.success_message &&
            !otpSender.error_message
        ) {
            return res.status(200).json({
                success: true,
                message: 'OTP sent Successfully',
            })
        } else {
            return res.status(500).json({
                success: false,
                message: 'OTP generated but not sent ',
            })
        }
    } catch (e) {
        console.log(e.message)
    }
}

exports.verifyOtp = async (req, res) => {
    const { phone, otp } = req.body
    console.log(phone, otp)

    if (!phone && !otp)
        return res.status(400).json({
            success: false,
            message: 'Otp or Phone Number not provided',
        })

    const isOtp = await Otp.findOne({ phone, otp })

    if (!isOtp || isOtp.expires < Date.now() || isOtp.otp !== otp) {
        return res.status(400).json({
            success: false,
            message: 'Invalid or expired OTP',
        })
    }

    await Otp.deleteOne({ _id: isOtp._id })

    res.status(200).json({
        success: true,
        code: 5000,
    })
}

// exports.createUser = async (req, res) => {
//     try {
//         const { phone, SelectedClass, password } = req.body
//         if (!phone || !SelectedClass || !password) {
//             return res.status(400).json({
//                 success: false,
//                 message: 'Please provide all required fields',
//             })
//         }
//     const encryptedPass = await bcrypt.hash(password, 10)
//     const userName = generateUsername()

//         const user = {
//             phoneNumber: phone,
//             class: SelectedClass,
//             password: encryptedPass,
//             userName,
//             isVerified: true,
//         }

//         const newUser = await User.create(user)

//         if (!newUser){
//             return res.status(500).json({
//                 success: false,
//                 message: 'Failed to create User'
//             })
//         }
//       const populatedUser = User.findById(newUser._id).populate({path:'class',select:'title'})
        
//         res.status(200).json({
//             success: true,
//             populatedUser,
//         })




//     } catch (error) {
//         res.status(500).json({
//             message: 'Error creating user',
//             error: error.message,
//         })
//     }
// }

exports.createUser = async (req, res) => {
    try {
        const { phone, SelectedClass, password } = req.body

        if (!phone || !SelectedClass || !password) {
            return res.status(400).json({
                success: false,
                message: 'Please provide all required fields',
            })
        }

        // hash password
        const encryptedPass = await bcrypt.hash(password, 10)
        const userName =  generateUsername()

        // create + save user (instead of User.create)
        const userDoc = new User({
            phoneNumber: phone,
            class: SelectedClass,
            password: encryptedPass,
            username:userName,
            isVerified: true,
        })

        await userDoc.save()

        // populate in one go without another query
        const populatedUser = await userDoc.populate({
            path: 'class',
            select: 'title',
        })
        res.cookie('user', populatedUser._id, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'None',
            maxAge: 30 * 60 * 60 * 1000, // 30 day
        })
        res.header('Access-Control-Allow-Credentials', 'true')

        return res.status(201).json({
            success: true,
            user: populatedUser,
        })
    } catch (error) {
        console.error('Error creating user:', error)
        return res.status(500).json({
            success: false,
            message: 'Error creating user',
            error: error.message,
        })
    }
}

exports.createAdminUser = async (req, res) => {
    try {
        const {
            firstName,
            lastName,
            email,
            password,
            role,
            isVerified = false,
            phoneNumber,
        } = req.body
        if (!email || !password || !role) {
            return res
                .status(400)
                .json({ message: 'Phone number and password are required' })
        }
        const encryptedPassword = await bcrypt.hash(password, 10)

        const createdAdmin = await User.create({
            firstName,
            lastName,
            email,
            password: encryptedPassword,
            role,
            isVerified,
            phoneNumber,
        })
        if (!createdAdmin) {
            return res
                .status(500)
                .json({ message: 'Failed to create admin user' })
        }

        // Logic to create an admin user would go here

        res.status(200).json({
            message: 'Admin user created successfully',
            user: createdAdmin,
        })
    } catch (error) {
        res.status(500).json({
            message: 'Error creating admin user',
            error: error.message,
        })
    }
}

exports.adminChecker = async (req, res) => {
    try {
        const user = await User.findOne({ role: 'superAdmin' })
        if (!user) {
            return res.status(404).json({ message: 'Admin user not found' })
        }

        res.status(200).json({ message: 'Admin user found', user })
    } catch (error) {
        res.status(500).json({
            message: 'Error finding admin user',
            error: error.message,
        })
    }
}

exports.loginUser = async (req, res) => {
    try {
        const { username, password } = req.body
        if (!username || !password) {
            return res
                .status(400)
                .json({ message: 'Please send all required fields.' })
        }

        const user = await User.findOne({ username })
        if (!user) {
            return res.status(404).json({ message: 'False flag' })
        }

        const isPasswordValid = await bcrypt.compare(password, user.password)
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'False Flag' })
        }

        res.cookie('user', 'admin', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'None',
            maxAge: 24 * 60 * 60 * 1000, // 1 day
        })
        res.header('Access-Control-Allow-Credentials', 'true')
        res.status(200).json({
            message: 'user logged in successfully',
            user,
        })
    } catch (error) {
        res.status(500).json({
            message: 'Error logging in admin user',
            error: error.message,
        })
    }
}
exports.loginAdminUser = async (req, res) => {
    try {
        const { email, password } = req.body
        if (!email || !password) {
            return res
                .status(400)
                .json({ message: 'Email and password are required' })
        }

        const user = await User.findOne({ email, role: 'superAdmin' })
        if (!user) {
            return res.status(404).json({ message: 'Admin user not found' })
        }

        const isPasswordValid = await bcrypt.compare(password, user.password)
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid password' })
        }
        res.cookie('user', 'admin', {
            httpOnly: true,
            secure: false,
            sameSite: 'None',
            maxAge: 24 * 60 * 60 * 1000, // 1 day
        })
        res.header('Access-Control-Allow-Credentials', 'true')
        res.status(200).json({
            message: 'Admin user logged in successfully',
            user,
        })
    } catch (error) {
        res.status(500).json({
            message: 'Error logging in admin user',
            error: error.message,
        })
    }
}

//

// OTP section here

exports.createOtp = async (req, res) => {
    try {
        const { otp, userId } = req.body
        if (!otp || !userId) {
            return res
                .status(400)
                .json({ message: 'OTP and user ID are required' })
        }

        const newOtp = await Otp.create({ otp, user: userId })
        res.status(201).json({
            message: 'OTP created successfully',
            otp: newOtp,
        })
    } catch (error) {
        res.status(500).json({
            message: 'Error creating OTP',
            error: error.message,
        })
    }
}

exports.verifyAdminOtp = async (req, res) => {
    try {
        const { otp, userId } = req.body
        if (!otp || !userId) {
            return res
                .status(400)
                .json({ message: 'OTP and user ID are required' })
        }

        const otpRecord = await Otp.findOne({ user: userId })
        if (!otpRecord) {
            return res.status(404).json({ message: 'Invalid OTP or user ID' })
        }
        if (otpRecord.otp !== otp) {
            return res.status(401).json({ message: 'Incorrect OTP' })
        }
        // Optionally, you can delete the OTP record after successful verification

        await Otp.deleteOne({ user: userId })

        // Logic to verify the OTP would go here

        res.status(200).json({
            message: 'OTP verified successfully',
            otp: otpRecord,
        })
    } catch (error) {
        res.status(500).json({
            message: 'Error verifying OTP',
            error: error.message,
        })
    }
}

exports.checkAdminUser = async (req, res) => {
    const { email } = req.body
    try {
        const user = await User.findOne({ email, role: 'superAdmin' })
        if (!user) {
            return res.status(404).json({ message: 'User not found' })
        }
        if (user.email !== email) {
            return res.status(403).json({ message: 'Unauthorized access' })
        }
        res.status(200).json({ message: 'Admin user found', id: user._id })
    } catch (error) {
        res.status(500).json({
            message: 'Error finding admin user',
            error: error.message,
        })
    }
}

exports.passwordReset = async (req, res) => {
    const { userId, newPassword } = req.body
    try {
        const user = await User.findOne({ userId, role: 'superAdmin' })
        if (!user) {
            return res.status(404).json({ message: 'User not found' })
        }

        const encryptedPassword = await bcrypt.hash(newPassword, 10)
        user.password = encryptedPassword
        await user.save()

        res.status(200).json({
            message: 'Password reset successfully',
            user: { email: user.email },
        })
    } catch (error) {
        res.status(500).json({
            message: 'Error resetting password',
            error: error.message,
        })
    }
}
