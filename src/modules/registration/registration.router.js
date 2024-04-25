const { createRegistrationController } = require('./registration.controller');

const registrationRouter = require('express').Router();


registrationRouter.post('/create-registration', createRegistrationController);


module.exports = registrationRouter;


