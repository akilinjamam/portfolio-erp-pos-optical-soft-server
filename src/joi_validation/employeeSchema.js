const Joi = require("joi");

const employeeValidationSchema = Joi.object({
    employeeName: Joi.string().required(),
    joiningDate: Joi.string().required(),
    address: Joi.string().required(),
    mobile: Joi.string().required(),
    nid: Joi.string().required(),
    employeeId: Joi.string().required(),
    basicSalary: Joi.string().required(),
    img: Joi.string(),
});

module.exports.bulkEmployeeValidationSchema = Joi.array().items(employeeValidationSchema);
