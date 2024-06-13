const tryCatchAsync = require("../../tryCatchAsync/tryCatchAsync")
const { createProductService, getProductService, updateProductService, deleteProductService, getSingleProductService } = require("./products.service")

const createProductController = tryCatchAsync(
    async (req, res) => {
        const result = await createProductService(req.body)
        res.status(201).json({
            status: result.status,
            success: true,
            result: result.result
        })
    }
)

const getProductController = tryCatchAsync(
    async (req, res) => {
        const { searchTerm } = req.query;
        const result = await getProductService(searchTerm);
        res.status(200).json({
            status: result.status,
            success: true,
            result: result.result
        })
    }
)

const getSingleProductController = tryCatchAsync(
    async (req, res) => {
        const { id } = req.params
        const result = await getSingleProductService(id)
        res.status(200).json({
            status: result.status,
            success: true,
            result: result.result
        })
    }
)


const updateProductController = tryCatchAsync(
    async (req, res) => {
        const { id } = req.params
        const result = await updateProductService(id, req.body)
        res.status(200).json({
            status: result.status,
            success: true,
            result: result.result
        })
    }
)
const deleteProductController = tryCatchAsync(
    async (req, res) => {
        const { ids } = req.body
        const result = await deleteProductService(ids)
        res.status(200).json({
            status: result.status,
            success: true,
            result: result.result
        })
    }
)

module.exports = {
    createProductController,
    getProductController,
    getSingleProductController,
    updateProductController,
    deleteProductController
}