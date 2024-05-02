module.exports.runValidator = (schema) => {
    return (req, res, next) => {
        const { error } = schema.validate(req.body,
            {
                abortEarly: false,
                errors: {
                    wrap: {
                        label: ""
                    }
                }
            }
        )

        if (error) {
            return res.status(200).json({
                success: true,
                message: 'validation failed',
                total_error: error.details.length,
                error: error.details.map(item => {
                    return { message: item.message, path: item.path }
                })
            })
        }

        next()
    }
}