const { runValidator } = require('../../joi_validation');
const { vendorValidationSchema } = require('../../joi_validation/vendorSchema');
const { createVendorController, getLastVendorController, deleteVendorController, getVendorWithIdController, updateVendorController, createVendorBillController, getVendorWithBillIdController } = require('./vendor.controller');

const vendorRouter = require('express').Router();


vendorRouter.post('/create-vendor-bill', runValidator(vendorValidationSchema), createVendorBillController);
vendorRouter.post('/create-vendor', runValidator(vendorValidationSchema), createVendorController);

vendorRouter.post('/bulk-delete', deleteVendorController)
vendorRouter.get('/get-last-vendor/:id', getLastVendorController);
vendorRouter.get('/', getVendorWithIdController)
vendorRouter.get('/get-vendor-bill', getVendorWithBillIdController)
vendorRouter.patch('/:id', updateVendorController)


module.exports = vendorRouter