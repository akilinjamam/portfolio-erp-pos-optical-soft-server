const calculateTotal = require("../../calculation/calculateSum");
const Sale = require("../sales/sales.modal");
const Account = require("./accounts.model");

const createAccountService = async (data) => {

    const { date, endingCashReserved, startingCashReserved, expenses, salesId, dueSalesAmount } = data

    const targetDate = new Date(date);

    const salesAccordingToDate = await Sale.find({
        $and: [
            {
                $expr: {
                    $and: [
                        { $eq: [{ $year: '$createdAt' }, targetDate.getUTCFullYear()] },
                        { $eq: [{ $month: '$createdAt' }, targetDate.getUTCMonth() + 1] },
                        { $eq: [{ $dayOfMonth: '$createdAt' }, targetDate.getUTCDate()] },
                    ],
                },
            },
            { paymentMethod: "Cash" }
        ],
    });


    // const allProducts = salesAccordingToDate.flatMap(sale => sale.products.map(item => item.actualSalesPrice * item.quantity));

    const allProducts = salesAccordingToDate.map(paid => Number(paid.advance))

    const allExprenses = expenses.map(expense => Number(expense.expenseAmount));

    const totalSaleValue = calculateTotal(allProducts).toString()
    const totalExpenseValue = calculateTotal(allExprenses).toString()

    const lastAccount = await Account.findOne({}).sort({ createdAt: -1 });

    const conditionalStartingCash = startingCashReserved === '0' ? lastAccount?.endingCashReserved : startingCashReserved

    const totalSalesWithBeginingCashAndDueCollection = Number(conditionalStartingCash) + Number(totalSaleValue) + Number(dueSalesAmount);

    const totalDeficit = Number(totalExpenseValue) - totalSalesWithBeginingCashAndDueCollection

    const conditionalDeficit = Number(totalExpenseValue) > totalSalesWithBeginingCashAndDueCollection ? totalDeficit.toString() : '0'

    const totalSalesAmountInString = totalSalesWithBeginingCashAndDueCollection.toString();

    const calculateProfitAllocation = totalSalesWithBeginingCashAndDueCollection - Number(totalExpenseValue) - Number(endingCashReserved)
    const calculateProfitAllocationInString = calculateProfitAllocation.toString();


    const newData = {
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

const getSalesForAccountService = async (date) => {

    const targetDate = new Date(date);

    const salesAccordingToDate = await Sale.find({
        $and: [
            {
                $expr: {
                    $and: [
                        { $eq: [{ $year: '$createdAt' }, targetDate.getUTCFullYear()] },
                        { $eq: [{ $month: '$createdAt' }, targetDate.getUTCMonth() + 1] },
                        { $eq: [{ $dayOfMonth: '$createdAt' }, targetDate.getUTCDate()] },
                    ],
                },
            },
            { paymentMethod: "Cash" }
        ],
    });

    const allProducts = salesAccordingToDate.map(paid => Number(paid.advance))

    const findBeginingCashReserved = await Account.findOne({ date: date }).sort({ createdAt: -1 })

    const totalSaleValue = calculateTotal(allProducts).toString()
    const beginingCashReserved = findBeginingCashReserved?.endingCashReserved


    const totalResult = Number(beginingCashReserved) + Number(totalSaleValue)

    const totalResultInString = totalResult.toString();


    const total = {
        total: totalResultInString,
        totalSales: totalSaleValue,
        beginingCashReserved: beginingCashReserved
    }

    return {
        status: 201,
        result: total
    }
}

const getAccountService = async (year, month) => {


    let conditionValue = '';

    if (year && month) {
        conditionValue = { $regex: `^${year}-${month}` }
    }

    if (year) {
        conditionValue = { $regex: `^${year}` }
    }


    const result = await Account.find({ date: conditionValue }).sort({ createdAt: -1 });

    console.log(result)

    return {
        status: 201,
        result
    }
}

const updateAccountService = async (id, body) => {
    const result = await Account.updateOne({ _id: id }, { $set: body }, { runValidator: true })
    return {
        status: 200,
        result
    }
}

const deleteAccountService = async (ids) => {
    const result = await Account.deleteMany({ _id: { $in: ids } });
    return {
        status: 200,
        result
    }
}


module.exports = {
    createAccountService,
    getAccountService,
    getSalesForAccountService,
    updateAccountService,
    deleteAccountService
}