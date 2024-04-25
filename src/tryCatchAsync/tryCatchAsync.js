const tryCatchAsync = (fn) => {
    return async (req, res) => {
        try {
            await fn(req, res)
        } catch (error) {
            res.status(400).json({
                status: 400,
                success: false,
                errorMessage: error.message
            })
        }
    }
}

module.exports = tryCatchAsync;