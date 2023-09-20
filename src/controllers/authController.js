const jwt = require('jsonwebtoken')

const User = require('../models/userModel')
const catchAsync = require('../utils/catchAsync')

// The user is signed in automatically when signup
exports.signup = catchAsync (async (req, res, next) => {

    // Didn't use req.body directly so that no one can assign themselves as admin manually
    const userData = {

        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        passwordConfirm: req.body.passwordConfirm,

    }

    const newUser = await User.create(req.body)

    // With expires: even if the signature was verified it won't work
    const token = jwt.sign({id: newUser._id}, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES
    });


    res.status(201).json({
        status: 'success',
        token,
        data: {
            user: newUser
        }
    })
})