const mongoose = require('mongoose');
const Schema = require('mongoose');

const payrollSchema = mongoose.Schema({

    employeeName: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Employee'
    },
    netSalary: {
        type: String,
        default: '0'
    },
    totalSalary: {
        type: String,
        default: '0'
    },
    prevDue: {
        type: String,
        default: '0'
    },
    prevAdvance: {
        type: String,
        default: '0'
    },
    paid: {
        type: String,
        default: '0'
    },
    totalPaid: {
        type: String,
        default: '0'
    },
    due: {
        type: String,
        default: '0'
    },
    advance: {
        type: String,
        default: '0'
    },
    incentive: {
        type: String,
        default: '0'
    },
    overtime: {
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
    date: {
        type: String,
        required: true
    }
},
    {
        timestamps: true,
    }
)

const Payroll = mongoose.model("Payroll", payrollSchema);

module.exports = Payroll;