const express = require('express')
const cors = require('cors')
const http = require('http')
require('dotenv').config()
const { connectDB } = require('./utils/db')
const { initSocket } = require('./utils/socket')

const app = express()
const port = process.env.PORT || 6535

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const express = require('express')
const cors = require('cors')



// Regex to allow localhost and LAN IPs
const corsOptions = {
    origin: true,
    credentials: true,
}

app.use(cors(corsOptions))

// app.use(cors(
// ))

// connect to the database
connectDB()

// Connect routes
app.use('/api/v1/users', require('./routes/user.route'))
app.use('/api/v1/category', require('./routes/category.route'))
app.use('/api/v1/class', require('./routes/class.route'))
app.use('/api/v1/subcategory', require('./routes/subCategory.route'))
app.use('/api/v1/subject', require('./routes/subject.route'))
app.use('/api/v1/book', require('./routes/book.route'))
app.use('/api/v1/chapter', require('./routes/chapter.route'))
app.use('/api/v1/topic', require('./routes/topic.route'))
app.use('/api/v1/video', require('./routes/video.route'))
app.use('/api/v1/note', require('./routes/note.route'))
app.use('/api/v1/coupon', require('./routes/coupon.route'))
app.use('/api/v1/logo', require('./routes/logo.route'))
app.use('/api/v1/footer', require('./routes/footer.route'))
app.use('/api/v1/media', require('./routes/media.route'))
app.use('/api/v1/about', require('./routes/about.route'))
app.use('/api/v1/banner', require('./routes/banner.route'))
app.use('/api/v1/quiz', require('./routes/quiz.route'))
app.use('/api/v1/promotional-banner', require('./routes/promotional.banner.route'))
app.use('/api/v1/notification', require('./routes/notification.route'))



// working with socket io

const server = http.createServer(app)
const io = initSocket(server)

app.use((req, res, next) => {
    req.io = io
    next()
})


app.get('/', (req, res) => {
    res.send('Inspire-Online.com - Your Online Inspiration Hub')
})

server.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`)
})
