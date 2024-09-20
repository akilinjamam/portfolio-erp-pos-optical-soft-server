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

module.exports = {
    createSalesService
}