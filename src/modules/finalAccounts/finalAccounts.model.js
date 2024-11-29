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
    totalProfit: {
        type: String,
        default: '0'
    },
    extraProfitAmount: {
        type: String,
        default: '0'
    },
    date: {
        type: String,
        required: true,
    },
    totalExpense: {
        type: String,
        default: '0'
    },
    profitAllocation: {
        type: String,
        default: '0'
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
