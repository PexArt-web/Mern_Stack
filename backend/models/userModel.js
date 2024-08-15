const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const { log } = console;

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

// static sign up method

userSchema.static.signup = async (email, password) => {
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw Error(`User with the email: ${email} already exists`);
    }

  } catch (error) {
    log(error);
  }
};

module.exports = User;
