const tryCatchAsync = require("../../tryCatchAsync/tryCatchAsync")
const { createAccountService } = require("./accounts.service")

const createAccountsController = tryCatchAsync(
    async (req, res) => {
        const result = await createAccountService(req.body)
        res.status(201).json({
            status: result.status,
            success: true,
            result: result.result
        })
    }
)

module.exports = {
    createAccountsController
}