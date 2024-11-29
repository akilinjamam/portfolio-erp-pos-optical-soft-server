const passport = require('passport');
const { runValidator } = require('../../joi_validation');
const { bulkProductValidationSchema } = require('../../joi_validation/productScema');

const { createProductController, getProductController, getSingleProductController, updateProductController, deleteProductController, getProductGlassController } = require('./products.controller');


const productRouter = require('express').Router();


productRouter.post('/create-product', runValidator(bulkProductValidationSchema), createProductController);
productRouter.get('/', passport.authenticate('jwt', { session: false }), getProductController);
productRouter.get('/glass', passport.authenticate('jwt', { session: false }), getProductGlassController);
productRouter.get('/:id', getSingleProductController);
productRouter.patch('/:id', updateProductController);
productRouter.post('/bulk-delete', deleteProductController);

module.exports = productRouter;


