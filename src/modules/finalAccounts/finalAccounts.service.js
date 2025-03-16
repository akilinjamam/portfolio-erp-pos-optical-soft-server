const calculateTotal = require("../../calculation/calculateSum");
const Account = require("../accounts/accounts.model");
const Payroll = require("../payroll/payroll.model");
const Sale = require("../sales/sales.modal");
const Vendor = require("../vendor/vendor.model");
const FinalAccount = require("./finalAccounts.model");

// const finalAccountCreateService = async (data) => {

//     // const date = new Date();

//     // const year = date.getFullYear()
//     // const month = (date.getMonth() + 1).toString().padStart(2, '0');

//     let conditionValue = '';
//     const yearMonth = data.date?.slice(0, 7);

//     if (yearMonth) {
//         conditionValue = { $regex: `${yearMonth}` }
//     }

//     const allProfitAllocation = await Account.find({ date: conditionValue }).sort({ createdAt: 1 });

//     const getAllProfitAllocation = calculateTotal(allProfitAllocation?.map(profit => Number(profit?.profitAllocation)));

//     const netCashProfit = getAllProfitAllocation

//     const pipelineForBank = [

//         {
//             $match: {
//                 paymentDate: conditionValue
//             }
//         },
//         {
//             $match: {
//                 paymentMethod: 'Bank'
//             }
//         },

//     ];

//     const allBankSaleTransection = await Sale.aggregate(pipelineForBank)



//     const calculateTotalBackSale = calculateTotal(allBankSaleTransection?.map(item => Number(item?.paymentHistory?.split('+')?.slice(1, 2))));



//     const netBankProfit = calculateTotalBackSale

//     const pipelineForBkash = [

//         {
//             $match: {
//                 paymentDate: conditionValue
//             }
//         },
//         {
//             $match: {
//                 paymentMethod: 'Bkash'
//             }
//         },

//     ];

//     const allBkashSaleTransection = await Sale.aggregate(pipelineForBkash)



//     const calculateTotalBkashSale = calculateTotal(allBkashSaleTransection?.map(item => Number(item?.paymentHistory?.split('+')?.slice(1, 2))));

//     const netBkashProfit = calculateTotalBkashSale

//     const pipelineForNogod = [

//         {
//             $match: {
//                 paymentDate: conditionValue
//             }
//         },
//         {
//             $match: {
//                 paymentMethod: 'Nogod'
//             }
//         },

//     ];

//     const allNogodSaleTransection = await Sale.aggregate(pipelineForNogod)



//     const calculateTotalNogodSale = calculateTotal(allNogodSaleTransection?.map(item => Number(item?.paymentHistory?.split('+')?.slice(1, 2))));


//     const netNogodProfit = calculateTotalNogodSale


//     const pipelineForRocket = [

//         {
//             $match: {
//                 paymentDate: conditionValue
//             }
//         },
//         {
//             $match: {
//                 paymentMethod: 'Rocket'
//             }
//         },

//     ];

//     const allRocketSaleTransection = await Sale.aggregate(pipelineForRocket)

//     const calculateTotalRocketSale = calculateTotal(allRocketSaleTransection?.map(item => Number(item?.paymentHistory?.split('+')?.slice(1, 2))));


//     const netRocketProfit = calculateTotalRocketSale

//     const pipelineForBankDue = [

//         {
//             $match: {
//                 paymentDate: conditionValue
//             }
//         },
//         {
//             $match: {
//                 duePaymentMethod: 'Bank'
//             }
//         },

//     ];

//     const allBankSaleTransectionDue = await Sale.aggregate(pipelineForBankDue)

//     const calculateTotalBackSaleDue = calculateTotal(allBankSaleTransectionDue?.map(item => Number(item?.paymentHistory?.split('+')?.slice(2, 3))));

//     const netBankProfitDue = calculateTotalBackSaleDue

//     const pipelineForBkashDue = [

//         {
//             $match: {
//                 paymentDate: conditionValue
//             }
//         },
//         {
//             $match: {
//                 duePaymentMethod: 'Bkash'
//             }
//         },

//     ];

//     const allBkashSaleTransectionDue = await Sale.aggregate(pipelineForBkashDue)



