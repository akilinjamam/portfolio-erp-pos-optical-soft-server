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


// discount: {
//     type: String,
//     default: '0'
// },
// advance: {
//     type: String,
//     default: '0'
// },
// leftSph: {
//     type: String,
//     default: 'blank'
// },
// leftCyl: {
//     type: String,
//     default: 'blank'
// },
// leftAxis: {
//     type: String,
//     default: 'blank'
// },
// leftNear: {
//     type: String,
//     default: 'blank'
// },
// rightSph: {
//     type: String,
//     default: 'blank'
// },
// rightCyl: {
//     type: String,
//     default: 'blank'
// },
// rightAxis: {
//     type: String,
//     default: 'blank'
// },
// rightNear: {
//     type: String,
//     default: 'blank'
// },

// Customer validation schema
const salesSchema = Joi.object({
    customerName: Joi.string().default('unknown'),
    phoneNumber: Joi.string().default('blank'),
    address: Joi.string().default('blank'),
    referredBy: Joi.string().required().default('blank'),
    discount: Joi.string().required().default('0'),
    advance: Joi.string().required().default('0'),
    leftSph: Joi.string().required().default('blank'),
    leftCyl: Joi.string().required().default('blank'),
    leftAxis: Joi.string().required().default('blank'),
    leftNear: Joi.string().required().default('blank'),
    rightSph: Joi.string().required().default('blank'),
    rightCyl: Joi.string().required().default('blank'),
    rightAxis: Joi.string().required().default('blank'),
    rightNear: Joi.string().required().default('blank'),
    delivered: Joi.string().required().default(false),
    deliveryDate: Joi.string().required(),
    paymentMethod: Joi.string().required().valid('Bank', 'Cash', 'Bkash', 'Nogod', 'Rocket'),
    products: Joi.array().items(productSchema).required() // Array of products using the product schema
});

module.exports = { salesSchema };
