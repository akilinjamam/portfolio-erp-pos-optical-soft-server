const loginRouter = require("../modules/login/login.router");
const registrationRouter = require("../modules/registration/registration.router");

const allRoutes = [
    {
        path: 'registration',
        route: registrationRouter,
    },
    {
        path: 'login',
        route: loginRouter,
    },
]

module.exports = allRoutes