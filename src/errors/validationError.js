const validationError = (err) => {
    const errors = Object.values(err.errors).map(el => {
        return {
            path: el?.path,
            message: el?.message
        }
    });

    const statusCode = 400;

    return {
        statusCode,
        message: "validation error",
        errorMessages: errors
    }
}

module.exports = validationError;