const tryCatchAsync = require("../../tryCatchAsync/tryCatchAsync");
const { createLoginService, getLoginService, getUserByIdService } = require("./login.service");

const createLoginController = tryCatchAsync(
    async (req, res) => {

        const result = await createLoginService(req.body);

        res.status(201).json({
            status: result.status,
            success: result.success,
            token: result.token && result.token,
            result: result.result,
            email: result.email
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

const getUserByIdController = tryCatchAsync(
    async (req, res) => {
        const { id } = req.params;

        const result = await getUserByIdService(id);

        res.status(200).json({
            status: result.status,
            success: result.success,
            result: result.result
        })
    }
)

module.exports = {
    createLoginController,
    getLoginController,
    getUserByIdController
}