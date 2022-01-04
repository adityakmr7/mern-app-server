const express = require('express');

const userController = require('../controller/user.controller');
const validate = require('../middleware/validator');
const router = express.Router();

router.post('/register', validate.validateEmail, validate.validatePassword, validate.username, userController.registerUser)

router.post('/login', validate.username,validate.validatePassword ,userController.loginUser);


module.exports = router;
