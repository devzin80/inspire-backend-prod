const { Server } = require('socket.io')

let io

function initSocket(server) {
    io = new Server(server, {
        cors: {
            origin: ['http://localhost:3000', 'http://localhost:3001'], // your User + Admin panels
            methods: ['GET', 'POST', 'PATCH'],
        },
    })

    io.on('connection', (socket) => {
        console.log('✅ Socket connected:', socket.id)

        // User joins class room
        socket.on('joinClass', (classId) => {
            socket.join(classId)
            console.log(`📚 User ${socket.id} joined class ${classId}`)
        })

        socket.on('disconnect', () => {
            console.log('❌ Socket disconnected:', socket.id)
        })
    })

    return io
}

function getIo() {
    if (!io) {
        throw new Error('❌ Socket.io not initialized!')
    }
    return io
}

module.exports = { initSocket, getIo }
