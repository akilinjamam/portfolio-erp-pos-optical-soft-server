const tryCatchAsync = require("../../tryCatchAsync/tryCatchAsync");
const { createLoginService, getLoginService } = require("./login.service");

const createLoginController = tryCatchAsync(
    async (req, res) => {

        const result = await createLoginService(req.body);

        res.status(201).json({
            status: result.status,
            success: result.success,
            token: result.token && result.token,
            result: result.result
        })
    }
)

const getLoginController = tryCatchAsync(
    async (req, res) => {

        const result = await getLoginService();

        res.status(200).json({
            status: result.status,
            success: result.success,
            result: result.result
        })
    }
)

module.exports = {
    createLoginController,
    getLoginController
}