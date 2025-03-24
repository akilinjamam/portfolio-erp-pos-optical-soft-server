const Joi = require('joi');

const expenseSchema = Joi.object({
    expenseName: Joi.string().required(),
    expenseAmount: Joi.string().required(),
});

const accountsSchema = Joi.object({
    salesAmount: Joi.string().optional(),
    totalSalesAmount: Joi.string().optional(),
    dueSalesAmount: Joi.string().optional(),
    date: Joi.string().required(),
    totalExpense: Joi.string().optional(),
    profitAllocation: Joi.string().optional(),
    startingCashReserved: Joi.string().optional(),
    deficit: Joi.string().optional(),
    cashOver: Joi.string().optional(),
    endingCashReserved: Joi.string().required(),
    todayBankValue: Joi.number().required(),
    todayBkashValue: Joi.number().required(),
    todayNogodValue: Joi.number().required(),
    expenses: Joi.array().items(expenseSchema).required()
});

module.exports = { accountsSchema };