const Notification = require('../models/notification.model')
const { getIo } = require('../utils/socket')

exports.createNotification = async (req, res) => {
    try {
        const {  message, classId, user } = req.body

        const notification = await Notification.create({
           
            message,
            class: classId,
            createdBy: user, // assuming auth middleware
        })

        // Emit to class room
        const io = getIo()
        io.to(classId.toString()).emit('notification:new', notification)
        // io.to(classId).emit('notification:new', savedNotification)


        res.status(201).json({ success: true, notification })
    } catch (err) {
        res.status(500).json({ success: false, error: err.message })
    }
}

// ✅ Get notifications by class
exports.getNotificationsByClass = async (req, res) => {
    try {
        const { classId } = req.query
        console.log(classId);
        
        const notifications = await Notification.find({ class: classId })
            .sort({ createdAt: -1 })
            // .populate('createdBy', 'name email')
            .populate('class', 'title')

        console.log(notifications);
        
        res.status(200).json(notifications)
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

exports.getAllNotification = async (req, res) => {
    try {
        const { page, limit } = req.query
        const skip = (page - 1) * limit
        const notifications = await Notification.find()
            .sort({ createdAt: -1 })
            .populate('class', 'title')
            .skip(skip)
            .limit(limit)
        if (!notifications) {
            return res.status(404).json({ error: 'Notification not found' })
        }
        const totalPages = Math.ceil(notifications.length / limit)
        res.status(200).json({
            notifications,
            total: notifications.length,
            totalPages,
        })
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

// ✅ Mark single as read
exports.markAsRead = async (req, res) => {
    try {
        const { user, id } = req.body
        const notification = await Notification.findByIdAndUpdate(
            id,
            { $addToSet: { readBy: user } },
            { new: true },
        )
        if (!notification) {
            return res.status(404).json({ error: 'Notification not found' })
        }
        res.status(200).json(notification)
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

// ✅ Mark all as read
exports.markAllAsRead = async (req, res) => {
    try {
        const { user, classId } = req.body
        await Notification.updateMany(
            { class: classId },
            { $addToSet: { readBy: user } },
        )
        if (!notification) {
            return res.status(404).json({ error: 'Notification not found' })
        }
        res.status(200).json({ success: true })
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}


exports.updateNotification = async (req, res) => {
    try {
        const { id } = req.params
        const {  message , classId } = req.body
        const notification = await Notification.findByIdAndUpdate(
            id,
            { message, class: classId },
            { new: true },
        )
        if (!notification) {
            return res.status(404).json({ error: 'Notification not found' })
        }
        res.status(200).json(notification)
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}


exports.deleteNotification = async (req, res) => {
    try {
        const { id } = req.params
        const notification = await Notification.findByIdAndDelete(id)
        if (!notification) {
            return res.status(404).json({ error: 'Notification not found' })
        }
        res.status(200).json(notification)
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}
