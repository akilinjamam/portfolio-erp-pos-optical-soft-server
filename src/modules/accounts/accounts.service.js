const calculateTotal = require("../../calculation/calculateSum");
const Payroll = require("../payroll/payroll.model");
const Sale = require("../sales/sales.modal");
const Vendor = require("../vendor/vendor.model");
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

    const allProducts = salesAccordingToDate.map(paid => Number(paid.todayPaid))

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

    if (!date) {
        return {
            status: 201,
            result: []
        }
    }

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
            // { paymentMethod: "Cash" },
            {
                $expr: {
                    $eq: [{ $toDouble: "$paidTime" }, 1]
                }
            }
        ],
    });

    if (salesAccordingToDate?.length === 0) {
        throw new Error('not found')
    }

    const allProducts = salesAccordingToDate.map(paid => Number(paid.todayPaid))

    const findBeginingCashReserved = await Account.findOne({ date: date }).sort({ createdAt: -1 })

    const totalSaleValue = calculateTotal(allProducts).toString()
    const beginingCashReserved = findBeginingCashReserved?.endingCashReserved ? findBeginingCashReserved?.endingCashReserved : 0


    const totalResult = Number(beginingCashReserved) + Number(totalSaleValue)

    const totalResultInString = totalResult.toString();

    const beginingCashReservedToString = beginingCashReserved?.toString();

    const total = {
        total: totalResultInString,
        totalSales: totalSaleValue,
        beginingCashReserved: beginingCashReservedToString,
        allSalesDetail: salesAccordingToDate
    }

    return {
        status: 201,
        result: total
    }
}

const getAccountService = async (year, month) => {


    let conditionValue = '';

    if (year && month) {
        conditionValue = { $regex: `${year}-${month}` }
    }



    const result = await Account.find({ date: conditionValue }).sort({ createdAt: 1 });

    console.log(result)

    return {
        status: 201,
        result
    }
}
const getAccountProfitExpensesService = async () => {

    const date = new Date();

    const year = date.getFullYear()
    const month = date.getMonth() + 1;


    let conditionValue = '';

    if (year && month) {
        conditionValue = { $regex: `${year}-${month}` }
    }

    const allProfitAllocation = await Account.find({ date: conditionValue }).sort({ createdAt: 1 });




    const getAllProfitAllocation = calculateTotal(allProfitAllocation?.map(profit => Number(profit?.profitAllocation)));

    console.log(getAllProfitAllocation);





    const netCashProfit = getAllProfitAllocation

    console.log('cash-profit', netCashProfit);


    const pipelineForBank = [

        {
            $match: {
                paymentDate: conditionValue
            }
        },
        {
            $match: {
                paymentMethod: 'Bank'
            }
        },

    ];

    const allBankSaleTransection = await Sale.aggregate(pipelineForBank)



    const calculateTotalBackSale = calculateTotal(allBankSaleTransection?.map(item => Number(item?.advance)));



    const netBankProfit = calculateTotalBackSale

    console.log('net-bank-profit', netBankProfit);


    const pipelineForBkash = [

        {
            $match: {
                paymentDate: conditionValue
            }
        },
        {
            $match: {
                paymentMethod: 'Bkash'
            }
        },

    ];

    const allBkashSaleTransection = await Sale.aggregate(pipelineForBkash)



    const calculateTotalBkashSale = calculateTotal(allBkashSaleTransection?.map(item => Number(item?.advance)));



    const netBkashProfit = calculateTotalBkashSale

    console.log('net-bkash-profit', netBkashProfit);



    const pipelineForNogod = [

        {
            $match: {
                paymentDate: conditionValue
            }
        },
        {
            $match: {
                paymentMethod: 'Nogod'
            }
        },

    ];

    const allNogodSaleTransection = await Sale.aggregate(pipelineForNogod)



    const calculateTotalNogodSale = calculateTotal(allNogodSaleTransection?.map(item => Number(item?.advance)));



    const netNogodProfit = calculateTotalNogodSale

    console.log('net-nogod-profit', netNogodProfit);




    const pipelineForRocket = [

        {
            $match: {
                paymentDate: conditionValue
            }
        },
        {
            $match: {
                paymentMethod: 'Rocket'
            }
        },

    ];

    const allRocketSaleTransection = await Sale.aggregate(pipelineForRocket)



    const calculateTotalRocketSale = calculateTotal(allRocketSaleTransection?.map(item => Number(item?.advance)));



    const netRocketProfit = calculateTotalRocketSale

    console.log('net-rocket-profit', netRocketProfit);

    const totalProfitAmount = netCashProfit + netBankProfit + netBkashProfit + netNogodProfit + netRocketProfit


    const pipelineForPayroll = [

        {
            $match: {
                date: conditionValue
            }
        }

    ];

    const allPayrolls = await Payroll.aggregate(pipelineForPayroll);

    const CalculateTotalPaidSalary = calculateTotal(allPayrolls?.map(paid => Number(paid?.paid)))
    const CalculateTotalIncentiveSalary = calculateTotal(allPayrolls?.map(paid => Number(paid?.incentive)))
    const CalculateTotalBonusSalary = calculateTotal(allPayrolls?.map(paid => Number(paid?.overtime)))


    const totalPayrollExpenses = CalculateTotalPaidSalary + CalculateTotalIncentiveSalary + CalculateTotalBonusSalary

    console.log('salary-expense', totalPayrollExpenses);


    const pipelineForVendor = [

        {
            $match: {
                paymentDate: conditionValue
            }
        }

    ];

    const allVendors = await Vendor.aggregate(pipelineForVendor);

    const calculateAllPaidAmountVendors = calculateTotal(allVendors?.map(vendor => Number(vendor?.paid)));

    console.log('vendor-expenses', calculateAllPaidAmountVendors);


    const totalExpenses = calculateAllPaidAmountVendors + totalPayrollExpenses;

    const netProfit = totalProfitAmount - totalExpenses;

    const total = {
        cashProfit: netCashProfit,
        bankProfit: netBankProfit,
        bkashProfit: netBkashProfit,
        nogodProfit: netNogodProfit,
        rocketProfit: netRocketProfit,
        totalProfit: totalProfitAmount,
        salaryExpenses: totalPayrollExpenses,
        vendorExpenses: calculateAllPaidAmountVendors,
        totalExpenses,
        netProfit: netProfit
    }

    return {
        status: 201,
        result: total
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
    getAccountProfitExpensesService,
    getSalesForAccountService,
    updateAccountService,
    deleteAccountService
}