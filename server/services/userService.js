const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
require("dotenv").config({ path: "../.env" });

const userRegister = async (payload) => {
  try {
    const { fullName, email, password, confirmPassword } = payload;

    if (password !== confirmPassword) {
      throw new Error("Password and confirm password do not match!");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      fullName,
      email,
      password: hashedPassword,
    });

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    return { user, token };
  } catch (err) {
    throw new Error(err.message);
  }
};

const userLogin = async (payload) => {
  try {
    const { email, password } = payload;

    const isUserExist = await User.findOne({ email });

    if (!isUserExist) {
      throw new Error("User does not exist!!");
    }

    const isCorrectPassword = await bcrypt.compare(
      password,
      isUserExist.password
    );

    if (!isCorrectPassword) {
      throw new Error("Wrong Credentials!!");
    }

    const token = jwt.sign(
      { userId: isUserExist._id },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );

    return {
      user: { _id:isUserExist._id,name: isUserExist.fullName, email: isUserExist.email },
      token,
    };
  } catch (err) {
    throw new Error(err.message);
  }
};


const userDetails = async (id) => {
  try {

    const user = await User.findById(id);

    return { user };
  } catch (err) {
    throw new Error(err.message);
  }
};

module.exports = {
  userRegister,
  userLogin,
  userDetails
};
