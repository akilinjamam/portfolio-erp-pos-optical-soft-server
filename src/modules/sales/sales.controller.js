const tryCatchAsync = require("../../tryCatchAsync/tryCatchAsync")
const { createSalesService } = require("./sales.service")

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

module.exports = {
    createSalesController
}