const Joi = require('joi');


const generateOtp = {
  body: Joi.object().keys({
    phoneNumber: Joi.string().required().length(10),
  }),
}
const verifyOtp = {
  body: Joi.object().keys({
    phoneNumber: Joi.string().required(),
    otp: Joi.number().required(),
  }),
}


module.exports = {
  generateOtp,
  verifyOtp
};
