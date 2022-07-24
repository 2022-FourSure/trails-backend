const bcrypt = require("bcrypt");
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
      res.status(401).json({ msg: "Invalid Credentials" });
    }
    createAndSetTokens({ res, user });
    res.status(200).json({});
  } catch (err) {
    console.log(`Login error has occurred ${err}`);
    res.status(422).json({ err: "Cannot process your request" });
  }
};

module.exports = {
  register,
  login,
};
