const tryCatchAsync = require("../../tryCatchAsync/tryCatchAsync");
const { createSupplier, getSupplier, updateSupplier, deleteSupplier } = require("./supplier.service");



const createSupplierController = tryCatchAsync(
    async (req, res) => {
        const result = await createSupplier(req?.body)
        res.status(200).json({
            status: result.status,
            success: true,
            result: result.result
        })
    }
)


const getSupplierController = tryCatchAsync(
    async (req, res) => {

        const { searchTerm } = req.query;

        const result = await getSupplier(searchTerm);
        res.status(200).json({
            status: result.status,
            total: result.total,
            success: true,
            result: result.result
        })
    }
)


const updateSupplierController = tryCatchAsync(
    async (req, res) => {
        const id = req?.params?.id;
        const result = await updateSupplier(id, req?.body);
        res.status(200).json({
            status: result.status,
            success: true,
            result: result.result
        })
    }
)

const deleteSupplierController = tryCatchAsync(
    async (req, res) => {
        const result = await deleteSupplier(req?.body);
        res.status(200).json({
            status: result.status,
            success: true,
            result: result.result
        })
    }
)

module.exports = {
    createSupplierController,
    getSupplierController,
    updateSupplierController,
    deleteSupplierController
}