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

const accountsSchema = mongoose.Schema({
    salesAmount: {
        type: String,
        default: '0'
    },
    totalSalesAmount: {
        type: String,
        default: '0'
    },
    dueSalesAmount: {
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
    startingCashReserved: {
        type: String,
        default: '0'
    },
    endingCashReserved: {
        type: String,
        required: true,
    },
    deficit: {
        type: String,
        default: '0'
    },
    todayBankValue: {
        type: Number,
        required: true
    },
    todayBkashValue: {
        type: Number,
        required: true
    },
    todayNogodValue: {
        type: Number,
        required: true
    },
    expenses: {
        type: [expenseSchema],
        required: true,
    },
}, {
    timestamps: true,
});

const Account = mongoose.model("Account", accountsSchema);

module.exports = Account
