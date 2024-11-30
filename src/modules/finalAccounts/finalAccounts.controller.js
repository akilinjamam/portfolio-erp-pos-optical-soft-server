const tryCatchAsync = require("../../tryCatchAsync/tryCatchAsync")
const { finalAccountCreateService, updateFinalAccountService, deleteFinalAccountService, getFinalAccountService } = require("./finalAccounts.service")

const finalAccountCreateController = tryCatchAsync(
    async (req, res) => {
        const result = await finalAccountCreateService(req.body)
        res.status(201).json({
            status: result.status,
            success: true,
            result: result.result
        })
    }
)
const getFinalAccountController = tryCatchAsync(
    async (req, res) => {
        const { year, month } = req.query
        const result = await getFinalAccountService(year, month)
        res.status(201).json({
            status: result.status,
            success: true,
            result: result.result
        })
    }
)

const updateFinalAccountController = tryCatchAsync(
    async (req, res) => {

        const { id } = req.params;

        const result = await updateFinalAccountService(id, req.body)
        res.status(201).json({
            status: result.status,
            success: true,
            result: result.result
        })
    }
)

const deleteFinalAccountController = tryCatchAsync(
    async (req, res) => {
        const result = await deleteFinalAccountService(req.body)
        res.status(201).json({
            status: result.status,
            success: true,
            result: result.result
        })
    }
)

module.exports = {
    finalAccountCreateController,
    getFinalAccountController,
    updateFinalAccountController,
    deleteFinalAccountController
}