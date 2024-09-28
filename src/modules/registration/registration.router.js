const { runValidator } = require('../../joi_validation');
const { registrationSchema } = require('../../joi_validation/loginAndRegistrationSchema');
const { createRegistrationController, updateUserRegistrationController, removeUserRegistrationController } = require('./registration.controller');

const registrationRouter = require('express').Router();

registrationRouter.post('/create-registration', runValidator(registrationSchema), createRegistrationController);

registrationRouter.patch('/update-user/:id', updateUserRegistrationController);
registrationRouter.delete('/remove-user/:id', removeUserRegistrationController);

module.exports = registrationRouter;