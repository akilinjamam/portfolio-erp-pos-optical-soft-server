const { default: mongoose } = require("mongoose");
const Sale = require("./sales.modal");
const Products = require("../products/products.model");
const calculateTotal = require("../../calculation/calculateSum");
const moment = require("moment")
// const axios = require("axios")

const createSalesService = async (data) => {
    const { invoiceBarcode, ...remaining } = data

    const date = new Date();
    const arrangeDate = `${date.getFullYear()}${(date.getMonth() + 1).toString().padStart(2, '0')}${date.getDate().toString().padStart(2, '0')}`;
    const session = await mongoose.startSession();
    try {
        session.startTransaction();

        const getLastSales = await Sale.findOne().sort({ createdAt: -1 });

        const barcode = getLastSales?.invoiceBarcode?.slice(8)

        let newBarcode;

        if (barcode === '99999') {
            newBarcode = '00001'
        } else {
            if (getLastSales) {
                const zeros = '00000';
                const zerosLength = zeros?.length;
                const convertIntoNumberAndAddOne = Number(barcode) + 1;
                const barcodeNumberLength = convertIntoNumberAndAddOne?.toString()?.length;
                const remainingZerosLength = zerosLength - barcodeNumberLength;
                const remainingZeros = zeros?.slice(0, remainingZerosLength);

                const result = `${remainingZeros}${convertIntoNumberAndAddOne}`
                newBarcode = result;
            } else {
                newBarcode = '00001'
            }
        }


        const newData = {
            ...remaining,
            invoiceBarcode: `${arrangeDate}${newBarcode}`
        }


        if (!newData) {
            throw new Error('data not added')
        }


        const bulkUpdate = newData?.products?.map(update => ({
            updateOne: {
                filter: { _id: update?.id },
                update: {
                    $set: { quantity: update?.remainingQuantity, inStock: update?.inStock }
                }
            }
        }))

        const result = await Sale.create([newData], { session });
        await Products.bulkWrite(bulkUpdate, { session })

        await session.commitTransaction();
        await session.endSession();


        // let config = {
        //     method: 'post',
        //     maxBodyLength: Infinity,
        //     url: 'https://api.sms.net.bd/sendsms',
        //     headers: {
        //         'Content-Type': 'application/json'
        //     },
        //     data: JSON.stringify({
        //         "api_key": `${process.env.SMS_API_KEY}`,
        //         "msg": `invoice: ${arrangeDate}${newBarcode}, customer: ${newData?.      customerName}, phone: ${newData?.phoneNumber}, address: ${newData?.address}, delivery date: ${newData?.deliveryDate}, paid amount: ${newData?.advance}`,
        //         "to": "8801516708479"
        //     })
        // };

        // await axios.request(config)
        //     .then((response) => {
        //         console.log(JSON.stringify(response.data));
        //     }).catch((error) => {
        //         console.log(error);
        //     })


        return {
            status: 201,
            result
        }

    } catch (error) {
        await session.abortTransaction();
        await session.endSession();
        throw new Error(error);
    }
}
const getSalesService = async (queryValue, from, to) => {

    // query
    const fields = ['customerName', 'address', 'phoneNumber', 'invoiceBarcode', 'paymentMethod', 'delivered', 'recorderName', 'referredBy']

    if (queryValue) {
        const search = await Sale.aggregate([
            {
                $match: {
                    $or: fields?.map((item) => {
                        return { [item]: { $regex: queryValue, $options: 'i' } }
                    }),
                },
            },
        ])
        return {
            status: 200,
            total: search?.length,
            result: search
        }
    }

    if (from && to) {
        const range = await Sale.aggregate([
            {
                $match: {
                    createdAt: {
                        $gte: new Date(from),
                        $lte: new Date(to)
                    }
                }
            }
        ])


        const lastSale = await Sale.findOne({}).sort({ createdAt: -1 });
        const upcomingInvoiceNumber = Number(lastSale?.invoiceBarcode) + 1;
        const modifiedInvoiceNumber = `${moment().format('YYYYMMDD')}${upcomingInvoiceNumber?.toString()?.slice(8)}`


        return {
            status: 200,
            total: range?.length,
            upcomingInvoiceNumber: modifiedInvoiceNumber,
            result: range,

        }
    }

    const result = await Sale.find({});
    const lastSale = await Sale.findOne({}).sort({ createdAt: -1 });
    const upcomingInvoiceNumber = Number(lastSale?.invoiceBarcode) + 1;
    const modifiedInvoiceNumber = `${moment().format('YYYYMMDD')}${upcomingInvoiceNumber?.toString()?.slice(8)}`

    return {
        status: 200,
        result,
        upcomingInvoiceNumber: modifiedInvoiceNumber
    }
}
const getOneMonthSalesService = async (queryValue, from, to) => {

    // query
    const fields = ['customerName', 'address', 'phoneNumber', 'invoiceBarcode', 'delivered', 'recorderName', 'referredBy', 'paymentMethod']

    if (queryValue && !from && !to) {
        const search = await Sale.aggregate([
            {
                $match: {
                    $or: fields?.map((item) => {
                        return { [item]: { $regex: queryValue, $options: 'i' } }
                    }),
                },
            },
        ])
        return {
            status: 200,
            total: search?.length,
            result: search
        }
    }

    if (from && to && !queryValue) {
        const range = await Sale.aggregate([
            {
                $match: {
                    createdAt: {
                        $gte: new Date(from),
                        $lte: new Date(to)
                    }
                }
            }
        ])

        return {
            status: 200,
            total: range?.length,
            result: range
        }
    }
    if (from && to && queryValue) {
        const range = await Sale.aggregate([
            {
                $match: {
                    createdAt: {
                        $gte: new Date(from),
                        $lte: new Date(to)
                    },
                    $or: fields.map((item) => ({
                        [item]: { $regex: queryValue, $options: 'i' }
                    }))
                }
            }
        ]);

        return {
            status: 200,
            total: range.length,
            result: range
        };
    }

    const startOfMonth = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
    const endOfMonth = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0);

    endOfMonth.setHours(23, 59, 59, 999)

    const result = await Sale.aggregate([
        {
            $match: {
                createdAt: {
                    $gte: startOfMonth,
                    $lte: endOfMonth
                }
            }
        }
    ])

    return {
        status: 200,
        result
    }
}


