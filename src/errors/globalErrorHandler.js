const ApiError = require("./apiError");
const castError = require("./castError");
const validationError = require("./validationError");
require('dotenv').config()


const globalErrorHandler = (err, req, res, next) => {
    let statusCode = 500;
    let message = 'something went wrong';
    let errorMessages = []

    if (err?.name === 'validationError') {
        const validationErrors = validationError(err);
        statusCode = validationErrors.statusCode;
        message = validationErrors.message;
        errorMessages = validationErrors.errorMessages
    } else if (err?.name === 'CastError') {
        const castErrors = castError(err);

        statusCode = castErrors.statusCode;
        message = castErrors.message;
        errorMessages = castErrors.errorMessages
    } else if (err instanceof ApiError) {
        statusCode = err?.statusCode;
        message = err?.message;
        errorMessages = err?.message
            ?
            [
                {
                    path: "",
                    message: err.message
                },
            ]
            :
            [];
    } else if (err instanceof ApiError) {
        message = err?.message;
        errorMessages = err?.message
            ?
            [
                {
                    path: "",
                    message: err?.message
                }
            ]
            :
            []
    }

    res.status(statusCode).json({
        success: false,
        message: message,
        errorMessages: errorMessages,
        stack: process.env.NODE_ENV !== "production" ? err?.stack : undefined,
    });

}

module.exports = globalErrorHandler;