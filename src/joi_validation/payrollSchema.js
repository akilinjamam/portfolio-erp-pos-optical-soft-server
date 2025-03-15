const Joi = require("joi");

module.exports.payrollValidationSchema = Joi.object({
    employeeName: Joi.string().required(),
    date: Joi.string().required(),
    paid: Joi.string().optional(),
    netSalary: Joi.string().optional(),
    totalSalary: Joi.string().optional(),
    totalPaid: Joi.string().optional(),
    prevDue: Joi.string().optional(),
    prevAdvance: Joi.string().optional(),
    due: Joi.string().optional(),
    advance: Joi.string().optional(),
    incentive: Joi.string().optional(),
    overtime: Joi.string().optional(),
    paymentMethod: Joi.string().optional(),
    transectionId: Joi.string().optional(),

});


