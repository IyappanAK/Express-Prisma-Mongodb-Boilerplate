const jwt = require('jsonwebtoken');
const moment = require('moment');
// const httpStatus = require('http-status');
const prisma = require('../prisma');
const config = require('../config/config');
// const userService = require('./user.service');
// const { Token } = require('../models');
// const ApiError = require('../utils/ApiError');
const { tokenTypes } = require('../config/tokens');
const ApiError = require('../utils/ApiError')


const generateToken = (userId, expires, type, secret = config.jwt.secret) => {
  const payload = {
    sub: userId,
    iat: moment().unix(),
    exp: expires.unix(),
    type,
  };
  return jwt.sign(payload, secret);
};

const saveToken = async (token, userId, expires, type, blacklisted = false) => {
  const tokenDoc = await prisma.token.create({
    data: {
      token,
      user: userId,
      expires: expires.toDate(),
      type,
      blacklisted,
    },
  });
  return tokenDoc;
};

const verifyToken = async (token, type) => {
  const payload = jwt.verify(token, config.jwt.secret);
  const tokenDoc = await prisma.token.findFirst({ where: { token, type, user: payload.sub, blacklisted: false } });
  if (!tokenDoc) {
    
    throw new ApiError(httpStatus.UNAUTHORIZED, "Token not found")

    // throw new Error('Token not found');
  }
  return tokenDoc;
};


const generateVerifyEmailToken = async (user) => {
  const expires = moment().add(config.jwt.verifyEmailExpirationMinutes, 'minutes');
  const verifyEmailToken = generateToken(user.id, expires, tokenTypes.VERIFY_EMAIL);
  await saveToken(verifyEmailToken, user.id, expires, tokenTypes.VERIFY_EMAIL);
  return verifyEmailToken;
};


const generateAuthTokens = async (user) => {
  const accessTokenExpires = moment().add(config.jwt.accessExpirationMinutes, 'days');
  const accessToken = generateToken(user.id, accessTokenExpires, tokenTypes.ACCESS);

  const refreshTokenExpires = moment().add(config.jwt.refreshExpirationDays, 'days');
  const refreshToken = generateToken(user.id, refreshTokenExpires, tokenTypes.REFRESH);
  await saveToken(refreshToken, user.id, refreshTokenExpires, tokenTypes.REFRESH);

  return {
    access: {
      token: accessToken,
      expires: accessTokenExpires.toDate(),
    },
    refresh: {
      token: refreshToken,
      expires: refreshTokenExpires.toDate(),
    },
  };
};



module.exports = {

  verifyToken,
  generateAuthTokens,
  generateToken,
  generateVerifyEmailToken

};
