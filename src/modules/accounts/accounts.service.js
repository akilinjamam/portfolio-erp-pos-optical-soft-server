const calculateTotal = require("../../calculation/calculateSum");
const FinalAccount = require("../finalAccounts/finalAccounts.model");
const Payroll = require("../payroll/payroll.model");
const Sale = require("../sales/sales.modal");
const Vendor = require("../vendor/vendor.model");
const Account = require("./accounts.model");

const createAccountService = async (data) => {

    const { date, endingCashReserved, startingCashReserved, expenses, salesId, dueSalesAmount, todayBankValue, todayBkashValue, todayNogodValue } = data
    console.log(startingCashReserved)
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

    // const allProducts = salesAccordingToDate.map(paid => Number(paid.todayPaid))
    const allProducts = salesAccordingToDate.flatMap(paid => Number(paid.paymentHistory?.split('+')?.slice(1, 2)))

    const allExprenses = expenses.map(expense => Number(expense.expenseAmount));

    const totalSaleValue = calculateTotal(allProducts).toString()
    const totalExpenseValue = calculateTotal(allExprenses).toString()


    const lastAccount = await Account.findOne({}).sort({ createdAt: -1 });

    console.log(lastAccount)

    const conditionalStartingCash = lastAccount ? lastAccount?.endingCashReserved : '0'

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
        todayBankValue,
        todayBkashValue,
        todayNogodValue,
        expenses
    }

    console.log(newData)
    await Account.create(newData)


    return {
        status: 201,
        result: newData
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
            // {
            //     $expr: {
            //         $eq: [{ $toDouble: "$paidTime" }, 1]
            //     }
            // }
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

    console.log(total)

    return {
        status: 201,
        result: total
    }
}
const getTodaySalesForAddExpensesSevice = async (date) => {

    if (!date) {
        return {
            status: 201,
            result: []
        }
    }
    console.log(date);
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
            { paymentMethod: "Cash" },

        ],
    });

    if (salesAccordingToDate?.length === 0) {
        throw new Error('not found')
    }

    const allProducts = salesAccordingToDate.map(paid => Number(paid?.paymentHistory?.split('+')?.slice(1, 2)))

    const findBeginingCashReserved = await Account.findOne({}).sort({ createdAt: -1 })

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

    console.log(total)

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
const getAccountProfitExpensesService = async (yearMonth) => {

    const date = new Date();
    let year;
    let month;

    if (yearMonth) {
        const splitYear = yearMonth?.split('-')[0];
        const splitMonth = yearMonth?.split('-')[1];
        year = splitYear;
        month = splitMonth
    } else {
        year = date.getFullYear()
        month = (date.getMonth() + 1)?.toString()?.length > 1 ? (date.getMonth() + 1) : `0${(date.getMonth() + 1)}`;
    }

    let conditionValue = '';

    if (year && month) {
        conditionValue = { $regex: `${year}-${month}` }
    }

    const allProfitAllocation = await Account.find({ date: conditionValue }).sort({ createdAt: 1 });


    // console.log(allProfitAllocation);

    const getAllProfitAllocation = calculateTotal(allProfitAllocation?.map(profit => Number(profit?.profitAllocation)));

    const netCashProfit = getAllProfitAllocation


    const pipelineForCash = [

        {
            $match: {
                paymentDate: conditionValue
            }
        },
        {
            $match: {
                paymentMethod: 'Cash'
            }
        },

    ];

    const allCashSaleTransection = await Sale.aggregate(pipelineForCash)


    const calculateTotalCashSale = calculateTotal(allCashSaleTransection?.map(item => Number(item?.paymentHistory?.split('+')?.slice(1, 2))));



    const netCash = calculateTotalCashSale

    console.log('net-cash', netCash);



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




    const calculateTotalBackSale = calculateTotal(allBankSaleTransection?.map(item => Number(item?.paymentHistory?.split('+')?.slice(1, 2))));



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



    const calculateTotalBkashSale = calculateTotal(allBkashSaleTransection?.map(item => Number(item?.paymentHistory?.split('+')?.slice(1, 2))));



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



    const calculateTotalNogodSale = calculateTotal(allNogodSaleTransection?.map(item => Number(item?.paymentHistory?.split('+')?.slice(1, 2))));



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



    const pipelineForCashDue = [

        {
            $match: {
                paymentDate: conditionValue
            }
        },
        {
            $match: {
                duePaymentMethod: 'Cash'
            }
        },

    ];

    const allCashSaleTransectionDue = await Sale.aggregate(pipelineForCashDue)




    const calculateTotalCashSaleDue = calculateTotal(allCashSaleTransectionDue?.map(item => Number(item?.paymentHistory?.split('+')?.slice(2, 3))));



    const netCashDue = calculateTotalCashSaleDue

    console.log('net-cash-due', netCashDue);



    const pipelineForBankDue = [

        {
            $match: {
                paymentDate: conditionValue
            }
        },
        {
            $match: {
                duePaymentMethod: 'Bank'
            }
        },

    ];

    const allBankSaleTransectionDue = await Sale.aggregate(pipelineForBankDue)




    const calculateTotalBackSaleDue = calculateTotal(allBankSaleTransectionDue?.map(item => Number(item?.paymentHistory?.split('+')?.slice(2, 3))));



    const netBankProfitDue = calculateTotalBackSaleDue

    console.log('net-bank-profit-due', netBankProfitDue);


    const pipelineForBkashDue = [

        {
            $match: {
                paymentDate: conditionValue
            }
        },
        {
            $match: {
                duePaymentMethod: 'Bkash'
            }
        },

    ];

    const allBkashSaleTransectionDue = await Sale.aggregate(pipelineForBkashDue)



    const calculateTotalBkashSaleDue = calculateTotal(allBkashSaleTransectionDue?.map(item => Number(item?.paymentHistory?.split('+')?.slice(2, 3))));



    const netBkashProfitDue = calculateTotalBkashSaleDue

    console.log('net-bkash-profit-due', netBkashProfitDue);



    const pipelineForNogodDue = [

        {
            $match: {
                paymentDate: conditionValue
            }
        },
        {
            $match: {
                duePaymentMethod: 'Nogod'
            }
        },

    ];

    const allNogodSaleTransectionDue = await Sale.aggregate(pipelineForNogodDue)



    const calculateTotalNogodSaleDue = calculateTotal(allNogodSaleTransectionDue?.map(item => Number(item?.paymentHistory?.split('+')?.slice(2, 3))));



    const netNogodProfitDue = calculateTotalNogodSaleDue

    console.log('net-nogod-profit-due', netNogodProfitDue);




    const pipelineForRocketDue = [

        {
            $match: {
                paymentDate: conditionValue
            }
        },
        {
            $match: {
                duePaymentMethod: 'Rocket'
            }
        },

    ];

    const allRocketSaleTransectionDue = await Sale.aggregate(pipelineForRocketDue)



    const calculateTotalRocketSaleDue = calculateTotal(allRocketSaleTransectionDue?.map(item => Number(item?.advance)));



    const netRocketProfitDue = calculateTotalRocketSaleDue

    console.log('net-rocket-profit-due', netRocketProfitDue);



    const totalProfitAmount = netCashProfit + netBankProfit + netBkashProfit + netNogodProfit + netRocketProfit + netBankProfitDue + netBkashProfitDue + netNogodProfitDue


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

    const monthlyFixedExpenses = await FinalAccount.find({ date: conditionValue });



    const sumOfFixedExpenses = monthlyFixedExpenses?.flatMap(fixedExp => {
        return fixedExp?.expenses?.map(exp => Number(exp?.expenseAmount)).reduce((acc, curr) => acc + curr, 0);
    })?.reduce((acc, curr) => acc + curr, 0);

    console.log(sumOfFixedExpenses)

    const total = {
        cashProfit: netCashProfit,
        cashSale: netCash,
        cashDue: netCashDue,
        bankProfit: netBankProfit,
        bankDueCollection: netBankProfitDue,
        bkashProfit: netBkashProfit,
        bkashDueCollection: netBkashProfitDue,
        nogodProfit: netNogodProfit,
        nogodDueCollection: netNogodProfitDue,
        rocketProfit: netRocketProfit,
        totalProfit: totalProfitAmount,
        salaryExpenses: totalPayrollExpenses,
        vendorExpenses: calculateAllPaidAmountVendors,
        totalExpenses,
        fixedExpenses: sumOfFixedExpenses,
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
    deleteAccountService,
    getTodaySalesForAddExpensesSevice
}