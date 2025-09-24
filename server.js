// server.js
const express = require('express')
const http = require('http')
const cors = require('cors')
require('dotenv').config()
const { connectDB } = require('./utils/db')
const { initSocket } = require('./utils/socket')
// const cookieParser = require('cookie-parser');

const app = express()
const port = process.env.PORT || 6535

// Middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
// app.use(cookieParser()); // uncomment if using cookies

// ✅ Dynamic CORS + preflight middleware
// const allowedOrigins = [
//     'http://localhost:3000',
//     'http://127.0.0.1:3000',
//     'https://inspire-online.com', // user panel in prod
//     'https://www.inspire-online.com', // user panel in prod
//     'https://services.inspire-online.com',
// ]

// // also allow dynamic LAN IPs (192.x.x.x or 10.x.x.x)
// function isAllowed(origin) {
//     if (!origin) return true // allow requests with no Origin (Postman, direct browser hits)
//     if (allowedOrigins.includes(origin)) return true
//     if (/^http:\/\/192\.168\.\d+\.\d+(:\d+)?$/.test(origin)) return true
//     if (/^http:\/\/10\.\d+\.\d+\.\d+(:\d+)?$/.test(origin)) return true
//     return false
// }

// // Apply CORS
// app.use(
//     cors({
//         origin: (origin, cb) => {
//             if (isAllowed(origin)) {
//                 cb(null, true)
//             } else {
//                 cb(new Error('CORS not allowed'))
//             }
//         },
//         credentials: true, // allow cookies
//         optionsSuccessStatus: 204, // handle preflight OPTIONS requests
//     }),
// )

// app.set('trust proxy', 1)

app.use(cors())


// Routes
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
app.use(
    '/api/v1/promotional-banner',
    require('./routes/promotional.banner.route'),
)
app.use('/api/v1/notification', require('./routes/notification.route'))

// Default route
app.get('/', (req, res) => {
    res.send('Inspire-Online.com - Your Online Inspiration Hub')
})
;(async () => {
    try {
        await connectDB()
        console.log('Database connected successfully.')

        // Create HTTP server for Socket.IO
        const server = http.createServer(app)

        // Initialize Socket.IO with dynamic CORS
        const io = initSocket(server)

        // Make io accessible in routes if needed
        app.use((req, res, next) => {
            req.io = io
            next()
        })

        // Listen on all interfaces for Nginx proxy
        server.listen(port, '0.0.0.0', () => {
            console.log(`Server is running at http://0.0.0.0:${port}`)
        })
    } catch (err) {
        console.error('Failed to start server:', err)
        process.exit(1)
    }
})()
