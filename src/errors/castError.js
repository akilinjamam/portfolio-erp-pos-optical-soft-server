const castError = (error) => {
    const errors = [
        {
            path: error.path,
            message: "invalidId"
        }
    ]

    const statusCode = 400;

    return {
        statusCode,
        message: 'cast error',
        errorMessages: errors
    }
}


module.exports = castError;