const express = require('express');
const { runValidator } = require('../../joi_validation');
const passport = require('passport');
const { bulkSupplierValidationSchema } = require('../../joi_validation/supplierSchema');
const { createSupplierController, getSupplierController, updateSupplierController, deleteSupplierController } = require('./supplier.controller');


const supplierRouter = express.Router();


supplierRouter.post('/create-supplier', runValidator(bulkSupplierValidationSchema), createSupplierController);
supplierRouter.get('/', passport.authenticate('jwt', { session: false }), getSupplierController)
supplierRouter.patch('/:id', updateSupplierController);
supplierRouter.post('/bulk-delete', deleteSupplierController);

module.exports = supplierRouter