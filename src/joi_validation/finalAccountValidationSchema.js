const Joi = require('joi');

const expenseSchema = Joi.object({
    expenseName: Joi.string().required(),
    expenseAmount: Joi.string().required(),
});

const finalAccountsSchema = Joi.object({
    totalProfit: Joi.string().optional(),
    extraProfitAmount: Joi.string().optional(),
    date: Joi.string().optional(),
    totalExpense: Joi.string().optional(),
    profitAllocation: Joi.string().optional(),
    expenses: Joi.array().items(expenseSchema).required()
});

module.exports = { finalAccountsSchema };