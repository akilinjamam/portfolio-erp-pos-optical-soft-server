const passport = require('passport');
const { runValidator } = require('../../joi_validation');
const { salesSchema } = require('../../joi_validation/salesValidationSchema');
const { createSalesController, getSalesController, updateSalesController, getDueCollectionSalesController } = require('./sales.controller');

const salesRouter = require('express').Router();


salesRouter.post('/create-sale', runValidator(salesSchema), createSalesController);
salesRouter.get('/', passport.authenticate('jwt', { session: false }), getSalesController)
salesRouter.get('/get-due-collection', passport.authenticate('jwt', { session: false }), getDueCollectionSalesController)
salesRouter.patch('/:id', updateSalesController)
module.exports = salesRouter;


