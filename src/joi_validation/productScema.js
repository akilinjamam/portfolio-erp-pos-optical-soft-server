const Joi = require("joi");

const productValidationSchema = Joi.object({
    productName: Joi.string().required(),
    salesPrice: Joi.string().required(),
    actualSalesPrice: Joi.string().default('not included'),
    purchasePrice: Joi.string().required(),
    category: Joi.string().required(),
    quantity: Joi.string().required(),
    barcode: Joi.string().required(),
    material: Joi.string().required(),
    frameType: Joi.string().required(),
    size: Joi.string().required(),
    shape: Joi.string().required(),
    img: Joi.string(),
    recorderName: Joi.string().required(),
    recorderEmail: Joi.string().required(),
    power: Joi.string().required(),
    sph: Joi.string().required(),
    cyl: Joi.string().required(),
    axis: Joi.string().required(),
    supplierName: Joi.string().required(),
    collectorName: Joi.string().required(),
    inStock: Joi.boolean().default(true)
});

module.exports.bulkProductValidationSchema = Joi.array().items(productValidationSchema);
