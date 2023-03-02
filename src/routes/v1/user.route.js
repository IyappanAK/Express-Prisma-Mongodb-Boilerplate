const express = require('express');
// const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const userValidation = require('../../validations/user.validation');
const userController = require('../../controllers/user.controller');
const auth = require('../../middlewares/auth');

const router = express.Router();
//Example Routes With Auth and Validation
router
.route('/example')
.get(auth(), validate(userValidation.locationvalidateByUser), userController.locationByuser);

router
.route('/')
.get(userController.getUsers)
.post(validate(userValidation.createUser), userController.createUser);


module.exports = router;
