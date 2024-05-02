const { runValidator } = require('../../joi_validation');
const { loginSchema } = require('../../joi_validation/loginAndRegistrationSchema');
const { createLoginController, getLoginController } = require('./login.controller');
const passport = require('passport')

const loginRouter = require('express').Router();


loginRouter.post('/create-login', runValidator(loginSchema), createLoginController);
loginRouter.get('/', passport.authenticate('jwt', { session: false }), getLoginController)


module.exports = loginRouter;


