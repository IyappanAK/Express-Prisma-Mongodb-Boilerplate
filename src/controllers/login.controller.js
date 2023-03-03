const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { loginService, tokenService } = require('../services');
const ApiError = require('../utils/ApiError');

const loginByEmailPassword = catchAsync(async (req, res) => {
  const responce = {
    userInfo: '',
    token: '',
  };

  responce.userInfo = await loginService.verify(req.body);
  console.log('responce.userInfo');
  if (responce?.userInfo) {
    responce.token = await tokenService.generateAuthTokens(responce.userInfo);
    res.send(responce);
  }
  throw new ApiError(httpStatus.BAD_REQUEST, 'invalid username and password');
});

const verifyByEmail = catchAsync(async (req, res) => {
  const email = req.body.email;
  const local = req.body?.local;
  const responce = await loginService.verifyemail(email, local);
  if (responce) {
    res.send(responce);
  } else {
    throw new Error();
  }
});

const updatePasswordBytoken = catchAsync(async (req, res) => {
  const { token, password } = req.body;
  // console.log(token, password);
  const responce = await loginService.updatePasswordBytoken(token, password);
  res.send(responce);
});

module.exports = {
  loginByEmailPassword,
  verifyByEmail,
  updatePasswordBytoken,
};
