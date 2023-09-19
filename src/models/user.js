const mongoose = require('mongoose')
const validator = require('validator')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide your name']
    },

    email: {
        type: String,
        required: [true, 'Please provide your email'],
        validate: [validator.isEmail, 'Please provide a valid email'],
        lowercase: true

    },

    password: {
        type: String,
        required: [true, 'Please provide your password'],
        minlength: [8, 'Password should be at least 8 characters long']
    },

    passwordConfirm: {
        type: String,
        required: [true, 'Please confirm your password'],
        validate: {
            validator: function(value) {
                return value === this.password;
            },

            message: "Passwords don't match"
        }
    }
})

const User = mongoose.model('User', userSchema)

module.exports = User;