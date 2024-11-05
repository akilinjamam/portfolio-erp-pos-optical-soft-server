const Joi = require("joi");

const supplierValidationSchema = Joi.object({
    supplierName: Joi.string().required(),
    address: Joi.string().required(),
    mobile: Joi.string().required(),
    img: Joi.string(),
});

module.exports.bulkSupplierValidationSchema = Joi.array().items(supplierValidationSchema);
