const tryCatchAsync = require("../../tryCatchAsync/tryCatchAsync");
const { createEmployee, getEmployees } = require("./employee.service");

const createEmployeeController = tryCatchAsync(
    async (req, res) => {
        const result = await createEmployee(req?.body)
        res.status(200).json({
            status: result.status,
            success: true,
            result: result.result
        })
    }
)


const getEmployeeController = tryCatchAsync(
    async (req, res) => {
        const result = await getEmployees();
        res.status(200).json({
            status: result.status,
            success: true,
            result: result.result
        })
    }
)

module.exports = {
    createEmployeeController,
    getEmployeeController
}