const updateSalesAdjustmentService = async (id, data) => {

    const splitHistory = data?.paymentHistory?.split('+')

    const paidTime = splitHistory?.slice(1)?.length?.toString();

    let conditionalData;

    const newData = {
        ...data,
        paidTime: paidTime
    }

    if (!data?.paymentHistory) {
        conditionalData = data
    } else {
        conditionalData = newData
    }



    const result = await Sale.updateOne({ _id: id }, { $set: conditionalData }, { runValidators: true })

    return {
        status: 200,
        result: result
    }
}

const cancelSalesAdjutmentService = async (id) => {

    const findSalesData = await Sale.findOne({ _id: id });

    const paidTime = findSalesData?.paidTime;
    const advance = findSalesData?.advance;

    console.log(findSalesData?.invoiceBarcode);

    if (!findSalesData) {
        throw new Error('barcode not found')
    }

    const splitPaymentHistory = findSalesData?.paymentHistory?.split('+');


    const totalInstallmentLength = splitPaymentHistory?.slice(1)?.length;

    if (totalInstallmentLength === 1) {
        throw new Error('No Adjutment added yet')
    }

    const totalInstallment = splitPaymentHistory?.slice(1);

    const lastInstallment = totalInstallment?.[totalInstallmentLength - 1];

    const updatedPaidTime = paidTime - 1;
    const updatedAdvance = advance - lastInstallment;

    const acceptLastInstallment = totalInstallment?.slice(0, totalInstallmentLength - 1);

    const mappingRemainingInstallment = acceptLastInstallment?.map((item, index) => {
        return `+${item}`
    })


    const newUpdatedData = {
        paymentHistory: mappingRemainingInstallment.join(''),
        paidTime: updatedPaidTime,
        advance: updatedAdvance
    }


    const result = await Sale.updateOne({ _id: id }, { $set: newUpdatedData }, { runValidators: true });



    return {
        status: 200,
        result: result
    }
}


