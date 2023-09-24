const jwt = require('jsonwebtoken')

const User = require('../models/userModel')
const catchAsync = require('../utils/catchAsync')


const signToken = (id) =>{
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE
    });
}
// The user is signed in automatically when signup
exports.signup = catchAsync (async (req, res, next) => {

    // Didn't use req.body directly so that no one can assign themselves as admin manually
    const userData = {

        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        passwordConfirm: req.body.passwordConfirm,

    }

    const newUser = await User.create(userData)

    // With expires: even if the signature was verified it won't work
    const token = signToken(newUser._id)


    res.status(201).json({
        status: 'success',
        token,
        data: {
            user: newUser
        }
    })
})


exports.login = async (req, res, next) => {

    const {email, password} = req.body;

    if(!email || !password){
        return next(new Error('Please Add Email and password'))
    }

    const user = await User.findOne({ email }).select('+password')

    if(!user || !await user.correctPassword(password, user.password)){
        return next(new Error('Incorrect email or password'))
    }

    const token = signToken(user._id)

    console.log(token)

    return res.status(200).json({
        status: 'success',
        token
    })
}

exports.protect = (req, res, next) => {
    const token = req.headers.authorization
    let tokenValue;

    if(token && token.startsWith('Bearer')) {
        tokenValue = token.split(' ')[1] 
    }

    if(!tokenValue) {
        return next(new Error('You are Unauthoraized'))
    }


    next()


    
}