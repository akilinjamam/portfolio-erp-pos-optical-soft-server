const Vendor = require("./vendor.model")

const createVendorService = async (data) => {

    const allVendors = await Vendor.find({ supplierName: data.supplierName }).populate('supplierName');

    if (allVendors.length === 0) {

        const { paid, totalPaid, due, billAmount, ...remainingData } = data;
        if (!billAmount || (billAmount === '0')) {
            throw new Error('First time you must have to give bill amount')
        }

        if (Number(paid) > Number(billAmount)) {
            throw new Error('Paid Amount can not be more than bill amount')
        }

        if (Number(paid) <= 0) {
            throw new Error('Paid amount should be at least more than 0')
        }

        const calculateDueAmountInNumber = Number(billAmount) - Number(paid);
        const calculateDueAmountInString = calculateDueAmountInNumber.toString();

        const newData = {
            paid,
            totalPaid: paid,
            billAmount,
            due: calculateDueAmountInString,
            ...remainingData
        }

        const result = await Vendor.create(newData)

        return {
            status: 201,
            result
        }

    }

    const { paid, totalPaid, due, prevDue, billAmount, supplierName, billNo, ...remainingData } = data;

    const lastVendor = await Vendor.findOne({ supplierName: supplierName }).sort({ createdAt: -1 }).populate('supplierName');


    const newBillAmount = (Number(billAmount) > 0 && billAmount) ? billAmount : lastVendor.billAmount;


    if (Number(paid) > Number(newBillAmount)) {
        throw new Error('Paid amount can not be more than Bill amount')
    }

    if (lastVendor.due !== '0') {
        if (lastVendor.billNo === billNo) {
            if ((Number(lastVendor.totalPaid) + Number(paid)) > Number(newBillAmount)) {
                throw new Error('Total Paid amount can not be more than Bill amount')
            }
        }
    }

    if (Number(paid) === 0) {
        throw new Error('Paid amount must be more than 0 amount')
    }

    if (lastVendor.billNo === billNo && lastVendor.billAmount !== newBillAmount) {
        throw new Error('You can not change Bill Amount until change Bill No')
    }



    const previousDue = lastVendor.due
    const calculateTotalPaidInNumber = Number(lastVendor.totalPaid) + Number(paid);
    const calculateTotalPaidInString = calculateTotalPaidInNumber.toString();
    const conditionalTotalPaid = (Number(lastVendor.totalPaid) === Number(lastVendor.billAmount)) ? paid : calculateTotalPaidInString;

    const calculatedBillAmount = (Number(lastVendor.billAmount) + Number(newBillAmount))

    const conditionalBillAmount = ((lastVendor.billNo !== billNo) && (lastVendor.due !== '0')) ? calculatedBillAmount : newBillAmount

    const dueAmountAccordingToBillNo = (lastVendor.billNo === billNo) ? Number(lastVendor.billAmount) : (Number(newBillAmount) + Number(lastVendor.billAmount));

    const calculateDueAmount = (dueAmountAccordingToBillNo - (Number(lastVendor.totalPaid) + Number(paid)))
    const calculateDueAmountInString = calculateDueAmount.toString();

    const newDueAmountCalculationInNumber = (Number(newBillAmount) - Number(paid))
    const newDueAmountCalculationInString = newDueAmountCalculationInNumber.toString();

    const conditionalDue = (lastVendor.due === '0') ? newDueAmountCalculationInString : calculateDueAmountInString

    const newData = {
        supplierName,
        paid,
        totalPaid: conditionalTotalPaid,
        due: conditionalDue,
        prevDue: previousDue,
        billNo,
        billAmount: conditionalBillAmount,
        ...remainingData
    }


    const result = await Vendor.create(newData)

    return {
        status: 201,
        result
    }
}

module.exports = {
    createVendorService
}