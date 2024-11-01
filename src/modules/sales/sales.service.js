const { default: mongoose } = require("mongoose");
const Sale = require("./sales.modal");
const Products = require("../products/products.model");

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
    const fields = ['customerName', 'address', 'phoneNumber', 'createdAt']

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
    console.log(id)
    console.log(data)
    const result = await Sale.updateOne({ _id: id }, { $set: data }, { runValidators: true })

    return {
        status: 200,
        result
    }
}

module.exports = {
    createSalesService,
    getSalesService,
    updateSalesService
}