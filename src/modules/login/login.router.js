const { runValidator } = require('../../joi_validation');
const { loginSchema } = require('../../joi_validation/loginAndRegistrationSchema');
const { createLoginController, getLoginController, getUserByIdController } = require('./login.controller');
const passport = require('passport')

const loginRouter = require('express').Router();


loginRouter.post('/create-login', runValidator(loginSchema), createLoginController);
loginRouter.get('/', passport.authenticate('jwt', { session: false }), getLoginController)
loginRouter.get('/:id', passport.authenticate('jwt', { session: false }), getUserByIdController)


module.exports = loginRouter;


