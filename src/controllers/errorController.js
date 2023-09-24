module.exports = (err, req, res, next) => {
    res.status(400).json({
        status: 'fail',
        message: err.message
    })
}