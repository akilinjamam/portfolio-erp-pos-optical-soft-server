const accountsRouter = require("../modules/accounts/accounts.route");
const employeeRouter = require("../modules/employee/employee.route");
const finalAccountsRouter = require("../modules/finalAccounts/finalAccounts.route");
const glassTypeRouter = require("../modules/glass/glass.route");
const loginRouter = require("../modules/login/login.router");
const payrollRouter = require("../modules/payroll/payroll.route");
const productRouter = require("../modules/products/products.route");
const registrationRouter = require("../modules/registration/registration.router");
const salesRouter = require("../modules/sales/sales.router");
const supplierRouter = require("../modules/supplier/supplier.route");
const vendorRouter = require("../modules/vendor/vendor.route");

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
    {
        path: 'suppliers',
        route: supplierRouter,
    },
    {
        path: 'payroll',
        route: payrollRouter,
    },
    {
        path: 'vendors',
        route: vendorRouter,
    },
    {
        path: 'accounts',
        route: accountsRouter,
    },
    {
        path: 'finalAccounts',
        route: finalAccountsRouter,
    },
    {
        path: 'glass',
        route: glassTypeRouter,
    },
]

module.exports = allRoutes