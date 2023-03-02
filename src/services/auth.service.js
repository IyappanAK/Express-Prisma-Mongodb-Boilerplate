const httpStatus = require('http-status');
const prisma = require('../prisma');
const ApiError = require('../utils/ApiError');
const commonUtils = require('../utils/commonUtils');
const config = require('../config/config');
const axios = require('axios');

const twoFactorApi = async (phoneNumber) => {
  const res = await axios.get(`https://2factor.in/API/V1/${config.twoFactorKey}/SMS/+91${phoneNumber}/AUTOGEN/OTP`)
  return res.data;
 
}
const verifyOtp = async ({ phoneNumber, otp}) => {
    const res = await axios.get(`https://2factor.in/API/V1/${config.twoFactorKey}/SMS/VERIFY3/${phoneNumber}/${otp}`);

    return res.data.Status == "Success" ? true : false;

  };
const logout = async (refreshToken) => {
  const refreshTokenDoc = await prisma.token.findFirst({
  where: { token: refreshToken, type: tokenTypes.REFRESH, blacklisted: false },
  });
  if (!refreshTokenDoc) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Not found');
  }
  await refreshTokenDoc.remove();
  };
  
module.exports = {
    verifyOtp,
    twoFactorApi,
}


