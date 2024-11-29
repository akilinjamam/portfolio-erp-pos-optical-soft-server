const { default: mongoose } = require("mongoose");
const Sale = require("./sales.modal");
const Products = require("../products/products.model");
const calculateTotal = require("../../calculation/calculateSum");

const createSalesService = async (data) => {

    const session = await mongoose.startSession();
    try {
        session.startTransaction();

        if (!data) {
            throw new Error('data not added')
        }


        const bulkUpdate = data?.products?.map(update => ({
            updateOne: {
                filter: { _id: update?.id },
                update: {
                    $set: { quantity: update?.remainingQuantity, inStock: update?.inStock }
                }
            }
        }))

        const result = await Sale.create([data], { session });
        await Products.bulkWrite(bulkUpdate, { session })

        await session.commitTransaction();
        await session.endSession();

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
    const fields = ['customerName', 'address', 'phoneNumber', 'createdAt', 'invoiceBarcode', 'paymentMethod', 'delivered', 'recorderName', 'referredBy']

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

        return {
            status: 200,
            total: range?.length,
            result: range
        }
    }


    const result = await Sale.find({})
    return {
        status: 200,
        total: result?.length,
        result
    }
}


const updateSalesService = async (id, data) => {



    const splitHistory = data?.paymentHistory.split('+')

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
                paymentMethod: 'Cash',
                $expr: { $gt: [{ $toDouble: "$paidTime" }, 1] }
            }
        }
    ]

    const result = await Sale.aggregate(pipline);

    const allProducts = result?.flatMap(item => calculateTotal(item?.products?.map(saleValue => (saleValue?.actualSalesPrice * saleValue?.quantity))))
    const todayTotalPaid = result?.map(paid => Number(paid?.todayPaid));
    const totalPaidDueCollection = calculateTotal(todayTotalPaid)?.toString();

    const totalSales = allProducts?.[0]?.toString();

    return {
        status: 200,
        result: {
            totalSales,
            totalPaidDueCollection,
            result
        }
    }


}

module.exports = {
    createSalesService,
    getSalesService,
    updateSalesService,
    getDueCollectionSalesService
}