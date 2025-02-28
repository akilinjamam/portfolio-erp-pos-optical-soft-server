const Joi = require("joi");

module.exports.glassTypeValidationSchema = Joi.object({
    glassType: Joi.string().required()

});


