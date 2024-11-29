const passport = require('passport');
const { runValidator } = require('../../joi_validation');
const { finalAccountsSchema } = require('../../joi_validation/finalAccountValidationSchema');
const { finalAccountCreateController, updateFinalAccountController, deleteFinalAccountController, getFinalAccountController } = require('./finalAccounts.controller');

const finalAccountsRouter = require('express').Router();


finalAccountsRouter.post('/create-final-account', runValidator(finalAccountsSchema), finalAccountCreateController);
finalAccountsRouter.get('/', passport.authenticate('jwt', { session: false }), getFinalAccountController);
finalAccountsRouter.patch('/:id', updateFinalAccountController);
finalAccountsRouter.post('/bulk-delete', deleteFinalAccountController);


module.exports = finalAccountsRouter