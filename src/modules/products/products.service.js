const filtering = require("../../filtering/filtering");
const Products = require("./products.model")


const createProductService = async (data) => {
    const result = await Products.insertMany(data);
    return {
        status: 201,
        result
    }
}
const getProductService = async (queryValue, from, to, priceFrom, priceTo) => {
    // query
    const fields = ['productName', 'salesPrice', 'purchasePrice', 'category', 'quantity', 'date', 'power', 'barcode', 'material', 'frameType', 'size', 'shape', 'supplierName', 'collectorName', 'createdAt']

    if (queryValue) {
        const search = await filtering(Products, fields, queryValue)
        return {
            status: 200,
            total: search?.length,
            result: search
        }
    }

    if ((from && to) || (priceFrom && priceTo)) {
        const range = await Products.aggregate([
            {
                $addFields: {
                    convertedPurchasePrice: { $toDouble: "$purchasePrice" }
                }
            },
            {

                $match: {
                    $or: [
                        {
                            createdAt: {
                                $gte: new Date(from),
                                $lte: new Date(to)
                            }
                        },
                        {
                            convertedPurchasePrice: {
                                $gte: priceFrom ? parseFloat(priceFrom) : undefined,
                                $lte: priceTo ? parseFloat(priceTo) : undefined
                            }
                        }

                    ]
                }
            }
        ])

        return {
            status: 200,
            total: range?.length,
            result: range
        }
    }


    const result = await Products.find({ category: { $nin: ['Glass'] } })
    return {
        status: 200,
        total: result?.length,
        result
    }
}
const getProductGlassService = async (queryValue, from, to, priceFrom, priceTo) => {
    // query
    const fields = ['productName', 'salesPrice', 'purchasePrice', 'category', 'quantity', 'date', 'power', 'sph', 'cyl', 'axis', 'barcode', 'supplierName', 'collectorName', 'createdAt']

    if (queryValue) {
        const search = await filtering(Products, fields, queryValue)
        return {
            status: 200,
            total: search?.length,
            result: search
        }
    }

    if ((from && to) || (priceFrom && priceTo)) {
        const range = await Products.aggregate([
            {
                $addFields: {
                    convertedPurchasePrice: { $toDouble: "$purchasePrice" }
                }
            },
            {

                $match: {
                    $or: [
                        {
                            createdAt: {
                                $gte: new Date(from),
                                $lte: new Date(to)
                            }
                        },
                        {
                            convertedPurchasePrice: {
                                $gte: priceFrom ? parseFloat(priceFrom) : undefined,
                                $lte: priceTo ? parseFloat(priceTo) : undefined
                            }
                        }

                    ]
                }
            }
        ])

        return {
            status: 200,
            total: range?.length,
            result: range
        }
    }


    const result = await Products.find({ category: 'Glass' })
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
    getProductGlassService,
    getSingleProductService,
    updateProductService,
    deleteProductService
}