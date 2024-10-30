const employeeRouter = require("../modules/employee/employee.route");
const loginRouter = require("../modules/login/login.router");
const productRouter = require("../modules/products/products.route");
const registrationRouter = require("../modules/registration/registration.router");
const salesRouter = require("../modules/sales/sales.router");

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
    {
        path: 'sales',
        route: salesRouter,
    },
    {
        path: 'employees',
        route: employeeRouter,
    },
]

module.exports = allRoutes