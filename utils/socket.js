const { Server } = require('socket.io')

function initSocket(server) {
    const io = new Server(server, {
        cors: {
            origin: (origin, callback) => {
                if (!origin) return callback(null, true)
                return callback(null, true) // dynamic origin
            },
            credentials: true,
        },
    })

    io.on('connection', (socket) => {
        console.log('New client connected:', socket.id)

        socket.on('message', (data) => {
            console.log('Message received:', data)
            socket.emit('message', `Server received: ${data}`)
        })

        socket.on('disconnect', () => {
            console.log('Client disconnected:', socket.id)
        })
    })

    return io
}

module.exports = { initSocket }
