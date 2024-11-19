const calculateTotal = require("../../calculation/calculateSum");
const Sale = require("../sales/sales.modal");
const Account = require("./accounts.model");

const createAccountService = async (data) => {

    const { date, endingCashReserved, startingCashReserved, expenses, salesId, dueSalesAmount } = data

    const targetDate = new Date(date);

    const salesAccordingToDate = await Sale.find({
        $expr: {
            $and: [
                { $eq: [{ $year: '$createdAt' }, targetDate.getUTCFullYear()] },
                { $eq: [{ $month: '$createdAt' }, targetDate.getUTCMonth() + 1] },
                { $eq: [{ $dayOfMonth: '$createdAt' }, targetDate.getUTCDate()] },
            ],
        },
    });


    // const allProducts = salesAccordingToDate.flatMap(sale => sale.products.map(item => item.actualSalesPrice * item.quantity));

    const allProducts = salesAccordingToDate.map(paid => Number(paid.advance))

    const allExprenses = expenses.map(expense => Number(expense.expenseAmount));

    const totalSaleValue = calculateTotal(allProducts).toString()
    const totalExpenseValue = calculateTotal(allExprenses).toString()

    // const lastAccount = await Account.findOne({}).sort({ createdAt: -1 });

    const conditionalStartingCash = startingCashReserved === '0' ? endingCashReserved : startingCashReserved

    const totalSalesWithBeginingCash = Number(conditionalStartingCash) + Number(totalSaleValue) + Number(dueSalesAmount);

    const totalDeficit = Number(totalExpenseValue) - totalSalesWithBeginingCash

    const conditionalDeficit = Number(totalExpenseValue) > totalSalesWithBeginingCash ? totalDeficit.toString() : '0'

    const totalSalesAmountInString = totalSalesWithBeginingCash.toString();

    const calculateProfitAllocation = totalSalesWithBeginingCash - Number(totalExpenseValue) - Number(endingCashReserved)
    const calculateProfitAllocationInString = calculateProfitAllocation.toString();


    const newData = {
        salesId,
        totalExpense: totalExpenseValue,
        profitAllocation: calculateProfitAllocationInString,
        date,
        startingCashReserved: conditionalStartingCash,
        endingCashReserved: endingCashReserved,
        salesAmount: totalSaleValue,
        totalSalesAmount: totalSalesAmountInString,
        deficit: conditionalDeficit,
        dueSalesAmount,
        expenses
    }


    await Account.create(newData)


    return {
        status: 201,
        result: allProducts
    }
}


module.exports = {
    createAccountService
}