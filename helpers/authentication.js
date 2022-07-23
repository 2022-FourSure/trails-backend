const jwt = require("jsonwebtoken");
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
  let email = user.email;
  let payload = { email: email };
  let accessToken = createAccessToken(payload);
  let refreshToken = createRefreshToken(payload);
  return {
    accessToken,
    refreshToken,
  };
};

const verifyToken = (req, res, next) => {
  let accessToken = req.cookies.accessToken;
  if (!accessToken) {
    return res.status(403).json({ error: "You must sign in" });
  }
  let payload = null;
  try {
    payload = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
    next();
  } catch (error) {
    console.error("Failed to verify token ", error);
    return res.status(401).send();
  }
};

const addRefreshTokenToUser = ({ user, refreshToken }) => {
  user.refresh_token = refreshToken;
};

const setAccessTokenCookie = ({ res, accessToken }) => {
  res.cookie("accessToken", accessToken, {
    maxAge: 900000,
    secure: process.env.NODE_ENV !== "development",
    httpOnly: true,
    expire: new Date() + 9999,
  });
};

const createAndSetTokens = ({ res, user }) => {
  let { accessToken, refreshToken } = createTokens(user);
  addRefreshTokenToUser({ user: user, refreshToken });
  setAccessTokenCookie({ res, accessToken });
};

module.exports = {
  createTokens,
  verifyToken,
  addRefreshTokenToUser,
  createAndSetTokens,
};
