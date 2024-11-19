const { runValidator } = require('../../joi_validation');
const { accountsSchema } = require('../../joi_validation/accountsValidationSchema');
const { createAccountsController } = require('./accounts.controller');

const accountsRouter = require('express').Router();


accountsRouter.post('/create-account', runValidator(accountsSchema), createAccountsController);

module.exports = accountsRouter;