const mongoose = require('mongoose')
const Schema = mongoose.Schema

const questionSchema = new Schema(
    {
        questionText: { type: String, required: true },
        questionImage: { type: String }, // URL or path to the image (optional)
        options: [{ type: Schema.Types.ObjectId, ref: 'Option' }],
        answerExplanation: { type: String }, // Explanation for the correct answer
        timeLimit: Number, // Time limit for each question if required
    },
    { timestamps: true },
)

const Question = mongoose.model('Question', questionSchema)
module.exports = Question
