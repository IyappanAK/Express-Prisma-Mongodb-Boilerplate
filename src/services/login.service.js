const { email } = require('../config/config');
const prisma = require('../prisma');
const nodemailer = require('nodemailer');
const { userService, emailService, tokenService } = require('../services');
const { error, log } = require('winston');
const { tokenTypes } = require('../config/tokens');
const { decrypt, encrypt } = require('../utils/commonUtils');
const ApiError = require('../utils/ApiError');
const httpStatus = require('http-status');

const verify = async (loginBody) => {
  const { email, password } = loginBody;
  // const encryptpassword = await encrypt(password);
  // const cryptpassword = await decrypt('password');
  const responce = await prisma.user.findFirst({
    where: { email: email, password: password },
  });
  return responce ? responce : false;
};
//asdfzxc
const verifyemail = async (emailBody, local) => {
  const exist = await userService.getuserByEmail(emailBody);
  if (exist) {
    const token = await tokenService.generateVerifyEmailToken(exist);
    await emailService.sendResetPasswordEmail(exist.email, token, local);
    return { message: ` Email sent to ${exist.email} if exist` };
  } else {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Account not  found');

    // throw new Error("Account not  found")
  }
};

const updatePasswordBytoken = async (token, password) => {
  const tokenDetails = await tokenService.verifyToken(token, tokenTypes.VERIFY_EMAIL);
  // console.log(tokenDetails);
  const encryptpassword = await encrypt(password);

  await userService.updateUserByToken(tokenDetails.user, encryptpassword);
  return {
    message: 'Password reset success',
  };
};

module.exports = {
  verify,
  verifyemail,
  updatePasswordBytoken,
};
