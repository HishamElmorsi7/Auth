const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')

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
        minlength: [8, 'Password should be at least 8 characters long'],
        // To execlude the password when getting from DB
        select: false
    },

    passwordConfirm: {
        type: String,
        required: [true, 'Please confirm your password'],
        
        // this keword works only with normal fun not arrow function

        // The validator here will work only when using create or save like: User.create(),...
        // So it doesn't work with update so we want to take care!

        validate: {
            validator: function(value) {
                return value === this.password;
            },

            message: "Passwords are not the same"
        }
    }
})

userSchema.pre("save", async function(next) {
    if (!this.isModified('password')) return next();

    this.password = await bcrypt.hash(this.password, 12);

    this.passwordConfirm = undefined;

    next()
})

// This adds the method to all documents of User collection
userSchema.methods.correctPassword = async (candidatePassword, password) => {
    return await bcrypt.compare(candidatePassword, password)
}

const User = mongoose.model('User', userSchema)

module.exports = User;