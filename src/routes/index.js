const loginRouter = require("../modules/login/login.router");
const productRouter = require("../modules/products/products.route");
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
    {
        path: 'products',
        route: productRouter,
    },
]

module.exports = allRoutes