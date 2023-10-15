import bcrypt from "bcryptjs";
import Jwt from "jsonwebtoken";
import "dotenv/config"

// hash password
export const hashPassword = async (password) => {
  const hashedPassword = bcrypt.hashSync(
    password,
    parseInt(process.env.SALT_ROUND, 10)
  );
  return hashedPassword;
};

// sign a token
export const signToken = (userTokenData) => {
  try {
    const token = Jwt.sign(userTokenData, process.env.JWT_SECRET_KEY, {
      expiresIn: process.env.JWT_EXPIRE,
    });
    if (!token) {
      return {
        success: false,
        message: "Token not created",
        data: null,
      };
    }
    return { success: true, message: "Token created", data: token };
  } catch (error) {
    return Promise.reject(new Error(error.message));
  }
};

// decode token
export const decodeToken = (token) => {
  try {
    const jwtPayload = Jwt.verify(token, process.env.JWT_SECRET_KEY);
    if (!jwtPayload) {
      return {
        success: false,
        message: "Invalid token decoded",
        data: null,
      };
    }
    return {
      success: true,
      message: "Decoded token",
      data: jwtPayload,
    };
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return {
        success: false,
        message: "token expired",
        data: null,
      };
    }
    return {
      success: false,
      message: "invalid token",
      data: null,
    };
  }
};
