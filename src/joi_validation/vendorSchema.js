const Joi = require("joi");

module.exports.vendorValidationSchema = Joi.object({
    supplierName: Joi.string().required(),
    billingDate: Joi.string().optional(),
    paymentDate: Joi.string().optional(),
    paid: Joi.string().optional(),
    billNo: Joi.string().optional(),
    totalPaid: Joi.string().optional(),
    billAmount: Joi.string().optional(),
    singleBillAmount: Joi.string().optional(),
    prevDue: Joi.string().optional(),
    due: Joi.string().optional(),
    paymentMethod: Joi.string().optional(),
    transectionId: Joi.string().optional(),

});


