const joi = require('joi')
module.exports.registrationSchema = joi.object({
    username: joi.string().min(3).max(31).required(),
    email: joi.string().email().required(),
    password: joi.string().min(6).max(12).required(),
    confirmPassword: joi.ref("password")
})

module.exports.loginSchema = joi.object({
    username: joi.string().min(3).max(31).required(),
    password: joi.string().required()
})

