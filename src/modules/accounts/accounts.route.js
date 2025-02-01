const passport = require('passport');
const { runValidator } = require('../../joi_validation');
const { accountsSchema } = require('../../joi_validation/accountsValidationSchema');
const { createAccountsController, getAccountsController, getSalesForAccountController, updateAccountController, deleteAccountController, getAccountProfitExpensesController, getTodaySalesForAddExpensesController } = require('./accounts.controller');

const accountsRouter = require('express').Router();


accountsRouter.post('/create-account', runValidator(accountsSchema), createAccountsController);
accountsRouter.get('/get-accounts-with-year-month', passport.authenticate('jwt', { session: false }), getAccountsController);
accountsRouter.get('/get-accounts-monthly-profit-expenses', passport.authenticate('jwt', { session: false }), getAccountProfitExpensesController);
accountsRouter.get('/get-sale-lastAccount', passport.authenticate('jwt', { session: false }), getSalesForAccountController);
accountsRouter.get('/get-today-sales-for-add-expenses', passport.authenticate('jwt', { session: false }), getTodaySalesForAddExpensesController);
accountsRouter.patch('/:id', updateAccountController);
accountsRouter.post('/bulk-delete', deleteAccountController);

module.exports = accountsRouter;