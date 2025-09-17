const MainCategory = require('../models/category.model')
const Subcategory = require('../models/subCategory.model')

exports.createSubCategory = async (req, res) => {
    try {
        const { title, category, classes } = req.body
        const existedSubCategory = await Subcategory.findOne({
            title,
            category
            
        })
        if (existedSubCategory) {
            return res.status(400).json({
                success: false,
                message: 'Subcategory already exists',
            })
        }
        const subCategory = await Subcategory.create({
            title,
            category,
            classes,
        })
        // Update the main category to include this subcategory

        await MainCategory.findByIdAndUpdate(category, {
            $push: { subcategories: subCategory._id },
        })
        res.status(201).json({
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

exports.getSubCategories = async (req, res) => {
    try {
        const subCategories = await Subcategory.find()
            .populate({
                path: 'category',
                select: 'title',
            })
            .populate({
                path: 'classes',
                select: 'title',
            })
            .populate('subjects')
        if (!subCategories || subCategories.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'No subcategories found',
            })
        }
        res.status(200).json({
            success: true,
            subCategories,
        })
    } catch (e) {
        res.status(400).json({
            success: false,
            message: e.message,
        })
    }
}

exports.getSubCategory = async (req, res) => {
    try {
        const { id } = req.params

        const subCategory = await Subcategory.findById(id)
            .populate('category')
            .populate('classes')
            .populate('subjects')
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

exports.updateSubCategory = async (req, res) => {
    try {
        const { id } = req.params
        const { updates } = req.body

        const subCategory = await Subcategory.findByIdAndUpdate(
            id,
            { $set: updates },
            { new: true },
        )
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

exports.deleteSubCategory = async (req, res) => {
    try {
        const { id } = req.params

        const subCategory = await Subcategory.findByIdAndDelete(id)
        if (!subCategory) {
            return res.status(404).json({
                success: false,
                message: 'Subcategory not found',
            })
        }

        // Remove the subcategory reference from the main category
        await MainCategory.findByIdAndUpdate(subCategory.category, {
            $pull: { subcategories: id },
        })

        res.status(200).json({
            success: true,
            message: 'Subcategory deleted successfully',
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

