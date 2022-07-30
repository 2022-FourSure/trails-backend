const jwt = require("jsonwebtoken");
const User = require('../models/User');
const {
  THIRTY_MINUTES_AS_MILLLISECONDS,
  ONE_DAY_AS_MILLISECONDS,
  SIGNING_ALGORITHM,
} = require("../constants");

const createAccessToken = (payload) => {
  return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
    algorithm: SIGNING_ALGORITHM,
    expiresIn: THIRTY_MINUTES_AS_MILLLISECONDS,
  });
};

const createRefreshToken = (payload) => {
  return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
    algorithm: SIGNING_ALGORITHM,
    expiresIn: ONE_DAY_AS_MILLISECONDS,
  });
};

const createTokens = (user) => {
  let id = user.id;
  let payload = { user_id: id };
  let accessToken = createAccessToken(payload);
  let refreshToken = createRefreshToken(payload);
  return {
    accessToken,
    refreshToken,
  };
};

const verifyToken = async (req, res, next) => {
  let accessToken = req.cookies.accessToken;
  if (!accessToken) {
    return res.status(403).json({ error: "You must sign in" });
  }
  try {
    await jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
    next();
  } catch (error) {
    console.error("Failed to verify token ", error);
    return res.status(401).send();
  }
};

const addTokensToUser = ({ userId, refreshToken, accessToken }) => {
  User.findByIdAndUpdate(userId, { 
    refresh_token: refreshToken,
    access_token: accessToken
  }, (error, u) => {
   console.log('Failed to add tokens to user', error)
  })
};

const setAccessTokenCookie = ({ res, accessToken }) => {
  res.cookie("accessToken", accessToken, {
    maxAge: 900000,
    secure: process.env.NODE_ENV !== "development",
    httpOnly: true,
    expire: new Date() + 9999999999,
  })
};

const createAndSetTokens = ({ res, user }) => {
  let { accessToken, refreshToken } = createTokens(user);
  addTokensToUser({ userId: user.id, refreshToken, accessToken });
  setAccessTokenCookie({ res, accessToken });
};

module.exports = {
  createTokens,
  verifyToken,
  addTokensToUser,
  createAndSetTokens,
};
