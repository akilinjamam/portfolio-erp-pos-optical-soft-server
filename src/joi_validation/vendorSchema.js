const Joi = require("joi");

module.exports.vendorValidationSchema = Joi.object({
    supplierName: Joi.string().required(),
    billingDate: Joi.string().required(),
    paymentDate: Joi.string().required(),
    paid: Joi.string().required(),
    totalPaid: Joi.string().required(),
    billNo: Joi.string().optional(),
    prevDue: Joi.string().optional(),
    due: Joi.string().optional(),
    totalPaid: Joi.string().optional(),
    paymentMethod: Joi.string().optional(),
    transectionId: Joi.string().optional(),

});


