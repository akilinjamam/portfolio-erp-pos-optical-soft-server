const Joi = require('joi');

// Product validation schema
const productSchema = Joi.object({
    id: Joi.string().optional(), // If you expect this to be generated automatically
    productName: Joi.string().required(),
    actualSalesPrice: Joi.number().required(),
    purchasePrice: Joi.string().required(), // If you prefer it as a number, change this to Joi.number()
    category: Joi.string().required(),
    quantity: Joi.number().required(),
    remainingQuantity: Joi.number().optional(),
    material: Joi.string().optional(),
    frameType: Joi.string().optional(),
    size: Joi.string().optional(),
    shape: Joi.string().optional(),
    power: Joi.string().optional(),
    sph: Joi.string().optional(),
    cyl: Joi.string().optional(),
    axis: Joi.string().optional(),
    barcode: Joi.string().optional(),
    inStock: Joi.boolean().optional()
});

// Customer validation schema
const salesSchema = Joi.object({
    customerName: Joi.string().default('unknown'),
    phoneNumber: Joi.string().default('blank'),
    address: Joi.string().default('blank'),
    referredBy: Joi.string().required().default('blank'),
    discount: Joi.string().required().default('0'),
    advance: Joi.string().required().default('0'),
    todayPaid: Joi.string().optional(),
    paidTime: Joi.string().optional(),
    paymentHistory: Joi.string().optional(),
    paymentDate: Joi.string().optional(),
    leftSph: Joi.string().required().default('blank'),
    leftCyl: Joi.string().required().default('blank'),
    leftAxis: Joi.string().required().default('blank'),
    leftNear: Joi.string().required().default('blank'),
    rightSph: Joi.string().required().default('blank'),
    rightCyl: Joi.string().required().default('blank'),
    rightAxis: Joi.string().required().default('blank'),
    rightNear: Joi.string().required().default('blank'),
    comment: Joi.string().required().default('blank'),
    lense: Joi.string().required().default('blank'),
    glassType: Joi.string().required().default('blank'),
    delivered: Joi.string().required().valid('Delivered', 'Not-Delivered'),
    recorderName: Joi.string().required(),
    deliveryDate: Joi.string().required(),
    paymentMethod: Joi.string().required().valid('Bank', 'Cash', 'Bkash', 'Nogod', 'Rocket'),
    invoiceBarcode: Joi.string().required().default('blank'),
    products: Joi.array().items(productSchema).required() // Array of products using the product schema
});

module.exports = { salesSchema };
