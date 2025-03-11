const { required } = require('joi');
const mongoose = require('mongoose');
const Schema = require('mongoose');


const vendorSchema = mongoose.Schema({

    supplierName: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Supplier'
    },
    paymentDate: {
        type: String,
    },
    billingDate: {
        type: String,

    },
    paid: {
        type: String,

    },
    billNo: {
        type: String,

    },
    billAmount: {
        type: String,
        default: 'blank'
    },
    singleBillAmount: {
        type: String,
        default: 'blank'
    },
    due: {
        type: String,
        default: '0'
    },
    prevDue: {
        type: String,
        default: '0'
    },
    totalPaid: {
        type: String,
        default: '0'
    },
    paymentMethod: {
        type: String,
        enum: ['cash', 'bank', 'bkash', 'nogod', 'rocket', 'blank'],
        default: 'blank'

    },
    transectionId: {
        type: String,
        default: 'blank'

    },
},
    {
        timestamps: true,
    }
)

const Vendor = mongoose.model("Vendor", vendorSchema);

module.exports = Vendor;