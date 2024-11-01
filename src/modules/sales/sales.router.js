const passport = require('passport');
const { runValidator } = require('../../joi_validation');
const { salesSchema } = require('../../joi_validation/salesValidationSchema');
const { createSalesController, getSalesController, updateSalesController } = require('./sales.controller');

const salesRouter = require('express').Router();


salesRouter.post('/create-sale', runValidator(salesSchema), createSalesController);
salesRouter.get('/', passport.authenticate('jwt', { session: false }), getSalesController)
salesRouter.patch('/:id', updateSalesController)
module.exports = salesRouter;


