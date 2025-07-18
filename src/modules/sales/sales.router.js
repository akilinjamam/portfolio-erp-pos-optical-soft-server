const passport = require('passport');
const { runValidator } = require('../../joi_validation');
const { salesSchema } = require('../../joi_validation/salesValidationSchema');
const { createSalesController, getSalesController, updateSalesController, getDueCollectionSalesController, getOneMonthSalesController, cancelSalesAdjustmentController, updateSalesAdjustmentController, updateSalesInfoController, updateProductInfoController, getMonthlyDueCollectionSalesController, deleteSalesInfoController } = require('./sales.controller');

const salesRouter = require('express').Router();


salesRouter.post('/create-sale', runValidator(salesSchema), createSalesController);
salesRouter.get('/', passport.authenticate('jwt', { session: false }), getSalesController)
salesRouter.get('/get-one-month-sales', passport.authenticate('jwt', { session: false }), getOneMonthSalesController)
salesRouter.get('/get-due-collection', passport.authenticate('jwt', { session: false }), getDueCollectionSalesController)
salesRouter.get('/get-monthly-due-collection', passport.authenticate('jwt', { session: false }), getMonthlyDueCollectionSalesController)
salesRouter.patch('/:id', updateSalesAdjustmentController)
salesRouter.patch('/cancel-sales-adjustment/:id', cancelSalesAdjustmentController)
salesRouter.patch('/update-sales-info/:id', updateSalesInfoController)
salesRouter.patch('/update-product-info/:id', updateProductInfoController)
salesRouter.post('/delete-sales', deleteSalesInfoController)

module.exports = salesRouter;


