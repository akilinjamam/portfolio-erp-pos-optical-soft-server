const GlassType = require("./glass.model")

const getGlassTypeService = async () => {
    const result = await GlassType.find({})
    return {
        status: 201,
        result
    }
}
const createGlassTypeService = async (glassType) => {
    const result = await GlassType.create(glassType)
    return {
        status: 201,
        result
    }
}

const deleteGlassTypeService = async (glassType) => {
    const result = await GlassType.deleteOne({ _id: glassType })
    return {
        status: 201,
        result
    }
}

module.exports = {
    createGlassTypeService,
    deleteGlassTypeService,
    getGlassTypeService
}