const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { isPresent, createAndSetTokens } = require("../helpers");
const { SALT_ROUNDS } = require("../constants");

const register = async (req, res) => {
  try {
    let { name, password, email } = req.body;
    let hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
    let user = await User.create({
      name,
      password: hashedPassword,
      email,
    });
    createAndSetTokens({ res, user });
    res.json({ name: user.name, email: user.email });
  } catch (err) {
    console.log(`Register error has occurred ${err}`);
    res.status(422).json({ err: "Cannot process your request" });
  }
};

const login = async (req, res) => {
  try {
    let { email, password } = req.body;
    if (!isPresent(email)) {
      res.status(400).json({ error: "Email is required." });
    }
    if (!isPresent(password)) {
      res.status(400).json({ error: "Password is required." });
    }
    const user = await User.findOne({ email });
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!user || !passwordMatch) {
      res.status(401).json({ error: "Invalid Credentials" });
    }
    createAndSetTokens({ res, user });
    res.status(200).json({ user: {
      name: user.name,
      email: user.email
    }});
  } catch (error) {
    console.log(`Login error has occurred ${error}`);
    res.status(422).json({ error: "Cannot process your request" });
  }
};

const logout = async (req, res) => {
  try {
    let accessToken = req.cookies.accessToken;
    await User.findOneAndUpdate({ access_token: accessToken }, {
      access_token:  '',
      refresh_token: '',
    })
    res.clearCookie('accessToken');
    res.status(200).json({});
  } catch (error) {
    res.status(422).json({ error: 'Cannot process your request'})
    console.log('Logout Error', error)
  }
}

const getLoggedInUser = async (req, res) => {
  let accessToken = req.cookies.accessToken;
  if (!accessToken) {
    return res.status(200).json({});
  }
  try {
    let payload = null;
    payload = await jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET)
    let userId = payload.user_id;
    let user = await User.findById(userId);
    res.status(200).json({ user: { 
      name: user.name,
      email: user.email,
    } })
  } catch (error) {
    res.status(200).json({})
  }
}

module.exports = {
  register,
  login,
  logout,
  getLoggedInUser,
}
