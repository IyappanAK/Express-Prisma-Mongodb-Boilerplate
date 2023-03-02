const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt');
const prisma = require('../prisma');
const config = require('./config');
const { tokenTypes } = require('./tokens');
const  ApiError = require('../utils/ApiError');
const httpStatus = require('http-status');

const jwtOptions = {
  secretOrKey: config.jwt.secret,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
};

const jwtVerify = async (payload, done) => {
  try {
    if (payload.type !== tokenTypes.ACCESS) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "Invalid token type")

      // throw new Error('Invalid token type');
    }
    const user = await prisma.user.findUnique({ where: { id: payload.sub } });
    if (!user) {
      return done(null, false);
    }
    // done(null, []);
    done(null, user);
  } catch (error) {
    done(error, false);
  }
};

const jwtStrategy = new JwtStrategy(jwtOptions, jwtVerify);

//sdf
//sdf//sdf
//
module.exports = {
  jwtStrategy,
};