const getDueCollectionSalesService = async (paymentDate) => {

    if (!paymentDate) {
        return {
            status: 200,
            result: []
        }
    }

    const pipline = [
        {
            $match: {
                paymentDate: paymentDate,
                // paymentMethod: 'Cash',
                $expr: { $gt: [{ $toDouble: "$paidTime" }, 1] }
            }
        }
    ]
    const piplineForCash = [
        {
            $match: {
                paymentDate: paymentDate,
                $expr: { $gt: [{ $toDouble: "$paidTime" }, 1] },
                duePaymentMethod: 'Cash',
            }
        }
    ]
    const piplineForBank = [
        {
            $match: {
                paymentDate: paymentDate,
                $expr: { $gt: [{ $toDouble: "$paidTime" }, 1] },
                duePaymentMethod: 'Bank',
            }
        }
    ]
    const piplineForBkash = [
        {
            $match: {
                paymentDate: paymentDate,
                $expr: { $gt: [{ $toDouble: "$paidTime" }, 1] },
                duePaymentMethod: 'Bkash',
            }
        }
    ]
    const piplineForNogod = [
        {
            $match: {
                paymentDate: paymentDate,
                $expr: { $gt: [{ $toDouble: "$paidTime" }, 1] },
                duePaymentMethod: 'Nogod',
            }
        }
    ]

    const dueCashPaid = await Sale.aggregate(piplineForCash)
    const dueBankPaid = await Sale.aggregate(piplineForBank)
    const dueBkashPaid = await Sale.aggregate(piplineForBkash)
    const dueNogodPaid = await Sale.aggregate(piplineForNogod)

    const dueCashPaidValue = calculateTotal(dueCashPaid?.map(cash => Number(cash?.todayPaid)))?.toString()
    const dueBankPaidValue = calculateTotal(dueBankPaid?.map(cash => Number(cash?.todayPaid)))?.toString()
    const dueBkashPaidValue = calculateTotal(dueBkashPaid?.map(cash => Number(cash?.todayPaid)))?.toString()
    const dueNogodPaidValue = calculateTotal(dueNogodPaid?.map(cash => Number(cash?.todayPaid)))?.toString()

    const result = await Sale.aggregate(pipline);

    const allProducts = result?.flatMap(item => calculateTotal(item?.products?.map(saleValue => (saleValue?.actualSalesPrice * saleValue?.quantity))))
    const todayTotalPaid = result?.map(paid => Number(paid?.todayPaid));
    const totalPaidDueCollection = calculateTotal(todayTotalPaid)?.toString();

    const totalSales = allProducts?.[0]?.toString();


    const monthlyDueAmount = result;
    console.log(monthlyDueAmount)

    return {
        status: 200,
        result: {
            totalSales,
            totalPaidDueCollection,
            dueCashPaidValue,
            dueBankPaidValue,
            dueBkashPaidValue,
            dueNogodPaidValue,
            result
        }
    }


}
const getMonthlyDueCollectionSalesService = async (paymentDate) => {

    const pipline = [
        {
            $match: {
                paymentDate: { $regex: `${paymentDate?.slice(0, 7)}` },
                $expr: { $gt: [{ $toDouble: "$paidTime" }, 1] }
            }
        }
    ]
    const piplineForCash = [
        {
            $match: {
                paymentDate: { $regex: `${paymentDate?.slice(0, 7)}` },
                $expr: { $gt: [{ $toDouble: "$paidTime" }, 1] },
                duePaymentMethod: 'Cash',
            }
        }
    ]
    const piplineForBank = [
        {
            $match: {
                paymentDate: { $regex: `${paymentDate?.slice(0, 7)}` },
                $expr: { $gt: [{ $toDouble: "$paidTime" }, 1] },
                duePaymentMethod: 'Bank',
            }
        }
    ]
    const piplineForBkash = [
        {
            $match: {
                paymentDate: { $regex: `${paymentDate?.slice(0, 7)}` },
                $expr: { $gt: [{ $toDouble: "$paidTime" }, 1] },
                duePaymentMethod: 'Bkash',
            }
        }
    ]
    const piplineForNogod = [
        {
            $match: {
                paymentDate: { $regex: `${paymentDate?.slice(0, 7)}` },
                $expr: { $gt: [{ $toDouble: "$paidTime" }, 1] },
                duePaymentMethod: 'Nogod',
            }
        }
    ]

    const dueCashPaid = await Sale.aggregate(piplineForCash)
    const dueBankPaid = await Sale.aggregate(piplineForBank)
    const dueBkashPaid = await Sale.aggregate(piplineForBkash)
    const dueNogodPaid = await Sale.aggregate(piplineForNogod)

    const dueCashPaidValue = calculateTotal(dueCashPaid?.map(cash => Number(cash?.todayPaid)))?.toString()
    const dueBankPaidValue = calculateTotal(dueBankPaid?.map(cash => Number(cash?.todayPaid)))?.toString()
    const dueBkashPaidValue = calculateTotal(dueBkashPaid?.map(cash => Number(cash?.todayPaid)))?.toString()
    const dueNogodPaidValue = calculateTotal(dueNogodPaid?.map(cash => Number(cash?.todayPaid)))?.toString()

    const result = await Sale.aggregate(pipline);

    const allProducts = result?.flatMap(item => calculateTotal(item?.products?.map(saleValue => (Number(saleValue?.actualSalesPrice) * Number(saleValue?.quantity)))))
    const todayTotalPaid = result?.map(paid => Number(paid?.todayPaid));
    const totalPaidDueCollection = calculateTotal(todayTotalPaid)?.toString();

    const monthlydueByDate = result?.reduce((acc, due) => {
        const date = due?.paymentDate;

        const duePaid = Number(due?.todayPaid) || 0;

        if (!acc[date]) {
            acc[date] = { due: 0 }
        }

        acc[date].due += duePaid;

        return acc;
    }, {});

    const monthlydueCashByDate = dueCashPaid?.reduce((acc, due) => {
        const date = due?.paymentDate;

        const duePaid = Number(due?.todayPaid) || 0;

        if (!acc[date]) {
            acc[date] = { due: 0 }
        }

        acc[date].due += duePaid;

        return acc;
    }, {});
    const monthlydueBankByDate = dueBankPaid?.reduce((acc, due) => {
        const date = due?.paymentDate;

        const duePaid = Number(due?.todayPaid) || 0;

        if (!acc[date]) {
            acc[date] = { due: 0 }
        }

        acc[date].due += duePaid;

        return acc;
    }, {});
    const monthlydueBkashByDate = dueBkashPaid?.reduce((acc, due) => {
        const date = due?.paymentDate;

        const duePaid = Number(due?.todayPaid) || 0;

        if (!acc[date]) {
            acc[date] = { due: 0 }
        }

        acc[date].due += duePaid;

        return acc;
    }, {});
    const monthlydueNogodByDate = dueNogodPaid?.reduce((acc, due) => {
        const date = due?.paymentDate;

        const duePaid = Number(due?.todayPaid) || 0;

        if (!acc[date]) {
            acc[date] = { due: 0 }
        }

        acc[date].due += duePaid;

        return acc;
    }, {});



    const dueObject = Object?.entries(monthlydueByDate)?.map(([date, data]) => ({
        date, ...data
    }))?.sort((a, b) => new Date(a.date) - new Date(b.date))
    const dueCashObject = Object?.entries(monthlydueCashByDate)?.map(([date, data]) => ({
        date, ...data
    }))?.sort((a, b) => new Date(a.date) - new Date(b.date))
    const dueBankObject = Object?.entries(monthlydueBankByDate)?.map(([date, data]) => ({
        date, ...data
    }))?.sort((a, b) => new Date(a.date) - new Date(b.date))
    const dueBkashObject = Object?.entries(monthlydueBkashByDate)?.map(([date, data]) => ({
        date, ...data
    }))?.sort((a, b) => new Date(a.date) - new Date(b.date))
    const dueNogodObject = Object?.entries(monthlydueNogodByDate)?.map(([date, data]) => ({
        date, ...data
    }))?.sort((a, b) => new Date(a.date) - new Date(b.date))

    return {
        status: 200,
        result: {
            totalPaidDueCollection,
            dailyDue: dueObject,
            dailyCashDue: dueCashObject,
            dailyBankDue: dueBankObject,
            dailyBkashDue: dueBkashObject,
            dailyNogodDue: dueNogodObject,
            dueCashPaidValue,
            dueBankPaidValue,
            dueBkashPaidValue,
            dueNogodPaidValue,
            result
        }
    }
}

