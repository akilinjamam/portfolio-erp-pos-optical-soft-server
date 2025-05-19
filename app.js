const express = require('express');
const app = express();

const cors = require('cors');
app.options('*', cors());
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
        origin: [`${process.env.CLIENT_URL_LINK}`, 'http://localhost:5173'],
        methods: 'GET,POST,PUT,DELETE,PATCH',
        credentials: true,
    }),
);



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


module.exports = app;