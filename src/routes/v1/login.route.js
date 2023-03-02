const express = require('express')
const validate = require('../../middlewares/validate')
const router = express.Router();
const loginValidation = require('../../validations/login.validation')
const loginController = require('../../controllers/login.controller')

router.route('/')
    .post(validate(loginValidation.loginEmail), loginController.loginByEmailPassword)

router.route('/verifyemail')
    .post(validate(loginValidation.verifyemail), loginController.verifyByEmail)

router.route('/passwordcreate')
    .post(validate(loginValidation.verifyvalidate), loginController.updatePasswordBytoken)

module.exports = router