const express = require('express');
const { createEmployeeController, getEmployeeController, updateEmployeeController, deleteEmployeeController } = require('./employee.controller');
const { runValidator } = require('../../joi_validation');
const { bulkEmployeeValidationSchema } = require('../../joi_validation/employeeSchema');
const passport = require('passport');


const employeeRouter = express.Router();


employeeRouter.post('/create-employee', runValidator(bulkEmployeeValidationSchema), createEmployeeController);
employeeRouter.get('/', passport.authenticate('jwt', { session: false }), getEmployeeController)
employeeRouter.patch('/:id', updateEmployeeController);
employeeRouter.post('/bulk-delete', deleteEmployeeController);

module.exports = employeeRouter