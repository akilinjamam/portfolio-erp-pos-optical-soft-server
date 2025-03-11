const Vendor = require("./vendor.model")

// const createVendorService = async (data) => {

//     const allVendors = await Vendor.find({ supplierName: data.supplierName }).populate('supplierName');

//     if (allVendors.length === 0) {

//         const { paid, totalPaid, due, billAmount, ...remainingData } = data;
//         if (!billAmount || (billAmount === '0')) {
//             throw new Error('First time you must have to give bill amount')
//         }

//         if (Number(paid) > Number(billAmount)) {
//             throw new Error('Paid Amount can not be more than bill amount')
//         }

//         if (Number(paid) <= 0) {
//             throw new Error('Paid amount should be at least more than 0')
//         }

//         const calculateDueAmountInNumber = Number(billAmount) - Number(paid);
//         const calculateDueAmountInString = calculateDueAmountInNumber.toString();

//         const newData = {
//             paid,
//             totalPaid: paid,
//             billAmount,
//             singleBillAmount: billAmount,
//             due: calculateDueAmountInString,
//             ...remainingData
//         }

//         const result = await Vendor.create(newData)

//         return {
//             status: 201,
//             result
//         }

//     }

//     const { paid, totalPaid, due, prevDue, billAmount, supplierName, billNo, ...remainingData } = data;

//     const lastVendor = await Vendor.findOne({ supplierName: supplierName }).sort({ createdAt: -1 }).populate('supplierName');


//     const newBillAmount = (Number(billAmount) > 0 && billAmount) ? billAmount : lastVendor.billAmount;


//     if (Number(paid) > Number(newBillAmount)) {
//         throw new Error('Paid amount can not be more than Bill amount')
//     }

//     if (lastVendor.due !== '0') {
//         if (lastVendor.billNo === billNo) {
//             if ((Number(lastVendor.totalPaid) + Number(paid)) > Number(newBillAmount)) {
//                 throw new Error('Total Paid amount can not be more than Bill amount')
//             }
//         }
//     }

//     if (Number(paid) === 0) {
//         throw new Error('Paid amount must be more than 0 amount')
//     }

//     if (lastVendor.billNo === billNo && lastVendor.billAmount !== newBillAmount) {
//         throw new Error('You can not change Bill Amount until change Bill No')
//     }



//     const previousDue = lastVendor.due
//     const calculateTotalPaidInNumber = Number(lastVendor.totalPaid) + Number(paid);
//     const calculateTotalPaidInString = calculateTotalPaidInNumber.toString();
//     const conditionalTotalPaid = (Number(lastVendor.totalPaid) === Number(lastVendor.billAmount)) ? paid : calculateTotalPaidInString;

//     const calculatedBillAmount = (Number(lastVendor.billAmount) + Number(newBillAmount))

//     const conditionalBillAmount = ((lastVendor.billNo !== billNo) && (lastVendor.due !== '0')) ? calculatedBillAmount : newBillAmount


//     const conditionalSingleBillAmount = (lastVendor.billNo !== billNo) ? billAmount : ''


//     const dueAmountAccordingToBillNo = (lastVendor.billNo === billNo) ? Number(lastVendor.billAmount) : (Number(newBillAmount) + Number(lastVendor.billAmount));

//     const calculateDueAmount = (dueAmountAccordingToBillNo - (Number(lastVendor.totalPaid) + Number(paid)))
//     const calculateDueAmountInString = calculateDueAmount.toString();

//     const newDueAmountCalculationInNumber = (Number(newBillAmount) - Number(paid))
//     const newDueAmountCalculationInString = newDueAmountCalculationInNumber.toString();

//     const conditionalDue = (lastVendor.due === '0') ? newDueAmountCalculationInString : calculateDueAmountInString

//     const newData = {
//         supplierName,
//         paid,
//         totalPaid: conditionalTotalPaid,
//         due: conditionalDue,
//         prevDue: previousDue,
//         billNo,
//         billAmount: conditionalBillAmount,
//         singleBillAmount: conditionalSingleBillAmount,
//         ...remainingData
//     }


//     const result = await Vendor.create(newData)

//     return {
//         status: 201,
//         result
//     }
// }


