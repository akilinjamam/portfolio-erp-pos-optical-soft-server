const { jwtDecoder } = require("../../jwtDecode/jwtDecode");
const tryCatchAsync = require("../../tryCatchAsync/tryCatchAsync");
const User = require("./registration.model");
const { createRegistrationService, updateUserInfoService } = require("./registration.service")
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
const updateUserRegistrationController = tryCatchAsync(
    async (req, res) => {
        const token = req?.headers?.authorization;

        if (!token) {
            throw new Error('header is not set')
        }
        const splitedToken = token?.split(' ')[1];

        const check = jwtDecoder(splitedToken);

        const findUser = await User.findOne({ _id: check?.id });

        if (findUser?.role !== 'admin') {
            throw new Error('only admin can update user')
        }

        const result = await updateUserInfoService(req?.params?.id, req?.body)

        res.status(201).json({
            status: result.status,
            success: true,
            result: result.result
        })

    }
)

module.exports = {
    createRegistrationController,
    updateUserRegistrationController
}