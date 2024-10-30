const express = require('express');
const { createEmployeeController, getEmployeeController } = require('./employee.controller');
const { runValidator } = require('../../joi_validation');
const { bulkEmployeeValidationSchema } = require('../../joi_validation/employeeSchema');
const passport = require('passport');


const employeeRouter = express.Router();


employeeRouter.post('/create-employee', runValidator(bulkEmployeeValidationSchema), createEmployeeController);
employeeRouter.get('/', passport.authenticate('jwt', { session: false }), getEmployeeController)


module.exports = employeeRouter