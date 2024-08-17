require("dotenv").config();
const User = require("../models/usersModel");
const jwt = require("jsonwebtoken");
const { log } = console;

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.JSECRET, { expiresIn: "3d" });
};

const signUpUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.signup(email, password);
    const token = createToken(user._id);
    res
      .status(200)
      .json({
        email: email,
        token: token,
      });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const login = async (req, res)=> {
  const { email, password } = req.body
  try {
    const user = await User.login(email, password)
    const token = createToken(user._id)
    res.status(200).json({email: user.email, token: token})
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

module.exports = {
  signUpUser,
  login
};
