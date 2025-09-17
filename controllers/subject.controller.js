const Subcategory = require('../models/subCategory.model')
const Subject = require('../models/subject.model')

exports.createSubject = async (req, res) => {
    try {
        const {
            title,
            price,
            image,
            class: level,
            subcategory,
            slug,
        } = req.body
        // console.log('I am in');
        console.log(req.body)

        const existedSubject = await Subject.findOne({
            title,
            subcategory,
        })

        if (existedSubject) {
            return res.status(400).json({
                success: false,
                message: 'Subcategory already exists',
            })
        }

        const subject = await Subject.create({
            title,
            slug,
            price,
            image,
            subcategory,
            class: level,
        })

        await Subcategory.findByIdAndUpdate(subcategory, {
            $push: { subjects: subject._id },
        })

        res.status(201).json({
            success: true,
            subject,
        })
    } catch (e) {
        res.status(400).json({
            success: false,
            message: e.message,
        })
    }
}

exports.getSubjects = async (req, res) => {
    try {
        const subjects = await Subject.find()
            .populate({
                path: 'chapters',
                select: 'title',
            })
            .populate({
                path: 'modelTests',
                select: 'title',
            })
        // .populate('subjects')
        if (!subjects || subjects.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'No subjects found',
            })
        }
        res.status(200).json({
            success: true,
            subjects,
        })
    } catch (e) {
        res.status(400).json({
            success: false,
            message: e.message,
        })
    }
}

exports.getSubject = async (req, res) => {
    try {
        const { id } = req.params
        // console.log('I am in',id);

        const subject = await Subject.findById(id)
            // .populate('subcategory')
            .populate('class')
            .populate('chapters')
            .populate('modelTests')
        // console.log(subject);

        if (!subject) {
            return res.status(404).json({
                success: false,
                message: 'subject not found',
            })
        }
        res.status(200).json({
            success: true,
            subject,
        })
    } catch (e) {
        res.status(400).json({
            success: false,
            message: e.message,
        })
    }
}

exports.getSubjectBySlug = async (req, res) => {
    try {
        const { id: slug } = req.params
        console.log(slug)

        const subject = await Subject.findOne({ slug })
            .populate('chapters')
            .populate('modelTests')
            .lean()
        if (!subject) {
            return res.status(404).json({
                success: false,
                message: 'subject not found',
            })
        }
        res.status(200).json({
            success: true,
            subject,
        })
    } catch (e) {
        res.status(400).json({
            success: false,
            message: e.message,
        })
    }
}

exports.updateSubject = async (req, res) => {
    try {
        const { id } = req.params
        const { updates } = req.body

        const subject = await Subject.findByIdAndUpdate(
            id,
            { $set: updates },
            { new: true },
        )
        if (!subject) {
            return res.status(404).json({
                success: false,
                message: 'subject not found',
            })
        }

        res.status(200).json({
            success: true,
            subject,
        })
    } catch (e) {
        res.status(400).json({
            success: false,
            message: e.message,
        })
    }
}

exports.deleteSubject = async (req, res) => {
    try {
        const { id } = req.params

        const subject = await Subject.findByIdAndDelete(id)
        if (!subject) {
            return res.status(404).json({
                success: false,
                message: 'subject not found',
            })
        }

        // Remove the subcategory reference from the main category
        await Subcategory.findByIdAndUpdate(subject.subcategory, {
            $pull: { subjects: id },
        })

        res.status(200).json({
            success: true,
            message: 'subject deleted successfully',
        })
    } catch (e) {
        res.status(400).json({
            success: false,
            message: e.message,
        })
    }
}

exports.addSubjectToSubCategory = async (req, res) => {
    try {
        const { id } = req.params
        const { subjectId } = req.body

        const subCategory = await Subcategory.findByIdAndUpdate(
            id,
            { $addToSet: { subjects: subjectId } },
            { new: true },
        ).populate('subjects')

        if (!subCategory) {
            return res.status(404).json({
                success: false,
                message: 'Subcategory not found',
            })
        }

        res.status(200).json({
            success: true,
            subCategory,
        })
    } catch (e) {
        res.status(400).json({
            success: false,
            message: e.message,
        })
    }
}

exports.removeSubjectFromSubCategory = async (req, res) => {
    try {
        const { id } = req.params
        const { subjectId } = req.body

        const subCategory = await Subcategory.findByIdAndUpdate(
            id,
            { $pull: { subjects: subjectId } },
            { new: true },
        ).populate('subjects')

        if (!subCategory) {
            return res.status(404).json({
                success: false,
                message: 'Subcategory not found',
            })
        }

        res.status(200).json({
            success: true,
            subCategory,
        })
    } catch (e) {
        res.status(400).json({
            success: false,
            message: e.message,
        })
    }
}
