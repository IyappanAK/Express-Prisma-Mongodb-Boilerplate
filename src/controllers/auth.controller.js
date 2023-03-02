const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { authService, tokenService, userService } = require('../services');
const { json } = require('express');
const { otp } = require('../config/config');
const axios = require('axios');
const ApiError = require('../utils/ApiError');

const refreshTokens = catchAsync(async (req, res) => {
  const tokens = await authService.refreshAuth(req.body.refreshToken);
  res.send({ ...tokens });
});

const generateOtp = catchAsync(async (req, res) => {
  const { phoneNumber } = req.body;

  const resp = await userService.getUserByPhoneNumber(phoneNumber);
  const result = {
    status: resp ? true : false,
    message: resp ? 'successfully found' : 'phone number is not exist',
  };
  // const whiteListPhoneNumberList = []
  // const response = await authService.twoFactorApi(phoneNumber)
  // res.send({message : response.Status});
  res.send(result);
});

const verifyOtp = catchAsync(async (req, res) => {
  const { phoneNumber } = req.body;
  let response = {
    isOtpVerifed: true,
    isRegistered: false,
  };

  if (req.body.otp !== otp) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid OTP');
    // console.log("htrow otppppppp");
    // throw new Error('Invalid OTP')
  }

  const registeredUserInfo = await userService.getUserByPhoneNumber(phoneNumber);

  if (registeredUserInfo) {
    response.token = await tokenService.generateAuthTokens(registeredUserInfo);
    response.userInfo = registeredUserInfo;
    response.isRegistered = registeredUserInfo.status === 'completed' ? true : false;
  } else {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'user is not exist');
    // const userReq = {
    //   phone_number: phoneNumber,
    //   roleId: 1
    // }
    // const createdUserInfo = await userService.createUser(userReq)
    // response.token = await tokenService.generateAuthTokens(createdUserInfo)
    // response.userInfo = createdUserInfo
  }

  res.send(response);
});

module.exports = {
  refreshTokens,
  generateOtp,
  verifyOtp,
};
