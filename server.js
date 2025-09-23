const express = require('express')
const http = require('http')
const cors = require('cors')
require('dotenv').config()
const { connectDB } = require('./utils/db')
const { initSocket } = require('./utils/socket')

const app = express()
const port = process.env.PORT || 6535

// Middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const allowedOrigins = [
    'https://inspire-online.com',
    'https://www.inspire-online.com',
    'https://services.inspire-online.com',
]

function isAllowed(origin) {
    if (!origin) return true
    try {
        const url = new URL(origin)
        if (url.hostname === 'localhost' || url.hostname.startsWith('127.'))
            return true
        if (/^192\.168\.\d+\.\d+$/.test(url.hostname)) return true
        if (/^10\.\d+\.\d+\.\d+$/.test(url.hostname)) return true
        if (allowedOrigins.includes(origin)) return true
        return false
    } catch {
        return false
    }
}

// Apply CORS
app.use(
    cors({
        origin: (origin, callback) => {
            if (isAllowed(origin)) {
                callback(null, true)
            } else {
                callback(new Error('Not allowed by CORS'))
            }
        },
        credentials: true,
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization'],
        optionsSuccessStatus: 204,
    }),
)

// Ensure OPTIONS requests are handled
app.options('*', cors())

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

// Catch-all route (Express v5 safe)
app.all('/*', (req, res) => {
    res.status(404).send('Not Found')
})
;(async () => {
    try {
        await connectDB()
        console.log('✅ Database connected successfully.')

        const server = http.createServer(app)
        const io = initSocket(server)

        app.use((req, res, next) => {
            req.io = io
            next()
        })

        server.listen(port, '0.0.0.0', () => {
            console.log(`🚀 Server running at http://0.0.0.0:${port}`)
        })
    } catch (err) {
        console.error('❌ Failed to start server:', err)
        process.exit(1)
    }
})()
