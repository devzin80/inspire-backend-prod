const mongoose = require('mongoose')
const Schema = mongoose.Schema

const quizSchema = new Schema(
    {
        title: { type: String, required: true },
        slug: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
        quizType: { type: String, enum: ['quiz', 'modelTest'], required: true }, // 'quiz' or 'exam'
        preview: { type: Boolean, default: false },
        description: String,
        questions: [{ type: Schema.Types.ObjectId, ref: 'Question' }], // Reference to questions
        totalQuestions: { type: Number, required: true },
        shuffleQuestions: { type: Boolean, default: false },
        shuffleOptions: { type: Boolean, default: false },
        totalTimeLimit: Number, // Time limit for the whole quiz
    },
    { timestamps: true },
)

const Quiz = mongoose.model('Quiz', quizSchema)
module.exports = Quiz
