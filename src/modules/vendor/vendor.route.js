const { runValidator } = require('../../joi_validation');
const { vendorValidationSchema } = require('../../joi_validation/vendorSchema');
const { createVendorController, getLastVendorController } = require('./vendor.controller');

const vendorRouter = require('express').Router();


vendorRouter.post('/create-vendor', runValidator(vendorValidationSchema), createVendorController);

vendorRouter.get('/get-last-vendor/:id', getLastVendorController);


module.exports = vendorRouter