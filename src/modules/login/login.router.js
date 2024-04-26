const { createLoginController, getLoginController } = require('./login.controller');
const passport = require('passport')

const loginRouter = require('express').Router();

// 
loginRouter.post('/create-login', createLoginController);
loginRouter.get('/', passport.authenticate('jwt', { session: false }), getLoginController)


module.exports = loginRouter;


