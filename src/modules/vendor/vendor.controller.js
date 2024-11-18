const tryCatchAsync = require("../../tryCatchAsync/tryCatchAsync")
const { createVendorService, getLastVendorService } = require("./vendor.service")

const createVendorController = tryCatchAsync(
    async (req, res) => {
        const result = await createVendorService(req.body)
        res.status(201).json({
            status: result.status,
            success: true,
            result: result.result
        })
    }
)


const getLastVendorController = tryCatchAsync(
    async (req, res) => {
        const result = await getLastVendorService(req.params.id)
        res.status(201).json({
            status: result.status,
            success: true,
            result: result.result
        })
    }
)


module.exports = {
    createVendorController,
    getLastVendorController
}
