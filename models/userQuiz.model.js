const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userQuizSchema = new Schema(
    {
        userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        quizId: { type: Schema.Types.ObjectId, ref: 'Quiz', required: true },
        answers: [
            {
                questionId: { type: Schema.Types.ObjectId, ref: 'Question' },
                selectedOptionId: {
                    type: Schema.Types.ObjectId,
                    ref: 'Option',
                }, // Store the ObjectId of the selected option
                timeTaken: Number, // Time taken by the user to answer the question
            },
        ],
        score: Number,
        completedAt: Date,
    },
    { timestamps: true },
)

const UserQuiz = mongoose.model('UserQuiz', userQuizSchema)
module.exports = UserQuiz
