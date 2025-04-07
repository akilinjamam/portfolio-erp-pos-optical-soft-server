const mongoose = require('mongoose');


const productSchema = mongoose.Schema({

    productName: {
        type: String,
        requrired: true,
        trim: true,
    },
    salesPrice: {
        type: String,
        requrired: true,
    },
    actualSalesPrice: {
        type: String,
        default: 0
    },
    purchasePrice: {
        type: String,
        requrired: true,
    },
    category: {
        type: String,
        requrired: true,
    },
    quantity: {
        type: String,
        required: true
    },
    barcode: {
        type: String,
        requried: true
    },
    material: {
        type: String,

    },
    frameType: {
        type: String,

    },
    size: {
        type: String,

    },
    shape: {
        type: String,

    },
    img: {
        type: String,
    },
    recorderName: {
        type: String,
        required: true
    },
    recorderEmail: {
        type: String,
        required: true
    },
    power: {
        type: String,
        required: true
    },
    sph: {
        type: String,
        required: true
    },
    cyl: {
        type: String,
        required: true
    },
    axis: {
        type: String,
        required: true
    },
    supplierName: {
        type: String,
        required: true
    },
    collectorName: {
        type: String,
        required: true
    },
    stockAmount: {
        type: String,
        default: '0'
    },
    inStock: {
        type: Boolean,
        default: true
    },
},
    {
        timestamps: true,
    }
)

const Products = mongoose.model("Product", productSchema);

module.exports = Products;