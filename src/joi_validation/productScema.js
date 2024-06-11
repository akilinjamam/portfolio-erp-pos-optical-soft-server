const Joi = require("joi");

const productValidationSchema = Joi.object({
    productName: Joi.string().required(),
    salesPrice: Joi.number().required(),
    purchasePrice: Joi.number().required(),
    category: Joi.string().required(),
    quantity: Joi.number().required(),
    date: Joi.string().required(),
    barcode: Joi.string().required(),
    material: Joi.string().required(),
    frameType: Joi.string().required(),
    size: Joi.string().required(),
    shape: Joi.string().required(),
    img: Joi.string().optional(),
    inStock: Joi.boolean().default(true)
});

module.exports.bulkProductValidationSchema = Joi.array().items(productValidationSchema);
