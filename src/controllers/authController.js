const User = require('../models/userModel')
const catchAsync = require('../utils/catchAsync')

exports.signup = catchAsync (async (req, res, next) => {
    const userData = req.body

    const newUser = await User.create(req.body)

    res.json(201).json({
        status: 'success',
        data: {
            user: newUser
        }
    })
})