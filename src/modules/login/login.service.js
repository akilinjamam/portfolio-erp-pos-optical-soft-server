const User = require("../registration/registration.model");
const bcrypt = require('bcrypt');
require('../../configurations/passport');
const jwt = require('jsonwebtoken');

const createLoginService = async (data) => {
    const { username, password } = data;

    const user = await User.findOne({ username: username });

    if (!user) return {
        status: 401,
        success: false,
        result: 'user not found'
    }

    if (!password) {
        return {
            status: 401,
            success: false,
            result: 'password not found'
        }
    }

    if (!user?.accept_by_admin) {
        return {
            status: 401,
            success: false,
            result: 'please wait for admin access permission'
        }
    }

    if (password) {
        if (!bcrypt.compareSync(password, user.password)) {
            return {
                status: 401,
                success: false,
                result: 'password did not matched'
            }
        }

        const payload = {
            id: user._id,
            email: user.email,
            username: user.username,
            role: user.role
        }

        const token = jwt.sign(payload, process.env.SECRET_KEY, {
            expiresIn: '7d'
        })
        return {
            status: 200,
            success: true,
            token: 'Bearer ' + token,
            email: user.email,
            result: 'user is logged in successfully'
        }
    }
}


const getLoginService = async () => {
    const result = await User.find({});

    return {
        status: 200,
        success: true,
        result
    }
}

const getUserByIdService = async (id) => {
    const result = await User.findById(id);

    return {
        status: 200,
        success: true,
        result
    }

}

module.exports = {
    createLoginService,
    getLoginService,
    getUserByIdService
}