//     const calculateTotalBkashSaleDue = calculateTotal(allBkashSaleTransectionDue?.map(item => Number(item?.paymentHistory?.split('+')?.slice(2, 3))));

//     const netBkashProfitDue = calculateTotalBkashSaleDue

//     const pipelineForNogodDue = [

//         {
//             $match: {
//                 paymentDate: conditionValue
//             }
//         },
//         {
//             $match: {
//                 duePaymentMethod: 'Nogod'
//             }
//         },

//     ];

//     const allNogodSaleTransectionDue = await Sale.aggregate(pipelineForNogodDue)



//     const calculateTotalNogodSaleDue = calculateTotal(allNogodSaleTransectionDue?.map(item => Number(item?.paymentHistory?.split('+')?.slice(2, 3))));


//     const netNogodProfitDue = calculateTotalNogodSaleDue


//     const totalProfitAmount = netCashProfit + netBankProfit + netBankProfitDue + netBkashProfit + netBkashProfitDue + netNogodProfit + netNogodProfitDue


//     const pipelineForPayroll = [

//         {
//             $match: {
//                 date: conditionValue
//             }
//         }

//     ];

//     const allPayrolls = await Payroll.aggregate(pipelineForPayroll);

//     const CalculateTotalPaidSalary = calculateTotal(allPayrolls?.map(paid => Number(paid?.paid)))
//     const CalculateTotalIncentiveSalary = calculateTotal(allPayrolls?.map(paid => Number(paid?.incentive)))
//     const CalculateTotalBonusSalary = calculateTotal(allPayrolls?.map(paid => Number(paid?.overtime)))


//     const totalPayrollExpenses = CalculateTotalPaidSalary + CalculateTotalIncentiveSalary + CalculateTotalBonusSalary

//     const pipelineForVendor = [

//         {
//             $match: {
//                 paymentDate: conditionValue
//             }
//         }

//     ];

//     const allVendors = await Vendor.aggregate(pipelineForVendor);

//     const calculateAllPaidAmountVendors = calculateTotal(allVendors?.map(vendor => Number(vendor?.paid)));

//     const totalExpenses = calculateAllPaidAmountVendors + totalPayrollExpenses;

//     const netProfit = totalProfitAmount - totalExpenses;

//     const netProfitString = netProfit?.toString();

//     const calculateFixedExpenses = calculateTotal(data?.expenses?.map(item => Number(item?.expenseAmount)))

//     const finalProfit = (netProfit + Number(data?.extraProfitAmount)) - calculateFixedExpenses;

//     const finalProfitString = finalProfit?.toString();

//     const calculateFixedExpensesString = calculateFixedExpenses?.toString();

//     const newData = {
//         ...data,
//         totalProfit: netProfitString,
//         totalExpense: calculateFixedExpensesString,
//         profitAllocation: finalProfitString,
//         vendorExpenses: calculateAllPaidAmountVendors,
//         payrollExpenses: totalPayrollExpenses
//     }


//     const result = await FinalAccount.create(newData);

//     return {
//         status: 201,
//         result: result
//     }
// }
const finalAccountCreateService = async (data) => {

    const result = await FinalAccount.create(data);

    return {
        status: 201,
        result: result
    }
}

const getFinalAccountService = async (year, month) => {

    if (!year && !month) {
        return {
            status: 201,
            result: []
        }
    }
    conditionValue = { $regex: `^${year}-${month}` }

    const result = await FinalAccount.find({ date: { $regex: `^${year}-${month}` } });

    const lastFinalProfit = await FinalAccount.findOne({}).sort({ createdAt: -1 });
    console.log(lastFinalProfit?.totalProfit)

    return {
        status: 201,
        result
    }
}



const updateFinalAccountService = async (id, body) => {
    const result = await FinalAccount.updateOne({ _id: id }, { $set: body }, { runValidator: true })
    return {
        status: 200,
        result
    }
}

const deleteFinalAccountService = async (ids) => {
    const result = await FinalAccount.deleteMany({ _id: { $in: ids } });
    return {
        status: 200,
        result
    }
}


module.exports = {
    finalAccountCreateService,
    getFinalAccountService,
    updateFinalAccountService,
    deleteFinalAccountService
}