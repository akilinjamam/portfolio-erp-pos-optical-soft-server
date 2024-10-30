const tryCatchAsync = require("../../tryCatchAsync/tryCatchAsync");
const { createEmployee, getEmployees, updateEmployees, deleteEmployees } = require("./employee.service");

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


const updateEmployeeController = tryCatchAsync(
    async (req, res) => {
        const id = req?.params?.id;
        const result = await updateEmployees(id, req?.body);
        res.status(200).json({
            status: result.status,
            success: true,
            result: result.result
        })
    }
)

const deleteEmployeeController = tryCatchAsync(
    async (req, res) => {
        const result = await deleteEmployees(req?.body);
        res.status(200).json({
            status: result.status,
            success: true,
            result: result.result
        })
    }
)

module.exports = {
    createEmployeeController,
    getEmployeeController,
    updateEmployeeController,
    deleteEmployeeController
}