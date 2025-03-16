const mongoose = require('mongoose');

const expenseSchema = mongoose.Schema({
    expenseName: {
        type: String,
        required: true,
    },
    expenseAmount: {
        type: String,
        required: true,
    },
});

const finalAccountsSchema = mongoose.Schema({

    extraProfitAmount: {
        type: String,
        default: '0'
    },
    date: {
        type: String,
        required: true,
    },
    expenses: {
        type: [expenseSchema],
        required: true,
    },
}, {
    timestamps: true,
});

const FinalAccount = mongoose.model("FinalAccount", finalAccountsSchema);

module.exports = FinalAccount
