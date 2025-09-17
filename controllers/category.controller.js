const MainCategory = require('../models/category.model')
const { populate } = require('../models/subCategory.model')

// Function to create a new category

exports.createCategory = async (req, res) => {
    try {
        
        
        const { title } = req.body
        const existedCategory = await MainCategory.findOne({ title })
        if (existedCategory) {
            return res.status(400).json({
                success: false,
                message: 'Category already exists',
            })
        }
        const category = await MainCategory.create({ title })
        res.status(201).json({
            success: true,
            category,
        })
    } catch (e) {
        res.status(400).json({
            success: false,
            message: e.message,
        })
    }
}

// Function to get all categories

exports.getCategories = async (req, res) => {
    try {
        const categories = await MainCategory.find().populate({
            path:'subcategories',
            populate:{
                path:'subjects',
                populate:[{
                    path:'subcategory'
                },{
                    path:'class'
                }]
            }
        })
        res.status(200).json({
            success: true,
            categories,
        })
    } catch (e) {
        res.status(400).json({
            success: false,
            message: e.message,
        })
    }
}

// Function to get a single category

exports.getCategory = async (req, res) => {
    try {
        const { id } = req.params

        const category = await MainCategory.findById(id)
        if (!category) {
            return res.status(400).json({
                success: false,
                message: 'Category not found',
            })
        }

        res.status(200).json({
            success: true,
            category,
        })
    } catch (e) {
        res.status(400).json({
            success: false,
            message: e.message,
        })
    }
}

// Function to update a category

exports.updateCategory = async (req, res) => {
    try {
        const { id } = req.params
        const { title } = req.body
        const category = await MainCategory.findByIdAndUpdate(
            id,
            { title },
            { new: true },
        )
        if (!category) {
            return res.status(400).json({
                success: false,
                message: 'Category not found',
            })
        }
        res.status(200).json({
            success: true,
            category,
        })
    } catch (e) {
        res.status(400).json({
            success: false,
            message: e.message,
        })
    }
}

// Function to delete a category

exports.deleteCategory = async (req, res) => {
    try {
        const { id } = req.params
        const category = await MainCategory.findByIdAndDelete(id)
        if (!category) {
            return res.status(400).json({
                success: false,
                message: 'Category not found',
            })
        }

        res.status(200).json({
            success: true,
            category,
        })
    } catch (e) {
        res.status(400).json({
            success: false,
            message: e.message,
        })
    }
}

// Function to add a subcategory to a category

exports.addSubCategory = async (catId, subCatId) => {
    try {
        // Find the MainCategory and update it by pushing the new subcategory
        const updatedCategory = await MainCategory.findOneAndUpdate(
            { _id: catId }, // Filter
            { $push: { subcategories: subCatId } }, // Update operation
            { new: true, useFindAndModify: false }, // Options: return the updated document
        )

        if (!updatedCategory) {
            throw new Error('MainCategory not found')
        }

        return updatedCategory
    } catch (error) {
        console.error('Error updating MainCategory:', error.message)
    }
}

// Function to remove a subcategory from a category

exports.removeSubCategory = async (catId, subCatId) => {
    try {
        // Find the MainCategory and update it by pushing the new subcategory

        const updatedCategory = await MainCategory.findOneAndUpdate(
            { _id: catId }, // Filter
            { $pull: { subcategories: subCatId } }, // Update operation
            { new: true, useFindAndModify: false }, // Options: return the updated document
        )

        if (!updatedCategory) {
            throw new Error('MainCategory not found')
        }

        return updatedCategory
    } catch (error) {
        console.error('Error updating MainCategory:', error.message)
    }
}
