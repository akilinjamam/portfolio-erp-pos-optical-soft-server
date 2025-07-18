const tryCatchAsync = require("../../tryCatchAsync/tryCatchAsync")
const { createSalesService, getSalesService, getDueCollectionSalesService, getOneMonthSalesService, cancelSalesAdjutmentService, updateSalesAdjustmentService, updateSalesInfoService, updateProductInfoService, getMonthlyDueCollectionSalesService, deleteSalesService } = require("./sales.service")

const createSalesController = tryCatchAsync(
    async (req, res) => {

        const result = await createSalesService(req.body)
        res.status(201).json({
            status: result.status,
            success: true,
            result: result.result
        })
    }
)

const getSalesController = tryCatchAsync(
    async (req, res) => {
        const { searchTerm, from, to } = req.query;
        const result = await getSalesService(searchTerm, from, to)
        res.status(201).json({
            status: result.status,
            total: result.total,
            success: true,
            result: result.result,
            upcomingInvoiceNumber: result.upcomingInvoiceNumber
        })
    }
)
const getOneMonthSalesController = tryCatchAsync(
    async (req, res) => {
        const { searchTerm, from, to } = req.query;
        const result = await getOneMonthSalesService(searchTerm, from, to)
        res.status(201).json({
            status: result.status,
            total: result.total,
            success: true,
            result: result.result
        })
    }
)


const getDueCollectionSalesController = tryCatchAsync(
    async (req, res) => {
        const { paymentDate } = req.query;
        const result = await getDueCollectionSalesService(paymentDate)
        res.status(201).json({
            status: result.status,
            totalSales: result.totalSales,
            success: true,
            result: result.result
        })
    }
)
const getMonthlyDueCollectionSalesController = tryCatchAsync(
    async (req, res) => {
        const { paymentDate } = req.query;
        console.log(paymentDate)
        const result = await getMonthlyDueCollectionSalesService(paymentDate)
        res.status(201).json({
            status: result.status,
            totalSales: result.totalSales,
            success: true,
            result: result.result
        })
    }
)


const updateSalesAdjustmentController = tryCatchAsync(
    async (req, res) => {
        const { id } = req.params
        const result = await updateSalesAdjustmentService(id, req?.body)
        res.status(201).json({
            status: result.status,
            success: true,
            result: result.result
        })
    }
)


const cancelSalesAdjustmentController = tryCatchAsync(
    async (req, res) => {
        const { id } = req.params
        const result = await cancelSalesAdjutmentService(id)
        res.status(201).json({
            status: result.status,
            success: true,
            result: result.result
        })
    }
)

const updateSalesInfoController = tryCatchAsync(
    async (req, res) => {
        const { id } = req.params;
        const result = await updateSalesInfoService(id, req.body)
        res.status(201).json({
            status: result.status,
            success: true,
            result: result.result
        })
    }
)


const updateProductInfoController = tryCatchAsync(
    async (req, res) => {
        const { id } = req?.params;
        const result = await updateProductInfoService(id, req.body)
        res.status(201).json({
            status: result.status,
            success: true,
            result: result.result
        })
    }
)

const deleteSalesInfoController = tryCatchAsync(
    async (req, res) => {
        const { ids } = req.body;
        const result = await deleteSalesService(ids)
        res.status(201).json({
            status: result.status,
            success: true,
            result: result.result
        })
    }
)

module.exports = {
    createSalesController,
    getSalesController,
    getOneMonthSalesController,
    updateSalesAdjustmentController,
    cancelSalesAdjustmentController,
    getDueCollectionSalesController,
    updateSalesInfoController,
    updateProductInfoController,
    getMonthlyDueCollectionSalesController,
    deleteSalesInfoController
}