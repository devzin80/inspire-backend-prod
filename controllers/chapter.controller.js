const Chapter = require('../models/chapter.model')
const Subject = require('../models/subject.model')

exports.createChapter = async (req, res) => {
    const { title, slug, subject, price } = req.body

    try {
        const chapter = await Chapter.create({
            title,
            slug,
            subject,
            price,
        })

        console.log(chapter);
        

        if (!chapter)
            return res
                .status(500)
                .json({ success: false, message: 'Something went wrong' })

        await Subject.findByIdAndUpdate(chapter.subject, {
            $push: { chapters: chapter._id },
        })

        res.status(201).json({
            success: true,
            chapter,
        })
    } catch (e) {
        res.status(400).json({
            success: false,
            message: e.message,
        })
    }
}

exports.getAllChapters = async (req, res) => {
    try {
        const chapters = await Chapter.find()
            .populate({
                path: 'subject',
                select: 'title',
            })
            .lean()

        res.status(200).json({
            success: true,
            chapters,
        })
    } catch (e) {
        res.status(400).json({
            success: false,
            message: e.message,
        })
    }
}

exports.getChapterByID = async (req, res) => {
    try {
        const { id } = req.params
        const chapter = await Chapter.findById(id)
            .populate({
                path: 'subject',
                select: 'title',
        }).populate({
            path: 'topics',
            populate: [{
                path: 'videos'
            }]
        })
            .lean()

        if (!chapter)
            return res.status(404).json({
                success: false,
                message: 'No chapter found',
            })

        res.status(200).json({
            success: true,
            chapter,
        })
    } catch (e) {
        res.status(400).json({
            success: false,
            message: e.message,
        })
    }
}

exports.getChaptersBySubject = async (req, res) => {
    try {
        const { subject } = req.params
        const chapters = await Chapter.find({ subject })
        res.status(200).json({
            success: true,
            chapters,
        })
    } catch (e) {
        res.status(400).json({
            success: false,
            message: e.message,
        })
    }
}


exports.getChapterBySlug = async (req, res) => {
    try {
        const { id:slug } = req.params
        const chapter = await Chapter.findOne({ slug })
            .populate({
                path: 'subject',
                select: 'title',
            })
            .populate({
                path: 'topics',
                populate: [{
                    path: 'videos'
                }]
            })
            // .populate({
            //     path: 'modelTests',
            // })
        res.status(200).json({
            success: true,
            chapter,
        })
    } catch (e) {
        res.status(400).json({
            success: false,
            message: e.message,
        })
    }
}

exports.deleteChapter = async (req, res) => {
    console.log('I am triggered from ', req.params);
    
    try {
        const { id } = req.params
        console.log('id', id)

        const deletedChapter = await Chapter.findByIdAndDelete(id)
        console.log(deletedChapter, 'deletedChapter')

        if (!deletedChapter)
            return res.status(500).json({
                success: false,
                message: 'Failed to delete Chapter',
            })

        await Subject.findByIdAndUpdate(
            deletedChapter.subject,

            {
                $pull: { chapters: id },
            },
        )

        res.status(200).json({
            success: true,
            message: 'Successfully deleted Chapter',
        })
    } catch (e) {
        res.status(400).json({
            success: false,
            message: e.message,
        })
    }
}

exports.updateChapter = async (req, res) => {
    try {
        const { id } = req.params
        const { updates } = req.body

        const chapter = await Chapter.findByIdAndUpdate(
            id,
            { $set: updates },
            { new: true },
        )
        if (!chapter) {
            return res.status(404).json({
                success: false,
                message: 'chapter not found',
            })
        }

        res.status(200).json({
            success: true,
            chapter,
        })
    } catch (e) {
        res.status(400).json({
            success: false,
            message: e.message,
        })
    }
}
