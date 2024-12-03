const mongoose = require('mongoose');

// Create a schema for the product subdocument
const productSchema = mongoose.Schema({
    id: {
        type: mongoose.Schema.Types.ObjectId,
        default: 'blank',
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
        default: 0
    },
    material: {
        type: String,
        default: "blank"
    },
    frameType: {
        type: String,
        default: "blank"
    },
    size: {
        type: String,
        default: "blank"
    },
    shape: {
        type: String,
        default: "blank"
    },
    power: {
        type: String,
        default: "blank"
    },
    sph: {
        type: String,
        default: "blank"
    },
    cyl: {
        type: String,
        default: "blank"
    },
    axis: {
        type: String,
        default: "blank"
    },
    barcode: {
        type: String,
        default: 'blank'
    },
    inStock: {
        type: Boolean,
        default: false
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
    todayPaid: {
        type: String,
        default: '0'
    },
    paidTime: {
        type: String,
        default: '1'
    },
    paymentHistory: {
        type: String,
        default: '0'
    },
    paymentDate: {
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
    comment: {
        type: String,
        default: 'blank'
    },
    recorderName: {
        type: String,
        required: true
    },
    deliveryDate: {
        type: String,
        required: true
    },
    delivered: {
        type: String,
        enum: ['Delivered', 'Not-Delivered'],
        required: true
    },
    paymentMethod: {
        type: String,
        enum: ['Bank', 'Cash', 'Bkash', 'Nogod', 'Rocket'],
        required: true
    },
    invoiceBarcode: {
        type: String,
        required: true,
        default: 'blank'
    },
    products: [productSchema] // Array of product subdocuments
},
    {
        timestamps: true
    }
);

const Sale = mongoose.model('Sale', salesSchema);

module.exports = Sale;


