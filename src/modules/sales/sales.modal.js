const mongoose = require('mongoose');

// Create a schema for the product subdocument
const productSchema = mongoose.Schema({
    id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        auto: true
    },
    productName: {
        type: String,
        required: true
    },
    actualSalesPrice: {
        type: Number,
        required: true
    },
    purchasePrice: {
        type: String, // If purchasePrice should always be a number, you can change this to Number
        required: true
    },
    category: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    remainingQuantity: {
        type: Number,
        required: true
    },
    material: {
        type: String,
        required: true
    },
    frameType: {
        type: String,
        required: true
    },
    size: {
        type: String,
        required: true
    },
    shape: {
        type: String,
        required: true
    },
    recorderName: {
        type: String,
        required: true
    },
    recorderEmail: {
        type: String,
        required: true
    },
    barcode: {
        type: String,
        required: true
    },
    inStock: {
        type: Boolean,
        required: true
    }
});

// Create a schema for the customer and products array
const salesSchema = new mongoose.Schema({
    customerName: {
        type: String,
        default: 'unknown'
    },
    phoneNumber: {
        type: String,
        default: 'blank'
    },
    address: {
        type: String,
        default: 'blank'
    },
    referredBy: {
        type: String,
        default: 'blank'
    },
    discount: {
        type: String,
        default: '0'
    },
    advance: {
        type: String,
        default: '0'
    },
    leftSph: {
        type: String,
        default: 'blank'
    },
    leftCyl: {
        type: String,
        default: 'blank'
    },
    leftAxis: {
        type: String,
        default: 'blank'
    },
    leftNear: {
        type: String,
        default: 'blank'
    },
    rightSph: {
        type: String,
        default: 'blank'
    },
    rightCyl: {
        type: String,
        default: 'blank'
    },
    rightAxis: {
        type: String,
        default: 'blank'
    },
    rightNear: {
        type: String,
        default: 'blank'
    },
    deliveryDate: {
        type: String,
        required: true
    },
    delivered: {
        type: Boolean,
        default: false
    },
    paymentMethod: {
        type: Boolean,
        enum: ['Bank', 'Cash', 'Bkash', 'Nogod', 'Rocket'],
        default: false
    },
    products: [productSchema] // Array of product subdocuments
},
    {
        timestamps: true
    }
);

const Sale = mongoose.model('Sale', salesSchema);

module.exports = Sale;
