const Products = require("./products.model")


const createProductService = async (data) => {
    const result = await Products.insertMany(data);
    return {
        status: 201,
        result
    }
}
const getProductService = async (queryValue, inStockValue) => {
    // query
    const fields = ['productName', 'salesPrice', 'purchasePrice', 'category', 'quantity', 'date', 'barcode', 'material', 'frameType', 'size', 'shape', 'recorderEmail', 'recorderName', 'createdAt']


    if (queryValue || inStockValue) {

        let = aggregationValue = []

        if (queryValue && !inStockValue) {
            const withQueryValue = [
                {
                    $match: {
                        $or: fields?.map((item) => {
                            return { [item]: { $regex: queryValue, $options: 'i' } }
                        })
                    }
                },
            ]

            aggregationValue = withQueryValue
        }

        if (queryValue && inStockValue) {

            const withQueryValueAndStockSearch = [
                {
                    $match: {
                        $or: fields?.map((item) => {
                            const fieldValues = { [item]: { $regex: queryValue, $options: 'i' } }
                            return ({ inStock: inStockValue === 'true' ? true : false }, fieldValues)
                        }),
                    },
                },
            ]

            aggregationValue = withQueryValueAndStockSearch
        }
        if (inStockValue && !queryValue) {

            const withStockSearch = [
                {
                    $match: {
                        inStock: inStockValue === 'true' ? true : false
                    }
                },
            ]

            aggregationValue = withStockSearch
        }

        const search = await Products.aggregate(aggregationValue)


        return {
            status: 200,
            total: search?.length,
            result: search
        }
    }


    const result = await Products.find()
    return {
        status: 200,
        total: result?.length,
        result
    }
}


const getSingleProductService = async (id) => {
    const result = await Products.find({ _id: id })
    return {
        status: 200,
        result
    }
}
const updateProductService = async (id, body) => {
    const result = await Products.updateOne({ _id: id }, { $set: body }, { runValidator: true })
    return {
        status: 200,
        result
    }
}

const deleteProductService = async (ids) => {
    const result = await Products.deleteMany({ _id: { $in: ids } });
    return {
        status: 200,
        result
    }
}

module.exports = {
    createProductService,
    getProductService,
    getSingleProductService,
    updateProductService,
    deleteProductService
}