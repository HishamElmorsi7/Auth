const express = require('express')
const authController = require('../controllers/authController')
const userController = require('../controllers/userController')

const router = express.Router();

router.post('/signup', authController.signup)
router.post('/login', authController.login)
router.post('/forgotPassword', authController.forgotPassword)
router.patch('/resetPassword/:token', authController.resetPassword)

router.get('/', authController.protect, userController.getAllUsers)
router.delete('/:id', authController.protect, authController.restrictTo('admin'), userController.deleteUser)
module.exports = router