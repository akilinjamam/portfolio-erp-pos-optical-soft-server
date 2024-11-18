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
        required: true
    },
    billingDate: {
        type: String,
        required: true
    },
    paid: {
        type: String,
        required: true
    },
    billNo: {
        type: String,
        required: true
    },
    billAmount: {
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
        enum: ['cash', 'bank', 'bkash', 'nogod', 'rocket'],
        default: 'cash'

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