const tryCatchAsync = require("../../tryCatchAsync/tryCatchAsync")
const { createPayrollService, getSinglePayrollService, getPayrollService, updatePayrollService, deletePayrollService, createPayrollBonusService } = require("./payroll.service")

const createPayrollController = tryCatchAsync(
    async (req, res) => {
        const result = await createPayrollService(req.body)
        res.status(201).json({
            status: result.status,
            success: true,
            result: result.result
        })
    }
)
const createPayrollBonusController = tryCatchAsync(
    async (req, res) => {
        const result = await createPayrollBonusService(req.body)
        res.status(201).json({
            status: result.status,
            success: true,
            result: result.result
        })
    }
)


const getSinglePayrollController = tryCatchAsync(
    async (req, res) => {
        const result = await getSinglePayrollService(req.params.id)
        res.status(201).json({
            status: result.status,
            success: true,
            result: result.result
        })
    }
)
const getPayrollController = tryCatchAsync(
    async (req, res) => {
        const { employeeName, year, month } = req.query;
        const result = await getPayrollService(employeeName, year, month)
        res.status(201).json({
            status: result.status,
            success: true,
            result: result.result
        })
    }
)

const updatePayrollController = tryCatchAsync(
    async (req, res) => {
        const result = await updatePayrollService(req.params.id, req.body)
        res.status(201).json({
            status: result.status,
            success: true,
            result: result.result
        })
    }
)

const deletePayrollController = tryCatchAsync(
    async (req, res) => {
        const result = await deletePayrollService(req.body)
        res.status(201).json({
            status: result.status,
            success: true,
            result: result.result
        })
    }
)

module.exports = {
    createPayrollController,
    createPayrollBonusController,
    getSinglePayrollController,
    getPayrollController,
    deletePayrollController,
    updatePayrollController
}