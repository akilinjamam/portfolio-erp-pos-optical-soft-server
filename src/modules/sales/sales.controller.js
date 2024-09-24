const tryCatchAsync = require("../../tryCatchAsync/tryCatchAsync")
const { createSalesService, getSalesService } = require("./sales.service")

const createSalesController = tryCatchAsync(
    async (req, res) => {
        const result = await createSalesService(req.body)
        res.status(201).json({
            status: result.status,
            success: true,
            result: result.result
        })
    }
)

const getSalesController = tryCatchAsync(
    async (req, res) => {
        const { searchTerm, from, to } = req.query;
        const result = await getSalesService(searchTerm, from, to)
        res.status(201).json({
            status: result.status,
            total: result.total,
            success: true,
            result: result.result
        })
    }
)

module.exports = {
    createSalesController,
    getSalesController
}