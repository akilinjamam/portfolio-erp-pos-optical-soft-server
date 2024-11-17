const { runValidator } = require('../../joi_validation');
const { vendorValidationSchema } = require('../../joi_validation/vendorSchema');
const { createVendorController } = require('./vendor.controller');

const vendorRouter = require('express').Router();


vendorRouter.post('/create-vendor', runValidator(vendorValidationSchema), createVendorController);


module.exports = vendorRouter