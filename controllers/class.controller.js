const Class = require('../models/class.model')

exports.createClass = async (req, res) => {
    try {
        const { title } = req.body
        const existedClass = await Class.findOne({ title })
        if (existedClass) {
            return res.status(400).json({
                success: false,
                message: 'Class already exists',
            })
        }
        const classData = await Class.create({ title })
        res.status(201).json({
            success: true,
            class: classData,
        })
    } catch (e) {
        res.status(400).json({
            success: false,
            message: e.message,
        })
    }
}

exports.getClasses = async (req, res) => {
    try {
        const classes = await Class.find()
            // .populate('Subject')
            // .populate('Subcategory')
        if (!classes || classes.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'No classes found',
            })
        }
        res.status(200).json({
            success: true,
            classes,
        })
    } catch (e) {
        res.status(400).json({
            success: false,
            message: e.message,
        })
    }
}

exports.getClass = async (req, res) => {
    try {
        const { id } = req.params

        const classData = await Class.findById(id)
            .populate('subject')
            .populate('Subcategory')
        if (!classData) {
            return res.status(404).json({
                success: false,
                message: 'Class not found',
            })
        }
        res.status(200).json({
            success: true,
            class: classData,
        })
    } catch (e) {
        res.status(400).json({
            success: false,
            message: e.message,
        })
    }
}

exports.updateClass = async (req, res) => {
    try {
        const { id } = req.params
        const { updates } = req.body

        const classData = await Class.findByIdAndUpdate(
            id,
            { $set: updates },
            { new: true },
        )
        if (!classData) {
            return res.status(404).json({
                success: false,
                message: 'Class not found',
            })
        }
        res.status(200).json({
            success: true,
            class: classData,
        })
    } catch (e) {
        res.status(400).json({
            success: false,
            message: e.message,
        })
    }
}

exports.deleteClass = async (req, res) => {
    try {
        const { id } = req.params

        const classData = await Class.findByIdAndDelete(id)
        if (!classData) {
            return res.status(404).json({
                success: false,
                message: 'Class not found',
            })
        }
        res.status(200).json({
            success: true,
            message: 'Class deleted successfully',
        })
    } catch (e) {
        res.status(400).json({
            success: false,
            message: e.message,
        })
    }
}

exports.addSubjectToClass = async (req, res) => {
    try {
        const { classId, subjectId } = req.body

        const classData = await Class.findByIdAndUpdate(
            classId,
            { $addToSet: { subject: subjectId } },
            { new: true },
        ).populate('subject')

        if (!classData) {
            return res.status(404).json({
                success: false,
                message: 'Class not found',
            })
        }
        res.status(200).json({
            success: true,
            class: classData,
        })
    } catch (e) {
        res.status(400).json({
            success: false,
            message: e.message,
        })
    }
}

exports.removeSubjectFromClass = async (req, res) => {
    try {
        const { classId, subjectId } = req.body

        const classData = await Class.findByIdAndUpdate(
            classId,
            { $pull: { subject: subjectId } },
            { new: true },
        ).populate('subject')

        if (!classData) {
            return res.status(404).json({
                success: false,
                message: 'Class not found',
            })
        }
        res.status(200).json({
            success: true,
            class: classData,
        })
    } catch (e) {
        res.status(400).json({
            success: false,
            message: e.message,
        })
    }
}

exports.addSubcategoryToClass = async (req, res) => {
    try {
        const { classId, subcategoryId } = req.body

        const classData = await Class.findByIdAndUpdate(
            classId,
            { $addToSet: { Subcategory: subcategoryId } },
            { new: true },
        ).populate('Subcategory')

        if (!classData) {
            return res.status(404).json({
                success: false,
                message: 'Class not found',
            })
        }
        res.status(200).json({
            success: true,
            class: classData,
        })
    } catch (e) {
        res.status(400).json({
            success: false,
            message: e.message,
        })
    }
}

exports.removeSubcategoryFromClass = async (req, res) => {
    try {
        const { classId, subcategoryId } = req.body

        const classData = await Class.findByIdAndUpdate(
            classId,
            { $pull: { Subcategory: subcategoryId } },
            { new: true },
        ).populate('Subcategory')

        if (!classData) {
            return res.status(404).json({
                success: false,
                message: 'Class not found',
            })
        }
        res.status(200).json({
            success: true,
            class: classData,
        })
    } catch (e) {
        res.status(400).json({
            success: false,
            message: e.message,
        })
    }
}

// exports.getClassesBySubcategory = async (req, res) => {
//     try {
//         const { subcategoryId } = req.params

//         const classes = await Class.find({ Subcategory: subcategoryId })
//             .populate('subject')
//             .populate('Subcategory')
//         if (!classes || classes.length === 0) {
//             return res.status(404).json({
//                 success: false,
//                 message: 'No classes found for this subcategory',
//             })
//         }
//         res.status(200).json({
//             success: true,
//             classes,
//         })
//     } catch (e) {
//         res.status(400).json({
//             success: false,
//             message: e.message,
//         })
//     }
// }

