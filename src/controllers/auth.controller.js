import bcrypt from "bcryptjs";
import { UserModel } from "../models/user.model.js";
import { hashPassword, signToken } from '../helpers/auth.helper.js'

// User's Registration
export const registration = async (req, res) => {
  try {
    const {
      body: { email, password },
    } = req;
    // find user exist on same email
    const user = await UserModel.findOne({ email: email });
    if (user)
      return res
        .status(400)
        .json({ success: false, message: "User already exist", data: null });
    // hash password
    const hashedPassword = await hashPassword(password);
    // add user
    const createUser = await UserModel.create({
      email,
      password: hashedPassword
    });

    return res.status(200).json({
      success: true,
      message: "User created successfully",
      data: createUser.id,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "internal server error",
      data: null,
    });
  }
};

// User's Login
export const login = async (req, res) => {
  try {
    const {
      body: { email, password },
    } = req;
    // check user exist
    const user = await UserModel.findOne({
      email,
    });
    if (!user)
      return res.status(404).json({
        success: false,
        message: "User not found",
        data: null,
      });

    // compare password
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch)
      return res.status(401).json({
        success: false,
        message: "Invalid user",
        data: null,
      });

    // token data
    const tokenData = {
      userId: user._id,
      email: user.email
    };

    // generate token
    const token = await signToken(tokenData);
    if (!token.success)
      return res.status(404).json({
        success: false,
        message: "Token not created",
        data: null,
      });

    // login user data
    const userData = {
      user: {
        userId: user._id,
        email: user.email
      },
      token: token.data,
    };

    return res.status(200).json({
      success: true,
      message: "Loginh successfully",
      data: userData,
    });
  } catch (error) {
    console.log("Error =>", error)
    return res.status(500).json({
      success: false,
      message: error,
      data: null,
    });
  }
};

