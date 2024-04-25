const tryCatchAsync = require("../../tryCatchAsync/tryCatchAsync")
const { createRegistrationService } = require("./registration.service")
const bcrypt = require('bcrypt');
const createRegistrationController = tryCatchAsync(
    async (req, res) => {
        const { email, username, password } = req.body;
        const saltround = 10;
        bcrypt.hash(password, saltround, async (err, hash) => {
            const userData = {
                email,
                username,
                password: hash
            }
            const result = await createRegistrationService(userData);

            res.status(201).json({
                status: result.status,
                success: true,
                result: result.result
            })
        })



    }
)

module.exports = {
    createRegistrationController
}