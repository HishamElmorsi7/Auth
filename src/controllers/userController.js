const AppError = require('../utils/appError')
const User = require('../models/userModel')
const catchAsync = require('../utils/catchAsync')

exports.getAllUsers = catchAsync( async (req, res, next) => {
    const users = await User.find({})
    res.status(200).json({
        status: 'success',
        results: users.length,
        data: {
            users
        }
    })
})

exports.deleteUser = catchAsync (async (req, res, next) => {
    const id = req.params.id
    const user = await User.findByIdAndDelete({_id: id})

    if(!user) return next( new AppError('User does not exist', 404))

    res.status(204).json({
        status: 'success',
        data: null
    })
})

