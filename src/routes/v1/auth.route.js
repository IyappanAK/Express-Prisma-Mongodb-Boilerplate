const express = require('express');
const axios = require('axios')
const validate = require('../../middlewares/validate');
const authValidation = require('../../validations/auth.validation');
const authController = require('../../controllers/auth.controller');
// const auth = require('../../middlewares/auth');

const router = express.Router();

router.post('/generateotp', validate(authValidation.generateOtp), authController.generateOtp);
router.post('/verifyotp', validate(authValidation.verifyOtp), authController.verifyOtp);

module.exports = router;
