const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const { Server } = require('socket.io');
const http = require('http');
const cors = require('cors');
const allRoutes = require('./src/routes');
const passport = require('passport');
// const globalErrorHandler = require('./src/errors/globalErrorHandler');
const cookieParser = require('cookie-parser');


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

// Initialaizing Passport:
app.use(passport.initialize());

app.use(
    cors({
        origin: [`${process.env.CLIENT_URL_LINK}`],
        methods: 'GET,POST,PUT,DELETE,PATCH',
        credentials: true,
    }),
);


const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: ['https://opticalsoft-client.vercel.app', 'http://localhost:5173'],
        methods: ['GET', 'POST'],
        credentials: true
    }
});



// all routes:
allRoutes.map(route => {
    return app.use(`/api/v1/${route.path}`, route.route)
})

app.get('/', (req, res) => {
    res.status(200).json({
        status: 200,
        message: 'welcome to our server!'
    })
})

// Socket.IO logic
let onlineUsers = new Map();

io.on('connection', (socket) => {
    console.log('user connected', socket.id);

    socket.on('userOnline', (userId) => {
        onlineUsers.set(userId, socket.id);
        io.emit('updateOnlineUsers', Array.from(onlineUsers.keys()));
    });

    socket.on('disconnect', () => {
        for (let [userId, sId] of onlineUsers.entries()) {
            if (sId === socket.id) {
                onlineUsers.delete(userId);
                break;
            }
        }
        io.emit('updateOnlineUsers', Array.from(onlineUsers.keys()));
    });
});

// global error handle

// app.use(globalErrorHandler)

// wrong route access
app.use((req, res, next) => {
    res.status(404).json({
        status: 404,
        message: 'route not found'
    })
})

// server error
app.use((err, req, res, next) => {
    res.status(500).json({
        status: 500,
        message: 'server error'
    })
})

server.listen(5001, () => {
    console.log('Server is running on port 5001');
});


module.exports = app;