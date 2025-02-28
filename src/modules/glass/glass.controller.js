const tryCatchAsync = require("../../tryCatchAsync/tryCatchAsync")
const { createGlassTypeService, deleteGlassTypeService } = require("./glass.service")

const createGlassTypeController = tryCatchAsync(
    async (req, res) => {
        const result = await createGlassTypeService(req.body)
        res.status(201).json({
            status: result.status,
            success: true,
            result: result.result
        })
    }
)
const deleteGlassTypeController = tryCatchAsync(
    async (req, res) => {
        const id = req.params.id;
        const result = await deleteGlassTypeService(id)
        res.status(201).json({
            status: result.status,
            success: true,
            result: result.result
        })
    }
)

module.exports = {
    createGlassTypeController,
    deleteGlassTypeController
}