const createVendorBillService = async (data) => {

    const allVendors = await Vendor.find({ supplierName: data.supplierName }).populate('supplierName');


    if (allVendors.length === 0) {

        const { billAmount, billNo, billingDate, supplierName } = data;
        if (!billAmount || (billAmount === '0')) {
            throw new Error('First time you must have to give bill amount')
        }

        const newData = {
            supplierName,
            paid: "0",
            totalPaid: "0",
            billAmount,
            singleBillAmount: billAmount,
            due: billAmount,
            billNo,
            billingDate,
            paymentDate: ""
        }

        const result = await Vendor.create(newData)

        return {
            status: 201,
            result
        }

    }

    const lastVendor = await Vendor.findOne({ supplierName: data.supplierName }).sort({ createdAt: -1 }).populate('supplierName');

    const { due, billAmount, totalPaid } = lastVendor

    const conditionalBillAmount = Number(due) > 0 ? (Number(billAmount) + Number(data?.billAmount)) : Number(data?.billAmount);

    const conditionalTotalPaid = (Number(totalPaid) === Number(billAmount)) ? 0 : totalPaid;

    const conditionalDue = conditionalBillAmount - Number(conditionalTotalPaid)

    console.log(conditionalDue)

    const billData = {
        supplierName: data?.supplierName,
        billAmount: conditionalBillAmount?.toString(),
        singleBillAmount: data?.billAmount,
        paid: "0",
        totalPaid: conditionalTotalPaid?.toString(),
        prevDue: due?.toString(),
        due: conditionalDue?.toString(),
        billingDate: data?.billingDate,
        paymentDate: "",
        billNo: data?.billNo

    }

    const result = await Vendor.create(billData)

    return {
        status: 200,
        result: result
    }
}

const createVendorService = async (data) => {

    const allVendors = await Vendor.find({ supplierName: data.supplierName }).populate('supplierName');

    if (allVendors.length === 0) {
        throw new Error("please create bill first");
    }

    const { paid, paymentDate, supplierName, ...remaining } = data;

    const lastVendor = await Vendor.findOne({ supplierName: supplierName }).sort({ createdAt: -1 }).populate('supplierName');

    const lastPaymentVendor = await Vendor.findOne({ supplierName: supplierName }).sort({ paymentDate: -1, createdAt: -1 }).populate('supplierName')
    console.log(lastPaymentVendor)

    if (Number(lastVendor?.billAmount) === Number(lastPaymentVendor?.totalPaid)) {
        throw new Error('all Due Amount is Paid, please create new Bill')
    }

    if (Number(paid) === 0) {
        throw new Error('Paid amount must be more than 0 amount')
    }

    if (Number(paid) > Number(lastVendor?.due)) {
        throw new Error('paid amount can not be more than due amount')
    }


    const previousDue = lastVendor.due
    const calculateTotalPaidInNumber = Number(lastVendor.due) > 0 ? (Number(lastVendor.totalPaid) + Number(paid)) : Number(paid);
    // console.log((Number(lastVendor.totalPaid) + Number(paid)));
    const totalDue = Number(lastVendor.billAmount) - calculateTotalPaidInNumber

    const newData = {
        supplierName,
        paid,
        totalPaid: calculateTotalPaidInNumber?.toString(),
        due: totalDue?.toString(),
        prevDue: previousDue,
        billNo: lastVendor?.billNo,
        billAmount: lastVendor?.billAmount,
        singleBillAmount: lastVendor?.singleBillAmount,
        paymentDate: paymentDate,
        billingDate: "",
        ...remaining
    }

    const result = await Vendor.create(newData)

    return {
        status: 201,
        result: result
    }
}


const getLastVendorService = async (supplierName) => {
    const lastVendor = await Vendor.findOne({ supplierName: supplierName }).sort({ createdAt: -1 }).populate('supplierName');

    return {
        status: 201,
        result: lastVendor
    }
}

const getVendorWithIdService = async (supplierName, year, month) => {
    let conditionValue = '';

    if (year && month) {
        conditionValue = { $regex: `^${year}-${month}` }
    }


    // if (!supplierName) {
    //     return {
    //         status: 201,
    //         result: []
    //     }
    // }

    if (!supplierName && !year && !month) {
        const currentYear = new Date().getFullYear();
        const currentMonth = String(new Date().getMonth() + 1).padStart(2, '0');

        const result = await Vendor.find({
            paymentDate: { $regex: `^${currentYear}-${currentMonth}` }
        }).populate('supplierName');

        return {
            status: 201,
            result
        }
    }

    if (!supplierName && year && month) {
        const result = await Vendor.find({ paymentDate: conditionValue }).sort({ createdAt: -1 }).populate('supplierName');

        return {
            status: 201,
            result
        }
    }

    if (supplierName && !year && !month) {
        const result = await Vendor.find({ supplierName: supplierName }).sort({ createdAt: -1 }).populate('supplierName');

        return {
            status: 201,
            result
        }
    }

    if (supplierName && year && month) {
        const result = await Vendor.find({ supplierName: supplierName, paymentDate: conditionValue }).sort({ createdAt: -1 }).populate('supplierName');
        return {
            status: 201,
            result
        }
    }
}

const updateVendorService = async (id, body) => {
    const result = await Vendor.updateOne({ _id: id }, { $set: body }, { runValidator: true })
    return {
        status: 200,
        result
    }
}

const deleteVendorService = async (ids) => {
    const result = await Vendor.deleteMany({ _id: { $in: ids } });
    return {
        status: 200,
        result
    }
}

module.exports = {
    createVendorBillService,
    createVendorService,
    getLastVendorService,
    getVendorWithIdService,
    updateVendorService,
    deleteVendorService
}