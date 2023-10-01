const AppError = require('../utils/appError')

const handleCastError = (err)=> {
    const message = (`Invalid ${err.path}: ${err.value}.`)
    return new AppError(message, 400)
}

const handleDuplicateFields = (err)=> {
    keys = Object.keys(err.keyValue)
    key = keys[0]
    value = err.keyValue[key]

    const message = (`Duplicate field value: ${value}, please use another value`)
    return new AppError(message, 400)
}

module.exports = (err, req, res, next) => {

    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';

    if(process.env.NODE_ENV === 'development') {

        res.status(err.statusCode).json({
            status: err.status,
            error: err,
            message: err.message,
            stack: err.stack
        })

        console.error('Error 💥', err)
    }

    if(process.env.NODE_ENV === 'production') {
        let error = { ...err }
        console.error('Error 💥', err)

        if(err.name === 'CastError') error = handleCastError(error);
        if(err.code === 11000) error = handleDuplicateFields(error)

        
        if(error.isOperational) {

            res.status(error.statusCode).json({
                status: error.status,
                message: error.message
            })

        } else {

            res.status(error.statusCode).json({
                status: error.status,
                message: "Something went wrong!"
            })

        }

        console.error('Error 💥', err)

    }


}