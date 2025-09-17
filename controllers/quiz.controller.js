const Chapter = require('../models/chapter.model')
const Option = require('../models/option.model')
const Question = require('../models/question.model')
const Quiz = require('../models/quiz.model') // Assuming your Quiz model is in the 'models' folder
const Subject = require('../models/subject.model')
const Topic = require('../models/topic.model')
const { addModelTest } = require('./chapter.controller')
const { addQuiz } = require('./topic.controller')

// Function to create a new quiz
exports.createQuiz = async (req, res) => {
    try {
        const {
            title,
            quizType,
            slug,
            preview,
            description,
            questions,
            shuffleQuestions,
            shuffleOptions,
            totalTimeLimit,
            topic,
            chapter,
            subject,
        } = req.body

        // Create options, then create questions with those options, then create the quiz
        const createdQuestions = await Promise.all(
            questions.map(async (q) => {
                const createdOptions = await Promise.all(
                    q.options.map(async (opt) => {
                        const newOption = new Option({
                            text: opt.text,
                            optionImage: opt?.optionImage,
                            isCorrect: opt.isCorrect,
                        })
                        return await newOption.save()
                    }),
                )

                const newQuestion = new Question({
                    questionText: q?.questionText,
                    questionImage: q?.questionImage,
                    options: createdOptions.map((opt) => opt._id),
                    answerExplanation: q?.answerExplanation,
                    timeLimit: q.timeLimit,
                })
                return await newQuestion.save()
            }),
        )

        const newQuiz = new Quiz({
            title,
            quizType,
            slug,
            preview,
            description,
            totalQuestions: questions.length,
            questions: createdQuestions.map((q) => q._id),
            shuffleQuestions: shuffleQuestions || false,
            shuffleOptions: shuffleOptions || false,
            totalTimeLimit: totalTimeLimit || null,
        })

        const savedQuiz = await newQuiz.save()

        // Add the quiz to the corresponding topic or chapter
        if (savedQuiz.quizType === 'quiz') {
             console.log('triggered topic')
            await Topic.findByIdAndUpdate(
                topic,
                { $push: { quizzes: savedQuiz._id } },
                { new: true },
            )
        } else if (savedQuiz.quizType == 'modelTest' && chapter ){
             console.log('triggered chapter')
            await Chapter.findByIdAndUpdate(
                chapter,
                { $push: { modelTests: savedQuiz._id } },
                { new: true },
            )
        }
            
         else{
            console.log('triggered subject');
            
             await Subject.findByIdAndUpdate(
                 subject,
                 { $push: { modelTests: savedQuiz._id } },
                 { new: true },
             )
        }

        res.status(201).json({
            success: true,
            savedQuiz,
        })
    } catch (error) {
        // console.error('Error creating quiz:', error)
        res.status(500).json({ message: error.message })
    }
}

// Function to get all quizzes
exports.getAllQuizzes = async (req, res) => {
    try {
        // Fetch all quizzes from the database
        const quizzes = await Quiz.find().populate('questions')
        // Send the quizzes as the response
        if (!quizzes) {
            return res.status(404).json({
                success: false,
                message: 'No quizzes found',
            })
        }
        res.status(200).json({
            success: true,
            quizzes,
        })
    } catch (e) {
        res.status(400).json({
            success: false,
            message: e.message,
        })
    }
}

exports.getQuiz = async (req, res) => {
    try {
        const { id } = req.body
        const quiz = await Quiz.findById(id)
        if (!quiz) {
            return res.status(400).json({
                success: false,
                message: 'quiz not found',
            })
        }
        res.status(200).json({
            success: true,
            quiz,
        })
    } catch (e) {
        res.status(400).json({
            success: false,
            message: e.message,
        })
    }
}
exports.getQuizBySlug = async (req, res) => {
    try {
        const { id:slug } = req.params
        const quiz = await Quiz.findOne({slug})
        if (!quiz) {
            return res.status(400).json({
                success: false,
                message: 'quiz not found',
            })
        }
        res.status(200).json({
            success: true,
            quiz,
        })
    } catch (e) {
        res.status(400).json({
            success: false,
            message: e.message,
        })
    }
}

exports.updateQuiz = async (req, res) => {
    try {
        const {
            id,
            title,
            quizType,
            slug,
            preview,
            description,
            shuffleQuestions,
            shuffleOptions,
            totalTimeLimit,
            questions,
        } = req.body

        // Build an object for updating the quiz fields
        const updatedQuizData = {}
        if (title) updatedQuizData.title = title
        if (quizType) updatedQuizData.quizType = quizType
        if (preview !== undefined) updatedQuizData.preview = preview
        if (description) updatedQuizData.description = description
        if (slug) updatedQuizData.slug = description
        if (shuffleQuestions !== undefined)
            updatedQuizData.shuffleQuestions = shuffleQuestions
        if (shuffleOptions !== undefined)
            updatedQuizData.shuffleOptions = shuffleOptions
        if (totalTimeLimit !== undefined)
            updatedQuizData.totalTimeLimit = totalTimeLimit

        // Update the quiz itself with the new data
        const updatedQuiz = await Quiz.findByIdAndUpdate(
            id,
            { $set: updatedQuizData },
            { new: true },
        )

        // If there are questions to update, process them
        if (questions && questions.length > 0) {
            await Promise.all(
                questions.map(async (q) => {
                    // Find the question by its ID
                    const question = await Question.findById(q._id)

                    // Update the question fields if provided
                    if (q.questionText) question.questionText = q.questionText
                    if (q.questionImage)
                        question.questionImage = q.questionImage // Update question image if provided
                    if (q.timeLimit !== undefined)
                        question.timeLimit = q.timeLimit // Update time limit

                    // If there are options for the question, update them as well
                    if (q.options && q.options.length > 0) {
                        await Promise.all(
                            q.options.map(async (opt) => {
                                // Find the option by its ID
                                const option = await Option.findById(opt._id)

                                // Update the option fields
                                if (opt.text) option.text = opt.text
                                if (opt.optionImage)
                                    option.optionImage = opt.optionImage // Update option image if provided
                                if (opt.isCorrect !== undefined)
                                    option.isCorrect = opt.isCorrect // Update correct status

                                // Save the updated option
                                await option.save()
                            }),
                        )
                    }

                    // Save the updated question
                    await question.save()
                }),
            )
        }

        res.status(200).json({
            success: true,
            updatedQuiz,
        })
    } catch (error) {
        console.error('Error updating quiz:', error)
        res.status(500).json({ message: 'Internal server error' })
    }
}
