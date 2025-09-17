const Book = require('../models/book.model')

exports.createBook = async (req, res) => {
    try {
        const book = req.body

        // Validate required fields
        const newBook = await Book.create(book)
        if (!newBook) {
            return res.status(400).json({
                success: false,
                message: 'Failed to create book',
            })
        }
        res.status(201).json({
            success: true,
            newBook,
        })
    } catch (e) {
        res.status(400).json({
            success: false,
            message: e.message,
        })
    }
}

exports.getAllBooks = async (req, res) => {
    try {
        const books = await Book.find()
        .populate('subcategory', 'title') // Populate subcategory with only title field
        .populate('class', 'title') // Populate class with only name field
        // .exec()
        if (!books) {
            return res.status(404).json({
                success: false,
                message: 'No books found',
            })
        }
        res.status(200).json({
            success: true,
            books,
        })
    } catch (e) {
        res.status(400).json({
            success: false,
            message: e.message,
        })
    }
}

exports.getBookById = async (req, res) => {
    try {
        const { id } = req.params
        const book = await Book.findById(id)
        // .populate('subcategory', 'title') // Populate subcategory with only title field
        // .populate('class', 'name') // Populate class with only name field
        // .exec()
        if (!book) {
            return res.status(404).json({
                success: false,
                message: 'Book not found',
            })
        }
        res.status(200).json({
            success: true,
            book,
        })
    } catch (e) {
        res.status(400).json({
            success: false,
            message: e.message,
        })
    }
}

// exports.updateBook = async (req, res) => {
//     try {
//         const { id } = req.params
//         let {
//             deletedImages = [],
//             images: newImages = [],
//             ...otherUpdates
//         } = req.body.updates

//         const updatedBook = await Book.findByIdAndUpdate(
//             id,
//             {
//                 $set: otherUpdates, // everything except images
//                 $pull: { images: { $in: deletedImages } }, // remove deleted images
//                 $push: { images: { $each: newImages } }, // add newly uploaded images
//             },
//             { new: true },
//         )

//         if (!updatedBook) {
//             return res.status(404).json({
//                 success: false,
//                 message: 'Book not found',
//             })
//         }
//         res.status(200).json({
//             success: true,
//             updatedBook,
//         })
//     } catch (e) {
//         res.status(400).json({
//             success: false,
//             message: e.message,
//         })
//     }
// }
// controllers/bookController.js
exports.updateBook = async (req, res) => {
  try {
    const { id } = req.params
    let { deletedImages = [], images: newImages = [], ...otherUpdates } = req.body.updates || {}

    // 1️⃣ Update non-array fields
    const updatedBook = await Book.findByIdAndUpdate(
      id,
      { $set: otherUpdates },
      { new: true }
    )

    if (!updatedBook) {
      return res.status(404).json({
        success: false,
        message: 'Book not found',
      })
    }

    // 2️⃣ Remove deleted images
    if (deletedImages.length > 0) {
      await Book.findByIdAndUpdate(
        id,
        { $pull: { images: { $in: deletedImages } } },
        { new: true }
      )
    }

    // 3️⃣ Add new uploaded images
    if (newImages.length > 0) {
      await Book.findByIdAndUpdate(
        id,
        { $push: { images: { $each: newImages } } },
        { new: true }
      )
    }

    // 4️⃣ Return latest book
    const finalBook = await Book.findById(id)
    res.status(200).json({
      success: true,
      updatedBook: finalBook,
    })
  } catch (e) {
    res.status(400).json({
      success: false,
      message: e.message,
    })
  }
}


exports.deleteBook = async (req, res) => {
    try {
        const { id } = req.params
        const deletedBook = await Book.findByIdAndDelete(id)
        if (!deletedBook) {
            return res.status(404).json({
                success: false,
                message: 'Book not found',
            })
        }   
        res.status(200).json({
            success: true,
            deletedBook,
        })
    } catch (e) {
        res.status(400).json({
            success: false,
            message: e.message,
        })  
    }
}