const updateSalesInfoService = async (id, data) => {

    const { advance, paymentHistory, ...remainingData } = data;

    let splitHistory = paymentHistory?.split('+')?.slice(1);

    splitHistory[0] = advance;

    const newPaymentHistory = splitHistory?.map(item => {
        return `+${item}`
    })

    const newData = {
        ...remainingData,
        advance: advance,
        paymentHistory: newPaymentHistory.join(''),
        todayPaid: advance
    }


    const result = await Sale.updateOne({ _id: id }, { $set: newData }, { runValidators: true });
    return {
        status: 200,
        result: result
    }
}


const updateProductInfoService = async (id, data) => {

    const { productId, productName, quantity, actualSalesPrice } = data;

    console.log(productId, productName, quantity, actualSalesPrice)

    const modifiedQuantity = Number(quantity)
    const modifiedActualSalesPrice = Number(actualSalesPrice)

    const result = await Sale.updateOne(
        { _id: id, 'products.id': productId },
        {
            $set: {
                'products.$.productName': productName,
                'products.$.quantity': modifiedQuantity,
                'products.$.actualSalesPrice': modifiedActualSalesPrice
            }
        },
        { runValidators: true }
    )

    return {
        status: 200,
        result: result
    }


}

module.exports = {
    createSalesService,
    getSalesService,
    getOneMonthSalesService,
    updateSalesAdjustmentService,
    cancelSalesAdjutmentService,
    getDueCollectionSalesService,
    getMonthlyDueCollectionSalesService,
    updateSalesInfoService,
    updateProductInfoService
}