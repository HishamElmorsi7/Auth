const User = require('../models/userModel')

exports.signUp = async (req, res, next) => {
    const userData = req.body

    const newUser = await User.create(req.body)

    res.json(201).json({
        status: 'success',
        data: {
            user: newUser
        }
    })
}