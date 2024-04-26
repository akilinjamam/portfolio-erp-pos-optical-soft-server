const { runValidator } = require('../../joi_validation');
const { registrationSchema } = require('../../joi_validation/loginAndRegistrationSchema');
const { createRegistrationController } = require('./registration.controller');

const registrationRouter = require('express').Router();


registrationRouter.post('/create-registration', runValidator(registrationSchema), createRegistrationController);


module.exports = registrationRouter;


