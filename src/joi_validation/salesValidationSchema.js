const Joi = require('joi');

// Product validation schema
const productSchema = Joi.object({
    id: Joi.string().optional(), // If you expect this to be generated automatically
    productName: Joi.string().required(),
    actualSalesPrice: Joi.number().required(),
    purchasePrice: Joi.string().required(), // If you prefer it as a number, change this to Joi.number()
    category: Joi.string().required(),
    quantity: Joi.number().required(),
    remainingQuantity: Joi.number().required(),
    material: Joi.string().required(),
    frameType: Joi.string().required(),
    size: Joi.string().required(),
    shape: Joi.string().required(),
    recorderName: Joi.string().required(),
    recorderEmail: Joi.string().email().required(),
    barcode: Joi.string().required(),
    inStock: Joi.boolean().required()
});

// Customer validation schema
const salesSchema = Joi.object({
    customerName: Joi.string().default('unknown'),
    phoneNumber: Joi.string().default('blank'),
    address: Joi.string().default('blank'),
    referredBy: Joi.string().required().default('blank'),
    products: Joi.array().items(productSchema).required() // Array of products using the product schema
});

module.exports = { salesSchema };
